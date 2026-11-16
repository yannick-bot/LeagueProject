# Clé primaire vs contrainte `UNIQUE` (clé technique et clé métier)

## 1. Le concept en une phrase

Une table a **une seule** clé primaire (l'identifiant officiel d'une ligne, cible des clés étrangères), mais peut avoir **autant de contraintes `UNIQUE`** que nécessaire pour interdire les doublons sur d'autres colonnes, comme une clé métier.

## 2. Le problème qu'il résout

On veut à la fois :
- un identifiant technique stable, court et indépendant du métier (`id BIGINT` auto-généré) ;
- la garantie qu'une donnée métier n'existe qu'une fois (un e-mail, un numéro de commande, un identifiant fourni par un système externe).

Sans contrainte `UNIQUE`, rien n'empêche deux clients avec le même e-mail.

## 3. Explication simple et analogie

Dans une école, chaque élève a un numéro d'inscription interne (clé primaire) : c'est lui qu'on utilise partout dans les dossiers. Son numéro de sécurité sociale est aussi unique (contrainte `UNIQUE`), mais ce n'est pas l'identifiant de référence de l'école.

## 4. Exemple minimal générique

```java
@Entity
class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                 // LA clé primaire (technique)

    @Column(nullable = false, unique = true)
    private String email;            // clé métier : contrainte UNIQUE

    @Column(nullable = false, unique = true)
    private String externalRef;      // identifiant d'un système externe : UNIQUE aussi
}
```

## 5. Pièges et idées fausses

- "Plusieurs colonnes uniques = plusieurs clés primaires" : faux. `PRIMARY KEY` = `NOT NULL` + `UNIQUE` + rôle d'identifiant officiel, et il n'y en a qu'une.
- Utiliser une clé métier comme clé primaire : si elle change (un e-mail, un code produit), toutes les clés étrangères doivent suivre.
- Avec Liquibase ou Flyway, `unique = true` dans l'entité ne crée rien : la contrainte doit exister dans la migration.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Identifiant de référence des relations | Clé primaire technique | Stable, jamais modifiée |
| Donnée métier qui ne doit jamais être dupliquée | Contrainte `UNIQUE` | La base garantit l'invariant |
| Identifiant fourni par un système externe | `UNIQUE`, pas clé primaire | On ne contrôle pas son évolution |

## 7. Ma reformulation validée

> `PRIMARY KEY` définit la colonne qui sert d'identifiant unique d'un tuple dans la table (une seule par table), alors que `UNIQUE` est une contrainte d'unicité qui garantit simplement qu'il n'y a pas de doublon dans une colonne donnée.

## 8. Rencontré dans

- Projet LeaguePlatform : tables `champions` et `items` (`id` technique + `riot_id` unique), `docs/02-modele-domaine-et-bdd.md`.
- Concept lié : [upsert-par-cle-metier](upsert-par-cle-metier.md).
