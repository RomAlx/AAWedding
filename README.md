# Сайт-приглашение Алексея и Анны

Одностраничный landing: расписание, адреса и пожелания к вечеру.

**Сайт:** https://romalx.github.io/AAWedding/

## Локальный запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Как поменять тексты

Все тексты, адреса и ссылки — в `src/data/config.ts`.

## Деплой

Push в `main` → GitHub Actions собирает сайт и публикует на Pages.

В репозитории: **Settings → Pages → Source → GitHub Actions**.

## Стек

Vue 3 + Vite + TypeScript + Tailwind CSS 4 + GSAP
