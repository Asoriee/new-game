export interface ItemDef {
  id: string;
  chainId: string;
  level: number;
  name: string;
  desc: string;
  sellValue: number;
  color: string;
  svg: string;
}

export interface ChainDef {
  id: string;
  name: string;
  desc: string;
  generatorId: string;
  items: ItemDef[];
}

export interface GeneratorDropRate {
  level: number;
  weight: number;
}

export interface GeneratorDef {
  id: string;
  familyId: string;
  level: number;
  name: string;
  spawnChainId: string;
  color: string;
  maxCharges: number;
  cooldownSeconds: number;
  dropRates: GeneratorDropRate[];
  svg: string;
}

export const GENERATOR_TIERS: Record<string, Record<number, GeneratorDef>> = {
  gen_cauldron: {
    1: {
      id: 'gen_cauldron_1',
      familyId: 'gen_cauldron',
      level: 1,
      name: 'Глиняный Горшок',
      spawnChainId: 'potions',
      color: '#b0724b',
      maxCharges: 12,
      cooldownSeconds: 60,
      dropRates: [{ level: 1, weight: 100 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="18" rx="11" ry="3.5" fill="#5c3826" stroke="#b0724b" stroke-width="1.5"/>
        <ellipse cx="24" cy="18" rx="8.5" ry="2" fill="#784421"/>
        <path d="M13 18c0 10 3 18 11 18s11-8 11-18" fill="#8c502b" stroke="#b0724b" stroke-width="1.5"/>
        <path d="M17 26h14" stroke="#e09260" stroke-width="1.2" stroke-linecap="round"/>
        <circle cx="24" cy="18" r="1.5" fill="#f5cd79"/>
      </svg>`
    },
    2: {
      id: 'gen_cauldron_2',
      familyId: 'gen_cauldron',
      level: 2,
      name: 'Медный Котел',
      spawnChainId: 'potions',
      color: '#e67e22',
      maxCharges: 18,
      cooldownSeconds: 90,
      dropRates: [{ level: 1, weight: 75 }, { level: 2, weight: 25 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="16" rx="13" ry="3.8" fill="#4a2511" stroke="#d35400" stroke-width="1.5"/>
        <ellipse cx="24" cy="16" rx="10" ry="2.2" fill="#8c7ae6" opacity="0.8"/>
        <path d="M11 16c0 11 4 20 13 20s13-9 13-20" fill="#b95319" stroke="#e67e22" stroke-width="1.6"/>
        <path d="M10 20c-3 0-5 2-5 5s2 5 5 5m28-10c3 0 5 2 5 5s-2 5-5 5" stroke="#f39c12" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="21" cy="16" r="1.5" fill="#f5cd79"/>
        <circle cx="27" cy="15.5" r="1" fill="#fff"/>
        <path d="M18 36l-2 5m14-5l2 5" stroke="#7f3b14" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    },
    3: {
      id: 'gen_cauldron_3',
      familyId: 'gen_cauldron',
      level: 3,
      name: 'Алхимический Котел',
      spawnChainId: 'potions',
      color: '#8c7ae6',
      maxCharges: 26,
      cooldownSeconds: 120,
      dropRates: [{ level: 1, weight: 60 }, { level: 2, weight: 30 }, { level: 3, weight: 10 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="14" rx="14" ry="4" fill="#353b48" stroke="#f5cd79" stroke-width="1.5"/>
        <ellipse cx="24" cy="14" rx="11" ry="2.5" fill="#8c7ae6" opacity="0.9"/>
        <circle cx="21" cy="14" r="1.5" fill="#f5cd79"/>
        <circle cx="27" cy="13.5" r="1" fill="#fff"/>
        <path d="M10 14c0 12 4 22 14 22s14-10 14-22" fill="#2f3640" stroke="#f5cd79" stroke-width="1.5"/>
        <path d="M14 24h20" stroke="#f5cd79" stroke-width="1.5" stroke-dasharray="2 3"/>
        <path d="M16 36l-3 6m19-6l3 6" stroke="#e58e26" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="24" cy="27" r="3" fill="#9c88ff"/>
        <path d="M21 7c2-3 4-3 6 0m-8 2c2-2 3-2 5 0" stroke="#f5cd79" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
      </svg>`
    },
    4: {
      id: 'gen_cauldron_4',
      familyId: 'gen_cauldron',
      level: 4,
      name: 'Астральный Тигель',
      spawnChainId: 'potions',
      color: '#f5cd79',
      maxCharges: 36,
      cooldownSeconds: 150,
      dropRates: [{ level: 1, weight: 45 }, { level: 2, weight: 35 }, { level: 3, weight: 15 }, { level: 4, weight: 5 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="12" rx="15" ry="4.5" fill="#1b1429" stroke="#f5cd79" stroke-width="2"/>
        <ellipse cx="24" cy="12" rx="12" ry="3" fill="#9c88ff"/>
        <circle cx="20" cy="12" r="2" fill="#fff"/>
        <circle cx="28" cy="11.5" r="1.5" fill="#f5cd79"/>
        <path d="M9 12c0 14 5 25 15 25s15-11 15-25" fill="#140f22" stroke="#f5cd79" stroke-width="2"/>
        <ellipse cx="24" cy="24" rx="18" ry="5" stroke="#f5cd79" stroke-width="1" stroke-dasharray="3 3" opacity="0.7"/>
        <path d="M14 24l5 3-5 3m20-6l-5 3 5 3" stroke="#f5cd79" stroke-width="1.2"/>
        <circle cx="24" cy="25" r="4.5" fill="#8c7ae6" stroke="#fff" stroke-width="1"/>
        <path d="M15 37l-4 6m22-6l4 6" stroke="#f5cd79" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M20 5c2-3 6-3 8 0m-10 2c3-2 5-2 7 0" stroke="#f5cd79" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`
    }
  },
  gen_desk: {
    1: {
      id: 'gen_desk_1',
      familyId: 'gen_desk',
      level: 1,
      name: 'Деревянный Пюпитр',
      spawnChainId: 'scrolls',
      color: '#8c502b',
      maxCharges: 12,
      cooldownSeconds: 60,
      dropRates: [{ level: 1, weight: 100 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 14l10-3 10 3-10 3z" fill="#4b382a" stroke="#8c502b" stroke-width="1.5"/>
        <path d="M16 14.5l8-2 8 2-8 2z" fill="#784421"/>
        <path d="M23 17v17m2-17v17" stroke="#352213" stroke-width="2"/>
        <path d="M18 34h12m-9 0l-3 7m9-7l3 7" stroke="#8c502b" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`
    },
    2: {
      id: 'gen_desk_2',
      familyId: 'gen_desk',
      level: 2,
      name: 'Волшебная Конторка',
      spawnChainId: 'scrolls',
      color: '#e58e26',
      maxCharges: 18,
      cooldownSeconds: 90,
      dropRates: [{ level: 1, weight: 75 }, { level: 2, weight: 25 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12l12-4 12 4-12 4z" fill="#4b382a" stroke="#f5cd79" stroke-width="1.5"/>
        <path d="M15 13l9-3 9 3-9 3z" fill="#e1b12c" opacity="0.4"/>
        <path d="M22 16v18m4-18v18" stroke="#352213" stroke-width="2"/>
        <path d="M16 34h16m-12 0l-4 8m12-8l4 8" stroke="#f5cd79" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M18 10c2-2 4 1 6-1" stroke="#f5cd79" stroke-width="1.2" stroke-linecap="round"/>
      </svg>`
    },
    3: {
      id: 'gen_desk_3',
      familyId: 'gen_desk',
      level: 3,
      name: 'Фолиантная Кафедра',
      spawnChainId: 'scrolls',
      color: '#f39c12',
      maxCharges: 26,
      cooldownSeconds: 120,
      dropRates: [{ level: 1, weight: 60 }, { level: 2, weight: 30 }, { level: 3, weight: 10 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12l14-5 14 5-14 5z" fill="#2c2c54" stroke="#f5cd79" stroke-width="1.8"/>
        <path d="M13 13l11-4 11 4-11 4z" fill="#40407a"/>
        <rect x="18" y="8" width="12" height="7" rx="1.5" fill="#f5cd79" stroke="#b33939" stroke-width="1"/>
        <path d="M21 17v17m6-17v17" stroke="#f5cd79" stroke-width="2"/>
        <path d="M14 34h20m-14 0l-4 8m14-8l4 8" stroke="#f5cd79" stroke-width="2" stroke-linecap="round"/>
        <circle cx="24" cy="25" r="3" fill="#ffb142"/>
      </svg>`
    },
    4: {
      id: 'gen_desk_4',
      familyId: 'gen_desk',
      level: 4,
      name: 'Астральный Алтарь Знаний',
      spawnChainId: 'scrolls',
      color: '#f5cd79',
      maxCharges: 36,
      cooldownSeconds: 150,
      dropRates: [{ level: 1, weight: 45 }, { level: 2, weight: 35 }, { level: 3, weight: 15 }, { level: 4, weight: 5 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12l16-6 16 6-16 6z" fill="#130f40" stroke="#f5cd79" stroke-width="2"/>
        <path d="M12 13l12-4.5 12 4.5-12 4.5z" fill="#30336b"/>
        <ellipse cx="24" cy="9" rx="10" ry="4" stroke="#f5cd79" stroke-width="1" stroke-dasharray="2 2"/>
        <rect x="18" y="5" width="12" height="7" rx="2" fill="#7ed6df" stroke="#fff" stroke-width="1"/>
        <path d="M24 3v3m-3-1.5h6" stroke="#f5cd79" stroke-width="1.2"/>
        <path d="M20 18v16m8-16v16" stroke="#f5cd79" stroke-width="2.5"/>
        <path d="M12 34h24m-16 0l-5 8m16-8l5 8" stroke="#f5cd79" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="24" cy="26" r="4.5" fill="#e056fd" stroke="#f5cd79" stroke-width="1.5"/>
      </svg>`
    }
  },
  gen_geode: {
    1: {
      id: 'gen_geode_1',
      familyId: 'gen_geode',
      level: 1,
      name: 'Обычный Геод',
      spawnChainId: 'crystals',
      color: '#57606f',
      maxCharges: 10,
      cooldownSeconds: 60,
      dropRates: [{ level: 1, weight: 100 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 26l5-13 10 2 6 10-8 12z" fill="#2f3542" stroke="#57606f" stroke-width="1.5"/>
        <path d="M19 23l5-8 5 8-5 6z" fill="#00d2d3" opacity="0.6"/>
        <circle cx="24" cy="20" r="4" fill="#48dbfb" opacity="0.3"/>
      </svg>`
    },
    2: {
      id: 'gen_geode_2',
      familyId: 'gen_geode',
      level: 2,
      name: 'Сияющий Сросток',
      spawnChainId: 'crystals',
      color: '#00d2d3',
      maxCharges: 16,
      cooldownSeconds: 90,
      dropRates: [{ level: 1, weight: 75 }, { level: 2, weight: 25 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 28l6-16 12 2 8 12-10 14z" fill="#1e272e" stroke="#00d2d3" stroke-width="1.5"/>
        <path d="M18 24l6-10 6 10-6 8z" fill="#00d2d3" opacity="0.6"/>
        <path d="M21 21l3-6 3 6-3 5z" fill="#fff" opacity="0.8"/>
        <circle cx="24" cy="18" r="8" fill="#48dbfb" opacity="0.2"/>
      </svg>`
    },
    3: {
      id: 'gen_geode_3',
      familyId: 'gen_geode',
      level: 3,
      name: 'Первородная Мана-Жила',
      spawnChainId: 'crystals',
      color: '#48dbfb',
      maxCharges: 24,
      cooldownSeconds: 120,
      dropRates: [{ level: 1, weight: 60 }, { level: 2, weight: 30 }, { level: 3, weight: 10 }],
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4l12 18-12 22-12-22z" fill="#0c2461" stroke="#48dbfb" stroke-width="2"/>
        <path d="M24 4l8 18-8 22-8-22z" fill="#1e3799" stroke="#60a3bc" stroke-width="1.5"/>
        <polygon points="24,10 30,22 24,34 18,22" fill="#82ccdd"/>
        <circle cx="24" cy="22" r="5" fill="#fff" opacity="0.9"/>
        <ellipse cx="24" cy="22" rx="18" ry="6" stroke="#48dbfb" stroke-width="1.2" stroke-dasharray="3 3"/>
        <circle cx="10" cy="20" r="2" fill="#48dbfb"/>
        <circle cx="38" cy="24" r="2" fill="#48dbfb"/>
      </svg>`
    }
  }
};

/**
 * Universal lookup supporting both legacy generator keys ('gen_cauldron') and tier IDs ('gen_cauldron_1')
 */
export const GENERATORS: Record<string, GeneratorDef> = {
  gen_cauldron: GENERATOR_TIERS.gen_cauldron[1],
  gen_cauldron_1: GENERATOR_TIERS.gen_cauldron[1],
  gen_cauldron_2: GENERATOR_TIERS.gen_cauldron[2],
  gen_cauldron_3: GENERATOR_TIERS.gen_cauldron[3],
  gen_cauldron_4: GENERATOR_TIERS.gen_cauldron[4],
  gen_desk: GENERATOR_TIERS.gen_desk[1],
  gen_desk_1: GENERATOR_TIERS.gen_desk[1],
  gen_desk_2: GENERATOR_TIERS.gen_desk[2],
  gen_desk_3: GENERATOR_TIERS.gen_desk[3],
  gen_desk_4: GENERATOR_TIERS.gen_desk[4],
  gen_geode: GENERATOR_TIERS.gen_geode[1],
  gen_geode_1: GENERATOR_TIERS.gen_geode[1],
  gen_geode_2: GENERATOR_TIERS.gen_geode[2],
  gen_geode_3: GENERATOR_TIERS.gen_geode[3]
};

export function getGeneratorTier(familyOrId: string, level: number = 1): GeneratorDef {
  const family = familyOrId.replace(/_\d+$/, '');
  const tiers = GENERATOR_TIERS[family] || GENERATOR_TIERS.gen_cauldron;
  const maxLevel = Object.keys(tiers).length;
  const targetLevel = Math.max(1, Math.min(maxLevel, level));
  return tiers[targetLevel] || tiers[1];
}

export function pickSpawnLevel(dropRates: GeneratorDropRate[]): number {
  const totalWeight = dropRates.reduce((sum, r) => sum + r.weight, 0);
  let random = Math.random() * totalWeight;
  for (const rate of dropRates) {
    if (random < rate.weight) {
      return rate.level;
    }
    random -= rate.weight;
  }
  return dropRates[0]?.level || 1;
}

export const CHAINS: Record<string, ChainDef> = {
  potions: {
    id: 'potions',
    name: 'Зельеварение',
    desc: 'Магические настои, эликсиры и алхимические эссенции',
    generatorId: 'gen_cauldron',
    items: [
      {
        id: 'pot_1',
        chainId: 'potions',
        level: 1,
        name: 'Пустая колба',
        desc: 'Прозрачный стеклянный сосуд для сбора настоев.',
        sellValue: 1,
        color: '#747d8c',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 8h6v6h-6z" fill="#a4b0be" stroke="#dcdde1" stroke-width="1.5"/>
          <path d="M21 14l-8 20a4 4 0 0 0 3.5 6h15a4 4 0 0 0 3.5-6l-8-20z" fill="rgba(255,255,255,0.08)" stroke="#a4b0be" stroke-width="1.8"/>
          <path d="M16 28q8 4 16 0" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
        </svg>`
      },
      {
        id: 'pot_2',
        chainId: 'potions',
        level: 2,
        name: 'Травяной настой',
        desc: 'Настой лунных трав со свежим лесным ароматом.',
        sellValue: 2,
        color: '#10ac84',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 8h6v6h-6z" fill="#78e08f" stroke="#10ac84" stroke-width="1.5"/>
          <path d="M21 14l-8 20a4 4 0 0 0 3.5 6h15a4 4 0 0 0 3.5-6l-8-20z" fill="#079992" opacity="0.3" stroke="#10ac84" stroke-width="1.8"/>
          <path d="M15 26c4 3 14 3 18 0l-1.5 8c-3 3-12 3-15 0z" fill="#10ac84" opacity="0.9"/>
          <circle cx="21" cy="30" r="1.5" fill="#b8e994"/>
          <circle cx="27" cy="28" r="1" fill="#fff"/>
        </svg>`
      },
      {
        id: 'pot_3',
        chainId: 'potions',
        level: 3,
        name: 'Зелье лечения',
        desc: 'Целебный бальзам рубинового оттенка.',
        sellValue: 4,
        color: '#ff6b6b',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="27" r="14" fill="#ee5253" opacity="0.3" stroke="#ff6b6b" stroke-width="1.8"/>
          <path d="M20 6h8v7h-8z" fill="#ff9f43" stroke="#ff6b6b" stroke-width="1.5"/>
          <ellipse cx="24" cy="28" rx="11" ry="9" fill="#ff6b6b"/>
          <path d="M24 23v8m-4-4h8" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="20" cy="24" r="1.5" fill="#ffcccc"/>
        </svg>`
      },
      {
        id: 'pot_4',
        chainId: 'potions',
        level: 4,
        name: 'Зелье маны',
        desc: 'Концентрированная сапфировая энергия волшебников.',
        sellValue: 8,
        color: '#54a0ff',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6h10v6h-10z" fill="#2e86de" stroke="#54a0ff" stroke-width="1.5"/>
          <path d="M19 12l-7 14 6 12h12l6-12-7-14z" fill="#2e86de" opacity="0.3" stroke="#54a0ff" stroke-width="1.8"/>
          <path d="M15 22l4 14h10l4-14z" fill="#54a0ff"/>
          <circle cx="24" cy="28" r="3" fill="#fff"/>
          <path d="M24 18v3m-5 5h3m7 0h3" stroke="#dff9fb" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'pot_5',
        chainId: 'potions',
        level: 5,
        name: 'Эликсир невидимости',
        desc: 'Мерцающая серебристая субстанция, скрывающая от взора.',
        sellValue: 16,
        color: '#a29bfe',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6h8v6h-8z" fill="#6c5ce7" stroke="#a29bfe" stroke-width="1.5"/>
          <path d="M24 12c-8 6-12 14-8 22 2 4 8 6 16 0 4-8 0-16-8-22z" fill="#6c5ce7" opacity="0.5" stroke="#a29bfe" stroke-width="2"/>
          <circle cx="24" cy="26" r="5" fill="#dfe6e9" opacity="0.7"/>
          <path d="M19 22c3-3 7-3 10 0" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'pot_6',
        chainId: 'potions',
        level: 6,
        name: 'Огонь дракона',
        desc: 'Пламенеющий экстракт ярости древнего ящера.',
        sellValue: 32,
        color: '#ff9f43',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="24" cy="28" rx="14" ry="12" fill="#ee5253" opacity="0.4" stroke="#ff9f43" stroke-width="2"/>
          <path d="M20 6h8v7h-8z" fill="#d35400" stroke="#f39c12" stroke-width="1.5"/>
          <path d="M24 16c-4 5-8 9-5 15 2 3 8 4 10 0 2-4-2-7-2-9 0-3-1-4-3-6z" fill="#ff9f43"/>
          <path d="M24 22c-2 3-3 5-1 8 1 1 4 1 5 0 1-2-1-4-1-5 0-2 0-2-3-3z" fill="#feca57"/>
        </svg>`
      },
      {
        id: 'pot_7',
        chainId: 'potions',
        level: 7,
        name: 'Зелье бессмертия',
        desc: 'Легендарный золотой нектар вечной юности.',
        sellValue: 64,
        color: '#f5cd79',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="16" fill="rgba(245,205,121,0.2)" stroke="#f5cd79" stroke-width="2"/>
          <circle cx="24" cy="24" r="10" fill="#f5cd79"/>
          <circle cx="24" cy="24" r="5" fill="#fff"/>
          <path d="M24 4v6m0 28v6M4 24h6m28 0h6" stroke="#f5cd79" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'pot_8',
        chainId: 'potions',
        level: 8,
        name: 'Философский Камень',
        desc: 'Величайшая тайна алхимии, способная творить чудеса.',
        sellValue: 150,
        color: '#ff4757',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="24,4 40,16 34,38 14,38 8,16" fill="#ff4757" stroke="#f5cd79" stroke-width="2"/>
          <polygon points="24,10 34,18 30,32 18,32 14,18" fill="#ff6b81"/>
          <polygon points="24,14 30,20 28,28 20,28 18,20" fill="#fff" opacity="0.6"/>
          <circle cx="24" cy="22" r="3" fill="#fff"/>
        </svg>`
      }
    ]
  },
  scrolls: {
    id: 'scrolls',
    name: 'Древние Свитки',
    desc: 'Тексты заклинаний, руны и библиотечные манускрипты',
    generatorId: 'gen_desk',
    items: [
      {
        id: 'scr_1',
        chainId: 'scrolls',
        level: 1,
        name: 'Обрывок пергамента',
        desc: 'Пожелтевший клочок бумаги с загадочной закорючкой.',
        sellValue: 1,
        color: '#c8d6e5',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 10h18l4 6-3 18-18 4-3-4 2-24z" fill="#f5cd79" opacity="0.5" stroke="#e58e26" stroke-width="1.8"/>
          <path d="M18 16h12m-12 6h8m-8 6h10" stroke="#8395a7" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'scr_2',
        chainId: 'scrolls',
        level: 2,
        name: 'Чернильная записка',
        desc: 'Послание архивариуса Корвуса с печатью.',
        sellValue: 2,
        color: '#e58e26',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="10" width="24" height="28" rx="3" fill="#f8c291" stroke="#e58e26" stroke-width="1.8"/>
          <path d="M16 16h16m-16 5h14m-14 5h10" stroke="#574b90" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="24" cy="32" r="3" fill="#b71540"/>
        </svg>`
      },
      {
        id: 'scr_3',
        chainId: 'scrolls',
        level: 3,
        name: 'Свиток света',
        desc: 'Свернутый пергамент, перевязанный шелковой лентой.',
        sellValue: 4,
        color: '#feca57',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="14" width="28" height="20" rx="4" fill="#fed330" opacity="0.7" stroke="#f5cd79" stroke-width="1.8"/>
          <line x1="24" y1="12" x2="24" y2="36" stroke="#eb3b5a" stroke-width="3"/>
          <circle cx="24" cy="24" r="3.5" fill="#eb3b5a"/>
          <circle cx="24" cy="24" r="1.5" fill="#fed330"/>
        </svg>`
      },
      {
        id: 'scr_4',
        chainId: 'scrolls',
        level: 4,
        name: 'Рунический манускрипт',
        desc: 'Пергамент с сияющими символами стихий.',
        sellValue: 8,
        color: '#48dbfb',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12c4-3 24-3 28 0v24c-4-3-24-3-28 0z" fill="#227093" stroke="#48dbfb" stroke-width="1.8"/>
          <path d="M24 11v24" stroke="#48dbfb" stroke-width="1.5"/>
          <path d="M16 18l3 3-3 3m13-6l-3 3 3 3" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'scr_5',
        chainId: 'scrolls',
        level: 5,
        name: 'Книга ученика',
        desc: 'Базовый сборник чар с плотным кожаным переплетом.',
        sellValue: 16,
        color: '#8854d0',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="11" y="8" width="26" height="32" rx="4" fill="#3867d6" stroke="#4b7bec" stroke-width="2"/>
          <rect x="15" y="12" width="18" height="24" rx="2" fill="#45aaf2" opacity="0.3"/>
          <circle cx="24" cy="24" r="5" fill="#fed330"/>
          <path d="M24 21v6m-3-3h6" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'scr_6',
        chainId: 'scrolls',
        level: 6,
        name: 'Фолиант стихий',
        desc: 'Тяжелый том, украшенный драгоценными уголками.',
        sellValue: 32,
        color: '#ff793f',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="28" height="32" rx="4" fill="#b33939" stroke="#f5cd79" stroke-width="2"/>
          <path d="M10 12h5v24h-5z" fill="#f5cd79"/>
          <circle cx="26" cy="24" r="6" fill="#f5cd79"/>
          <polygon points="26,19 28,23 32,24 29,26 30,30 26,27 22,30 23,26 20,24 24,23" fill="#b33939"/>
        </svg>`
      },
      {
        id: 'scr_7',
        chainId: 'scrolls',
        level: 7,
        name: 'Запечатанный гримуар',
        desc: 'Древняя книга, скованная магическим замком.',
        sellValue: 64,
        color: '#8c7ae6',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="7" width="28" height="34" rx="4" fill="#341f97" stroke="#8c7ae6" stroke-width="2"/>
          <line x1="8" y1="24" x2="40" y2="24" stroke="#f5cd79" stroke-width="3"/>
          <rect x="20" y="20" width="8" height="8" rx="2" fill="#f5cd79" stroke="#e58e26" stroke-width="1.5"/>
          <circle cx="24" cy="24" r="1.5" fill="#341f97"/>
        </svg>`
      },
      {
        id: 'scr_8',
        chainId: 'scrolls',
        level: 8,
        name: 'Книга Вечности',
        desc: 'Абсолютный источник знаний всех архимагов.',
        sellValue: 150,
        color: '#f5cd79',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="9" y="6" width="30" height="36" rx="5" fill="#2d3436" stroke="#f5cd79" stroke-width="2.5"/>
          <circle cx="24" cy="24" r="9" fill="none" stroke="#f5cd79" stroke-width="2"/>
          <circle cx="24" cy="24" r="4" fill="#f5cd79"/>
          <path d="M24 10v4m0 20v4M10 24h4m20 0h4" stroke="#f5cd79" stroke-width="2"/>
        </svg>`
      }
    ]
  },
  crystals: {
    id: 'crystals',
    name: 'Кристаллы Маны',
    desc: 'Энергетические минералы для подпитки генераторов',
    generatorId: 'gen_geode',
    items: [
      {
        id: 'crys_1',
        chainId: 'crystals',
        level: 1,
        name: 'Осколок аметиста',
        desc: 'Небольшой кристаллический скол со слабым фиолетовым блеском.',
        sellValue: 1,
        color: '#9c88ff',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="24,12 32,24 24,36 16,24" fill="#9c88ff" stroke="#e056fd" stroke-width="1.8"/>
          <polygon points="24,12 28,24 24,36" fill="#fff" opacity="0.4"/>
        </svg>`
      },
      {
        id: 'crys_2',
        chainId: 'crystals',
        level: 2,
        name: 'Кристалл маны',
        desc: 'Чистый кристалл, излучающий бирюзовый свет.',
        sellValue: 2,
        color: '#00d2d3',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="24,8 34,18 34,30 24,40 14,30 14,18" fill="#00d2d3" stroke="#48dbfb" stroke-width="1.8"/>
          <polygon points="24,8 29,18 29,30 24,40" fill="#fff" opacity="0.4"/>
        </svg>`
      },
      {
        id: 'crys_3',
        chainId: 'crystals',
        level: 3,
        name: 'Заряженный самоцвет',
        desc: 'Пульсирует накопленной природной энергией.',
        sellValue: 4,
        color: '#1dd1a1',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="24,6 36,20 24,42 12,20" fill="#1dd1a1" stroke="#10ac84" stroke-width="2"/>
          <polygon points="24,6 30,20 24,42" fill="#fff" opacity="0.5"/>
          <circle cx="24" cy="20" r="4" fill="#fff" opacity="0.8"/>
        </svg>`
      },
      {
        id: 'crys_4',
        chainId: 'crystals',
        level: 4,
        name: 'Рубиновое ядро',
        desc: 'Пылающий камень высокой плотности.',
        sellValue: 8,
        color: '#ff4757',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="16,10 32,10 40,20 24,38 8,20" fill="#ff4757" stroke="#ff6b81" stroke-width="2"/>
          <polygon points="16,10 32,10 24,20" fill="#ff6b81"/>
          <polygon points="24,20 32,10 40,20" fill="#fff" opacity="0.3"/>
        </svg>`
      },
      {
        id: 'crys_5',
        chainId: 'crystals',
        level: 5,
        name: 'Сфера энергии',
        desc: 'Сконцентрированный шар энергии (+25 энергии при активации).',
        sellValue: 16,
        color: '#2ed573',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="14" fill="#2ed573" stroke="#7bed9f" stroke-width="2"/>
          <circle cx="24" cy="24" r="9" fill="#7bed9f"/>
          <circle cx="20" cy="20" r="3" fill="#fff"/>
          <circle cx="24" cy="24" r="16" stroke="#2ed573" stroke-width="1" stroke-dasharray="2 4"/>
        </svg>`
      },
      {
        id: 'crys_6',
        chainId: 'crystals',
        level: 6,
        name: 'Сияющий тессеракт',
        desc: 'Четырехмерный кристалл неисчерпаемой магии (+60 энергии).',
        sellValue: 32,
        color: '#00d2d3',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="24" height="24" fill="none" stroke="#00d2d3" stroke-width="2"/>
          <rect x="17" y="17" width="14" height="14" fill="rgba(0,210,211,0.3)" stroke="#fff" stroke-width="1.5"/>
          <line x1="12" y1="12" x2="17" y2="17" stroke="#00d2d3" stroke-width="1.5"/>
          <line x1="36" y1="12" x2="31" y2="17" stroke="#00d2d3" stroke-width="1.5"/>
          <line x1="12" y1="36" x2="17" y2="31" stroke="#00d2d3" stroke-width="1.5"/>
          <line x1="36" y1="36" x2="31" y2="31" stroke="#00d2d3" stroke-width="1.5"/>
        </svg>`
      },
      {
        id: 'crys_7',
        chainId: 'crystals',
        level: 7,
        name: 'Звездное Сердце',
        desc: 'Осколок упавшей кометы (+150 энергии при активации).',
        sellValue: 75,
        color: '#f5cd79',
        svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="24,4 29,18 44,18 32,27 36,42 24,33 12,42 16,27 4,18 19,18" fill="#f5cd79" stroke="#e58e26" stroke-width="2"/>
          <circle cx="24" cy="24" r="5" fill="#fff"/>
        </svg>`
      }
    ]
  }
};

export function getItem(chainId: string, level: number): ItemDef | undefined {
  return CHAINS[chainId]?.items.find((it) => it.level === level);
}

export function getItemName(chainId: string, level: number): string {
  const item = getItem(chainId, level);
  if (!item) return '';
  return item.id;
}

export const CRYSTAL_ENERGY_REWARDS: Record<number, number> = {
  1: 1,
  2: 3,
  3: 8,
  4: 18,
  5: 40,
  6: 85,
  7: 180
};

export function getConsumableEnergyReward(chainId: string, level: number): number | null {
  if (chainId === 'crystals') {
    return CRYSTAL_ENERGY_REWARDS[level] ?? null;
  }
  return null;
}

