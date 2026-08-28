---
title: Bien démarrer avec TypeScript
sidebar:
  order: 9
  label: 9. Bien démarrer avec TypeScript
---


### Installation

Visual Studio Code offre une excellente prise en charge du langage TypeScript, mais n'inclut pas le compilateur TypeScript. Pour installer ce dernier, vous pouvez utiliser un gestionnaire de paquets comme npm ou yarn :

```shell
npm install typescript --save-dev
```

ou

```shell
yarn add typescript --dev
```

Veillez à versionner le fichier de verrouillage généré afin que chaque membre de l'équipe utilise la même version de TypeScript.

Pour exécuter le compilateur TypeScript, vous pouvez utiliser les commandes suivantes :

```shell
npx tsc
```

ou

```shell
yarn tsc
```

Il est recommandé d'installer TypeScript au niveau du projet plutôt que globalement, car cela rend le processus de génération plus prévisible. Cependant, pour des utilisations ponctuelles, vous pouvez employer la commande suivante :

```shell
npx tsc
```

ou l'installer globalement :

```shell
npm install -g typescript
```

Si vous utilisez Microsoft Visual Studio, vous pouvez obtenir TypeScript sous forme de paquet NuGet pour vos projets MSBuild. Dans la console du gestionnaire de paquets NuGet, exécutez la commande suivante :

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Lors de l'installation de TypeScript, deux exécutables sont installés : « tsc », le compilateur TypeScript, et « tsserver », le serveur TypeScript autonome. Ce serveur autonome contient le compilateur et les services de langage que les éditeurs et les IDE peuvent utiliser pour proposer une complétion de code intelligente.

Par ailleurs, plusieurs transpileurs compatibles avec TypeScript sont disponibles, comme Babel (au moyen d'un plugin) ou swc. Ces transpileurs peuvent être utilisés pour convertir du code TypeScript vers d'autres langages ou versions cibles.

TypeScript 7.0 a été réécrit en Go sous la forme d'une implémentation native du compilateur et du service de langage. Il utilise le multithreading à mémoire partagée et d'autres optimisations pour accélérer les générations complètes et les fonctionnalités des éditeurs, réduisant ainsi le temps de réponse pendant le développement.

Certaines fonctionnalités de TypeScript 7.0 liées aux performances peuvent être ajustées. La vérification des types peut s'exécuter dans des workers parallèles avec `--checkers` ; un plus grand nombre de workers peut accélérer les grands projets, mais consomme davantage de mémoire. Le mode `--watch` réécrit améliore la surveillance multiplateforme des fichiers. TypeScript 7.0 ne comprend pas encore d'API du compilateur (en juillet 2026), de sorte que les outils qui ont toujours besoin de l'API TypeScript 6.0 peuvent s'exécuter en parallèle avec TypeScript 7.0 en utilisant `@typescript/typescript6` ou des alias npm.

### Configuration

TypeScript peut être configuré à l'aide des options de la CLI tsc ou d'un fichier de configuration dédié, nommé tsconfig.json et placé à la racine du projet.

Pour générer un fichier tsconfig.json prérempli avec les paramètres recommandés, vous pouvez utiliser la commande suivante :

```shell
tsc --init
```

Lorsque vous exécutez localement la commande `tsc`, TypeScript compile le code en utilisant la configuration définie dans le fichier tsconfig.json le plus proche.

Voici quelques exemples de commandes CLI exécutées avec les paramètres par défaut :

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### Fichier de configuration TypeScript

Un fichier tsconfig.json sert à configurer le compilateur TypeScript (tsc). Il est généralement ajouté à la racine du projet, avec le fichier `package.json`.

Remarques :

* tsconfig.json accepte les commentaires même s'il est au format json.
* Il est conseillé d'utiliser ce fichier de configuration plutôt que les options de ligne de commande.

Le lien suivant fournit la documentation complète ainsi que son schéma :

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

Voici une liste des configurations courantes et utiles :

#### target

La propriété « target » permet de spécifier la version d'ECMAScript vers laquelle votre code TypeScript doit être émis/compilé. Pour les navigateurs modernes, ES6 constitue une bonne option. Remarque : la prise en charge d'ES5 a été dépréciée dans TypeScript 6.0 et n'est plus assurée dans TypeScript 7.0.

#### lib

La propriété « lib » permet de spécifier les fichiers de bibliothèque à inclure lors de la compilation. TypeScript inclut automatiquement les API correspondant aux fonctionnalités spécifiées dans la propriété « target », mais il est possible d'omettre certaines bibliothèques ou d'en sélectionner en fonction de besoins particuliers. Par exemple, si vous travaillez sur un projet côté serveur, vous pouvez exclure la bibliothèque « DOM », qui n'est utile que dans un environnement de navigateur.

#### strict

L'option « strict » améliore la sécurité du typage en activant des vérifications plus strictes. Elle est activée par défaut à partir de TypeScript 6.0 ; dans le cas contraire, vous devez explicitement lui attribuer la valeur true dans votre tsconfig.json. L'activation de « strict » permet à TypeScript de :

* Émettre du code utilisant « use strict » pour chaque fichier source.
* Prendre en compte « null » et « undefined » lors de la vérification des types.
* Interdire l'utilisation du type « any » en l'absence d'annotations de type.
* Signaler une erreur lors de l'utilisation de l'expression « this », qui impliquerait autrement le type « any ».

#### module

La propriété « module » définit le système de modules pris en charge pour le programme compilé. Lors de l'exécution, un chargeur de modules est utilisé pour localiser et exécuter les dépendances selon le système de modules spécifié.

Les chargeurs de modules les plus couramment utilisés en JavaScript sont Node.js CommonJS pour les applications côté serveur et RequireJS pour les modules AMD dans les applications Web exécutées dans un navigateur. TypeScript peut émettre du code pour différents systèmes de modules, notamment UMD, System, ESNext, ES2015/ES6 et ES2020. Le système de modules doit être choisi en fonction de l'environnement cible et du mécanisme de chargement de modules disponible dans cet environnement.

Remarque : la prise en charge des anciens systèmes de modules (AMD, UMD, SystemJS) a été dépréciée dans TypeScript 6.0 et n'est plus assurée dans TypeScript 7.0.

#### moduleResolution

La propriété « moduleResolution » spécifie la stratégie de résolution des modules. Utilisez « nodenext » ou « bundler » pour le code TypeScript moderne. La stratégie « classic » n'est utilisée que pour les anciennes versions de TypeScript (antérieures à 1.6).

#### esModuleInterop

La propriété « esModuleInterop » autorise les imports par défaut depuis des modules CommonJS qui n'ont pas exporté de valeur à l'aide de la propriété « default » ; cette propriété fournit une couche de compatibilité dans le code JavaScript émis. Après avoir activé cette option, nous pouvons utiliser `import MyLibrary from "my-library"` au lieu de `import * as MyLibrary from "my-library"`.

À l'origine, « esModuleInterop » était facultative afin d'éviter les changements incompatibles, mais elle constitue depuis longtemps la valeur par défaut recommandée. Sa désactivation peut provoquer de subtils problèmes d'exécution lors de l'utilisation de CommonJS avec ESM. Remarque : à partir de TypeScript 6.0, ce comportement d'interopérabilité plus sûr est toujours activé.

Dans TypeScript 6.0, certaines anciennes options de configuration et formes syntaxiques ont été dépréciées ou sont désormais traitées comme du comportement hérité. Dans TypeScript 7.0, elles produisent des erreurs bloquantes ou n'ont aucun effet.

Les éléments dépréciés qui produisent désormais des erreurs bloquantes et n'ont aucun effet sont :

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* la désactivation de `esModuleInterop` ou de `allowSyntheticDefaultImports`
* la désactivation de `alwaysStrict`
* le mot-clé `module` dans les déclarations d'espace de noms
* `asserts` dans les imports
* `/// <reference no-default-lib />` avec `skipDefaultLibCheck`
* les chemins de fichiers de la CLI avec un `tsconfig.json` local, sauf si `--ignoreConfig` est utilisé

#### jsx

La propriété « jsx » s'applique uniquement aux fichiers .tsx utilisés dans ReactJS et contrôle la manière dont les constructions JSX sont compilées en JavaScript. Une option courante est « preserve », qui compile vers un fichier .jsx en conservant le JSX inchangé afin qu'il puisse être transmis à différents outils tels que Babel pour d'autres transformations.

#### skipLibCheck

La propriété « skipLibCheck » empêche TypeScript de vérifier les types de l'intégralité des paquets tiers importés. Cette propriété réduit le temps de compilation d'un projet. TypeScript continue toutefois de vérifier votre code par rapport aux définitions de type fournies par ces paquets.

#### files

La propriété « files » indique au compilateur une liste de fichiers qui doivent toujours être inclus dans le programme.

#### include

<!-- markdownlint-disable MD049 -->
La propriété « include » indique au compilateur une liste de fichiers que nous souhaitons inclure. Cette propriété autorise des motifs similaires aux globs, tels que « \*\_ » pour tout sous-répertoire, « \_ » pour tout nom de fichier et « ? » pour les caractères facultatifs.
<!-- markdownlint-enable MD049 -->

#### exclude

La propriété « exclude » indique au compilateur une liste de fichiers qui ne doivent pas être inclus dans la compilation. Il peut notamment s'agir de fichiers tels que ceux de « node_modules » ou de fichiers de test.
Remarque : tsconfig.json autorise les commentaires.

### importHelpers

TypeScript utilise du code d'assistance lors de la génération de code pour certaines fonctionnalités JavaScript avancées ou rétrocompilées. Par défaut, ces fonctions d'assistance sont dupliquées dans les fichiers qui les utilisent. L'option `importHelpers` importe plutôt ces fonctions d'assistance depuis le module `tslib`, ce qui rend le code JavaScript produit plus efficace.

### Conseils pour migrer vers TypeScript

Pour les projets de grande taille, il est recommandé d'adopter une transition progressive au cours de laquelle le code TypeScript et le code JavaScript coexistent initialement. Seuls les petits projets peuvent être migrés vers TypeScript en une seule fois.

La première étape de cette transition consiste à introduire TypeScript dans la chaîne de compilation. Cela peut être fait à l'aide de l'option de compilation « allowJs », qui permet aux fichiers .ts et .tsx de coexister avec les fichiers JavaScript existants. Comme TypeScript se rabat sur le type « any » pour une variable lorsqu'il ne peut pas en déduire le type à partir des fichiers JavaScript, il est recommandé de désactiver « noImplicitAny » dans les options de compilation au début de la migration.

La deuxième étape consiste à s'assurer que vos tests JavaScript fonctionnent avec les fichiers TypeScript afin de pouvoir exécuter les tests à mesure que vous convertissez chaque module. Si vous utilisez Jest, envisagez d'utiliser `ts-jest`, qui permet de tester des projets TypeScript avec Jest.

La troisième étape consiste à inclure dans votre projet les déclarations de type des bibliothèques tierces. Ces déclarations peuvent être fournies avec les bibliothèques ou être disponibles sur DefinitelyTyped. Vous pouvez les rechercher à l'adresse [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) et les installer à l'aide de :

```shell
npm install --save-dev @types/package-name
```

ou

```shell
yarn add --dev @types/package-name
```

La quatrième étape consiste à migrer module par module selon une approche ascendante, en suivant votre graphe de dépendances et en commençant par ses feuilles. L'idée est de commencer par convertir les modules qui ne dépendent pas d'autres modules. Pour visualiser les graphes de dépendances, vous pouvez utiliser l'outil « madge ».

Les fonctions utilitaires et le code lié à des API ou à des spécifications externes constituent de bons candidats pour ces premières conversions. Il est possible de générer automatiquement des définitions de type TypeScript à partir de contrats Swagger, de schémas GraphQL ou de schémas JSON afin de les inclure dans votre projet.

Lorsqu'aucune spécification ni aucun schéma officiel ne sont disponibles, vous pouvez générer des types à partir de données brutes, telles que du JSON renvoyé par un serveur. Il est toutefois recommandé de générer les types à partir de spécifications plutôt que de données afin d'éviter d'omettre des cas limites.

Pendant la migration, évitez de refactoriser le code et concentrez-vous uniquement sur l'ajout de types à vos modules.

La cinquième étape consiste à activer « noImplicitAny », qui impose que tous les types soient connus et définis, offrant ainsi une meilleure expérience TypeScript pour votre projet.

Pendant la migration, vous pouvez utiliser la directive `@ts-check`, qui active la vérification des types TypeScript dans un fichier JavaScript. Cette directive fournit une forme souple de vérification des types et peut être utilisée dans un premier temps pour repérer les problèmes dans les fichiers JavaScript. Lorsque `@ts-check` est inclus dans un fichier, TypeScript tente de déduire les définitions à l'aide de commentaires de style JSDoc. Toutefois, envisagez d'utiliser les annotations JSDoc uniquement à un stade très précoce de la migration.

Envisagez de conserver la valeur par défaut de `noEmitOnError` dans votre tsconfig.json, à savoir false. Cela vous permet de produire le code source JavaScript même si des erreurs sont signalées.

