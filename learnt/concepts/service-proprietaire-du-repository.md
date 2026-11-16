# Passer par le service propriétaire, pas par le repository d'un autre module

## 1. Le concept en une phrase

Un module n'accède jamais au repository d'un autre module : il appelle une méthode métier du service propriétaire, qui centralise les règles d'accès à ses données en un seul point.

## 2. Le problème qu'il résout

Si `InvoiceService`, `ShippingService` et `ReviewService` appellent tous `customerRepository.findById(id)` :
1. **Règles dispersées** : le jour où un client banni ou supprimé logiquement ne doit plus agir, il faut modifier tous ces services. En oublier un crée une faille.
2. **Fuite du modèle de persistance** : on récupère l'entité JPA brute (données sensibles, collections `LAZY`) au lieu d'un objet adapté au besoin.
3. **Couplage au schéma** : un changement de la table `customers` impacte tous les modules.

## 3. Explication simple et analogie

Une bibliothèque. Si chaque lecteur va directement dans la réserve, le jour où une règle change ("les livres rares ne sortent plus"), il faut prévenir tous les lecteurs. Si tout le monde passe par le bibliothécaire, on ne prévient qu'une personne.

## 4. Exemple minimal générique

```java
// Dans CustomerService (seul propriétaire de CustomerRepository)
public CustomerSummary getActiveCustomer(long customerId) {
    // 1. Le client existe-t-il ?
    // 2. Est-il actif (ni banni, ni supprimé) ?
    // Une nouvelle règle d'accès ne modifie QUE cette méthode.
}
```

## 5. Pièges et idées fausses

- "Le service devient un simple passe-plat" : non. Il expose une **intention métier** (`getActiveCustomer`, `validateProductsForOrder`), pas un `findById` générique.
- Exposer l'entité JPA dans la méthode publique annule une partie du bénéfice : on retourne plutôt un DTO ou un objet du domaine adapté.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Un module a besoin des données d'un autre | Méthode métier du service propriétaire | Règles centralisées |
| Accès aux données de son propre module | Repository directement, dans son service | C'est son rôle |
| Besoin de lecture massive transverse (reporting) | Requête dédiée de lecture, assumée | Le passage par les services serait trop coûteux |

## 7. Ma reformulation validée

> Le danger concret si plusieurs services appellent directement un repository qui ne leur appartient pas est que si demain les règles changent, il faudra modifier autant de services qui appellent directement ce repository. En passant tous par le service rattaché au domaine, la logique est centralisée à un seul endroit via une méthode métier et on ne modifie qu'un seul endroit du code.

## 8. Rencontré dans

- Projet LeaguePlatform : modélisation (un `Build` valide ses objets via le service du module `item`).
- Concept lié : [package-by-feature](package-by-feature.md).
