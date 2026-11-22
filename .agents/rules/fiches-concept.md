---
trigger: glob
globs: .memoire/concepts/*.md
---

# Fiches concept : agnostiques du projet

> **Copie commune aux deux kits** (apprentissage backend et contribution open source). Toute modification de ce fichier doit être reportée à l'identique dans l'autre kit.

Une fiche concept explique **une** notion de façon indépendante de tout projet, pour qu'elle reste utile sur le projet suivant. Les fiches vivent dans la mémoire partagée, `.memoire/concepts/`, commune à tous les projets de l'apprenant. Elles sont recopiées dans un carnet NotebookLM choisi selon leur domaine (sous-agent `archiviste`).

## Règles

- **Un concept par fiche.** Nom de fichier en kebab-case, sans numéro : `.memoire/concepts/n-plus-un-requetes.md`.
- **Un domaine par fiche**, indiqué en tête :
  - `technique` (Java, Spring, persistance, tests, architecture, configuration...) : carnet "Concepts Backend Java" ;
  - `contribution` (Git et flux de contribution, processus, communauté, communication) : carnet "Contribution Open Source".
- **Chercher avant de créer** : la fiche existe peut-être déjà, écrite sur un autre projet ou par l'autre kit. Cherche dans `.memoire/concepts/` en visant ce dossier explicitement (rule `journal-erreurs`, "Chercher dans la mémoire"). Si elle existe, on l'enrichit et on complète "Rencontré dans" plutôt que de dupliquer.
- **Corps agnostique** : aucun nom de projet, de module, de classe, d'entité, de mainteneur ou d'URL du projet. Les exemples utilisent un domaine neutre et universel (`Order`, `Customer`, `Product`, un dépôt `exemple/app`...).
- **Le seul endroit spécifique au projet** est la dernière section, "Rencontré dans", qui contient des liens.
- **La reformulation est celle de l'apprenant**, validée par le mentor. L'agent ne l'écrit jamais à sa place.
- Concise : une fiche se relit en 3 minutes.

## Structure (modèle : `.agents/references/templates/fiche-concept.md`)

0. **Domaine** : `technique` ou `contribution`
1. **Le concept en une phrase**
2. **Le problème qu'il résout** : sans lui, que se passe-t-il ?
3. **Explication simple et analogie**
4. **Exemple minimal générique** (code, commandes ou échange type)
5. **Pièges et idées fausses**
6. **Quand l'utiliser, quand ne pas l'utiliser** : les compromis
7. **Ma reformulation validée**
8. **Rencontré dans** : projet, fonctionnalité ou ticket, PR, entrées du journal d'erreurs (`E-0xx`)
