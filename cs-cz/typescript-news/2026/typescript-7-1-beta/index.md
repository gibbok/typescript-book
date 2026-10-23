# TypeScript 7.1 Beta přináší modulární API a podporu ES2026


**Publikováno:** 20. října 2026

Microsoft vydal TypeScript 7.1 Beta s novými nativními API kompilátoru a podporou funkcí JavaScriptu. Betaverzi lze vyzkoušet příkazem:

```shell
npm install -D typescript@beta
```

## Co se změnilo

* `--target es2026` a `--lib es2026` jsou nyní podporované jako stabilní volby s aktualizovanými deklaracemi standardní knihovny.
* Nové vstupní body API zahrnují `typescript/sync`, `typescript/async`, `typescript/fs` a `typescript/ast`. Objekty `API` a `Program` je nutné uvolnit, například pomocí `using`.
* Importy zdrojové fáze (`import source` a `import.source()`) podporují objekty zdrojů modulů včetně použití s WebAssembly při vhodném nastavení `--module` a `esnext`.
* Content mappery zpřístupňují TypeScript vložený v souborech jako `.vue` a `.svelte`. Spouštění z příkazové řádky vyžaduje `--runExternalCode`.
* Podle benchmarků zveřejněných Microsoftem jsou sestavení rychlejší a spotřebují méně paměti než v TypeScriptu 7.0.

## Dostupnost

Jde o betaverzi, nikoli stabilní vydání. Před aktualizací ověřte kompatibilitu frameworků a nástrojů. Podpora atributů importu v ambientních modulech byla popsána v samostatné zprávě.

## Zdroj

Přečtěte si oficiální oznámení: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
