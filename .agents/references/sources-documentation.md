# Apprendre à chercher : carte des sources

> **Copie commune aux deux kits** (apprentissage backend et contribution open source). Toute modification doit être reportée à l'identique dans l'autre kit. Liens vérifiés le 2026-11-22.

Un bon développeur ne retient pas tout : il sait **où** chercher, **quelle** source croire, et **comment** lire une documentation pour trouver vite. C'est une compétence de la grille (domaine "Chercher"), qui se travaille comme les autres.

## Les pistes du mentor, dosées selon la grille

Quand le mentor confie une tâche (configurer, implémenter, corriger), il donne une piste de recherche **avant** que l'apprenant commence. Plus la notion est haute dans la grille, moins il en dit :

| Niveau de la notion | Piste donnée |
| :--- | :--- |
| Découvert | Le lien exact vers la bonne page, dans la bonne version |
| Compris | Le nom de la documentation et de la section ("l'annexe des propriétés de Spring Boot, partie Data") |
| Appliqué | La question seule : "quelle documentation consulterais-tu, et dans quelle version ?" |
| Maîtrisé | Rien : l'apprenant cherche seul |

Le niveau de référence est celui de la compétence "Chercher" pour cet outil, s'il existe dans la grille, sinon celui de la notion travaillée. Le mentor vérifie toujours lui-même la page avant de la donner.

## Les cinq étapes d'une recherche

1. **Trouver la version utilisée** : `pom.xml`, `build.gradle`, `package.json`, tag d'image dans le fichier Compose, `java -version`. Sans la version, on ne sait pas quelle page croire.
2. **Choisir le type de document** (tableau ci-dessous) selon la question.
3. **Chercher dans la documentation** : la recherche du site, puis `Ctrl+F` dans la page (les annexes de référence sont longues).
4. **Vérifier la version de la page** : beaucoup de sites affichent par défaut la dernière version, qui n'est pas forcément celle du projet.
5. **Noter la source** : la colonne "Où j'ai trouvé" du mémo ou le champ du journal (rule des erreurs).

## Les types de documents

| Type | Sert à | Comment le lire |
| :--- | :--- | :--- |
| **Guide**, tutoriel | Comprendre un sujet, suivre un exemple | En entier, une fois |
| **Référence** (annexe des propriétés, référence du fichier Compose, Javadoc) | Trouver la valeur, la clé ou la signature exacte | Par recherche ciblée, jamais en entier |
| **How-to** | Répondre à une question précise ("comment faire X ?") | La section qui correspond |
| **Notes de version**, **guide de migration** | Comprendre ce qui a changé entre deux versions | Quand "ça marchait avant", ou quand un exemple ne fonctionne plus |
| **Code source**, tests du projet | Voir comment c'est réellement fait | Quand la documentation ne suffit pas |
| **Issues**, forums, Stack Overflow, articles | Trouver un cas déjà rencontré | Toujours vérifier la **date** et la **version** ; confirmer dans la documentation officielle |
| **Réponse d'une IA** | Une piste | Jamais une source : on la vérifie dans la documentation officielle |

## Juger une source : la liste de contrôle

- [ ] Est-ce la documentation **officielle** de l'outil (et du bon produit) ?
- [ ] Est-elle dans **la version** du projet ?
- [ ] Est-ce le bon **type** de document pour ma question ?
- [ ] Pour une source non officielle : quelle date, quelle version, et est-ce confirmé ailleurs ?

## La carte, par outil

| Outil | Où lire la version utilisée | Documentation officielle | À connaître |
| :--- | :--- | :--- | :--- |
| Java | `pom.xml` (`java.version`), `java -version` | API Java 21 : https://docs.oracle.com/en/java/javase/21/docs/api/index.html | Remplacer `21` par la version du projet |
| Spring Boot | `pom.xml` (parent `spring-boot-starter-parent`) | Référence : https://docs.spring.io/spring-boot/reference/ | **Sélecteur de version** sur le site ; une version précise s'obtient par `https://docs.spring.io/spring-boot/<majeure.mineure>/...` (par exemple `4.1`). Le site affiche par défaut la dernière version |
| Spring Boot : propriétés | idem | Annexe des propriétés : https://docs.spring.io/spring-boot/appendix/application-properties/index.html | Toutes les clés `spring.*`, par famille (Data, Web...) ; à lire par `Ctrl+F` |
| Spring Boot : questions pratiques | idem | How-to : https://docs.spring.io/spring-boot/how-to/index.html | Accès aux données, tests, Docker Compose... |
| Spring Boot : changements | idem | Notes de version (wiki) : https://github.com/spring-projects/spring-boot/wiki | Notes de version par branche ; guides de migration à chercher depuis la page d'accueil du wiki |
| Spring Data JPA | `pom.xml` (version gérée par Spring Boot) | https://docs.spring.io/spring-data/jpa/reference/ | Sélecteur de version |
| Hibernate | `mvn dependency:tree`, ou la version gérée par Spring Boot | https://docs.hibernate.org/orm/ | Un dossier par version ; le guide utilisateur est à l'intérieur (chemin à confirmer au premier usage) |
| PostgreSQL | Tag de l'image dans le fichier Compose | https://www.postgresql.org/docs/ | Une version précise : `https://www.postgresql.org/docs/<version>/index.html` |
| Docker Compose | `docker compose version` | Référence du fichier Compose : https://docs.docker.com/reference/compose-file/ | `services`, `ports`, `environment`, `volumes`... |
| Liquibase | `pom.xml` (`liquibase-core`) | Version Community : https://docs.liquibase.com/community | **Piège** : la page d'accueil `docs.liquibase.com` présente le produit commercial (Liquibase Secure) ; pour les changelogs, partir de la page "Manage Liquibase Changelogs" de la version Community |
| Testcontainers | `pom.xml` | https://java.testcontainers.org/ | Modules par base de données |
| Maven | `mvn -v` | Guides : https://maven.apache.org/guides/index.html | Modules multiples, version de Java ciblée |
| Git | `git --version` | https://git-scm.com/docs | Voir aussi la fiche `outils/git.md` si elle existe dans le kit |
| GitHub | | https://docs.github.com/ | Recherche, PR, forks ; fiche `outils/github.md` si elle existe |

Quand un nouvel outil entre dans un projet, on ajoute sa ligne ici, après avoir vérifié le lien.
