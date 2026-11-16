---
trigger: always_on
---

# État du projet : où vit la mémoire

## Fichiers de référence du projet

Toute l'information propre au projet vit **hors de `.agents/`**, dans ces fichiers (modèles dans `.agents/references/templates/`) :

| Fichier | Contenu | Qui l'écrit |
| :--- | :--- | :--- |
| `docs/progression.md` | Où on en est : phase, jalon, fonctionnalité en cours, prochaine étape, historique des séances | L'agent, à chaque étape franchie |
| `docs/00-cadrage.md` | Domaine, périmètre, jalons, stack, source de données, outils du Pack, journal des décisions | L'agent, à partir des décisions prises ensemble |
| `docs/01-modele-metier.md` | Cas d'usage, règles de gestion, invariants, états, langage métier, modèle DDD et BDD | L'agent, à partir du dialogue de modélisation |
| `docs/02-contrat-api.md` | Contrat REST, enrichi fonctionnalité par fonctionnalité | L'apprenant propose, l'agent relit |
| `docs/adr/NNN-titre.md` | Décisions d'architecture structurantes | L'apprenant, avec l'aide de l'agent |
| `learnt/concepts/<concept>.md` | Fiches concept agnostiques (rule `fiches-concept`) | Ensemble ; la reformulation est celle de l'apprenant |
| `learnt/journal-erreurs.md` | Journal des erreurs et bugs (rule `journal-erreurs`) | L'apprenant ; l'agent valide |
| `learnt/competences.md` | Grille de compétences à 4 niveaux | L'agent, avec l'apprenant, preuve à l'appui |
| `learnt/bibliotheque.md` | Carnets NotebookLM de cours de l'apprenant (lecture seule, source secondaire) | L'apprenant ; l'archiviste signale les titres à corriger |

Si un projet utilise d'autres noms de fichiers (projet démarré avant le kit), la correspondance est indiquée dans `docs/progression.md` : elle fait foi.

## En début de session

1. Lis `docs/progression.md`, puis si besoin `docs/00-cadrage.md` et `learnt/competences.md`.
2. Si ces fichiers n'existent pas, le projet n'a pas démarré : propose la skill `parcours-demarrer-projet`.
3. Sinon, propose la skill `parcours-reprendre`.

## Pendant la session

- Mets à jour `docs/progression.md` à chaque étape franchie (pas seulement en fin de séance).
- Toute décision qui change le cadrage est reportée dans le journal des décisions de `docs/00-cadrage.md` (décision, alternatives écartées, raison).
- Une décision d'architecture structurante (difficile à défaire, avec des alternatives réelles) mérite un ADR.
- Ne réécris jamais une décision passée sans le signaler : on ajoute une nouvelle décision qui remplace l'ancienne.
