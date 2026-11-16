# Parcours de domaines métier

Référence utilisée par `parcours-demarrer-projet` pour choisir le domaine d'un projet. Chaque projet est une immersion dans un domaine où Java est très présent, et doit produire une expérience démontrable.

**Critère de choix** : un bon domaine d'apprentissage est **riche en règles de gestion, en invariants et en états**. Un catalogue en lecture seule (comme un projet d'import de données de jeu) enseigne JPA, l'import et la pagination, mais très peu de modélisation métier.

**Ordre suggéré** (du plus accessible au plus exigeant, à adapter) : Réservation → E-commerce → Facturation → Banque → Assurance → Santé → Logistique → Finance de marché.

Les exemples ci-dessous sont des points de départ pour le jeu de rôle de l'expert métier, pas des spécifications : l'expert métier peut les nuancer, les contredire ou en ajouter.

---

## Réservation (hôtel, salles, rendez-vous, places)

- **Vocabulaire** : ressource, créneau, disponibilité, réservation, acompte, annulation, liste d'attente, no-show.
- **Invariants typiques** : une ressource n'est jamais réservée deux fois sur des créneaux qui se chevauchent ; la capacité n'est jamais dépassée.
- **Règles de gestion** : annulation gratuite jusqu'à X heures avant ; une réservation non payée expire après N minutes.
- **Cycle de vie** : `EN_ATTENTE_PAIEMENT → CONFIRMÉE → CONSOMMÉE`, ou `ANNULÉE`, ou `EXPIRÉE`.
- **Concepts techniques révélés** : concurrence (verrous, contraintes d'exclusion PostgreSQL), tâches planifiées, dates et fuseaux horaires (`java.time`), notifications.
- **Outils naturels du Pack** : testmail.app (e-mails de confirmation), Stripe (acompte), DevCycle ou ConfigCat (nouvelle règle d'annulation).
- **Données** : jeu de données fictif ; aviationstack ou weatherstack (apilayer) pour enrichir.

## E-commerce

- **Vocabulaire** : catalogue, produit, variante, panier, commande, ligne de commande, stock, promotion, retour, remboursement.
- **Invariants typiques** : total de la commande = somme des lignes - remises ; on ne vend pas plus que le stock disponible ; une commande payée ne change plus de lignes.
- **Règles de gestion** : une promotion ne se cumule pas avec une autre ; retour possible sous 30 jours.
- **Cycle de vie** : `PANIER → CRÉÉE → PAYÉE → EXPÉDIÉE → LIVRÉE`, ou `ANNULÉE`, ou `REMBOURSÉE`.
- **Concepts techniques révélés** : paiement et webhooks, idempotence, saga et compensation, cache, pagination et recherche, montée en charge.
- **Outils naturels du Pack** : Stripe, testmail.app, Sentry, Datadog ou New Relic, feature flags.
- **Données** : catalogue fictif ; taux de change (apilayer) pour le multi-devises ; vatlayer (apilayer) pour la TVA.

## Facturation et abonnements

- **Vocabulaire** : client, devis, facture, ligne, avoir, échéance, relance, abonnement, période de facturation.
- **Invariants typiques** : une facture émise est immuable (on corrige par un avoir) ; la numérotation est continue, sans trou ; total TTC = HT + TVA, avec des règles d'arrondi explicites.
- **Règles de gestion** : relance à J+15 puis J+30 ; prorata en cas de changement d'abonnement.
- **Cycle de vie (facture)** : `BROUILLON → ÉMISE → PAYÉE_PARTIELLEMENT → PAYÉE`, ou `EN_RETARD → RELANCÉE`.
- **Concepts techniques révélés** : `BigDecimal` et arrondis, numérotation séquentielle sous concurrence, génération de documents, tâches planifiées, webhooks.
- **Outils naturels du Pack** : Stripe (Billing), testmail.app, Sentry.
- **Données** : vatlayer, taux de change (apilayer).

## Banque (comptes et virements)

- **Vocabulaire** : compte, solde, écriture, virement, IBAN, plafond, découvert autorisé, contre-passation.
- **Invariants typiques** : le solde ne descend jamais sous le découvert autorisé ; un virement débite et crédite le même montant (comptabilité en partie double) ; une écriture passée est immuable.
- **Règles de gestion** : plafond de virement journalier ; un virement au-delà d'un seuil demande une validation.
- **Cycle de vie (virement)** : `INITIÉ → VALIDÉ → EXÉCUTÉ`, ou `REJETÉ`.
- **Concepts techniques révélés** : transactions ACID, verrous optimistes (`@Version`) et pessimistes, `BigDecimal`, idempotence, audit, sécurité.
- **Outils naturels du Pack** : Doppler (secrets), Sentry, Datadog, CodeScene (qualité).
- **Données** : taux de change (apilayer) pour les comptes en devises ; données fictives.

## Assurance

- **Vocabulaire** : contrat (police), garantie, prime, franchise, plafond, sinistre, avenant, souscripteur, assuré, bénéficiaire.
- **Invariants typiques** : un sinistre doit survenir pendant une période de couverture active ; l'indemnisation ne dépasse jamais le plafond, franchise déduite ; un avenant crée une nouvelle version du contrat, sans effacer l'historique.
- **Règles de gestion** : délai de déclaration d'un sinistre ; tarification selon le profil.
- **Cycles de vie** : contrat `DEVIS → ACTIF → SUSPENDU → RÉSILIÉ` ; sinistre `DÉCLARÉ → EN_INSTRUCTION → ACCEPTÉ / REFUSÉ → INDEMNISÉ`.
- **Concepts techniques révélés** : machines à états, versionnement temporel (historique des contrats), règles métier interchangeables (pattern Strategy), calculs.
- **Outils naturels du Pack** : testmail.app, DevCycle ou ConfigCat (nouvelle règle de tarif), Sentry.
- **Données** : weatherstack (apilayer) pour des sinistres climatiques ; données fictives.

## Santé

- **Vocabulaire** : patient, praticien, rendez-vous, consultation, ordonnance, dossier médical, consentement.
- **Invariants typiques** : un praticien n'a jamais deux rendez-vous qui se chevauchent ; un dossier n'est accessible qu'avec un rôle et un consentement valides ; une ordonnance signée est immuable.
- **Règles de gestion** : délai minimal d'annulation ; durée de conservation des données.
- **Cycle de vie (rendez-vous)** : `PROPOSÉ → CONFIRMÉ → HONORÉ`, ou `ANNULÉ`, ou `NON_HONORÉ`.
- **Concepts techniques révélés** : sécurité fine (RBAC, ABAC), audit des accès, données sensibles (chiffrement, RGPD), interopérabilité (standard FHIR).
- **Outils naturels du Pack** : Doppler, Sentry, testmail.app.
- **Données** : serveurs de test publics FHIR (à vérifier) ; données fictives.

## Logistique et transport

- **Vocabulaire** : commande d'expédition, colis, entrepôt, stock, emplacement, tournée, transporteur, suivi.
- **Invariants typiques** : le stock n'est jamais négatif ; un colis n'est jamais livré avant d'avoir été expédié ; la charge ne dépasse jamais la capacité du véhicule.
- **Règles de gestion** : priorité aux commandes express ; regroupement des colis par zone.
- **Cycle de vie (colis)** : `CRÉÉ → PRÉPARÉ → EXPÉDIÉ → EN_TRANSIT → LIVRÉ`, ou `RETOURNÉ`.
- **Concepts techniques révélés** : événements de domaine, messagerie asynchrone, concurrence sur le stock, géolocalisation, traitements par lots.
- **Outils naturels du Pack** : LocalStack (files de messages AWS en local), Datadog ou New Relic, Carto.
- **Données** : positionstack (géocodage, apilayer), aviationstack (fret aérien, apilayer).

## Finance de marché et crypto

- **Vocabulaire** : portefeuille, actif, ordre, cotation, transaction, position, plus-value, frais.
- **Invariants typiques** : on ne vend jamais plus que la position détenue ; la valorisation = somme des quantités x cours ; un ordre exécuté est immuable.
- **Règles de gestion** : frais selon le type d'ordre ; ordre à cours limité.
- **Cycle de vie (ordre)** : `CRÉÉ → ENVOYÉ → PARTIELLEMENT_EXÉCUTÉ → EXÉCUTÉ`, ou `ANNULÉ`.
- **Concepts techniques révélés** : données temporelles, cache et rafraîchissement, appels à des API tierces résilients (retry, circuit breaker, rate limiting), précision numérique.
- **Outils naturels du Pack** : Blockchair, Datadog, Requestly (simuler des pannes de l'API tierce).
- **Données** : marketstack (bourse, apilayer), Blockchair (blockchain), taux de change (apilayer).

## Énergie

- **Vocabulaire** : point de livraison, compteur, relevé, index, consommation, contrat de fourniture, option tarifaire (heures pleines / heures creuses).
- **Invariants typiques** : l'index d'un compteur ne décroît jamais (sauf remplacement du compteur) ; une consommation est toujours rattachée à une période tarifaire.
- **Concepts techniques révélés** : séries temporelles, agrégations SQL, traitements par lots, facturation.
- **Données** : à rechercher (données ouvertes de consommation, par exemple).
