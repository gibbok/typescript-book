---
title: Komma igång med TypeScript
sidebar:
  order: 8
  label: 8. Komma igång med TypeScript
---


### Installation

Visual Studio Code erbjuder utmärkt stöd för TypeScript-språket men inkluderar inte TypeScript-kompilatorn. För att installera TypeScript-kompilatorn kan du använda en pakethanterare som npm eller yarn:

```shell
npm install typescript --save-dev
```

eller

```shell
yarn add typescript --dev
```

Se till att committa den genererade lockfilen för att säkerställa att varje teammedlem använder samma version av TypeScript.

För att köra TypeScript-kompilatorn kan du använda följande kommandon

```shell
npx tsc
```

eller

```shell
yarn tsc
```

Det rekommenderas att installera TypeScript projektvis snarare än globalt, eftersom det ger en mer förutsägbar byggprocess. För enstaka tillfällen kan du dock använda följande kommando:

```shell
npx tsc
```

eller installera det globalt:

```shell
npm install -g typescript
```

Om du använder Microsoft Visual Studio kan du hämta TypeScript som ett paket i NuGet för dina MSBuild-projekt. I NuGet Package Manager Console kör du följande kommando:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Under TypeScript-installationen installeras två körbara filer: "tsc" som TypeScript-kompilatorn och "tsserver" som den fristående TypeScript-servern. Den fristående servern innehåller kompilatorn och språktjänster som kan användas av redigerare och IDE:er för att tillhandahålla intelligent kodkomplettering.

Dessutom finns det flera TypeScript-kompatibla transpilerare tillgängliga, såsom Babel (via ett plugin) eller swc. Dessa transpilerare kan användas för att konvertera TypeScript-kod till andra målspråk eller versioner.

### Konfiguration

TypeScript kan konfigureras med hjälp av tsc CLI-alternativ eller genom att använda en dedikerad konfigurationsfil kallad tsconfig.json som placeras i projektets rot.

För att generera en tsconfig.json-fil förfylld med rekommenderade inställningar kan du använda följande kommando:

```shell
tsc --init
```

När kommandot `tsc` körs lokalt kommer TypeScript att kompilera koden med den konfiguration som anges i den närmaste tsconfig.json-filen.

Här är några exempel på CLI-kommandon som körs med standardinställningarna:

```shell
tsc main.ts // Kompilera a specific file (main.ts) till JavaScript
tsc src/*.ts // Kompilera any .ts filer under 'src' folder till JavaScript
tsc app.ts util.ts --outfile index.js // Kompilera two TypeScript files (app.ts och util.ts) till en enda JavaScript-fil (index.js)
```

### TypeScript-konfigurationsfil

En tsconfig.json-fil används för att konfigurera TypeScript-kompilatorn (tsc). Vanligtvis läggs den till i projektets rot, tillsammans med filen `package.json`.

Observera:

* tsconfig.json accepterar kommentarer även om det är i json-format.
* Det är tillrådligt att använda denna konfigurationsfil istället för kommandoradsalternativ.

På följande länk hittar du den fullständiga dokumentationen och dess schema:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

Följande representerar en lista över de vanligaste och mest användbara konfigurationerna:

#### target

Egenskapen "target" används för att ange vilken version av JavaScript ECMAScript-version din TypeScript ska generera/kompilera till. För moderna webbläsare är ES6 ett bra alternativ, för äldre webbläsare rekommenderas ES5.

#### lib

Egenskapen "lib" används för att ange vilka biblioteksfiler som ska inkluderas vid kompilering. TypeScript inkluderar automatiskt API:er för funktioner som anges i "target"-egenskapen, men det är möjligt att utelämna eller välja specifika bibliotek för särskilda behov. Till exempel, om du arbetar med ett serverprojekt kan du exkludera "DOM"-biblioteket, som bara är användbart i en webbläsarmiljö.

#### strict

Egenskapen "strict" möjliggör starkare garantier och förbättrar typsäkerheten. Det är tillrådligt att alltid inkludera denna egenskap i ditt projekts tsconfig.json-fil. Att aktivera egenskapen "strict" gör att TypeScript:

* Genererar kod med "use strict" för varje källfil.
* Beaktar "null" och "undefined" i typkontrollprocessen.
* Inaktiverar användningen av typen "any" när inga typannoteringar finns.
* Ger ett fel vid användning av "this"-uttrycket, som annars skulle innebära typen "any".

#### module

Egenskapen "module" anger det modulsystem som stöds för det kompilerade programmet. Vid körning används en modulladdare för att lokalisera och köra beroenden baserat på det angivna modulsystemet.

De vanligaste modulladdarna som används i JavaScript är Node.js CommonJS för serversidans applikationer och RequireJS för AMD-moduler i webbläsarbaserade webbapplikationer. TypeScript kan generera kod för olika modulsystem, inklusive UMD, System, ESNext, ES2015/ES6 och ES2020.

Observera: Modulsystemet bör väljas baserat på målmiljön och den modulladdningsmekanism som finns tillgänglig i den miljön.

#### moduleResolution

Egenskapen "moduleResolution" anger strategin för modulupplösning. Använd "node" för modern TypeScript-kod, strategin "classic" används bara för gamla versioner av TypeScript (före 1.6).

#### esModuleInterop

Egenskapen "esModuleInterop" gör det möjligt att importera standard från CommonJS-moduler som inte exporterade med "default"-egenskapen. Denna egenskap tillhandahåller en shim för att säkerställa kompatibilitet i den genererade JavaScript-koden. Efter att ha aktiverat detta alternativ kan vi använda `import MyLibrary from "my-library"` istället för `import * as MyLibrary from "my-library"`.

#### jsx

Egenskapen "jsx" gäller bara för .tsx-filer som används i ReactJS och styr hur JSX-konstruktioner kompileras till JavaScript. Ett vanligt alternativ är "preserve" som kompilerar till en .jsx-fil och behåller JSX oförändrat så att det kan skickas vidare till olika verktyg som Babel för ytterligare transformationer.

#### skipLibCheck

Egenskapen "skipLibCheck" hindrar TypeScript från att typkontrollera hela importerade tredjepartspaket. Denna egenskap minskar kompileringstiden för ett projekt. TypeScript kommer fortfarande att kontrollera din kod mot typdefinitionerna som tillhandahålls av dessa paket.

#### files

Egenskapen "files" anger för kompilatorn en lista med filer som alltid måste inkluderas i programmet.

#### include

<!-- markdownlint-disable MD049 -->
Egenskapen "include" anger för kompilatorn en lista med filer som vi vill inkludera. Denna egenskap tillåter glob-liknande mönster, såsom "\*_" för valfri underkatalog, "_" för valfritt filnamn och "?" för valfria tecken.
<!-- markdownlint-enable MD049 -->

#### exclude

Egenskapen "exclude" anger för kompilatorn en lista med filer som inte bör inkluderas i kompileringen. Detta kan inkludera filer som "node_modules" eller testfiler.
Observera: tsconfig.json tillåter kommentarer.

### importHelpers

TypeScript använder hjälpkod när det genererar kod för vissa avancerade eller nedåtkompatibla JavaScript-funktioner. Som standard dupliceras dessa hjälpfunktioner i filer som använder dem. Alternativet `importHelpers` importerar dessa hjälpfunktioner från modulen `tslib` istället, vilket gör JavaScript-utdata mer effektiv.

### Råd vid migrering till TypeScript

För stora projekt rekommenderas en gradvis övergång där TypeScript- och JavaScript-kod initialt samexisterar. Bara små projekt kan migreras till TypeScript på en gång.

Det första steget i denna övergång är att introducera TypeScript i byggkedjeprocessen. Detta kan göras genom att använda kompilatoralternativet "allowJs", som tillåter att .ts- och .tsx-filer samexisterar med befintliga JavaScript-filer. Eftersom TypeScript faller tillbaka till typen "any" för en variabel när det inte kan härleda typen från JavaScript-filer, rekommenderas det att inaktivera "noImplicitAny" i dina kompilatoralternativ i början av migreringen.

Det andra steget är att säkerställa att dina JavaScript-tester fungerar tillsammans med TypeScript-filer så att du kan köra tester allt eftersom du konverterar varje modul. Om du använder Jest, överväg att använda `ts-jest`, som gör det möjligt att testa TypeScript-projekt med Jest.

Det tredje steget är att inkludera typdeklarationer för tredjepartsbibliotek i ditt projekt. Dessa deklarationer kan hittas antingen medföljande eller på DefinitelyTyped. Du kan söka efter dem med [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) och installera dem med:

```shell
npm install --save-dev @types/package-name
```

eller

```shell
yarn add --dev @types/package-name.
```

Det fjärde steget är att migrera modul för modul med en nedifrån-och-upp-metod, genom att följa ditt beroendeträd med start från löven. Tanken är att börja konvertera moduler som inte är beroende av andra moduler. För att visualisera beroendegrafer kan du använda verktyget "madge".

Bra kandidatmoduler för dessa initiala konverteringar är hjälpfunktioner och kod relaterad till externa API:er eller specifikationer. Det är möjligt att automatiskt generera TypeScript-typdefinitioner från Swagger-kontrakt, GraphQL- eller JSON-scheman som kan inkluderas i ditt projekt.

När det inte finns några specifikationer eller officiella scheman tillgängliga kan du generera typer från rådata, såsom JSON som returneras av en server. Det rekommenderas dock att generera typer från specifikationer istället för data för att undvika att missa specialfall.

Under migreringen bör du avstå från kodrefaktorisering och fokusera enbart på att lägga till typer i dina moduler.

Det femte steget är att aktivera "noImplicitAny", vilket kommer att se till att alla typer är kända och definierade, vilket ger en bättre TypeScript-upplevelse för ditt projekt.

Under migreringen kan du använda direktivet `@ts-check`, som aktiverar TypeScript-typkontroll i en JavaScript-fil. Detta direktiv tillhandahåller en lös version av typkontroll och kan initialt användas för att identifiera problem i JavaScript-filer. När `@ts-check` inkluderas i en fil kommer TypeScript att försöka härleda definitioner med hjälp av kommentarer i JSDoc-stil. Överväg dock att använda JSDoc-annoteringar bara i ett mycket tidigt skede av migreringen.

Överväg att behålla standardvärdet för `noEmitOnError` i din tsconfig.json som false. Detta gör att du kan generera JavaScript-källkod även om fel rapporteras.

