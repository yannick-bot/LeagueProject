---
name: parcours-erreur
description: Parcours d'apprentissage guidé. Transforme une erreur, une exception, un bug, un test rouge ou une CI en échec en leçon - débogage guidé où l'apprenant formule et teste ses hypothèses, recherche de la cause racine, correction par l'apprenant, puis tri (journal, mémo ou rien) dans la mémoire partagée et fiche concept si la cause révèle une notion nouvelle. Détecte d'abord les récidives.
---

# Parcours : apprendre d'une erreur

L'erreur n'est pas un obstacle à contourner vite : c'est la meilleure occasion d'apprendre. Ne donne **jamais** la correction d'emblée. Skill d'appui : `systematic-debugging`.

## 1. S'arrêter, et chercher dans la mémoire

Pas de correction au hasard ("j'essaie ça pour voir"). On comprend d'abord.

Avant d'aider, cherche l'erreur dans `.memoire/journal-erreurs.md` et `.memoire/memo-erreurs.md`, en visant ce dossier explicitement (par outil, par message, par mot-clé). Si elle y est déjà, c'est une **récidive** : suis le protocole de la rule `journal-erreurs` (faire retrouver par paliers, avec les mots de l'apprenant, puis comprendre pourquoi ça n'a pas tenu) au lieu de dérouler les étapes 2 à 5. S'il la reconnaît seul, c'est une preuve de transfert.

## 2. Lire et décrire le symptôme

L'apprenant lit le message d'erreur **en entier** (en particulier la première ligne `Caused by:` de la stack trace) et le décrit avec ses mots : qu'est-ce qui s'est passé, qu'est-ce qui était attendu ?

## 3. Formuler des hypothèses

"Quelles causes possibles vois-tu ?" Il en propose au moins deux. Si l'une est fausse, ne le dis pas tout de suite : aide-le à trouver comment la tester.

## 4. Tester les hypothèses

Fais-lui choisir le moyen d'observer, et demande-lui pourquoi : lire les logs, activer les logs SQL, poser un point d'arrêt, écrire un test qui reproduit le problème, réduire le cas au minimum. Le tableau "Quand le proposer" de `.agents/references/outils/debogueur-intellij.md` dit quand le **débogueur** est le bon outil (mauvaise valeur sans exception, exception obscure, champ `null` après un mapping, test rouge incompris, cas qui ne touche qu'une donnée sur mille) et quand d'autres moyens passent avant (logs SQL, logs de démarrage, logs de l'outil) ; s'il choisit le débogueur pour la première fois, introduis seulement le palier de la fiche qui correspond au symptôme. C'est ici qu'il construit sa **démarche** de débogage, une compétence en soi.

Pour une erreur de configuration ou de syntaxe (fichier Compose, propriétés Spring, changelog), le bon réflexe est souvent la documentation de référence de l'outil, dans la bonne version : donne la piste de recherche dosée selon la grille (`.agents/references/sources-documentation.md`), et demande "où as-tu cherché ?" s'il bloque.

Indices par paliers s'il bloque : (1) une question ("qu'est-ce que la stack trace te dit sur la couche concernée ?"), (2) une direction ("regarde quand la session Hibernate se ferme"), (3) la structure de l'explication. La réponse seulement en dernier recours.

## 5. Trouver la cause racine

Ne t'arrête pas à la cause immédiate. Pose des "pourquoi ?" successifs jusqu'à toucher un **concept** ("l'objet est détaché" → "pourquoi ?" → "la transaction s'est terminée avant l'accès à la collection" → concept : cycle de vie du contexte de persistance).

## 6. Corriger

L'apprenant corrige lui-même. Puis, prévention : quel test, quelle configuration ou quelle convention aurait empêché ce bug ? S'il y a un test à ajouter, il l'ajoute.

## 7. Trier et documenter

Une fois l'erreur corrigée, fais le **tri** de la rule `journal-erreurs` :
- "Y a-t-il un concept dessous ?" Tu proposes une destination (journal, mémo ou rien), l'apprenant valide ou conteste.
- **Journal** : il écrit l'entrée dans `.memoire/journal-erreurs.md` (modèle en tête du fichier). Relis : la cause racine est-elle la vraie, ou seulement la cause immédiate ?
- **Mémo** : il écrit la ligne dans `.memoire/memo-erreurs.md`, dans la section de l'outil.
- Dans les deux cas, **"Où j'ai trouvé"** est obligatoire : il retrouve la page de documentation qui donne la réponse.
- **Récidive** : mets à jour le champ "Récidives", promeus une ligne du mémo au journal, et marque la notion fragile (ou redescends-la) dans `.memoire/competences.md`.
- Si la cause révèle un concept nouveau : crée la fiche avec lui dans `.memoire/concepts/` (rule `fiches-concept`), après une boucle de concept du mentor (reformulation validée). Si la fiche existe déjà, ajoute l'entrée dans sa section "Rencontré dans".

## 8. Reprendre

Une ligne de récapitulatif (ce qu'il a appris), puis retour exactement où on en était dans le parcours d'origine.
