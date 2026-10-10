export interface RoomStyleVariant {
  id: 'A' | 'B' | 'C';
  name: string;
  desc: string;
  color: string;
}

export interface RoomObjectDef {
  id: string;
  name: string;
  starCost: number;
  order: number;
  variants: [RoomStyleVariant, RoomStyleVariant, RoomStyleVariant];
  coordinates: { x: number; y: number; width: number; height: number };
}

export interface RoomDef {
  id: string;
  name: string;
  subtitle: string;
  objects: RoomObjectDef[];
}

export const ALCHEMIST_LAB: RoomDef = {
  id: 'alchemist_lab',
  name: 'Кабинет Алхимика',
  subtitle: 'Древняя лаборатория в Забытом крыле Академии',
  objects: [
    {
      id: 'cauldron',
      name: 'Алхимический Котел',
      starCost: 1,
      order: 1,
      coordinates: { x: 42, y: 55, width: 22, height: 20 },
      variants: [
        { id: 'A', name: 'Бронза Арканы', desc: 'Бронзовый с золотой вязью', color: '#f5cd79' },
        { id: 'B', name: 'Темная Алхимия', desc: 'Чугунный с фиолетовым огнем', color: '#8c7ae6' },
        { id: 'C', name: 'Эльфийский Свет', desc: 'Серебряный с руническим светом', color: '#00d2d3' }
      ]
    },
    {
      id: 'desk',
      name: 'Рабочий Стол',
      starCost: 2,
      order: 2,
      coordinates: { x: 68, y: 62, width: 28, height: 24 },
      variants: [
        { id: 'A', name: 'Массивный Дуб', desc: 'Дубовый стол с фолиантами', color: '#cd6133' },
        { id: 'B', name: 'Обсидиан', desc: 'Обсидиановый с кристаллами', color: '#574b90' },
        { id: 'C', name: 'Белое Дерево', desc: 'Белое дерево с живыми побегами', color: '#10ac84' }
      ]
    },
    {
      id: 'shelves',
      name: 'Полки для Зелий',
      starCost: 2,
      order: 3,
      coordinates: { x: 74, y: 22, width: 22, height: 35 },
      variants: [
        { id: 'A', name: 'Резное Дерево', desc: 'Темное резное дерево', color: '#8854d0' },
        { id: 'B', name: 'Кованое Железо', desc: 'Кованые стойки темных магов', color: '#747d8c' },
        { id: 'C', name: 'Стеклянные Витрины', desc: 'Стеклянные полки с кристальной подсветкой', color: '#48dbfb' }
      ]
    },
    {
      id: 'window',
      name: 'Витражное Окно',
      starCost: 3,
      order: 4,
      coordinates: { x: 38, y: 10, width: 24, height: 36 },
      variants: [
        { id: 'A', name: 'Созвездие Архимага', desc: 'Золотые звезды и созвездия', color: '#f5cd79' },
        { id: 'B', name: 'Лунное Затмение', desc: 'Серебряный месяц и туманности', color: '#a29bfe' },
        { id: 'C', name: 'Древо Жизни', desc: 'Изумрудное Древо Жизни', color: '#1dd1a1' }
      ]
    },
    {
      id: 'fireplace',
      name: 'Магический Камин',
      starCost: 3,
      order: 5,
      coordinates: { x: 6, y: 44, width: 26, height: 36 },
      variants: [
        { id: 'A', name: 'Каменная Арка', desc: 'Каменная кладка с теплыми искрами', color: '#ff9f43' },
        { id: 'B', name: 'Драконья Пасть', desc: 'Скульптурная пасть дракона с лавой', color: '#ff4757' },
        { id: 'C', name: 'Кристальный Очаг', desc: 'Очаг из лазурита с сапфирным огнем', color: '#00d2d3' }
      ]
    },
    {
      id: 'carpet',
      name: 'Зачарованный Ковер',
      starCost: 4,
      order: 6,
      coordinates: { x: 26, y: 72, width: 44, height: 22 },
      variants: [
        { id: 'A', name: 'Круг Алхимии', desc: 'Золотой круг алхимических знаков', color: '#f5cd79' },
        { id: 'B', name: 'Печать Арканы', desc: 'Фиолетовая руническая печать', color: '#8c7ae6' },
        { id: 'C', name: 'Лунные Цветы', desc: 'Узор сияющих лунных цветов', color: '#54a0ff' }
      ]
    }
  ]
};
