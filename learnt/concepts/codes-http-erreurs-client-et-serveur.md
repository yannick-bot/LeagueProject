# Choisir le bon code HTTP : 200, 400, 404, 409, 502, 503

## 1. Le concept en une phrase

Le code de statut dit **qui** est responsable et **de quoi** : la ressource n'existe pas (`404`), la requête du client viole le contrat (`400`), elle est valide mais incompatible avec l'état actuel (`409`), ou un système en amont a échoué (`502` / `503`).

## 2. Le problème qu'il résout

Un code mal choisi trompe le client : il réessaie une requête qui ne marchera jamais, affiche "introuvable" alors que c'est son filtre qui est faux, ou traite une recherche sans résultat comme une panne.

## 3. Explication simple et analogie

Un guichet de poste. "Ce bureau n'existe pas" (`404`). "Votre formulaire est mal rempli" (`400`). "Ce colis a déjà été retiré" (`409`). "Le camion du fournisseur n'est pas arrivé" (`502`). "Le guichet est fermé, revenez plus tard" (`503`). "Aucun colis à votre nom aujourd'hui" n'est pas une erreur : c'est une réponse (`200`, liste vide).

## 4. Exemple minimal générique

| Requête | Code | Pourquoi |
| :--- | :--- | :--- |
| `GET /orders/999` (l'identifiant n'existe pas) | `404 Not Found` | La ressource ciblée par l'URI est introuvable |
| `GET /orders?status=BANANA` (valeur hors de l'enum) | `400 Bad Request` | L'URI existe ; c'est le paramètre qui viole le contrat |
| `GET /orders?status=PAID&customer=xyz` (aucun résultat) | `200 OK`, `content: []` | La recherche a réussi ; l'ensemble est vide |
| `POST /customers` avec un e-mail déjà pris | `409 Conflict` | Requête valide, mais en conflit avec l'état actuel |
| `POST /sync` alors que l'API tierce répond en erreur | `502 Bad Gateway` | Un serveur en amont a échoué |
| `POST /sync` alors que le service est temporairement indisponible | `503 Service Unavailable` | Indisponibilité temporaire, réessayer plus tard (`Retry-After`) |

## 5. Pièges et idées fausses

- **`404` pour un filtre invalide** : non, l'URI existe. C'est un `400`.
- **Recherche vide = erreur** : non, c'est un `200` avec une liste vide.
- **`202 Accepted` pour signaler une panne** : non, c'est un code de **succès**, réservé à une tâche acceptée et traitée en arrière-plan.
- `400` vs `422` : certaines API réservent `422 Unprocessable Content` aux données bien formées mais invalides métier. L'important est de choisir une convention et de s'y tenir.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Question à se poser | Si oui |
| :--- | :--- |
| La ressource désignée par le chemin existe-t-elle ? | Non : `404` |
| La requête respecte-t-elle le contrat (types, valeurs, format) ? | Non : `400` |
| Est-elle compatible avec l'état actuel des données ? | Non : `409` |
| La panne vient-elle d'un système en amont ? | Oui : `502` (réponse invalide) ou `503` / `504` |

## 7. Ma reformulation validée

> Lors d'une requête `GET`, on renvoie `200 OK` lorsque la ressource demandée existe et a pu être retournée (y compris une liste vide pour une recherche sans résultat). On renvoie `404 Not Found` si la ressource demandée n'existe pas, et `400 Bad Request` si la requête (par exemple un paramètre) est mal formée.

## 8. Rencontré dans

- Projet LeaguePlatform : codes du contrat V1.0 (`docs/03-contrat-api-v1.md`).
- Concept lié : [problemdetail-rfc-9457](problemdetail-rfc-9457.md).
