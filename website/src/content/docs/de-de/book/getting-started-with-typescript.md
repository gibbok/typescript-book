---
title: Erste Schritte mit TypeScript
sidebar:
  order: 9
  label: 9. Erste Schritte mit TypeScript
---


### Installation

Visual Studio Code bietet eine ausgezeichnete Unterstützung für die TypeScript-Sprache, enthält jedoch nicht den TypeScript-Compiler. Zum Installieren des TypeScript-Compilers können Sie einen Paketmanager wie npm oder yarn verwenden:

```shell
npm install typescript --save-dev
```

oder

```shell
yarn add typescript --dev
```

Committen Sie unbedingt die erzeugte Lockdatei, damit jedes Teammitglied dieselbe TypeScript-Version verwendet.

Zum Ausführen des TypeScript-Compilers können Sie die folgenden Befehle verwenden:

```shell
npx tsc
```

oder

```shell
yarn tsc
```

Es wird empfohlen, TypeScript projektbezogen statt global zu installieren, da dies einen vorhersehbareren Build-Prozess ermöglicht. Für einmalige Anwendungsfälle können Sie jedoch den folgenden Befehl verwenden:

```shell
npx tsc
```

oder es global installieren:

```shell
npm install -g typescript
```

Wenn Sie Microsoft Visual Studio verwenden, können Sie TypeScript als NuGet-Paket für Ihre MSBuild-Projekte beziehen. Führen Sie in der NuGet-Paket-Manager-Konsole den folgenden Befehl aus:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Bei der TypeScript-Installation werden zwei ausführbare Dateien installiert: „tsc“ als TypeScript-Compiler und „tsserver“ als eigenständiger TypeScript-Server. Der eigenständige Server enthält den Compiler und Sprachdienste, die von Editoren und IDEs für eine intelligente Codevervollständigung genutzt werden können.

Darüber hinaus stehen mehrere TypeScript-kompatible Transpiler zur Verfügung, beispielsweise Babel (über ein Plugin) oder swc. Mit diesen Transpilern lässt sich TypeScript-Code in andere Zielsprachen oder -versionen umwandeln.

TypeScript 7.0 wurde in Go als native Implementierung des Compilers und Sprachdienstes neu geschrieben. Es nutzt Multithreading mit gemeinsamem Speicher und weitere Optimierungen, um vollständige Builds und Editorfunktionen zu beschleunigen und so die Feedbackzeit während der Entwicklung zu verkürzen.

Einige Leistungsfunktionen von TypeScript 7.0 lassen sich konfigurieren. Die Typprüfung kann mit `--checkers` in parallelen Workern ausgeführt werden; mehr Worker können große Projekte beschleunigen, benötigen jedoch mehr Arbeitsspeicher. Der neu entwickelte `--watch`-Modus verbessert die plattformübergreifende Dateiüberwachung. TypeScript 7.0 enthält noch keine Compiler-API (Stand Juli 2026). Daher können Werkzeuge, die weiterhin die API von TypeScript 6.0 benötigen, mithilfe von `@typescript/typescript6` oder npm-Aliasnamen parallel zu TypeScript 7.0 ausgeführt werden.

### Konfiguration

TypeScript kann über die CLI-Optionen von tsc oder mithilfe einer eigenen Konfigurationsdatei namens tsconfig.json konfiguriert werden, die im Stammverzeichnis des Projekts abgelegt wird.

Mit dem folgenden Befehl können Sie eine tsconfig.json-Datei erzeugen, die bereits mit empfohlenen Einstellungen ausgefüllt ist:

```shell
tsc --init
```

Wenn Sie den Befehl `tsc` lokal ausführen, kompiliert TypeScript den Code mit der Konfiguration aus der nächstgelegenen tsconfig.json-Datei.

Hier sind einige Beispiele für CLI-Befehle, die mit den Standardeinstellungen ausgeführt werden:

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### TypeScript-Konfigurationsdatei

Eine tsconfig.json-Datei dient zur Konfiguration des TypeScript-Compilers (tsc). Üblicherweise wird sie zusammen mit der Datei `package.json` im Stammverzeichnis des Projekts abgelegt.

Hinweise:

* tsconfig.json akzeptiert Kommentare, obwohl sie im JSON-Format vorliegt.
* Es wird empfohlen, diese Konfigurationsdatei anstelle der Befehlszeilenoptionen zu verwenden.

Unter dem folgenden Link finden Sie die vollständige Dokumentation und das zugehörige Schema:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

Im Folgenden finden Sie eine Liste gängiger und nützlicher Konfigurationen:

#### target

Mit der Eigenschaft „target“ wird festgelegt, in welche ECMAScript-Version Ihr TypeScript-Code ausgegeben bzw. kompiliert werden soll. Für moderne Browser ist ES6 eine gute Wahl. Hinweis: Die Unterstützung für ES5 wurde in TypeScript 6.0 als veraltet markiert und wird in TypeScript 7.0 nicht mehr unterstützt.

#### lib

Mit der Eigenschaft „lib“ wird festgelegt, welche Bibliotheksdateien zur Kompilierzeit einbezogen werden. TypeScript schließt automatisch APIs für Funktionen ein, die in der Eigenschaft „target“ angegeben sind. Für bestimmte Anforderungen können jedoch einzelne Bibliotheken ausgelassen oder gezielt ausgewählt werden. Bei einem Serverprojekt könnten Sie beispielsweise die Bibliothek „DOM“ ausschließen, da diese nur in einer Browserumgebung nützlich ist.

#### strict

Die Option „strict“ verbessert die Typsicherheit, indem sie strengere Prüfungen aktiviert. Ab TypeScript 6.0 ist sie standardmäßig aktiviert; andernfalls sollten Sie sie in Ihrer tsconfig.json explizit auf true setzen. Durch die Aktivierung von „strict“ kann TypeScript:

* für jede Quelldatei Code mit „use strict“ ausgeben.
* „null“ und „undefined“ bei der Typprüfung berücksichtigen.
* die Verwendung des Typs „any“ deaktivieren, wenn keine Typannotationen vorhanden sind.
* bei Verwendung des Ausdrucks „this“ einen Fehler ausgeben, wenn dieser andernfalls den Typ „any“ implizieren würde.

#### module

Die Eigenschaft „module“ legt das Modulsystem fest, das vom kompilierten Programm unterstützt wird. Zur Laufzeit wird ein Modullader verwendet, um Abhängigkeiten anhand des angegebenen Modulsystems zu finden und auszuführen.

Die in JavaScript am häufigsten verwendeten Modullader sind Node.js CommonJS für serverseitige Anwendungen und RequireJS für AMD-Module in browserbasierten Webanwendungen. TypeScript kann Code für verschiedene Modulsysteme ausgeben, darunter UMD, System, ESNext, ES2015/ES6 und ES2020. Das Modulsystem sollte entsprechend der Zielumgebung und dem darin verfügbaren Mechanismus zum Laden von Modulen gewählt werden.

Hinweis: Die Unterstützung für ältere Modulsysteme (AMD, UMD, SystemJS) wurde in TypeScript 6.0 als veraltet markiert und ist in TypeScript 7.0 nicht mehr verfügbar.

#### moduleResolution

Die Eigenschaft „moduleResolution“ legt die Strategie zur Modulauflösung fest. Verwenden Sie für modernen TypeScript-Code „nodenext“ oder „bundler“. Die Strategie „classic“ wird nur bei alten TypeScript-Versionen (vor 1.6) eingesetzt.

#### esModuleInterop

Die Eigenschaft „esModuleInterop“ ermöglicht Standardimporte aus CommonJS-Modulen, die nicht über die Eigenschaft „default“ exportiert haben. Sie stellt einen Shim bereit, um die Kompatibilität im ausgegebenen JavaScript sicherzustellen. Nach der Aktivierung dieser Option können wir `import MyLibrary from "my-library"` anstelle von `import * as MyLibrary from "my-library"` verwenden.

„esModuleInterop“ musste ursprünglich explizit aktiviert werden, um Breaking Changes zu vermeiden, ist jedoch seit Langem die empfohlene Standardeinstellung. Die Deaktivierung kann bei der gemeinsamen Verwendung von CommonJS und ESM zu subtilen Laufzeitproblemen führen. Hinweis: Ab TypeScript 6.0 ist dieses sicherere Interop-Verhalten immer aktiviert.

In TypeScript 6.0 wurden einige ältere Konfigurationsoptionen und Syntaxformen als veraltet markiert oder über altes Verhalten umgestellt. In TypeScript 7.0 führen sie zu nicht behebbaren Fehlern oder zeigen keine Wirkung.

Die veralteten Funktionen, die zu nicht behebbaren Fehlern ohne Wirkung geworden sind, lauten:

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* Deaktivieren von `esModuleInterop` oder `allowSyntheticDefaultImports`
* Deaktivieren von `alwaysStrict`
* Schlüsselwort `module` in Namespace-Deklarationen
* `asserts` bei Importen
* `/// <reference no-default-lib />` unter `skipDefaultLibCheck`
* CLI-Dateipfade mit einer lokalen `tsconfig.json`, sofern nicht `--ignoreConfig` verwendet wird

#### jsx

Die Eigenschaft „jsx“ gilt nur für in ReactJS verwendete .tsx-Dateien und steuert, wie JSX-Konstrukte in JavaScript kompiliert werden. Eine gängige Option ist „preserve“. Dabei wird in eine .jsx-Datei kompiliert und das JSX unverändert beibehalten, sodass es für weitere Transformationen an andere Werkzeuge wie Babel übergeben werden kann.

#### skipLibCheck

Die Eigenschaft „skipLibCheck“ verhindert, dass TypeScript sämtliche importierten Drittanbieterpakete einer Typprüfung unterzieht. Dadurch verkürzt sich die Kompilierzeit eines Projekts. TypeScript prüft Ihren Code weiterhin anhand der von diesen Paketen bereitgestellten Typdefinitionen.

#### files

Die Eigenschaft „files“ gibt dem Compiler eine Liste von Dateien an, die stets in das Programm einbezogen werden müssen.

#### include

<!-- markdownlint-disable MD049 -->
Die Eigenschaft „include“ gibt dem Compiler eine Liste der Dateien an, die einbezogen werden sollen. Diese Eigenschaft erlaubt Glob-ähnliche Muster, etwa „\*_“ für jedes Unterverzeichnis, „_“ für jeden Dateinamen und „?“ für optionale Zeichen.
<!-- markdownlint-enable MD049 -->

#### exclude

Die Eigenschaft „exclude“ gibt dem Compiler eine Liste der Dateien an, die nicht in die Kompilierung einbezogen werden sollen. Dazu können Dateien wie „node_modules“ oder Testdateien gehören.
Hinweis: tsconfig.json erlaubt Kommentare.

### importHelpers

TypeScript verwendet Hilfscode, wenn es Code für bestimmte fortgeschrittene oder heruntergestufte JavaScript-Funktionen erzeugt. Standardmäßig werden diese Hilfsfunktionen in den Dateien dupliziert, die sie verwenden. Die Option `importHelpers` importiert diese Hilfsfunktionen stattdessen aus dem Modul `tslib`, wodurch die JavaScript-Ausgabe effizienter wird.

### Empfehlungen für die Migration zu TypeScript

Bei großen Projekten empfiehlt sich ein schrittweiser Übergang, bei dem TypeScript- und JavaScript-Code zunächst nebeneinander bestehen. Nur kleine Projekte können in einem Schritt zu TypeScript migriert werden.

Der erste Schritt dieses Übergangs besteht darin, TypeScript in den Build-Prozess einzuführen. Dies kann über die Compileroption „allowJs“ erfolgen, die es .ts- und .tsx-Dateien ermöglicht, neben vorhandenen JavaScript-Dateien zu bestehen. Da TypeScript bei einer Variablen auf den Typ „any“ zurückfällt, wenn es den Typ nicht aus JavaScript-Dateien ableiten kann, empfiehlt es sich, „noImplicitAny“ zu Beginn der Migration in den Compileroptionen zu deaktivieren.

Im zweiten Schritt stellen Sie sicher, dass Ihre JavaScript-Tests zusammen mit TypeScript-Dateien funktionieren, damit Sie während der Konvertierung jedes Moduls Tests ausführen können. Wenn Sie Jest verwenden, sollten Sie `ts-jest` in Betracht ziehen, das Tests von TypeScript-Projekten mit Jest ermöglicht.

Im dritten Schritt nehmen Sie Typdeklarationen für Drittanbieterbibliotheken in Ihr Projekt auf. Diese Deklarationen sind entweder im Paket enthalten oder auf DefinitelyTyped zu finden. Sie können unter [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) danach suchen und sie wie folgt installieren:

```shell
npm install --save-dev @types/package-name
```

oder

```shell
yarn add --dev @types/package-name
```

Im vierten Schritt migrieren Sie Modul für Modul nach einem Bottom-up-Ansatz. Folgen Sie dabei Ihrem Abhängigkeitsgraphen und beginnen Sie bei den Blättern. Die Idee besteht darin, zunächst Module zu konvertieren, die nicht von anderen Modulen abhängen. Zur Visualisierung der Abhängigkeitsgraphen können Sie das Werkzeug „madge“ verwenden.

Geeignete Module für diese ersten Konvertierungen sind Hilfsfunktionen und Code im Zusammenhang mit externen APIs oder Spezifikationen. TypeScript-Typdefinitionen können automatisch aus Swagger-Verträgen, GraphQL- oder JSON-Schemas erzeugt und in Ihr Projekt aufgenommen werden.

Wenn keine Spezifikationen oder offiziellen Schemas verfügbar sind, können Sie Typen aus Rohdaten erzeugen, etwa aus dem von einem Server zurückgegebenen JSON. Es wird jedoch empfohlen, Typen aus Spezifikationen statt aus Daten zu erzeugen, damit keine Grenzfälle übersehen werden.

Verzichten Sie während der Migration auf Code-Refactoring und konzentrieren Sie sich ausschließlich darauf, Ihren Modulen Typen hinzuzufügen.

Im fünften Schritt aktivieren Sie „noImplicitAny“. Dadurch wird erzwungen, dass alle Typen bekannt und definiert sind, was die Arbeit mit TypeScript in Ihrem Projekt verbessert.

Während der Migration können Sie die Direktive `@ts-check` verwenden, die die TypeScript-Typprüfung in einer JavaScript-Datei aktiviert. Diese Direktive bietet eine weniger strenge Form der Typprüfung und kann zunächst dazu dienen, Probleme in JavaScript-Dateien zu erkennen. Wenn eine Datei `@ts-check` enthält, versucht TypeScript, Definitionen anhand von Kommentaren im JSDoc-Stil abzuleiten. Sie sollten JSDoc-Annotationen jedoch nur in einer sehr frühen Phase der Migration verwenden.

Erwägen Sie, den Standardwert von `noEmitOnError` in Ihrer tsconfig.json auf false zu belassen. So können Sie JavaScript-Quellcode auch dann ausgeben, wenn Fehler gemeldet werden.

