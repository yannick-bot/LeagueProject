---
name: parcours-fonctionnalite
description: Parcours d'apprentissage guidé. La boucle verticale d'une fonctionnalité, de bout en bout - user story avec description de l'écran, concepts nécessaires, contrat d'API conçu dans Apidog et exporté, écran Angular généré par le mentor sur le mock, tests et code backend écrits par l'apprenant, bascule de l'écran sur le vrai backend, PR et CI, revue, merge, grille de compétences et synchronisation NotebookLM. À utiliser pour chaque fonctionnalité d'un jalon, une fois le métier modélisé.
---

# Parcours : une fonctionnalité de bout en bout

La boucle principale du projet, répétée pour chaque fonctionnalité. L'apprenant écrit tout le code backend et le contrat ; le mentor génère l'écran (rule `socle`). Mets à jour `docs/progression.md` à chaque étape (note l'étape en cours, pour pouvoir reprendre).

## 1. Choisir la fonctionnalité

La prochaine dans `docs/progression.md`, ou celle que l'apprenant choisit, en justifiant l'ordre (dépendances, valeur, risque).

## 2. User story et écran (entretien avec l'expert métier)

Rôle **Expert métier**, centré sur cette fonctionnalité (modèle `user-story.md`) :
1. **La story** : acteur, besoin, bénéfice, règles de gestion concernées.
2. **L'écran** : un écran sert une tâche ou une décision d'un acteur. Guide l'apprenant par questions (qui l'utilise ? pour décider quoi ? de quelles informations a-t-il besoin ? que peut-il faire ? que se passe-t-il en cas d'erreur ou d'absence de résultat ?), puis apporte ce qui se fait réellement dans le secteur. **Un écran à la fois** : un nouvel écran, ou l'enrichissement d'un écran existant. Si la fonctionnalité n'a rien de visible, la section le dit.
3. **Les critères d'acceptation** au format Given / When / Then, dont au moins un cas d'erreur.

L'apprenant rédige et crée lui-même l'issue GitHub.

## 3. Carte locale des concepts

Quels concepts cette fonctionnalité mobilise-t-elle ? Pour chacun : diagnostic (grille, puis `archiviste` si besoin), classement fondateur ou découvrable, ordre. **Une seule difficulté nouvelle à la fois** : si la fonctionnalité en introduit trop, propose de la découper.

Si un **outil** (GitHub Student Pack, ou une nouvelle fonctionnalité d'Apidog) devient utile à cette étape du projet, c'est le moment de l'introduire, comme un concept découvrable (méthode "Guider un outil" du mentor).

## 4. Contrat d'API (dans Apidog)

1. L'apprenant **dérive le contrat de l'écran** : chaque information affichée, chaque filtre, chaque message d'erreur correspond à un élément du contrat (champ, paramètre, code de statut, `ProblemDetail`).
2. Il le conçoit dans **Apidog** : ressource, verbe, URI, paramètres, schémas, codes de statut, format d'erreur, exemples. Guide la navigation dans l'outil avec `.agents/references/outils/apidog.md` et la documentation officielle.
3. Tu challenges (cas limites, codes HTTP, cohérence avec l'existant). Skills d'appui : `api-design-principles`, `api-endpoint-builder`.
4. Il **exporte** le contrat en OpenAPI 3.x (YAML) vers `api/openapi.yaml`.

## 5. Branche

L'apprenant crée la branche (`feat/<issue>-<description>`), selon la rule `pratiques-pro`. Il y commite le contrat exporté (`docs(api):` ou `feat(api):`).

## 6. L'écran, généré sur le mock

Rôle **Équipe front**. À partir de la section "Écran" et de `api/openapi.yaml` :
1. Régénère le client typé depuis le contrat.
2. Génère ou enrichis l'écran dans `frontend/`, selon `.agents/references/front-angular.md`.
3. Lance-le (ou fais-le lancer) sur l'environnement **mock Apidog**.

L'apprenant vérifie que l'écran correspond à sa description. S'il manque une information à l'écran, c'est souvent qu'elle manque **dans le contrat** : retour à l'étape 4. Il commite le front (`feat(ui):`).

## 7. Tests d'abord, puis code backend

Cycle TDD (skill `tdd`) :
1. L'apprenant écrit les tests qui traduisent les critères d'acceptation : rouge.
2. Il écrit le code minimal : vert.
3. Il refactore.

Les concepts arrivent **au moment où on en a besoin**, avec la boucle de concept du mentor (fondateur : concept d'abord ; découvrable : essai d'abord). Aide selon le niveau de la grille, indices par paliers, répétition délibérée (une variation à chaque répétition).

Toute erreur qui demande réflexion passe par `parcours-erreur`.

## 8. Bascule sur le vrai backend

L'apprenant bascule l'écran de l'environnement mock vers son **backend local**.
- L'écran fonctionne comme sur le mock : le backend respecte le contrat.
- Il se comporte autrement (champ vide, erreur affichée différemment, requête bloquée) : c'est un **écart au contrat** ou un problème d'intégration (CORS, par exemple). C'est une leçon : `parcours-erreur`. Ne corrige jamais l'écart côté front.

Quand le front éclaire un concept backend, fais une **lecture guidée** du morceau de front concerné.

## 9. Commits, PR et CI

Commits conventionnels au fil de l'eau. L'apprenant ouvre **une seule PR** contenant le contrat, le backend et l'écran (modèle `pull-request.md`), et vérifie que la CI est verte (backend et front). Si la CI échoue : `parcours-erreur`.

## 10. Revue de code

Rôle **Relecteur**, sur le backend et le contrat (pas sur le front généré). Commence par les forces. Puis, pour chaque point faible : une question d'abord ("que se passe-t-il si...?"), l'explication du principe ensuite. Points d'attention : séparation des couches, invariants protégés, transactions, N+1, validation, gestion d'erreurs, sécurité, tests (cas d'erreur inclus), conformité au contrat, lisibilité. Skill d'appui : `code-reviewer`. L'apprenant corrige lui-même.

## 11. Merge et mise à jour

- L'apprenant merge et supprime la branche.
- Mets à jour avec lui `learnt/competences.md` (une notion codée seule passe à Appliqué ; la preuve est la PR).
- Vérifie que les nouvelles fiches concept et entrées du journal sont écrites.
- Délègue à `archiviste` la synchronisation vers le carnet NotebookLM central (fiches, journal, grille).
- Mets à jour `docs/progression.md`.

## 12. Clôture

Métacognition, récapitulatif de 2-3 lignes. Si le jalon est terminé, enchaîne sur `parcours-ancrer`. Sinon, retour à l'étape 1.
