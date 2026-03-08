# El Libro Conciso de TypeScript

El Libro Conciso de TypeScript proporciona una visión general completa y sucinta de las capacidades de TypeScript. Ofrece explicaciones claras que cubren todos los aspectos encontrados en la versión más reciente del lenguaje, desde su potente sistema de tipos hasta sus funciones avanzadas. Ya seas un principiante o un desarrollador experimentado, este libro es un recurso inestimable para mejorar tu comprensión y dominio de TypeScript.

Este libro es completamente gratuito y de código abierto.

Creo que la educación técnica de alta calidad debe ser accesible para todos, por lo que mantengo este libro gratuito y abierto.

Si el libro te ayudó a eliminar un error, comprender un concepto difícil o avanzar en tu carrera, considera apoyar mi trabajo pagando lo que quieras (precio sugerido: 15 USD) o invitándome a un café. Tu apoyo me ayuda a mantener el contenido actualizado y a ampliarlo con nuevos ejemplos y explicaciones más profundas.

[![Buy Me a Coffee](https://img.shields.io/badge/buy_me_a_coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/simonepoggiali)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?business=QW82ZS956XLFY&no_recurring=0&currency_code=EUR)

## Traducciones

Este libro ha sido traducido a varios idiomas, incluyendo:

[Chino](https://github.com/gibbok/typescript-book/blob/main/README-zh_CN.md)

[Italiano](https://github.com/gibbok/typescript-book/blob/main/README-it_IT.md)

[Portugués (Brasil)](https://github.com/gibbok/typescript-book/blob/main/README-pt_BR.md)

[Sueco](https://github.com/gibbok/typescript-book/blob/main/README-sv_SE.md)

[Español](https://github.com/gibbok/typescript-book/blob/main/README-es_ES.md)

## Descargas y sitio web

También puedes descargar la versión Epub:

[https://github.com/gibbok/typescript-book/tree/main/downloads](https://github.com/gibbok/typescript-book/tree/main/downloads)

Hay una versión en línea disponible en:

[https://gibbok.github.io/typescript-book](https://gibbok.github.io/typescript-book)

## Tabla de contenidos

<!-- markdownlint-disable MD004 -->
- [El Libro Conciso de TypeScript](#el-libro-conciso-de-typescript)
  - [Traducciones](#traducciones)
  - [Descargas y sitio web](#descargas-y-sitio-web)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Introducción](#introducción)
  - [Sobre el autor](#sobre-el-autor)
  - [Introducción a TypeScript](#introducción-a-typescript)
    - [¿Qué es TypeScript?](#qué-es-typescript)
    - [¿Por qué TypeScript?](#por-qué-typescript)
    - [TypeScript y JavaScript](#typescript-y-javascript)
    - [Generación de código TypeScript](#generación-de-código-typescript)
    - [JavaScript moderno ahora (Downleveling)](#javascript-moderno-ahora-downleveling)
  - [Primeros pasos con TypeScript](#primeros-pasos-with-typescript)
    - [Instalación](#instalación)
    - [Configuración](#configuración)
    - [Archivo de configuración de TypeScript](#archivo-de-configuración-de-typescript)
      - [target](#target)
      - [lib](#lib)
      - [strict](#strict)
      - [module](#module)
      - [moduleResolution](#moduleresolution)
      - [esModuleInterop](#esmoduleinterop)
      - [jsx](#jsx)
      - [skipLibCheck](#skiplibcheck)
      - [files](#files)
      - [include](#include)
      - [exclude](#exclude)
    - [importHelpers](#importhelpers)
    - [Consejos para la migración a TypeScript](#consejos-para-la-migración-a-typescript)
  - [Explorando el sistema de tipos](#explorando-el-sistema-de-tipos)
    - [El servicio de lenguaje de TypeScript](#el-servicio-de-lenguaje-de-typescript)
    - [Tipado estructural](#tipado-estructural)
    - [Reglas fundamentales de comparación de TypeScript](#reglas-fundamentales-de-comparación-de-typescript)
    - [Tipos como conjuntos](#tipos-como-conjuntos)
    - [Asignar un tipo: Declaraciones de tipo y aserciones de tipo](#asignar-un-tipo-declaraciones-de-tipo-y-aserciones-de-tipo)
      - [Declaración de tipo](#declaración-de-tipo)
      - [Aserción de tipo](#aserción-de-tipo)
      - [Declaraciones ambientales](#declaraciones-ambientales)
    - [Comprobación de propiedades y comprobación de exceso de propiedades](#comprobación-de-propiedades-y-comprobación-de-exceso-de-propiedades)
    - [Tipos débiles](#tipos-débiles)
    - [Comprobación estricta de literales de objeto (Freshness)](#comprobación-estricta-de-literales-de-objeto-freshness)
    - [Inferencia de tipos](#inferencia-de-tipos)
    - [Inferencias más avanzadas](#inferencias-más-avanzadas)
    - [Ampliación de tipos (Type Widening)](#ampliación-de-tipos-type-widening)
    - [Const](#const)
      - [Modificador Const en parámetros de tipo](#modificador-const-en-parámetros-de-tipo)
      - [Aserción const](#aserción-const)
    - [Anotación de tipo explícita](#anotación-de-tipo-explícita)
    - [Estrechamiento de tipos (Type Narrowing)](#estrechamiento-de-tipos-type-narrowing)
      - [Condiciones](#condiciones)
      - [Lanzar o retornar](#lanzar-o-retornar)
      - [Unión discriminada](#unión-discriminada)
      - [Protectores de tipo definidos por el usuario](#protectores-de-tipo-definidos-por-el-usuario)
  - [Tipos primitivos](#tipos-primitivos)
    - [string](#string)
    - [boolean](#boolean)
    - [number](#number)
    - [bigInt](#bigint)
    - [Symbol](#symbol)
    - [null y undefined](#null-y-undefined)
    - [Array](#array)
    - [any](#any)
  - [Anotaciones de tipo](#anotaciones-de-tipo)
  - [Propiedades opcionales](#propiedades-opocionales)
  - [Propiedades de solo lectura](#propiedades-de-solo-lectura)
  - [Firmas de índice](#firmas-de-índice)
  - [Extensión de tipos](#extensión-de-tipos)
  - [Tipos literales](#tipos-literales)
  - [Inferencia de literales](#inferencia-de-literales)
  - [strictNullChecks](#strictnullchecks)
  - [Enums](#enums)
    - [Enums numéricos](#enums-numéricos)
    - [Enums de cadena](#enums-de-cadena)
    - [Enums constantes](#enums-constantes)
    - [Mapeo inverso](#mapeo-inverso)
    - [Enums ambientales](#enums-ambientales)
    - [Miembros computados y constantes](#miembros-computados-y-constantes)
  - [Estrechamiento (Narrowing)](#estrechamiento-narrowing)
    - [typeof type guards](#typeof-type-guards)
    - [Estrechamiento por veracidad (Truthiness narrowing)](#estrechamiento-por-veracidad-truthiness-narrowing)
    - [Estrechamiento por igualdad (Equality narrowing)](#estrechamiento-por-igualdad-equality-narrowing)
    - [Estrechamiento con el operador In](#estrechamiento-con-el-operador-in)
    - [Estrechamiento con instanceof](#estrechamiento-con-instanceof)
  - [Asignaciones](#asignaciones)
  - [Análisis del flujo de control](#análisis-del-flujo-de-control)
  - [Predicados de tipo](#predicados-de-tipo)
  - [Uniones discriminadas](#uniones-discriminadas)
  - [El tipo never](#el-tipo-never)
  - [Comprobación de exhaustividad](#comprobación-de-exhaustividad)
  - [Tipos de objeto](#tipos-de-objeto)
  - [Tipo tupla (Anónimo)](#tipo-tupla-anónimo)
  - [Tipo tupla nombrado (Etiquetado)](#tipo-tupla-nombrado-etiquetado)
  - [Tupla de longitud fija](#tupla-de-longitud-fija)
  - [Tipo unión](#tipo-unión)
  - [Tipos de intersección](#tipos-de-intersección)
  - [Indexación de tipos](#indexación-de-tipos)
  - [Tipo desde valor](#tipo-desde-valor)
  - [Tipo desde el retorno de una función](#tipo-desde-el-retorno-de-una-función)
  - [Tipo desde un módulo](#tipo-desde-un-módulo)
  - [Tipos mapeados](#tipos-mapeados)
  - [Modificadores de tipos mapeados](#modificadores-de-tipos-mapeados)
  - [Tipos condicionales](#tipos-condicionales)
  - [Tipos condicionales distributivos](#tipos-condicionales-distributivos)
  - [Inferencia de tipos infer en tipos condicionales](#inferencia-de-tipos-infer-en-tipos-condicionales)
  - [Tipos condicionales predefinidos](#tipos-condicionales-predefinidos)
  - [Tipos de unión de plantilla](#tipos-de-unión-de-plantilla)
  - [Tipo any](#tipo-any)
  - [Tipo unknown](#tipo-unknown)
  - [Tipo void](#tipo-void)
  - [Tipo never](#tipo-never)
  - [Interface y Type](#interface-y-type)
    - [Sintaxis común](#sintaxis-común)
    - [Tipos básicos](#tipos-básicos)
    - [Objetos e interfaces](#objetos-e-interfaces)
    - [Tipos de unión e intersección](#tipos-de-unión-e-intersección)
  - [Primitivos de tipo integrados](#primitivos-de-tipo-integrados)
  - [Objetos JS integrados comunes](#objetos-js-integrados-comunes)
  - [Sobrecargas](#sobrecargas)
  - [Fusión y extensión](#fusión-y-extensión)
  - [Diferencias entre Type e Interface](#diferencias-entre-type-e-interface)
  - [Clase](#clase)
    - [Sintaxis común de clases](#sintaxis-común-de-clases)
    - [Constructor](#constructor)
    - [Constructores privados y protegidos](#constructores-privados-y-protegidos)
    - [Modificadores de acceso](#modificadores-de-acceso)
    - [Get y Set](#get-y-set)
    - [Auto-accesores en clases](#auto-accesores-en-clases)
    - [this](#this)
    - [Propiedades de parámetro](#propiedades-de-parámetro)
    - [Clases abstractas](#clases-abstractas)
    - [Con genéricos](#con-genéricos)
    - [Decoradores](#decoradores)
      - [Decoradores de clase](#decoradores-de-clase)
      - [Decorador de propiedad](#decorador-de-propiedad)
      - [Decorador de método](#decorador-de-método)
      - [Decoradores de Getter y Setter](#decoradores-de-getter-y-setter)
      - [Metadatos de decorador](#metadatos-de-decorador)
    - [Herencia](#herencia)
    - [Estáticos](#estáticos)
    - [Inicialización de propiedades](#inicialización-de-propiedades)
    - [Sobrecarga de métodos](#sobrecarga-de-métodos)
  - [Genéricos](#genéricos)
    - [Tipo genérico](#tipo-genérico)
    - [Clases genéricas](#clases-genéricas)
    - [Restricciones genéricas](#restricciones-genéricas)
    - [Estrechamiento contextual genérico](#estrechamiento-contextual-genérico)
  - [Tipos estructurales borrados (Erased Structural Types)](#tipos-estructurales-borrados)
  - [Namespacing](#namespacing)
  - [Símbolos](#símbolos)
  - [Directivas de triple barra](#directivas-de-triple-barra)
  - [Manipulación de tipos](#manipulación-de-tipos)
    - [Creación de tipos a partir de tipos](#creación-de-tipos-a-partir-de-tipos)
    - [Tipos de acceso indexado](#tipos-de-acesso-indexado)
    - [Tipos de utilidad](#tipos-de-utilidad)
      - [Awaited\<T\>](#awaitedt)
      - [Partial\<T\>](#partialt)
      - [Required\<T\>](#requiredt)
      - [Readonly\<T\>](#readonlyt)
      - [Record\<K, T\>](#recordk-t)
      - [Pick\<T, K\>](#pickt-k)
      - [Omit\<T, K\>](#omitt-k)
      - [Exclude\<T, U\>](#excludet-u)
      - [Extract\<T, U\>](#extractt-u)
      - [NonNullable\<T\>](#nonnullablet)
      - [Parameters\<T\>](#parameterst)
      - [ConstructorParameters\<T\>](#constructorparameterst)
      - [ReturnType\<T\>](#returntypet)
      - [InstanceType\<T\>](#instancetypet)
      - [ThisParameterType\<T\>](#thisparametertypet)
      - [OmitThisParameter\<T\>](#omitthisparametert)
      - [ThisType\<T\>](#thistypet)
      - [Uppercase\<T\>](#uppercaset)
      - [Lowercase\<T\>](#lowercaset)
      - [Capitalize\<T\>](#capitalizet)
      - [Uncapitalize\<T\>](#uncapitalizet)
      - [NoInfer\<T\>](#noinfert)
  - [Otros](#otros)
    - [Manejo de errores y excepciones](#manejo-de-errores-y-excepciones)
    - [Clases Mixin](#clases-mixin)
    - [Funciones de lenguaje asíncronas](#funciones-de-lenguaje-asíncronas)
    - [Iteradores y generadores](#iteradores-y-generadores)
    - [Referencia JSDoc de TsDocs](#referencia-jsdoc-de-tsdocs)
    - [@types](#types)
    - [JSX](#jsx-1)
    - [Módulos ES6](#módulos-es6)
    - [Operador de exponenciación ES7](#operador-de-exponenciación-es7)
    - [La sentencia for-await-of](#la-sentencia-for-await-of)
    - [Nueva meta-propiedad target](#nueva-meta-propiedad-target)
    - [Expresiones de importación dinámica](#expresiones-de-importación-dinámica)
    - ["tsc –watch"](#tsc-watch)
    - [Operador de aserción de no nulo](#operador-de-aserción-de-no-nulo)
    - [Declaraciones por defecto](#declaraciones-por-defecto)
    - [Encadenamiento opcional](#encadenamiento-opcional)
    - [Operador de coalescencia nula](#operador-de-coalescencia-nula)
    - [Tipos de literales de plantilla](#tipos-de-literales-de-plantilla)
    - [Sobrecarga de funciones](#sobrecarga-de-funciones)
    - [Tipos recursivos](#tipos-recursivos)
    - [Tipos condicionales recursivos](#tipos-condicionales-recursivos)
    - [Soporte de módulos ECMAScript en Node](#soporte-de-módulos-ecmascript-en-node)
    - [Funciones de aserción](#funciones-de-aserción)
    - [Tipos de tupla variádicos](#tipos-de-tupla-variádicos)
    - [Tipos encajonados (Boxed types)](#tipos-encajonados)
    - [Covarianza y contravarianza en TypeScript](#covarianza-y-contravarianza-en-typescript)
      - [Anotaciones de varianza opcionales para parámetros de tipo](#anotaciones-de-varianza-opcionales-para-parámetros-de-tipo)
    - [Firmas de índice de patrón de cadena de plantilla](#firmas-de-índice-de-patrón-de-cadena-de-plantilla)
    - [El operador satisfies](#el-operador-satisfies)
    - [Importaciones y exportaciones de solo tipo](#importaciones-y-exportaciones-de-solo-tipo)
    - [Declaración using y gestión explícita de recursos](#declaración-using-y-gestión-explícita-de-recursos)
      - [Declaración await using](#declaración-await-using)
    - [Atributos de importación](#atributos-de-importación)
<!-- markdownlint-enable MD004 -->

## Introducción

¡Bienvenido al Libro Conciso de TypeScript! Esta guía te proporciona los conocimientos esenciales y las habilidades prácticas para un desarrollo eficaz en TypeScript. Descubre conceptos y técnicas clave para escribir código limpio y robusto. Tanto si eres un principiante como un desarrollador experimentado, este libro sirve como una guía completa y una referencia práctica para aprovechar la potencia de TypeScript en tus proyectos.

Este libro cubre TypeScript 5.2.

## Sobre el autor

Simone Poggiali es un experimentado Ingeniero Staff con pasión por escribir código de nivel profesional desde los años 90. A lo largo de su carrera internacional, ha contribuido a numerosos proyectos para una amplia gama de clientes, desde startups hasta grandes organizaciones. Empresas destacadas como HelloFresh, Siemens, O2, Leroy Merlin y Snowplow se han beneficiado de su experiencia y dedicación.

Puedes contactar con Simone Poggiali en las siguientes plataformas:

* LinkedIn: [https://www.linkedin.com/in/simone-poggiali](https://www.linkedin.com/in/simone-poggiali)
* GitHub: [https://github.com/gibbok](https://github.com/gibbok)
* X.com: [https://x.com/gibbok_coding](https://x.com/gibbok_coding)
* Correo electrónico: gibbok.coding📧gmail.com

Lista completa de colaboradores: [https://github.com/gibbok/typescript-book/graphs/contributors](https://github.com/gibbok/typescript-book/graphs/contributors)

## Introducción a TypeScript

### ¿Qué es TypeScript?

TypeScript es un lenguaje de programación fuertemente tipado que se basa en JavaScript. Fue diseñado originalmente por Anders Hejlsberg en 2012 y actualmente Microsoft lo desarrolla y mantiene como un proyecto de código abierto.

TypeScript se compila a JavaScript y puede ejecutarse en cualquier entorno de ejecución de JavaScript (por ejemplo, un navegador o Node.js en un servidor).

Soporta múltiples paradigmas de programación como la programación funcional, genérica, imperativa y orientada a objetos, y es un lenguaje compilado (transpilado) que se convierte en JavaScript antes de su ejecución.

### ¿Por qué TypeScript?

TypeScript es un lenguaje fuertemente tipado que ayuda a prevenir errores de programación comunes y a evitar ciertos tipos de errores en tiempo de ejecución antes de que se ejecute el programa.

Un lenguaje fuertemente tipado permite al desarrollador especificar diversas restricciones y comportamientos del programa en las definiciones de tipos de datos, lo que facilita la capacidad de verificar la corrección del software y prevenir defectos. Esto es especialmente valioso en aplicaciones a gran escala.

Algunos beneficios de TypeScript:

* Tipado estático, opcionalmente fuertemente tipado
* Inferencia de tipos
* Acceso a funciones de ES6 y ES7
* Compatibilidad multiplataforma y entre navegadores
* Soporte de herramientas con IntelliSense

### TypeScript y JavaScript

TypeScript se escribe en archivos `.ts` o `.tsx`, mientras que los archivos JavaScript se escriben en `.js` o `.jsx`.

Los archivos con la extensión `.tsx` o `.jsx` pueden contener la Extensión de Sintaxis de JavaScript JSX, que se utiliza en React para el desarrollo de interfaces de usuario (UI).

TypeScript es un superconjunto tipado de JavaScript (ECMAScript 2015) en términos de sintaxis. Todo el código JavaScript es código TypeScript válido, pero lo contrario no siempre es cierto.

Por ejemplo, considera una función en un archivo JavaScript con extensión `.js`, como la siguiente:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

La función se puede convertir y usar en TypeScript cambiando la extensión del archivo a `.ts`. Sin embargo, si la misma función se anota con tipos de TypeScript, no se puede ejecutar en ningún entorno de ejecución de JavaScript sin compilación. El siguiente código de TypeScript producirá un error de sintaxis si no se compila:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript fue diseñado para detectar posibles excepciones que pueden ocurrir en tiempo de ejecución durante el tiempo de compilación, haciendo que el desarrollador defina su intención con anotaciones de tipo. Además, TypeScript también puede detectar problemas si no se proporciona ninguna anotación de tipo. Por ejemplo, el siguiente fragmento de código no especifica ningún tipo de TypeScript:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

En este caso, TypeScript detecta un error e informa:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

El sistema de tipos de TypeScript está influenciado en gran medida por el comportamiento en tiempo de ejecución de JavaScript. Por ejemplo, el operador de suma (+), que en JavaScript puede realizar una concatenación de cadenas o una suma numérica, se modela de la misma manera en TypeScript:

```typescript
const result = '1' + 1; // Result is of type string
```

El equipo detrás de TypeScript ha tomado la decisión deliberada de marcar el uso inusual de JavaScript como errores. Por ejemplo, considera el siguiente código JavaScript válido:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal 2
```

Sin embargo, TypeScript lanza un error:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Este error ocurre porque TypeScript impone estrictamente la compatibilidad de tipos y, en este caso, identifica una operación no válida entre un número y un booleano.

### Generación de código TypeScript

El compilador de TypeScript tiene dos responsabilidades principales: comprobar si hay errores de tipo y compilar a JavaScript. Estos dos procesos son independientes entre sí. Los tipos no afectan a la ejecución del código en un entorno de ejecución de JavaScript, ya que se eliminan por completo durante la compilación. TypeScript aún puede generar JavaScript incluso en presencia de errores de tipo.
Aquí hay un ejemplo de código TypeScript con un error de tipo:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Sin embargo, todavía puede producir una salida de JavaScript ejecutable:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

No es posible comprobar los tipos de TypeScript en tiempo de ejecución. Por ejemplo:

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // 'Dog' only refers to a type, but is being used as a value here.
        // ...
    }
};
```

Como los tipos se eliminan tras la compilación, no hay forma de ejecutar este código en JavaScript. Para reconocer tipos en tiempo de ejecución, necesitamos utilizar otro mecanismo. TypeScript ofrece varias opciones, siendo una de las más comunes la "unión etiquetada" (tagged union). Por ejemplo:

```typescript
interface Dog {
    kind: 'dog'; // Tagged union
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // Tagged union
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

La propiedad "kind" es un valor que se puede utilizar en tiempo de ejecución para distinguir entre objetos en JavaScript.

También es posible que un valor en tiempo de ejecución tenga un tipo diferente al declarado en la declaración de tipo. Por ejemplo, si el desarrollador ha interpretado incorrectamente un tipo de API y lo ha anotado mal.

TypeScript es un superconjunto de JavaScript, por lo que la palabra clave "class" puede usarse como tipo y valor en tiempo de ejecución.

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(
        public name: string,
        public bark: () => void
    ) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(
        public name: string,
        public meow: () => void
    ) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

En JavaScript, una "clase" tiene una propiedad "prototype", y el operador "instanceof" puede usarse para comprobar si la propiedad prototype de un constructor aparece en cualquier lugar de la cadena de prototipos de un objeto.

TypeScript no afecta al rendimiento en tiempo de ejecución, ya que todos los tipos se eliminarán. Sin embargo, TypeScript introduce cierta sobrecarga en el tiempo de construcción.

### JavaScript moderno ahora (Downleveling)

TypeScript puede compilar código a cualquier versión publicada de JavaScript desde ECMAScript 3 (1999). Esto significa que TypeScript puede transpilar código desde las funciones de JavaScript más recientes a versiones anteriores, un proceso conocido como Downleveling. Esto permite el uso de JavaScript moderno manteniendo la máxima compatibilidad con entornos de ejecución más antiguos.

Es importante señalar que durante la transpilación a una versión más antigua de JavaScript, TypeScript puede generar código que podría incurrir en una sobrecarga de rendimiento en comparación con las implementaciones nativas.

Estas son algunas de las características modernas de JavaScript que pueden usarse en TypeScript:

* Módulos ECMAScript en lugar de devoluciones de llamada "define" de estilo AMD o instrucciones "require" de CommonJS.
* Clases en lugar de prototipos.
* Declaración de variables mediante "let" o "const" en lugar de "var".
* Bucle "for-of" o ".forEach" en lugar del bucle "for" tradicional.
* Funciones de flecha (Arrow functions) en lugar de expresiones de función.
* Asignación por desestructuración.
* Nombres abreviados de propiedades/métodos y nombres de propiedades calculadas.
* Parámetros de función predeterminados.

Al aprovechar estas funciones modernas de JavaScript, los desarrolladores pueden escribir código más expresivo y conciso en TypeScript.

## Primeros pasos con TypeScript

Para usar TypeScript necesitas el compilador de TypeScript (TSC), que se puede instalar a través de gestores de paquetes populares como [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/) o [bun](https://bun.sh/).

### Instalación

Normalmente, el compilador de TypeScript se instala por proyecto mediante comandos de npm como los siguientes:

```bash
npm install --save-dev typescript
```

El compilador de TypeScript se puede invocar a través de la interfaz de línea de comandos (CLI) npx:

```bash
npx tsc --version
```

### Configuración

El compilador de TypeScript necesita un archivo de configuración llamado `tsconfig.json` para definir las opciones del compilador y los archivos que se incluirán en el proceso de compilación.

Para generar un archivo de configuración predeterminado, puedes ejecutar el siguiente comando:

```bash
npx tsc --init
```

Este comando creará un archivo `tsconfig.json` con la configuración recomendada para tu proyecto.

### Archivo de configuración de TypeScript

El archivo `tsconfig.json` contiene muchas opciones para configurar el comportamiento del compilador. Algunas de las opciones más importantes son:

#### target

Especifica la versión de destino de JavaScript para el código compilado.

```json
"target": "ESNext"
```

#### lib

Define qué bibliotecas de tipos están disponibles para tu proyecto.

```json
"lib": ["DOM", "ESNext"]
```

#### strict

Habilita una serie de opciones de comprobación de tipos estrictas que ayudan a detectar errores potenciales de forma más eficaz.

```json
"strict": true
```

#### module

Determina el sistema de módulos utilizado por el código JavaScript generado.

```json
"module": "ESNext"
```

#### moduleResolution

Configura cómo el compilador resuelve las dependencias de los módulos.

```json
"moduleResolution": "Node"
```

#### esModuleInterop

Mejora la interoperabilidad entre los módulos CommonJS y ES.

```json
"esModuleInterop": true
```

#### jsx

Especifica la salida del código JSX.

```json
"jsx": "react-jsx"
```

#### skipLibCheck

Omite la comprobación de tipos de los archivos de declaración de biblioteca (`.d.ts`). Esto puede mejorar drásticamente el rendimiento del tiempo de construcción.

```json
"skipLibCheck": true
```

#### files

Especifica una lista blanca de archivos para incluir en el proceso de compilación.

```json
"files": ["src/index.ts"]
```

#### include

Define los patrones de archivos o directorios que se incluirán en la compilación.

```json
"include": ["src/**/*"]
```

#### exclude

Indica qué archivos o directorios deben excluirse de la compilación.

```json
"exclude": ["node_modules", "dist"]
```

### importHelpers

TypeScript a veces genera funciones de ayuda para la compatibilidad con versiones anteriores de JavaScript (Downleveling). La opción `importHelpers` permite al compilador importar estas funciones de ayuda desde el paquete `tslib` en lugar de generarlas para cada archivo. Esto puede reducir el tamaño total del código generado.

Para usar `importHelpers`, necesitas instalar la biblioteca `tslib`:

```bash
npm install tslib
```

Luego habilita la opción `importHelpers` en tu `tsconfig.json`:

```json
"importHelpers": true
```

### Consejos para la migración a TypeScript

Migrar un proyecto JavaScript grande a TypeScript puede ser un reto. Aquí hay algunos pasos para facilitar el proceso:

1. **Añade TypeScript como dependencia**: Instala el paquete de TypeScript como una dependencia de desarrollo.
2. **Crea un archivo tsconfig.json**: Configura TypeScript con las opciones adecuadas. Comienza con una configuración menos estricta y auméntala gradualmente.
3. **Cambia las extensiones de los archivos**: Cambia gradualmente las extensiones de tus archivos de `.js` a `.ts`.
4. **Resuelve los errores del compilador**: Aborda los errores identificados por el compilador de TypeScript. Puedes usar el tipo `any` temporalmente para que el código sea válido, pero el objetivo final es proporcionar tipos precisos.
5. **Usa @ts-ignore o @ts-nocheck**: Estos comentarios se pueden usar para omitir la comprobación de tipos para líneas o archivos específicos cuando sea necesario durante la fase de migración.
6. **Aprovecha las bibliotecas de tipos externas**: Muchos paquetes de JavaScript populares tienen definiciones de tipos disponibles en el repositorio [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). Puedes instalarlos usando npm (por ejemplo, `npm install --save-dev @types/react`).

A medida que ganes confianza y experiencia con TypeScript, podrás aprovechar gradualmente sus funciones avanzadas para mejorar la calidad y la mantenibilidad de tu código.

## Explorando el sistema de tipos

### El servicio de lenguaje de TypeScript

TypeScript ofrece un servicio de lenguaje que potencia las funciones avanzadas del editor, como IntelliSense, la refactorización y la navegación por el código. Este servicio analiza tu código en tiempo real, proporcionando sugerencias útiles y detectando errores potenciales a medida que escribes. Los editores más populares, como Visual Studio Code, tienen soporte integrado para el servicio de lenguaje de TypeScript.

### Tipado estructural

El sistema de tipos de TypeScript se basa en el tipado estructural, también conocido como "duck typing" (tipado de pato). Esto significa que se considera que dos tipos son compatibles si tienen la misma estructura, independientemente de sus nombres o declaraciones explícitas.

Considera el siguiente ejemplo:

```typescript
interface Point {
    x: number;
    y: number;
}

function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26 };
logPoint(point); // El objeto point coincide con la estructura de la interfaz Point
```

En este caso, la variable `point` se puede pasar a la función `logPoint` porque tiene las propiedades requeridas `x` e `y` de tipo `number`.

### Reglas fundamentales de comparación de TypeScript

TypeScript utiliza un conjunto de reglas para determinar si dos tipos son compatibles. Estas reglas se centran en la estructura de los tipos más que en sus nombres.

1. **Relación de subtipo**: Un tipo `A` es un subtipo de `B` si `A` tiene al menos todas las propiedades de `B` con tipos compatibles.
2. **Compatibilidad de funciones**: Dos funciones son compatibles si sus listas de parámetros y tipos de retorno son compatibles. El número de parámetros puede variar si los parámetros adicionales son opcionales.
3. **Compatibilidad de clases**: Las clases se comparan basándose en sus miembros de instancia. Los miembros estáticos y los constructores no afectan a la compatibilidad.
4. **Compatibilidad de Enums**: Los valores de los enums son compatibles con los números, y los números son compatibles con los valores de los enums. Sin embargo, los valores de diferentes enums pueden no ser compatibles entre sí.

Comprender estas reglas es crucial para trabajar eficazmente con el sistema de tipos de TypeScript.

### Tipos como conjuntos

En TypeScript, puedes pensar en los tipos como conjuntos de valores posibles. Un tipo define un conjunto de valores que se pueden asignar a una variable de ese tipo.

* El tipo `number` representa el conjunto de todos los números posibles.
* El tipo `string` representa el conjunto de todas las cadenas posibles.
* Un tipo de unión como `string | number` representa la unión de los conjuntos de cadenas y números.

Al ver los tipos como conjuntos, es más fácil comprender conceptos como la asignabilidad e intersección de tipos.

### Asignar un tipo: Declaraciones de tipo y aserciones de tipo

Hay dos formas principales de asignar un tipo a un valor en TypeScript: declaraciones de tipo y aserciones de tipo.

#### Declaración de tipo

Una declaración de tipo especifica explícitamente el tipo de una variable o parámetro en el momento de la declaración.

```typescript
const name: string = 'Alice';
```

En este ejemplo, la variable `name` se declara explícitamente como tipo `string`.

#### Aserción de tipo

Una aserción de tipo permite al desarrollador decirle al compilador que trate un valor como un tipo específico, incluso si el compilador no puede deducirlo automáticamente. Se utiliza habitualmente cuando tienes más información sobre el tipo de un valor que la que el compilador puede determinar.

```typescript
const value: any = 'Hello';
const length: number = (value as string).length;
```

Aquí, el desarrollador afirma que `value` es de tipo `string` para acceder a su propiedad `length`. Las aserciones de tipo deben usarse con precaución, ya que pueden introducir errores en tiempo de ejecución si la aserción es incorrecta.

#### Declaraciones ambientales

Las declaraciones ambientales se utilizan para proporcionar información de tipo para el código que no está escrito en TypeScript, como bibliotecas externas de JavaScript. Estas declaraciones se escriben normalmente en archivos `.d.ts`.

```typescript
declare var myLibrary: any;
```

Esta declaración le dice a TypeScript que existe una variable global llamada `myLibrary`, incluso si no está definida en el código TypeScript actual.

### Comprobación de propiedades y comprobación de exceso de propiedades

TypeScript realiza comprobaciones de propiedades para asegurar que los objetos tengan las propiedades esperadas según sus tipos definidos.

Cuando asignas un literal de objeto a una variable con un tipo explícito, TypeScript realiza una comprobación de exceso de propiedades. Esto significa que si el literal de objeto tiene alguna propiedad que no está definida en el tipo, TypeScript lanzará un error.

```typescript
interface Point {
    x: number;
    y: number;
}

const p: Point = { x: 10, y: 20, z: 30 }; // Error: 'z' no existe en el tipo 'Point'
```

Sin embargo, si asignas un objeto existente a una variable, el exceso de propiedades se ignora debido al tipado estructural.

```typescript
const pointWithZ = { x: 10, y: 20, z: 30 };
const p: Point = pointWithZ; // Correcto
```

### Tipos débiles

Un tipo débil es un tipo de objeto donde todas sus propiedades son opcionales. TypeScript impone reglas de comprobación adicionales para los tipos débiles para evitar errores comunes. Si intentas asignar un objeto a un tipo débil y no tienen ninguna propiedad en común, TypeScript lanzará un error.

```typescript
interface Options {
    color?: string;
    width?: number;
}

const options = { name: 'test' };
const o: Options = options; // Error: El tipo '{ name: string; }' no tiene propiedades en común con el tipo 'Options'
```

### Comprobación estricta de literales de objeto (Freshness)

La "frescura" (freshness) es un concepto en TypeScript que ayuda a detectar errores al trabajar con literales de objeto. Cuando se crea un literal de objeto, se considera "fresco". Los literales de objeto frescos están sujetos a una comprobación de exceso de propiedades más estricta cuando se asignan a variables o se pasan como argumentos.

Una vez que un literal de objeto se asigna a una variable o se pasa a una función, pierde su "frescura".

### Inferencia de tipos

TypeScript es capaz de deducir automáticamente el tipo de una variable basándose en su valor asignado. Esto se conoce como inferencia de tipos.

```typescript
let x = 10; // x es de tipo number
let y = 'hello'; // y es de tipo string
```

La inferencia de tipos reduce la necesidad de anotaciones de tipo explícitas, haciendo que el código sea más conciso y fácil de leer.

### Inferencias más avanzadas

TypeScript puede realizar inferencias de tipo más complejas, como deducir el tipo de retorno de una función o el tipo de una variable en un bucle.

```typescript
function add(a: number, b: number) {
    return a + b; // El tipo de retorno se infiere como number
}

const numbers = [1, 2, 3];
numbers.forEach(n => {
    // n se infiere como number basándose en el tipo del array
});
```

### Ampliación de tipos (Type Widening)

La ampliación de tipos ocurre cuando TypeScript infiere un tipo más general para una variable de lo que su valor inicial podría sugerir. Por ejemplo, si asignas un literal de cadena a una variable `let`, TypeScript inferirá el tipo `string` en lugar del tipo literal de cadena específico.

```typescript
let x = 'hello'; // x es de tipo string
```

Si quieres evitar la ampliación de tipos, puedes usar `const` o una anotación de tipo explícita.

```typescript
const y = 'hello'; // y es de tipo literal "hello"
```

### Const

La palabra clave `const` se utiliza para declarar variables cuyos valores no pueden ser reasignados. En TypeScript, `const` también afecta a cómo se infieren los tipos.

#### Modificador Const en parámetros de tipo

A partir de TypeScript 5.0, se puede usar el modificador `const` en los parámetros de tipo para evitar la ampliación de tipos al llamar a funciones genéricas.

```typescript
function createPair<const T, const U>(a: T, b: U): [T, U] {
    return [a, b];
}

const pair = createPair('hello', 10); // pair es de tipo ["hello", 10] en lugar de [string, number]
```

#### Aserción const

Una aserción `const` es una forma de decirle a TypeScript que trate un literal de objeto o array como inmutable y que no realice la ampliación de tipos.

```typescript
const point = { x: 10, y: 20 } as const;
// point.x = 30; // Error: No se puede asignar a 'x' porque es una propiedad de solo lectura
```

Las aserciones `const` son útiles cuando quieres asegurar que un objeto se trate como una constante con tipos literales específicos.

### Anotación de tipo explícita

A veces, la inferencia de tipos de TypeScript puede no ser suficiente, o puede que quieras ser más explícito para mejorar la claridad del código y asegurar que se cumplan ciertos contratos. En tales casos, puedes proporcionar anotaciones de tipo explícitas.

```typescript
const count: number = 10;
const greeting: string = 'Hello, TypeScript!';

function greet(name: string): string {
    return `Hello, ${name}!`;
}
```

Las anotaciones de tipo proporcionan una forma clara de documentar la intención de tu código y permiten a TypeScript detectar errores si los valores asignados no coinciden con los tipos declarados.

### Estrechamiento de tipos (Type Narrowing)

El estrechamiento de tipos es el proceso de refinar el tipo de una variable dentro de un bloque de código basado en ciertas condiciones. Esto permite a TypeScript entender que una variable tiene un tipo más específico de lo que se declaró inicialmente.

#### Condiciones

Puedes usar sentencias `if` y otros operadores condicionales para estrechar el tipo de una variable.

```typescript
function printLength(value: string | number) {
    if (typeof value === 'string') {
        // Dentro de este bloque, value se estrecha al tipo string
        console.log(value.length);
    } else {
        // Dentro de este bloque, value se estrecha al tipo number
        console.log(value);
    }
}
```

#### Lanzar o retornar

Si una función lanza una excepción o retorna prematuramente en una rama de una condición, TypeScript estrechará automáticamente el tipo de la variable en el resto de la función.

```typescript
function processValue(value: string | null) {
    if (value === null) {
        return;
    }
    // value se estrecha al tipo string aquí
    console.log(value.toUpperCase());
}
```

#### Unión discriminada

Una unión discriminada es un patrón común en TypeScript donde usas una propiedad común (el discriminante) para distinguir entre diferentes tipos en una unión.

```typescript
interface Circle {
    kind: 'circle';
    radius: number;
}

interface Square {
    kind: 'square';
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
    if (shape.kind === 'circle') {
        // shape es de tipo Circle aquí
        return Math.PI * shape.radius ** 2;
    } else {
        // shape es de tipo Square aquí
        return shape.sideLength ** 2;
    }
}
```

#### Protectores de tipo definidos por el usuario

También puedes crear tus propios protectores de tipo (type guards) definiendo una función que devuelva un predicado de tipo.

```typescript
function isString(value: any): value is string {
    return typeof value === 'string';
}

function process(value: string | number) {
    if (isString(value)) {
        // value es de tipo string aquí
        console.log(value.toUpperCase());
    }
}
```

## Tipos primitivos

TypeScript soporta los mismos tipos primitivos que JavaScript, con la adición de algunos tipos específicos de TypeScript.

### string

Representa valores de texto.

```typescript
let name: string = 'Alice';
```

### boolean

Representa valores lógicos (true o false).

```typescript
let isActive: boolean = true;
```

### number

Representa tanto números enteros como de punto flotante.

```typescript
let count: number = 10;
let price: number = 19.99;
```

### bigInt

Representa números enteros arbitrariamente grandes (disponible desde ES2020).

```typescript
let largeNumber: bigint = 9007199254740991n;
```

### Symbol

Representa un identificador único e inmutable.

```typescript
let id: symbol = Symbol('id');
```

### null y undefined

Representan la ausencia de un valor o un valor no definido.

```typescript
let n: null = null;
let u: undefined = undefined;
```

### Array

Representa una colección ordenada de elementos del mismo tipo. Hay dos formas de declarar tipos de array:

```typescript
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

### any

El tipo `any` es un tipo especial que permite desactivar la comprobación de tipos para una variable. Se debe usar con moderación, ya que anula los beneficios de usar TypeScript.

```typescript
let value: any = 10;
value = 'hello'; // No hay error de tipo

## Anotaciones de tipo

Aunque TypeScript puede inferir muchos tipos, puedes proporcionar anotaciones de tipo explícitas para mayor claridad y control.

```typescript
let message: string = 'Hello';
```

## Propiedades opcionales

Puedes definir propiedades en interfaces u objetos como opcionales usando el signo de interrogación `?`.

```typescript
interface User {
    id: number;
    name: string;
    email?: string; // Propiedad opcional
}
```

## Propiedades de solo lectura

Usa el modificador `readonly` para hacer que una propiedad sea inmutable después de su inicialización.

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
```

## Firmas de índice

Las firmas de índice te permiten definir tipos para objetos que pueden tener un número desconocido de propiedades.

```typescript
interface Dictionary {
    [key: string]: string;
}

const colors: Dictionary = {
    red: '#ff0000',
    blue: '#0000ff',
};
```

## Extensión de tipos

Puedes extender interfaces u objetos para crear nuevos tipos basados en los existentes.

```typescript
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}
```

## Tipos literales

Los tipos literales te permiten especificar un valor exacto que debe tener una variable.

```typescript
let direction: 'left' | 'right' | 'up' | 'down';
direction = 'left'; // Correcto
// direction = 'north'; // Error
```

## Inferencia de literales

Cuando inicializas una variable con un valor literal, TypeScript infiere el tipo literal correspondiente si se usa `const`.

```typescript
const version = '1.0.0'; // El tipo es el literal "1.0.0"
```

## strictNullChecks

Cuando la opción `strictNullChecks` está habilitada, TypeScript te obliga a manejar explícitamente los valores `null` y `undefined`.

```typescript
let name: string = null; // Error si strictNullChecks es true
let nameWithNull: string | null = null; // Correcto
```

## Enums

Los enums te permiten definir un conjunto de constantes con nombre.

### Enums numéricos

Por defecto, los enums son numéricos y comienzan desde 0.

```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```

### Enums de cadena

Los enums de cadena permiten asignar valores de cadena a cada miembro.

```typescript
enum Color {
    Red = 'RED',
    Green = 'GREEN',
    Blue = 'BLUE',
}
```

### Enums constantes

Los enums constantes se eliminan durante la compilación y sus valores se insertan directamente en el código JavaScript generado para mejorar el rendimiento.

```typescript
const enum Status {
    Active,
    Inactive,
}
```

### Mapeo inverso

Los enums numéricos soportan el mapeo inverso de valores a nombres.

```typescript
enum Status {
    Active = 1,
}
console.log(Status[1]); // "Active"
```

### Enums ambientales

Los enums ambientales se utilizan para describir tipos de enums existentes definidos en otros lugares.

```typescript
declare enum ExternalEnum {
    Value1,
    Value2,
}
```

### Miembros computados y constantes

Los miembros de un enum pueden ser constantes o valores calculados en tiempo de ejecución.

```typescript
enum FileAccess {
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    G = "123".length, // Miembro computado
}

## Estrechamiento (Narrowing)

El estrechamiento es el proceso por el cual TypeScript refina un tipo a uno más específico.

### typeof type guards

Usa el operador `typeof` para comprobar tipos primitivos.

```typescript
function padLeft(padding: number | string, input: string) {
    if (typeof padding === 'number') {
        return ' '.repeat(padding) + input;
    }
    return padding + input;
}
```

### Estrechamiento por veracidad (Truthiness narrowing)

TypeScript puede estrechar tipos basándose en si un valor es "verdadero" o "falso" en un contexto booleano.

```typescript
function printAll(strs: string | string[] | null) {
    if (strs && typeof strs === 'object') {
        for (const s of strs) {
            console.log(s);
        }
    } else if (typeof strs === 'string') {
        console.log(strs);
    }
}
```

### Estrechamiento por igualdad (Equality narrowing)

Operadores como `===`, `!==`, `==` y `!=` se pueden usar para estrechar tipos.

```typescript
function example(x: string | number, y: string | boolean) {
    if (x === y) {
        // x e y deben ser strings aquí
        x.toUpperCase();
        y.toLowerCase();
    }
}
```

### Estrechamiento con el operador In

El operador `in` comprueba si un objeto tiene una propiedad específica.

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ('swim' in animal) {
        return animal.swim();
    }
    return animal.fly();
}
```

### Estrechamiento con instanceof

El operador `instanceof` comprueba si un objeto es una instancia de una clase específica.

```typescript
function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toUpperCase());
    }
}
```

## Asignaciones

Cuando asignas un valor a una variable, TypeScript estrechará el tipo de la variable basándose en el valor asignado.

```typescript
let x = Math.random() < 0.5 ? 10 : 'hello world';
x = 1; // x se estrecha a number
console.log(x);
x = 'goodbye!'; // x se estrecha a string
console.log(x);
```

## Análisis del flujo de control

TypeScript analiza el flujo de ejecución de tu código para refinar los tipos de las variables en diferentes puntos.

```typescript
function example() {
    let x: string | number | boolean;
    x = Math.random() < 0.5;
    console.log(x); // x es boolean aquí
    if (Math.random() < 0.5) {
        x = 'hello';
        console.log(x); // x es string aquí
    } else {
        x = 100;
        console.log(x); // x es number aquí
    }
    return x; // x es string | number aquí
}
```

## Predicados de tipo

Un predicado de tipo es una función que devuelve un valor booleano y tiene un tipo de retorno especial que le dice a TypeScript que estreche el tipo del argumento.

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
```

## Uniones discriminadas

Como se mencionó anteriormente, una unión discriminada utiliza una propiedad común para distinguir entre tipos.

```typescript
interface Circle {
    kind: 'circle';
    radius: number;
}
interface Square {
    kind: 'square';
    sideLength: number;
}
type Shape = Circle | Square;
```

## El tipo never

El tipo `never` representa valores que nunca deberían ocurrir. Se usa a menudo en comprobaciones de exhaustividad.

## Comprobación de exhaustividad

Puedes usar el tipo `never` para asegurar que has manejado todos los casos posibles en una unión discriminada.

```typescript
function getArea(shape: Shape) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

## Tipos de objeto

En TypeScript, los tipos de objeto describen la forma de un objeto. Especifican los nombres y tipos de las propiedades del objeto, así como si esas propiedades son requeridas u opcionales.

En TypeScript, puedes definir tipos de objeto de dos formas principales:

**Interface**, que define la forma de un objeto especificando los nombres, tipos y la opcionalidad de sus propiedades.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

**Type alias** (alias de tipo), similar a una interfaz, define la forma de un objeto. Sin embargo, también puede crear un nuevo tipo personalizado basado en un tipo existente o una combinación de tipos existentes. Esto incluye definir tipos de unión, tipos de intersección y otros tipos complejos.

```typescript
type Point = {
    x: number;
    y: number;
};
```

También es posible definir un tipo de forma anónima:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

## Tipo tupla (Anónimo)

Un tipo tupla es un tipo que representa un array con un número fijo de elementos y sus tipos correspondientes. Un tipo tupla impone un número específico de elementos y sus respectivos tipos en un orden fijo. Los tipos tupla son útiles cuando quieres representar una colección de valores con tipos específicos, donde la posición de cada elemento en el array tiene un significado específico.

```typescript
type Point = [number, number];
```

## Tipo tupla nombrado (Etiquetado)

Los tipos tupla pueden incluir etiquetas o nombres opcionales para cada elemento. Estas etiquetas sirven para mejorar la legibilidad y ayudar a las herramientas, y no afectan a las operaciones que puedes realizar con ellas.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Tupla nombrada más tupla anónima
```

## Tupla de longitud fija

Una tupla de longitud fija es un tipo específico de tupla que impone un número fijo de elementos de tipos específicos y no permite ninguna modificación en la longitud de la tupla una vez definida.

Las tuplas de longitud fija son útiles cuando necesitas representar una colección de valores con un número específico de elementos y tipos específicos, y quieres asegurar que la longitud y los tipos de la tupla no se cambien inadvertidamente.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

## Tipo unión

Un tipo unión es un tipo que representa un valor que puede ser uno de varios tipos. Los tipos unión se denotan usando el símbolo `|` entre cada tipo posible.

```typescript
let x: string | number;
x = 'hello'; // Válido
x = 123; // Válido
```

## Tipos de intersección

Un tipo de intersección es un tipo que representa un valor que tiene todas las propiedades de dos o más tipos. Los tipos de intersección se denotan usando el símbolo `&` entre cada tipo.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersección

const j: J = {
    a: 'a',
    b: 'b',
};
```

## Indexación de tipos

La indexación de tipos se refiere a la capacidad de definir tipos que pueden indexarse por una clave que no se conoce de antemano, utilizando una firma de índice para especificar el tipo de las propiedades que no se declaran explícitamente.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Devuelve a
```

## Tipo desde valor

El "tipo desde valor" en TypeScript se refiere a la inferencia automática de un tipo a partir de un valor o expresión a través de la inferencia de tipos.

```typescript
const x = 'x'; // TypeScript infiere 'x' como un literal de cadena con 'const' (inmutable), pero lo amplía a 'string' con 'let' (reasignable).
```

## Tipo desde el retorno de una función

El "tipo desde el retorno de una función" se refiere a la capacidad de inferir automáticamente el tipo de retorno de una función basándose en su implementación. Esto permite que TypeScript determine el tipo del valor devuelto por la función sin anotaciones de tipo explícitas.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript puede inferir que el tipo de retorno de la función es un número
```

## Tipo desde un módulo

El "tipo desde un módulo" se refiere a la capacidad de usar los valores exportados de un módulo para inferir automáticamente sus tipos. Cuando un módulo exporta un valor con un tipo específico, TypeScript puede usar esa información para inferir automáticamente el tipo de ese valor cuando se importa en otro módulo.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r es number
```

## Tipos mapeados

Los tipos mapeados en TypeScript te permiten crear nuevos tipos basados en un tipo existente transformando cada propiedad mediante una función de mapeo. Al mapear tipos existentes, puedes crear nuevos tipos que representen la misma información en un formato diferente. Para crear un tipo mapeado, accedes a las propiedades de un tipo existente usando el operador `keyof` y luego las alteras para producir un nuevo tipo.
En el siguiente ejemplo:

```typescript
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
};
type MyType = {
    foo: string;
    bar: number;
};
type MyNewType = MyMappedType<MyType>;
const x: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3],
};
```

Definimos `MyMappedType` para mapear sobre las propiedades de `T`, creando un nuevo tipo con cada propiedad como un array de su tipo original. Usando esto, creamos `MyNewType` para representar la misma información que `MyType`, pero con cada propiedad como un array.

## Modificadores de tipos mapeados

Los modificadores de tipos mapeados en TypeScript permiten la transformación de propiedades dentro de un tipo existente:

* `readonly` o `+readonly`: Esto hace que una propiedad en el tipo mapeado sea de solo lectura.
* `-readonly`: Esto permite que una propiedad en el tipo mapeado sea mutable.
* `?`: Esto designa una propiedad en el tipo mapeado como opcional.

Ejemplos:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // Todas las propiedades marcadas como de solo lectura

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Todas las propiedades marcadas como mutables

type MyPartial<T> = { [P in keyof T]?: T[P] }; // Todas las propiedades marcadas como opcionales
```

## Tipos condicionales

Los tipos condicionales son una forma de crear un tipo que depende de una condición, donde el tipo que se va a crear se determina en función del resultado de la condición. Se definen utilizando la palabra clave `extends` y un operador ternario para elegir condicionalmente entre dos tipos.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Tipo true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Tipo false
```

## Tipos condicionales distributivos

Los tipos condicionales distributivos son una función que permite que un tipo se distribuya sobre una unión de tipos, aplicando una transformación a cada miembro de la unión individualmente.
Esto puede ser especialmente útil al trabajar con tipos mapeados o tipos de orden superior.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

## Inferencia de tipos infer en tipos condicionales

La palabra clave `infer` se utiliza en los tipos condicionales para inferir (extraer) el tipo de un parámetro genérico de un tipo que depende de él. Esto te permite escribir definiciones de tipos más flexibles y reutilizables.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

## Tipos condicionales predefinidos

En TypeScript, los tipos condicionales predefinidos son tipos condicionales integrados proporcionados por el lenguaje. Están diseñados para realizar transformaciones de tipos comunes basadas en las características de un tipo dado.

`Exclude<UnionType, ExcludedType>`: Este tipo elimina todos los tipos de `UnionType` que son asignables a `ExcludedType`.

`Extract<Type, Union>`: Este tipo extrae todos los tipos de `Union` que son asignables a `Type`.

`NonNullable<Type>`: Este tipo elimina `null` y `undefined` de `Type`.

`ReturnType<Type>`: Este tipo extrae el tipo de retorno de una función `Type`.

`Parameters<Type>`: Este tipo extrae los tipos de los parámetros de una función `Type`.

`Required<Type>`: Este tipo hace que todas las propiedades en `Type` sean requeridas.

`Partial<Type>`: Este tipo hace que todas las propiedades en `Type` sean opcionales.

`Readonly<Type>`: Este tipo hace que todas las propiedades en `Type` sean de solo lectura.

## Tipos de unión de plantilla

Los tipos de unión de plantilla se pueden usar para fusionar y manipular texto dentro del sistema de tipos, por ejemplo:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

## Tipo any

El tipo `any` es un tipo especial (supertipo universal) que se puede usar para representar cualquier tipo de valor (primitivos, objetos, arrays, funciones, errores, símbolos). A menudo se usa en situaciones donde el tipo de un valor no se conoce en tiempo de compilación, o cuando se trabaja con valores de APIs o bibliotecas externas que no tienen tipado de TypeScript.

Al utilizar el tipo `any`, indicas al compilador de TypeScript que los valores deben representarse sin ninguna limitación. Para maximizar la seguridad de tipos en tu código, considera lo siguiente:

* Limita el uso de `any` a casos específicos donde el tipo es verdaderamente desconocido.
* No devuelvas tipos `any` desde una función, ya que esto debilita la seguridad de tipos en el código que la usa.
* En lugar de `any`, usa `@ts-ignore` si necesitas silenciar al compilador.

```typescript
let value: any;
value = true; // Válido
value = 7; // Válido
```

## Tipo unknown

El tipo `unknown` es similar al tipo `any` en que puede representar cualquier valor. Sin embargo, es un tipo mucho más seguro. A diferencia de `any`, no puedes realizar ninguna operación sobre un valor de tipo `unknown` sin antes estrechar su tipo mediante una comprobación de tipo o una aserción.

```typescript
let value: unknown;
value = 'hello';

// value.toUpperCase(); // Error: El objeto es de tipo 'unknown'

if (typeof value === 'string') {
    console.log(value.toUpperCase()); // Correcto
}
```

## Tipo void

El tipo `void` se utiliza habitualmente como el tipo de retorno de funciones que no devuelven un valor.

```typescript
function logMessage(message: string): void {
    console.log(message);
}
```

## Tipo never

Como ya se ha comentado anteriormente, el tipo `never` representa valores que nunca deberían ocurrir. Se utiliza principalmente en el manejo de errores o en comprobaciones de exhaustividad.

```typescript
function error(message: string): never {
    throw new Error(message);
}

## Interface y Type

### Sintaxis común

En TypeScript, las interfaces definen la estructura de los objetos, especificando los nombres y tipos de las propiedades o métodos que debe tener un objeto. La sintaxis común para definir una interfaz en TypeScript es la siguiente:

<!-- skip -->
```typescript
interface NombreInterfaz {
    propiedad1: Tipo1;
    // ...
    metodo1(arg1: TipoArg1, arg2: TipoArg2): TipoRetorno;
    // ...
}
```

Del mismo modo para la definición de tipo:

<!-- skip -->
```typescript
type NombreTipo = {
    propiedad1: Tipo1;
    // ...
    metodo1(arg1: TipoArg1, arg2: TipoArg2): TipoRetorno;
    // ...
};
```

`interface NombreInterfaz` o `type NombreTipo`: Define el nombre de la interfaz o tipo.

`propiedad1: Tipo1`: Especifica las propiedades junto con sus tipos correspondientes. Se pueden definir múltiples propiedades, cada una separada por un punto y coma.

`metodo1(arg1: TipoArg1, arg2: TipoArg2): TipoRetorno;`: Especifica los métodos de la interfaz. Los métodos se definen con sus nombres, seguidos de una lista de parámetros entre paréntesis y el tipo de retorno. Se pueden definir múltiples métodos, cada uno separado por un punto y coma.

Ejemplo de interfaz:

```typescript
interface Persona {
    name: string;
    age: number;
    greet(): void;
}
```

Ejemplo de tipo:

```typescript
type NombreTipo = {
    propiedad1: string;
    metodo1(arg1: string, arg2: string): string;
};
```

En TypeScript, los tipos se utilizan para definir la forma de los datos y aplicar la comprobación de tipos. Hay varias sintaxis comunes para definir tipos, dependiendo del caso de uso específico. Aquí hay algunos ejemplos:

### Tipos básicos

```typescript
let miNumero: number = 123; // tipo number
let miBooleano: boolean = true; // tipo boolean
let miArray: string[] = ['a', 'b']; // array de strings
let miTupla: [string, number] = ['a', 123]; // tupla
```

### Objetos e interfaces

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Tipos de unión e intersección

```typescript
type MiTipo = string | number; // Tipo unión
let miUnion: MiTipo = 'hello'; // Puede ser un string
miUnion = 123; // O un número

type TipoA = { name: string };
type TipoB = { age: number };
type TipoCombinado = TipoA & TipoB; // Tipo de intersección
let miCombinado: TipoCombinado = { name: 'John', age: 25 }; // Objeto con propiedades name y age
```

## Primitivos de tipo integrados

TypeScript tiene varios primitivos de tipo integrados que se pueden usar para definir variables, parámetros de función y tipos de retorno:

* `number`: Representa valores numéricos, incluidos enteros y números de punto flotante.
* `string`: Representa datos textuales.
* `boolean`: Representa valores lógicos, que pueden ser true o false.
* `null`: Representa la ausencia de un valor.
* `undefined`: Representa un valor que no ha sido asignado o no ha sido definido.
* `symbol`: Representa un identificador único. Los símbolos se utilizan normalmente como claves para las propiedades de los objetos.
* `bigint`: Representa números enteros de precisión arbitraria.
* `any`: Representa un tipo dinámico o desconocido. Las variables de tipo `any` pueden contener valores de cualquier tipo y omiten la comprobación de tipos.
* `void`: Representa la ausencia de cualquier tipo. Se utiliza habitualmente como el tipo de retorno de las funciones que no devuelven un valor.
* `never`: Representa un tipo para valores que nunca ocurren. Se utiliza normalmente como el tipo de retorno de las funciones que lanzan un error o entran en un bucle infinito.

## Objetos JS integrados comunes

TypeScript, al ser un superconjunto de JavaScript, incluye todos los objetos integrados de JavaScript de uso común. Puedes encontrar una lista extensa de estos objetos en la documentación de Mozilla Developer Network (MDN):
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

Aquí hay una lista de algunos objetos JavaScript integrados de uso común:

* Function
* Object
* Boolean
* Error
* Number
* BigInt
* Math
* Date
* String
* RegExp
* Array
* Map
* Set
* Promise
* Intl

## Sobrecargas

Las sobrecargas de funciones en TypeScript te permiten definir múltiples firmas de función para un único nombre de función, lo que permite definir funciones que se pueden llamar de múltiples maneras. Aquí tienes un ejemplo:

```typescript
// Sobrecargas
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Implementación
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // Válido
sayHi(['aa', 'bb']); // Válido
```

Aquí tienes otro ejemplo de uso de sobrecargas de funciones dentro de una `clase`:

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // sobrecarga
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // implementación
    sayHi(name: unknown): unknown {
        if (typeof name === 'string') {
            return `${this.message}, ${name}!`;
        } else if (Array.isArray(name)) {
            return name.map(name => `${this.message}, ${name}!`);
        }
        throw new Error('value is invalid');
    }
}
console.log(new Greeter('Hello').sayHi('Simon'));
```

## Fusión y extensión

La fusión y la extensión se refieren a dos conceptos diferentes relacionados con el trabajo con tipos e interfaces.

La fusión permite combinar múltiples declaraciones del mismo nombre en una única definición, por ejemplo, cuando defines una interfaz con el mismo nombre varias veces:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

La extensión se refiere a la capacidad de extender o heredar de tipos o interfaces existentes para crear otros nuevos. Es un mecanismo para añadir propiedades o métodos adicionales a un tipo existente sin modificar su definición original. Ejemplo:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

## Diferencias entre Type e Interface

Fusión de declaraciones (aumento):

Las interfaces soportan la fusión de declaraciones, lo que significa que puedes definir múltiples interfaces con el mismo nombre y TypeScript las fusionará en una única interfaz con las propiedades y métodos combinados. Por otro lado, los tipos no soportan la fusión de declaraciones. Esto puede ser útil cuando quieres añadir funcionalidad adicional o personalizar tipos existentes sin modificar las definiciones originales o para corregir tipos faltantes o incorrectos.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

Extender otros tipos e interfaces:

Tanto los tipos como las interfaces pueden extender otros tipos/interfaces, pero la sintaxis es diferente. Con las interfaces, usas la palabra clave `extends` para heredar propiedades y métodos de otras interfaces. Sin embargo, una interfaz no puede extender un tipo complejo como un tipo de unión.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

Para los tipos, usas el operador `&` para combinar múltiples tipos en un único tipo (intersección).

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

Tipos de unión e intersección:

Los tipos son más flexibles a la hora de definir tipos de unión e intersección. Con la palabra clave `type`, puedes crear fácilmente tipos de unión usando el operador `|` y tipos de intersección usando el operador `&`. Mientras que las interfaces también pueden representar tipos de unión indirectamente, no tienen soporte nativo para los tipos de intersección.

```typescript
type Departamento = 'dep-x' | 'dep-y'; // Unión

type Persona = {
    name: string;
    age: number;
};

type Empleado = {
    id: number;
    department: Departamento;
};

type InformacionEmpleado = Persona & Empleado; // Intersección
```

Ejemplo con interfaces:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Unión de interfaces
```

## Clase

### Sintaxis común de clases

La palabra clave `class` se utiliza en TypeScript para definir una clase. A continuación, puedes ver un ejemplo:

```typescript
class Person {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public sayHi(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
```

La palabra clave `class` se usa para definir una clase llamada "Person".

La clase tiene dos propiedades privadas: `name` de tipo `string` y `age` de tipo `number`.

El constructor se define mediante la palabra clave `constructor`. Toma `name` y `age` como parámetros y los asigna a las propiedades correspondientes.

La clase tiene un método `public` llamado `sayHi` que registra un mensaje de saludo.

Para crear una instancia de una clase en TypeScript, puedes usar la palabra clave `new` seguida del nombre de la clase y paréntesis `()`. Por ejemplo:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Constructor

Los constructores son métodos especiales dentro de una clase que se utilizan para inicializar las propiedades del objeto cuando se crea una instancia de la clase.

```typescript
class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(
            `Hello, my name is ${this.name} and I'm ${this.age} years old.`
        );
    }
}

const john = new Person('Simon', 17);
john.sayHello();
```

Es posible sobrecargar un constructor usando la siguiente sintaxis:

```typescript
type Sex = 'm' | 'f';

class Person {
    name: string;
    age: number;
    sex: Sex;

    constructor(name: string, age: number, sex?: Sex);
    constructor(name: string, age: number, sex: Sex) {
        this.name = name;
        this.age = age;
        this.sex = sex ?? 'm';
    }
}

const p1 = new Person('Simon', 17);
const p2 = new Person('Alice', 22, 'f');
```

En TypeScript, es posible definir múltiples sobrecargas de constructor, pero solo puedes tener una implementación que debe ser compatible con todas las sobrecargas; esto se puede lograr mediante el uso de un parámetro opcional.

```typescript
class Person {
    name: string;
    age: number;

    constructor();
    constructor(name: string);
    constructor(name: string, age: number);
    constructor(name?: string, age?: number) {
        this.name = name ?? 'Unknown';
        this.age = age ?? 0;
    }

        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

const person1 = new Person();
person1.displayInfo(); // Name: Unknown, Age: 0

const person2 = new Person('John');
person2.displayInfo(); // Name: John, Age: 0

const person3 = new Person('Jane', 25);
person3.displayInfo(); // Name: Jane, Age: 25
```

### Constructores privados y protegidos

En TypeScript, los constructores pueden marcarse como privados o protegidos, lo que restringe su accesibilidad y uso.

**Constructores privados**:
Pueden llamarse solo dentro de la propia clase. Los constructores privados se utilizan a menudo en escenarios donde se desea imponer un patrón singleton o restringir la creación de instancias a un método de fábrica dentro de la clase.

**Constructores protegidos**:
Los constructores protegidos son útiles cuando se desea crear una clase base que no deba instanciarse directamente pero que pueda ser extendida por subclases.

```typescript
class BaseClass {
    protected constructor() {}
}

class DerivedClass extends BaseClass {
    private value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }
}

// Intentar instanciar la clase base directamente resultará en un error
// const baseObj = new BaseClass(); // Error: El constructor de la clase 'BaseClass' es protegido.

// Crear una instancia de la clase derivada
const derivedObj = new DerivedClass(10);
```

### Modificadores de acceso

Los modificadores de acceso `private`, `protected` y `public` se utilizan para controlar la visibilidad y accesibilidad de los miembros de la clase, como propiedades y métodos, en las clases de TypeScript. Estos modificadores son esenciales para imponer la encapsulación y establecer límites para acceder y modificar el estado interno de una clase.

El modificador `private` restringe el acceso al miembro de la clase solo dentro de la clase que lo contiene.

El modificador `protected` permite el acceso al miembro de la clase dentro de la clase que lo contiene y sus clases derivadas.

El modificador `public` proporciona acceso sin restricciones al miembro de la clase, permitiendo que se acceda a él desde cualquier lugar.

### Get y Set

Los *getters* y *setters* son métodos especiales que permiten definir un comportamiento personalizado de acceso y modificación para las propiedades de la clase. Permiten encapsular el estado interno de un objeto y proporcionar lógica adicional al obtener o establecer los valores de las propiedades.
En TypeScript, los *getters* y *setters* se definen utilizando las palabras clave `get` y `set` respectivamente. He aquí un ejemplo:

```typescript
class MyClass {
    private _myProperty: string;

    constructor(value: string) {
        this._myProperty = value;
    }
    get myProperty(): string {
        return this._myProperty;
    }
    set myProperty(value: string) {
        this._myProperty = value;
    }
}
```

### Auto-accesores en clases

La versión 4.9 de TypeScript añade soporte para los auto-accesores (auto-accessors), una futura característica de ECMAScript. Se parecen a las propiedades de clase pero se declaran con la palabra clave `accessor`.

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Los auto-accesores se "des-azucaran" (de-sugared) en accesores `get` y `set` privados, operando sobre una propiedad inaccesible.

<!-- skip -->
```typescript
class Animal {
    #__name: string;

    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = name;
    }

    constructor(name: string) {
        this.name = name;
    }
}
```

### this

En TypeScript, la palabra clave `this` se refiere a la instancia actual de una clase dentro de sus métodos o constructores. Te permite acceder y modificar las propiedades y métodos de la clase desde dentro de su propio ámbito.
Proporciona una forma de acceder y manipular el estado interno de un objeto dentro de sus propios métodos.

```typescript
class Person {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    public introduce(): void {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const person1 = new Person('Alice');
person1.introduce(); // Hello, my name is Alice.
```

### Propiedades de parámetro

Las propiedades de parámetro permiten declarar e inicializar las propiedades de la clase directamente dentro de los parámetros del constructor evitando el código repetitivo (boilerplate), ejemplo:

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // The "private" and "public" keywords in the constructor
        // automatically declare and initialize the corresponding class properties.
    }
    public introduce(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
const person = new Person('Alice', 25);
person.introduce();
```

### Clases abstractas

Las clases abstractas se utilizan en TypeScript principalmente para la herencia; proporcionan una forma de definir propiedades y métodos comunes que pueden ser heredados por las subclases.
Esto es útil cuando se desea definir un comportamiento común y obligar a que las subclases implementen ciertos métodos. Proporcionan una forma de crear una jerarquía de clases donde la clase base abstracta ofrece una interfaz compartida y una funcionalidad común para las subclases.

```typescript
abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract makeSound(): void;
}

class Cat extends Animal {
    makeSound(): void {
        console.log(`${this.name} meows.`);
    }
}

const cat = new Cat('Whiskers');
cat.makeSound(); // Output: Whiskers meows.
```

### Con genéricos

Las clases con genéricos permiten definir clases reutilizables que pueden funcionar con diferentes tipos.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }

    setItem(item: T): void {
        this.item = item;
    }
}

const container1 = new Container<number>(42);
console.log(container1.getItem()); //  42

const container2 = new Container<string>('Hello');
container2.setItem('World');
console.log(container2.getItem()); // World
```

### Decoradores

Los decoradores proporcionan un mecanismo para añadir metadatos, modificar el comportamiento, validar o extender la funcionalidad del elemento de destino. Son funciones que se ejecutan en tiempo de ejecución. Se pueden aplicar múltiples decoradores a una declaración.

Los decoradores son características experimentales, y los siguientes ejemplos solo son compatibles con la versión 5 de TypeScript o superior utilizando ES6.

Para las versiones de TypeScript anteriores a la 5, deben habilitarse mediante la propiedad `experimentalDecorators` en su `tsconfig.json` o utilizando `--experimentalDecorators` en su línea de comandos (pero el siguiente ejemplo no funcionará).

Algunos de los casos de uso comunes para los decoradores incluyen:

* Observar cambios en las propiedades.
* Observar llamadas a métodos.
* Añadir propiedades o métodos adicionales.
* Validación en tiempo de ejecución.
* Serialización y deserialización automática.
* Registro (*logging*).
* Autorización y autenticación.
* Protección contra errores (*error guarding*).

Nota: Los decoradores para la versión 5 no permiten decorar parámetros.

Tipos de decoradores:

#### Decoradores de clase

Los decoradores de clase son útiles para extender una clase existente, como añadir propiedades o métodos, o recopilar instancias de una clase. En el siguiente ejemplo, añadimos un método `toString` que convierte la clase en una representación de cadena.

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function toString<Class extends Constructor>(
    Value: Class,
    context: ClassDecoratorContext<Class>
) {
    return class extends Value {
        constructor(...args: any[]) {
            super(...args);
            console.log(JSON.stringify(this));
            console.log(JSON.stringify(context));
        }
    };
}

@toString
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        return 'Hello, ' + this.name;
    }
}
const person = new Person('Simon');
/* Logs:
{"name":"Simon"}
{"kind":"class","name":"Person"}
*/
```

#### Decorador de propiedad

Los decoradores de propiedad son útiles para modificar el comportamiento de una propiedad, como cambiar los valores de inicialización. En el siguiente código, tenemos un script que establece que una propiedad esté siempre en mayúsculas:

```typescript
function upperCase<T>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, string>
) {
    return function (this: T, value: string) {
        return value.toUpperCase();
    };
}

class MyClass {
    @upperCase
    prop1 = 'hello!';
}

console.log(new MyClass().prop1); // Logs: HELLO!
```

#### Decorador de método

Los decoradores de método permiten cambiar o mejorar el comportamiento de los métodos. A continuación se muestra un ejemplo de un registrador (*logger*) simple:

```typescript
function log<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
        This,
        (this: This, ...args: Args) => Return
    >
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`);
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`);
        return result;
    }

    return replacementMethod;
}

class MyClass {
    @log
    sayHello() {
        console.log('Hello!');
    }
}

new MyClass().sayHello();
```

Registra:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Decoradores de Getter y Setter

Los decoradores de *getter* y *setter* permiten cambiar o mejorar el comportamiento de los accesores de clase. Son útiles, por ejemplo, para validar las asignaciones de propiedades. He aquí un ejemplo sencillo de un decorador de *getter*:

```typescript
function range<This, Return extends number>(min: number, max: number) {
    return function (
        target: (this: This) => Return,
        context: ClassGetterDecoratorContext<This, Return>
    ) {
        return function (this: This): Return {
            const value = target.call(this);
            if (value < min || value > max) {
                throw 'Invalid';
            }
            Object.defineProperty(this, context.name, {
                value,
                enumerable: true,
            });
            return value;
        };
    };
}

class MyClass {
    private _value = 0;

    constructor(value: number) {
        this._value = value;
    }
    @range(1, 100)
    get getValue(): number {
        return this._value;
    }
}

const obj = new MyClass(10);
console.log(obj.getValue); // Valid: 10

const obj2 = new MyClass(999);
console.log(obj2.getValue); // Throw: Invalid!
```

#### Metadatos de decorador

Decorator Metadata simplifica el proceso para que los decoradores apliquen y utilicen metadatos en cualquier clase. Pueden acceder a una nueva propiedad de metadatos en el objeto de contexto, que puede servir como clave tanto para primitivos como para objetos.
Se puede acceder a la información de los metadatos en la clase a través de `Symbol.metadata`.

Los metadatos pueden utilizarse para diversos fines, como la depuración, la serialización o la inyección de dependencias con decoradores.

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Simple polify

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // Context contains property metadata: DecoratorMetadata

function setMetadata(_target: any, context: Context) {
    // Set the metadata object with a primitive value
    context.metadata[context.name] = true;
}

class MyClass {
    @setMetadata
    a = 123;

    @setMetadata
    accessor b = 'b';

    @setMetadata
    fn() {}
}

const metadata = MyClass[Symbol.metadata]; // Get metadata information

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```


### Propiedades de parámetro

Las propiedades de parámetro permiten declarar e inicializar las propiedades de la clase directamente dentro de los parámetros del constructor evitando el código repetitivo (boilerplate), ejemplo:

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // Las palabras clave "private" y "public" en el constructor
        // declaran e inicializan automáticamente las propiedades de clase correspondientes.
    }
    public introduce(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
const person = new Person('Alice', 25);
person.introduce();
```

### Clases abstractas

Las clases abstractas se utilizan en TypeScript principalmente para la herencia; proporcionan una forma de definir propiedades y métodos comunes que pueden ser heredados por las subclases.
Esto es útil cuando se desea definir un comportamiento común y obligar a que las subclases implementen ciertos métodos. Proporcionan una forma de crear una jerarquía de clases donde la clase base abstracta ofrece una interfaz compartida y una funcionalidad común para las subclases.

```typescript
abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract makeSound(): void;
}

class Cat extends Animal {
    makeSound(): void {
        console.log(`${this.name} meows.`);
    }
}

const cat = new Cat('Whiskers');
cat.makeSound(); // Output: Whiskers meows.
```

### Con genéricos

Las clases con genéricos permiten definir clases reutilizables que pueden trabajar con diferentes tipos.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }

    setItem(item: T): void {
        this.item = item;
    }
}

const container1 = new Container<number>(42);
console.log(container1.getItem()); //  42

const container2 = new Container<string>('Hello');
container2.setItem('World');
console.log(container2.getItem()); // World
```

### Decoradores

Los decoradores proporcionan un mecanismo para añadir metadatos, modificar el comportamiento, validar o extender la funcionalidad del elemento de destino. Son funciones que se ejecutan en tiempo de ejecución. Se pueden aplicar múltiples decoradores a una declaración.

Los decoradores son características experimentales, y los siguientes ejemplos solo son compatibles con la versión 5 de TypeScript o superior usando ES6.

Para versiones de TypeScript anteriores a la 5, deben habilitarse usando la propiedad `experimentalDecorators` en tu `tsconfig.json` o usando `--experimentalDecorators` en tu línea de comandos (pero el siguiente ejemplo no funcionará).

Algunos de los casos de uso comunes para los decoradores incluyen:

* Observar cambios en las propiedades.
* Observar llamadas a métodos.
* Añadir propiedades o métodos adicionales.
* Validación en tiempo de ejecución.
* Serialización y deserialización automática.
* Registro (Logging).
* Autorización y autenticación.
* Protección contra errores.

Nota: Los decoradores para la versión 5 no permiten decorar parámetros.

Tipos de decoradores:

#### Decoradores de clase

Los decoradores de clase son útiles para extender una clase existente, como añadir propiedades o métodos, o recopilar instancias de una clase. En el siguiente ejemplo, añadimos un método `toString` que convierte la clase en una representación de cadena.

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function toString<Class extends Constructor>(
    Value: Class,
    context: ClassDecoratorContext<Class>
) {
    return class extends Value {
        constructor(...args: any[]) {
            super(...args);
            console.log(JSON.stringify(this));
            console.log(JSON.stringify(context));
        }
    };
}

@toString
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        return 'Hello, ' + this.name;
    }
}
const person = new Person('Simon');
/* Logs:
{"name":"Simon"}
{"kind":"class","name":"Person"}
*/
```

#### Decorador de propiedad

Los decoradores de propiedad son útiles para modificar el comportamiento de una propiedad, como cambiar los valores de inicialización. En el siguiente código, tenemos un script que establece una propiedad para que esté siempre en mayúsculas:

```typescript
function upperCase<T>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, string>
) {
    return function (this: T, value: string) {
        return value.toUpperCase();
    };
}

class MyClass {
    @upperCase
    prop1 = 'hello!';
}

console.log(new MyClass().prop1); // Logs: HELLO!
```

#### Decorador de método

Los decoradores de método permiten cambiar o mejorar el comportamiento de los métodos. A continuación se muestra un ejemplo de un registrador (logger) simple:

```typescript
function log<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
        This,
        (this: This, ...args: Args) => Return
    >
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`);
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`);
        return result;
    }

    return replacementMethod;
}

class MyClass {
    @log
    sayHello() {
        console.log('Hello!');
    }
}

new MyClass().sayHello();
```

Esto registra:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Decoradores de Getter y Setter

Los decoradores de getter y setter permiten cambiar o mejorar el comportamiento de los accesores de clase. Son útiles, por ejemplo, para validar las asignaciones de propiedades. Aquí tienes un ejemplo sencillo para un decorador de getter:

```typescript
function range<This, Return extends number>(min: number, max: number) {
    return function (
        target: (this: This) => Return,
        context: ClassGetterDecoratorContext<This, Return>
    ) {
        return function (this: This): Return {
            const value = target.call(this);
            if (value < min || value > max) {
                throw 'Invalid';
            }
            Object.defineProperty(this, context.name, {
                value,
                enumerable: true,
            });
            return value;
        };
    };
}

class MyClass {
    private _value = 0;

    constructor(value: number) {
        this._value = value;
    }
    @range(1, 100)
    get getValue(): number {
        return this._value;
    }
}

const obj = new MyClass(10);
console.log(obj.getValue); // Valid: 10

const obj2 = new MyClass(999);
console.log(obj2.getValue); // Throw: Invalid!
```

#### Metadatos de decorador

Los metadatos de decorador (Decorator Metadata) simplifican el proceso para que los decoradores apliquen y utilicen metadatos en cualquier clase. Pueden acceder a una nueva propiedad de metadatos en el objeto de contexto, que puede servir como clave tanto para primitivos como para objetos.
Se puede acceder a la información de metadatos en la clase a través de `Symbol.metadata`.

Los metadatos se pueden utilizar para diversos fines, como la depuración, la serialización o la inyección de dependencias con decoradores.

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Simple polify

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // Context contiene propiedad metadata: DecoratorMetadata

function setMetadata(_target: any, context: Context) {
    // Establecer el objeto de metadatos con un valor primitivo
    context.metadata[context.name] = true;
}

class MyClass {
    @setMetadata
    a = 123;

    @setMetadata
    accessor b = 'b';

    @setMetadata
    fn() {}
}

const metadata = MyClass[Symbol.metadata]; // Obtener información de metadatos

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```

### Herencia

La herencia se refiere al mecanismo por el cual una clase puede heredar propiedades y métodos de otra clase, conocida como clase base o superclase. La clase derivada, también llamada clase hija o subclase, puede extender y especializar la funcionalidad de la clase base añadiendo nuevas propiedades y métodos o sobrescribiendo los existentes.

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak(): void {
        console.log('The animal makes a sound');
    }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }

    speak(): void {
        console.log('Woof! Woof!');
    }
}

// Crear una instancia de la clase base
const animal = new Animal('Generic Animal');
animal.speak(); // The animal makes a sound

// Crear una instancia de la clase derivada
const dog = new Dog('Max', 'Labrador');
dog.speak(); // Woof! Woof!"
```

TypeScript no soporta la herencia múltiple en el sentido tradicional y en su lugar permite la herencia de una única clase base.
TypeScript soporta múltiples interfaces. Una interfaz puede definir un contrato para la estructura de un objeto, y una clase puede implementar múltiples interfaces. Esto permite que una clase herede comportamiento y estructura de múltiples fuentes.

```typescript
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class FlyingFish implements Flyable, Swimmable {
    fly() {
        console.log('Flying...');
    }

    swim() {
        console.log('Swimming...');
    }
}

const flyingFish = new FlyingFish();
flyingFish.fly();
flyingFish.swim();
```

La palabra clave `class` en TypeScript, al igual que en JavaScript, se suele denominar azúcar sintáctico. Se introdujo en ECMAScript 2015 (ES6) para ofrecer una sintaxis más familiar para crear y trabajar con objetos de una manera basada en clases. Sin embargo, es importante señalar que TypeScript, al ser un superconjunto de JavaScript, finalmente se compila a JavaScript, que sigue siendo basado en prototipos en su núcleo.

### Estáticos

TypeScript tiene miembros estáticos. Para acceder a los miembros estáticos de una clase, puedes usar el nombre de la clase seguido de un punto, sin necesidad de crear un objeto.

```typescript
class OfficeWorker {
    static memberCount: number = 0;

    constructor(private name: string) {
        OfficeWorker.memberCount++;
    }
}

const w1 = new OfficeWorker('James');
const w2 = new OfficeWorker('Simon');
const total = OfficeWorker.memberCount;
console.log(total); // 2
```

### Inicialización de propiedades

Hay varias formas de inicializar las propiedades de una clase en TypeScript:

En línea (Inline):

En el siguiente ejemplo, estos valores iniciales se utilizarán cuando se cree una instancia de la clase.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

En el constructor:

```typescript
class MyClass {
    property1: string;
    property2: number;

    constructor() {
        this.property1 = 'default value';
        this.property2 = 42;
    }
}
```

Uso de parámetros del constructor:

```typescript
class MyClass {
    constructor(
        private property1: string = 'default value',
        public property2: number = 42
    ) {
        // No hay necesidad de asignar los valores a las propiedades explícitamente.
    }
    log() {
        console.log(this.property2);
    }
}
const x = new MyClass();
x.log();
```

### Sobrecarga de métodos

La sobrecarga de métodos permite que una clase tenga múltiples métodos con el mismo nombre pero con diferentes tipos de parámetros o un número diferente de parámetros. Esto nos permite llamar a un método de diferentes maneras basándonos en los argumentos pasados.

```typescript
class MyClass {
    add(a: number, b: number): number; // Firma de sobrecarga 1
    add(a: string, b: string): string; // Firma de sobrecarga 2

    add(a: number | string, b: number | string): number | string {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }
        throw new Error('Invalid arguments');
    }
}

const r = new MyClass();
console.log(r.add(10, 5)); // Logs 15
```

## Genéricos

Los genéricos te permiten crear componentes y funciones reutilizables que pueden trabajar con múltiples tipos. Con los genéricos, puedes parametrizar tipos, funciones e interfaces, permitiéndoles operar sobre diferentes tipos sin especificarlos explícitamente de antemano.

Los genéricos permiten que el código sea más flexible y reutilizable.

### Tipo genérico

Para definir un tipo genérico, utilizas ángulos (`<>`) para especificar los parámetros de tipo, por ejemplo:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Clases genéricas

Los genéricos también se pueden aplicar a las clases; de esta manera, pueden trabajar con múltiples tipos mediante el uso de parámetros de tipo. Esto es útil para crear definiciones de clases reutilizables que pueden operar sobre diferentes tipos de datos manteniendo la seguridad de tipos.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### Restricciones genéricas

Los parámetros genéricos pueden restringirse utilizando la palabra clave `extends` seguida de un tipo o interfaz que el parámetro de tipo debe cumplir.

En el siguiente ejemplo, `T` debe contener la propiedad `length` para ser válido:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Inválido
```

Una característica interesante de los genéricos introducida en la versión 3.4 RC es la inferencia de tipos de funciones de orden superior, que introdujo los argumentos de tipo genérico propagados:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

Esta funcionalidad permite una programación de estilo "point-free" tipada de forma segura más sencilla, algo común en la programación funcional.

### Estrechamiento contextual genérico

El estrechamiento contextual para genéricos es el mecanismo en TypeScript que permite al compilador estrechar (narrow down) el tipo de un parámetro genérico basándose en el contexto en el que se utiliza; es útil cuando se trabaja con tipos genéricos en sentencias condicionales:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value se estrecha al tipo 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value se estrecha al tipo 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

## Tipos estructurales borrados (Erased Structural Types)

En TypeScript, los objetos no tienen que coincidir con un tipo específico y exacto. Por ejemplo, si creamos un objeto que cumple con los requisitos de una interfaz, podemos utilizar ese objeto en lugares donde se requiere esa interfaz, incluso si no hubo una conexión explícita entre ellos.
Ejemplo:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Válido
```

## Namespacing

En TypeScript, los espacios de nombres (namespaces) se utilizan para organizar el código en contenedores lógicos, evitando colisiones de nombres y proporcionando una forma de agrupar código relacionado.
El uso de las palabras clave `export` permite el acceso al espacio de nombres en módulos "externos".

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

## Símbolos

Los símbolos son un tipo de datos primitivo que representa un valor inmutable que se garantiza que es globalmente único durante la vida del programa.

Los símbolos se pueden utilizar como claves para las propiedades de los objetos y proporcionan una forma de crear propiedades no enumerables (non-enumerable).

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

En WeakMaps y WeakSets, ahora se permiten los símbolos como claves.

## Directivas de triple barra

Las directivas de triple barra son comentarios especiales que proporcionan instrucciones al compilador sobre cómo procesar un archivo. Estas directivas comienzan con tres barras consecutivas (`///`) y normalmente se colocan en la parte superior de un archivo TypeScript y no tienen efectos en el comportamiento en tiempo de ejecución.

Las directivas de triple barra se utilizan para referenciar dependencias externas, especificar el comportamiento de carga de módulos, habilitar/deshabilitar ciertas características del compilador, y más. Algunos ejemplos:

Referenciar un archivo de declaración:

<!-- skip -->
```typescript
/// <reference path="ruta/al/archivo/de/declaracion.d.ts" />
```

Indicar el formato del módulo:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Habilitar opciones del compilador, en el siguiente ejemplo el modo estricto:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

## Manipulación de tipos

### Creación de tipos a partir de tipos

Es posible crear nuevos tipos componiendo, manipulando o transformando tipos existentes.

Tipos de intersección (`&`):

Te permiten combinar múltiples tipos en un único tipo:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersección de A y B
const obj: C = { foo: 42, bar: 'hello' };
```

Tipos de unión (`|`):

Te permiten definir un tipo que puede ser uno de varios tipos:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

Tipos mapeados:

Te permiten transformar las propiedades de un tipo existente para crear un nuevo tipo:

```typescript
type Mutable<T> = {
    readonly [P in keyof T]: T[P];
};
type Person = {
    name: string;
    age: number;
};
type ImmutablePerson = Mutable<Person>; // Las propiedades pasan a ser de solo lectura
```

Tipos condicionales:

Te permiten crear tipos basados en algunas condiciones:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### Tipos de acceso indexado

En TypeScript es posible acceder y manipular los tipos de propiedades dentro de otro tipo usando un índice, `Tipo[Clave]`.

```typescript
type Person = {
    name: string;
    age: number;
};

type AgeType = Person['age']; // number
```

```typescript
type MyTuple = [string, number, boolean];
type MyType = MyTuple[2]; // boolean
```

### Tipos de utilidad

Se pueden utilizar varios tipos de utilidad integrados para manipular tipos; a continuación se muestra una lista de los más utilizados:

#### Awaited\<T\>

Construye un tipo que desenvuelve (unwraps) recursivamente los tipos `Promise`.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

Construye un tipo con todas las propiedades de `T` establecidas como opcionales.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

Construye un tipo con todas las propiedades de `T` establecidas como requeridas.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

Construye un tipo con todas las propiedades de `T` establecidas como de solo lectura (readonly).

<!-- skip -->
```typescript
type Person = {
    name: string;
    age: number;
};

type A = Readonly<Person>;

const a: A = { name: 'Simon', age: 17 };
a.name = 'John'; // Inválido
```

#### Record\<K, T\>

Construye un tipo con un conjunto de propiedades `K` de tipo `T`.

```typescript
type Product = {
    name: string;
    price: number;
};

const products: Record<string, Product> = {
    apple: { name: 'Apple', price: 0.5 },
    banana: { name: 'Banana', price: 0.25 },
};

console.log(products.apple); // { name: 'Apple', price: 0.5 }
```

#### Pick\<T, K\>

Construye un tipo seleccionando las propiedades especificadas `K` de `T`.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

Construye un tipo omitiendo las propiedades especificadas `K` de `T`.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

Construye un tipo excluyendo todos los valores de tipo `U` de `T`.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

Construye un tipo extrayendo todos los valores de tipo `U` de `T`.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

Construye un tipo excluyendo `null` y `undefined` de `T`.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

Extrae los tipos de los parámetros de un tipo de función `T`.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

Extrae los tipos de los parámetros de un tipo de función constructora `T`.

```typescript
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}
type PersonConstructorParams = ConstructorParameters<typeof Person>; // [name: string, age: number]
const params: PersonConstructorParams = ['John', 30];
const person = new Person(...params);
console.log(person); // Person { name: 'John', age: 30 }
```

#### ReturnType\<T\>

Extrae el tipo de retorno de un tipo de función `T`.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

Extrae el tipo de instancia de un tipo de clase `T`.

```typescript
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}!`);
    }
}

type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person('John');

person.sayHello(); // Hello, my name is John!
```

#### ThisParameterType\<T\>

Extrae el tipo del parámetro `this` de un tipo de función `T`.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

Elimina el parámetro `this` de un tipo de función `T`.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

Sirve como marcador para un tipo `this` contextual.

<!-- skip -->
```typescript
type Logger = {
    log: (error: string) => void;
};

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
    hello: function () {
        this.log('some error'); // Válido ya que "log" es parte de "this".
        this.update(); // Inválido
    },
};
```

#### Uppercase\<T\>

Convierte a mayúsculas el nombre del tipo de entrada `T`.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

Convierte a minúsculas el nombre del tipo de entrada `T`.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

Convierte en mayúscula la inicial del nombre del tipo de entrada `T`.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

Convierte en minúscula la inicial del nombre del tipo de entrada `T`.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

`NoInfer` es un tipo de utilidad diseñado para bloquear la inferencia automática de tipos dentro del ámbito de una función genérica.

Ejemplo:

```typescript
// Inferencia automática de tipos dentro del ámbito de una función genérica.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // El tipo aquí es ("a" | "b" | "c")[]
```

Con NoInfer:

<!-- skip -->
```typescript
// Ejemplo de función que usa NoInfer para evitar la inferencia de tipos
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Error: El argumento de tipo de tipo '"c"' no es asignable al parámetro de tipo '"a" | "b"'.
```

## Otros

### Manejo de errores y excepciones

TypeScript permite capturar y manejar errores utilizando los mecanismos estándar de manejo de errores de JavaScript:

Bloques Try-Catch-Finally:

```typescript
try {
    // Código que podría lanzar un error
} catch (error) {
    // Manejar el error
} finally {
    // Código que siempre se ejecuta, finally es opcional
}
```

También puedes manejar diferentes tipos de errores:

```typescript
try {
    // Código que podría lanzar diferentes tipos de errores
} catch (error) {
    if (error instanceof TypeError) {
        // Manejar TypeError
    } else if (error instanceof RangeError) {
        // Manejar RangeError
    } else {
        // Manejar otros errores
    }
}
```

Tipos de error personalizados:

Es posible especificar errores más concretos extendiendo la `clase` Error:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Clases Mixin

Las clases Mixin te permiten combinar y componer el comportamiento de múltiples clases en una sola clase. Proporcionan una forma de reutilizar y extender la funcionalidad sin necesidad de cadenas de herencia profundas.

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Extender MyClass para incluir el comportamiento de Identifiable y Selectable
interface MyClass extends Identifiable, Selectable {}

// Función para aplicar mixins a una clase
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Aplicar los mixins a MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Características de lenguaje asíncronas

La programación asíncrona está bien soportada en TypeScript utilizando las palabras clave `async` y `await`. Estas palabras clave proporcionan una forma más legible y limpia de trabajar con operaciones asíncronas.

La palabra clave `async` se utiliza para definir una función que devuelve una `Promise`. La palabra clave `await` se utiliza dentro de una función `async` para pausar su ejecución hasta que una `Promise` se resuelva o se rechace.

Para saber más:
[https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await)

Las siguientes API están bien soportadas en TypeScript:

Fetch API:
[https://developer.mozilla.org/es/docs/Web/API/Fetch_API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/es/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/es/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/es/docs/Web/API/SharedWorker](https://developer.mozilla.org/es/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/es/docs/Web/API/WebSockets_API](https://developer.mozilla.org/es/docs/Web/API/WebSockets_API)

### Iteradores y Generadores

Tanto los iteradores como los generadores están bien soportados en TypeScript.

Los iteradores son objetos que implementan el protocolo de iterador, proporcionando una forma de acceder a los elementos de una colección o secuencia uno a uno. Es una estructura que contiene un puntero al siguiente elemento de la iteración. Tienen un método `next()` que devuelve el siguiente valor de la secuencia junto con un booleano que indica si la secuencia ha terminado (`done`).

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const it = new NumberIterator(1, 5);
for (const x of it) {
    console.log(x); // 1, 2, 3, 4, 5
}
```

Los generadores son funciones que pueden pausarse y reanudarse utilizando la palabra clave `yield`. Se definen mediante la sintaxis `function*` y devuelven un iterador.

```typescript
function* count() {
    yield 1;
    yield 2;
    yield 3;
}

const g = count();
console.log(g.next().value); // 1
console.log(g.next().value); // 2
console.log(g.next().value); // 3
```

Los generadores facilitan la creación de iteradores y son especialmente útiles para trabajar con secuencias grandes o infinitas.

Ejemplo:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript también soporta iteradores asíncronos y generadores asíncronos.

Para saber más:

[https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Iterator)
