# Package by Feature (et visibilité `package-private`)

## 1. Le concept en une phrase

Organiser les packages Java par domaine métier (`order/`, `customer/`) plutôt que par couche technique (`controller/`, `service/`, `repository/`), pour que le compilateur protège les classes internes de chaque domaine grâce à la visibilité `package-private`.

## 2. Le problème qu'il résout

En Java, la visibilité par défaut (sans mot-clé) limite l'accès aux classes du **même package exactement**. Avec un découpage par couche, `OrderService` (package `service`) et `OrderRepository` (package `repository`) sont dans deux packages différents : le repository doit donc être `public`. N'importe quelle classe de l'application peut alors l'injecter et contourner les règles métier du service.

## 3. Explication simple et analogie

Un immeuble de bureaux. Par couche : tous les coffres-forts de toutes les entreprises sont dans une seule salle commune, ouverte à tous. Par domaine : chaque entreprise a son étage avec son propre coffre, et les visiteurs passent par l'accueil (le service public).

## 4. Exemple minimal générique

```text
com.shop
 ├── order/
 │    ├── OrderController.java
 │    ├── OrderService.java      public : point d'entrée officiel du module
 │    ├── OrderRepository.java   package-private : invisible hors de order/
 │    └── Order.java
 └── customer/
      ├── CustomerService.java   public
      └── CustomerRepository.java  package-private
```

```java
interface OrderRepository extends JpaRepository<Order, Long> { } // pas de "public"
```

## 5. Pièges et idées fausses

- **Les sous-packages ne partagent rien** : pour le compilateur, `com.shop.order.internal` et `com.shop.order` sont deux packages distincts. Si un module grossit et a besoin de sous-packages, on protège les frontières par des tests d'architecture (Spring Modulith, ArchUnit).
- "Le découpage par couche est interdit" : faux, il a ses cas d'usage (voir section 6).

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Application avec plusieurs domaines métier | Par domaine | Encapsulation par le compilateur, modules lisibles |
| Micro-service à un seul domaine, très petit | Par couche acceptable | L'application entière est la fonctionnalité |
| Prototype ou CRUD simple sans logique métier | Par couche acceptable | Pas de frontière à protéger |
| Projet existant découpé par couche | Garder la convention | Cohérence ; ArchUnit pour interdire Controller vers Repository |

## 7. Ma reformulation validée

> Dans une architecture par couche, tous les contrôleurs sont dans un même package, de même que tous les services et tous les repositories. Pour qu'un service puisse accéder à son repository, le repository doit être `public`, ce qui permet à n'importe quelle autre classe d'y accéder aussi.
> Dans une architecture par métier (*Package by Feature*), le repository et son service sont dans le même package : le repository peut rester `package-private`, ce qui force les autres domaines à passer par le service propriétaire.

## 8. Rencontré dans

- Projet LeaguePlatform : cadrage, décision n°7 (`docs/00-cadrage.md`).
- Concept lié : [service-proprietaire-du-repository](service-proprietaire-du-repository.md).
