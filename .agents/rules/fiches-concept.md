---
trigger: glob
globs: learnt/concepts/*.md
---

# Fiches concept : agnostiques du projet

Une fiche concept explique **une** notion de façon indépendante de tout projet, pour qu'elle reste utile dans n'importe quel contexte futur. Elle est envoyée dans le carnet NotebookLM central, partagé par tous les projets.

## Règles

- **Un concept par fiche.** Nom de fichier en kebab-case, sans numéro : `learnt/concepts/n-plus-un-requetes.md`.
- **Corps agnostique** : aucun nom de classe, d'entité ou d'URL du projet. Les exemples utilisent un domaine neutre et universel (`Order`, `Customer`, `Product`...).
- **Le seul endroit spécifique au projet** est la dernière section, "Rencontré dans", qui contient des liens.
- **La reformulation est celle de l'apprenant**, validée par le mentor. L'agent ne l'écrit jamais à sa place.
- Concise : une fiche se relit en 3 minutes.

## Structure (modèle : `.agents/references/templates/fiche-concept.md`)

1. **Le concept en une phrase**
2. **Le problème qu'il résout** : sans lui, que se passe-t-il ?
3. **Explication simple et analogie**
4. **Exemple minimal générique**
5. **Pièges et idées fausses**
6. **Quand l'utiliser, quand ne pas l'utiliser** : les compromis
7. **Ma reformulation validée**
8. **Rencontré dans** : projet, fonctionnalité, entrées du journal d'erreurs (`E-0xx`)
