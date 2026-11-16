# Value Object et `@Embeddable`

## 1. Le concept en une phrase

Un Value Object est un groupe cohérent de valeurs **sans identité propre** (une adresse, un montant avec sa devise) ; en JPA, on le mappe avec `@Embeddable` / `@Embedded`, ce qui le range dans une classe Java dédiée tout en gardant ses colonnes dans la table de l'entité.

## 2. Le problème qu'il résout

Sans lui, on a deux mauvaises options :
- tout mettre à plat dans l'entité : une classe de 30 champs, illisible, sans regroupement logique ;
- créer une table séparée en `@OneToOne` : une jointure à chaque lecture, et un risque de N+1 requêtes, alors qu'il y a toujours exactement un bloc par entité.

## 3. Explication simple et analogie

Une adresse postale n'a pas d'identité : deux adresses identiques sont interchangeables. On la range dans une enveloppe à part (la classe `Address`) pour la lisibilité, mais on la colle sur le même dossier client (la même table).

## 4. Exemple minimal générique

```java
@Embeddable
record Address(String street, String city, String zipCode) { }

@Entity
class Customer {
    @Id @GeneratedValue private Long id;

    @Embedded
    private Address billingAddress;   // colonnes street, city, zip_code dans la table customers
}
```

## 5. Pièges et idées fausses

- **Entité vs Value Object** : l'entité a une identité (`@Id`) et un cycle de vie ; le Value Object se compare par ses valeurs et se remplace en bloc, il ne se modifie pas champ par champ.
- Deux `@Embedded` du même type dans une entité (adresse de facturation et de livraison) entrent en conflit de noms de colonnes : il faut `@AttributeOverrides`.
- Un Value Object idéal est **immuable** ; les records Java s'y prêtent bien (le support des records en `@Embeddable` dépend de la version d'Hibernate : à vérifier).

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Groupe de valeurs toujours présent, sans identité | `@Embeddable` | Code lisible, pas de jointure |
| Objet avec sa propre identité ou son propre cycle de vie | Entité séparée | Il vit indépendamment |
| Objet partagé entre plusieurs entités | Entité séparée | Un Value Object est copié, pas partagé |

## 7. Ma reformulation validée

> À écrire : reformule ce concept avec tes mots (rappel actif).

## 8. Rencontré dans

- Projet LeaguePlatform : `ChampionStats`, `ChampionPassive`, `ItemGold` (`docs/02-modele-domaine-et-bdd.md`).
- Concepts liés : [aggregate-root](aggregate-root.md), [element-collection-et-1nf](element-collection-et-1nf.md).
