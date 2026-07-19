"use client";

import {
  Car,
  CloudRain,
  Music2,
  Pause,
  Play,
  TriangleAlert,
  Waves,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    id: "eventi",
    label: "Eventi",
    title: "Concerto live",
    detail: "Piazza del Popolo · 21:30",
    audience: "43 interessati",
    color: "#8B5CF6",
    Icon: Music2,
  },
  {
    id: "meteo",
    label: "Meteo",
    title: "Pioggia intensa",
    detail: "Quartiere Prati · ora",
    audience: "12 conferme",
    color: "#2563FF",
    Icon: CloudRain,
  },
  {
    id: "mare",
    label: "Mare",
    title: "Mare mosso",
    detail: "Ostia · aggiornato ora",
    audience: "8 conferme",
    color: "#06B6D4",
    Icon: Waves,
  },
  {
    id: "viabilita",
    label: "Viabilità",
    title: "Traffico rallentato",
    detail: "Via Cristoforo Colombo",
    audience: "19 conferme",
    color: "#F59E0B",
    Icon: Car,
  },
  {
    id: "pericoli",
    label: "Pericoli",
    title: "Albero sulla strada",
    detail: "Parco dell'Appia · ora",
    audience: "6 conferme",
    color: "#EF4444",
    Icon: TriangleAlert,
  },
] as const;

type Slide = (typeof SLIDES)[number];

function playAmbientChord(audioContext: AudioContext, destination: AudioNode) {
  const start = audioContext.currentTime;

  [220, 277.18, 329.63].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.018, start + 0.12 + index * 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.8);
    oscillator.connect(gain);
    gain.connect(destination);
    oscillator.start(start);
    oscillator.stop(start + 1.9);
  });
}

function MapEffects({ slide }: { slide: Slide }) {
  if (slide.id === "eventi") {
    return <div className="commety-event-equalizer flex h-9 items-end gap-1" aria-hidden="true"><span /><span /><span /><span /><span /></div>;
  }

  if (slide.id === "meteo") {
    return <div className="commety-slider-rain" aria-hidden="true"><i /><i /><i /><i /><i /></div>;
  }

  if (slide.id === "mare") {
    return <div className="commety-slider-waves" aria-hidden="true"><i /><i /><i /></div>;
  }

  if (slide.id === "viabilita") {
    return <div className="commety-slider-traffic" aria-hidden="true"><i /><i /><i /><i /></div>;
  }

  return <div className="commety-slider-alert" aria-hidden="true"><i /><i /><i /></div>;
}

export function LiveMapSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioTimerRef = useRef<number | null>(null);
  const slide = SLIDES[activeIndex];
  const Icon = slide.Icon;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, []);

  function stopAudio() {
    if (audioTimerRef.current !== null) {
      window.clearInterval(audioTimerRef.current);
      audioTimerRef.current = null;
    }

    const audioContext = audioContextRef.current;
    audioContextRef.current = null;
    setAudioEnabled(false);

    if (audioContext) {
      void audioContext.close();
    }
  }

  function toggleAudio() {
    if (audioEnabled) {
      stopAudio();
      return;
    }

    const audioContext = new AudioContext();
    const masterGain = audioContext.createGain();
    masterGain.gain.value = 0.8;
    masterGain.connect(audioContext.destination);
    audioContextRef.current = audioContext;

    void audioContext.resume().then(() => {
      playAmbientChord(audioContext, masterGain);
      audioTimerRef.current = window.setInterval(() => {
        playAmbientChord(audioContext, masterGain);
      }, 2400);
      setAudioEnabled(true);
    }).catch(stopAudio);
  }

  useEffect(() => stopAudio, []);

  return (
    <div
      aria-label="Anteprima animata delle categorie Commety sulla mappa"
      className="relative min-h-[420px] overflow-hidden rounded-[1.45rem] bg-[#d4decf] sm:min-h-[500px]"
    >
      <div key={slide.id} className={`commety-slider-scene commety-slider-scene-${slide.id}`} />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(69,91,84,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(69,91,84,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute -left-10 top-28 h-3 w-[125%] rotate-[-16deg] rounded-full bg-white/85 shadow-[0_0_0_5px_rgba(113,127,119,0.15)]" />
      <div className="absolute -right-14 top-64 h-2.5 w-[110%] rotate-[26deg] rounded-full bg-white/80 shadow-[0_0_0_5px_rgba(113,127,119,0.15)]" />
      <div className="absolute left-[16%] top-0 h-[120%] w-2 rotate-[28deg] bg-white/75 shadow-[0_0_0_5px_rgba(113,127,119,0.15)]" />

      <div className="absolute left-7 top-7 z-10 rounded-full border border-white/50 bg-[#061d43]/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white/85 shadow-sm backdrop-blur">
        <span className="mr-2 inline-block size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
        In diretta
      </div>
      <button type="button" onClick={toggleAudio} aria-pressed={audioEnabled} className="absolute right-7 top-7 z-20 flex size-10 items-center justify-center rounded-full border border-white/50 bg-[#061d43]/85 text-white shadow-sm backdrop-blur transition hover:scale-105" title={audioEnabled ? "Disattiva l'audio" : "Attiva l'audio"}>
        {audioEnabled ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
      </button>

      <p className="absolute left-[14%] top-[27%] text-xs font-bold tracking-wide text-slate-700/65">ROMA</p>
      <p className="absolute right-[15%] top-[52%] text-xs font-bold tracking-wide text-slate-700/65">TIVOLI</p>
      <p className="absolute bottom-[22%] left-[38%] text-xs font-bold tracking-wide text-slate-700/65">CASTELLI ROMANI</p>

      <div className="commety-map-signal absolute left-[25%] top-[39%]" style={{ animationDelay: "-1.2s" }}>
        <span className="absolute -inset-3 rounded-full border" style={{ borderColor: slide.color }} />
        <span className="relative flex size-12 items-center justify-center rounded-2xl border-2 border-white text-white shadow-[0_10px_20px_rgba(2,16,42,0.35)]" style={{ backgroundColor: slide.color }}><Icon className="size-5" /></span>
      </div>

      <div className="commety-slider-card absolute right-[7%] top-[20%] w-[205px] overflow-hidden rounded-2xl border border-white/50 p-4 text-white shadow-[0_16px_32px_rgba(2,16,42,0.35)]" style={{ background: `linear-gradient(135deg, ${slide.color}, #071d43 170%)` }}>
        <div className="absolute -right-6 -top-6 size-24 rounded-full bg-white/15 blur-xl" />
        <div className="relative flex items-start justify-between gap-2"><span className="flex size-9 items-center justify-center rounded-xl border border-white/30 bg-white/15"><Icon className="size-4" /></span><span className="rounded-full bg-white/20 px-2 py-1 text-[9px] font-bold uppercase tracking-wider">{slide.label}</span></div>
        <div className="relative mt-4"><p className="text-sm font-black">{slide.title}</p><p className="mt-0.5 text-[10px] text-white/80">{slide.detail}</p></div>
        <div className="relative mt-4 flex items-end justify-between"><MapEffects slide={slide} /><span className="text-[10px] font-bold text-white/90">{slide.audience}</span></div>
      </div>

      <div className="absolute bottom-[27%] left-[10%] rounded-2xl border border-white/25 bg-[#071d43]/90 px-3 py-2.5 text-white shadow-[0_14px_30px_rgba(1,15,42,0.35)] backdrop-blur"><p className="text-xs font-bold">La tua community</p><p className="mt-0.5 text-[10px] text-white/65">aggiorna la mappa</p></div>

      <div className="absolute bottom-7 left-7 right-7 z-20 rounded-2xl border border-white/20 bg-[#061d43]/85 p-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold text-white">Scopri cosa accade vicino a te</p><p className="mt-0.5 text-[10px] text-white/65">Ogni scena è una categoria Commety</p></div><span className="rounded-xl bg-emerald-400 px-3 py-1.5 text-xs font-black text-[#063d2b]">+ 12</span></div>
      </div>
    </div>
  );
}
