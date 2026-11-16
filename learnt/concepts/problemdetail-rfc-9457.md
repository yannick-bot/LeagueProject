# Format d'erreur standard : `ProblemDetail` (RFC 9457)

## 1. Le concept en une phrase

La RFC 9457 définit un format JSON standard pour les erreurs d'une API HTTP (`application/problem+json`), que Spring prend en charge nativement avec la classe `ProblemDetail`.

## 2. Le problème qu'il résout

HTTP standardise les codes de statut, mais pas le corps des erreurs. Sans standard, chaque API invente son format (`{"error": ...}`, `{"msg": ..., "code": ...}`), et chaque client doit écrire un analyseur d'erreurs différent pour chaque API.

## 3. Explication simple et analogie

Un formulaire de réclamation officiel, identique dans toutes les administrations : les mêmes cases au même endroit (catégorie, résumé, détail). Celui qui le traite n'a pas à réapprendre la mise en page à chaque fois.

## 4. Exemple minimal générique

Les 5 champs standards, plus des champs personnalisés autorisés :

```json
{
  "type": "https://api.example.com/errors/order-not-found",
  "title": "Order Not Found",
  "status": 404,
  "detail": "Aucune commande trouvée avec l'identifiant 42.",
  "instance": "/api/v1/orders/42",
  "timestamp": "2026-11-01T10:30:00Z"
}
```

| Champ | Rôle |
| :--- | :--- |
| `type` | URI stable qui identifie la **catégorie** d'erreur (`about:blank` par défaut) |
| `title` | Résumé court, identique pour un même `type` |
| `status` | Le code HTTP |
| `detail` | Explication de **cette** occurrence |
| `instance` | La requête concernée |

```java
@RestControllerAdvice
class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(OrderNotFoundException.class)
    ProblemDetail handle(OrderNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setTitle("Order Not Found");
        problem.setType(URI.create("https://api.example.com/errors/order-not-found"));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }
}
```

## 5. Pièges et idées fausses

- `spring.mvc.problemdetails.enabled=true` convertit automatiquement les exceptions standards de Spring MVC (paramètre manquant, JSON mal formé...). Pour les exceptions métier, il faut un `@RestControllerAdvice`.
- Retourner directement `ProblemDetail` depuis un `@ExceptionHandler` est possible **depuis Spring Framework 6** (donc dès Spring Boot 3), pas seulement en Spring Boot 4.
- **Ne jamais exposer** de stack trace, de message SQL ou de détail interne dans `detail` : c'est une fuite d'information (OWASP).
- Un handler générique `@ExceptionHandler(Exception.class)` qui renvoie `ex.getMessage()` pour toute erreur 500 cumule les deux défauts : format non standard et fuite d'information.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Toute API REST publique ou partagée | `ProblemDetail` | Standard, outillé, compris des clients |
| Erreurs de validation de champs | `ProblemDetail` + propriété `invalidParams` | Extension prévue par la RFC |
| API interne avec un format d'entreprise imposé | Le format imposé | Cohérence avec l'existant |

## 7. Ma reformulation validée

> À écrire : reformule ce concept avec tes mots (rappel actif).

## 8. Rencontré dans

- Projet LeaguePlatform : format d'erreur du contrat V1.0 (`docs/03-contrat-api-v1.md`, section 2.5).
- Concept lié : [codes-http-erreurs-client-et-serveur](codes-http-erreurs-client-et-serveur.md).
