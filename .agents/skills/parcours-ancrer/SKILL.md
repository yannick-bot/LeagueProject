---
name: parcours-ancrer
description: Parcours d'apprentissage guidé. Bilan de fin de jalon - métacognition sur le jalon, vérification des fiches concept et du journal, génération par l'archiviste de quiz, flashcards et supports NotebookLM, passage du quiz, mise à jour de la grille de compétences et propositions de défis de maîtrise. À utiliser quand toutes les fonctionnalités d'un jalon sont mergées.
---

# Parcours : ancrer un jalon

L'ancrage lourd n'a lieu qu'en fin de jalon, quand il y a assez de matière pour qu'un quiz ait du sens.

## 1. Bilan du jalon (métacognition)

Avec l'apprenant, une question à la fois :
- Qu'as-tu appris dans ce jalon (technique et métier) ?
- Qu'est-ce qui reste flou ?
- Quelle erreur t'a le plus appris, et pourquoi ?
- Qu'est-ce que tu ferais différemment si tu recommençais ?

## 2. Vérifier la matière

- Chaque concept nouveau du jalon a sa fiche dans `.memoire/concepts/`, avec une reformulation validée.
- Les erreurs du jalon ont été triées : celles qui cachent un concept sont dans `.memoire/journal-erreurs.md`, les erreurs rapides dans `.memoire/memo-erreurs.md`, toutes avec "Où j'ai trouvé".
- `.memoire/competences.md` est à jour (preuves de ce projet, récidives, notions fragiles).
- Le dépôt `.memoire/` est commité et poussé (par l'apprenant).

Complète ce qui manque avec l'apprenant avant de générer quoi que ce soit.

## 3. Générer les supports

Demande à l'apprenant ce qu'il veut en plus du quiz et des flashcards : audio de synthèse ? carte mentale ? Puis délègue à `archiviste` : synchronisation complète, puis génération (les quiz incluent des questions symptôme, puis cause, tirées du journal ; les flashcards reprennent aussi le mémo, en priorité les erreurs qui ont récidivé). Si un outil demande une confirmation, c'est l'apprenant qui décide.

## 4. Passer le quiz

L'apprenant fait le quiz. Analyse les réponses fausses avec lui : idée fausse, oubli ou confusion entre deux notions ? Pour chaque notion ratée, une courte boucle de reformulation.

## 5. Mettre à jour la grille

- Notions bien réussies au quiz **et** réutilisées sans aide dans un autre contexte : candidates au niveau Maîtrisé, via `parcours-defi`.
- Notions ratées : elles restent à leur niveau, et vont dans la section "Notions fragiles" de `.memoire/competences.md` pour le rappel actif.

## 6. Clôture

- Mets à jour `docs/progression.md` (jalon terminé, prochain jalon) et le journal des décisions si le cadrage évolue.
- Récapitulatif de 2-3 lignes, puis propose : un défi de maîtrise, le jalon suivant (`parcours-modeliser-metier` si son domaine est nouveau, sinon `parcours-fonctionnalite`), ou la clôture du projet.
