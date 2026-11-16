# Kit d'apprentissage guidé : backend Java / Spring Boot

Kit **générique et portable** : copie le dossier `.agents/` dans n'importe quel projet, active l'agent `mentor`, et lance `parcours-demarrer-projet`. Le kit ne contient aucune information propre à un projet : tout l'état du projet vit dans `docs/` et `learnt/`.

Conçu nativement pour **Antigravity** (dossier `.agents/`), et utilisable depuis d'autres outils grâce à de petits adaptateurs (voir "Utilisation selon l'outil").

## Philosophie

- **Apprendre en construisant** des projets réels, dans des domaines métier où Java est très présent (banque, assurance, santé, logistique, e-commerce, réservation, facturation...), pour une expérience démontrable.
- **Concepts et raisonnement avant la syntaxe.** Les erreurs rencontrées sont la matière première.
- **L'apprenant écrit tout le code backend et conçoit le contrat.** La répétition construit la maîtrise ; chaque répétition apporte une petite variation.
- **Le mentor génère le front** (Angular), écran par écran, pour voir chaque fonctionnalité vivre et révéler les écarts au contrat.
- **API-First** : le contrat est conçu dans Apidog, exporté en OpenAPI, et l'écran tourne d'abord sur le mock avant de basculer sur le vrai backend.
- **Le métier compte autant que la technique** : cas d'usage, règles de gestion, invariants, états, workflows, écrans pensés comme des tâches d'un acteur.
- **Pratiques professionnelles dès le premier jour** : issue, branche, commits conventionnels, PR, CI, revue.
- **Une mémoire entre projets** : le carnet NotebookLM central "Concepts Backend Java", et la bibliothèque de cours de l'apprenant (carnets NotebookLM en lecture seule, source secondaire).

## Qui écrit quoi (monorepo de chaque projet)

| Zone | Qui écrit |
| :--- | :--- |
| `backend/` : code, tests, migrations, configuration | L'apprenant, toujours |
| `api/openapi.yaml` : le contrat | L'apprenant, conçu dans Apidog puis exporté |
| `frontend/` : l'interface Angular | Le mentor uniquement |
| `docs/` : cadrage, modèle métier, progression | Le mentor, à partir des décisions prises ensemble ; l'apprenant valide |
| `learnt/` : fiches, journal, grille | Ensemble ; les reformulations et le journal sont écrits par l'apprenant |

## Carte du kit

```text
.agents/
├── README.md                      Ce fichier
├── agents/
│   ├── mentor.md                  Agent principal : méthode pédagogique, rôles joués, front généré, guidage d'outil
│   └── archiviste.md              Sous-agent d'arrière-plan : NotebookLM (synchronisation, rappel, quiz)
├── rules/
│   ├── socle.md                   always_on        Garde-fou agent actif, langue, typographie, frontière du code
│   ├── etat-projet.md             always_on        Où vit la mémoire du projet (docs/, learnt/)
│   ├── pratiques-pro.md           always_on        Monorepo, flux Git / GitHub professionnel
│   ├── journal-erreurs.md         model_decision   Format du journal d'erreurs
│   └── fiches-concept.md          glob             Format des fiches concept agnostiques
├── skills/
│   ├── parcours-demarrer-projet/  Cadrage : domaine, métier, périmètre, données, outils, stack, mise en place
│   ├── parcours-modeliser-metier/ Cas d'usage, règles, invariants, états, puis DDD et BDD
│   ├── parcours-fonctionnalite/   La boucle verticale : story et écran, contrat, écran sur mock, TDD, bascule, PR
│   ├── parcours-erreur/           Apprendre d'une erreur (débogage guidé)
│   ├── parcours-reprendre/        Début de session : état + rappel actif
│   ├── parcours-ancrer/           Fin de jalon : bilan, quiz, flashcards, grille
│   ├── parcours-defi/             Défi sans indice pour atteindre "Maîtrisé"
│   └── (27 skills techniques)     Expertise API, Spring, sécurité, tests, documentation
└── references/
    ├── domaines-metier.md         Parcours de domaines métier
    ├── student-pack.md            Outils du GitHub Student Pack retenus
    ├── sources-donnees.md         Data Dragon, apilayer, Blockchair...
    ├── front-angular.md           Conventions du front généré
    ├── outils/
    │   └── apidog.md              Guide d'introduction progressive à Apidog
    └── templates/                 cadrage, progression, competences, bibliotheque, fiche-concept,
                                   entree-journal, user-story, pull-request, adr
```

> Les workflows Antigravity (`.agents/workflows/`) étant dépréciés au profit des skills, les parcours sont écrits sous forme de skills.

## Le cycle

```text
parcours-demarrer-projet ──> parcours-modeliser-metier ──> parcours-fonctionnalite (en boucle) ──> parcours-ancrer (fin de jalon)
        (une fois)                (par jalon)                     │         ▲                              │
                                                                  ▼         │                              ▼
                                                            parcours-erreur ┘                       parcours-defi
parcours-reprendre : au début de chaque session
```

La boucle d'une fonctionnalité :

```text
user story + écran ─> concepts ─> contrat (Apidog) ─> export api/openapi.yaml ─> écran généré, sur le mock
   ─> TDD backend ─> bascule de l'écran sur le backend local ─> PR unique + CI ─> revue ─> merge ─> grille + NotebookLM
```

## Ce que chaque projet génère (hors du kit)

```text
backend/  frontend/  api/openapi.yaml
docs/     progression.md, 00-cadrage.md, 01-modele-metier.md, 02-contrat-api.md, adr/
learnt/   concepts/*.md, journal-erreurs.md, competences.md, bibliotheque.md
```

## Utilisation selon l'outil

| Outil | Comment le kit est chargé |
| :--- | :--- |
| **Antigravity** (natif) | `.agents/` est lu directement. Sélectionne l'agent `mentor` dans le panneau `/agents`. |
| **Claude Code** | `CLAUDE.md` à la racine importe `mentor.md` et les rules (`@.agents/...`). Les entrées de `.claude/skills/` renvoient vers `.agents/skills/`. |
| **OpenCode** | `opencode.jsonc` charge les rules ; `.opencode/agents/` contient une **copie** du mentor et de l'archiviste. |
| **Junie** | `.junie/playbook.md` renvoie vers les fichiers du kit. |

**Attention aux copies** : quand `agents/mentor.md` ou `agents/archiviste.md` changent, il faut mettre à jour leurs copies dans `.opencode/agents/` (les autres adaptateurs renvoient vers le kit et suivent automatiquement).

## Démarrage

1. Copie `.agents/` (et l'adaptateur de ton outil) à la racine du nouveau projet.
2. Active l'agent **`mentor`**.
3. Demande de démarrer le projet : le mentor lance `parcours-demarrer-projet`.
4. Ensuite, à chaque session : le mentor lance `parcours-reprendre`.

## Skills techniques disponibles

| Domaine | Skills |
| :--- | :--- |
| Cadrage, DDD, architecture | `brainstorming`, `domain-driven-design`, `backend-architect`, `c4-component`, `database-design` |
| Design d'API | `api-design-principles`, `api-designer`, `openapi-spec-generator`, `openapi-spec-generation`, `api-endpoint-builder`, `api-analyzer`, `api-patterns`, `api-and-interface-design`, `api-development` |
| Java et Spring Boot | `java-pro` |
| Sécurité et résilience | `api-security-best-practices`, `auth-implementation-patterns`, `api-rate-limit-handler`, `security-audit` |
| Qualité, tests, documentation | `code-reviewer`, `tdd`, `tdd-workflow`, `test-automator`, `systematic-debugging`, `api-documenter`, `api-documentation`, `api-documentation-generator` |

Source des skills techniques : pack AAS API Platform Builder (`sickn33/agentic-awesome-skills`). Certaines mentionnent Spring Boot 3 : la version de référence est celle fixée au cadrage du projet.

## Vérifications au premier lancement (Antigravity)

Certains points de la documentation Antigravity ne sont pas précisés. À vérifier lors de la première session :

1. **Outils des agents** : `mentor.md` et `archiviste.md` ne déclarent pas de liste `tools` (les noms d'outils documentés sont incomplets, et un nom erroné peut bloquer l'agent). Vérifie que le mentor peut lire et écrire des fichiers et lancer des commandes, et que l'archiviste accède aux outils NotebookLM. Sinon, ajoute `tools` et `mcpServers` dans leur en-tête avec les noms exacts affichés par Antigravity.
2. **Rules et agent personnalisé** : vérifie que les rules `always_on` s'appliquent bien quand `mentor` est l'agent actif (par exemple : il n'utilise jamais de tiret cadratin et ne génère pas de code backend).
3. **NotebookLM** : en cas d'erreur d'authentification, lance `notebooklm-mcp-auth`.
