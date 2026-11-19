# BOM Maven et gestion centralisée des versions

## 1. Le concept en une phrase

Un BOM (Bill of Materials), comme celui embarqué par `spring-boot-starter-parent`, est un catalogue de versions de dépendances testées ensemble : pour toute dépendance qu'il gère, on n'écrit pas de `<version>`.

## 2. Le problème qu'il résout

Sans catalogue central, chaque dépendance a sa version écrite à la main. Au moment de monter de version, on en oublie, et on obtient des combinaisons incompatibles (erreurs `NoSuchMethodError`, `ClassNotFoundException` au démarrage).

## 3. Explication simple et analogie

Un menu à prix fixe : le chef a déjà choisi des plats qui vont ensemble. Si tu changes de menu (nouvelle version du parent), tout le repas change d'un coup, de façon cohérente. Commander à la carte (versions manuelles), c'est risquer un dessert qui ne va pas avec le plat.

## 4. Exemple minimal générique

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>X.Y.Z</version>
</parent>

<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>   <!-- pas de <version> : gérée par le BOM -->
</dependency>
```

Sans parent Spring Boot, on importe le BOM dans `<dependencyManagement>` avec `<scope>import</scope>`.

## 5. Pièges et idées fausses

- **"Version manquante" sur une dépendance** : souvent, l'artefact n'est pas (ou plus) dans le catalogue, parce qu'il a été **renommé**. Exemple : Testcontainers 2.x a préfixé ses modules (`postgresql` est devenu `testcontainers-postgresql`), et c'est cette version que gère Spring Boot 4.
- Forcer une `<version>` sur une dépendance gérée casse la cohérence du catalogue. Si c'est vraiment nécessaire, on surcharge la **propriété** de version prévue par le BOM et on documente pourquoi.
- Pour voir la version réellement résolue : `mvn dependency:tree`.

## 6. Quand l'utiliser, quand ne pas l'utiliser

| Situation | Choix | Pourquoi |
| :--- | :--- | :--- |
| Dépendance gérée par le BOM | Pas de `<version>` | Montées de version cohérentes |
| Dépendance absente du BOM | `<version>` explicite | Rien ne la gère |
| Correctif de sécurité urgent sur une dépendance gérée | Surcharger la propriété de version | Ciblé, documenté, réversible |

## 7. Ma reformulation validée

> Un BOM Maven est un catalogue central des dépendances gérées et de leurs versions compatibles testées ensemble pour une version donnée du parent (comme Spring Boot). Les dépendances présentes dans le BOM n'ont pas besoin de `<version>`, alors qu'une dépendance externe qui n'y figure pas (comme Springdoc) doit préciser sa `<version>` explicitement.

## 8. Rencontré dans

- Projet LeaguePlatform : `../../backend/pom.xml` (Spring Boot 4.1.1, dépendances Testcontainers).
