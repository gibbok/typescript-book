# TypeScript 7.1 Beta introduce API modulari e supporto ES2026


**Pubblicato:** 20 ottobre 2026

Microsoft ha rilasciato TypeScript 7.1 Beta, con nuove API native del compilatore e supporto a funzionalità JavaScript. Per provare la versione beta:

```shell
npm install -D typescript@beta
```

## Cosa cambia

* `--target es2026` e `--lib es2026` sono ora opzioni supportate come stabili, con dichiarazioni aggiornate della libreria standard.
* Le nuove API sono disponibili tramite `typescript/sync`, `typescript/async`, `typescript/fs` e `typescript/ast`. Gli oggetti `API` e `Program` devono essere rilasciati, ad esempio con `using`.
* Gli import della fase source (`import source` e `import.source()`) supportano oggetti sorgente dei moduli, anche per WebAssembly, con impostazioni appropriate di `--module` e `esnext`.
* I content mapper espongono a TypeScript il codice incorporato in file come `.vue` e `.svelte`. Da riga di comando è necessario `--runExternalCode`.
* Nei benchmark pubblicati da Microsoft, le build sono più veloci e consumano meno memoria rispetto a TypeScript 7.0.

## Disponibilità

È una beta, non una versione stabile. Verifica la compatibilità di framework e strumenti prima dell'aggiornamento. Il supporto agli attributi di import nei moduli ambient è trattato in un altro articolo.

## Fonte

Leggi l'annuncio ufficiale: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
