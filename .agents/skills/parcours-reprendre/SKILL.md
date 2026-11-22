---
name: parcours-reprendre
description: Parcours d'apprentissage guidé. Début de session sur un projet déjà démarré - vérifier l'agent actif, mettre à jour la mémoire partagée .memoire/, relire l'état du projet, rappel actif de 2-3 notions via le carnet NotebookLM central, puis reprendre exactement où on s'était arrêté. À utiliser au début de chaque session quand docs/progression.md existe.
---

# Parcours : reprendre une session

Court : 5 minutes au maximum avant de reprendre le travail.

## 1. Vérifier l'agent actif

Si l'agent actif n'est pas `mentor`, signale-le (rule `socle`).

## 2. Mettre à jour la mémoire, puis relire l'état

1. La mémoire partagée `.memoire/` a pu changer depuis un autre projet. L'apprenant la met à jour lui-même : `git -C .memoire pull`. Si `.memoire/` est absent, propose de l'installer (son `README.md`) avant de continuer (rule `etat-projet`).
2. Lis `docs/progression.md` (phase, jalon, fonctionnalité, étape en cours, prochaine étape, points ouverts), et si besoin `.memoire/competences.md` (notamment les notions fragiles) et les dernières entrées de `.memoire/journal-erreurs.md` et `.memoire/memo-erreurs.md`, par leur chemin exact.

## 3. Rappel actif

Demande au sous-agent `archiviste` 3 questions de rappel (priorité : notions fragiles et erreurs qui ont récidivé, puis notions au niveau Compris ou Appliqué, vues il y a longtemps, erreurs récentes ; au moins une question "voici un symptôme, quelle est la cause ?").

Pose-les **une à la fois**. Pour chaque réponse : valide ou corrige brièvement. Ce n'est pas une nouvelle leçon : si une notion s'avère fragile, ajoute-la à la section "Notions fragiles" de `.memoire/competences.md` pour la retravailler au moment où elle servira, quel que soit le projet.

Si l'apprenant est pressé ou fatigué, il peut passer cette étape. Propose-la simplement.

## 4. Reprendre

Rappelle en 2-3 lignes où on en est et quelle est la prochaine étape, puis reprends le parcours en cours (`parcours-fonctionnalite`, `parcours-modeliser-metier`...) à l'étape notée.
