# TypeScripts inbyggda kompilator minskar minnesanvändningen med optimeringar i typkontrollen


**Publicerad:** 14 oktober 2026

Microsoft har slagit samman flera minnesoptimeringar i TypeScripts inbyggda kompilator. De minskar minnet som hålls kvar av typkontrollens interna datastrukturer utan att ändra TypeScript-syntaxen.

## Vad har ändrats

* Block i typade minnesarenor siktar nu på cirka 512 byte i stället för ett fast antal på 256 objekt. I ändringens VS Code-mätning minskade kvarhållet heapminne med 8.54% och garbage collectorns skanning med 10.44%, medan antalet allokeringshändelser ökade med 13.91%.
* Valfria signaturer, indexinformation och cache för nodbyggaren flyttas ut ur `StructuredType`-poster, som minskar från 144 till 88 byte.
* Upplösta typnoder och signaturer använder sidindelade nodlänklager när stabila nod-ID:n finns, med en reservlösning via mappar för andra ID:n.

## Tillgänglighet

Ändringarna slogs samman den 14 oktober 2026. Källornas pull requests anger ingen stabil npm-version som innehåller dem. Mätresultaten gäller den uppmätta ändringen och arbetsbelastningen.

## Källa

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
