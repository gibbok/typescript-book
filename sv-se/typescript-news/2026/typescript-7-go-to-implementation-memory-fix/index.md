# TypeScript 7 förbättrar minnesanvändningen för Gå till implementering


**Publicerad:** 30 juli 2026

Microsoft har infört en korrigering av minnesskalningen för Gå till implementering i TypeScripts inbyggda språktjänst.

## Vad har ändrats

Språktjänsten använder en bredden-först-arbetslista för att hitta implementeringar. För en gränssnittsmedlem med många implementeringar kunde upprepade sökningar i hela programmet returnera samma referenser igen. Behållna referenser, köat arbete och resultatgrupper kunde därför växa kvadratiskt och tömma minnet i stora projekt med komplexa typer.

Korrigeringen tar bort dubbletter av referensnoder innan de läggs till i arbetskön och undviker att behålla duplicerade symboldefinitioner. Ett regressionstest kontrollerar att en fördubbling av antalet implementeringar ger ungefär linjär tillväxt i stället för kvadratisk.

## Varför det är viktigt

Gå till implementering kan nu hantera detta mönster utan att behålla samma interna referenser flera gånger. Det slutliga svaret till redigeraren var redan deduplicerat, så ändringen riktar sig mot den dolda minnesåtgång och det arbete som krävs för att skapa svaret.

## Tillgänglighet

Ändringen infördes i TypeScripts inbyggda kodbas efter lanseringen av TypeScript 7.0. Källan anger inte vilken stabil npm-version som innehåller korrigeringen, så användare bör kontrollera versionsinformationen för sin installerade version innan de förlitar sig på den.

## Källa

Läs den officiella ändringen: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
