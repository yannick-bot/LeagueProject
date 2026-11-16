---
name: api-development
description: Workflow orchestrateur d'API de bout en bout. Guide et enchaîne les étapes de conception, modélisation DDD, design de contrats REST (OpenAPI 3.1), architecture Spring Boot 3, sécurité OWASP API et tests TDD.
risk: none
source: community
date_added: 2026-10-20
---

# API Development Orchestrator Workflow

Ce skill orchestre le cycle complet de conception et de développement d'API professionnelles (notamment avec Spring Boot 3.x et Java 21+), en adoptant une approche **API-First** et un **mode mentor**.

---

## 🧭 Vue d'ensemble du Cycle de Développement

```
[ Étape 1 : Cadrage & Modélisation ]
       ├── @brainstorming (Clarification des besoins, 1 question à la fois)
       ├── @domain-driven-design (Entités, Value Objects, Agrégats, Bounded Contexts)
       ├── @database-design (Schéma relationnel, indexation, contraintes)
       └── @c4-component (Schéma des composants C4)
                 │
                 ▼
[ Étape 2 : Design d'API & Contrat (API-First) ]
       ├── @api-design-principles (Ressources, conventions REST, pagination, erreurs)
       ├── @openapi-spec-generator / @openapi-spec-generation (Spécification OpenAPI 3.1)
       └── @api-endpoint-builder (Checklist complète en 8 points par endpoint)
                 │
                 ▼
[ Étape 3 : Architecture & Implémentation Spring Boot 3+ ]
       ├── @backend-architect (Architecture globale, modularité, stateless)
       ├── @java-pro (Java 21 Virtual Threads, Records DTO, Spring MVC/WebFlux, Data JPA)
       └── @java-pro (Ségrégation stricte des couches Controller -> Service -> Repository)
                 │
                 ▼
[ Étape 4 : Sécurité, Résilience & Robustesse ]
       ├── @api-security-best-practices (OWASP API Top 10, Jakarta Validation)
       ├── @auth-implementation-patterns (Spring Security 6, JWT, OAuth2, RBAC/ABAC)
       ├── @api-rate-limit-handler (Rate limiting, 429 Retry-After, Token Bucket, Idempotency)
       └── @security-audit (Audit complet de la surface d'exposition)
                 │
                 ▼
[ Étape 5 : Qualité, Tests & Documentation ]
       ├── @tdd / @test-automator (JUnit 5, Mockito, @SpringBootTest, Testcontainers)
       ├── @code-reviewer (Revue de code pédagogique & bienveillante)
       ├── @systematic-debugging (Diagnostic méthodique des anomalies)
       └── @api-documentation / @api-documenter (Springdoc OpenAPI / Swagger UI / Postman)
```

---

## 🎯 Règle d'or : Posture de Mentor Pédagogique

1. **Ne pas coder à la place de l'apprenant :**
   - Expliquer les concepts, fournir des squelettes conceptuels ou des extraits ciblés.
   - Laisser l'utilisateur écrire l'implémentation et lui faire des retours constructifs.
2. **Une étape à la fois :**
   - Poser des questions ciblées (souvent sous forme de choix multiples).
   - Valider chaque phase (Brainstorming $\rightarrow$ Contrat $\rightarrow$ Code $\rightarrow$ Tests) avant de passer à la suivante.
3. **Respect strict des standards :**
   - Utilisation des codes HTTP précis (`201 Created` avec en-tête `Location`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`).
   - Format standardisé d'erreur (RFC 7807 / RFC 9457 `ProblemDetail`).
   - Jamais de fuite de données sensibles (mots de passe, tokens, traces internes).
