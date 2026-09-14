---
title: Začínáme s TypeScriptem
sidebar:
  order: 9
  label: 9. Začínáme s TypeScriptem
---


### Instalace

Visual Studio Code poskytuje výbornou podporu jazyka TypeScript, ale neobsahuje jeho kompilátor. K instalaci kompilátoru TypeScriptu můžete použít správce balíčků, například npm nebo yarn:

```shell
npm install typescript --save-dev
```

nebo

```shell
yarn add typescript --dev
```

Nezapomeňte vytvořený soubor lockfile zahrnout do commitu, aby všichni členové týmu používali stejnou verzi TypeScriptu.

Kompilátor TypeScriptu můžete spustit následujícími příkazy:

```shell
npx tsc
```

nebo

```shell
yarn tsc
```

Doporučuje se instalovat TypeScript pro jednotlivé projekty namísto globální instalace, protože to zajišťuje předvídatelnější proces sestavování. Pro jednorázové použití však můžete použít následující příkaz:

```shell
npx tsc
```

nebo jej nainstalovat globálně:

```shell
npm install -g typescript
```

Pokud používáte Microsoft Visual Studio, můžete TypeScript pro své projekty MSBuild získat jako balíček v NuGet. V konzoli NuGet Package Manager spusťte následující příkaz:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Při instalaci TypeScriptu se nainstalují dva spustitelné soubory: „tsc“ jako kompilátor TypeScriptu a „tsserver“ jako samostatný server TypeScriptu. Samostatný server obsahuje kompilátor a jazykové služby, které mohou editory a IDE využívat k inteligentnímu doplňování kódu.

Kromě toho je k dispozici několik transpilátorů kompatibilních s TypeScriptem, například Babel (pomocí pluginu) nebo swc. Tyto transpilátory lze použít k převodu kódu TypeScriptu do jiných cílových jazyků nebo verzí.

TypeScript 7.0 byl přepsán do Go jako nativní implementace kompilátoru a jazykové služby. Využívá více vláken se sdílenou pamětí a další optimalizace ke zrychlení úplných sestavení a funkcí editoru, čímž zkracuje dobu čekání na zpětnou vazbu při vývoji.

Některé výkonnostní funkce TypeScriptu 7.0 lze nastavit. Kontrola typů může pomocí `--checkers` běžet v paralelních pracovních vláknech; více vláken může zrychlit velké projekty, ale spotřebuje více paměti. Přepracovaný režim `--watch` vylepšuje sledování souborů napříč platformami. TypeScript 7.0 zatím neobsahuje API kompilátoru (stav k červenci 2026), takže nástroje, které stále potřebují API TypeScriptu 6.0, mohou běžet souběžně s TypeScriptem 7.0 pomocí `@typescript/typescript6` nebo aliasů npm.

### Konfigurace

TypeScript lze konfigurovat pomocí voleb příkazového řádku tsc nebo vyhrazeného konfiguračního souboru tsconfig.json umístěného v kořeni projektu.

K vygenerování souboru tsconfig.json předvyplněného doporučeným nastavením můžete použít následující příkaz:

```shell
tsc --init
```

Při místním spuštění příkazu `tsc` TypeScript zkompiluje kód s konfigurací uvedenou v nejbližším souboru tsconfig.json.

Zde je několik příkladů příkazů z příkazového řádku s výchozím nastavením:

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### Konfigurační soubor TypeScriptu

Soubor tsconfig.json slouží ke konfiguraci kompilátoru TypeScriptu (tsc). Obvykle se přidává do kořene projektu společně se souborem `package.json`.

Poznámky:

* tsconfig.json podporuje komentáře, i když je ve formátu json.
* Doporučuje se používat tento konfigurační soubor namísto voleb příkazového řádku.

Na následujícím odkazu najdete úplnou dokumentaci a schéma:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

Následuje seznam běžných a užitečných nastavení:

#### target

Vlastnost „target“ určuje, do jaké verze ECMAScriptu se má váš kód TypeScriptu vygenerovat či zkompilovat. Pro moderní prohlížeče je ES6 dobrou volbou. Poznámka: Podpora ES5 byla v TypeScriptu 6.0 označena za zastaralou a TypeScript 7.0 ji již nepodporuje.

#### lib

Vlastnost „lib“ určuje, které knihovní soubory mají být zahrnuty při kompilaci. TypeScript automaticky zahrnuje API pro funkce určené vlastností „target“, ale pro konkrétní potřeby lze některé knihovny vynechat nebo vybrat jednotlivé knihovny. Pokud například pracujete na serverovém projektu, můžete vyloučit knihovnu „DOM“, která je užitečná pouze v prostředí prohlížeče.

#### strict

Volba „strict“ zlepšuje typovou bezpečnost zapnutím přísnějších kontrol. Od TypeScriptu 6.0 je zapnutá ve výchozím nastavení; jinak byste ji měli v tsconfig.json explicitně nastavit na true. Zapnutí „strict“ umožňuje TypeScriptu:

* Generovat kód s „use strict“ pro každý zdrojový soubor.
* Zohledňovat „null“ a „undefined“ při kontrole typů.
* Zakázat použití typu „any“, pokud nejsou přítomny typové anotace.
* Ohlásit chybu při použití výrazu „this“, který by jinak znamenal typ „any“.

#### module

Vlastnost „module“ nastavuje modulový systém podporovaný zkompilovaným programem. Za běhu se používá zavaděč modulů k nalezení a spuštění závislostí podle určeného modulového systému.

Nejběžnějšími zavaděči modulů používanými v JavaScriptu jsou CommonJS v Node.js pro serverové aplikace a RequireJS pro moduly AMD ve webových aplikacích běžících v prohlížeči. TypeScript dokáže generovat kód pro různé modulové systémy, včetně UMD, System, ESNext, ES2015/ES6 a ES2020. Modulový systém by měl být zvolen podle cílového prostředí a mechanismu načítání modulů dostupného v daném prostředí.

Poznámka: Podpora starších modulových systémů (AMD, UMD, SystemJS) byla v TypeScriptu 6.0 označena za zastaralou a TypeScript 7.0 ji již nepodporuje.

#### moduleResolution

Vlastnost „moduleResolution“ určuje strategii vyhledávání modulů. Pro moderní kód TypeScriptu používejte „nodenext“ nebo „bundler“. Strategie „classic“ se používá pouze pro staré verze TypeScriptu (před verzí 1.6).

#### esModuleInterop

Vlastnost „esModuleInterop“ umožňuje výchozí importy z modulů CommonJS, které neexportovaly pomocí vlastnosti „default“; tato vlastnost poskytuje vrstvu kompatibility ve vygenerovaném JavaScriptu. Po zapnutí této volby můžeme použít `import MyLibrary from "my-library"` namísto `import * as MyLibrary from "my-library"`.

„esModuleInterop“ se původně zapínalo volitelně, aby se předešlo nekompatibilním změnám, ale již dlouho je doporučeným výchozím nastavením. Jeho vypnutí může při používání CommonJS s ESM způsobit nenápadné problémy za běhu. Poznámka: Od TypeScriptu 6.0 je toto bezpečnější chování pro vzájemnou kompatibilitu vždy zapnuté.

V TypeScriptu 6.0 byly některé starší konfigurační volby a syntaktické formy označeny za zastaralé nebo procházely přechodným obdobím se starým chováním. V TypeScriptu 7.0 způsobují chyby, nebo nemají žádný účinek.

Zastaralé prvky, které se změnily na chyby a nemají žádný účinek, jsou:

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* vypnutí `esModuleInterop` nebo `allowSyntheticDefaultImports`
* vypnutí `alwaysStrict`
* klíčové slovo `module` v deklaracích jmenných prostorů
* `asserts` u importů
* `/// <reference no-default-lib />` při použití `skipDefaultLibCheck`
* cesty k souborům v příkazovém řádku při existenci místního `tsconfig.json`, pokud není použito `--ignoreConfig`

#### jsx

Vlastnost „jsx“ se vztahuje pouze na soubory .tsx používané v ReactJS a řídí, jak se konstrukce JSX kompilují do JavaScriptu. Běžnou volbou je „preserve“, která při kompilaci vytvoří soubor .jsx a ponechá JSX beze změny, aby jej bylo možné předat dalším nástrojům, například Babelu, k dalším transformacím.

#### skipLibCheck

Vlastnost „skipLibCheck“ zabrání TypeScriptu v kontrole typů celých importovaných balíčků třetích stran. Tato vlastnost zkracuje dobu kompilace projektu. TypeScript bude i nadále kontrolovat váš kód proti definicím typů poskytovaným těmito balíčky.

#### files

Vlastnost „files“ předává kompilátoru seznam souborů, které musí být vždy zahrnuty do programu.

#### include

<!-- markdownlint-disable MD049 -->
Vlastnost „include“ předává kompilátoru seznam souborů, které chceme zahrnout. Tato vlastnost umožňuje vzory podobné globům, například „\*_“ pro libovolný podadresář, „_“ pro libovolný název souboru a „?“ pro volitelné znaky.
<!-- markdownlint-enable MD049 -->

#### exclude

Vlastnost „exclude“ předává kompilátoru seznam souborů, které nemají být zahrnuty do kompilace. Může jít například o soubory „node_modules“ nebo testovací soubory.
Poznámka: tsconfig.json umožňuje komentáře.

### importHelpers

TypeScript používá pomocný kód při generování kódu pro některé pokročilé funkce JavaScriptu nebo při převodu na starší verze. Ve výchozím nastavení se tyto pomocné funkce duplikují v souborech, které je používají. Volba `importHelpers` je místo toho importuje z modulu `tslib`, čímž zefektivňuje výsledný JavaScript.

### Rady pro migraci na TypeScript

U velkých projektů se doporučuje postupný přechod, při kterém budou zpočátku vedle sebe existovat kód TypeScriptu a kód JavaScriptu. Na TypeScript lze najednou převést pouze malé projekty.

Prvním krokem tohoto přechodu je začlenění TypeScriptu do procesu sestavování. To lze provést pomocí volby kompilátoru „allowJs“, která umožňuje, aby soubory .ts a .tsx existovaly vedle stávajících souborů JavaScriptu. Protože TypeScript použije pro proměnnou typ „any“, pokud jej nedokáže odvodit ze souborů JavaScriptu, doporučuje se na začátku migrace ve volbách kompilátoru vypnout „noImplicitAny“.

Druhým krokem je zajistit, aby vaše testy JavaScriptu fungovaly společně se soubory TypeScriptu a abyste mohli testy spouštět při převodu jednotlivých modulů. Pokud používáte Jest, zvažte použití `ts-jest`, který umožňuje testovat projekty TypeScriptu pomocí Jestu.

Třetím krokem je přidání deklarací typů pro knihovny třetích stran do projektu. Tyto deklarace mohou být součástí knihoven nebo je lze najít na DefinitelyTyped. Můžete je vyhledat na [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) a nainstalovat pomocí:

```shell
npm install --save-dev @types/package-name
```

nebo

```shell
yarn add --dev @types/package-name
```

Čtvrtým krokem je migrace jednotlivých modulů zdola nahoru podle grafu závislostí, počínaje listy. Cílem je začít převodem modulů, které nezávisí na jiných modulech. K vizualizaci grafů závislostí můžete použít nástroj „madge“.

Vhodnými kandidáty pro tyto počáteční převody jsou pomocné funkce a kód související s externími API nebo specifikacemi. Definice typů TypeScriptu lze automaticky generovat z kontraktů Swagger, GraphQL nebo schémat JSON a zahrnout je do projektu.

Pokud nejsou k dispozici specifikace nebo oficiální schémata, můžete typy generovat ze surových dat, například z JSON vráceného serverem. Doporučuje se však generovat typy ze specifikací namísto dat, aby nebyly opomenuty okrajové případy.

Během migrace se vyhněte refaktoringu kódu a zaměřte se pouze na přidávání typů do modulů.

Pátým krokem je zapnutí „noImplicitAny“, které vynutí, aby všechny typy byly známé a definované, a tím zlepší práci s TypeScriptem ve vašem projektu.

Během migrace můžete použít direktivu `@ts-check`, která zapíná kontrolu typů TypeScriptu v souboru JavaScriptu. Tato direktiva poskytuje mírnější variantu kontroly typů a lze ji zpočátku využít k odhalování problémů v souborech JavaScriptu. Pokud je v souboru uvedeno `@ts-check`, TypeScript se pokusí odvodit definice pomocí komentářů ve stylu JSDoc. Použití anotací JSDoc však zvažujte pouze ve velmi rané fázi migrace.

Zvažte ponechání výchozí hodnoty `noEmitOnError` ve vašem tsconfig.json na false. To umožní vygenerovat zdrojový kód JavaScriptu i při ohlášených chybách.

