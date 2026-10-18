# One Piece Wiki

Aplicação web criada com React, TypeScript e Vite. A stack inclui TanStack
React Query, Axios, Tailwind CSS v4 e ESLint.

O catálogo e os perfis são obtidos da [One Piece API](https://api-onepiece.com/en),
um serviço de fãs não oficial. A API não documenta limites de uso nem uma
licença formal dos dados; verifique os termos e direitos antes de distribuir ou
usar comercialmente.

## Requisitos

- Node.js compatível com Vite 8 (Node.js 20.19+ ou 22.12+).
- npm.

## Desenvolvimento

```sh
npm install
npm run dev
```

## Validação

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

O Tailwind CSS v4 usa o plugin oficial do Vite (`@tailwindcss/vite`); não é
necessário executar `tailwindcss init -p`.

## Deploy

O projeto é publicado no GitHub Pages automaticamente a cada push para `main`
por meio de GitHub Actions. Depois da primeira execução bem-sucedida, acesse
`https://paivinha-work.github.io/onepiece-wiki/`.
