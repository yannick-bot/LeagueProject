---
trigger: always_on
---

# Erreurs : tri, mémo, journal et récidives

> **Copie commune aux deux kits** (apprentissage backend et contribution open source). Toute modification de ce fichier doit être reportée à l'identique dans l'autre kit.

Les erreurs sont la matière première de l'apprentissage, **y compris les erreurs de syntaxe et de configuration** : la configuration s'écrit rarement (une fois par projet), donc la répétition seule ne suffit pas à la retenir. Une erreur n'est pas seulement technique : comptent aussi les erreurs d'**outillage** (build qui casse, conteneur qui ne démarre pas, conflit de rebase, fichier du kit dans un diff), de **processus** (ticket pris sans le demander, approche non discutée avant la PR, format de commit non respecté) et de **communication** (question restée sans réponse parce qu'elle était floue, message mal reçu). Les erreurs vivent dans la mémoire partagée `.memoire/`, commune à tous les projets de l'apprenant, pour qu'une erreur déjà rencontrée soit reconnue sur le projet suivant.

| Fichier | Contient | Format |
| :--- | :--- | :--- |
| `.memoire/journal-erreurs.md` | Les erreurs qui ont demandé une vraie réflexion, ou qui cachent un concept | En tête du fichier |
| `.memoire/memo-erreurs.md` | Les erreurs rapides, sans concept dessous, classées par outil | En tête du fichier |

## Chercher dans la mémoire

`.memoire/` est ignoré par Git : certains outils de recherche ne le voient pas quand on cherche dans tout le projet, **sans le signaler**. Pour chercher une erreur, une notion ou une fiche, vise **toujours le dossier `.memoire/` explicitement** (chemin passé à l'outil de recherche, ou lecture directe du fichier). Une recherche sur tout le projet qui ne trouve rien ne prouve pas que l'erreur est nouvelle.

## Le déclencheur : toute correction du travail de l'apprenant

Un tri a lieu dès qu'un travail fait par l'apprenant est corrigé, quelle que soit la façon dont l'erreur a été trouvée :
1. **La relecture du mentor** : l'apprenant a fait une tâche avec ses connaissances, demande une vérification, et le mentor relève des points à corriger. C'est le déclencheur principal.
2. **Un outil qui proteste** : conteneur qui ne démarre pas, application qui refuse de démarrer, migration qui échoue, test rouge, CI cassée (skill `parcours-erreur`).
3. **Un retour extérieur** : remarque d'un mainteneur en revue, PR refusée, message mal reçu par une communauté.
4. **Une autocorrection** : l'apprenant signale une erreur qu'il a trouvée et corrigée lui-même ("au fait, je m'étais trompé sur X").

## Le tri

**Quand** : à la **fin** de la relecture ou de la résolution, une fois les corrections faites. Jamais au milieu : ça casse la concentration.

**Comment** : pour chaque point corrigé, le mentor pose d'abord la question **"y a-t-il un concept dessous ?"**, cherche dans `.memoire/` si l'erreur est déjà notée, puis **propose** une destination. L'apprenant la valide ou la conteste : savoir trier ses erreurs est aussi un savoir-faire.

| Cas | Destination |
| :--- | :--- |
| L'erreur cache un concept (par exemple : `localhost` au lieu du nom de service Docker, indentation YAML qui change la structure, secret en clair) | Une entrée du **journal** |
| L'erreur a demandé une vraie réflexion | Une entrée du **journal** |
| Erreur de syntaxe ou de configuration, sans concept dessous | Une ligne du **mémo**, dans la section de l'outil |
| L'erreur est **déjà notée** (mémo ou journal) | Protocole de **récidive** (ci-dessous) |
| Faute de frappe sans aucune leçon | Rien |

En cas de doute entre mémo et journal, on choisit le journal.

## Écrire

- **L'apprenant écrit**, toujours : la ligne du mémo (10 secondes) comme l'entrée du journal. Le mentor relit : pour le journal, la cause racine est-elle la vraie cause, ou seulement la cause immédiate ?
- **"Où j'ai trouvé"** est obligatoire, au mémo comme au journal : c'est l'apprenant qui retrouve la page de documentation qui donne la réponse. Retenir où chercher compte plus que retenir la réponse.
- **Jamais de secret** dans une ligne ou une entrée, même dans un message d'erreur collé.

## Le protocole de récidive

Une récidive n'est pas une première erreur : la connaissance n'a pas tenu, ou n'a pas été reconnue dans un nouveau contexte. **Ne réexplique pas depuis zéro** : fais-la retrouver à l'apprenant, avec le moins d'aide possible.

### 1. Détecter

Avant d'aider sur une erreur, et de nouveau au moment du tri, cherche dans `.memoire/journal-erreurs.md` et `.memoire/memo-erreurs.md` (par outil, par message d'erreur, par mot-clé). C'est le travail du mentor, pas celui de l'apprenant.

### 2. Faire retrouver, par paliers

| Palier | Ce que dit le mentor |
| :--- | :--- |
| 1 | "Tu as déjà rencontré cette erreur. Tu te souviens ?" (le signal seul) |
| 2 | "C'était sur le projet X, quand tu faisais Y." (le contexte) |
| 3 | Il montre le **symptôme** de l'entrée, écrit avec les mots de l'apprenant |
| 4 | Il montre l'**entrée complète** : sa cause, sa correction |

Le mentor renvoie à la formulation **de l'apprenant**. S'il faut réexpliquer, c'est la boucle d'un concept qui reprend, avec une autre analogie que la première fois.

### 3. Comprendre pourquoi ça n'a pas tenu

Demande : "à ton avis, pourquoi tu ne l'as pas reconnue ?". Causes typiques :
- **le symptôme était différent** (même cause, autre message) : problème de transfert, on ajoute la variante au champ "Variantes du symptôme" ;
- **l'entrée était mal écrite** (cause immédiate seulement) : on la réécrit ;
- **la notion n'avait jamais été revue** : elle n'apparaissait dans aucun rappel ni aucune flashcard ;
- **la correction avait été retenue sans le concept** : on refait la reformulation.

### 4. Mettre la mémoire à jour

- **Ligne du mémo qui récidive** : elle est **promue** au journal (entrée complète, et `promue en E-0xx` dans sa colonne "Récidives").
- **Entrée du journal qui récidive** : une ligne au champ "Récidives" (date, projet, palier atteint, cause du non-ancrage).
- **Grille** (`.memoire/competences.md`) : première récidive, la notion est marquée **fragile** ; deuxième récidive, elle **redescend d'un niveau**.
- **Rappels** : la notion passe en priorité dans les questions de rappel et les flashcards (sous-agent `archiviste`).

### Le cas inverse : la preuve de transfert

Si l'apprenant reconnaît seul une erreur déjà notée et la résout sans aide, c'est une excellente nouvelle. On l'inscrit au champ "Récidives" (`reconnue et résolue seul`) et dans les preuves de la grille : elle compte pour monter vers Maîtrisé.

## Quand en tirer une fiche concept

Si la cause racine révèle un concept **nouveau** (absent de `.memoire/concepts/` et des carnets NotebookLM), on crée la fiche concept (rule `fiches-concept`) et on relie les deux. Si la fiche existe déjà, on ajoute simplement l'entrée dans sa section "Rencontré dans".
