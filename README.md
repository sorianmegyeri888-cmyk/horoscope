# 龍鳳緣 — Kínai Pár-Kompatibilitás

## Feltöltés Vercellre (ingyenes, 10 perc)

### 1. GitHub repo létrehozása
1. Menj a github.com oldalra → "New repository"
2. Nevezd el: `horoscope` (vagy bármi)
3. Töltsd fel ebbe a 3 fájlt:
   - `index.html`
   - `api/analyze.js`
   - `vercel.json`

### 2. Vercel deploy
1. Menj a vercel.com oldalra
2. "Add New Project" → válaszd ki a GitHub repót
3. Kattints "Deploy" — automatikusan működik

### 3. OpenAI API kulcs beállítása (FONTOS)
1. Vercel dashboardon: Settings → Environment Variables
2. Add hozzá:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `sk-proj-...` (az OpenAI kulcsod)
3. Kattints "Save"
4. Redeploy: Deployments → "Redeploy"

### Kész!
Az oldal élőn elérhető lesz egy `xyz.vercel.app` URL-en.
Az API kulcs biztonságosan a szerveren van tárolva — a felhasználók nem látják.
