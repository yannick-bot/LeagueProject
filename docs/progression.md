# Progression du projet : LeaguePlatform API

> Mis à jour par l'agent à chaque étape franchie. C'est le premier fichier lu en début de session (rule `etat-projet`).

## Où on en est

- **Phase** : F0 terminée et mergée (`PR #2`), démarrage de la fonctionnalité 1 (`parcours-fonctionnalite`).
- **Jalon en cours** : V1.0 - Catalogue public en lecture seule (champions, objets, synchronisation Data Dragon).
- **Fonctionnalité en cours** : 1 (Import des champions depuis les JSON locaux au démarrage) - en cours.
- **Étape du parcours** : `parcours-fonctionnalite`, étape 2 pour F1 (entretien avec l'expert métier pour la user story, la section Écran et les critères d'acceptation).
- **Prochaine étape** : rédiger et créer l'issue GitHub pour F1, dresser la carte locale des concepts (avec les 4 notions `Découvert` à reformuler) et créer la branche dédiée.
- **Décidé le 2026-11-15** : monorepo `backend/` + `frontend/` + `api/`, contrat design-first dans Apidog, front Angular généré par le mentor écran par écran (décisions n°9 à n°12 de `00-cadrage.md`).

## Documents du projet

Les documents ont été créés avant le kit et gardent leurs noms d'origine :

| Rôle dans le kit | Fichier du projet |
| :--- | :--- |
| Cadrage | [00-cadrage.md](00-cadrage.md) |
| Référence de la source de données | [01-data-dragon.md](01-data-dragon.md) |
| Modèle métier, DDD et BDD | [02-modele-domaine-et-bdd.md](02-modele-domaine-et-bdd.md) |
| Contrat d'API | [03-contrat-api-v1.md](03-contrat-api-v1.md) (version de conception) ; à terme, `api/openapi.yaml` exporté depuis Apidog fait foi |

La mémoire d'apprentissage (grille, journal et mémo d'erreurs, fiches concept, bibliothèque de cours) n'est plus dans ce dépôt : elle vit dans la **mémoire partagée** `.memoire/`, dépôt Git à part, commun à tous les projets, cloné à la racine et exclu via `.git/info/exclude` (rule `etat-projet`). L'ancien dossier `learnt/` y a été migré le 2026-11-22.

| Rôle dans le kit | Fichier de la mémoire partagée |
| :--- | :--- |
| Grille de compétences | `.memoire/competences.md` |
| Journal d'erreurs | `.memoire/journal-erreurs.md` |
| Mémo d'erreurs (syntaxe, configuration) | `.memoire/memo-erreurs.md` |
| Fiches concept | `.memoire/concepts/` |
| Bibliothèque de cours | `.memoire/bibliotheque.md` |

## Fonctionnalités du jalon V1.0

> Ordre **proposé**, à valider par l'apprenant (étape 1 de `parcours-fonctionnalite` : justifier l'ordre par les dépendances, la valeur et le risque).

| # | Fonctionnalité | Issue | État |
| :--- | :--- | :--- | :--- |
| 0 | Socle technique : monorepo (`backend/` déplacé, `frontend/`, `api/`), dépôt Git et GitHub, nettoyage du squelette, PostgreSQL (Docker Compose), Liquibase, projet Apidog, coquille Angular (générée par le mentor), CI backend et front | #1 | fait (PR #2) |
| 1 | Import des champions depuis les JSON locaux au démarrage (si la base est vide) | | en cours |
| 2 | `GET /api/v1/champions/{riotId}` : détail d'un champion | | à faire |
| 3 | `GET /api/v1/champions` : liste paginée, recherche, filtre par tag, tri | | à faire |
| 4 | Import des objets depuis les JSON locaux (recettes, stats, tags) | | à faire |
| 5 | `GET /api/v1/items/{riotId}` : détail d'un objet avec ses composants | | à faire |
| 6 | `GET /api/v1/items` : liste paginée et filtres | | à faire |
| 7 | `POST /api/v1/admin/sync` : synchronisation depuis le CDN Data Dragon (`RestClient`, `502` / `503`) | | à faire |

## Points ouverts

1. ~~**Squelette à nettoyer** (fonctionnalité 0)~~ : fait et mergé en PR #2 (`com.leagueplatform`, `ProblemDetail` RFC 9457, PostgreSQL + Docker Compose, Liquibase, Springdoc 3.2.0, `data/.gitkeep`, coquille Angular, CI verte).
2. **Modélisation métier légère** : la V1.0 est un catalogue en lecture seule, avec peu de règles de gestion, d'invariants et d'états. La V1.1 (Builds : 6 objets maximum, un rôle visé, builds privés) mérite un passage par `parcours-modeliser-metier` avant son démarrage.
3. **Notions à reformuler** (voir la grille) : 4 notions au niveau Découvert restent à reformuler au moment où elles serviront dans le code (F1/F4). En plus, lors du rappel actif du 2026-11-22, `1NF / @Enumerated(EnumType.STRING)` s'est révélé légèrement fragile (confusion 1NF vs unicité) : à consolider rapidement en F1.
4. **Carnet NotebookLM central** `"Concepts Backend Java"` : créé et synchronisé le 2026-11-21 (17 sources). Prochaine synchro en clôture de F1.
5. **Contrat à porter dans Apidog** : `03-contrat-api-v1.md` (5 endpoints) est à ressaisir dans Apidog, endpoint par endpoint, au fil des fonctionnalités, puis à exporter dans `api/openapi.yaml`. Chaque user story devra aussi recevoir sa section "Écran".

## Historique des séances

| Date | Ce qui a été fait | Notions abordées |
| :--- | :--- | :--- |
| avant le 2026-11-06 | Cadrage (V1.0 / V1.1, stack, 8 décisions), modélisation DDD et BDD, contrat d'API V1.0 | Package by Feature, service propriétaire, clé primaire et UNIQUE, upsert, Value Object, agrégat, `@ElementCollection`, `List` vs `Set`, `ProblemDetail`, codes HTTP, BOM Maven, `ddl-auto=validate`, Testcontainers |
| 2026-11-13 | Restructuration du kit `.agents/` (agents mentor et archiviste, rules, parcours, références) ; migration des fiches vers `learnt/concepts/` (14 fiches agnostiques), grille de compétences, journal d'erreurs | Méthode d'apprentissage guidé |
| 2026-11-15 | Ajout du front généré au kit : monorepo, Apidog (design-first, mock), Angular écran par écran, section "Écran" des user stories | Mock et API-First, design-first vs code-first |
| 2026-11-16 | Écriture d'un second kit, "contribution open source" (`kit-open-source/.agents/`, à déplacer hors du projet). Mise à jour de ce kit : bibliothèque de cours NotebookLM (`learnt/bibliotheque.md`, lecture seule, source secondaire), retrait de la skill `backend-dev-guidelines` (écrite pour Node.js) | Sources de vérité : documentation officielle avant les cours |
| 2026-11-17 | Reprise de session : rappel actif (3/3), validation des reformulations agnostiques (upsert, codes HTTP), alignement de `learnt/bibliotheque.md` avec NotebookLM, cadrage complété (outils du Student Pack et carte des connaissances) | Upsert par clé métier, codes HTTP (`400`/`404`/`200`), Package by Feature |
| 2026-11-18 au 2026-11-21 | F0 (Socle technique, issue #1, PR #2 mergée) : monorepo, PostgreSQL Docker Compose, Liquibase, `ProblemDetail` + `ResponseEntityExceptionHandler`, Springdoc, Testcontainers, Apidog initial, coquille Angular 22, CI GitHub Actions (et débogage `npm ci` / `.npmrc`, entrée `E-002`) | `ProblemDetail`, BOM Maven, `ddl-auto=validate`, Testcontainers, `npm ci` vs `npm install`, reproductibilité CI |
| 2026-11-22 | Mémoire partagée `.memoire/` (dépôt à part, commun aux deux kits) : tri des erreurs (journal, mémo ou rien), protocole de récidive, "apprendre à chercher" (carte des sources), mise à jour des deux kits, migration de `learnt/` (14 fiches, grille au format unique, E-001 et E-002, bibliothèque) | Mémo et journal d'erreurs, récidive, juger une source |
