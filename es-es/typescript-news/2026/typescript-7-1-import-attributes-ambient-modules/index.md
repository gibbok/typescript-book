# TypeScript 7.1 añade atributos de importación a módulos ambient


**Publicado:** 1 de septiembre de 2026

El compilador nativo de TypeScript ahora admite tipos de atributos de importación en declaraciones de módulos ambient con patrón. Así, las declaraciones pueden distinguir imports mediante atributos como `type: 'css'` o `type: 'text'`.

## Qué cambió

Cuando un import incluye atributos, TypeScript puede resolverlo contra un módulo ambient con patrón que coincida. La coincidencia usa asignabilidad y, si varias declaraciones coinciden, TypeScript elige la que tenga el tipo de atributos más específico.

Por ahora, los tipos de atributos de estas declaraciones se limitan a propiedades normales cuyos valores sean tipos literales de cadena. Las declaraciones con el mismo patrón y tipos de atributos idénticos pueden fusionarse; los tipos distintos permanecen separados.

## Compatibilidad

El cambio se integró para el hito TypeScript 7.1.0 Beta. No añade declaraciones integradas para imports CSS o de texto a la biblioteca estándar, por lo que los proyectos y herramientas aún deben definir los módulos ambient que necesiten.

## Fuente

Lee el pull request de TypeScript que se integró: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
