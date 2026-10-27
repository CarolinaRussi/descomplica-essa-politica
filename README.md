# Descomplica Essa Política

Dados, fatos e transparência sem enrolação. Plataforma de educação política com votações nominais reais, linha do tempo dos presidentes e fontes auditáveis.

## Estrutura

```text
apps/
  web/   React 19 + Vite + TanStack Router/Query + Tailwind v4 + shadcn (PWA)
  api/   Fastify + TypeORM + Zod + BullMQ (API em src/server.ts, workers em src/worker.ts)
```

## Pré-requisitos

- Node 24 (veja `.nvmrc`)
- pnpm 10
- Docker

## Rodando em desenvolvimento

```bash
pnpm install
cp .env.example .env          # preencha conforme a tabela abaixo
docker compose up -d postgres redis
pnpm --filter api migration:run
pnpm dev                      # web em http://localhost:5173, API em http://localhost:3333
pnpm dev:worker               # em outro terminal, quando precisar dos workers
```

Verifique a API em `http://localhost:3333/health` — deve responder `{"status":"ok","postgres":"ok","redis":"ok"}`.

## Variáveis de ambiente

Um único `.env` na raiz serve a API, o web (variáveis `VITE_*`) e o Docker Compose.

| Variável | Para que serve | Valor típico em dev |
| --- | --- | --- |
| `POSTGRES_USER` | Usuário criado no container do Postgres | um nome qualquer, ex: `descomplica` |
| `POSTGRES_PASSWORD` | Senha desse usuário | qualquer senha local |
| `POSTGRES_DB` | Nome do banco | ex: `descomplica` |
| `DATABASE_URL` | Conexão da API com o Postgres | URL `postgres://` montada com os três valores acima, host `localhost`, porta `5432` |
| `REDIS_URL` | Conexão da API e dos workers com o Redis | URL `redis://` com host `localhost`, porta `6379` |
| `API_PORT` | Porta da API | `3333` |
| `WEB_ORIGIN` | Origem liberada no CORS da API | endereço do web em dev (porta `5173`) |
| `VITE_API_URL` | Endereço da API usado pelo web | endereço da API (porta `3333`) |

A API valida essas variáveis com Zod ao iniciar e encerra com uma mensagem clara se alguma estiver faltando.

## Scripts

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | Sobe web e API com hot reload |
| `pnpm dev:worker` | Sobe os workers do BullMQ |
| `pnpm typecheck` | Checa tipos dos dois apps |
| `pnpm lint` | ESLint no monorepo |
| `pnpm format` | Prettier no monorepo |
| `pnpm test` | Vitest nos dois apps |
| `pnpm build` | Build de produção dos dois apps |
| `pnpm --filter api migration:generate src/db/migrations/<Nome>` | Gera migration a partir das entidades |
| `pnpm --filter api migration:run` | Aplica migrations pendentes |

## Homologação / produção

```bash
docker compose --profile full up -d --build
docker compose exec api node ./node_modules/typeorm/cli.js -d dist/db/dataSource.js migration:run
```

Sobe `postgres`, `redis`, `api` (porta 3333), `worker` e `web` (nginx na porta 8080). `VITE_API_URL` é embutida no build do web, então precisa apontar para o endereço público da API.

## Ferramentas de IA

- Rules do projeto em `.cursor/rules/`.
- Skills de design e UX em `.agents/skills/` (versões travadas em `skills-lock.json`; atualize com `npx skills update -p`).
- MCP do shadcn em `.cursor/mcp.json`.
