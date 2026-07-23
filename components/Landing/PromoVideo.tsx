"use client";

import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reduceMotion.matches) {
      videoRef.current?.pause();
    }
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setPlaying(true);
      return;
    }

    video.pause();
    setPlaying(false);
  }

  function toggleAudio() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  }

  return (
    <div
      aria-label="Video promozionale Commety"
      className="relative min-h-[500px] overflow-hidden rounded-[1.45rem] bg-[#061735] sm:min-h-[600px]"
    >
      <Image
        src="/videos/commety-promo-poster.jpg"
        alt=""
        fill
        priority
        aria-hidden="true"
        sizes="(max-width: 1024px) 100vw, 620px"
        className="scale-110 object-cover opacity-35 blur-2xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(6,23,53,0.18)_48%,rgba(6,23,53,0.72)_100%)]" />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/commety-promo-poster.jpg"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 z-10 h-full w-full object-contain"
      >
        <source src="/videos/commety-promo.mp4" type="video/mp4" />
      </video>

      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <button
          type="button"
          onClick={() => void togglePlayback()}
          aria-label={playing ? "Metti in pausa il video" : "Riproduci il video"}
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-[#061735]/80 text-white shadow-lg backdrop-blur transition hover:bg-[#0F2D5F] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/60"
        >
          {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
        </button>
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={muted ? "Attiva l'audio del video" : "Disattiva l'audio del video"}
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-[#061735]/80 text-white shadow-lg backdrop-blur transition hover:bg-[#0F2D5F] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/60"
        >
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      </div>
    </div>
  );
}
