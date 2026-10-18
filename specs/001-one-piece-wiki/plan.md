# Implementation Plan: One Piece Wiki

**Branch**: `001-one-piece-wiki` | **Date**: 2026-10-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-one-piece-wiki/spec.md`

## Summary

Criar uma wiki client-side para consultar, pesquisar e abrir perfis de
personagens de One Piece. A aplicação usa React + TypeScript com Vite, TanStack
React Query para carregamento/cache dos dados da API, e Tailwind CSS para a
interface responsiva. O catálogo é obtido da API pública selecionada; a pesquisa
é feita sobre os dados carregados, pois a API não documenta pesquisa ou
paginação.

## Technical Context

**Language/Version**: TypeScript strict; versão suportada pelo React, Vite e
ferramentas selecionadas no início da implementação.

**Primary Dependencies**: React, Vite, TanStack Query for React e Tailwind CSS.

**Storage**: Nenhum armazenamento persistente na primeira versão; o cache de
consultas vive na sessão da aplicação.

**Testing**: Vitest e React Testing Library para lógica e interface; respostas
HTTP simuladas para testes determinísticos; type-check e build de produção como
gates. Testes end-to-end podem validar as jornadas principais se incluídos no
ambiente do projeto.

**Target Platform**: Navegadores modernos em desktop e dispositivos móveis,
incluindo viewport mínimo de 320 px; acesso de rede necessário para carregar ou
atualizar dados.

**Project Type**: Aplicação web client-side, sem serviço backend próprio no
escopo inicial.

**Performance Goals**: Atender SC-002: após o catálogo estar carregado, 95% das
pesquisas locais apresentam resultados em até dois segundos. Perfil e catálogo
mostram estados de carregamento e erro quando a API está indisponível.

**Constraints**: A API não oficial não publica limites de uso, licença formal,
contrato de paginação nem formato de erro estável. Os dados são incompletos e
tipos observados variam; campos devem ser opcionais e validados. Confirmar
permissões antes de uso comercial. Tailwind CSS v4 requer navegadores modernos.
Spoiler metadata não é fornecida pela API; qualquer conteúdo editorial precisa
de classificação explícita, e conteúdo com risco de spoiler ainda não revisado
deve ser ocultado até classificação.

**Scale/Scope**: Catálogo completo de personagens retornado pela API e perfis
individuais; pesquisa por nome, estados de carregamento/vazio/erro e fatos
sujeitos a spoilers classificados por metadados editoriais. Sem contas, edição
de comunidade ou backend.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Verificação do plano | Resultado |
|---|---|---|
| Canon accuracy and provenance | Consumir apenas fatos que a API fornece, identificar a fonte e não inventar campos ausentes. Dados da API não têm citações de capítulo documentadas; não alegar que as fornecem. | PASS |
| React and TypeScript by default | React + TypeScript strict; fronteiras claras entre interface e acesso/modelagem dos dados. | PASS |
| Accessible, spoiler-aware discovery | Teclado, semântica e viewport móvel incluídos; conteúdo com risco de spoiler exige classificação explícita e fica oculto até revisão/revelação. | PASS |
| Verify behavior with tests | Testes focados, validação de tipos e build cobrindo pesquisa, perfis e estados de erro. | PASS |
| Secure, fast, focused delivery | Somente requisições GET públicas sem segredos; validação de respostas externas, busca local em catálogo em cache; sem dependências de backend não requeridas. | PASS |

**Post-design gate**: PASS. O desenho mantém os princípios; riscos externos
relativos a licença, limite de uso e variabilidade de payload estão explícitos e
não são tratados como garantias da API.

## Project Structure

### Documentation (this feature)

```text
specs/001-one-piece-wiki/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── characters-api.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
├── components/
├── features/
│   └── characters/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── lib/
└── pages/

tests/
├── integration/
└── unit/
```

**Structure Decision**: Aplicação frontend única. O domínio de personagens
mantém as consultas, mapeamento de dados e interface próximos; elementos
genéricos e configuração compartilhada ficam em `src/components` e `src/lib`.
Testes unitários cobrem busca/mapeamento e componentes, enquanto testes de
integração cobrem as jornadas catálogo → perfil e falha → nova tentativa.

## Complexity Tracking

Sem violações da constituição ou complexidade adicional que exija justificativa.
