# Project Rules: Merge Magic Academy

## Critical Tool Rules
- **ЗАПРЕТ ВНУТРЕННЕГО БРАУЗЕРА**: Никогда не использовать инструмент `browser_subagent` и не открывать встроенный браузер.
- Валидацию производить исключительно через `npm run check` и `npm run build`.
- Для ручной проверки пользователем сообщать команду и URL локального сервера (`npm run dev` на `http://localhost:5173`).

## Архитектура и Код
- **Svelte 5 Runes**: `$state`, `$derived`, `$effect`.
- **100% Inline SVG**: Никаких растровых картинок (PNG/JPG/WebP).
- **Web Audio API**: Процедурный синтез звуков в коде, никаких внешних аудиофайлов.
- **Мобильный вьюпорт**: `100dvh`, аппаратный композитор (`transform: translate3d`).
