# Sources de données

Référence utilisée par `parcours-demarrer-projet` pour choisir la source de données d'un projet.

**Avant de choisir** : vérifie les quotas gratuits, les conditions d'utilisation et la disponibilité actuelle de l'API. Ne mets jamais une clé d'API dans Git (rule `pratiques-pro`).

**Stratégies d'ingestion possibles** (à choisir et justifier au cadrage) :
- **import au démarrage** depuis des fichiers locaux (pour travailler hors ligne) ;
- **synchronisation à la demande** (endpoint d'administration, `RestClient`) ;
- **appel en direct avec cache** (Spring Cache, durée de vie adaptée aux quotas) ;
- **jeu de données fictif** généré (utile quand le domaine n'a pas de source publique : banque, santé, assurance).

Toute intégration d'API tierce est une occasion d'apprendre la résilience : timeouts, retry, gestion des quotas (`429`), réponses `502` / `503`, et tests avec une API simulée (Requestly, WireMock).

## Sources connues

| Source | Accès | Données | Domaines |
| :--- | :--- | :--- | :--- |
| **Data Dragon** (Riot Games) | Gratuit, sans clé, CDN de fichiers JSON statiques versionnés | Données statiques de League of Legends | Catalogue, import de données |
| **apilayer** (apilayer.com, compte de l'apprenant) | Clé d'API, offres gratuites limitées | Voir ci-dessous | Finance, e-commerce, facturation, logistique, assurance, réservation |
| **Blockchair** | 100 000 requêtes gratuites (GitHub Student Pack) | Données blockchain (la plupart des cryptomonnaies) | Finance, crypto |
| **Serveurs de test FHIR** | Publics, à vérifier | Données de santé fictives au standard FHIR | Santé |
| **Données fictives** | Générées (scripts, bibliothèques de génération de données) | Tout | Banque, assurance, santé |

## APIs apilayer utiles (à vérifier sur apilayer.com)

| API | Données | Domaines |
| :--- | :--- | :--- |
| currencylayer / Exchange Rates | Taux de change | Banque, e-commerce, facturation, finance |
| marketstack | Cotations boursières | Finance de marché |
| vatlayer | Taux de TVA, validation de numéros de TVA | Facturation, e-commerce |
| weatherstack | Météo | Assurance, réservation |
| aviationstack | Vols et aéroports | Réservation, logistique |
| positionstack | Géocodage | Logistique |
| numverify / mailboxlayer | Validation de téléphones et d'e-mails | Tous (inscription, KYC) |
