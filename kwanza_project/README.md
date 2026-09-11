# Kwanza Navigator — Vue

Reescrita do protótipo (kwanza-grow-track.lovable.app) em Vue 3 + Vite + Vue Router + Pinia + Tailwind.

## Como usar

1. Extraia este zip.
2. Copie o conteúdo da pasta `src/` para o `src/` do seu projeto (substituindo os arquivos existentes).
3. Copie o `tailwind.config.js` para a raiz do projeto (substituindo o existente, se houver).
4. Confirme que o `vite.config.js` do seu projeto tem o alias `@` apontando para `./src`:

```js
import { fileURLToPath, URL } from 'node:url'

export default {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}
```

5. Confirme que o Tailwind está configurado (`tailwindcss`, `postcss`, `autoprefixer` no `package.json` e `postcss.config.js` apontando para eles).
6. Rode `npm install` (caso falte alguma dependência) e depois `npm run dev`.

## Estrutura

```
src/
  assets/main.css        # diretivas do Tailwind
  components/            # BottomNav, TopHeader, StatCard, SkillBar, CourseCard
  data/mockData.js        # dados mockados (trocar por API depois)
  router/index.js         # rotas + guarda de autenticação
  stores/user.js           # Pinia store do usuário
  views/                   # Login, Dashboard, Courses, CourseDetail, Ranking, Profile
  App.vue
  main.js
tailwind.config.js
```

## Observações

- O login aceita qualquer e-mail/senha preenchidos (mock). Troque a action `login()` em `stores/user.js` pela chamada real à API.
- Cores e espaçamentos são uma aproximação fiel à estrutura do protótipo original — ajuste em `tailwind.config.js` se quiser bater 100% com o visual.
- A rota `/certificates` do protótipo original não foi incluída ainda — avise se quiser que eu monte essa view também.
