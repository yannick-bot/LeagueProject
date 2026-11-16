---
name: parcours-erreur
description: Parcours d'apprentissage guidé. Transforme une erreur, une exception, un bug, un test rouge ou une CI en échec en leçon - débogage guidé où l'apprenant formule et teste ses hypothèses, recherche de la cause racine, correction par l'apprenant, entrée dans le journal d'erreurs et fiche concept si la cause révèle une notion nouvelle.
---

# Parcours : apprendre d'une erreur

L'erreur n'est pas un obstacle à contourner vite : c'est la meilleure occasion d'apprendre. Ne donne **jamais** la correction d'emblée. Skill d'appui : `systematic-debugging`.

## 1. S'arrêter

Pas de correction au hasard ("j'essaie ça pour voir"). On comprend d'abord.

## 2. Lire et décrire le symptôme

L'apprenant lit le message d'erreur **en entier** (en particulier la première ligne `Caused by:` de la stack trace) et le décrit avec ses mots : qu'est-ce qui s'est passé, qu'est-ce qui était attendu ?

## 3. Formuler des hypothèses

"Quelles causes possibles vois-tu ?" Il en propose au moins deux. Si l'une est fausse, ne le dis pas tout de suite : aide-le à trouver comment la tester.

## 4. Tester les hypothèses

Fais-lui choisir le moyen d'observer : lire les logs, activer les logs SQL, poser un point d'arrêt, écrire un test qui reproduit le problème, réduire le cas au minimum. C'est ici qu'il construit sa **démarche** de débogage, une compétence en soi.

Indices par paliers s'il bloque : (1) une question ("qu'est-ce que la stack trace te dit sur la couche concernée ?"), (2) une direction ("regarde quand la session Hibernate se ferme"), (3) la structure de l'explication. La réponse seulement en dernier recours.

## 5. Trouver la cause racine

Ne t'arrête pas à la cause immédiate. Pose des "pourquoi ?" successifs jusqu'à toucher un **concept** ("l'objet est détaché" → "pourquoi ?" → "la transaction s'est terminée avant l'accès à la collection" → concept : cycle de vie du contexte de persistance).

## 6. Corriger

L'apprenant corrige lui-même. Puis, prévention : quel test, quelle configuration ou quelle convention aurait empêché ce bug ? S'il y a un test à ajouter, il l'ajoute.

## 7. Documenter

- L'apprenant écrit l'entrée dans `learnt/journal-erreurs.md` (rule `journal-erreurs`, 6 champs). Relis : la cause racine est-elle la vraie ?
- Si la cause révèle un concept nouveau : crée la fiche avec lui (rule `fiches-concept`), après une boucle de concept du mentor (reformulation validée).
- Si le concept existe déjà, ajoute l'entrée dans la section "Rencontré dans" de sa fiche.

## 8. Reprendre

Une ligne de récapitulatif (ce qu'il a appris), puis retour exactement où on en était dans le parcours d'origine.
