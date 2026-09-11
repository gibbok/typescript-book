# L'API nativa di TypeScript aggiunge file system virtuali a livelli


**Pubblicato:** 9 settembre 2026

L'API nativa di TypeScript può ora creare e aggiornare snapshot con dati espliciti del file system virtuale. Gli strumenti possono così rappresentare aggiunte, modifiche e rimozioni di file senza ricostruire l'intero input del file system.

## Cosa è cambiato

I nuovi helper `createFileSystem`, `createFileSystemWithLib` e `createFileSystemLayer` creano oggetti VFS accettati dalle API degli snapshot. `Snapshot.update` può applicare un nuovo livello di cache sopra uno snapshot esistente.

Un VFS `full` rimane interamente in memoria e non usa come fallback le callback del file system host o della sessione. Un VFS `layer` usa il fallback in caso di cache miss e può usare `removedPaths` per nascondere file o directory presenti sull’host. Entrambe le forme supportano link simbolici nel file system virtuale e verso percorsi dell’host.

## Limitazione attuale

Gli snapshot basati su VFS contano ancora come snapshot reali, quindi l’API nativa mantiene il limite attuale di un solo snapshot reale alla volta. Per ora le operazioni sugli snapshot restano quindi seriali.

## Fonte

Leggi la pull request TypeScript unita: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
