# Upsert par clé métier lors d'une synchronisation externe

## 1. Le concept en une phrase

Pour synchroniser des données venues d'un système externe, on cherche d'abord l'enregistrement par sa **clé métier**, puis on le met à jour s'il existe ou on le crée sinon (upsert), au lieu de tout supprimer ou de tout réinsérer.

## 2. Le problème qu'il résout

Les données externes ne connaissent pas notre clé primaire technique. Deux approches naïves échouent :
- **Tout supprimer puis réinsérer** : impossible si d'autres tables référencent ces lignes (violation de clé étrangère), et on perd les identifiants internes.
- **`save(new Product(...))` à chaque import** : JPA décide `INSERT` ou `UPDATE` uniquement d'après le champ `@Id`. Un objet neuf a `id == null`, donc JPA fait un `INSERT`, qui viole la contrainte `UNIQUE` de la clé métier dès le deuxième import.

## 3. Explication simple et analogie

Mettre à jour un carnet d'adresses à partir d'une nouvelle liste : pour chaque personne, on cherche d'abord sa fiche par son nom. Si elle existe, on corrige l'adresse ; sinon, on crée une fiche. On ne jette pas le carnet pour le réécrire.

## 4. Exemple minimal générique

```java
Product product = productRepository.findByExternalRef(dto.ref())
        .orElseGet(Product::new);   // trouvé : id rempli (UPDATE) ; sinon id null (INSERT)

product.updateFrom(dto);            // la méthode métier de l'entité applique les changements
productRepository.save(product);
```

## 5. Pièges et idées fausses

- Avec Spring Data JPA, la violation de contrainte remonte en général sous forme de `DataIntegrityViolationException`.
- **Concurrence** : deux imports simultanés peuvent tous deux ne rien trouver et tenter un `INSERT`. La contrainte `UNIQUE` protège la base ; il faut traiter l'exception ou sérialiser les imports.
- **Volume** : un `SELECT` par ligne coûte cher sur des milliers d'éléments. On charge alors toutes les clés existantes en une requête, ou on utilise l'upsert natif de la base (`INSERT ... ON CONFLICT ... DO UPDATE` en PostgreSQL).
- Les éléments disparus de la source ne sont pas traités par l'upsert : il faut décider explicitement (suppression, désactivation, conservation).

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Synchronisation régulière depuis une source externe | Upsert par clé métier | Identifiants internes et références préservés |
| Import massif, performance critique | Upsert natif SQL (`ON CONFLICT`) | Une requête au lieu de deux par ligne |
| Table de cache sans aucune référence entrante | Remplacement complet possible | Rien ne dépend des identifiants |

## 7. Ma reformulation validée

> Les données importées n'ont pas notre `id` technique : si l'on enregistre un nouvel objet sans vérification, son `id` est absent, donc JPA fait un `INSERT` au lieu d'un `UPDATE` (et déclenche une erreur sur la contrainte `UNIQUE`). Pour corriger, il faut vérifier par rapport à une clé métier commune : si cet identifiant est présent dans notre base, on met à jour l'entité existante (`UPDATE`), sinon on en crée une nouvelle (`INSERT`).

## 8. Rencontré dans

- Projet LeaguePlatform : synchronisation Data Dragon (`POST /api/v1/admin/sync`), `docs/03-contrat-api-v1.md`.
- Concept lié : [cle-primaire-vs-contrainte-unique](cle-primaire-vs-contrainte-unique.md).
