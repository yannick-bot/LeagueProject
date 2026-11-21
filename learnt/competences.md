# Grille de compétences : LeaguePlatform API

> Tenue par le mentor avec l'apprenant. Une notion ne monte de niveau qu'avec une preuve. Initialisée le 2026-11-13 à partir des 7 fiches existantes, découpées en 14 concepts.

## Les 4 niveaux

| Niveau | Critère vérifiable | Aide du mentor |
| :--- | :--- | :--- |
| 1. Découvert | La notion a été expliquée | Il montre, sur un exemple générique |
| 2. Compris | La reformulation de l'apprenant a été validée | Vous raisonnez ensemble |
| 3. Appliqué | L'apprenant l'a codée lui-même dans le projet (preuve : PR) | Indices par paliers |
| 4. Maîtrisé | Réutilisée sans aide dans un autre contexte, quiz réussi, **et** défi de maîtrise réussi | Aucune aide, revue seulement |

## Grille

| Notion | Type | Niveau | Depuis le | Preuve | Fiche |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Package by Feature | Fondateur | Compris | avant le 2026-11-06 | Reformulation validée | [fiche](concepts/package-by-feature.md) |
| Service propriétaire du repository | Fondateur | Compris | avant le 2026-11-06 | Reformulation validée | [fiche](concepts/service-proprietaire-du-repository.md) |
| Clé primaire vs contrainte UNIQUE | Découvrable | Compris | avant le 2026-11-06 | Reformulation validée | [fiche](concepts/cle-primaire-vs-contrainte-unique.md) |
| Upsert par clé métier | Fondateur | Compris | 2026-11-17 | Reformulation agnostique validée | [fiche](concepts/upsert-par-cle-metier.md) |
| `@ElementCollection` et 1NF | Découvrable | Compris | avant le 2026-11-06 | Reformulation validée | [fiche](concepts/element-collection-et-1nf.md) |
| Codes HTTP d'erreur | Découvrable | Compris | 2026-11-17 | Reformulation agnostique validée | [fiche](concepts/codes-http-erreurs-client-et-serveur.md) |
| Value Object et `@Embeddable` | Découvrable | Découvert | avant le 2026-11-06 | Expliqué | [fiche](concepts/embeddable-value-object.md) |
| Racine d'agrégat | Fondateur | Découvert | avant le 2026-11-06 | Expliqué | [fiche](concepts/aggregate-root.md) |
| Relation avec doublons (`List` vs `Set`) | Fondateur | Découvert | avant le 2026-11-06 | Expliqué | [fiche](concepts/relation-avec-doublons-list-vs-set.md) |
| Attributs dynamiques (`Map` en `@ElementCollection`) | Découvrable | Découvert | avant le 2026-11-06 | Expliqué | [fiche](concepts/element-collection-map-attributs-dynamiques.md) |
| `ProblemDetail` (RFC 9457) | Découvrable | Appliqué | 2026-11-21 | PR #2 (`GlobalExceptionHandler`, `application.properties`) | [fiche](concepts/problemdetail-rfc-9457.md) |
| BOM Maven | Découvrable | Appliqué | 2026-11-21 | PR #2 (`backend/pom.xml`, dépendance `springdoc` hors BOM) | [fiche](concepts/bom-maven-gestion-des-versions.md) |
| `ddl-auto=validate` et migrations | Découvrable | Appliqué | 2026-11-21 | PR #2 (`application.properties`, `db.changelog-master.xml`) | [fiche](concepts/ddl-auto-validate-et-migrations.md) |
| Testcontainers (3 briques) | Découvrable | Appliqué | 2026-11-21 | PR #2 (`LeaguePlatformApplicationTests`, `pom.xml`) | [fiche](concepts/testcontainers-tests-integration.md) |

## Notions fragiles (à retravailler en rappel actif)

- 8 notions sans reformulation validée (niveau Découvert) : à reformuler au moment où elles serviront dans le code.
