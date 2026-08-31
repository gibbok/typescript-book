---
title: TypeScript'e Başlarken
sidebar:
  order: 9
  label: 9. TypeScript'e Başlarken
---


### Kurulum

Visual Studio Code, TypeScript dili için mükemmel destek sunar ancak TypeScript derleyicisini içermez. TypeScript derleyicisini kurmak için npm veya yarn gibi bir paket yöneticisi kullanabilirsiniz:

```shell
npm install typescript --save-dev
```

veya

```shell
yarn add typescript --dev
```

Her ekip üyesinin aynı TypeScript sürümünü kullanmasını sağlamak için oluşturulan kilit dosyasını kaynak denetimine eklediğinizden emin olun.

TypeScript derleyicisini çalıştırmak için aşağıdaki komutları kullanabilirsiniz

```shell
npx tsc
```

veya

```shell
yarn tsc
```

Daha öngörülebilir bir derleme süreci sağladığından TypeScript'i global olarak değil, proje bazında kurmanız önerilir. Ancak tek seferlik durumlarda aşağıdaki komutu kullanabilirsiniz:

```shell
npx tsc
```

veya global olarak kurabilirsiniz:

```shell
npm install -g typescript
```

Microsoft Visual Studio kullanıyorsanız MSBuild projeleriniz için TypeScript'i NuGet'te bir paket olarak edinebilirsiniz. NuGet Paket Yöneticisi Konsolu'nda aşağıdaki komutu çalıştırın:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

TypeScript kurulumu sırasında iki yürütülebilir dosya kurulur: TypeScript derleyicisi olarak "tsc" ve bağımsız TypeScript sunucusu olarak "tsserver". Bağımsız sunucu, akıllı kod tamamlama sağlamak için editörler ve IDE'ler tarafından kullanılabilen derleyiciyi ve dil hizmetlerini içerir.

Ayrıca Babel (bir eklenti aracılığıyla) veya swc gibi TypeScript uyumlu çeşitli transpiler'lar bulunmaktadır. Bu transpiler'lar, TypeScript kodunu başka hedef dillere veya sürümlere dönüştürmek için kullanılabilir.

TypeScript 7.0, derleyicinin ve dil hizmetinin yerel bir uygulaması olarak Go ile yeniden yazıldı. Tam derlemeleri ve editör özelliklerini hızlandırmak için paylaşımlı bellekli çoklu iş parçacığı ve diğer optimizasyonları kullanarak geliştirme sırasındaki geri bildirim süresini kısaltır.

Bazı TypeScript 7.0 performans özellikleri ayarlanabilir. Tür denetimi `--checkers` ile paralel işçilerde çalışabilir; daha fazla işçi büyük projeleri hızlandırabilir ancak daha fazla bellek kullanır. Yeniden oluşturulan `--watch` modu, platformlar arası dosya izlemeyi iyileştirir. TypeScript 7.0 henüz (Temmuz 2026 itibarıyla) bir derleyici API'si içermez; bu nedenle hâlâ TypeScript 6.0 API'sine ihtiyaç duyan araçlar, `@typescript/typescript6` veya npm alias'ları kullanılarak TypeScript 7.0 ile yan yana çalıştırılabilir.

### Yapılandırma

TypeScript, tsc CLI seçenekleri kullanılarak veya projenin kök dizinine yerleştirilen tsconfig.json adlı özel bir yapılandırma dosyasından yararlanılarak yapılandırılabilir.

Önerilen ayarların önceden doldurulduğu bir tsconfig.json dosyası oluşturmak için aşağıdaki komutu kullanabilirsiniz:

```shell
tsc --init
```

`tsc` komutu yerel olarak çalıştırıldığında TypeScript, kodu en yakın tsconfig.json dosyasında belirtilen yapılandırmayı kullanarak derler.

Varsayılan ayarlarla çalışan bazı CLI komutu örnekleri şunlardır:

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### TypeScript Yapılandırma Dosyası

TypeScript Derleyicisini (tsc) yapılandırmak için bir tsconfig.json dosyası kullanılır. Bu dosya genellikle `package.json` dosyasıyla birlikte projenin kök dizinine eklenir.

Notlar:

* tsconfig.json, json biçiminde olmasına rağmen yorumları kabul eder.
* Komut satırı seçenekleri yerine bu yapılandırma dosyasını kullanmanız önerilir.

Aşağıdaki bağlantıda tüm belgeleri ve bunların şemasını bulabilirsiniz:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

Aşağıda yaygın ve kullanışlı yapılandırmaların bir listesi yer almaktadır:

#### target

"target" özelliği, TypeScript kodunuzun hangi ECMAScript sürümüne çıktı vermesi/derlenmesi gerektiğini belirtmek için kullanılır. Modern tarayıcılar için ES6 iyi bir seçenektir. Not: ES5 desteği TypeScript 6.0'da kullanımdan kaldırılmıştır ve TypeScript 7.0'da artık desteklenmemektedir.

#### lib

"lib" özelliği, derleme sırasında hangi kütüphane dosyalarının dâhil edileceğini belirtmek için kullanılır. TypeScript, "target" özelliğinde belirtilen özelliklere yönelik API'leri otomatik olarak dâhil eder ancak belirli ihtiyaçlar için belirli kütüphaneleri hariç tutmak veya seçmek mümkündür. Örneğin bir sunucu projesi üzerinde çalışıyorsanız yalnızca tarayıcı ortamında kullanışlı olan "DOM" kütüphanesini hariç tutabilirsiniz.

#### strict

"strict" seçeneği daha güçlü denetimleri etkinleştirerek tür güvenliğini iyileştirir. TypeScript 6.0'dan itibaren varsayılan olarak etkindir; aksi durumda tsconfig.json dosyanızda açıkça true olarak ayarlamanız gerekir. "strict" seçeneğini etkinleştirmek TypeScript'in şunları yapmasını sağlar:

* Her kaynak dosya için "use strict" kullanan kod üretir.
* Tür denetimi sürecinde "null" ve "undefined" değerlerini dikkate alır.
* Tür ek açıklamaları olmadığında "any" türünün kullanımını devre dışı bırakır.
* Aksi takdirde "any" türünü ifade edecek olan "this" ifadesinin kullanımında hata verir.

#### module

"module" özelliği, derlenen program için desteklenen modül sistemini ayarlar. Çalışma zamanında, belirtilen modül sistemine göre bağımlılıkları bulmak ve yürütmek için bir modül yükleyici kullanılır.

JavaScript'te en yaygın kullanılan modül yükleyiciler, sunucu tarafı uygulamaları için Node.js CommonJS ve tarayıcı tabanlı web uygulamalarındaki AMD modülleri için RequireJS'dir. TypeScript; UMD, System, ESNext, ES2015/ES6 ve ES2020 dâhil olmak üzere çeşitli modül sistemleri için kod üretebilir. Modül sistemi, hedef ortama ve o ortamda kullanılabilen modül yükleme mekanizmasına göre seçilmelidir.

Not: Eski modül sistemleri (AMD, UMD, SystemJS) desteği TypeScript 6.0'da kullanımdan kaldırılmıştır ve TypeScript 7.0'da artık desteklenmemektedir.

#### moduleResolution

"moduleResolution" özelliği, modül çözümleme stratejisini belirtir. Modern TypeScript kodu için "nodenext" veya "bundler" kullanın. "classic" stratejisi yalnızca eski TypeScript sürümleri (1.6'dan önceki sürümler) için kullanılır.

#### esModuleInterop

"esModuleInterop" özelliği, "default" özelliğini kullanarak dışa aktarım yapmayan CommonJS modüllerinden varsayılan içe aktarmalara izin verir; bu özellik, üretilen JavaScript'te uyumluluk sağlamak için bir shim sunar. Bu seçeneği etkinleştirdikten sonra `import * as MyLibrary from "my-library"` yerine `import MyLibrary from "my-library"` kullanabiliriz.

"esModuleInterop", bozucu değişikliklerden kaçınmak için başlangıçta isteğe bağlıydı ancak uzun süredir önerilen varsayılan ayardır. Devre dışı bırakılması, CommonJS ile ESM kullanılırken belli belirsiz çalışma zamanı sorunlarına yol açabilir. Not: TypeScript 6.0'dan itibaren bu daha güvenli birlikte çalışabilirlik davranışı her zaman etkindir.

TypeScript 6.0'da bazı eski yapılandırma seçenekleri ve sözdizimi biçimleri kullanımdan kaldırılmış veya eski davranış üzerinden geçiş yapmıştır. TypeScript 7.0'da bunlar kesin hatalara veya işlem yapmayan davranışlara dönüşmüştür.

İşlem yapmayan davranışla birlikte kesin hatalara dönüşen kullanımdan kaldırmalar şunlardır:

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* `esModuleInterop` veya `allowSyntheticDefaultImports` seçeneğinin devre dışı bırakılması
* `alwaysStrict` seçeneğinin devre dışı bırakılması
* ad alanı bildirimlerinde `module` anahtar sözcüğü
* içe aktarmalarda `asserts`
* `/// <reference no-default-lib />`, `skipDefaultLibCheck` kapsamında
* yerel bir `tsconfig.json` ile CLI dosya yolları (`--ignoreConfig` kullanılmadığı sürece)

#### jsx

"jsx" özelliği yalnızca ReactJS'de kullanılan .tsx dosyalarına uygulanır ve JSX yapılarının JavaScript'e nasıl derleneceğini kontrol eder. Yaygın bir seçenek olan "preserve", JSX'i değiştirmeden koruyarak bir .jsx dosyasına derler; böylece daha sonraki dönüşümler için Babel gibi farklı araçlara aktarılabilir.

#### skipLibCheck

"skipLibCheck" özelliği, TypeScript'in içe aktarılan üçüncü taraf paketlerin tamamında tür denetimi yapmasını önler. Bu özellik, bir projenin derleme süresini azaltır. TypeScript, kodunuzu bu paketler tarafından sağlanan tür tanımlarına göre denetlemeye devam eder.

#### files

"files" özelliği, programa her zaman dahil edilmesi gereken dosyaların listesini derleyiciye bildirir.

#### include

<!-- markdownlint-disable MD049 -->
"include" özelliği, dahil etmek istediğimiz dosyaların listesini derleyiciye bildirir. Bu özellik, herhangi bir alt dizin için "\*_", herhangi bir dosya adı için "_" ve isteğe bağlı karakterler için "?" gibi glob benzeri kalıplara izin verir.
<!-- markdownlint-enable MD049 -->

#### exclude

"exclude" özelliği, derlemeye dahil edilmemesi gereken dosyaların listesini belirtir. Bunlar "node_modules" veya test dosyaları gibi dosyaları içerebilir.
Not: tsconfig.json yorumlara izin verir.

### importHelpers

TypeScript, belirli gelişmiş veya daha eski JavaScript sürümlerine indirgenen özellikler için kod oluştururken yardımcı kod kullanır. Varsayılan olarak bu yardımcılar, onları kullanan dosyalarda yinelenir. `importHelpers` seçeneği bunun yerine bu yardımcıları `tslib` modülünden içe aktararak JavaScript çıktısını daha verimli hâle getirir.

### TypeScript'e Geçiş Önerileri

Büyük projelerde, TypeScript ve JavaScript kodunun başlangıçta birlikte bulunacağı kademeli bir geçişin benimsenmesi önerilir. Yalnızca küçük projeler tek seferde TypeScript'e geçirilebilir.

Bu geçişin ilk adımı, TypeScript'i derleme zinciri sürecine dahil etmektir. Bu, .ts ve .tsx dosyalarının mevcut JavaScript dosyalarıyla birlikte bulunmasına izin veren "allowJs" derleyici seçeneği kullanılarak yapılabilir. TypeScript, JavaScript dosyalarından türü çıkaramadığında bir değişken için "any" türüne geri döneceğinden, geçişin başında derleyici seçeneklerinizde "noImplicitAny" seçeneğini devre dışı bırakmanız önerilir.

İkinci adım, her modülü dönüştürürken testleri çalıştırabilmeniz için JavaScript testlerinizin TypeScript dosyalarıyla birlikte çalışmasını sağlamaktır. Jest kullanıyorsanız TypeScript projelerini Jest ile test etmenizi sağlayan `ts-jest` aracını kullanmayı değerlendirin.

Üçüncü adım, üçüncü taraf kütüphaneler için tür bildirimlerini projenize dahil etmektir. Bu bildirimler paketle birlikte veya DefinitelyTyped üzerinde bulunabilir. Bunları [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) adresinden arayabilir ve şu komutla yükleyebilirsiniz:

```shell
npm install --save-dev @types/package-name
```

veya

```shell
yarn add --dev @types/package-name
```

Dördüncü adım, yapraklardan başlayarak bağımlılık grafiğinizi izleyip aşağıdan yukarıya bir yaklaşımla modül modül geçiş yapmaktır. Buradaki fikir, başka modüllere bağımlı olmayan modülleri dönüştürmeye başlamaktır. Bağımlılık grafiklerini görselleştirmek için "madge" aracını kullanabilirsiniz.

Yardımcı işlevler ile harici API'ler veya belirtimlerle ilgili kodlar, bu ilk dönüşümler için iyi aday modüllerdir. Swagger sözleşmelerinden, GraphQL veya JSON şemalarından projenize dahil edilecek TypeScript tür tanımlarını otomatik olarak oluşturmak mümkündür.

Herhangi bir belirtim veya resmî şema bulunmadığında, bir sunucunun döndürdüğü JSON gibi ham verilerden türler oluşturabilirsiniz. Ancak uç durumların gözden kaçmasını önlemek için türlerin veriler yerine belirtimlerden oluşturulması önerilir.

Geçiş sırasında kodu yeniden düzenlemekten kaçının ve yalnızca modüllerinize tür eklemeye odaklanın.

Beşinci adım, tüm türlerin bilinmesini ve tanımlanmasını zorunlu kılacak olan "noImplicitAny" seçeneğini etkinleştirerek projeniz için daha iyi bir TypeScript deneyimi sağlamaktır.

Geçiş sırasında, bir JavaScript dosyasında TypeScript tür denetimini etkinleştiren `@ts-check` yönergesini kullanabilirsiniz. Bu yönerge, tür denetiminin esnek bir sürümünü sağlar ve başlangıçta JavaScript dosyalarındaki sorunları belirlemek için kullanılabilir. Bir dosyaya `@ts-check` eklendiğinde TypeScript, JSDoc biçimindeki yorumları kullanarak tanımları çıkarmaya çalışır. Ancak JSDoc ek açıklamalarını yalnızca geçişin çok erken bir aşamasında kullanmayı değerlendirin.

tsconfig.json dosyanızda `noEmitOnError` seçeneğinin varsayılan değeri olan false değerini korumayı değerlendirin. Bu, hatalar bildirilse bile JavaScript kaynak kodu çıktısı almanıza olanak tanır.

