# Modélisation du Domaine (DDD) et Schéma de Base de Données

Ce document résume le modèle métier et relationnel validé à l'**Étape 1**.

---

## 1. Découpage en Domaines (*Package by Feature*)

```text
com.leagueplatform
 ├── champion/     (Agrégat Champion : Champion, ChampionStats, ChampionPassive, ChampionSpell, ChampionTag)
 ├── item/         (Agrégat Item : Item, ItemGold)
 ├── build/        (Jalon V1.1 : Build)
 ├── user/         (Jalon V1.1 : User)
 └── shared/       (Configuration, Exceptions RFC 9457, Synchronisation Data Dragon)
```

---

## 2. Diagramme Entité-Relation (Schéma SQL PostgreSQL)

```mermaid
erDiagram
    CHAMPIONS ||--o{ CHAMPION_SPELLS : "possède 4 sorts (Q,W,E,R)"
    CHAMPIONS ||--o{ CHAMPION_TAGS : "a 1 ou 2 rôles"
    ITEMS ||--o{ ITEM_COMPONENTS : "est fabriqué avec (from)"
    ITEMS ||--o{ ITEM_STATS : "donne des bonus"
    ITEMS ||--o{ ITEM_TAGS : "catégorisé par"
    USERS ||--o{ BUILDS : "crée (V1.1)"
    CHAMPIONS ||--o{ BUILDS : "utilisé dans (V1.1)"
    BUILDS ||--o{ BUILD_ITEMS : "contient max 6 objets (V1.1)"
    ITEMS ||--o{ BUILD_ITEMS : "équipe (V1.1)"

    CHAMPIONS {
        bigint id PK "Auto-incrémenté"
        varchar riot_id UK "Ex: Aatrox"
        integer riot_key UK "Ex: 266"
        varchar name "Ex: Aatrox"
        varchar title "Ex: Épée des Darkin"
        text lore "Histoire du champion"
        varchar image_full "Ex: Aatrox.png"
        varchar passive_name "Embedded ChampionPassive"
        text passive_description "Embedded ChampionPassive"
        varchar passive_image_full "Embedded ChampionPassive"
        double hp "Embedded ChampionStats (+14 autres stats)"
    }

    CHAMPION_SPELLS {
        bigint id PK
        bigint champion_id FK
        varchar spell_id "Ex: AatroxQ"
        varchar slot "Q, W, E ou R"
        varchar name
        text description
        varchar cooldown_burn "Ex: 14/12/10/8/6"
        varchar cost_burn "Ex: 0"
        varchar image_full
    }

    CHAMPION_TAGS {
        bigint champion_id FK
        varchar tag "FIGHTER, TANK, MAGE, ASSASSIN, MARKSMAN, SUPPORT"
    }

    ITEMS {
        bigint id PK "Auto-incrémenté"
        integer riot_id UK "Ex: 3031"
        varchar name "Ex: Lame d'infini"
        varchar plaintext "Résumé court"
        text description "Description complète"
        varchar image_full "Ex: 3031.png"
        integer gold_base "Embedded ItemGold"
        integer gold_total "Embedded ItemGold"
        integer gold_sell "Embedded ItemGold"
        boolean gold_purchasable "Embedded ItemGold"
    }

    ITEM_COMPONENTS {
        bigint item_id FK "Objet final (ex: 3031)"
        bigint component_id FK "Composant requis (peut se répéter)"
    }

    ITEM_STATS {
        bigint item_id FK
        varchar stat_key "Ex: FlatPhysicalDamageMod"
        double stat_value "Ex: 80.0"
    }

    ITEM_TAGS {
        bigint item_id FK
        varchar tag "Ex: Damage, CriticalStrike"
    }
```

---

## 3. Résumé des choix DDD & JPA (V1.0 + anticipation V1.1)

| Concept Métier | Nature DDD | Mapping JPA | Table SQL |
| :--- | :--- | :--- | :--- |
| **`Champion`** | Racine d'Agrégat (*Aggregate Root*) | `@Entity` (`id` `BIGINT` + `riotId` `UNIQUE`) | `champions` |
| **`ChampionStats`** | Objet-Valeur (*Value Object*) | `@Embeddable` / `@Embedded` | Colonnes dans `champions` |
| **`ChampionPassive`** | Objet-Valeur (*Value Object*) | `@Embeddable` / `@Embedded` | Colonnes dans `champions` |
| **`ChampionSpell`** | Entité enfant interne à `Champion` | `@Entity` (`@OneToMany(cascade = ALL, orphanRemoval = true)`) | `champion_spells` |
| **`ChampionTag`** | Valeur énumérée | `enum` + `@ElementCollection` (`EnumType.STRING`) | `champion_tags` |
| **`Item`** | Racine d'Agrégat (*Aggregate Root*) | `@Entity` (`id` `BIGINT` + `riotId` `UNIQUE`) | `items` |
| **`ItemGold`** | Objet-Valeur (*Value Object*) | `@Embeddable` / `@Embedded` | Colonnes dans `items` |
| **Recette (`from`)** | Relation vers d'autres `Item` | `@ManyToMany` avec `List<Item>` (autorise les doublons) | `item_components` |
| **Stats d'un `Item`** | Paires clé/valeur dynamiques | `@ElementCollection` avec `Map<String, Double>` | `item_stats` |
| **`User` & `Build` (V1.1)** | Racines d'Agrégat | `Build` pointera vers `champions(id)` et `items(id)` | `users`, `builds`, `build_items` |

