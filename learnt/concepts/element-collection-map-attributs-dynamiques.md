# Attributs dynamiques et clairsemés : `Map` en `@ElementCollection`

## 1. Le concept en une phrase

Quand chaque enregistrement ne possède que quelques attributs parmi un grand nombre possible, on les stocke sous forme de paires clé / valeur dans une table dédiée (`Map` en `@ElementCollection`) plutôt que dans des dizaines de colonnes presque toujours vides.

## 2. Le problème qu'il résout

Un produit peut avoir 2 caractéristiques sur 30 possibles. Avec 30 colonnes, chaque ligne contient 28 `NULL`, et chaque nouvelle caractéristique impose une migration de schéma.

## 3. Explication simple et analogie

Une carte d'identité contient toujours les mêmes informations : une colonne par information. Un ticket de caisse ne mentionne que les rayons visités : on note seulement les lignes qui existent.

## 4. Exemple minimal générique

```java
@Entity
class Product {
    @ElementCollection
    @CollectionTable(name = "product_attributes", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "attribute_key")
    @Column(name = "attribute_value")
    private Map<String, Double> attributes = new HashMap<>();
}
```

| `product_id` | `attribute_key` | `attribute_value` |
| :--- | :--- | :--- |
| 1 | `weightKg` | `1.2` |
| 1 | `batteryHours` | `10.0` |

## 5. Pièges et idées fausses

- **Typage faible** : toutes les valeurs ont le même type, et la base ne vérifie plus qu'une clé existe ou qu'une valeur est dans une plage valide. La validation passe dans le code.
- Filtrer ou trier sur un attribut demande une jointure par attribut : c'est plus lourd qu'une colonne.
- Poussé à l'extrême, ce modèle devient l'anti-pattern EAV (Entity-Attribute-Value). À réserver aux attributs vraiment variables. Alternative en PostgreSQL : une colonne `jsonb`.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Attributs toujours présents | Colonnes (ou `@Embeddable`) | Typés, contraints, indexables |
| Peu d'attributs parmi beaucoup, liste ouverte | `Map` en `@ElementCollection` | Pas de colonnes vides, pas de migration par attribut |
| Structure riche, imbriquée, rarement filtrée | Colonne `jsonb` | Souple, un seul champ |

## 7. Ma reformulation validée

> À écrire : reformule ce concept avec tes mots (rappel actif).

## 8. Rencontré dans

- Projet LeaguePlatform : statistiques d'un `Item` et table `item_stats` (`docs/02-modele-domaine-et-bdd.md`).
- Concepts liés : [element-collection-et-1nf](element-collection-et-1nf.md), [embeddable-value-object](embeddable-value-object.md).
