export class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = "sine") {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playChime() {
    // Soft chime sound
    this.playTone(523.25, 0.3, "sine"); // C5
    setTimeout(() => this.playTone(659.25, 0.3, "sine"), 100); // E5
    setTimeout(() => this.playTone(783.99, 0.4, "sine"), 200); // G5
  }

  playCardFlip() {
    // Quick flip sound
    this.playTone(800, 0.1, "triangle");
  }

  playTyping() {
    // Subtle typing sound
    this.playTone(400, 0.05, "square");
  }

  playReveal() {
    // Dramatic reveal sound
    this.playTone(261.63, 0.5, "sine"); // C4
    setTimeout(() => this.playTone(329.63, 0.5, "sine"), 200); // E4
    setTimeout(() => this.playTone(392.00, 0.8, "sine"), 400); // G4
    setTimeout(() => this.playTone(523.25, 1.0, "sine"), 600); // C5
  }

  toggle(enabled?: boolean) {
    this.enabled = enabled !== undefined ? enabled : !this.enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();
