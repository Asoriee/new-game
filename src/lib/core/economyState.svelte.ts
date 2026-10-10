/**
 * Svelte 5 Rune-based Economy State
 */

class EconomyState {
  coins = $state(150);
  gems = $state(25);
  stars = $state(3);
  xp = $state(0);
  level = $state(1);

  constructor() {
    this.load();
  }

  private load() {
    try {
      const data = localStorage.getItem('mma_economy');
      if (data) {
        const parsed = JSON.parse(data);
        if (typeof parsed.coins === 'number') this.coins = parsed.coins;
        if (typeof parsed.gems === 'number') this.gems = parsed.gems;
        if (typeof parsed.stars === 'number') this.stars = parsed.stars;
        if (typeof parsed.xp === 'number') this.xp = parsed.xp;
        if (typeof parsed.level === 'number') this.level = parsed.level;
      }
    } catch {}
  }

  public save() {
    try {
      localStorage.setItem('mma_economy', JSON.stringify({
        coins: this.coins,
        gems: this.gems,
        stars: this.stars,
        xp: this.xp,
        level: this.level
      }));
    } catch {}
  }

  public addCoins(amount: number) {
    this.coins += amount;
    this.save();
  }

  public spendCoins(amount: number): boolean {
    if (this.coins >= amount) {
      this.coins -= amount;
      this.save();
      return true;
    }
    return false;
  }

  public addGems(amount: number) {
    this.gems += amount;
    this.save();
  }

  public spendGems(amount: number): boolean {
    if (this.gems >= amount) {
      this.gems -= amount;
      this.save();
      return true;
    }
    return false;
  }

  public addStars(amount: number) {
    this.stars += amount;
    this.save();
  }

  public spendStars(amount: number): boolean {
    if (this.stars >= amount) {
      this.stars -= amount;
      this.save();
      return true;
    }
    return false;
  }

  public addXp(amount: number) {
    this.xp += amount;
    const nextLevelXp = this.level * 100;
    if (this.xp >= nextLevelXp) {
      this.xp -= nextLevelXp;
      this.level += 1;
    }
    this.save();
  }
}

export const economy = new EconomyState();
