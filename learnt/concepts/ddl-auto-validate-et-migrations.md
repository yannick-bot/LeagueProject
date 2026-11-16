# `ddl-auto=validate` avec un outil de migration (Liquibase, Flyway)

## 1. Le concept en une phrase

Quand un outil de migration versionné gère le schéma, il est la **seule source de vérité** : Hibernate est réglé sur `validate`, il ne modifie jamais la base et vérifie seulement au démarrage que les entités correspondent aux tables.

## 2. Le problème qu'il résout

Avec `update` ou `create-drop`, Hibernate modifie le schéma dans le dos de l'outil de migration :
- les environnements divergent (dev, test, prod n'ont plus le même schéma) ;
- `update` ne sait pas tout faire (renommer une colonne, migrer des données) et peut laisser la base dans un état incohérent ;
- les modifications ne sont ni versionnées ni relues.

## 3. Explication simple et analogie

Un chantier avec un seul architecte (l'outil de migration) qui tient les plans. Hibernate est l'inspecteur : il vérifie que le bâtiment correspond aux plans, mais n'a pas le droit de casser un mur. S'il trouve un écart, le chantier s'arrête (fail-fast).

## 4. Exemple minimal générique

```properties
spring.jpa.hibernate.ddl-auto=validate
spring.liquibase.change-log=classpath:db/changelog/db.changelog-master.xml
```

Si l'entité `Order` déclare un champ `status` absent de la table `orders`, l'application refuse de démarrer, avec un message qui nomme la colonne manquante.

## 5. Pièges et idées fausses

- `validate` vérifie les tables, les colonnes et les types, pas tout : par exemple, une contrainte `UNIQUE` ou un index manquant ne bloque pas le démarrage. Les contraintes doivent être écrites dans les migrations.
- Ne jamais modifier une migration **déjà appliquée** : on en écrit une nouvelle. L'outil détecte la modification (somme de contrôle) et refuse de démarrer.
- `none` (aucune vérification) prive de la détection précoce des écarts.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Projet avec Liquibase ou Flyway | `validate` | Fail-fast, une seule source de vérité |
| Prototype jetable, base en mémoire | `create-drop` acceptable | Pas de données à préserver |
| Production sans outil de migration | À éviter : ajouter un outil de migration | `update` n'est pas fiable en production |

## 7. Ma reformulation validée

> À écrire : reformule ce concept avec tes mots (rappel actif).

## 8. Rencontré dans

- Projet LeaguePlatform : choix de Liquibase en XML (`docs/00-cadrage.md`, décision n°6).
