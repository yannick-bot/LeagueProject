# Outil : Apidog

Référence utilisée par le mentor pour guider l'apprenant dans Apidog (méthode "Guider un outil" de `mentor.md`).

**Rôle dans le kit** : l'éditeur du contrat d'API (approche design-first) et le serveur mock qui fait tourner l'écran avant que le backend existe. Le contrat est exporté dans `api/openapi.yaml`, et c'est ce fichier qui fait foi.

**Avant de guider** : consulte la page de documentation concernée (les liens ci-dessous peuvent changer : en cas de lien mort, cherche sur https://docs.apidog.com). Demande la version d'Apidog de l'apprenant au premier usage. Certaines pages de la documentation sont générées en JavaScript et ne se lisent pas automatiquement : dans ce cas, dis-le et demande une capture d'écran.

## Introduction progressive

Une étape à la fois, au moment où elle sert. Pour chacune : le concept d'abord, le clic ensuite.

| Étape | Moment | Concept à enseigner d'abord | Dans Apidog | Documentation |
| :--- | :--- | :--- | :--- | :--- |
| 1. Concevoir le contrat | Première fonctionnalité avec un endpoint | Design-first : le contrat avant le code, schéma, exemple, code de statut | Créer un projet, des endpoints, des schémas réutilisables, des exemples de réponse (succès et erreurs) | [Introduction](https://docs.apidog.com/introduction-to-apidog-643492m0) |
| 2. Exporter le contrat | Même fonctionnalité | Une source de vérité versionnée, lisible par des outils | *Settings → Export Data* → OpenAPI 3.x, YAML → `api/openapi.yaml` | [Export Data](https://docs.apidog.com/export-data-635117m0) |
| 3. Faire tourner le mock | Même fonctionnalité | Un mock répond comme l'API répondra, sans l'API (l'appartement témoin) | Mock local, Smart Mock (données générées depuis les schémas), Custom Mock (réponses fixées) | [Mock API Data](https://docs.apidog.com/mock-api-data-in-apidog-617869m0), [Smart Mock](https://docs.apidog.com/smart-mock-618190m0), [Priorité des mocks](https://docs.apidog.com/mock-priority-sequence-618208m0) |
| 4. Changer d'environnement | Première bascule de l'écran sur le backend | Un même client, plusieurs cibles : mock, local, puis déployé | Sélecteur d'environnement en haut à droite (dont *Local Mock*), URL de base par environnement | [Environments & Services](https://docs.apidog.com/environments-services-584758m0) |
| 5. Tester contre le backend | Quand les tests manuels deviennent répétitifs | Tests de contrat et de scénarios, vus de l'extérieur | Scénarios de test, assertions, exécution sur l'environnement local | À chercher sur docs.apidog.com au moment venu |
| 6. Publier la documentation | Jalon "mise en ligne" | La documentation comme produit pour les consommateurs de l'API | Documentation publiée depuis le projet | À chercher sur docs.apidog.com au moment venu |
| (option) Mock dans le cloud | Si le front doit tourner sans Apidog ouvert | Mock hébergé vs mock local | Cloud Mock | [Cloud Mock](https://docs.apidog.com/cloud-mock-621066m0) |

## Projet démarré avant Apidog

Si un contrat existe déjà dans un autre format (markdown, par exemple), l'apprenant le **ressaisit** dans Apidog, endpoint par endpoint. C'est un bon exercice de relecture : chaque champ doit être justifié. Si un fichier OpenAPI existe déjà, Apidog sait l'importer.

## Pièges

- **Oublier d'exporter** : le contrat dans Apidog et celui du dépôt divergent. Réflexe : contrat modifié = contrat exporté, dans la même PR.
- **Mock trop "parfait"** : le Smart Mock génère des données plausibles mais toujours valides. Ajouter des exemples de réponses d'erreur (`400`, `404`, `ProblemDetail`) pour que l'écran apprenne aussi à les afficher.
- **Corriger un écart côté front** : si l'écran marche sur le mock mais pas sur le backend, c'est le backend (ou le contrat) qui est en cause, jamais le front.
- **Données d'exemple irréalistes** : des exemples proches du métier (vrais noms, vraies valeurs) rendent l'écran parlant et révèlent des problèmes de format.
