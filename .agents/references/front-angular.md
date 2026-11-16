# Conventions du front Angular généré

Référence utilisée par le mentor dans son rôle **Équipe front**. Le front de `frontend/` est généré et maintenu par le mentor uniquement. Il sert à **voir** les fonctionnalités backend et à révéler les écarts au contrat. Ce n'est pas un objet d'apprentissage : il doit rester simple, lisible et fidèle au contrat.

**Avant de générer** : vérifie la version stable actuelle d'Angular et ses conventions sur la documentation officielle (https://angular.dev), et suis son guide de style.

## Rythme : un écran à la fois

- **Fonctionnalité 0 (socle technique)** : seulement la **coquille**. Cadre de page (en-tête, menu), routage, environnements, génération du client, composant d'affichage des erreurs. Aucun écran métier.
- **Chaque fonctionnalité** : un nouvel écran, ou l'enrichissement d'un écran existant, à partir de la section "Écran" de **sa** user story. Rien n'est généré à l'avance.
- **Fonctionnalité sans écran** : rien n'est généré.

## Stack

- Angular récent : composants *standalone*, *signals*, nouvelle syntaxe de contrôle (`@if`, `@for`), `inject()`.
- Angular Material pour une interface propre sans effort de design.
- Pas de bibliothèque de gestion d'état : les services et les signals suffisent.
- Client HTTP **généré depuis `api/openapi.yaml`** (par exemple `openapi-generator` avec la cible `typescript-angular`), via un script `npm` lancé avant `start` et `build`. Le client généré n'est pas commité.

## Structure (par fonctionnalité, comme le backend)

```text
frontend/src/app/
├── core/          Cadre de page, intercepteurs HTTP, affichage des erreurs (ProblemDetail)
├── shared/        Composants réutilisables (pagination, état vide, chargement)
├── features/
│   └── <fonctionnalité>/   Écrans et composants d'une fonctionnalité
└── api/           Client généré depuis le contrat (ignoré par Git)
```

## Environnements

| Configuration | Cible | Usage |
| :--- | :--- | :--- |
| `mock` | Mock local d'Apidog | Avant que le backend existe (étape 6 de `parcours-fonctionnalite`) |
| `local` | Backend local (par exemple `http://localhost:8080`) | Bascule sur le vrai backend (étape 8) |

On passe de l'une à l'autre par une configuration de lancement (par exemple `ng serve --configuration mock`), jamais en modifiant le code.

## Garde-fous

- **Fidèle au contrat** : aucun champ inventé, aucun appel absent de `api/openapi.yaml`. S'il manque une information pour l'écran, c'est le contrat qui doit évoluer (l'apprenant le modifie dans Apidog).
- **Aucune logique métier dans le front** : les règles de gestion et les invariants vivent dans le backend. Le front peut valider une saisie pour le confort de l'utilisateur, mais le backend reste la seule source de vérité.
- **Ne jamais masquer un problème backend** : pas de proxy de développement pour contourner une erreur CORS du backend local, pas de valeur par défaut pour cacher un champ manquant. Le problème doit se voir : c'est une leçon backend.
- **Les erreurs sont affichées** : `title` et `detail` du `ProblemDetail`, et les erreurs de validation champ par champ si le contrat les prévoit.
- **Les états sont prévus** : chargement, liste vide, erreur, service indisponible.
- **Transparence** : le `README` de `frontend/` indique que le code est généré par IA. Commits `feat(ui):` ou `chore(ui):`.
- **Simplicité** : du code court et lisible, que l'apprenant peut comprendre en lecture guidée.

## Lecture guidée : où le front éclaire le backend

| Concept backend | Morceau de front à montrer |
| :--- | :--- |
| CORS | La requête bloquée par le navigateur (console), alors qu'elle passe dans Apidog |
| Pagination | Le composant de pagination qui consomme `page`, `size`, `totalElements` |
| Format d'erreur (`ProblemDetail`) | Le composant d'affichage des erreurs de `core/` |
| Authentification JWT | L'intercepteur qui ajoute l'en-tête `Authorization` à chaque requête |
| Contrat d'API | Le client généré : les types TypeScript sont la traduction directe des schémas |
| Injection de dépendances | Un service Angular et `inject()`, mis en parallèle avec un `@Service` Spring |
