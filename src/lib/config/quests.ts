export interface OrderRequirement {
  chainId: string;
  level: number;
}

export interface CharacterOrder {
  id: string;
  characterName: string;
  characterRole: string;
  avatarSvg: string;
  dialogue: string;
  requirements: OrderRequirement[];
  rewardCoins: number;
  rewardStars: number;
  rewardXp: number;
}

export const CHARACTERS = {
  corvus: {
    name: 'Корвус',
    role: 'Ворон-Архивариус',
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#1e272e" stroke="#f5cd79" stroke-width="1.5"/>
      <path d="M12 28c0-8 6-14 16-14l4 4-8 12z" fill="#2f3640"/>
      <polygon points="32,18 40,21 32,24" fill="#f5cd79"/>
      <circle cx="26" cy="17" r="2.5" fill="#f5cd79"/>
      <circle cx="27" cy="17" r="1" fill="#000"/>
      <path d="M16 10l6-4 4 2" stroke="#8c7ae6" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  lucian: {
    name: 'Проф. Люциан',
    role: 'Магистр Алхимии',
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#2c2c54" stroke="#8c7ae6" stroke-width="1.5"/>
      <circle cx="20" cy="17" r="8" fill="#f8c291"/>
      <path d="M14 14c0-4 3-7 6-7s6 3 6 7c-2 2-10 2-12 0z" fill="#474787"/>
      <circle cx="18" cy="16" r="1" fill="#2c2c54"/>
      <circle cx="23" cy="16" r="1" fill="#2c2c54"/>
      <path d="M15 19c2 4 8 4 10 0" fill="#f1f2f6"/>
      <rect x="14" y="26" width="12" height="12" rx="4" fill="#706fd3"/>
    </svg>`
  },
  mira: {
    name: 'Мира',
    role: 'Студентка Арканы',
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#1b1464" stroke="#00d2d3" stroke-width="1.5"/>
      <circle cx="20" cy="18" r="8" fill="#f7d794"/>
      <path d="M12 18c0-8 6-12 16-8-2 6-4 12-4 14l-8-2z" fill="#ea2027"/>
      <circle cx="18" cy="18" r="1.2" fill="#0652dd"/>
      <circle cx="23" cy="18" r="1.2" fill="#0652dd"/>
      <path d="M19 22q2 2 4 0" stroke="#b71540" stroke-width="1.2" stroke-linecap="round"/>
      <rect x="15" y="27" width="10" height="11" rx="3" fill="#009432"/>
    </svg>`
  }
};

export const INITIAL_ORDERS: CharacterOrder[] = [
  {
    id: 'ord_1',
    characterName: CHARACTERS.corvus.name,
    characterRole: CHARACTERS.corvus.role,
    avatarSvg: CHARACTERS.corvus.svg,
    dialogue: 'Приветствую в Академии! Мне нужен травяной настой для чернил каталога.',
    requirements: [
      { chainId: 'potions', level: 2 }
    ],
    rewardCoins: 15,
    rewardStars: 1,
    rewardXp: 20
  },
  {
    id: 'ord_2',
    characterName: CHARACTERS.lucian.name,
    characterRole: CHARACTERS.lucian.role,
    avatarSvg: CHARACTERS.lucian.svg,
    dialogue: 'Для опыта по трансмутации подготовь целебное зелье и чернильную записку.',
    requirements: [
      { chainId: 'potions', level: 3 },
      { chainId: 'scrolls', level: 2 }
    ],
    rewardCoins: 35,
    rewardStars: 2,
    rewardXp: 50
  },
  {
    id: 'ord_3',
    characterName: CHARACTERS.mira.name,
    characterRole: CHARACTERS.mira.role,
    avatarSvg: CHARACTERS.mira.svg,
    dialogue: 'Я готовлюсь к экзамену по светлой магии! Мне срочно нужен свиток света.',
    requirements: [
      { chainId: 'scrolls', level: 3 }
    ],
    rewardCoins: 25,
    rewardStars: 1,
    rewardXp: 35
  }
];
