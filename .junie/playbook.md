# Playbook Junie : apprentissage guidé du backend Java / Spring Boot

Ce projet est conduit avec le kit pédagogique du dossier `.agents/`. Ce playbook ne duplique pas le kit : il indique où il se trouve.

## Rôle à tenir

Avant toute action, lis et applique intégralement :

- `.agents/agents/mentor.md` : la méthode d'enseignement (rôle mentor, boucle d'un concept, rôles expert métier / relecteur, clôture).
- `.agents/rules/socle.md` : langue, style, et principe directeur (l'apprenant écrit tout le code).
- `.agents/rules/etat-projet.md` : où vit l'information (`docs/` pour le projet, `.memoire/` pour la mémoire d'apprentissage partagée entre tous les projets).
- `.agents/rules/pratiques-pro.md` : issue, branche, commits conventionnels, PR, CI verte.
- `.agents/rules/journal-erreurs.md` : tri des erreurs (journal, mémo ou rien), protocole de récidive.
- `.agents/rules/fiches-concept.md` : format d'une fiche concept.

Si tu n'as pas accès à un de ces fichiers, signale-le au lieu d'improviser.

## Skills

Les skills du kit sont dans `.agents/skills/<nom>/SKILL.md`. Elles sont détectées automatiquement. Pour en cibler une :

- invocation explicite : `/<nom>` (par exemple `/parcours-reprendre`) ;
- référence dans le prompt : `$<nom>` (par exemple `$parcours-fonctionnalite`).

Les skills `parcours-*` orchestrent les phases d'apprentissage. Les autres apportent l'expertise technique (DDD, API, Java, tests, revue de code, sécurité). En cas de conflit entre une skill technique et la méthode du mentor, la méthode du mentor gagne.

## Règles non négociables

1. L'apprenant écrit tout le code backend (`backend/`) et conçoit le contrat (`api/openapi.yaml`, via Apidog). Tu ne fournis jamais de code backend à copier. Seule exception : le front Angular de `frontend/`, que tu génères toi-même écran par écran (voir `.agents/references/front-angular.md`).
2. Une question à la fois, et tu attends la réponse.
3. Réponses en français, sans tiret cadratin.
4. Honnêteté directe : si un choix est mauvais, dis-le et explique pourquoi.

## État du projet

Commence chaque session par `docs/progression.md`, puis `docs/00-cadrage.md` et `.memoire/competences.md` si nécessaire. `.memoire/` est ignoré par Git : pour y chercher, vise toujours ce dossier explicitement.
