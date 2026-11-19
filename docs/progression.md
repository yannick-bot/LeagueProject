# Progression du projet : LeaguePlatform API

> Mis à jour par l'agent à chaque étape franchie. C'est le premier fichier lu en début de session (rule `etat-projet`).

## Où on en est

- **Phase** : cadrage complet et modélisation terminés, passage à la première fonctionnalité (`parcours-fonctionnalite`).
- **Jalon en cours** : V1.0 - Catalogue public en lecture seule (champions, objets, synchronisation Data Dragon).
- **Fonctionnalité en cours** : 0 (Socle technique, issue `#1`).
- **Étape du parcours** : `parcours-fonctionnalite`, étape 6/9 pour F0 (coquille Angular générée, mise en place de la CI GitHub Actions).
- **Prochaine étape** : commiter la coquille Angular (`chore(ui):`), configurer le workflow CI GitHub Actions (backend + frontend), puis ouvrir la PR de la fonctionnalité 0 (`closes #1`).
- **Décidé le 2026-11-15** : monorepo `backend/` + `frontend/` + `api/`, contrat design-first dans Apidog, front Angular généré par le mentor écran par écran (décisions n°9 à n°12 de `00-cadrage.md`).

## Documents du projet

Les documents ont été créés avant le kit et gardent leurs noms d'origine :

| Rôle dans le kit | Fichier du projet |
| :--- | :--- |
| Cadrage | [00-cadrage.md](00-cadrage.md) |
| Référence de la source de données | [01-data-dragon.md](01-data-dragon.md) |
| Modèle métier, DDD et BDD | [02-modele-domaine-et-bdd.md](02-modele-domaine-et-bdd.md) |
| Contrat d'API | [03-contrat-api-v1.md](03-contrat-api-v1.md) (version de conception) ; à terme, `api/openapi.yaml` exporté depuis Apidog fait foi |
| Grille de compétences | [../learnt/competences.md](../learnt/competences.md) |
| Journal d'erreurs | [../learnt/journal-erreurs.md](../learnt/journal-erreurs.md) |

## Fonctionnalités du jalon V1.0

> Ordre **proposé**, à valider par l'apprenant (étape 1 de `parcours-fonctionnalite` : justifier l'ordre par les dépendances, la valeur et le risque).

| # | Fonctionnalité | Issue | État |
| :--- | :--- | :--- | :--- |
| 0 | Socle technique : monorepo (`backend/` déplacé, `frontend/`, `api/`), dépôt Git et GitHub, nettoyage du squelette, PostgreSQL (Docker Compose), Liquibase, projet Apidog, coquille Angular (générée par le mentor), CI backend et front | #1 | en cours |
| 1 | Import des champions depuis les JSON locaux au démarrage (si la base est vide) | | à faire |
| 2 | `GET /api/v1/champions/{riotId}` : détail d'un champion | | à faire |
| 3 | `GET /api/v1/champions` : liste paginée, recherche, filtre par tag, tri | | à faire |
| 4 | Import des objets depuis les JSON locaux (recettes, stats, tags) | | à faire |
| 5 | `GET /api/v1/items/{riotId}` : détail d'un objet avec ses composants | | à faire |
| 6 | `GET /api/v1/items` : liste paginée et filtres | | à faire |
| 7 | `POST /api/v1/admin/sync` : synchronisation depuis le CDN Data Dragon (`RestClient`, `502` / `503`) | | à faire |

## Points ouverts

1. **Squelette à nettoyer** (fonctionnalité 0) :
   - le package est `com.example.demo` au lieu de `com.leagueplatform`, et `spring.application.name=demo` ;
   - `ApiResponse` (un wrapper `success/message/data`) contredit le contrat (`PagedResponse` et `ProblemDetail`) ;
   - `GlobalExceptionHandler` renvoie une `Map` en 500 et expose `ex.getMessage()` : format non standard et fuite d'information ;
   - il manque la datasource, Liquibase, Docker Compose, Springdoc et le dossier `src/main/resources/data/`.
2. **Modélisation métier légère** : la V1.0 est un catalogue en lecture seule, avec peu de règles de gestion, d'invariants et d'états. La V1.1 (Builds : 6 objets maximum, un rôle visé, builds privés) mérite un passage par `parcours-modeliser-metier` avant son démarrage.
3. **Notions à reformuler** (voir la grille) : 8 notions au niveau Découvert à reformuler au moment où elles serviront dans le code.
4. **Carnet NotebookLM central** `"Concepts Backend Java"` : pas encore créé ni alimenté (vérifié le 2026-11-17). Première synchronisation à faire par l'archiviste (14 fiches, grille, cadrage).
5. **Contrat à porter dans Apidog** : `03-contrat-api-v1.md` (5 endpoints) est à ressaisir dans Apidog, endpoint par endpoint, au fil des fonctionnalités, puis à exporter dans `api/openapi.yaml`. Chaque user story devra aussi recevoir sa section "Écran".

## Historique des séances

| Date | Ce qui a été fait | Notions abordées |
| :--- | :--- | :--- |
| avant le 2026-11-06 | Cadrage (V1.0 / V1.1, stack, 8 décisions), modélisation DDD et BDD, contrat d'API V1.0 | Package by Feature, service propriétaire, clé primaire et UNIQUE, upsert, Value Object, agrégat, `@ElementCollection`, `List` vs `Set`, `ProblemDetail`, codes HTTP, BOM Maven, `ddl-auto=validate`, Testcontainers |
| 2026-11-13 | Restructuration du kit `.agents/` (agents mentor et archiviste, rules, parcours, références) ; migration des fiches vers `learnt/concepts/` (14 fiches agnostiques), grille de compétences, journal d'erreurs | Méthode d'apprentissage guidé |
| 2026-11-15 | Ajout du front généré au kit : monorepo, Apidog (design-first, mock), Angular écran par écran, section "Écran" des user stories | Mock et API-First, design-first vs code-first |
| 2026-11-16 | Écriture d'un second kit, "contribution open source" (`kit-open-source/.agents/`, à déplacer hors du projet). Mise à jour de ce kit : bibliothèque de cours NotebookLM (`learnt/bibliotheque.md`, lecture seule, source secondaire), retrait de la skill `backend-dev-guidelines` (écrite pour Node.js) | Sources de vérité : documentation officielle avant les cours |
| 2026-11-17 | Reprise de session : rappel actif (3/3), validation des reformulations agnostiques (upsert, codes HTTP), alignement de `learnt/bibliotheque.md` avec NotebookLM, cadrage complété (outils du Student Pack et carte des connaissances) | Upsert par clé métier, codes HTTP (`400`/`404`/`200`), Package by Feature |
