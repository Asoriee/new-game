import { ALCHEMIST_LAB, type RoomObjectDef } from '../config/roomConfig';
import { economy } from './economyState.svelte';
import { sound } from '../services/audio';

export interface UnlockedStyle {
  variant: 'A' | 'B' | 'C';
  unlockedAt: number;
}

class MetaRoomState {
  unlockedObjects = $state<Record<string, UnlockedStyle>>({});
  activeObjectId = $state<string | null>(null);

  constructor() {
    this.load();
  }

  private load() {
    try {
      const data = localStorage.getItem('mma_meta_room');
      if (data) {
        this.unlockedObjects = JSON.parse(data);
      }
    } catch {}
  }

  public save() {
    try {
      localStorage.setItem('mma_meta_room', JSON.stringify(this.unlockedObjects));
    } catch {}
  }

  public isUnlocked(objectId: string): boolean {
    return !!this.unlockedObjects[objectId];
  }

  public getVariant(objectId: string): 'A' | 'B' | 'C' | null {
    return this.unlockedObjects[objectId]?.variant || null;
  }

  public get completionPercentage(): number {
    const total = ALCHEMIST_LAB.objects.length;
    const unlocked = Object.keys(this.unlockedObjects).length;
    return Math.round((unlocked / total) * 100);
  }

  public selectObject(objectId: string | null) {
    this.activeObjectId = objectId;
    if (objectId) {
      sound.playClick();
    }
  }

  public unlockOrChangeStyle(objectDef: RoomObjectDef, variant: 'A' | 'B' | 'C'): boolean {
    const currentlyUnlocked = this.isUnlocked(objectDef.id);

    if (!currentlyUnlocked) {
      if (!economy.spendStars(objectDef.starCost)) {
        sound.playClick();
        return false;
      }
      economy.addXp(50);
      sound.playFanfare();
    } else {
      sound.playSparkle();
    }

    this.unlockedObjects[objectDef.id] = {
      variant,
      unlockedAt: Date.now()
    };

    this.activeObjectId = null;
    this.save();
    return true;
  }
}

export const metaRoom = new MetaRoomState();
