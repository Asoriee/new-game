/**
 * Svelte 5 Reactive i18n Service
 * Supports Russian (RU), English (EN), and Turkish (TR).
 * Zero external libraries, zero overhead.
 */

export type Language = 'ru' | 'en' | 'tr';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' }
];

const TRANSLATIONS = {
  ru: {
    // App & Navigation
    'app.title': 'Академия Слияний: Тайны Магии',
    'nav.laboratory': 'Лаборатория',
    'nav.study': 'Кабинет',
    'nav.orders': 'Заказы',
    'nav.shop': 'Лавка',

    // TopBar
    'topbar.energyTitle': 'Пополнить энергию',
    'topbar.coinsTitle': 'Монеты',
    'topbar.gemsTitle': 'Кристаллы',
    'topbar.starsTitle': 'Магические Звезды для комнаты',
    'topbar.max': 'МАКС',
    'topbar.sound': 'Звук',

    // Board View
    'board.prompt': 'Перетаскивайте и объединяйте одинаковые предметы',
    'board.spawnBtn': 'Создать ⚡',
    'board.spawnDesc': 'Нажмите, чтобы создать предмет (-1 ⚡)',
    'board.tier': 'Ур. {level}',
    'board.sell': '+{amount} 🪙',
    'board.removeWeb': 'Снять паутину',
    'board.cobwebTitle': 'Паутина: объедините или снимите',

    // Generators
    'gen.cauldron.name': 'Алхимический Котел',
    'gen.desk.name': 'Волшебный Пюпитр',
    'gen.geode.name': 'Кристальный Геод',

    // Items: Potions
    'item.pot_1.name': 'Пустая колба',
    'item.pot_1.desc': 'Прозрачный стеклянный сосуд для сбора настоев.',
    'item.pot_2.name': 'Травяной настой',
    'item.pot_2.desc': 'Настой лунных трав со свежим лесным ароматом.',
    'item.pot_3.name': 'Зелье лечения',
    'item.pot_3.desc': 'Целебный бальзам рубинового оттенка.',
    'item.pot_4.name': 'Зелье маны',
    'item.pot_4.desc': 'Концентрированная сапфировая энергия волшебников.',
    'item.pot_5.name': 'Эликсир невидимости',
    'item.pot_5.desc': 'Мерцающая серебристая субстанция, скрывающая от взора.',
    'item.pot_6.name': 'Огонь дракона',
    'item.pot_6.desc': 'Пламенеющий экстракт ярости древнего ящера.',
    'item.pot_7.name': 'Зелье бессмертия',
    'item.pot_7.desc': 'Легендарный золотой нектар вечной юности.',
    'item.pot_8.name': 'Философский Камень',
    'item.pot_8.desc': 'Величайшая тайна алхимии, способная творить чудеса.',

    // Items: Scrolls
    'item.scr_1.name': 'Обрывок пергамента',
    'item.scr_1.desc': 'Пожелтевший клочок бумаги с загадочной закорючкой.',
    'item.scr_2.name': 'Чернильная записка',
    'item.scr_2.desc': 'Послание архивариуса Корвуса с печатью.',
    'item.scr_3.name': 'Свиток света',
    'item.scr_3.desc': 'Свернутый пергамент, перевязанный шелковой лентой.',
    'item.scr_4.name': 'Рунический манускрипт',
    'item.scr_4.desc': 'Пергамент с сияющими символами стихий.',
    'item.scr_5.name': 'Книга ученика',
    'item.scr_5.desc': 'Базовый сборник чар с плотным кожаным переплетом.',
    'item.scr_6.name': 'Фолиант стихий',
    'item.scr_6.desc': 'Тяжелый том, украшенный драгоценными уголками.',
    'item.scr_7.name': 'Запечатанный гримуар',
    'item.scr_7.desc': 'Древняя книга, скованная магическим замком.',
    'item.scr_8.name': 'Книга Вечности',
    'item.scr_8.desc': 'Абсолютный источник знаний всех архимагов.',

    // Items: Crystals
    'item.crys_1.name': 'Осколок аметиста',
    'item.crys_1.desc': 'Небольшой кристаллический скол со слабым фиолетовым блеском.',
    'item.crys_2.name': 'Кристалл маны',
    'item.crys_2.desc': 'Чистый кристалл, излучающий бирюзовый свет.',
    'item.crys_3.name': 'Заряженный самоцвет',
    'item.crys_3.desc': 'Пульсирует накопленной природной энергией.',
    'item.crys_4.name': 'Рубиновое ядро',
    'item.crys_4.desc': 'Пылающий камень высокой плотности.',
    'item.crys_5.name': 'Сфера энергии',
    'item.crys_5.desc': 'Сконцентрированный шар энергии (+25 энергии при активации).',
    'item.crys_6.name': 'Сияющий тессеракт',
    'item.crys_6.desc': 'Четырехмерный кристалл неисчерпаемой магии (+60 энергии).',
    'item.crys_7.name': 'Звездное Сердце',
    'item.crys_7.desc': 'Осколок упавшей кометы (+150 энергии при активации).',

    // Room
    'room.title': 'Кабинет Алхимика',
    'room.subtitle': 'Древняя лаборатория в Забытом крыле Академии',
    'room.chooseStyle': 'Выберите стиль декора',
    'room.cost': 'Стоимость: {cost} ★',
    'room.applyStyle': 'Применить стиль',
    'room.restoreBtn': 'Восстановить за {cost} ★',
    'room.notEnoughStars': 'Не хватает звезд ({current}/{cost} ★)',

    // Room Objects
    'obj.cauldron.name': 'Алхимический Котел',
    'obj.cauldron.varA': 'Бронза Арканы',
    'obj.cauldron.varADesc': 'Бронзовый с золотой вязью',
    'obj.cauldron.varB': 'Темная Алхимия',
    'obj.cauldron.varBDesc': 'Чугунный с фиолетовым огнем',
    'obj.cauldron.varC': 'Эльфийский Свет',
    'obj.cauldron.varCDesc': 'Серебряный с руническим светом',

    'obj.desk.name': 'Рабочий Стол',
    'obj.desk.varA': 'Массивный Дуб',
    'obj.desk.varADesc': 'Дубовый стол с фолиантами',
    'obj.desk.varB': 'Обсидиан',
    'obj.desk.varBDesc': 'Обсидиановый с кристаллами',
    'obj.desk.varC': 'Белое Дерево',
    'obj.desk.varCDesc': 'Белое дерево с живыми побегами',

    'obj.shelves.name': 'Полки для Зелий',
    'obj.shelves.varA': 'Резное Дерево',
    'obj.shelves.varADesc': 'Темное резное дерево',
    'obj.shelves.varB': 'Кованое Железо',
    'obj.shelves.varBDesc': 'Кованые стойки темных магов',
    'obj.shelves.varC': 'Стеклянные Витрины',
    'obj.shelves.varCDesc': 'Стеклянные полки с кристальной подсветкой',

    'obj.window.name': 'Витражное Окно',
    'obj.window.varA': 'Созвездие Архимага',
    'obj.window.varADesc': 'Золотые звезды и созвездия',
    'obj.window.varB': 'Лунное Затмение',
    'obj.window.varBDesc': 'Серебряный месяц и туманности',
    'obj.window.varC': 'Древо Жизни',
    'obj.window.varCDesc': 'Изумрудное Древо Жизни',

    'obj.fireplace.name': 'Магический Камин',
    'obj.fireplace.varA': 'Каменная Арка',
    'obj.fireplace.varADesc': 'Каменная кладка с теплыми искрами',
    'obj.fireplace.varB': 'Драконья Пасть',
    'obj.fireplace.varBDesc': 'Скульптурная пасть дракона с лавой',
    'obj.fireplace.varC': 'Кристальный Очаг',
    'obj.fireplace.varCDesc': 'Очаг из лазурита с сапфирным огнем',

    'obj.carpet.name': 'Зачарованный Ковер',
    'obj.carpet.varA': 'Круг Алхимии',
    'obj.carpet.varADesc': 'Золотой круг алхимических знаков',
    'obj.carpet.varB': 'Печать Арканы',
    'obj.carpet.varBDesc': 'Фиолетовая руническая печать',
    'obj.carpet.varC': 'Лунные Цветы',
    'obj.carpet.varCDesc': 'Узор сияющих лунных цветов',

    // Orders
    'orders.title': 'Заказы Академии',
    'orders.subtitle': 'Помогайте преподавателям и студентам, чтобы получать Звезды',
    'orders.required': 'Требуется:',
    'orders.complete': 'Сдать заказ!',
    'orders.inProgress': 'В процессе',
    'char.corvus.name': 'Корвус',
    'char.corvus.role': 'Ворон-Архивариус',
    'char.corvus.dialogue1': 'Приветствую в Академии! Мне нужен травяной настой для чернил каталога.',
    'char.lucian.name': 'Проф. Люциан',
    'char.lucian.role': 'Магистр Алхимии',
    'char.lucian.dialogue1': 'Для опыта по трансмутации подготовь целебное зелье и чернильную записку.',
    'char.mira.name': 'Мира',
    'char.mira.role': 'Студентка Арканы',
    'char.mira.dialogue1': 'Я готовлюсь к экзамену по светлой магии! Мне срочно нужен свиток света.',
    'orders.genericDialogue': 'Академия Арканум нуждается в твоем алхимическом мастерстве!',

    // Shop
    'shop.title': 'Магическая Лавка',
    'shop.subtitle': 'Пополнение энергии и редкие артефакты Академии',
    'shop.hitBadge': 'ХИТ СЕЗОНА',
    'shop.starterPackTitle': 'Набор Адепта Арканум',
    'shop.starterPackDesc': '150 Энергии + 50 Кристаллов + Эксклюзивный Котел',
    'shop.starterPackPrice': '25 Ян (Тест)',
    'shop.energySection': '⚡ Источник Энергии',
    'shop.rewardedTitle': '+25 Энергии',
    'shop.rewardedDesc': 'Восстановление за просмотр рекламы',
    'shop.rewardedBtn': 'Смотреть',
    'shop.rewardedClaimed': 'Зачислено!',
    'shop.gemEnergyTitle': '+50 Энергии',
    'shop.gemEnergyDesc': 'Мгновенный заряд от кристалла',
    'shop.coinsSection': '🪙 Золотая Казна',
    'shop.coinsPackTitle': '300 Монет',
    'shop.coinsPackDesc': 'Кошель алхимического золота'
  },
  en: {
    // App & Navigation
    'app.title': 'Merge Magic Academy: Arcane Secrets',
    'nav.laboratory': 'Laboratory',
    'nav.study': 'Study',
    'nav.orders': 'Orders',
    'nav.shop': 'Shop',

    // TopBar
    'topbar.energyTitle': 'Refill Energy',
    'topbar.coinsTitle': 'Coins',
    'topbar.gemsTitle': 'Gems',
    'topbar.starsTitle': 'Magic Stars for renovation',
    'topbar.max': 'MAX',
    'topbar.sound': 'Sound',

    // Board View
    'board.prompt': 'Drag & merge identical items to upgrade',
    'board.spawnBtn': 'Spawn ⚡',
    'board.spawnDesc': 'Tap to create an item (-1 ⚡)',
    'board.tier': 'Lvl. {level}',
    'board.sell': '+{amount} 🪙',
    'board.removeWeb': 'Clear Web',
    'board.cobwebTitle': 'Cobweb: merge or remove',

    // Generators
    'gen.cauldron.name': 'Alchemical Cauldron',
    'gen.desk.name': 'Magic Lectern',
    'gen.geode.name': 'Crystal Geode',

    // Items: Potions
    'item.pot_1.name': 'Empty Flask',
    'item.pot_1.desc': 'A clear glass vessel for collecting infusions.',
    'item.pot_2.name': 'Herbal Infusion',
    'item.pot_2.desc': 'Brewed moonlit herbs with a refreshing forest scent.',
    'item.pot_3.name': 'Healing Potion',
    'item.pot_3.desc': 'A restorative balm of vibrant ruby color.',
    'item.pot_4.name': 'Mana Potion',
    'item.pot_4.desc': 'Concentrated sapphire energy of sorcerers.',
    'item.pot_5.name': 'Invisibility Elixir',
    'item.pot_5.desc': 'A shimmering silvery draught that hides you from sight.',
    'item.pot_6.name': 'Dragon Flame',
    'item.pot_6.desc': 'Flaming essence distilled from an ancient drake.',
    'item.pot_7.name': 'Potion of Immortality',
    'item.pot_7.desc': 'Legendary golden nectar of eternal youth.',
    'item.pot_8.name': "Philosopher's Stone",
    'item.pot_8.desc': 'The supreme secret of alchemy, capable of miracles.',

    // Items: Scrolls
    'item.scr_1.name': 'Parchment Scrap',
    'item.scr_1.desc': 'A yellowed fragment with a mysterious scribbled symbol.',
    'item.scr_2.name': 'Ink Note',
    'item.scr_2.desc': 'A sealed missive from Archivist Corvus.',
    'item.scr_3.name': 'Scroll of Light',
    'item.scr_3.desc': 'A rolled parchment bound with a silk ribbon.',
    'item.scr_4.name': 'Runic Manuscript',
    'item.scr_4.desc': 'Ancient parchment inscribed with radiant elemental runes.',
    'item.scr_5.name': "Apprentice's Book",
    'item.scr_5.desc': 'A starter grimoire bound in sturdy leather.',
    'item.scr_6.name': 'Tome of the Elements',
    'item.scr_6.desc': 'A heavy tome reinforced with jeweled corners.',
    'item.scr_7.name': 'Sealed Grimoire',
    'item.scr_7.desc': 'An ancient spellbook locked by an arcane seal.',
    'item.scr_8.name': 'Book of Eternity',
    'item.scr_8.desc': 'The ultimate font of knowledge of all archmages.',

    // Items: Crystals
    'item.crys_1.name': 'Amethyst Shard',
    'item.crys_1.desc': 'A small crystal splinter with a gentle violet gleam.',
    'item.crys_2.name': 'Mana Crystal',
    'item.crys_2.desc': 'A pure mineral radiating bright turquoise light.',
    'item.crys_3.name': 'Charged Gemstone',
    'item.crys_3.desc': 'Pulsing with accumulated natural mana.',
    'item.crys_4.name': 'Ruby Core',
    'item.crys_4.desc': 'A blazing gem of intense thermal energy.',
    'item.crys_5.name': 'Energy Sphere',
    'item.crys_5.desc': 'A condensed orb of pure energy (+25 energy on use).',
    'item.crys_6.name': 'Shining Tesseract',
    'item.crys_6.desc': 'A four-dimensional crystal of limitless power (+60 energy).',
    'item.crys_7.name': 'Star Heart',
    'item.crys_7.desc': 'A fallen comet nucleus (+150 energy on use).',

    // Room
    'room.title': "Alchemist's Study",
    'room.subtitle': 'Ancient laboratory in the Forgotten Wing of the Academy',
    'room.chooseStyle': 'Select decoration style',
    'room.cost': 'Cost: {cost} ★',
    'room.applyStyle': 'Apply Style',
    'room.restoreBtn': 'Restore for {cost} ★',
    'room.notEnoughStars': 'Not enough stars ({current}/{cost} ★)',

    // Room Objects
    'obj.cauldron.name': 'Alchemical Cauldron',
    'obj.cauldron.varA': 'Arcane Bronze',
    'obj.cauldron.varADesc': 'Bronze with ornate gold engravings',
    'obj.cauldron.varB': 'Dark Alchemy',
    'obj.cauldron.varBDesc': 'Cast iron with mystical purple flames',
    'obj.cauldron.varC': 'Elven Radiance',
    'obj.cauldron.varCDesc': 'Silver with runic glow',

    'obj.desk.name': 'Work Desk',
    'obj.desk.varA': 'Massive Oak',
    'obj.desk.varADesc': 'Heavy oak desk stacked with tomes',
    'obj.desk.varB': 'Obsidian',
    'obj.desk.varBDesc': 'Obsidian surface with glowing crystals',
    'obj.desk.varC': 'White Wood',
    'obj.desk.varCDesc': 'White enchanted wood with living ivy',

    'obj.shelves.name': 'Potion Shelves',
    'obj.shelves.varA': 'Carved Wood',
    'obj.shelves.varADesc': 'Dark intricately carved wood',
    'obj.shelves.varB': 'Wrought Iron',
    'obj.shelves.varBDesc': 'Dark warlock wrought-iron racks',
    'obj.shelves.varC': 'Glass Cabinets',
    'obj.shelves.varCDesc': 'Crystal-illuminated glass showcases',

    'obj.window.name': 'Stained Glass Window',
    'obj.window.varA': 'Archmage Constellation',
    'obj.window.varADesc': 'Golden stars and zodiac signs',
    'obj.window.varB': 'Lunar Eclipse',
    'obj.window.varBDesc': 'Silver crescent and cosmic nebulas',
    'obj.window.varC': 'Tree of Life',
    'obj.window.varCDesc': 'Emerald radiant Tree of Life',

    'obj.fireplace.name': 'Magic Fireplace',
    'obj.fireplace.varA': 'Stone Arch',
    'obj.fireplace.varADesc': 'Masonry arch with warm hearth sparks',
    'obj.fireplace.varB': "Dragon's Maw",
    'obj.fireplace.varBDesc': "Sculpted dragon mouth breathing magma",
    'obj.fireplace.varC': 'Crystal Hearth',
    'obj.fireplace.varCDesc': 'Lapis lazuli hearth with sapphire fire',

    'obj.carpet.name': 'Enchanted Carpet',
    'obj.carpet.varA': 'Alchemy Circle',
    'obj.carpet.varADesc': 'Golden ring of transmutation runes',
    'obj.carpet.varB': 'Arcane Seal',
    'obj.carpet.varBDesc': 'Deep purple pentagram of shielding',
    'obj.carpet.varC': 'Moonflowers',
    'obj.carpet.varCDesc': 'Luminescent night-blooming floral pattern',

    // Orders
    'orders.title': 'Academy Orders',
    'orders.subtitle': 'Help faculty & students to earn Magic Stars',
    'orders.required': 'Requires:',
    'orders.complete': 'Deliver Order!',
    'orders.inProgress': 'In Progress',
    'char.corvus.name': 'Corvus',
    'char.corvus.role': 'Raven Archivist',
    'char.corvus.dialogue1': 'Welcome to Arcanum! I need an herbal brew for cataloging ink.',
    'char.lucian.name': 'Prof. Lucian',
    'char.lucian.role': 'Master of Alchemy',
    'char.lucian.dialogue1': 'For my transmutation trial, prepare a healing potion and an ink note.',
    'char.mira.name': 'Mira',
    'char.mira.role': 'Arcane Apprentice',
    'char.mira.dialogue1': 'My Light Magic exam is today! I urgently need a Scroll of Light.',
    'orders.genericDialogue': 'Arcanum Academy needs your alchemical mastery!',

    // Shop
    'shop.title': 'Magic Shop',
    'shop.subtitle': 'Energy refills and rare Academy artifacts',
    'shop.hitBadge': 'BEST VALUE',
    'shop.starterPackTitle': 'Arcanum Adept Pack',
    'shop.starterPackDesc': '150 Energy + 50 Gems + Exclusive Cauldron',
    'shop.starterPackPrice': '25 Yans (Test)',
    'shop.energySection': '⚡ Energy Source',
    'shop.rewardedTitle': '+25 Energy',
    'shop.rewardedDesc': 'Free refill for watching an ad',
    'shop.rewardedBtn': 'Watch',
    'shop.rewardedClaimed': 'Claimed!',
    'shop.gemEnergyTitle': '+50 Energy',
    'shop.gemEnergyDesc': 'Instant crystal infusion',
    'shop.coinsSection': '🪙 Treasury of Gold',
    'shop.coinsPackTitle': '300 Coins',
    'shop.coinsPackDesc': 'Pouch of alchemical gold'
  },
  tr: {
    // App & Navigation
    'app.title': 'Birleştirme Sihir Akademisi: Gizemli Sırlar',
    'nav.laboratory': 'Laboratuvar',
    'nav.study': 'Oda',
    'nav.orders': 'Siparişler',
    'nav.shop': 'Dükkân',

    // TopBar
    'topbar.energyTitle': 'Enerji Yenile',
    'topbar.coinsTitle': 'Altınlar',
    'topbar.gemsTitle': 'Kristaller',
    'topbar.starsTitle': 'Oda için Sihirli Yıldızlar',
    'topbar.max': 'MAKS',
    'topbar.sound': 'Ses',

    // Board View
    'board.prompt': 'Yükseltmek için aynı eşyaları sürükleyip birleştirin',
    'board.spawnBtn': 'Üret ⚡',
    'board.spawnDesc': 'Yeni bir eşya üretmek için dokun (-1 ⚡)',
    'board.tier': 'Sv. {level}',
    'board.sell': '+{amount} 🪙',
    'board.removeWeb': 'Ağı Temizle',
    'board.cobwebTitle': 'Örümcek Ağı: birleştirin veya temizleyin',

    // Generators
    'gen.cauldron.name': 'Simya Kazanı',
    'gen.desk.name': 'Büyülü Kürsü',
    'gen.geode.name': 'Kristal Jeot',

    // Items: Potions
    'item.pot_1.name': 'Boş Şişe',
    'item.pot_1.desc': 'Karışımları toplamak için şeffaf bir cam kap.',
    'item.pot_2.name': 'Bitki Çayı',
    'item.pot_2.desc': 'Ferahlatıcı orman kokulu ay ışığı bitkileri.',
    'item.pot_3.name': 'İyileşme İksiri',
    'item.pot_3.desc': 'Canlandırıcı yakut renkli bir şifa merhemi.',
    'item.pot_4.name': 'Mana İksiri',
    'item.pot_4.desc': 'Büyücülerin yoğunlaştırılmış safir enerjisi.',
    'item.pot_5.name': 'Görünmezlik İksiri',
    'item.pot_5.desc': 'Sizi bakışlardan gizleyen ışıltılı gümüş sıvı.',
    'item.pot_6.name': 'Ejderha Ateşi',
    'item.pot_6.desc': 'Kadim bir ejderhanın alevli özü.',
    'item.pot_7.name': 'Ölümsüzlük İksiri',
    'item.pot_7.desc': 'Sonsuz gençliğin efsanevi altın nektarı.',
    'item.pot_8.name': 'Felsefe Taşı',
    'item.pot_8.desc': 'Mucizeler yaratabilen simyanın en büyük sırrı.',

    // Items: Scrolls
    'item.scr_1.name': 'Parşömen Parçası',
    'item.scr_1.desc': 'Üzerinde gizemli bir işaret olan sararmış kağıt parçası.',
    'item.scr_2.name': 'Mürekkepli Not',
    'item.scr_2.desc': 'Arşivci Corvus’tan mühürlü bir mesaj.',
    'item.scr_3.name': 'Işık Parşömeni',
    'item.scr_3.desc': 'İpek kurdeleyle bağlanmış sarılı parşömen.',
    'item.scr_4.name': 'Rünik Elyazması',
    'item.scr_4.desc': 'Pırıl pırıl parlayan element rünleriyle dolu parşömen.',
    'item.scr_5.name': 'Çırak Kitabı',
    'item.scr_5.desc': 'Sağlam deri ciltli temel büyü kitabı.',
    'item.scr_6.name': 'Elementler Cildi',
    'item.scr_6.desc': 'Değerli taşlarla süslenmiş ağır bir büyü kitabı.',
    'item.scr_7.name': 'Mühürlü Büyü Kitabı',
    'item.scr_7.desc': 'Sihirli bir kilitle kapatılmış kadim kitap.',
    'item.scr_8.name': 'Sonsuzluk Kitabı',
    'item.scr_8.desc': 'Tüm başbüyücülerin mutlak bilgi kaynağı.',

    // Items: Crystals
    'item.crys_1.name': 'Ametist Parçası',
    'item.crys_1.desc': 'Hafif mor ışıltılı küçük bir kristal kırığı.',
    'item.crys_2.name': 'Mana Kristali',
    'item.crys_2.desc': 'Parlak turkuaz ışık yayan saf bir mineral.',
    'item.crys_3.name': 'Yüklü Değerli Taş',
    'item.crys_3.desc': 'Toplanmış doğal enerjiyle nabız gibi atıyor.',
    'item.crys_4.name': 'Yakut Çekirdek',
    'item.crys_4.desc': 'Yüksek yoğunluklu alevli bir taş.',
    'item.crys_5.name': 'Enerji Küresi',
    'item.crys_5.desc': 'Yoğunlaştırılmış enerji küresi (kullanıldığında +25 enerji).',
    'item.crys_6.name': 'Işıltılı Teserakt',
    'item.crys_6.desc': 'Tükenmez büyüye sahip dört boyutlu kristal (+60 enerji).',
    'item.crys_7.name': 'Yıldız Kalbi',
    'item.crys_7.desc': 'Düşmüş bir kuyruklu yıldız çekirdeği (+150 enerji).',

    // Room
    'room.title': 'Simyacının Odası',
    'room.subtitle': 'Akademi’nin Unutulmuş Kanadındaki kadim laboratuvar',
    'room.chooseStyle': 'Dekor stilini seçin',
    'room.cost': 'Maliyet: {cost} ★',
    'room.applyStyle': 'Stili Uygula',
    'room.restoreBtn': '{cost} ★ ile Yenile',
    'room.notEnoughStars': 'Yeterli yıldız yok ({current}/{cost} ★)',

    // Room Objects
    'obj.cauldron.name': 'Simya Kazanı',
    'obj.cauldron.varA': 'Gizem Bronzu',
    'obj.cauldron.varADesc': 'Altın işlemeli bronz kazan',
    'obj.cauldron.varB': 'Karanlık Simya',
    'obj.cauldron.varBDesc': 'Mor alevli dökme demir kazan',
    'obj.cauldron.varC': 'Elf Işıltısı',
    'obj.cauldron.varCDesc': 'Rünik parıltılı gümüş kazan',

    'obj.desk.name': 'Çalışma Masası',
    'obj.desk.varA': 'Masif Meşe',
    'obj.desk.varADesc': 'Kitaplarla dolu ağır meşe masa',
    'obj.desk.varB': 'Obsidyen',
    'obj.desk.varBDesc': 'Kristalli obsidyen yüzey',
    'obj.desk.varC': 'Beyaz Ağaç',
    'obj.desk.varCDesc': 'Canlı filizlerle beyaz sihirli ağaç',

    'obj.shelves.name': 'İksir Rafları',
    'obj.shelves.varA': 'Oymalı Ahşap',
    'obj.shelves.varADesc': 'Koyu renkli oymalı ahşap',
    'obj.shelves.varB': 'Dövme Demir',
    'obj.shelves.varBDesc': 'Karanlık büyücü demir rafları',
    'obj.shelves.varC': 'Cam Vitrinler',
    'obj.shelves.varCDesc': 'Kristal aydınlatmalı cam raflar',

    'obj.window.name': 'Vitray Pencere',
    'obj.window.varA': 'Başbüyücü Takımyıldızı',
    'obj.window.varADesc': 'Altın yıldızlar ve burçlar',
    'obj.window.varB': 'Ay Tutulması',
    'obj.window.varBDesc': 'Gümüş hilal ve bulutsular',
    'obj.window.varC': 'Hayat Ağacı',
    'obj.window.varCDesc': 'Zümrüt ışıltılı Hayat Ağacı',

    'obj.fireplace.name': 'Büyülü Şömine',
    'obj.fireplace.varA': 'Taş Kemer',
    'obj.fireplace.varADesc': 'Sıcak kıvılcımlı taş duvar kemeri',
    'obj.fireplace.varB': 'Ejderha Ağzı',
    'obj.fireplace.varBDesc': 'Lav püskürten heykelsi ejderha ağzı',
    'obj.fireplace.varC': 'Kristal Ocak',
    'obj.fireplace.varCDesc': 'Safir alevli lapis lazuli ocak',

    'obj.carpet.name': 'Efsunlu Halı',
    'obj.carpet.varA': 'Simya Çemberi',
    'obj.carpet.varADesc': 'Altın simya sembolleri çemberi',
    'obj.carpet.varB': 'Gizem Mührü',
    'obj.carpet.varBDesc': 'Mor rünik koruma mührü',
    'obj.carpet.varC': 'Ay Çiçekleri',
    'obj.carpet.varCDesc': 'Işıltılı gece çiçekleri deseni',

    // Orders
    'orders.title': 'Akademi Siparişleri',
    'orders.subtitle': 'Yıldız kazanmak için öğretmenlere ve öğrencilere yardım edin',
    'orders.required': 'Gereken:',
    'orders.complete': 'Teslim Et!',
    'orders.inProgress': 'Hazırlanıyor',
    'char.corvus.name': 'Corvus',
    'char.corvus.role': 'Kuzgun Arşivci',
    'char.corvus.dialogue1': 'Akademiye hoş geldin! Katalog mürekkebi için bitki çayına ihtiyacım var.',
    'char.lucian.name': 'Prof. Lucian',
    'char.lucian.role': 'Simya Üstadı',
    'char.lucian.dialogue1': 'Dönüşüm deneyi için bir iyileşme iksiri ve mürekkepli not hazırla.',
    'char.mira.name': 'Mira',
    'char.mira.role': 'Gizem Öğrencisi',
    'char.mira.dialogue1': 'Işık büyüsü sınavım var! Acilen bir Işık Parşömenine ihtiyacım var.',
    'orders.genericDialogue': 'Arcanum Akademisi senin simya ustalığına ihtiyaç duyuyor!',

    // Shop
    'shop.title': 'Büyülü Dükkân',
    'shop.subtitle': 'Enerji yenileme ve Akademiye özel nadir eşyalar',
    'shop.hitBadge': 'EN ÇOK SATAN',
    'shop.starterPackTitle': 'Arcanum Çırak Paketi',
    'shop.starterPackDesc': '150 Enerji + 50 Kristal + Özel Kazan',
    'shop.starterPackPrice': '25 Yan (Test)',
    'shop.energySection': '⚡ Enerji Kaynağı',
    'shop.rewardedTitle': '+25 Enerji',
    'shop.rewardedDesc': 'Reklam izleyerek ücretsiz enerji',
    'shop.rewardedBtn': 'İzle',
    'shop.rewardedClaimed': 'Alındı!',
    'shop.gemEnergyTitle': '+50 Enerji',
    'shop.gemEnergyDesc': 'Kristalden anında enerji dolumu',
    'shop.coinsSection': '🪙 Altın Hazinesi',
    'shop.coinsPackTitle': '300 Altın',
    'shop.coinsPackDesc': 'Simya altını kesesi'
  }
};

class I18nService {
  currentLang = $state<Language>('ru');

  constructor() {
    this.detectLanguage();
  }

  private detectLanguage() {
    try {
      const saved = localStorage.getItem('mma_lang') as Language;
      if (saved && (saved === 'ru' || saved === 'en' || saved === 'tr')) {
        this.currentLang = saved;
        return;
      }
      if (typeof navigator !== 'undefined') {
        const navLang = navigator.language.toLowerCase();
        if (navLang.startsWith('tr')) {
          this.currentLang = 'tr';
          return;
        }
        if (navLang.startsWith('en')) {
          this.currentLang = 'en';
          return;
        }
      }
    } catch {}
    this.currentLang = 'ru';
  }

  public setLanguage(lang: Language) {
    this.currentLang = lang;
    try {
      localStorage.setItem('mma_lang', lang);
    } catch {}
  }

  public t(key: string, params?: Record<string, string | number>): string {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ru;
    let text = (dict as Record<string, string>)[key] || (TRANSLATIONS.ru as Record<string, string>)[key] || key;

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }

    return text;
  }
}

export const i18n = new I18nService();
export const t = (key: string, params?: Record<string, string | number>) => i18n.t(key, params);
