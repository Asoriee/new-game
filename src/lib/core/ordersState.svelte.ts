import { INITIAL_ORDERS, type CharacterOrder, CHARACTERS } from '../config/quests';
import { board } from './boardState.svelte';
import { economy } from './economyState.svelte';
import { sound } from '../services/audio';

class OrdersState {
  orders = $state<CharacterOrder[]>([]);

  constructor() {
    this.load();
  }

  private load() {
    try {
      const data = localStorage.getItem('mma_orders');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.orders = parsed;
          return;
        }
      }
    } catch {}

    this.orders = [...INITIAL_ORDERS];
  }

  public save() {
    try {
      localStorage.setItem('mma_orders', JSON.stringify(this.orders));
    } catch {}
  }

  public checkRequirementMet(chainId: string, level: number): boolean {
    return board.cells.some(
      (tile) =>
        tile !== null &&
        !tile.isGenerator &&
        !tile.isCobweb &&
        !tile.isBubble &&
        tile.chainId === chainId &&
        tile.level === level
    );
  }

  public canCompleteOrder(order: CharacterOrder): boolean {
    return order.requirements.every((req) => this.checkRequirementMet(req.chainId, req.level));
  }

  public completeOrder(orderId: string): boolean {
    const orderIndex = this.orders.findIndex((o) => o.id === orderId);
    if (orderIndex === -1) return false;

    const order = this.orders[orderIndex];
    if (!this.canCompleteOrder(order)) return false;

    // Remove matching items from board
    for (const req of order.requirements) {
      const cellIdx = board.cells.findIndex(
        (tile) =>
          tile !== null &&
          !tile.isGenerator &&
          !tile.isCobweb &&
          !tile.isBubble &&
          tile.chainId === req.chainId &&
          tile.level === req.level
      );
      if (cellIdx !== -1) {
        board.cells[cellIdx] = null;
      }
    }

    // Award rewards
    economy.addCoins(order.rewardCoins);
    economy.addStars(order.rewardStars);
    economy.addXp(order.rewardXp);
    sound.playFanfare();
    board.save();

    // Generate replacement order
    this.generateReplacementOrder(orderIndex);
    this.save();
    return true;
  }

  private generateReplacementOrder(index: number) {
    const charKeys = ['corvus', 'lucian', 'mira'] as const;
    const randomCharKey = charKeys[Math.floor(Math.random() * charKeys.length)];
    const char = CHARACTERS[randomCharKey];

    const chainIds = ['potions', 'scrolls', 'crystals'];
    const randomChain = chainIds[Math.floor(Math.random() * chainIds.length)];
    const randomLevel = Math.floor(Math.random() * 3) + 2; // Level 2 to 4

    const newOrder: CharacterOrder = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      characterName: char.name,
      characterRole: char.role,
      avatarSvg: char.svg,
      dialogue: 'Академия Арканум нуждается в твоем алхимическом мастерстве!',
      requirements: [{ chainId: randomChain, level: randomLevel }],
      rewardCoins: randomLevel * 15,
      rewardStars: Math.max(1, Math.floor(randomLevel / 2)),
      rewardXp: randomLevel * 20
    };

    this.orders[index] = newOrder;
  }
}

export const orders = new OrdersState();
