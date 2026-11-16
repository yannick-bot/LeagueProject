# Racine d'agrégat (Aggregate Root) et entités enfants

## 1. Le concept en une phrase

Un agrégat est un groupe d'objets qui doit rester cohérent comme un tout ; sa **racine** est la seule porte d'entrée : on ne crée, ne modifie et ne supprime les entités enfants qu'à travers elle.

## 2. Le problème qu'il résout

Si n'importe quel code peut modifier directement une entité enfant (une ligne de commande, par exemple), personne ne garantit les règles qui portent sur l'ensemble ("le total de la commande = somme des lignes", "une commande payée ne change plus"). Les invariants deviennent impossibles à protéger.

## 3. Explication simple et analogie

Une voiture et ses roues. On n'achète pas, ne répare pas et ne vend pas une roue "de la voiture" indépendamment : on passe par le garage qui s'occupe de la voiture. La voiture est la racine, les roues sont des enfants.

## 4. Exemple minimal générique

```java
@Entity
class Order {                                   // racine d'agrégat
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderLine> lines = new ArrayList<>();

    public void addLine(Product product, int quantity) {
        // l'invariant est vérifié ICI, dans la racine
        if (status == OrderStatus.PAID) throw new IllegalStateException("Commande payée");
        lines.add(new OrderLine(this, product, quantity));
    }
}
```

Conséquence en JPA : un seul repository, celui de la racine (`OrderRepository`). Pas de `OrderLineRepository`.

## 5. Pièges et idées fausses

- **Les invariants définissent les frontières** : un agrégat contient ce qui doit être cohérent dans une même transaction, pas "tout ce qui est lié".
- Un agrégat trop gros (une commande qui contiendrait le client et tout le catalogue) devient lent et source de conflits. Entre agrégats, on se référence par identifiant.
- Des setters publics sur les enfants contournent la racine : les modifications passent par des méthodes métier de la racine.
- `orphanRemoval = true` supprime en base un enfant retiré de la collection : c'est voulu pour un enfant d'agrégat, dangereux ailleurs.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| L'enfant n'a pas de sens sans le parent et partage ses règles | Enfant de l'agrégat, `cascade` + `orphanRemoval` | Cohérence garantie par la racine |
| L'objet a son propre cycle de vie, est utilisé ailleurs | Agrégat séparé, référencé par identifiant | Indépendance, transactions plus petites |

## 7. Ma reformulation validée

> À écrire : reformule ce concept avec tes mots (rappel actif).

## 8. Rencontré dans

- Projet LeaguePlatform : `Champion` (racine) et ses `ChampionSpell` (`docs/02-modele-domaine-et-bdd.md`).
- Concepts liés : [embeddable-value-object](embeddable-value-object.md), [service-proprietaire-du-repository](service-proprietaire-du-repository.md).
