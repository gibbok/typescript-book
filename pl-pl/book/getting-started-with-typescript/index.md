# Pierwsze kroki z TypeScript



### Instalacja

Visual Studio Code oferuje doskonałą obsługę języka TypeScript, ale nie zawiera kompilatora TypeScript. Aby zainstalować kompilator TypeScript, można użyć menedżera pakietów, takiego jak npm lub yarn:

```shell
npm install typescript --save-dev
```

lub

```shell
yarn add typescript --dev
```

Należy pamiętać o dodaniu wygenerowanego pliku blokady do repozytorium, aby każdy członek zespołu korzystał z tej samej wersji TypeScript.

Aby uruchomić kompilator TypeScript, można użyć następujących poleceń:

```shell
npx tsc
```

lub

```shell
yarn tsc
```

Zaleca się instalowanie TypeScript na poziomie projektu, a nie globalnie, ponieważ zapewnia to bardziej przewidywalny proces kompilacji. Jednak do jednorazowego użycia można zastosować następujące polecenie:

```shell
npx tsc
```

lub zainstalować go globalnie:

```shell
npm install -g typescript
```

Jeśli używasz Microsoft Visual Studio, możesz uzyskać TypeScript jako pakiet NuGet dla swoich projektów MSBuild. W konsoli menedżera pakietów NuGet uruchom następujące polecenie:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Podczas instalacji TypeScript instalowane są dwa pliki wykonywalne: „tsc” jako kompilator TypeScript oraz „tsserver” jako samodzielny serwer TypeScript. Samodzielny serwer zawiera kompilator i usługi językowe, które mogą być wykorzystywane przez edytory oraz zintegrowane środowiska programistyczne do zapewniania inteligentnego uzupełniania kodu.

Dostępnych jest również kilka transpilerów zgodnych z TypeScript, takich jak Babel (za pośrednictwem wtyczki) lub swc. Można ich używać do konwertowania kodu TypeScript na inne języki docelowe lub wersje.

TypeScript 7.0 został przepisany w Go jako natywna implementacja kompilatora i usługi językowej. Wykorzystuje wielowątkowość z pamięcią współdzieloną oraz inne optymalizacje, aby przyspieszyć pełne kompilacje i funkcje edytora, skracając czas oczekiwania na informacje zwrotne podczas programowania.

Niektóre funkcje wydajnościowe TypeScript 7.0 można dostosować. Sprawdzanie typów może działać w równoległych procesach roboczych za pomocą opcji `--checkers`; większa liczba procesów może przyspieszyć duże projekty, ale zużywa więcej pamięci. Przebudowany tryb `--watch` usprawnia monitorowanie zmian w plikach na różnych platformach. TypeScript 7.0 nie zawiera jeszcze interfejsu API kompilatora (stan na lipiec 2026), dlatego narzędzia, które nadal wymagają interfejsu API TypeScript 6.0, mogą działać równolegle z TypeScript 7.0 dzięki użyciu `@typescript/typescript6` lub aliasów npm.

### Konfiguracja

TypeScript można skonfigurować za pomocą opcji interfejsu wiersza poleceń tsc lub specjalnego pliku konfiguracyjnego o nazwie tsconfig.json, umieszczonego w katalogu głównym projektu.

Aby wygenerować plik tsconfig.json ze wstępnie zdefiniowanymi zalecanymi ustawieniami, można użyć następującego polecenia:

```shell
tsc --init
```

Podczas lokalnego wykonywania polecenia `tsc` TypeScript skompiluje kod przy użyciu konfiguracji określonej w najbliższym pliku tsconfig.json.

Oto kilka przykładów poleceń interfejsu wiersza poleceń uruchamianych z ustawieniami domyślnymi:

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### Plik konfiguracyjny TypeScript

Plik tsconfig.json służy do konfigurowania kompilatora TypeScript (tsc). Zwykle umieszcza się go w katalogu głównym projektu razem z plikiem `package.json`.

Uwagi:

* Plik tsconfig.json akceptuje komentarze, mimo że ma format json.
* Zaleca się używanie tego pliku konfiguracyjnego zamiast opcji wiersza poleceń.

Pod poniższym łączem można znaleźć pełną dokumentację i jej schemat:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

Poniżej przedstawiono listę często używanych i przydatnych opcji konfiguracji:

#### target

Właściwość „target” służy do określania wersji ECMAScript, do której kod TypeScript ma zostać wyemitowany lub skompilowany. W przypadku nowoczesnych przeglądarek dobrym wyborem jest ES6. Uwaga: obsługa ES5 została uznana za przestarzałą w TypeScript 6.0 i nie jest już dostępna w TypeScript 7.0.

#### lib

Właściwość „lib” służy do określania plików bibliotek, które mają zostać uwzględnione podczas kompilacji. TypeScript automatycznie uwzględnia interfejsy API dla funkcjonalności określonych we właściwości „target”, ale można pominąć lub wybrać konkretne biblioteki zależnie od potrzeb. Na przykład podczas pracy nad projektem serwerowym można wykluczyć bibliotekę „DOM”, która jest przydatna tylko w środowisku przeglądarki.

#### strict

Opcja „strict” zwiększa bezpieczeństwo typów przez włączenie bardziej rygorystycznych kontroli. Począwszy od TypeScript 6.0 jest domyślnie włączona; w przeciwnym razie należy jawnie ustawić ją na true w pliku tsconfig.json. Włączenie opcji „strict” sprawia, że TypeScript:

* Emituje kod z użyciem „use strict” dla każdego pliku źródłowego.
* Uwzględnia „null” i „undefined” w procesie sprawdzania typów.
* Wyłącza użycie typu „any”, gdy nie ma adnotacji typów.
* Zgłasza błąd w przypadku użycia wyrażenia „this”, które w przeciwnym razie implikowałoby typ „any”.

#### module

Właściwość „module” ustawia system modułów obsługiwany przez skompilowany program. W czasie wykonywania mechanizm ładujący moduły służy do lokalizowania i wykonywania zależności na podstawie określonego systemu modułów.

Najczęściej używanymi mechanizmami ładowania modułów w JavaScript są CommonJS w środowisku Node.js dla aplikacji serwerowych oraz RequireJS dla modułów AMD w aplikacjach internetowych działających w przeglądarce. TypeScript może emitować kod dla różnych systemów modułów, w tym UMD, System, ESNext, ES2015/ES6 i ES2020. System modułów należy wybrać na podstawie środowiska docelowego i dostępnego w nim mechanizmu ładowania modułów.

Uwaga: obsługa starszych systemów modułów (AMD, UMD, SystemJS) została uznana za przestarzałą w TypeScript 6.0 i nie jest już dostępna w TypeScript 7.0.

#### moduleResolution

Właściwość „moduleResolution” określa strategię rozwiązywania modułów. W nowoczesnym kodzie TypeScript należy używać „nodenext” lub „bundler”. Strategia „classic” jest używana tylko w starych wersjach TypeScript (sprzed wersji 1.6).

#### esModuleInterop

Właściwość „esModuleInterop” umożliwia domyślne importy z modułów CommonJS, które nie eksportowały za pomocą właściwości „default”; ta właściwość zapewnia kod zgodności w wygenerowanym kodzie JavaScript. Po włączeniu tej opcji można używać `import MyLibrary from "my-library"` zamiast `import * as MyLibrary from "my-library"`.

Opcja „esModuleInterop” była pierwotnie opcjonalna, aby uniknąć zmian niezgodnych wstecznie, ale od dawna jest zalecanym ustawieniem domyślnym. Jej wyłączenie może powodować subtelne problemy w czasie wykonywania podczas używania CommonJS z ESM. Uwaga: począwszy od TypeScript 6.0, to bezpieczniejsze zachowanie interoperacyjności jest zawsze włączone.

W TypeScript 6.0 niektóre starsze opcje konfiguracji i formy składni zostały uznane za przestarzałe lub w okresie przejściowym zachowywały dotychczasowe działanie. W TypeScript 7.0 powodują one twarde błędy lub nie wywołują żadnego działania.

Elementy uznane za przestarzałe, które obecnie powodują twarde błędy i nie wywołują żadnego działania, to:

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* wyłączenie `esModuleInterop` lub `allowSyntheticDefaultImports`
* wyłączenie `alwaysStrict`
* słowo kluczowe `module` w deklaracjach przestrzeni nazw
* `asserts` w importach
* `/// <reference no-default-lib />` przy włączonej opcji `skipDefaultLibCheck`
* ścieżki plików przekazane w interfejsie wiersza poleceń przy lokalnym pliku `tsconfig.json`, chyba że użyto opcji `--ignoreConfig`

#### jsx

Właściwość „jsx” ma zastosowanie wyłącznie do plików .tsx używanych w ReactJS i steruje sposobem kompilowania konstrukcji JSX do JavaScript. Często używaną opcją jest „preserve”, która kompiluje kod do pliku .jsx, pozostawiając JSX bez zmian, aby można go było przekazać do innych narzędzi, takich jak Babel, w celu dalszych transformacji.

#### skipLibCheck

Właściwość „skipLibCheck” zapobiega sprawdzaniu przez TypeScript typów całych importowanych pakietów innych firm. Skraca to czas kompilacji projektu. TypeScript nadal sprawdza kod względem definicji typów udostępnionych przez te pakiety.

#### files

Właściwość „files” wskazuje kompilatorowi listę plików, które muszą zawsze być uwzględnione w programie.

#### include

<!-- markdownlint-disable MD049 -->
Właściwość „include” wskazuje kompilatorowi listę plików, które mają zostać uwzględnione. Właściwość ta umożliwia stosowanie wzorców podobnych do globów, takich jak „\*_” dla dowolnego podkatalogu, „_” dla dowolnej nazwy pliku oraz „?” dla znaków opcjonalnych.
<!-- markdownlint-enable MD049 -->

#### exclude

Właściwość „exclude” wskazuje kompilatorowi listę plików, które nie powinny być uwzględniane w kompilacji. Może ona obejmować pliki takie jak „node_modules” lub pliki testowe.
Uwaga: plik tsconfig.json dopuszcza komentarze.

### importHelpers

TypeScript używa kodu funkcji pomocniczych podczas generowania kodu dla niektórych zaawansowanych funkcji JavaScript lub funkcji transpilowanych do starszych wersji. Domyślnie te funkcje pomocnicze są powielane w plikach, które z nich korzystają. Opcja `importHelpers` importuje je zamiast tego z modułu `tslib`, dzięki czemu wygenerowany kod JavaScript jest bardziej wydajny.

### Wskazówki dotyczące migracji do TypeScript

W przypadku dużych projektów zaleca się stopniowe przejście, podczas którego kod TypeScript i JavaScript będą początkowo współistnieć. Tylko małe projekty można zmigrować do TypeScript za jednym razem.

Pierwszym krokiem tego przejścia jest wprowadzenie TypeScript do procesu kompilacji. Można to zrobić za pomocą opcji kompilatora „allowJs”, która pozwala plikom .ts i .tsx współistnieć z istniejącymi plikami JavaScript. Ponieważ TypeScript używa typu „any” dla zmiennej, gdy nie może wywnioskować jej typu z plików JavaScript, na początku migracji zaleca się wyłączenie opcji „noImplicitAny” w opcjach kompilatora.

Drugim krokiem jest upewnienie się, że testy JavaScript działają razem z plikami TypeScript, aby można było uruchamiać testy podczas konwertowania każdego modułu. Jeśli używasz Jest, rozważ użycie `ts-jest`, które umożliwia testowanie projektów TypeScript za pomocą Jest.

Trzecim krokiem jest dodanie do projektu deklaracji typów dla bibliotek innych firm. Deklaracje te można znaleźć w pakiecie z biblioteką lub w repozytorium DefinitelyTyped. Można je wyszukać pod adresem [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) i zainstalować za pomocą polecenia:

```shell
npm install --save-dev @types/package-name
```

lub

```shell
yarn add --dev @types/package-name
```

Czwartym krokiem jest migrowanie moduł po module zgodnie z podejściem oddolnym, zaczynając od liści grafu zależności. Chodzi o to, aby zacząć konwertowanie modułów, które nie zależą od innych modułów. Do wizualizacji grafów zależności można użyć narzędzia „madge”.

Dobrymi kandydatami do początkowej konwersji są moduły funkcji narzędziowych oraz kod związany z zewnętrznymi interfejsami API lub specyfikacjami. Możliwe jest automatyczne generowanie definicji typów TypeScript na podstawie kontraktów Swagger oraz schematów GraphQL lub JSON, które można następnie uwzględnić w projekcie.

Gdy nie są dostępne żadne specyfikacje ani oficjalne schematy, można wygenerować typy na podstawie nieprzetworzonych danych, takich jak dane JSON zwracane przez serwer. Zaleca się jednak generowanie typów na podstawie specyfikacji, a nie danych, aby uniknąć pominięcia przypadków brzegowych.

Podczas migracji należy powstrzymać się od refaktoryzacji kodu i skupić wyłącznie na dodawaniu typów do modułów.

Piątym krokiem jest włączenie opcji „noImplicitAny”, która wymusi, aby wszystkie typy były znane i zdefiniowane, zapewniając lepsze środowisko pracy z TypeScript w projekcie.

Podczas migracji można używać dyrektywy `@ts-check`, która włącza sprawdzanie typów TypeScript w pliku JavaScript. Dyrektywa ta zapewnia luźniejszą wersję sprawdzania typów i może być początkowo używana do identyfikowania problemów w plikach JavaScript. Gdy dyrektywa `@ts-check` jest umieszczona w pliku, TypeScript próbuje wywnioskować definicje za pomocą komentarzy w stylu JSDoc. Należy jednak rozważyć używanie adnotacji JSDoc wyłącznie na bardzo wczesnym etapie migracji.

Rozważ pozostawienie domyślnej wartości opcji `noEmitOnError` w pliku tsconfig.json jako false. Pozwoli to generować kod źródłowy JavaScript nawet w przypadku zgłoszenia błędów.

