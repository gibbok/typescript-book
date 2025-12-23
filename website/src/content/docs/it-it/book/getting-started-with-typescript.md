---
title: Per iniziare con TypeScript
sidebar:
  order: 8
  label: 8. Per iniziare con TypeScript
---


### Installazione

Visual Studio Code offre un eccellente supporto per il linguaggio TypeScript, ma non include il compilatore TypeScript. Per installare il compilatore TypeScript, è possibile utilizzare un gestore di pacchetti come npm o yarn:

```shell
npm install typescript --save-dev
```

oppure

```shell
yarn add typescript --dev
```

Assicurarsi di eseguire il commit del file di lock generato per garantire che ogni membro del team utilizzi la stessa versione di TypeScript.

Per eseguire il compilatore TypeScript, è possibile utilizzare i seguenti comandi:

```shell
npx tsc
```

oppure

```shell
yarn tsc
```

Si consiglia di installare TypeScript a livello di progetto anziché globale, poiché garantisce un processo di build più prevedibile. Tuttavia, per occasioni particolari, è possibile utilizzare il seguente comando:

```shell
npx tsc
```

oppure installarlo globalmente:

```shell
npm install -g typescript
```

Se si utilizza Microsoft Visual Studio, è possibile ottenere TypeScript come pacchetto in NuGet per i progetti MSBuild. Nella console di Gestione Pacchetti di NuGet, eseguire il seguente comando:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Durante l'installazione di TypeScript, vengono installati due eseguibili: "tsc" come compilatore TypeScript e "tsserver" come server autonomo TypeScript. Il server autonomo contiene il compilatore e i servizi linguistici che possono essere utilizzati da editor e IDE per fornire il completamento intelligente del codice.

Inoltre, sono disponibili diversi transpiler compatibili con TypeScript, come Babel (tramite un plugin) o swc. Questi transpiler possono essere utilizzati per convertire il codice TypeScript in altri linguaggi o versioni di destinazione.

### Configurazione

TypeScript può essere configurato utilizzando le opzioni della CLI di tsc o un file di configurazione dedicato chiamato tsconfig.json, posizionato nella radice del progetto.

Per generare un file tsconfig.json precompilato con le impostazioni consigliate, è possibile utilizzare il seguente comando:

```shell
tsc --init
```

Quando si esegue il comando `tsc` localmente, TypeScript compilerà il codice utilizzando la configurazione specificata nel file tsconfig.json più vicino.

Ecco alcuni esempi di comandi CLI che vengono eseguiti con le impostazioni predefinite:

```shell
tsc main.ts // Compila un file specifico (main.ts) in JavaScript
tsc src/*.ts // Compila tutti i file .ts nella cartella 'src' in JavaScript
tsc app.ts util.ts --outfile index.js // Compila due file TypeScript (app.ts e util.ts) in un singolo file JavaScript (index.js)
```

### File di configurazione TypeScript

Un file tsconfig.json viene utilizzato per configurare il compilatore TypeScript (tsc). Solitamente, viene aggiunto alla radice del progetto, insieme al file `package.json`.

Note:

* tsconfig.json accetta commenti anche se è in formato json.
* Si consiglia di utilizzare questo file di configurazione al posto delle opzioni della riga di comando.

Al seguente link potete trovare la documentazione completa e il relativo schema:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

Di seguito è riportato un elenco delle configurazioni più comuni e utili:

#### target

La proprietà "target" viene utilizzata per specificare in quale versione di JavaScript ECMAScript TypeScript deve emettere/compilare. Per i browser moderni, ES6 è una buona opzione, mentre per i browser più vecchi si consiglia ES5.

#### lib

La proprietà "lib" viene utilizzata per specificare quali file di libreria includere in fase di compilazione. TypeScript include automaticamente le API per le funzionalità specificate nella proprietà "target", ma è possibile omettere o selezionare librerie specifiche per esigenze particolari. Ad esempio, se si lavora su un progetto server, è possibile escludere la libreria "DOM", utile solo in un ambiente browser.

#### strict

La proprietà "strict" offre garanzie più solide e migliora la sicurezza dei tipi. Si consiglia di includere sempre questa proprietà nel file tsconfig.json del progetto. Abilitando la proprietà "strict", TypeScript può:

* Emettere codice utilizzando "use strict" per ogni file sorgente.
* Considerare "null" e "undefined" nel processo di controllo dei tipi.
* Disabilitare l'utilizzo del tipo "any" quando non sono presenti annotazioni di tipo.
* Generare un errore sull'utilizzo dell'espressione "this", che altrimenti implicherebbe il tipo "any".

#### module

La proprietà "module" imposta il sistema di moduli supportato dal programma compilato. Durante l'esecuzione, un caricatore di moduli viene utilizzato per individuare ed eseguire le dipendenze in base al sistema di moduli specificato.

I caricatori di moduli più comuni utilizzati in JavaScript sono Node.js CommonJS per le applicazioni lato server e RequireJS per i moduli AMD nelle applicazioni web basate su browser. TypeScript può generare codice per vari sistemi di moduli, tra cui UMD, System, ESNext, ES2015/ES6 ed ES2020.

Nota: il sistema di moduli deve essere scelto in base all'ambiente di destinazione e al meccanismo di caricamento dei moduli disponibile in tale ambiente.

#### moduleResolution

La proprietà "moduleResolution" specifica la strategia di risoluzione dei moduli. Utilizzare "node" per il codice TypeScript moderno, la strategia "classic" viene utilizzata solo per le vecchie versioni di TypeScript (precedenti alla 1.6).

#### esModuleInterop

La proprietà "esModuleInterop" consente l'importazione predefinita dai moduli CommonJS che non sono stati esportati utilizzando la proprietà "default". Questa proprietà fornisce uno shim per garantire la compatibilità nel codice JavaScript emesso. Dopo aver abilitato questa opzione, possiamo usare `import MyLibrary from "my-library"` invece di `import * as MyLibrary from "my-library"`.

#### jsx

La proprietà "jsx" si applica solo ai file .tsx utilizzati in ReactJS e controlla il modo in cui i costrutti JSX vengono compilati in JavaScript. Un'opzione comune è "preserve", che compilerà in un file .jsx mantenendo invariato il codice JSX, in modo che possa essere passato a diversi strumenti come Babel per ulteriori trasformazioni.

#### skipLibCheck

La proprietà "skipLibCheck" impedisce a TypeScript di controllare il tipo di tutti i pacchetti di terze parti importati. Questa proprietà riduce il tempo di compilazione di un progetto. TypeScript controllerà comunque il codice rispetto alle definizioni di tipo fornite da questi pacchetti.

#### files

La proprietà "files" indica al compilatore un elenco di file che devono essere sempre inclusi nel programma.

#### include

<!-- markdownlint-disable MD049 -->

La proprietà "include" indica al compilatore un elenco di file che si desidera includere. Questa proprietà consente schemi di tipo glob, come "\*_" per qualsiasi sottodirectory, "_" per qualsiasi nome di file e "?" per caratteri opzionali.

<!-- markdownlint-enable MD049 -->

#### exclude

La proprietà "exclude" indica al compilatore un elenco di file che non devono essere inclusi nella compilazione. Questo può includere file come "node_modules" o file di test.
Nota: tsconfig.json consente commenti.

### importHelpers

TypeScript utilizza codice helper durante la generazione di codice per determinate funzionalità JavaScript avanzate o di livello inferiore. Per impostazione predefinita, questi helper vengono duplicati nei file che li utilizzano. L'opzione `importHelpers` importa invece questi helper dal modulo `tslib`, rendendo l'output JavaScript più efficiente.

### Consigli per la migrazione a TypeScript

Per progetti di grandi dimensioni, si consiglia di adottare una transizione graduale in cui TypeScript e codice JavaScript coesisteranno inizialmente. Solo i progetti di piccole dimensioni possono essere migrati a TypeScript in un'unica soluzione.

Il primo passo di questa transizione è introdurre TypeScript nel processo di build chain. Questo può essere fatto utilizzando l'opzione del compilatore "allowJs", che consente ai file .ts e .tsx di coesistere con i file JavaScript esistenti. Poiché TypeScript tornerà al tipo "any" per una variabile quando non riesce a dedurre il tipo dai file JavaScript, si consiglia di disabilitare "noImplicitAny" nelle opzioni del compilatore all'inizio della migrazione.

Il secondo passaggio consiste nell'assicurarsi che i test JavaScript funzionino insieme ai file TypeScript, in modo da poterli eseguire durante la conversione di ciascun modulo. Se si utilizza Jest, si può valutare l'utilizzo di `ts-jest`, che consente di testare i progetti TypeScript con Jest.

Il terzo passaggio consiste nell'includere le dichiarazioni di tipo per le librerie di terze parti nel progetto. Queste dichiarazioni sono disponibili in bundle o su DefinitelyTyped. È possibile cercarle utilizzando [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) e installarle tramite:

```shell
npm install --save-dev @types/package-name
```

or

```shell
yarn add --dev @types/package-name
```

Il quarto passaggio consiste nel migrare modulo per modulo con un approccio bottom-up, seguendo il grafo delle dipendenze partendo dalle foglie. L'idea è di iniziare a convertire i moduli che non dipendono da altri moduli. Per visualizzare i grafici delle dipendenze, è possibile utilizzare lo strumento "madge".

I moduli candidati ideali per queste conversioni iniziali sono funzioni di utilità e codice relativo ad API o specifiche esterne. È possibile generare automaticamente definizioni di tipo TypeScript da contratti Swagger, schemi GraphQL o JSON da includere nel progetto.

Quando non sono disponibili specifiche o schemi ufficiali, è possibile generare tipi da dati grezzi, come JSON restituiti da un server. Tuttavia, si consiglia di generare tipi da specifiche anziché da dati per evitare di perdere casi limite.

Durante la migrazione, evitare il refactoring del codice e concentrarsi solo sull'aggiunta di tipi ai moduli.

Il quinto passaggio consiste nell'abilitare "noImplicitAny", che garantirà che tutti i tipi siano noti e definiti, offrendo una migliore esperienza TypeScript per il progetto.

Durante la migrazione, è possibile utilizzare la direttiva `@ts-check`, che abilita il controllo dei tipi TypeScript in un file JavaScript. Questa direttiva fornisce una versione semplificata del controllo dei tipi e può essere utilizzata inizialmente per identificare problemi nei file JavaScript. Quando `@ts-check` è incluso in un file, TypeScript tenterà di dedurre le definizioni utilizzando commenti in stile JSDoc. Tuttavia, si consiglia di utilizzare le annotazioni JSDoc solo in una fase molto precoce della migrazione.

Si consiglia di mantenere il valore predefinito di `noEmitOnError` nel file tsconfig.json su false. Questo consentirà di generare codice sorgente JavaScript anche se vengono segnalati errori.

