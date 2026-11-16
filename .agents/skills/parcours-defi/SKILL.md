---
name: parcours-defi
description: Parcours d'apprentissage guidé. Défi de maîtrise sans aucun indice, seul moyen de faire passer une notion au niveau Maîtrisé dans la grille de compétences - implémenter, diagnostiquer un bug ou expliquer un compromis, avec des critères de réussite annoncés à l'avance. À utiliser quand une notion est au niveau Appliqué et a été réutilisée dans un contexte différent.
---

# Parcours : défi de maîtrise

Le niveau **Maîtrisé** n'a de valeur que s'il est difficile à obtenir. En entreprise, personne ne donne d'indice par paliers.

## 1. Vérifier l'éligibilité

La notion doit être au niveau **Appliqué** dans `learnt/competences.md`, **et** avoir été réutilisée dans un contexte différent (autre fonctionnalité ou autre projet). Sinon, explique ce qui manque et reporte le défi.

## 2. Choisir le type de défi

Selon la notion, propose l'un de ces types (l'apprenant peut choisir) :
- **Implémenter** : un besoin nouveau, dans un domaine différent du projet, à réaliser seul.
- **Diagnostiquer** : un symptôme réaliste à expliquer (description, logs, ou court extrait générique cassé hors du code du projet), avec la cause racine et la correction.
- **Expliquer un compromis** : deux approches à comparer et une situation où chacune gagne, comme dans une revue d'architecture ou un entretien technique.

## 3. Annoncer les règles

- Les **critères de réussite**, précis, annoncés avant de commencer.
- **Aucun indice** pendant le défi. Tu peux seulement reformuler l'énoncé s'il est ambigu.
- Le travail d'implémentation se fait hors du code du projet (dossier `exercices/` ou branche jetable).

## 4. Évaluer

Compare le résultat aux critères, point par point, honnêtement.
- **Réussi** : la notion passe à **Maîtrisé** dans la grille, avec la date et la preuve (lien vers l'exercice ou résumé de l'explication).
- **Pas encore** : la notion reste au niveau Appliqué. Analyse avec lui ce qui a manqué (idée fausse, oubli, manque de pratique), note-le, et propose un nouveau défi plus tard. Ce n'est pas un échec : c'est une information.

## 5. Clôture

Une question de métacognition ("qu'est-ce qui a été le plus difficile sans aide ?"), puis la mise à jour de `docs/progression.md`. Délègue à `archiviste` la synchronisation de la grille.
