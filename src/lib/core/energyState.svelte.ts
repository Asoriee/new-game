/**
 * Svelte 5 Rune-based Energy State
 * Full offline catch-up regeneration: +1 energy per 90 seconds.
 */

class EnergyState {
  current = $state(100);
  max = $state(100);
  lastRefillTimestamp = $state(Date.now());
  secondsRemaining = $state(90);

  private timerInterval: number | null = null;

  constructor() {
    this.load();
    this.catchUpOffline();
    this.startTimer();
  }

  private load() {
    try {
      const data = localStorage.getItem('mma_energy');
      if (data) {
        const parsed = JSON.parse(data);
        if (typeof parsed.current === 'number') this.current = parsed.current;
        if (typeof parsed.lastRefillTimestamp === 'number') this.lastRefillTimestamp = parsed.lastRefillTimestamp;
      }
    } catch {}
  }

  public save() {
    try {
      localStorage.setItem('mma_energy', JSON.stringify({
        current: this.current,
        lastRefillTimestamp: this.lastRefillTimestamp
      }));
    } catch {}
  }

  private catchUpOffline() {
    if (this.current >= this.max) {
      this.lastRefillTimestamp = Date.now();
      return;
    }

    const elapsedSeconds = Math.floor((Date.now() - this.lastRefillTimestamp) / 1000);
    const recoveredEnergy = Math.floor(elapsedSeconds / 90);
    const remainderSeconds = elapsedSeconds % 90;

    if (recoveredEnergy > 0) {
      this.current = Math.min(this.max, this.current + recoveredEnergy);
      this.lastRefillTimestamp = Date.now() - (remainderSeconds * 1000);
    }
    this.secondsRemaining = 90 - remainderSeconds;
    this.save();
  }

  private startTimer() {
    if (typeof window === 'undefined') return;
    this.timerInterval = window.setInterval(() => {
      if (this.current >= this.max) {
        this.secondsRemaining = 90;
        return;
      }

      this.secondsRemaining -= 1;
      if (this.secondsRemaining <= 0) {
        this.current = Math.min(this.max, this.current + 1);
        this.secondsRemaining = 90;
        this.lastRefillTimestamp = Date.now();
        this.save();
      }
    }, 1000);
  }

  public spend(amount: number = 1): boolean {
    if (this.current >= amount) {
      this.current -= amount;
      if (this.current < this.max && this.secondsRemaining === 90) {
        this.lastRefillTimestamp = Date.now();
      }
      this.save();
      return true;
    }
    return false;
  }

  public add(amount: number) {
    this.current = Math.min(this.max, this.current + amount);
    this.save();
  }

  public get formattedNextRefill(): string {
    if (this.current >= this.max) return 'МАКС';
    const mins = Math.floor(this.secondsRemaining / 60);
    const secs = this.secondsRemaining % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

export const energy = new EnergyState();
