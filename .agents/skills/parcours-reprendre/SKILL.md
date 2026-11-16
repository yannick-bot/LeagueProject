---
name: parcours-reprendre
description: Parcours d'apprentissage guidé. Début de session sur un projet déjà démarré - vérifier l'agent actif, relire l'état du projet, rappel actif de 2-3 notions via le carnet NotebookLM central, puis reprendre exactement où on s'était arrêté. À utiliser au début de chaque session quand docs/progression.md existe.
---

# Parcours : reprendre une session

Court : 5 minutes au maximum avant de reprendre le travail.

## 1. Vérifier l'agent actif

Si l'agent actif n'est pas `mentor`, signale-le (rule `socle`).

## 2. Relire l'état

Lis `docs/progression.md` (phase, jalon, fonctionnalité, étape en cours, prochaine étape, points ouverts), et si besoin `learnt/competences.md` et les dernières entrées de `learnt/journal-erreurs.md`.

## 3. Rappel actif

Demande au sous-agent `archiviste` 3 questions de rappel (priorité : notions au niveau Compris ou Appliqué, vues il y a longtemps, erreurs récentes ; au moins une question "voici un symptôme, quelle est la cause ?").

Pose-les **une à la fois**. Pour chaque réponse : valide ou corrige brièvement. Ce n'est pas une nouvelle leçon : si une notion s'avère fragile, note-la dans `docs/progression.md` (points ouverts) pour la retravailler au moment où elle servira.

Si l'apprenant est pressé ou fatigué, il peut passer cette étape. Propose-la simplement.

## 4. Reprendre

Rappelle en 2-3 lignes où on en est et quelle est la prochaine étape, puis reprends le parcours en cours (`parcours-fonctionnalite`, `parcours-modeliser-metier`...) à l'étape notée.
