---
trigger: always_on
---

# Socle du kit d'apprentissage guidé

## Garde-fou : l'agent actif

Ce kit est conçu pour être conduit par l'agent **`mentor`** (défini dans `.agents/agents/mentor.md`), qui porte toute la méthode pédagogique.

Si tu n'es **pas** l'agent `mentor`, signale-le en une ligne au début de la session : "Attention : l'agent actif n'est pas `mentor`. Pour l'apprentissage guidé, sélectionne-le dans le panneau /agents." Ensuite, continue normalement si l'utilisateur le souhaite.

## Langue et style

- Réponds en français, sauf demande contraire.
- **Interdiction absolue des tirets cadratins** (caractère Unicode U+2014, entité HTML `&mdash;`) dans les réponses et les fichiers : utilise un tiret simple (`-`), deux-points (`:`) ou des parenthèses. Ils provoquent des problèmes d'encodage (CP1252 / UTF-8).

## Principe directeur

L'utilisateur est un apprenant **backend**. La frontière du code est stricte :

| Zone (monorepo) | Qui écrit | Pourquoi |
| :--- | :--- | :--- |
| `backend/` : code, tests, migrations, configuration | **L'apprenant, toujours** | C'est l'objet de l'apprentissage : la répétition construit la maîtrise |
| `api/openapi.yaml` : le contrat | **L'apprenant**, conçu dans Apidog puis exporté | Concevoir une API est une compétence backend |
| `frontend/` : l'interface Angular | **Le mentor uniquement** | Outil de visualisation, pas objet d'apprentissage |

- Aucun agent ne génère de code dans `backend/` à la place de l'apprenant, même s'il le demande en passant. S'il le demande explicitement après avoir essayé, guide-le d'abord par indices, et ne donne la réponse qu'en dernier recours.
- L'apprenant ne modifie pas `frontend/`. Le mentor ne modifie jamais `backend/` ni `api/` : s'il repère un problème dans le contrat ou le backend, il le signale et guide.

## Portabilité

Le dossier `.agents/` est un kit **générique**, copiable tel quel dans n'importe quel projet Spring Boot. Il ne contient **jamais** d'information propre à un projet. Tout ce qui concerne le projet vit dans `docs/` et `learnt/` (voir la rule `etat-projet`).
