# Cadrage du projet (Understanding Lock)

> Document de référence du projet. Toute décision qui modifie ce cadrage doit être reportée ici et dans le journal des décisions en bas de page.

## Synthèse

- **Ce que nous construisons :** **LeaguePlatform API**, une API REST professionnelle en **Java 21** et **Spring Boot 4.1.x**, qui exploite les données officielles de **Data Dragon** (Riot Games), complétées par un domaine utilisateur (création de builds personnalisés).
- **Pourquoi :** projet d'entraînement pour couvrir toute la roadmap du développeur Spring Boot : modélisation JPA, requêtes JPQL/Criteria, DTO en Records, validation Jakarta, erreurs RFC 9457, Spring Security / JWT, Liquibase, cache, tests d'intégration.
- **Pour qui :** le développeur (qui écrit tout le code), accompagné par l'agent en posture de mentor technique (explications, challenges d'architecture, revue de code).

## Périmètre et jalons

### V1.0 : catalogue public en lecture seule

- **Champions** : stats de base, sorts, passif, tags.
- **Objets (Items)** : coûts, stats, descriptions, recettes.
- Import des données Data Dragon, recherche, filtres, tri, pagination.
- Aucune sécurité : tous les endpoints sont publics.

### V1.1 : domaine utilisateur

- **Utilisateurs** (comptes).
- **Builds** : un champion associé à 6 objets maximum, un rôle visé, une description et des notes stratégiques.
- Spring Security et JWT : authentification, builds privés.

> **Anticipation :** User et Build sont modélisés légèrement dès l'Étape 1 de la V1.0 (identifiants et liens vers Champion / Item), sans être codés. Objectif : ne pas avoir à retoucher le schéma en V1.1.

### V2 (hors périmètre pour l'instant)

- Historique des patchs et comparaison entre versions.

## Architecture et données

- **Ingestion hybride :** fichiers JSON locaux par défaut (`src/main/resources/data/`) pour coder hors ligne, plus un service `DataDragonSyncService` basé sur `RestClient` pour synchroniser depuis le CDN Riot à la demande.
- **Persistance :** PostgreSQL (via Docker Compose) en dev et prod, PostgreSQL via **Testcontainers** pour les tests d'intégration, et migrations versionnées avec **Liquibase** (changelogs au format **XML**).
- **Documentation d'API :** Springdoc OpenAPI avec Swagger UI.
- **Validation et erreurs :** Jakarta Bean Validation, gestion centralisée via `@RestControllerAdvice` et `ProblemDetail` (RFC 9457).

## Non-objectifs

- ~~**Pas de frontend :** projet 100 % backend, documenté via OpenAPI / Swagger UI.~~ Remplacé par la décision n°9 : un front Angular existe, mais il est généré par le mentor ; le travail de l'apprenant reste 100 % backend.
- **Pas d'API Riot live :** pas de profils d'invocateurs ni d'historique de matchs (clés d'API, quotas, rotation).
- **Pas de microservices :** un monolithe unique et bien découpé.

## Points ouverts (à trancher)

*Aucun point ouvert restant. Le cadrage de haut niveau est verrouillé.*

## Outils du GitHub Student Pack

> Offres à revérifier sur https://education.github.com/pack au moment d'intégrer chaque outil.

| Outil | Thème | Jalon d'introduction | Pourquoi à ce moment-là |
| :--- | :--- | :--- | :--- |
| Doppler | Secrets | V1.1 (Users, Builds, JWT) | Gérer la clé secrète JWT et les variables sensibles hors de Git dès que des secrets apparaissent |
| Heroku | Déploiement / cloud | Mise en ligne (après V1.1) | Hébergement simple avec PostgreSQL managé et variables d'environnement |

*(Hors Student Pack, ajoutés à la stratégie technique : **GitHub Actions** pour la CI/CD dès la V1.0 F0, et **WireMock** dans les tests d'intégration Java dès la V1.0 F7 pour simuler le CDN Data Dragon.)*

## Carte des connaissances

| Jalon | Concept | Type (fondateur / découvrable) | Prérequis | Niveau au départ |
| :--- | :--- | :--- | :--- | :--- |
| V1.0 (F0) | BOM Maven | Découvrable | Bases Maven | Découvert |
| V1.0 (F0) | Package by Feature | Fondateur | Visibilité Java | Compris |
| V1.0 (F0) | `ddl-auto=validate` et migrations Liquibase | Découvrable | SQL DDL | Découvert |
| V1.0 (F0) | Contrat design-first (Apidog / OpenAPI) | Découvrable | Bases HTTP / REST | Découvert |
| V1.0 (F0) | CI/CD (GitHub Actions) | Découvrable | Git, Maven, npm | À découvrir |
| V1.0 (F0) | `ProblemDetail` (RFC 9457) | Découvrable | Codes HTTP d'erreur | Découvert |
| V1.0 (F1, F4) | Clé primaire vs contrainte `UNIQUE` | Découvrable | SQL DDL | Compris |
| V1.0 (F1, F4) | Racine d'agrégat | Fondateur | POO, entités JPA | Découvert |
| V1.0 (F1, F4) | Value Object et `@Embeddable` | Découvrable | POO, JPA de base | Découvert |
| V1.0 (F1, F4) | `@ElementCollection` et 1NF | Découvrable | SQL 1NF | Compris |
| V1.0 (F1, F4) | Relation avec doublons (`List` vs `Set`) | Fondateur | Relations JPA (`@ManyToMany`) | Découvert |
| V1.0 (F1, F4) | Attributs dynamiques (`Map` en `@ElementCollection`) | Découvrable | `@ElementCollection` et 1NF | Découvert |
| V1.0 (F1, F4) | Service propriétaire du repository | Fondateur | Package by Feature | Compris |
| V1.0 (F1, F4) | Upsert par clé métier | Fondateur | Clé primaire vs `UNIQUE`, cycle de vie JPA | Compris |
| V1.0 (F1, F4) | Transactions (`@Transactional`) et cycle de vie JPA | Fondateur | JPA de base | À découvrir |
| V1.0 (F1, F4) | Testcontainers (3 briques) | Découvrable | Docker, JUnit 5 | Découvert |
| V1.0 (F2, F3, F5, F6) | Codes HTTP d'erreur | Découvrable | Bases HTTP | Compris |
| V1.0 (F2, F3, F5, F6) | DTO en `record` Java et mapping | Découvrable | Java 21 | À découvrir |
| V1.0 (F2, F3, F5, F6) | Pagination, tri et filtrage dynamique (JPQL / `Specification`) | Découvrable | Spring Data JPA | À découvrir |
| V1.0 (F2, F3, F5, F6) | Problème N+1 et chargement (`JOIN FETCH` / `@EntityGraph`) | Fondateur | Relations JPA `LAZY`, JPQL | À découvrir |
| V1.0 (F7) | `RestClient`, résilience (`502`/`503`) et WireMock | Découvrable | HTTP, tests d'intégration | À découvrir |
| V1.1 | Invariants d'agrégat (`Build`) | Fondateur | Racine d'agrégat, service propriétaire | À découvrir |
| V1.1 | Spring Security, chaîne de filtres et JWT | Fondateur | HTTP, stateless, hachage | À découvrir |
| V1.1 | Autorisation par ressource (propriétaire du `Build`) | Fondateur | Spring Security, JWT | À découvrir |

## Journal des décisions

| # | Décision | Alternatives écartées | Raison |
| :--- | :--- | :--- | :--- |
| 1 | Valeur ajoutée principale : catalogue interrogeable (import en base + recherche, filtres, tri, pagination) | Historique des patchs, fonctionnalités utilisateur seules | Meilleure base pour apprendre l'import de données, JPA et la pagination. Le reste vient ensuite sans casser le modèle. |
| 2 | Le Verrou de Cadrage initial devient la référence : Users et Builds font partie de la V1 | Garder Users et Builds en V2 | Le cadrage initial (session précédente) prévoyait déjà ce domaine utilisateur. |
| 3 | Livraison en deux jalons : V1.0 catalogue public, puis V1.1 utilisateurs + builds + JWT | Tout le périmètre d'un seul bloc | Premier résultat testé plus tôt, une notion difficile à la fois, deux revues de code. Retouches évitées grâce à la modélisation légère de User / Build dès le départ. |
| 4 | Spring Boot 4.1.x (version du `../backend/pom.xml` actuel) | Spring Boot 3.4.x (cadrage initial), 3.5.x | Démarrer sur une version en fin de support crée de la dette dès le premier jour : plus de correctifs de sécurité gratuits, dépendances qui abandonnent peu à peu la version, migration forcée plus coûteuse à mesure que le code grandit. |
| 5 | Tests d'intégration avec **Testcontainers (PostgreSQL)** | H2 en mémoire | Garantit l'isolement et la parité totale de dialecte SQL avec la base de production PostgreSQL (pas de faux positifs ni d'erreurs de syntaxe propres à H2). |
| 6 | Migrations de schéma avec **Liquibase (format XML)** | Flyway, `ddl-auto: update` | Choix aligné avec l'expérience en entreprise du développeur, suivi fin par `changeSet` XML et support natif dans Spring Boot. |
| 7 | Organisation des packages **par fonctionnalité / domaine (Package by Feature)** | Découpage par couche technique (`controller`, `service`, `repository`) | Permet d'exploiter la visibilité `package-private` de Java pour encapsuler les repositories et entités internes à chaque domaine (`champion`, `item`, `build`, `user`), en ne rendant publiques que les façades de service nécessaires. |
| 8 | Ingestion hybride : chargement auto au démarrage (si base vide, depuis JSON locaux) + endpoint `POST /api/v1/admin/sync` (`RestClient` vers CDN Riot) | Sync uniquement manuelle, ou tâche planifiée `@Scheduled` | Permet de démarrer et tester immédiatement hors-ligne tout en pratiquant `RestClient` sur un vrai appel HTTP déclenché à la demande. |
| 9 | Un **front Angular généré par le mentor**, écran par écran (remplace le non-objectif "Pas de frontend") | Pas de front ; React ; front écrit par l'apprenant | Voir chaque fonctionnalité vivre renforce l'apprentissage, et un front est un client exigeant qui révèle des problèmes backend (CORS, pagination, erreurs). Angular reprend les idées de Spring (injection de dépendances, services, décorateurs). L'apprenant ne le code pas : il le lit seulement quand il éclaire un concept backend. |
| 10 | **Contrat design-first dans Apidog**, exporté en OpenAPI dans `api/openapi.yaml` (fait foi) | Contrat seulement dans Apidog ; `openapi.yaml` écrit à la main ; contrat en markdown | Apidog permet de penser en ressources et schémas plutôt qu'en syntaxe YAML, et fournit le mock ; le fichier exporté est versionné et relu en PR, et sert à générer le client du front. |
| 11 | **L'écran tourne d'abord sur le mock Apidog**, puis bascule sur le backend local | Écran généré après le merge ; données simulées dans le front | Le front devient un test d'acceptation visuel : un écart de comportement entre mock et backend révèle un non-respect du contrat. |
| 12 | **Monorepo** `backend/`, `frontend/`, `api/` | Deux dépôts séparés ; front dans un sous-dossier du backend | Une seule PR par fonctionnalité (contrat, backend, écran), une CI pour les deux, une architecture API-First visible. |
| 13 | Outillage : **GitHub Actions** (CI dès F0), **WireMock** (tests HTTP F7), **Doppler** (secrets V1.1), **Heroku** (déploiement) | Travis CI, Requestly | GitHub Actions est natif et standard ; WireMock permet des tests JUnit automatisés en CI (contrairement à Requestly orienté debug manuel) ; Doppler et Heroku arrivent au moment où secrets et déploiement deviennent nécessaires. |

