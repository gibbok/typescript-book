# Se anuncia la versión candidata de TypeScript 7.0


**Publicado:** 18 de junio de 2026

Microsoft publicó la versión candidata de TypeScript 7.0 como vista previa final antes de la versión estable de TypeScript 7.

## Qué cambió

La versión candidata trasladó TypeScript al nuevo compilador y servicio de lenguaje basados en Go. La lógica de comprobación de tipos se migró desde TypeScript 6 para conservar la semántica existente y, al mismo tiempo, mejorar el rendimiento mediante código nativo y paralelismo con memoria compartida.

TypeScript 7 añadió comprobación de tipos paralela y compilaciones con referencias de proyectos. La opción `--checkers` controla el número de procesos de comprobación de tipos, mientras que `--builders` controla el número de procesos de compilación de referencias de proyectos.

En el momento del anuncio, la versión candidata podía instalarse desde npm:

```shell
npm install --save-dev typescript@rc
```

## Compatibilidad

La versión candidata no incluía una API programática estable. El equipo de TypeScript proporcionó el paquete de compatibilidad `@typescript/typescript6` para que las herramientas que necesitan la API de TypeScript 6 pudieran ejecutarse junto con el nuevo compilador.

La versión candidata también adoptó la configuración predeterminada de TypeScript 6 y trató como errores las opciones obsoletas en TypeScript 6. Se recomendó a los equipos migrar primero a TypeScript 6 antes de evaluar TypeScript 7.

## Fuente

Lee el anuncio oficial: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
