# Fiche outil : le débogueur d'IntelliJ IDEA

> **Copie commune aux deux kits** (apprentissage backend et contribution open source). Toute modification doit être reportée à l'identique dans l'autre kit.
>
> Guide d'introduction progressive (règle "Guider un outil" du mentor). Avant d'indiquer une action, le mentor vérifie la page de documentation concernée et la version d'IntelliJ de l'apprenant (menu *Help | About*). Liens et raccourcis vérifiés le 2026-11-22 dans l'aide d'**IntelliJ IDEA 2026.3** (raccourcis du clavier Windows par défaut).

## Un outil de base, pas un outil choisi

Le débogueur ne se choisit pas au cadrage : il est présent dans **chaque projet**, comme Git. Ce qui s'apprend, ce n'est pas seulement où cliquer, c'est **quand le sortir** : devant un symptôme, choisir le bon moyen d'observer. Le mentor ne le propose donc pas à chaque erreur. Il demande d'abord "quel moyen d'observer choisirais-tu ?", et il propose le débogueur quand le symptôme s'y prête (tableau ci-dessous).

## Quand le proposer : choisir le moyen d'observer

| Symptôme | Débogueur ? | Meilleur premier réflexe |
| :--- | :--- | :--- |
| Mauvaise valeur, sans exception (bug de logique, calcul faux, condition jamais vraie) | **Oui** : suivre la valeur pas à pas | |
| Exception dont la cause n'est pas claire dans la stack trace | **Oui** : point d'arrêt sur l'exception, puis regarder l'état au moment où elle est levée | Lire d'abord la stack trace en entier (le premier `Caused by:`) |
| Champ `null` ou faux après un mapping (DTO, entité) | **Oui** : point d'arrêt dans le mapping | |
| Test rouge : la valeur obtenue n'est pas celle attendue | **Oui** : lancer le test en mode debug | Lire le message de l'assertion |
| Comprendre un flux dans un code inconnu (projet open source, module jamais lu) | **Oui** : suivre un appel réel de bout en bout | Lire la carte des modules, puis déboguer |
| Comportement qui dépend des données (un seul cas sur mille échoue) | **Oui** : point d'arrêt conditionnel | |
| Trop de requêtes SQL, lenteur (N+1) | Non | Les logs SQL |
| L'application ne démarre pas (bean manquant, configuration) | Rarement | Les logs de démarrage |
| Conteneur qui ne démarre pas, CI rouge, dépendance introuvable | Non | Les logs de l'outil (Docker, CI, Maven, npm) |
| Problème de concurrence ou de timing | Avec prudence : un point d'arrêt change le timing | Des logs horodatés |

## L'ordre d'introduction

Une étape à la fois, au moment où elle sert. Pour chacune : le concept d'abord, le clic ensuite.

| # | Notion | Quand elle sert | Concept à enseigner d'abord | Documentation |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Point d'arrêt de ligne, mode debug, variables | Premier bug de logique | Un point d'arrêt **suspend** le programme : on regarde son état à cet instant, au lieu de deviner | [Tutoriel : déboguer sa première application Java](https://www.jetbrains.com/help/idea/debugging-your-first-java-application.html), [Démarrer une session](https://www.jetbrains.com/help/idea/starting-the-debugger-session.html) |
| 2 | Pas à pas : *Step over*, *Step into*, *Step out*, *Run to cursor* (Alt+F9), reprendre (F9) | Même bug, pour suivre la valeur | Avancer d'une ligne, entrer dans une méthode ou en sortir | [Pas à pas](https://www.jetbrains.com/help/idea/stepping-through-the-program.html) |
| 3 | Déboguer un test | Premier test rouge incompris | Le test reproduit le bug : on le débogue au lieu de lancer toute l'application | Icône de la marge à côté du test, puis *Debug* ([Démarrer une session](https://www.jetbrains.com/help/idea/starting-the-debugger-session.html)) |
| 4 | Évaluer une expression (Alt+F8), watches | Quand on veut tester une hypothèse sans modifier le code | Poser une question au programme suspendu ("que vaut `order.getItems().size()` ici ?") | [Examiner le programme suspendu](https://www.jetbrains.com/help/idea/examining-suspended-program.html) |
| 5 | Point d'arrêt conditionnel | Un seul cas sur beaucoup pose problème | S'arrêter seulement quand une condition est vraie (clic droit sur la ligne, *Add Conditional Breakpoint*) | [Points d'arrêt](https://www.jetbrains.com/help/idea/using-breakpoints.html) |
| 6 | Point d'arrêt sur exception | Exception dont la cause est obscure | S'arrêter **au moment où** l'exception est levée, avant qu'elle ne remonte (*Run, View Breakpoints*, ou Ctrl+Shift+F8, puis ajouter le nom de l'exception ; ou *Create breakpoint* à côté de l'exception dans la console) | [Points d'arrêt](https://www.jetbrains.com/help/idea/using-breakpoints.html) |
| 7 | (plus tard) Débogage à distance | Application qui tourne hors de l'IDE (conteneur, autre JVM) | L'IDE se branche sur une JVM lancée avec un agent de débogage (port 5005 par défaut) | [Tutoriel : débogage à distance](https://www.jetbrains.com/help/idea/tutorial-remote-debug.html) |

Page d'entrée de la documentation : [Debug code](https://www.jetbrains.com/help/idea/debugging-code.html).

## Pièges

- **Évaluer sans être suspendu** : l'évaluation d'expression ne fonctionne que si le programme est arrêté sur un point d'arrêt, pas simplement mis en pause.
- **Effets de bord** : évaluer une expression qui appelle une méthode exécute vraiment cette méthode (elle peut modifier l'état, ou déclencher une requête en base).
- **Oublier ses points d'arrêt** : ils restent actifs d'une session à l'autre et suspendent le programme plus tard, au mauvais moment. *Run, View Breakpoints* pour faire le ménage.
- **Déboguer au lieu de lire** : le débogueur ne remplace pas la lecture du message d'erreur. On lit d'abord, on formule une hypothèse, puis on observe pour la tester.
- **Corriger dans le débogueur** : modifier une valeur pendant la session (F2 dans les variables) aide à tester une hypothèse, mais ne corrige rien. La correction se fait dans le code, avec un test qui la protège.

## Dans la grille

Deux notions du domaine **Outils**. Comme toute notion, elles entrent dans la grille à leur **première rencontre** (premier symptôme où le débogueur sert), au niveau Découvert, et pas avant :
- **Débogueur** (points d'arrêt, pas à pas, évaluation) : monte de niveau comme les autres, preuve à l'appui (un bug trouvé avec le débogueur, noté dans le journal, champ "Démarche").
- **Choisir le moyen d'observer** (débogueur, logs, test qui reproduit) : se prouve quand l'apprenant choisit seul le bon moyen devant un symptôme nouveau.
