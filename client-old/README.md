# ModelSLab Client

Frontend aplikacji ModelSLab zbudowany z React, TypeScript, Vite i Tailwind CSS.

## Technologie

- **React 18** - Biblioteka UI
- **TypeScript** - Typowanie statyczne
- **Vite** - Szybki bundler i dev server
- **Tailwind CSS** - Framework CSS utility-first

## Instalacja

```bash
pnpm install
```

## Uruchomienie

```bash
pnpm dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## Build

```bash
pnpm build
```

Zbudowane pliki znajdą się w folderze `dist`.

## Preview builda

```bash
pnpm preview
```

## Struktura projektu

```
client/
├── src/
│   ├── App.tsx          # Główny komponent aplikacji
│   ├── main.tsx         # Punkt wejścia
│   └── index.css        # Globalne style z Tailwind
├── index.html           # HTML template
├── vite.config.ts       # Konfiguracja Vite
├── tsconfig.json        # Konfiguracja TypeScript
├── tailwind.config.js   # Konfiguracja Tailwind
└── package.json         # Zależności projektu
```

## Proxy API

Vite jest skonfigurowany z proxy do backendu FastAPI:

- Wszystkie requesty do `/api/*` są przekierowywane na `http://localhost:8000`
