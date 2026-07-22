---
title: Primeros pasos con TypeScript
sidebar:
  order: 10
  label: 10. Primeros pasos con TypeScript
---


### Instalación

Visual Studio Code ofrece una excelente compatibilidad con el lenguaje TypeScript, pero no incluye el compilador de TypeScript. Para instalarlo, puedes utilizar un gestor de paquetes como npm o yarn:

```shell
npm install typescript --save-dev
```

o

```shell
yarn add typescript --dev
```

Asegúrate de incluir en el repositorio el archivo de bloqueo generado para garantizar que todos los miembros del equipo utilicen la misma versión de TypeScript.

Para ejecutar el compilador de TypeScript, puedes utilizar los siguientes comandos:

```shell
npx tsc
```

o

```shell
yarn tsc
```

Se recomienda instalar TypeScript en cada proyecto en lugar de hacerlo globalmente, ya que así el proceso de compilación es más predecible. No obstante, para usos puntuales puedes utilizar el siguiente comando:

```shell
npx tsc
```

o instalarlo globalmente:

```shell
npm install -g typescript
```

Si utilizas Microsoft Visual Studio, puedes obtener TypeScript como paquete de NuGet para tus proyectos de MSBuild. Ejecuta el siguiente comando en la consola del Administrador de paquetes NuGet:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Durante la instalación de TypeScript se instalan dos ejecutables: "tsc", el compilador de TypeScript, y "tsserver", el servidor independiente de TypeScript. El servidor independiente contiene el compilador y los servicios del lenguaje que los editores y los IDE pueden utilizar para ofrecer finalización inteligente de código.

Además, existen varios transpiladores compatibles con TypeScript, como Babel (mediante un complemento) o swc. Estos transpiladores pueden utilizarse para convertir código TypeScript a otros lenguajes o versiones de destino.

TypeScript 7.0 se reescribió en Go como implementación nativa del compilador y del servicio del lenguaje. Utiliza multihilo con memoria compartida y otras optimizaciones para acelerar las compilaciones completas y las funciones del editor, lo que reduce el tiempo de respuesta durante el desarrollo.

Algunas características de rendimiento de TypeScript 7.0 pueden ajustarse. La comprobación de tipos puede ejecutarse en procesos paralelos mediante `--checkers`; un mayor número de procesos puede acelerar proyectos grandes, pero consume más memoria. El modo `--watch` reconstruido mejora la supervisión de archivos entre plataformas. TypeScript 7.0 aún no incluye una API del compilador (a fecha de julio de 2026), por lo que las herramientas que todavía necesiten la API de TypeScript 6.0 pueden ejecutarse junto con TypeScript 7.0 mediante `@typescript/typescript6` o alias de npm.

### Configuración

TypeScript puede configurarse mediante las opciones de la CLI de tsc o con un archivo de configuración específico llamado tsconfig.json situado en la raíz del proyecto.

Para generar un archivo tsconfig.json con los ajustes recomendados ya incluidos, puedes utilizar el siguiente comando:

```shell
tsc --init
```

Al ejecutar localmente el comando `tsc`, TypeScript compilará el código con la configuración especificada en el archivo tsconfig.json más cercano.

Estos son algunos ejemplos de comandos de la CLI que se ejecutan con la configuración predeterminada:

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### Archivo de configuración de TypeScript

Un archivo tsconfig.json sirve para configurar el compilador de TypeScript (tsc). Normalmente se añade a la raíz del proyecto junto con el archivo `package.json`.

Notas:

* tsconfig.json admite comentarios aunque tenga formato JSON.
* Es aconsejable utilizar este archivo de configuración en lugar de las opciones de la línea de comandos.

En los siguientes enlaces encontrarás la documentación completa y su esquema:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

La siguiente lista recoge algunas configuraciones habituales y útiles:

#### target

La propiedad "target" especifica la versión de ECMAScript a la que debe emitirse o compilarse el código TypeScript. Para los navegadores modernos, ES6 es una buena opción. Nota: la compatibilidad con ES5 quedó obsoleta en TypeScript 6.0 y ya no se admite en TypeScript 7.0.

#### lib

La propiedad "lib" especifica qué archivos de biblioteca deben incluirse durante la compilación. TypeScript incluye automáticamente las API de las características indicadas en la propiedad "target", pero es posible omitir o seleccionar bibliotecas concretas para necesidades específicas. Por ejemplo, si trabajas en un proyecto de servidor, podrías excluir la biblioteca "DOM", que solo resulta útil en un entorno de navegador.

#### strict

La opción "strict" mejora la seguridad de tipos al activar comprobaciones más rigurosas. Está activada de forma predeterminada desde TypeScript 6.0; en versiones anteriores, debes establecerla explícitamente en true en tsconfig.json. Al activar "strict", TypeScript puede:

* Emitir código mediante "use strict" para cada archivo fuente.
* Tener en cuenta "null" y "undefined" durante la comprobación de tipos.
* Deshabilitar el uso del tipo "any" cuando no haya anotaciones de tipo.
* Generar un error al utilizar la expresión "this", que de otro modo implicaría el tipo "any".

#### module

La propiedad "module" establece el sistema de módulos compatible con el programa compilado. En tiempo de ejecución se utiliza un cargador de módulos para localizar y ejecutar las dependencias según el sistema especificado.

Los cargadores de módulos más habituales en JavaScript son CommonJS de Node.js para aplicaciones del lado del servidor y RequireJS para módulos AMD en aplicaciones web ejecutadas en el navegador. TypeScript puede emitir código para varios sistemas de módulos, entre ellos UMD, System, ESNext, ES2015/ES6 y ES2020. El sistema de módulos debe elegirse según el entorno de destino y el mecanismo de carga disponible en él.

Nota: la compatibilidad con sistemas de módulos antiguos (AMD, UMD y SystemJS) quedó obsoleta en TypeScript 6.0 y ya no se admite en TypeScript 7.0.

#### moduleResolution

La propiedad "moduleResolution" especifica la estrategia de resolución de módulos. Utiliza "nodenext" o "bundler" para código TypeScript moderno. La estrategia "classic" solo se utiliza con versiones antiguas de TypeScript (anteriores a la 1.6).

#### esModuleInterop

La propiedad "esModuleInterop" permite importaciones predeterminadas desde módulos CommonJS que no exportan mediante la propiedad "default"; esta propiedad proporciona un adaptador para garantizar la compatibilidad del JavaScript emitido. Tras activar esta opción, podemos utilizar `import MyLibrary from "my-library"` en lugar de `import * as MyLibrary from "my-library"`.

"esModuleInterop" era originalmente opcional para evitar cambios incompatibles, pero desde hace tiempo es el valor predeterminado recomendado. Desactivarlo puede provocar problemas sutiles en tiempo de ejecución al utilizar CommonJS con ESM. Nota: desde TypeScript 6.0, este comportamiento de interoperabilidad más seguro está siempre activado.

En TypeScript 6.0, algunas opciones de configuración y formas sintácticas antiguas quedaron obsoletas o pasaron por un periodo de compatibilidad con el comportamiento anterior. En TypeScript 7.0, producen errores no recuperables o no tienen efecto.

Las características obsoletas que se han convertido en errores no recuperables o en comportamientos sin efecto son:

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* desactivar `esModuleInterop` o `allowSyntheticDefaultImports`
* desactivar `alwaysStrict`
* la palabra clave `module` en declaraciones de espacios de nombres
* `asserts` en importaciones
* `/// <reference no-default-lib />` con `skipDefaultLibCheck`
* rutas de archivos de la CLI con un `tsconfig.json` local, salvo que se utilice `--ignoreConfig`

#### jsx

La propiedad "jsx" solo se aplica a los archivos .tsx utilizados en ReactJS y controla cómo se compilan a JavaScript las construcciones JSX. Una opción habitual es "preserve", que compila a un archivo .jsx manteniendo JSX sin cambios para que pueda pasarse a otras herramientas, como Babel, y aplicar transformaciones adicionales.

#### skipLibCheck

La propiedad "skipLibCheck" impide que TypeScript compruebe los tipos de todos los paquetes de terceros importados. Esta propiedad reduce el tiempo de compilación de un proyecto. TypeScript seguirá comprobando tu código con las definiciones de tipos proporcionadas por esos paquetes.

#### files

La propiedad "files" indica al compilador una lista de archivos que siempre deben incluirse en el programa.

#### include

<!-- markdownlint-disable MD049 -->
La propiedad "include" indica al compilador una lista de archivos que queremos incluir. Esta propiedad admite patrones similares a glob, como "\*_" para cualquier subdirectorio, "_" para cualquier nombre de archivo y "?" para caracteres opcionales.
<!-- markdownlint-enable MD049 -->

#### exclude

La propiedad "exclude" indica al compilador una lista de archivos que no deben incluirse en la compilación. Puede incluir archivos como "node_modules" o archivos de pruebas.
Nota: tsconfig.json admite comentarios.

### importHelpers

TypeScript utiliza código auxiliar al generar código para determinadas características avanzadas o reducidas de nivel de JavaScript. De forma predeterminada, estos auxiliares se duplican en los archivos que los utilizan. La opción `importHelpers` los importa en su lugar desde el módulo `tslib`, lo que hace más eficiente la salida de JavaScript.

### Consejos para migrar a TypeScript

En proyectos grandes se recomienda adoptar una transición gradual en la que inicialmente coexistan el código TypeScript y el código JavaScript. Solo los proyectos pequeños pueden migrarse a TypeScript de una sola vez.

El primer paso de esta transición consiste en introducir TypeScript en el proceso de la cadena de compilación. Puede hacerse mediante la opción del compilador "allowJs", que permite que los archivos .ts y .tsx coexistan con los archivos JavaScript existentes. Como TypeScript recurrirá al tipo "any" para una variable cuando no pueda inferir su tipo a partir de archivos JavaScript, se recomienda desactivar "noImplicitAny" en las opciones del compilador al principio de la migración.

El segundo paso consiste en asegurarte de que las pruebas de JavaScript funcionen junto con los archivos TypeScript, de modo que puedas ejecutar las pruebas a medida que conviertes cada módulo. Si utilizas Jest, considera usar `ts-jest`, que permite probar proyectos TypeScript con Jest.

El tercer paso consiste en incluir en el proyecto las declaraciones de tipos de las bibliotecas de terceros. Estas declaraciones pueden encontrarse incluidas con las bibliotecas o en DefinitelyTyped. Puedes buscarlas en [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) e instalarlas mediante:

```shell
npm install --save-dev @types/package-name
```

o

```shell
yarn add --dev @types/package-name
```

El cuarto paso consiste en migrar módulo por módulo con un enfoque ascendente, siguiendo el grafo de dependencias y comenzando por las hojas. La idea es empezar convirtiendo los módulos que no dependen de otros. Para visualizar los grafos de dependencias, puedes utilizar la herramienta "madge".

Las funciones auxiliares y el código relacionado con API o especificaciones externas son buenos candidatos para estas conversiones iniciales. Es posible generar automáticamente definiciones de tipos de TypeScript a partir de contratos de Swagger o esquemas de GraphQL o JSON e incluirlas en el proyecto.

Cuando no haya especificaciones ni esquemas oficiales disponibles, puedes generar tipos a partir de datos sin procesar, como el JSON devuelto por un servidor. Sin embargo, se recomienda generar los tipos a partir de especificaciones y no de datos para evitar omitir casos límite.

Durante la migración, evita refactorizar el código y céntrate exclusivamente en añadir tipos a los módulos.

El quinto paso consiste en activar "noImplicitAny", que exigirá que todos los tipos se conozcan y estén definidos, y ofrecerá una mejor experiencia con TypeScript en el proyecto.

Durante la migración puedes utilizar la directiva `@ts-check`, que activa la comprobación de tipos de TypeScript en un archivo JavaScript. Esta directiva proporciona una versión flexible de la comprobación de tipos y puede utilizarse inicialmente para identificar problemas en los archivos JavaScript. Cuando un archivo incluye `@ts-check`, TypeScript intenta deducir definiciones mediante comentarios de estilo JSDoc. No obstante, considera utilizar anotaciones JSDoc únicamente en una fase muy temprana de la migración.

Considera mantener en false el valor predeterminado de `noEmitOnError` en tsconfig.json. Esto te permitirá emitir código fuente JavaScript aunque se notifiquen errores.

