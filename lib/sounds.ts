/**
 * Breve accordo ascendente per confermare una pubblicazione riuscita.
 * Non usa file esterni e fallisce silenziosamente se l'audio è bloccato.
 */
export function playPublicationChime(): void {
  if (typeof window === "undefined" || typeof AudioContext === "undefined") {
    return;
  }

  const audioContext = new AudioContext();

  void audioContext.resume().then(() => {
    const startTime = audioContext.currentTime;

    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const noteStart = startTime + index * 0.11;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.08, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.34);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + 0.35);
    });

    window.setTimeout(() => {
      void audioContext.close();
    }, 800);
  }).catch(() => {
    void audioContext.close();
  });
}
