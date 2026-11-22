---
trigger: always_on
---

# Pratiques professionnelles (dès le premier jour)

Ces pratiques ne sont pas des concepts à découvrir plus tard : ce sont des **réflexes**, et un réflexe se construit en répétant dès le début. Le dépôt GitHub de chaque projet est aussi le portfolio de l'apprenant.

## Structure du dépôt (monorepo)

```text
<projet>/
├── backend/        Spring Boot : écrit par l'apprenant
├── frontend/       Angular : généré par le mentor
├── api/
│   └── openapi.yaml   Le contrat : conçu dans Apidog par l'apprenant, puis exporté
├── docs/           Cadrage, modèle métier, ADR, progression
└── .memoire/       Mémoire partagée entre tous les projets : dépôt à part, ignoré par celui-ci
```

`.memoire/` (grille, journal et mémo d'erreurs, fiches concept) n'appartient pas au projet : c'est un dépôt Git distinct, cloné à la racine et exclu via `.git/info/exclude` (rule `etat-projet`). Il se commite et se pousse à part.

Le README du dépôt indique clairement que **le front est généré par IA** et que le travail de l'apprenant porte sur le backend et le contrat.

## Le flux d'une fonctionnalité

1. **Issue GitHub** rédigée comme une user story, avec la description de l'écran et des critères d'acceptation (modèle : `.agents/references/templates/user-story.md`). Elle sort du dialogue avec l'expert métier.
2. **Branche dédiée** depuis `main` : `feat/<numero-issue>-<description-courte>` (ou `fix/`, `docs/`, `chore/`, `test/`, `refactor/`).
3. **Commits conventionnels**, petits et cohérents : `feat:`, `fix:`, `test:`, `refactor:`, `docs:`, `chore:`, `build:`, `ci:`, avec une portée qui dit quelle partie change : `feat(api):` (contrat), `feat(backend):`, `feat(ui):` ou `chore(ui):` (front généré). Message à l'impératif, qui dit le *pourquoi* quand ce n'est pas évident. Référence à l'issue (`refs #12`).
4. **Pull Request** (modèle : `.agents/references/templates/pull-request.md`) qui ferme l'issue (`closes #12`). Une seule PR par fonctionnalité : contrat, backend et écran ensemble.
5. **CI verte obligatoire** : build et tests du backend (y compris Testcontainers) et build du front passent avant toute revue.
6. **Revue de code** par le mentor, dans son rôle de relecteur. Une fois les corrections faites, le **tri** des points corrigés (rule `journal-erreurs`).
7. **Merge** dans `main`, puis suppression de la branche.

## Règles

- L'apprenant tape lui-même les commandes `git` et `gh`. L'agent explique, vérifie l'état (`git status`, `git log`) et corrige les mauvaises habitudes.
- Jamais de commit direct sur `main` une fois le projet initialisé.
- **Jamais de secret dans Git** (mot de passe, clé d'API, token) : variables d'environnement, fichier `.env` ignoré, ou gestionnaire de secrets. Si un secret a été commité, on le considère comme compromis et on le révoque.
- Pas de code mort, pas d'artefact de build (`target/`, `node_modules/`, `dist/`, client HTTP généré depuis le contrat), pas de log de crash (`hs_err_pid*.log`) dans le dépôt : `.gitignore` à jour. Le code source du front, lui, est commité.
- **Contrat modifié = contrat exporté** : toute modification dans Apidog est exportée dans `api/openapi.yaml` et commitée dans la même PR. Le fichier du dépôt fait foi.
- Les tests font partie de la fonctionnalité : une PR sans test pour les critères d'acceptation n'est pas prête.
