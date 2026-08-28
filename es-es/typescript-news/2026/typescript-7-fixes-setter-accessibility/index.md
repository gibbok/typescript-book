# TypeScript 7 corrige la accesibilidad de setters en unions e intersections


**Publicado:** 24 de agosto de 2026

Microsoft integró una corrección en el comprobador nativo de TypeScript que mantiene separadas la accesibilidad de lectura y de escritura para las propiedades sintetizadas a partir de unions e intersections.

## Qué cambió

Antes, la accesibilidad del setter podía ignorarse en estas propiedades sintéticas porque la comprobación utilizaba en la práctica la accesibilidad del getter. Por ello, un getter público combinado con un setter protegido podía permitir una escritura no válida mediante una union o intersection.

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

El comprobador ahora registra por separado la accesibilidad de escritura. Leer `foo` sigue siendo válido, mientras que la asignación informa correctamente de un error de accesibilidad.

## Por qué importa

Las clases pueden exponer lecturas públicas de forma intencionada mientras restringen las escrituras. La corrección conserva ese límite cuando TypeScript combina tipos de objeto en unions o intersections, en lugar de ampliar accidentalmente el acceso de escritura.

## Disponibilidad

El cambio se integró en el código nativo de TypeScript después de TypeScript 7.0. La fuente no identifica una versión estable de npm que lo incluya, así que conviene revisar las notas de la versión instalada antes de depender de este comportamiento.

## Fuente

Lee la pull request integrada de TypeScript: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
