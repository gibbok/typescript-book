# TypeScript 7.1 lägger till importattribut i ambient-moduler


**Publicerad:** 1 september 2026

TypeScripts inbyggda kompilator stöder nu typer för importattribut i mönsterbaserade ambient-moduldeklarationer. Deklarationer kan därmed skilja mellan importer med attribut som `type: 'css'` och `type: 'text'`.

## Vad har ändrats

När en import har attribut kan TypeScript lösa den mot en matchande mönsterbaserad ambient-modul. Matchningen använder tilldelningsbarhet och om flera deklarationer matchar väljer TypeScript den med den mest specifika attributtypen.

För närvarande är attributtyperna begränsade till vanliga egenskaper vars värden är strängliteraltyper. Deklarationer med samma mönster och identiska attributtyper kan slås samman; olika attributtyper hålls åtskilda.

## Kompatibilitet

Ändringen har slagits samman för milstolpen TypeScript 7.1.0 Beta. Den lägger inte till inbyggda CSS- eller textimportdeklarationer i standardbiblioteket, så projekt och verktyg behöver fortfarande definiera de ambient-moduler de behöver.

## Källa

Läs den sammanslagna TypeScript-pull requesten: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
