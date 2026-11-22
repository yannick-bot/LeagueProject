---
trigger: always_on
---

# État du projet : où vit la mémoire

L'information vit **hors de `.agents/`**, à deux endroits (modèles dans `.agents/references/templates/`) :
- `docs/` : ce qui est **propre au projet** (où on en est, ce qu'on a décidé) ;
- `.memoire/` : la **mémoire d'apprentissage partagée**, commune à tous les projets de l'apprenant (ce qu'il a appris, ses erreurs, sa grille). C'est un dépôt Git à part, cloné à la racine du projet et ignoré par celui-ci ; son `README.md` décrit son installation et son contenu.

## Fichiers du projet (`docs/`)

| Fichier | Contenu | Qui l'écrit |
| :--- | :--- | :--- |
| `docs/progression.md` | Où on en est : phase, jalon, fonctionnalité en cours, prochaine étape, historique des séances | L'agent, à chaque étape franchie |
| `docs/00-cadrage.md` | Domaine, périmètre, jalons, stack, source de données, outils du Pack, journal des décisions | L'agent, à partir des décisions prises ensemble |
| `docs/01-modele-metier.md` | Cas d'usage, règles de gestion, invariants, états, langage métier, modèle DDD et BDD | L'agent, à partir du dialogue de modélisation |
| `docs/02-contrat-api.md` | Contrat REST, enrichi fonctionnalité par fonctionnalité | L'apprenant propose, l'agent relit |
| `docs/adr/NNN-titre.md` | Décisions d'architecture structurantes | L'apprenant, avec l'aide de l'agent |

## Mémoire partagée (`.memoire/`)

| Fichier | Contenu | Qui l'écrit |
| :--- | :--- | :--- |
| `.memoire/competences.md` | **Une seule grille** à 4 niveaux pour tous les projets ; les preuves disent dans quel projet | L'agent, avec l'apprenant, preuve à l'appui |
| `.memoire/journal-erreurs.md` | Les erreurs qui cachent un concept ou ont demandé une réflexion (rule `journal-erreurs`) | L'apprenant ; l'agent relit |
| `.memoire/memo-erreurs.md` | Les erreurs rapides de syntaxe et de configuration, par outil (rule `journal-erreurs`) | L'apprenant ; l'agent relit |
| `.memoire/concepts/<concept>.md` | Fiches concept agnostiques (rule `fiches-concept`) | Ensemble ; la reformulation est celle de l'apprenant |
| `.memoire/bibliotheque.md` | Carnets NotebookLM de cours de l'apprenant (lecture seule, source secondaire) | L'apprenant ; l'archiviste signale les titres à corriger |

- **Les fichiers font foi** ; le carnet NotebookLM central n'en est que le miroir (sous-agent `archiviste`).
- **Chercher dans `.memoire/`** : toujours en visant ce dossier explicitement, car une recherche sur tout le projet peut l'ignorer sans le signaler (rule `journal-erreurs`).
- **Jamais de secret ni de copie de code** du projet dans `.memoire/`.

Si un projet utilise d'autres noms ou emplacements (projet démarré avant la mémoire partagée, avec un dossier `learnt/` par exemple), la correspondance est indiquée dans `docs/progression.md` : elle fait foi jusqu'à la migration.

## En début de session

1. Lis `docs/progression.md`, puis si besoin `docs/00-cadrage.md` et `.memoire/competences.md`.
2. Si `docs/progression.md` n'existe pas, le projet n'a pas démarré : propose la skill `parcours-demarrer-projet`.
3. Si `.memoire/` est absent, signale-le et propose de l'installer (voir son `README.md`) avant de continuer : sans lui, ni grille, ni journal, ni détection des récidives.
4. Sinon, propose la skill `parcours-reprendre`.

## Pendant la session

- Mets à jour `docs/progression.md` à chaque étape franchie (pas seulement en fin de séance).
- Toute décision qui change le cadrage est reportée dans le journal des décisions de `docs/00-cadrage.md` (décision, alternatives écartées, raison).
- Une décision d'architecture structurante (difficile à défaire, avec des alternatives réelles) mérite un ADR.
- Ne réécris jamais une décision passée sans le signaler : on ajoute une nouvelle décision qui remplace l'ancienne.

## En fin de séance

Si `.memoire/` a changé, rappelle à l'apprenant de commiter et de pousser **ce dépôt-là** (il tape lui-même les commandes ; un commit dans le projet n'enregistre pas la mémoire).
