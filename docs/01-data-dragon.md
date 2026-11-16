# Ce qu'il faut savoir sur Data Dragon

Data Dragon est la source de données statiques officielle de Riot Games pour League of Legends.
Elle est **gratuite, sans clé d'API et sans limite de requêtes**.

URL de base : `https://ddragon.leagueoflegends.com`

## Nature de la source

Data Dragon n'est pas une "vraie" API REST. C'est un **CDN de fichiers JSON statiques**, versionnés par patch et par langue.

| Fichier | Exemple d'URL | Contenu |
| :--- | :--- | :--- |
| Versions | `/api/versions.json` | Liste des patchs (`15.21.1`, ...) |
| Champions (liste) | `/cdn/{version}/data/fr_FR/champion.json` | Résumé de tous les champions |
| Champion (détail) | `/cdn/{version}/data/fr_FR/champion/Ahri.json` | Sorts, passif, skins, stats complètes |
| Objets | `/cdn/{version}/data/fr_FR/item.json` | Objets, prix, recettes, stats |
| Sorts d'invocateur | `/cdn/{version}/data/fr_FR/summoner.json` | Flash, Ignite, ... |
| Runes | `/cdn/{version}/data/fr_FR/runesReforged.json` | Arbres de runes |

## Limites de Data Dragon

Ce que Data Dragon **ne sait pas faire** :

- filtrer
- trier
- paginer
- chercher
- comparer deux patchs

Il renvoie des fichiers entiers, c'est tout.

## Conséquence pour notre projet

C'est précisément sur ces limites que notre API apporte de la valeur : elle importe les données de Data Dragon dans sa propre base et expose des endpoints capables de rechercher, filtrer, trier et paginer.

