---
name: parcours-modeliser-metier
description: Parcours d'apprentissage guidé. Modélisation métier globale d'un projet - jeu de rôle avec l'expert métier pour extraire cas d'usage, règles de gestion, invariants, états et cycles de vie, workflows métier et langage commun, puis traduction en modèle DDD (agrégats, entités, value objects) et en schéma de base de données. À utiliser après le cadrage, ou quand un nouveau jalon élargit le domaine.
---

# Parcours : modéliser le métier

Objectif : que l'apprenant sache **comprendre un métier et le traduire en modèle**, avant d'écrire du code. Pas de code applicatif dans ce parcours. Skills d'appui : `brainstorming`, `domain-driven-design`, `database-design`, `c4-component`.

La modélisation globale se fait pour le jalon en cours, pas pour tout le projet d'un coup. Chaque nouveau jalon peut relancer ce parcours sur sa partie du domaine.

## 1. Les cas d'usage (entretien avec l'expert métier)

Passe dans le rôle **Expert métier** (annonce-le). Pour chaque grand cas d'usage du jalon, l'apprenant mène l'entretien :
- qui fait quoi, dans quel but ?
- que se passe-t-il quand tout va bien ? quand ça se passe mal ?

Reste réaliste : réponses floues, exceptions révélées seulement si la bonne question est posée, parfois une contradiction à faire relever. Sors du rôle à la fin et montre ce qui a été oublié.

**Production** : la liste des cas d'usage, avec acteur, déclencheur, scénario nominal et scénarios d'exception.

## 2. Les règles de gestion

Les règles qui gouvernent le métier ("une annulation est gratuite jusqu'à 48 h avant"). Pour chacune, l'apprenant précise : quand elle s'applique, ce qui se passe si elle est violée, d'où elle vient (loi, contrat, choix commercial).

## 3. Les invariants

La notion centrale du parcours. Un invariant est une condition **toujours vraie**, quoi qu'il arrive ("le solde ne descend jamais sous le découvert autorisé"). Fais-les formuler à l'apprenant, puis teste-les par **contre-exemples** ("et si deux retraits arrivent en même temps ?", "et si l'utilisateur annule pendant le paiement ?").

Concept fondateur à faire émerger : **les invariants définissent les frontières des agrégats** (ce qui doit rester cohérent dans une même transaction).

## 4. États et cycles de vie

Pour chaque objet métier qui évolue dans le temps : ses états, les transitions autorisées, ce qui les déclenche, les transitions interdites. Production : un diagramme d'états (Mermaid `stateDiagram-v2`).

## 5. Workflows métier et événements

L'enchaînement des étapes entre acteurs et systèmes ("la commande est payée, donc le stock est réservé, donc l'entrepôt prépare"). Repère les **événements métier** (au passé : `CommandePayée`) : ce sont souvent des points d'intégration ou d'asynchronisme.

## 6. Le langage commun

Un glossaire des termes du métier, avec une définition précise et unique pour chacun. Ces mots seront ceux du code (classes, méthodes, endpoints).

## 7. Le modèle DDD

À partir de ce qui précède, l'apprenant propose, tu challenges :
- bounded contexts et organisation des packages par fonctionnalité ;
- agrégats et racines d'agrégat (justifiés par les invariants) ;
- entités, value objects, énumérations ;
- qui a le droit de modifier quoi (les invariants vivent dans les méthodes de l'agrégat, pas dans des setters).

## 8. Le schéma de base de données

Tables, clés primaires et clés métier uniques, clés étrangères, index, contraintes (`CHECK`, `UNIQUE`, contraintes d'exclusion si besoin). Les invariants qui peuvent être garantis par la base doivent l'être aussi. Production : un diagramme entité-relation (Mermaid `erDiagram`).

## 9. Production et clôture

- Tu rédiges `docs/01-modele-metier.md` à partir de tout ce qui a été décidé. L'apprenant le relit et le valide.
- Mets à jour la carte des connaissances (`docs/00-cadrage.md`) et `learnt/competences.md` si des notions ont été comprises (reformulation validée).
- Métacognition, récapitulatif, puis enchaîne sur `parcours-fonctionnalite` avec la première fonctionnalité du jalon.
