import { CHAINS, GENERATORS, getItem, type ItemDef } from '../config/chains';
import { sound } from '../services/audio';
import { energy } from './energyState.svelte';
import { economy } from './economyState.svelte';

export const BOARD_COLS = 7;
export const BOARD_ROWS = 9;
export const TOTAL_CELLS = BOARD_COLS * BOARD_ROWS;

export interface BoardTile {
  id: string;
  chainId: string;
  level: number;
  isGenerator?: boolean;
  generatorId?: string;
  isCobweb?: boolean;
  isBubble?: boolean;
  bubbleExpiresAt?: number;
}

export interface ParticleEffect {
  id: number;
  cellIndex: number;
  color: string;
}

class BoardState {
  cells = $state<(BoardTile | null)[]>(new Array(TOTAL_CELLS).fill(null));
  selectedIndex = $state<number | null>(null);
  draggedIndex = $state<number | null>(null);
  particles = $state<ParticleEffect[]>([]);
  private nextParticleId = 1;

  constructor() {
    this.load();
  }

  private load() {
    try {
      const data = localStorage.getItem('mma_board');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length === TOTAL_CELLS) {
          this.cells = parsed;
          return;
        }
      }
    } catch {}

    this.initStarterBoard();
  }

  public save() {
    try {
      localStorage.setItem('mma_board', JSON.stringify(this.cells));
    } catch {}
  }

  public initStarterBoard() {
    const newCells: (BoardTile | null)[] = new Array(TOTAL_CELLS).fill(null);

    // Generators in row 4
    newCells[22] = {
      id: 'gen_1',
      chainId: 'potions',
      level: 1,
      isGenerator: true,
      generatorId: 'gen_cauldron'
    };

    newCells[23] = {
      id: 'gen_2',
      chainId: 'scrolls',
      level: 1,
      isGenerator: true,
      generatorId: 'gen_desk'
    };

    newCells[24] = {
      id: 'gen_3',
      chainId: 'crystals',
      level: 1,
      isGenerator: true,
      generatorId: 'gen_geode'
    };

    // Starter Items to merge right away
    newCells[29] = { id: 'pot_init_1', chainId: 'potions', level: 1 };
    newCells[30] = { id: 'pot_init_2', chainId: 'potions', level: 1 };
    newCells[31] = { id: 'scr_init_1', chainId: 'scrolls', level: 1 };
    newCells[32] = { id: 'scr_init_2', chainId: 'scrolls', level: 1 };

    // Cobwebbed target items
    newCells[37] = { id: 'crys_web_1', chainId: 'crystals', level: 1, isCobweb: true };
    newCells[38] = { id: 'pot_web_2', chainId: 'potions', level: 2, isCobweb: true };

    this.cells = newCells;
    this.save();
  }

  public findNearestEmptyCell(startIndex: number): number | null {
    // Priority: immediate neighborhood in spiral order
    const visited = new Set<number>();
    const queue = [startIndex];
    visited.add(startIndex);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (this.cells[curr] === null) {
        return curr;
      }

      const r = Math.floor(curr / BOARD_COLS);
      const c = curr % BOARD_COLS;
      const neighbors = [
        r > 0 ? curr - BOARD_COLS : -1,
        r < BOARD_ROWS - 1 ? curr + BOARD_COLS : -1,
        c > 0 ? curr - 1 : -1,
        c < BOARD_COLS - 1 ? curr + 1 : -1
      ];

      for (const n of neighbors) {
        if (n >= 0 && n < TOTAL_CELLS && !visited.has(n)) {
          visited.add(n);
          queue.push(n);
        }
      }
    }

    return null;
  }

  public spawnFromGenerator(index: number): boolean {
    const tile = this.cells[index];
    if (!tile || !tile.isGenerator || !tile.generatorId) return false;

    const genDef = GENERATORS[tile.generatorId];
    if (!genDef) return false;

    if (!energy.spend(1)) {
      sound.playClick();
      return false;
    }

    const emptyCell = this.findNearestEmptyCell(index);
    if (emptyCell === null) {
      // Board is completely full
      energy.add(1);
      sound.playClick();
      return false;
    }

    // 80% chance Level 1, 20% chance Level 2
    const spawnLevel = Math.random() < 0.2 ? 2 : 1;

    this.cells[emptyCell] = {
      id: `${genDef.spawnChainId}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      chainId: genDef.spawnChainId,
      level: spawnLevel
    };

    sound.playPop();
    this.addParticleEffect(emptyCell, genDef.color);
    this.save();
    return true;
  }

  public canMerge(sourceIndex: number, targetIndex: number): boolean {
    if (sourceIndex === targetIndex) return false;
    const src = this.cells[sourceIndex];
    const dst = this.cells[targetIndex];
    if (!src || !dst) return false;
    if (src.isGenerator || dst.isGenerator) return false;
    if (src.isCobweb) return false; // Source tile under cobweb cannot be moved
    if (src.chainId !== dst.chainId) return false;
    if (src.level !== dst.level) return false;

    const maxLevel = CHAINS[src.chainId]?.items.length || 8;
    return src.level < maxLevel;
  }

  public mergeTiles(sourceIndex: number, targetIndex: number): boolean {
    if (!this.canMerge(sourceIndex, targetIndex)) return false;

    const src = this.cells[sourceIndex]!;
    const dst = this.cells[targetIndex]!;

    const newLevel = dst.level + 1;
    const targetChain = dst.chainId;

    // Remove source tile
    this.cells[sourceIndex] = null;

    // Upgrade target tile and clear cobweb if present
    this.cells[targetIndex] = {
      id: `${targetChain}_${Date.now()}`,
      chainId: targetChain,
      level: newLevel,
      isCobweb: false
    };

    // Feedback
    sound.playMerge(newLevel);
    const itemDef = getItem(targetChain, newLevel);
    this.addParticleEffect(targetIndex, itemDef?.color || '#f5cd79');

    // Experience award on merge
    economy.addXp(newLevel * 5);

    // 12% chance to spawn a merge bubble for T4+
    if (newLevel >= 4 && Math.random() < 0.12) {
      const bubbleCell = this.findNearestEmptyCell(targetIndex);
      if (bubbleCell !== null) {
        this.cells[bubbleCell] = {
          id: `bubble_${Date.now()}`,
          chainId: targetChain,
          level: newLevel,
          isBubble: true,
          bubbleExpiresAt: Date.now() + 60000
        };
        sound.playSparkle();
      }
    }

    this.selectedIndex = targetIndex;
    this.save();
    return true;
  }

  public moveOrSwapTile(sourceIndex: number, targetIndex: number): boolean {
    if (sourceIndex === targetIndex) return false;
    const src = this.cells[sourceIndex];
    if (!src) return false;
    if (src.isCobweb) return false; // Cobweb tiles cannot be moved

    const dst = this.cells[targetIndex];

    if (dst === null) {
      // Empty destination: plain move
      this.cells[targetIndex] = src;
      this.cells[sourceIndex] = null;
      sound.playClick();
      this.selectedIndex = targetIndex;
      this.save();
      return true;
    }

    // Try merge first
    if (this.canMerge(sourceIndex, targetIndex)) {
      return this.mergeTiles(sourceIndex, targetIndex);
    }

    // Swap if destination is movable
    if (!dst.isCobweb) {
      this.cells[targetIndex] = src;
      this.cells[sourceIndex] = dst;
      sound.playClick();
      this.selectedIndex = targetIndex;
      this.save();
      return true;
    }

    return false;
  }

  public unlockCobweb(index: number) {
    const tile = this.cells[index];
    if (tile && tile.isCobweb) {
      tile.isCobweb = false;
      sound.playSparkle();
      this.save();
    }
  }

  public popBubble(index: number, claimItem: boolean) {
    const tile = this.cells[index];
    if (tile && tile.isBubble) {
      if (claimItem) {
        tile.isBubble = false;
        tile.bubbleExpiresAt = undefined;
        sound.playSparkle();
      } else {
        // Turns into 1 coin
        this.cells[index] = null;
        economy.addCoins(1);
        sound.playClick();
      }
      this.save();
    }
  }

  public sellTile(index: number): boolean {
    const tile = this.cells[index];
    if (!tile || tile.isGenerator || tile.isCobweb || tile.isBubble) return false;

    const itemDef = getItem(tile.chainId, tile.level);
    if (!itemDef) return false;

    economy.addCoins(itemDef.sellValue);
    sound.playSparkle();
    this.cells[index] = null;
    this.selectedIndex = null;
    this.save();
    return true;
  }

  public selectCell(index: number) {
    if (this.selectedIndex === index) {
      // Tapping selected generator again spawns item
      const tile = this.cells[index];
      if (tile?.isGenerator) {
        this.spawnFromGenerator(index);
        return;
      }
      this.selectedIndex = null;
    } else {
      this.selectedIndex = index;
      const tile = this.cells[index];
      if (tile?.isGenerator) {
        sound.playClick();
      } else if (tile) {
        sound.playClick();
      }
    }
  }

  public addParticleEffect(cellIndex: number, color: string) {
    const id = this.nextParticleId++;
    this.particles = [...this.particles, { id, cellIndex, color }];
    setTimeout(() => {
      this.particles = this.particles.filter((p) => p.id !== id);
    }, 600);
  }

  public get selectedItemDef(): ItemDef | null {
    if (this.selectedIndex === null) return null;
    const tile = this.cells[this.selectedIndex];
    if (!tile || tile.isGenerator) return null;
    return getItem(tile.chainId, tile.level) || null;
  }
}

export const board = new BoardState();
