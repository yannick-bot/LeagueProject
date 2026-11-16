---
name: parcours-demarrer-projet
description: Parcours d'apprentissage guidé. Démarre un nouveau projet backend Java / Spring Boot de A à Z - objectif, choix du domaine métier, découverte du métier, périmètre et jalons, source de données, outils du GitHub Student Pack, stack, carte des connaissances, initialisation Git et GitHub. À utiliser quand le projet n'a pas encore de docs/00-cadrage.md ou que l'apprenant veut lancer un nouveau projet.
---

# Parcours : démarrer un projet

Phase globale, jouée **une seule fois** par projet. Pas de code applicatif dans ce parcours. Une question à la fois, avec des choix structurés quand c'est possible. Mets à jour `docs/progression.md` après chaque étape.

## 0. Vérifier l'état

Si `docs/00-cadrage.md` existe déjà, le projet a démarré : propose `parcours-reprendre` à la place.

## 1. Objectif et contexte

- Demande au sous-agent `archiviste` un état des lieux : projets précédents, domaines déjà couverts, notions au niveau Maîtrisé, notions fragiles, outils du Pack déjà utilisés.
- Avec l'apprenant : que veut-il retirer de ce projet ? Quelles compétences (techniques et métier) veut-il rendre démontrables ?

## 2. Choix du domaine métier

- Ouvre `.agents/references/domaines-metier.md`.
- Propose 2 ou 3 domaines, en priorité ceux **pas encore couverts**, en expliquant pour chacun ce qu'il enseigne (règles de gestion, invariants, concepts techniques typiques). Donne ton avis.
- L'apprenant choisit. Un projet doit être **riche en règles métier** : un simple catalogue en lecture seule enseigne peu de modélisation.

## 3. Introduction au domaine

Courte (vocabulaire de base, acteurs, grandes étapes du métier), juste assez pour ne pas bloquer sur le jargon. Vérifie les idées fausses : "selon toi, qu'est-ce qu'un sinistre ?"

## 4. Premier entretien avec l'expert métier (vision globale)

Passe dans le rôle **Expert métier / Product Owner** (annonce-le). Donne un besoin volontairement flou ("on veut gérer nos réservations en ligne"). L'apprenant pose ses questions pour faire émerger : les acteurs, les grands cas d'usage, ce qui a de la valeur. Sors du rôle et montre ce qu'il a oublié de demander. Le détail des règles vient dans `parcours-modeliser-metier`.

## 5. Périmètre et jalons

- Un premier jalon petit, livrable et testable (V1.0), puis les suivants (V1.1, V2...).
- Les **non-objectifs** explicites (ce qu'on ne fera pas).
- Chaque jalon doit introduire au moins une notion nouvelle significative.

## 6. Source de données

Ouvre `.agents/references/sources-donnees.md`. Choisis avec l'apprenant une source cohérente avec le domaine (API tierce, données ouvertes, jeu de données fictif généré). Vérifie les quotas et les conditions d'accès actuels. Décide de la stratégie d'ingestion (import au démarrage, synchronisation à la demande, appel en direct avec cache).

## 7. Outils du GitHub Student Pack

- Ouvre `.agents/references/student-pack.md`.
- Propose les thèmes **pas encore couverts** qui ont du sens pour ce domaine.
- **Rattache chaque outil à un jalon** où il devient réellement utile (par exemple : CI dès la première fonctionnalité, suivi d'erreurs et monitoring une fois déployé, paiement au jalon qui le demande). Un outil arrive quand le besoin apparaît.
- Rappelle de vérifier l'offre actuelle sur https://education.github.com/pack.

## 8. Stack et choix techniques

Version de Java et de Spring Boot (la dernière version stable supportée, pas une version en fin de support), base de données, migrations, stratégie de tests, organisation des packages. Pour chaque choix : l'apprenant propose, tu challenges ("pourquoi pas X ?"), puis la décision va dans le journal des décisions. Un choix structurant donne un ADR.

Choix fixés par le kit (à rappeler, pas à rediscuter à chaque projet) :
- **Monorepo** : `backend/` (Spring Boot), `frontend/` (Angular, généré par le mentor), `api/openapi.yaml` (le contrat).
- **Contrat design-first** dans **Apidog**, exporté en OpenAPI dans `api/` (`.agents/references/outils/apidog.md`).
- **Front Angular** généré écran par écran (`.agents/references/front-angular.md`).

## 9. Carte des connaissances

Liste les concepts que chaque jalon va mobiliser, dans l'ordre logique (prérequis d'abord), en marquant pour chacun : **fondateur** (concept d'abord) ou **découvrable** (essai d'abord), et le niveau actuel dans la grille. Repère les prérequis manquants bloquants et traite-les avant de coder.

## 10. Mise en place

L'apprenant exécute lui-même :
- la structure du monorepo, `git init`, le dépôt GitHub (`gh repo create`), un `.gitignore` propre (Java, Node, IDE, logs) ;
- l'initialisation du backend Spring Boot dans `backend/` (Spring Initializr) ;
- la création du projet **Apidog** (premier contact avec l'outil, méthode "Guider un outil") ;
- la structure `docs/`, `docs/adr/`, `learnt/concepts/`, à partir des modèles de `.agents/references/templates/`.

Toi, dans ton rôle **Équipe front** : tu génères la **coquille** Angular dans `frontend/` (cadre de page, routage, environnements mock et local, génération du client depuis `api/openapi.yaml`), sans aucun écran métier.

La CI est mise en place dans la première fonctionnalité (socle technique) : build et tests du backend, build du front.

Tu rédiges `docs/00-cadrage.md` et `docs/progression.md` à partir des décisions prises (modèles `cadrage.md` et `progression.md`), et l'apprenant les valide. Tu initialises `learnt/competences.md` avec les notions de la carte, en reprenant les niveaux déjà acquis dans d'autres projets.

## 11. Clôture

Métacognition (voir la méthode du mentor), récapitulatif de 2-3 lignes, puis enchaîne sur `parcours-modeliser-metier`.
