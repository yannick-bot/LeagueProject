# Tests d'intégration avec Testcontainers (les 3 briques)

## 1. Le concept en une phrase

Testcontainers démarre une vraie base de données (ou un autre service) dans un conteneur Docker jetable pour les tests d'intégration ; avec Spring Boot, trois briques collaborent : le conteneur, le cycle de vie JUnit, et le câblage automatique de la connexion.

## 2. Le problème qu'il résout

Tester contre une base en mémoire (H2) qui n'est pas celle de production produit de faux positifs et de faux négatifs : syntaxe SQL différente, types, contraintes, fonctions spécifiques (`jsonb`, `ON CONFLICT`...). Un test qui passe sur H2 peut échouer en production.

## 3. Explication simple et analogie

Une répétition générale dans la vraie salle de spectacle, montée pour l'occasion et démontée juste après, plutôt qu'une répétition dans un garage qui "ressemble" à la salle.

## 4. Exemple minimal générique

| Dépendance (`scope test`) | Rôle | Ce qu'elle fournit |
| :--- | :--- | :--- |
| `org.testcontainers:testcontainers-postgresql` | Le conteneur : télécharge et configure l'image `postgres` | La classe `PostgreSQLContainer` |
| `org.testcontainers:testcontainers-junit-jupiter` | Le cycle de vie : démarre le conteneur avant les tests, l'arrête après | `@Testcontainers`, `@Container` |
| `org.springframework.boot:spring-boot-testcontainers` | Le câblage : injecte dans Spring l'URL du conteneur (port aléatoire) | `@ServiceConnection` |

```java
@SpringBootTest
@Testcontainers
class OrderRepositoryIT {

    @Container
    @ServiceConnection
    static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:16-alpine");

    // les @Test tournent sur un vrai PostgreSQL
}
```

## 5. Pièges et idées fausses

- **Testcontainers 2.x** (utilisé par Spring Boot 4) a renommé ses modules (`testcontainers-postgresql`) et réorganisé ses packages : vérifie l'import de `PostgreSQLContainer` (ancien `org.testcontainers.containers`, nouveau `org.testcontainers.postgresql`).
- Docker doit tourner sur la machine et dans la CI.
- Démarrer un conteneur par classe de test est lent : on partage un conteneur entre les classes (champ `static` dans une classe de base, ou configuration `@TestConfiguration` avec `@ServiceConnection`), et on profite du cache de contexte Spring.
- Le port est aléatoire : ne jamais coder `localhost:5432` en dur dans les tests.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Requêtes, mappings JPA, migrations, contraintes | Testcontainers | Parité totale avec la production |
| Logique métier pure (sans base) | Test unitaire (JUnit, Mockito) | Rapide, pas besoin d'infrastructure |
| Couche web seule | `@WebMvcTest` | Contexte réduit, pas de base |

## 7. Ma reformulation validée

> À écrire : reformule ce concept avec tes mots (rappel actif).

## 8. Rencontré dans

- Projet LeaguePlatform : choix de Testcontainers plutôt que H2 (`docs/00-cadrage.md`, décision n°5), dépendances du `../../backend/pom.xml`.
- Concept lié : [bom-maven-gestion-des-versions](bom-maven-gestion-des-versions.md).
