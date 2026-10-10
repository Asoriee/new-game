import { economy } from './economyState.svelte';
import { sound } from '../services/audio';

export interface InventoryTile {
  id: string;
  chainId: string;
  level: number;
}

export const INITIAL_SLOT_COUNT = 5;
export const MAX_SLOT_COUNT = 25;

class InventoryState {
  slotCount = $state(INITIAL_SLOT_COUNT);
  slots = $state<(InventoryTile | null)[]>(new Array(INITIAL_SLOT_COUNT).fill(null));
  isDrawerOpen = $state(false);

  constructor() {
    this.load();
  }

  private load() {
    try {
      const data = localStorage.getItem('mma_inventory');
      if (data) {
        const parsed = JSON.parse(data);
        if (typeof parsed.slotCount === 'number' && Array.isArray(parsed.slots)) {
          this.slotCount = Math.min(MAX_SLOT_COUNT, Math.max(INITIAL_SLOT_COUNT, parsed.slotCount));
          const loadedSlots: (InventoryTile | null)[] = new Array(this.slotCount).fill(null);
          for (let i = 0; i < this.slotCount; i++) {
            if (parsed.slots[i]) {
              loadedSlots[i] = parsed.slots[i];
            }
          }
          this.slots = loadedSlots;
          return;
        }
      }
    } catch {}

    this.slotCount = INITIAL_SLOT_COUNT;
    this.slots = new Array(INITIAL_SLOT_COUNT).fill(null);
  }

  public save() {
    try {
      localStorage.setItem('mma_inventory', JSON.stringify({
        slotCount: this.slotCount,
        slots: this.slots
      }));
    } catch {}
  }

  /**
   * Cost formula: Cost = Math.round(50 * 1.5 ^ (slotCount - 5))
   */
  public get nextSlotCost(): number {
    return Math.round(50 * Math.pow(1.5, this.slotCount - INITIAL_SLOT_COUNT));
  }

  public get usedSlotsCount(): number {
    return this.slots.filter((s) => s !== null).length;
  }

  public get isFull(): boolean {
    return this.usedSlotsCount >= this.slotCount;
  }

  public get canBuySlot(): boolean {
    return this.slotCount < MAX_SLOT_COUNT && economy.coins >= this.nextSlotCost;
  }

  public openDrawer() {
    this.isDrawerOpen = true;
    sound.playClick();
  }

  public closeDrawer() {
    this.isDrawerOpen = false;
    sound.playClick();
  }

  public toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
    sound.playClick();
  }

  public buyNextSlot(): boolean {
    if (this.slotCount >= MAX_SLOT_COUNT) return false;
    const cost = this.nextSlotCost;
    if (!economy.spendCoins(cost)) {
      sound.playClick();
      return false;
    }

    this.slotCount += 1;
    this.slots = [...this.slots, null];
    sound.playFanfare();
    this.save();
    return true;
  }

  public storeItem(tile: { id: string; chainId: string; level: number }): boolean {
    const firstEmptyIndex = this.slots.findIndex((s) => s === null);
    if (firstEmptyIndex === -1) return false;

    this.slots[firstEmptyIndex] = {
      id: tile.id,
      chainId: tile.chainId,
      level: tile.level
    };

    sound.playPop();
    this.save();
    return true;
  }

  public removeSlotItem(slotIndex: number): InventoryTile | null {
    if (slotIndex < 0 || slotIndex >= this.slots.length) return null;
    const item = this.slots[slotIndex];
    if (!item) return null;

    this.slots[slotIndex] = null;
    this.save();
    return item;
  }
}

export const inventory = new InventoryState();
