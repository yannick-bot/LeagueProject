# Outils du GitHub Student Developer Pack

Référence utilisée par `parcours-demarrer-projet` pour choisir les outils d'un projet. Sélection faite par l'apprenant le 2026-11-13, classée par thème du point de vue d'un backend Java.

**Les offres changent** : avant d'intégrer un outil, vérifie l'offre actuelle sur https://education.github.com/pack.

**Principe** : un outil arrive **quand le projet en a besoin**, rattaché à un jalon, comme un concept découvrable. On ne l'installe pas "parce qu'il est dans le Pack". Quand deux outils font la même chose, l'apprenant compare et justifie son choix dans un ADR.

Le suivi des outils déjà utilisés se fait dans le carnet NotebookLM central (via le cadrage de chaque projet).

## Outils retenus, par thème

| Thème | Outil | Offre (telle que relevée) | Concept backend enseigné | Moment typique |
| :--- | :--- | :--- | :--- | :--- |
| Déploiement / cloud | Microsoft Azure | Plus de 25 services gratuits + 100 $ de crédits | Déploiement, conteneurs, services managés | Jalon "mise en ligne" |
| Déploiement / cloud | Heroku | 13 $ de crédits par mois pendant 24 mois | Déploiement simple, variables d'environnement, Postgres managé | Jalon "mise en ligne" |
| Cloud local | LocalStack | Émulation des services AWS en local | S3, SQS, intégration cloud testable (avec Testcontainers) | Fichiers ou messagerie asynchrone |
| Observabilité | Datadog | Monitoring d'infrastructure | Métriques, traces, logs (Actuator, Micrometer, OpenTelemetry) | Après le déploiement |
| Observabilité | New Relic | Plateforme d'observabilité | Idem, à comparer avec Datadog | Après le déploiement |
| Suivi d'erreurs | Sentry | Suivi des erreurs | Capture des exceptions en production, alertes | Après le déploiement |
| Suivi d'erreurs | Honeybadger | Suivi des erreurs | Idem, à comparer avec Sentry | Après le déploiement |
| CI/CD | Travis CI | Intégration continue | Pipeline de build et de tests | Dès la première fonctionnalité |
| Qualité | CodeScene | Analyse de code, dette technique, revue automatisée de PR | Quality gates, dette technique | Quand le code grossit |
| Qualité | Codecov | Couverture de code | Couverture de tests dans la CI | Avec les premiers tests |
| Secrets | Doppler | Gestion des secrets du local à la production | Configuration par environnement, zéro secret dans Git | Premier secret (clé d'API, BDD distante) |
| Authentification | Clerk | Authentification, gestion des utilisateurs | Fournisseur d'identité externe, OAuth2 Resource Server | **Après** avoir fait l'authentification JWT à la main avec Spring Security |
| Paiement | Stripe | Paiement en ligne | Webhooks, idempotence, signatures, cohérence | Jalon "paiement" |
| Feature flags | DevCycle | Gestion de feature flags | Déployer sans activer, déploiement progressif | Nouvelle règle métier risquée |
| Feature flags | ConfigCat | Feature flags (à confirmer) | Idem, à comparer avec DevCycle | Nouvelle règle métier risquée |
| Tests | testmail.app | Plan Essential gratuit pendant les études | Tests des flux d'e-mails (inscription, confirmation, reset) | Premier e-mail envoyé |
| Tests d'API | Requestly | Interception et simulation de requêtes HTTP | Simuler les pannes et réponses d'API tierces | Intégration d'une API externe |
| Base de données | MongoDB Atlas | 50 $ de crédits + Compass + MongoDB University (certification gratuite) | NoSQL, Spring Data MongoDB, choix SQL vs document | Projet où le modèle document a du sens |
| Données | Blockchair | 100 000 requêtes gratuites (accès via le compte GitHub) | Intégration d'API tierce, données blockchain | Projet finance / crypto |
| Données | Carto | Analyse et visualisation de données spatiales | Données géospatiales | Projet logistique |
| Se former | DataCamp | 3 mois d'accès gratuit | Cours en ligne orientés data (SQL notamment) | En complément, sur un besoin précis |
| Se former | MongoDB University | Inclus dans l'offre MongoDB | Certification MongoDB | Avec MongoDB Atlas |

## Écartés pour l'instant (hors périmètre backend)

- **Front-end ou JavaScript** : BrowserStack, LambdaTest, Polypane, DeepScan.
- **Analytics web ou mobile** : Simple Analytics, AppFigures.
- **Data science ou scraping** : Camber, Deepnote, Scrapy Cloud (Zyte).
- **Usage personnel** : 1Password, Dashlane.
- **Sécurité de site web** : Astra Security.
- **Backend clé en main** : Appwrite (il ferait concurrence à Spring au lieu de le compléter).
- **À garder en tête** : Vaadin, un framework pour écrire une interface web en pur Java, intégré à Spring Boot. Utile si un projet a un jour besoin d'un front sans quitter Java.
- **Blackfire.io** (profilage de performance) : vérifier s'il prend en charge Java avant de l'envisager.
