# Relation avec doublons : `List` vs `Set` (et quand préférer une entité d'association)

## 1. Le concept en une phrase

Quand une association peut légitimement contenir **plusieurs fois le même élément**, un `Set` perd des données parce qu'il élimine les doublons : il faut une `List`, ou mieux, une entité d'association avec une quantité.

## 2. Le problème qu'il résout

Une recette qui demande deux fois le même ingrédient, un kit qui contient deux fois la même pièce : avec un `Set<Part>`, le deuxième exemplaire disparaît silencieusement. Côté base, une clé primaire sur le couple `(kit_id, part_id)` refuserait aussi le doublon.

## 3. Explication simple et analogie

Une liste de courses : "2 baguettes" est une information. Un `Set`, c'est comme un tampon "déjà noté" : la deuxième baguette est rayée, et tu rentres avec une seule.

## 4. Exemple minimal générique

```java
// Option 1 : List en @ManyToMany (la table de jointure n'a pas de contrainte d'unicité)
@ManyToMany
@JoinTable(name = "kit_parts",
        joinColumns = @JoinColumn(name = "kit_id"),
        inverseJoinColumns = @JoinColumn(name = "part_id"))
private List<Part> parts = new ArrayList<>();

// Option 2 (souvent meilleure) : une entité d'association avec la quantité
@Entity
class KitPart {
    @ManyToOne private Kit kit;
    @ManyToOne private Part part;
    private int quantity;           // "2 x cette pièce" devient explicite
}
```

## 5. Pièges et idées fausses

- **`List` sans `@OrderColumn` = "bag" pour Hibernate** : à chaque modification, Hibernate peut supprimer toutes les lignes de la table de jointure puis les réinsérer.
- On ne peut pas charger **deux bags** dans la même requête (`MultipleBagFetchException`).
- Les doublons implicites cachent une information métier : "deux fois la même pièce" est en réalité une **quantité**. L'entité d'association la rend explicite et permet d'y ajouter des attributs (position, prix).

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Doublons impossibles par nature | `Set` | Sémantique juste, pas de bag |
| Doublons possibles, aucune autre information | `List` en `@ManyToMany` | Simple, conserve les doublons |
| Doublons = quantité, ou attributs sur le lien | Entité d'association | Modèle explicite, plus performant |

## 7. Ma reformulation validée

> À écrire : reformule ce concept avec tes mots (rappel actif).

## 8. Rencontré dans

- Projet LeaguePlatform : recettes d'objets (`from`) et table `item_components` (`docs/02-modele-domaine-et-bdd.md`).
