## Quoi

Closes #<issue>

<Ce que fait cette PR, en 2-3 phrases.>

## Pourquoi

<Le besoin métier, et les choix de conception non évidents.>

## Comment tester

1. Backend : `<commande de lancement>`
2. Front sur le backend local : `<commande>`, puis <parcours à faire à l'écran>

## Checklist

- [ ] Les critères d'acceptation de l'issue sont couverts par des tests
- [ ] Les cas d'erreur sont testés
- [ ] Le contrat est modifié dans Apidog **et** exporté dans `api/openapi.yaml`
- [ ] L'écran fonctionne sur le backend local comme sur le mock (aucun écart au contrat)
- [ ] La CI est verte (backend et front)
- [ ] Aucun secret, aucun artefact de build
- [ ] Fiches concept et journal d'erreurs à jour

## Ce que j'ai appris

<Une ou deux lignes : la notion nouvelle ou l'erreur marquante de cette PR.>
