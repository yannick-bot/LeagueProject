# Journal d'erreurs : LeaguePlatform API

> Entrées numérotées (`E-001`, `E-002`...), la plus récente en haut. Une entrée par erreur qui a demandé une vraie réflexion. Format : `.agents/rules/journal-erreurs.md`, modèle : `.agents/references/templates/entree-journal.md`.

---

## E-002 - Echec du ci lors de l'installation des dépendances (2026-11-21)

1. **Erreur exacte** :
   ```text
   Comportement observé : Cela a encore échoué : 4s
1s
Run npm ci
npm error code EUSAGE
npm error
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
npm error
npm error Invalid: lock file's @emnapi/core@2.0.0-alpha.6 does not satisfy @emnapi/core@1.11.3
npm error Invalid: lock file's @emnapi/runtime@2.0.0-alpha.6 does not satisfy @emnapi/runtime@1.11.3
npm error Missing: @emnapi/wasi-threads@1.2.3 from lock file
npm error Missing: @emnapi/core@2.0.0-alpha.6 from lock file
npm error Missing: @emnapi/runtime@2.0.0-alpha.6 from lock file
npm error Invalid: lock file's @types/node@20.19.43 does not satisfy @types/node@26.6.6
npm error Invalid: lock file's undici-types@6.21.0 does not satisfy undici-types@8.9.0
npm error Missing: @types/node@20.19.43 from lock file
npm error Missing: undici-types@6.21.0 from lock file
npm error
npm error Clean install a project
npm error
npm error Usage:
npm error npm ci
npm error
npm error Options:
npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
npm error [--no-bin-links] [--no-fund] [--dry-run]
npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
npm error [--workspaces] [--include-workspace-root] [--install-links]
npm error
npm error aliases: clean-install, ic, install-clean, isntall-clean
npm error
npm error Run "npm help ci" for more info
npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2026-11-21T13_04_03_095Z-debug-0.log
Error: Process completed with exit code 1.
   ```
2. **Contexte** : C'était suite à l'écriture du fichier ci.yml pour le job frontend_build
3. **Pourquoi (cause racine)** :  La cause était une ligne  --legacy-peer-deps=true présent uniquement dans mon .npmrc local. À cause de ce réglage caché, npm install générait chez moi un 
package-lock.json qui ignorait des conflits de peerDependencies (@emnapi/core et @types/node), alors que le runner GitHub Actions (sans .npmrc, donc en mode strict false par défaut) les a rejetés lors du npm ci.
4. **Démarche** : Le premier soupcon était le décalage entre la version flottante de node et npm de ma machine et la version globale de node et npm configuré dans le fichier de ci. Après les corrections, une erreur différente a eu lieu et permis d'identifier la vrai cause
5. **Correction et prévention** : ce qui a résolu le problème a été de avoir régénéré package-lock.json avec --legacy-peer-deps=false (et ajouté @types/node ^24.19.2 en devDependencies) pour obtenir un lockfile sain et reproductible sans contournement local. Prévention : éviter les réglages globaux silencieux dans .npmrc (legacy-peer-deps = true) et épingler les versions exactes des outils en CI.
6. **Concept lié** : Configuration de la CI pour garantir un  environnement reproductible à celui de developpement.


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
