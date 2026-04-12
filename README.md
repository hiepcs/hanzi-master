# Hanzi Master ✍️

A smart Chinese character learning tool built with React + Vite + Tailwind CSS.

## Features

- **Stroke Order** — Animated stroke-by-stroke breakdown for any Chinese character using [HanziWriter](https://hanziwriter.org/)
- **Pinyin Converter** — Convert Chinese text to pinyin with tone marks or numbers via [pinyin-pro](https://github.com/zh-lx/pinyin-pro)
- **50 Common Radicals** — Browse and learn the most frequently used radicals with meanings and pronunciation
- **Print Worksheets** — Generate printable character practice sheets with customizable grid styles (米字格, 田字格)
- **Text-to-Speech** — Listen to native Chinese pronunciation using the Web Speech API
- **i18n** — English and Vietnamese interface
- **Persistent Settings** — All preferences saved to localStorage

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── shared/          # Reusable components (StrokeOrderItem, GridCell, VoiceSelector)
│   ├── Stroke/          # Stroke order view
│   ├── Pinyin/          # Pinyin converter view
│   ├── Radicals/        # Radicals reference view
│   ├── Template/        # Print worksheet view
│   └── Header.jsx
├── hooks/               # useVoices, useLocalStorage, useScriptLoader
├── i18n/                # Translations (en, vi) and I18nContext
├── constants/           # Radicals data
├── util/                # Hanzi helpers
└── App.jsx
```

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)
- [HanziWriter](https://hanziwriter.org/) (stroke animations)
- [pinyin-pro](https://github.com/zh-lx/pinyin-pro) (pinyin conversion)

## Deploy

Configured for GitHub Pages via GitHub Actions. Push to `main` to trigger deployment.

## License

MIT
