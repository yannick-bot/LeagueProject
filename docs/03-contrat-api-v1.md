# Contrat d'API REST - Jalon V1.0 (Catalogue Public & Synchronisation)

Ce document définit le contrat REST (**API-First**) du jalon **V1.0** avant son implémentation.

---

## 1. Vue d'ensemble des Endpoints (V1.0)

| Méthode | URI | Description | Codes HTTP |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/api/v1/champions` | Liste paginée des champions (résumé), avec filtres optionnels | `200`, `400` |
| **`GET`** | `/api/v1/champions/{riotId}` | Détail complet d'un champion (avec passif, 4 sorts et lore) | `200`, `404` |
| **`GET`** | `/api/v1/items` | Liste paginée des objets (résumé), avec filtres optionnels | `200`, `400` |
| **`GET`** | `/api/v1/items/{riotId}` | Détail complet d'un objet (avec description, stats et composants `from`) | `200`, `404` |
| **`POST`** | `/api/v1/admin/sync` | Synchronise les champions et objets depuis le CDN Data Dragon de Riot | `200`, `502`, `503` |

---

## 2. Spécification détaillée des Endpoints

### 2.1 `GET /api/v1/champions`

**Query Parameters (tous optionnels) :**
- `tag` (`ChampionTag`) : filtre par rôle (`FIGHTER`, `TANK`, `MAGE`, `ASSASSIN`, `MARKSMAN`, `SUPPORT`).
- `search` (`String`) : recherche partielle insensible à la casse sur le nom du champion (ex: `ah` -> `Ahri`).
- `page` (`int`, défaut `0`, `>= 0`) : numéro de la page.
- `size` (`int`, défaut `20`, `1..100`) : taille de la page.
- `sort` (`String`, défaut `name,asc`) : critère de tri.

**Réponse `200 OK` (`PagedResponse<ChampionSummaryResponse>`) :**
```json
{
  "content": [
    {
      "riotId": "Aatrox",
      "riotKey": 266,
      "name": "Aatrox",
      "title": "Épée des Darkin",
      "imageFull": "Aatrox.png",
      "tags": ["FIGHTER", "TANK"],
      "stats": {
        "hp": 650.0,
        "mp": 0.0,
        "armor": 38.0,
        "spellBlock": 32.0,
        "attackDamage": 60.0,
        "attackSpeed": 0.651,
        "moveSpeed": 345.0,
        "attackRange": 175.0
      }
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 168,
  "totalPages": 9
}
```

---

### 2.2 `GET /api/v1/champions/{riotId}`

- Recherche insensible à la casse sur `riotId` (`/api/v1/champions/Aatrox` ou `/api/v1/champions/aatrox`).

**Réponse `200 OK` (`ChampionDetailResponse`) :**
```json
{
  "riotId": "Aatrox",
  "riotKey": 266,
  "name": "Aatrox",
  "title": "Épée des Darkin",
  "lore": "Autrefois, Aatrox et ses frères étaient honorés...",
  "imageFull": "Aatrox.png",
  "tags": ["FIGHTER", "TANK"],
  "stats": {
    "hp": 650.0,
    "hpPerLevel": 114.0,
    "mp": 0.0,
    "mpPerLevel": 0.0,
    "moveSpeed": 345.0,
    "armor": 38.0,
    "armorPerLevel": 4.45,
    "spellBlock": 32.0,
    "spellBlockPerLevel": 2.05,
    "attackRange": 175.0,
    "attackDamage": 60.0,
    "attackDamagePerLevel": 5.0,
    "attackSpeed": 0.651,
    "attackSpeedPerLevel": 2.5
  },
  "passive": {
    "name": "Posture du massacreur",
    "description": "Périodiquement, la prochaine attaque de base d'Aatrox...",
    "imageFull": "Aatrox_Passive.png"
  },
  "spells": [
    {
      "spellId": "AatroxQ",
      "slot": "Q",
      "name": "Épée des Darkin",
      "description": "Aatrox abat son épée devant lui...",
      "cooldownBurn": "14/12/10/8/6",
      "costBurn": "0",
      "imageFull": "AatroxQ.png"
    }
  ]
}
```

---

### 2.3 `GET /api/v1/items`

**Query Parameters (tous optionnels) :**
- `search` (`String`) : recherche partielle insensible à la casse sur le nom de l'objet.
- `maxGold` (`Integer`) : filtre les objets dont `gold.total <= maxGold`.
- `purchasable` (`Boolean`, défaut `true`) : filtre les objets achetables en boutique.
- `tag` (`String`) : filtre par catégorie d'objet (ex: `Damage`, `CriticalStrike`, `Boots`).
- `page` (`int`, défaut `0`), `size` (`int`, défaut `20`).

**Réponse `200 OK` (`PagedResponse<ItemSummaryResponse>`) :**
```json
{
  "content": [
    {
      "riotId": 3031,
      "name": "Lame d'infini",
      "plaintext": "Augmente considérablement les dégâts critiques.",
      "imageFull": "3031.png",
      "gold": {
        "base": 600,
        "total": 3400,
        "sell": 2380,
        "purchasable": true
      },
      "tags": ["Damage", "CriticalStrike"]
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 210,
  "totalPages": 11
}
```

---

### 2.4 `GET /api/v1/items/{riotId}`

**Réponse `200 OK` (`ItemDetailResponse`) :**
```json
{
  "riotId": 3031,
  "name": "Lame d'infini",
  "plaintext": "Augmente considérablement les dégâts critiques.",
  "description": "<mainText><stats>+80 dégâts d'attaque...</stats></mainText>",
  "imageFull": "3031.png",
  "gold": {
    "base": 600,
    "total": 3400,
    "sell": 2380,
    "purchasable": true
  },
  "tags": ["Damage", "CriticalStrike"],
  "stats": {
    "FlatPhysicalDamageMod": 80.0,
    "FlatCritChanceMod": 0.25
  },
  "components": [
    { "riotId": 1038, "name": "Glaive BF", "goldTotal": 1300 },
    { "riotId": 1037, "name": "Pioche", "goldTotal": 875 },
    { "riotId": 1018, "name": "Cape d'agilité", "goldTotal": 600 }
  ]
}
```

---

### 2.5 Format standardisé des Erreurs (`ProblemDetail` - RFC 9457)

Toutes les erreurs (`400`, `404`, `500`, `502`, `503`) renvoient le format `application/problem+json` :
```json
{
  "type": "https://api.leagueplatform.com/errors/resource-not-found",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Aucun champion trouvé avec l'identifiant 'Pikachu'.",
  "instance": "/api/v1/champions/Pikachu",
  "timestamp": "2026-11-01T10:30:00Z"
}
```

