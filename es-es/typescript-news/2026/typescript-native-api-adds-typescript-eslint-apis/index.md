# La API nativa de TypeScript añade APIs necesarias para typescript-eslint


**Publicado:** 14 de septiembre de 2026

La API nativa de TypeScript ahora expone APIs adicionales del comprobador y de tipos necesarias para `typescript-eslint`, reduciendo brechas de compatibilidad para las herramientas que dependen de la API programática de TypeScript.

## Qué cambió

El cambio añade APIs como `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` y `getExportSymbolOfSymbol`. Los tipos de interfaz y clase también reciben `getThisType()`, y `IndexKind` se exporta para consultas de tipos de índice.

Se actualizaron tanto las superficies síncronas como las asíncronas de la API nativa.

## Por qué importa

La pull request de TypeScript se creó específicamente para añadir APIs que `typescript-eslint` había identificado como ausentes. Esto proporciona a las integraciones más información del comprobador y de tipos que ya esperaban de la API establecida de TypeScript.

## Fuente

Lee la pull request oficial de TypeScript: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
