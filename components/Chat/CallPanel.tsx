"use client";

import Image from "next/image";
import { Loader2, Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  answerCall,
  endCall,
  getCallState,
  sendCallCandidate,
  startCall,
} from "@/services/chat";
import { CallSession } from "@/types/call";

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
];

interface CallPanelProps {
  threadId: string;
  currentUserId: string;
  participantName: string;
  participantAvatarUrl?: string;
}

function parseSignal(value?: string) {
  if (!value) return null;

  try {
    return JSON.parse(value) as RTCSessionDescriptionInit;
  } catch {
    return null;
  }
}

export default function CallPanel({
  threadId,
  currentUserId,
  participantName,
  participantAvatarUrl,
}: CallPanelProps) {
  const [session, setSession] = useState<CallSession | null>(null);
  const [starting, setStarting] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");
  const connectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const localCandidatesRef = useRef<string[]>([]);
  const signalingReadyRef = useRef(false);
  const appliedCandidatesRef = useRef(new Set<string>());
  const sessionRef = useRef<CallSession | null>(null);

  const closeLocalCall = useCallback(() => {
    connectionRef.current?.close();
    connectionRef.current = null;
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    localCandidatesRef.current = [];
    signalingReadyRef.current = false;
    appliedCandidatesRef.current.clear();
    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    setMuted(false);
  }, []);

  const sendCandidate = useCallback(async (candidate: string) => {
    if (!signalingReadyRef.current) {
      localCandidatesRef.current.push(candidate);
      return;
    }

    await sendCallCandidate(threadId, candidate);
  }, [threadId]);

  const createConnection = useCallback(() => {
    const connection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    connection.onicecandidate = (event) => {
      if (!event.candidate) return;
      void sendCandidate(JSON.stringify(event.candidate.toJSON())).catch(() => undefined);
    };
    connection.ontrack = (event) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = event.streams[0];
      }
    };
    connection.onconnectionstatechange = () => {
      if (connection.connectionState === "failed") {
        setError("Non è stato possibile collegare la chiamata. Riprova più tardi.");
      }
    };
    connectionRef.current = connection;
    return connection;
  }, [sendCandidate]);

  const applyCandidates = useCallback(async (nextSession: CallSession) => {
    const connection = connectionRef.current;
    if (!connection?.remoteDescription) return;

    for (const item of nextSession.candidates) {
      if (item.senderId === currentUserId || appliedCandidatesRef.current.has(item.candidate)) {
        continue;
      }

      try {
        await connection.addIceCandidate(JSON.parse(item.candidate) as RTCIceCandidateInit);
        appliedCandidatesRef.current.add(item.candidate);
      } catch {
        // Un candidato duplicato o arrivato tardi non deve interrompere la chiamata.
      }
    }
  }, [currentUserId]);

  useEffect(() => {
    let mounted = true;

    const poll = async () => {
      try {
        const nextSession = await getCallState(threadId);
        if (!mounted) return;

        if (!nextSession && sessionRef.current) {
          closeLocalCall();
        }
        sessionRef.current = nextSession;
        setSession(nextSession);

        const connection = connectionRef.current;
        if (
          nextSession?.callerId === currentUserId &&
          nextSession.answer &&
          connection &&
          !connection.remoteDescription
        ) {
          const answer = parseSignal(nextSession.answer);
          if (answer) await connection.setRemoteDescription(answer);
        }
        if (nextSession) await applyCandidates(nextSession);
      } catch {
        // La chat continua a funzionare anche se il controllo chiamata non è disponibile.
      }
    };

    void poll();
    const interval = window.setInterval(() => void poll(), 1_400);

    return () => {
      mounted = false;
      window.clearInterval(interval);
      closeLocalCall();
    };
  }, [applyCandidates, closeLocalCall, currentUserId, threadId]);

  async function requestMicrophone() {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Microfono non supportato dal browser.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    localStreamRef.current = stream;
    return stream;
  }

  async function handleStart() {
    try {
      setStarting(true);
      setError("");
      const stream = await requestMicrophone();
      const connection = createConnection();
      stream.getTracks().forEach((track) => connection.addTrack(track, stream));
      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);
      await startCall(threadId, JSON.stringify(offer));
      signalingReadyRef.current = true;
      await Promise.all(localCandidatesRef.current.map((candidate) => sendCallCandidate(threadId, candidate)));
      localCandidatesRef.current = [];
      setSession(await getCallState(threadId));
    } catch (nextError) {
      console.error("Errore avvio chiamata:", nextError);
      closeLocalCall();
      setError("Non è stato possibile avviare la chiamata. Controlla il microfono e riprova.");
    } finally {
      setStarting(false);
    }
  }

  async function handleAnswer() {
    if (!session?.offer) return;

    try {
      setAnswering(true);
      setError("");
      const offer = parseSignal(session.offer);
      if (!offer) throw new Error("Offerta non valida");

      const stream = await requestMicrophone();
      const connection = createConnection();
      stream.getTracks().forEach((track) => connection.addTrack(track, stream));
      await connection.setRemoteDescription(offer);
      await applyCandidates(session);
      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);
      await answerCall(threadId, JSON.stringify(answer));
      signalingReadyRef.current = true;
      await Promise.all(localCandidatesRef.current.map((candidate) => sendCallCandidate(threadId, candidate)));
      localCandidatesRef.current = [];
      setSession(await getCallState(threadId));
    } catch (nextError) {
      console.error("Errore risposta chiamata:", nextError);
      closeLocalCall();
      setError("Non è stato possibile collegare la chiamata.");
    } finally {
      setAnswering(false);
    }
  }

  async function handleEnd() {
    closeLocalCall();
    sessionRef.current = null;
    setSession(null);
    try {
      await endCall(threadId);
    } catch {
      setError("La chiamata è stata chiusa sul tuo dispositivo.");
    }
  }

  function toggleMute() {
    const nextMuted = !muted;
    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !nextMuted;
    });
    setMuted(nextMuted);
  }

  const incoming = session && session.callerId !== currentUserId && !session.answer;
  const active = session && Boolean(session.answer);
  const calling = session && session.callerId === currentUserId && !session.answer;

  return (
    <>
      <button
        type="button"
        onClick={() => void handleStart()}
        disabled={Boolean(session) || starting}
        title="Avvia chiamata audio"
        aria-label="Avvia chiamata audio"
        className="flex size-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {starting ? <Loader2 className="size-5 animate-spin" /> : <Phone className="size-5" />}
      </button>

      {session || starting ? (
        <div className="fixed inset-0 z-[3500] flex items-center justify-center bg-[#020b1f]/85 p-5 backdrop-blur-md">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(145deg,#071a3c_0%,#0F2D5F_48%,#123b73_100%)] p-7 text-center text-white shadow-[0_24px_70px_rgba(1,15,42,0.6)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_26%,rgba(255,255,255,0.16)_48%,transparent_64%)]" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a9d5ff]">Chiamata Commety</p>
              <div className="relative mx-auto mt-6 grid size-28 place-items-center overflow-hidden rounded-full bg-white/15 text-3xl font-black ring-4 ring-emerald-300 shadow-xl">
                {participantAvatarUrl ? <Image src={participantAvatarUrl} alt={participantName} fill sizes="112px" className="object-cover" /> : participantName.slice(0, 1).toUpperCase()}
              </div>
              <h2 className="mt-5 text-2xl font-black">{participantName}</h2>
              <p className="mt-2 text-sm text-white/80">{incoming ? "Chiamata in arrivo" : active ? "Chiamata audio in corso" : calling ? "Stai chiamando..." : "Preparazione chiamata..."}</p>
              {error ? <p className="mt-4 text-sm text-red-200">{error}</p> : null}

              {incoming ? <div className="mt-8 grid grid-cols-2 gap-3"><button type="button" onClick={() => void handleEnd()} className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-red-500 font-black text-white transition hover:bg-red-400"><PhoneOff className="size-5" />Rifiuta</button><button type="button" disabled={answering} onClick={() => void handleAnswer()} className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 font-black text-white transition hover:bg-emerald-400 disabled:opacity-60">{answering ? <Loader2 className="size-5 animate-spin" /> : <Phone className="size-5" />}Accetta</button></div> : <div className="mt-8 flex justify-center gap-4"><button type="button" onClick={toggleMute} className="grid size-14 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25" aria-label={muted ? "Riattiva microfono" : "Silenzia microfono"}>{muted ? <MicOff className="size-6" /> : <Mic className="size-6" />}</button><button type="button" onClick={() => void handleEnd()} className="grid size-14 place-items-center rounded-full bg-red-500 text-white transition hover:bg-red-400" aria-label="Termina chiamata"><PhoneOff className="size-6" /></button></div>}
            </div>
          </div>
          <audio ref={remoteAudioRef} autoPlay />
        </div>
      ) : null}
    </>
  );
}
