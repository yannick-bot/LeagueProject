# Journal d'erreurs : LeaguePlatform API

> Entrées numérotées (`E-001`, `E-002`...), la plus récente en haut. Une entrée par erreur qui a demandé une vraie réflexion. Format : `.agents/rules/journal-erreurs.md`, modèle : `.agents/references/templates/entree-journal.md`.

---

## E-001 - Classe Java non reconnue par l'IDE après passage en monorepo (2026-11-17)

1. **Erreur exacte** :
   ```text
   Comportement observé : le fichier Java DemoApplication.java n'était plus reconnu par l'IDE (traité comme un simple fichier hors sources Java).
   ```
2. **Contexte** : c'était après le passage de la structure du projet au schéma monorepo (`backend/`, `frontend/`, `api/`).
3. **Pourquoi (cause racine)** : le fichier `pom.xml` a été déplacé dans `backend/` et n'était plus à la racine du projet, alors que l'IDE était resté ouvert à la racine et pointait encore sur l'ancien emplacement.
4. **Démarche** : j'ai soumis le problème à l'agent mentor qui m'a expliqué pourquoi l'IDE ne détectait plus les sources Maven et comment ré-associer le module.
5. **Correction et prévention** : ce qui a résolu le problème a été de ré-importer le fichier déplacé en tant que projet Maven (clic droit sur `backend/pom.xml` -> *Add as Maven Project*, et suppression de l'ancien lien Maven à la racine). Réflexe de prévention : dès qu'on déplace un `pom.xml` dans un monorepo, ré-importer le `pom.xml` dans l'IDE.
6. **Concept lié** : résolution du fichier `pom.xml` par l'IDE (configuration de module Maven dans un monorepo).
