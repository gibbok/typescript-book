# TypeScripts inbyggda API lägger till API:er som typescript-eslint behöver


**Publicerad:** 14 september 2026

TypeScripts inbyggda API exponerar nu fler checker- och typ-API:er som `typescript-eslint` behöver, vilket minskar kompatibilitetsluckor för verktyg som använder TypeScripts programmatiska API.

## Vad har ändrats

Ändringen lägger till API:er som `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` och `getExportSymbolOfSymbol`. Gränssnitts- och klasstyper får också `getThisType()`, och `IndexKind` exporteras för indextypsfrågor.

Både den synkrona och asynkrona inbyggda API-ytan har uppdaterats.

## Varför det är viktigt

TypeScript-pull requesten skapades specifikt för att lägga till API:er som `typescript-eslint` hade identifierat som saknade. Det ger integrationer mer checker- och typinformation som de redan förväntar sig från TypeScripts etablerade API.

## Källa

Läs TypeScripts officiella pull request: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
