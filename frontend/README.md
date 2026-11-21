# LeaguePlatform UI

> Interface Angular générée par IA (par le mentor), écran par écran, à partir du contrat OpenAPI (`api/openapi.yaml`). Elle sert à visualiser et tester les fonctionnalités du backend Spring Boot sans logique métier côté client.

## Prérequis

- Node.js 22+ et npm
- Java 21 (utilisé par `@openapitools/openapi-generator-cli` pour générer le client TypeScript)

## Commandes

Depuis `frontend/` :

- `npm install` : installe les dépendances
- `npm run api:generate` : génère le client HTTP typé dans `src/app/api/` depuis `../api/openapi.yaml`
- `npm start` : régénère le client et démarre l'application sur le backend local (`http://localhost:8080`)
- `npm run start:mock` : régénère le client et démarre l'application sur l'environnement `mock` (Apidog)
- `npm run build` : régénère le client et compile l'application
- `npm test` : régénère le client et lance les tests unitaires (Vitest)

## Structure

- `src/app/core/` : coquille applicative, route d'accueil, intercepteur et bannière d'erreurs `ProblemDetail`
- `src/app/shared/` : composants réutilisables (`EmptyState`)
- `src/app/features/` : écrans métier (ajoutés au fil des fonctionnalités)
- `src/app/api/` : client HTTP généré depuis `api/openapi.yaml` (ignoré par Git)
