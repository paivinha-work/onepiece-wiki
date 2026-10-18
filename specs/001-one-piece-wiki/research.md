# Research: One Piece Wiki

## API One Piece selecionada

**Decision**: Usar a API documentada em
[api-onepiece.com](https://documentation.api-onepiece.com/en) com base
`https://api.api-onepiece.com/v2`. Consultar o catálogo completo por
`GET /characters/en` e o perfil por `GET /characters/en/{id}`.

**Rationale**: O usuário indicou essa fonte via
[Free Public APIs](https://www.freepublicapis.com/one-piece-api); a documentação
do provedor descreve rotas de lista e detalhe. Requisições GET ao endpoint de
personagem foram testadas e responderam com dados de catálogo e detalhe.

**Alternatives considered**: Não selecionar outra API, pois o usuário especificou
a fonte. Não planejar busca remota ou paginação: a documentação consultada não
descreve esses recursos, e uma requisição com `?page=2` retornou a mesma lista
completa observada.

**Verified response behavior**:

- A lista observada é um array de 786 registros; essa contagem é um retrato do
  momento, não uma garantia de volume ou completude.
- A documentação lista `id`, `name`, `job`, `size`, `birthday`, `age`, `bounty`,
  `status` e dados aninhados de `crew` e `fruit`.
- Campos podem faltar ou ser `null`; valores observados não obedecem sempre ao
  tipo declarado na documentação (incluindo valores numéricos e booleanos).
  Validar e mapear os dados recebidos sem pressupor que todo registro é uniforme.
- Um ID inexistente retornou `null` com HTTP 200. Uma rota desconhecida retornou
  HTTP 404 com corpo HTML; não há contrato de erro padronizado conhecido.
- A listagem da API diz que não é necessária chave e que limites de uso não são
  publicados. Uma requisição GET de origem cruzada foi testada com CORS
  permissivo; isso não garante todos os endpoints, origens ou disponibilidade
  futura.

**License and attribution**: O índice descreve o serviço como não oficial e
feito por fãs, destinado a uso educacional e de desenvolvimento; recomenda
verificar direitos e obter permissão para uso comercial. Não foi encontrada
licença formal dos dados nem regra explícita de atribuição. Manter a atribuição
ao provedor e confirmar termos/direitos antes de distribuição pública ou
comercial.

**Unknowns / implementation checks**: Confirmar comportamento dos endpoints no
ambiente de implementação, validar payloads em tempo de execução, verificar
política de uso e licença atualizadas, e decidir a estratégia de fallback para
dados inconsistentes. Não há fonte de capítulos por personagem ou metadados de
spoilers documentados.

Sources:

- [API directory entry and FAQ](https://www.freepublicapis.com/one-piece-api)
- [Provider documentation](https://documentation.api-onepiece.com/en)
- [Character documentation](https://documentation.api-onepiece.com/en/13-character)
- [Observed character collection](https://api.api-onepiece.com/v2/characters/en)
- [Observed character detail](https://api.api-onepiece.com/v2/characters/en/1)
- [Provider site](https://api-onepiece.com/en)

## Frontend stack

**Decision**: Use the requested React + TypeScript + Vite + TanStack React Query
+ Tailwind CSS stack. Start from Vite's React-TypeScript template. Use
TanStack Query for request lifecycle and in-session caching; filter the
downloaded catalog locally for name search.

**Rationale**: Vite documents a React + TypeScript starter. TanStack Query
documents React support and `QueryClientProvider` setup; Tailwind documents a
Vite integration. These tools have compatible integration paths. React
recommends considering a framework for many new applications, but this feature
is deliberately scoped as a client-side Vite application with no backend or
server-rendering requirement.

**Testing decision**: Use Vitest and React Testing Library for the Vite-based
unit/component test suite, with mocked HTTP responses for deterministic API
states. Run TypeScript checking and production build separately as quality
gates.

**Compatibility constraint**: Tailwind CSS v4 documents modern browser minimums
(Chrome 111, Safari 16.4, Firefox 128). The project has no stated legacy browser
target; confirm this remains acceptable before implementation if older browsers
must be supported.

Sources:

- [Vite guide](https://vite.dev/guide/)
- [React: Creating a React app](https://react.dev/learn/creating-a-react-app)
- [TanStack Query installation](https://tanstack.com/query/latest/docs/framework/react/installation)
- [TanStack Query quick start](https://tanstack.com/query/latest/docs/framework/react/quick-start)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Tailwind CSS browser compatibility](https://tailwindcss.com/docs/compatibility)
