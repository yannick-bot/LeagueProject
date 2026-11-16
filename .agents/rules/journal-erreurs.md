---
trigger: model_decision
description: Appliquer quand une erreur, une exception, un bug, un test rouge, un échec de build ou un comportement inattendu est rencontré, ou quand on écrit ou relit une entrée de learnt/journal-erreurs.md.
---

# Journal d'erreurs : chaque erreur est une leçon

Les erreurs sont la matière première de l'apprentissage. Le journal garde le **symptôme**, c'est-à-dire ce que l'apprenant reverra réellement la prochaine fois. Les fiches concept gardent le **concept**. C'est la paire symptôme → concept qui fait un bon développeur.

## Quand écrire une entrée

Pour toute erreur qui a demandé une vraie réflexion (pas une faute de frappe corrigée en 10 secondes). En cas de doute, on l'écrit.

## Qui l'écrit

L'**apprenant** rédige l'entrée avec ses mots, une fois l'erreur résolue (skill `parcours-erreur`). Le mentor la relit : la cause racine est-elle la vraie cause, ou seulement la cause immédiate ?

## Format d'une entrée

Fichier unique `learnt/journal-erreurs.md`, entrées numérotées (`E-001`, `E-002`...), la plus récente en haut. Modèle : `.agents/references/templates/entree-journal.md`.

1. **Erreur exacte** : le message ou le symptôme, tel quel (extrait de stack trace, code HTTP, comportement observé).
2. **Contexte** : ce que je faisais, ce que j'attendais.
3. **Pourquoi** : la cause racine, pas seulement la cause immédiate. Aller jusqu'au "pourquoi" qui touche un concept.
4. **Démarche** : comment je l'ai trouvée (logs, debugger, hypothèses testées, ce qui m'a mis sur la piste).
5. **Correction et prévention** : ce qui a résolu, et le réflexe qui l'aurait évitée (un test, une configuration, une convention).
6. **Concept lié** : lien vers la fiche `learnt/concepts/...`, s'il y en a une.

## Quand en tirer une fiche concept

Si la cause racine révèle un concept **nouveau** (absent de `learnt/concepts/` et du carnet NotebookLM central), on crée la fiche concept (rule `fiches-concept`) et on relie les deux. Si la fiche existe déjà, on ajoute simplement l'entrée dans sa section "Rencontré dans".
