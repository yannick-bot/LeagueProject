# Collection de valeurs (`@ElementCollection`) et première forme normale

## 1. Le concept en une phrase

Quand une entité possède plusieurs valeurs simples d'un même type (des catégories, des rôles), on les stocke dans une petite table à part, une ligne par valeur, plutôt que toutes ensemble dans une seule colonne : chaque colonne doit rester atomique (première forme normale, 1NF).

## 2. Le problème qu'il résout

Stocker `"BOOKS,ELECTRONICS"` dans une colonne `categories` :
1. **Viole la 1NF** : une case contient plusieurs valeurs.
2. **Rend la recherche lente** : `WHERE categories LIKE '%BOOKS%'` commence par un joker, ce qui empêche l'utilisation d'un index B-Tree classique et force un parcours complet de la table.
3. **Fragilise les données** : rien n'empêche une faute de frappe ou un doublon dans la chaîne.

## 3. Explication simple et analogie

Une fiche bibliothèque où l'on écrit tous les genres d'un livre dans une seule case, séparés par des virgules : pour trouver tous les romans policiers, il faut relire chaque fiche. Avec un fichier "genres" (une carte par livre et par genre), on va directement au bon tiroir.

## 4. Exemple minimal générique

```java
enum Category { BOOKS, ELECTRONICS, TOYS }

@Entity
class Product {
    @ElementCollection
    @CollectionTable(name = "product_categories", joinColumns = @JoinColumn(name = "product_id"))
    @Enumerated(EnumType.STRING)      // TOUJOURS STRING
    @Column(name = "category")
    private Set<Category> categories = new HashSet<>();
}
```

## 5. Pièges et idées fausses

- **`EnumType.ORDINAL` par défaut** : JPA stocke alors `0, 1, 2...`. Réordonner ou insérer une valeur dans l'enum corrompt silencieusement toutes les données. Toujours `EnumType.STRING`.
- Une `@ElementCollection` n'a pas d'identité propre : à chaque modification, Hibernate peut supprimer et réécrire toute la collection. Pour une grosse collection souvent modifiée, une entité dédiée est préférable.
- Si les valeurs ne sont pas connues à l'avance (catégories créées par les utilisateurs), une `enum` ne convient pas : on utilise une table de référence.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Petite liste fermée de valeurs connues à l'avance | `enum` + `@ElementCollection` | Simple, typé, 1NF respectée |
| Valeurs créées dynamiquement, avec des attributs | Table de référence + entité | Les valeurs ont leur propre vie |
| Collection volumineuse et souvent modifiée | Entité dédiée | Évite les réécritures complètes |

## 7. Ma reformulation validée

> Si l'on connaît les valeurs possibles à l'avance, une `enum` avec `@ElementCollection` est le meilleur choix d'implémentation. Stocker plusieurs valeurs séparées par des virgules dans une seule colonne est une mauvaise pratique en base de données relationnelle car une colonne doit rester atomique (1re Forme Normale) et ne doit pas contenir plusieurs valeurs.

## 8. Rencontré dans

- Projet LeaguePlatform : `ChampionTag` et la table `champion_tags` (`docs/02-modele-domaine-et-bdd.md`).
- Concept lié : [element-collection-map-attributs-dynamiques](element-collection-map-attributs-dynamiques.md).
