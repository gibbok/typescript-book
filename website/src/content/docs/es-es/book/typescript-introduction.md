---
title: Introducción a TypeScript
sidebar:
  order: 10
  label: 10. Introducción a TypeScript
---


### ¿Qué es TypeScript?

TypeScript es un lenguaje de programación con tipado fuerte que se basa en JavaScript. Anders Hejlsberg lo diseñó originalmente en 2012 y Microsoft lo desarrolla y mantiene actualmente como proyecto de código abierto.

TypeScript se compila en JavaScript y puede ejecutarse en cualquier entorno de ejecución de JavaScript (por ejemplo, un navegador o Node.js en un servidor).

Admite varios paradigmas de programación, como la programación funcional, genérica, imperativa y orientada a objetos, y es un lenguaje compilado (transpilado) que se convierte a JavaScript antes de su ejecución.

### ¿Por qué TypeScript?

TypeScript es un lenguaje con tipado fuerte que ayuda a prevenir errores habituales de programación y a evitar determinados tipos de errores en tiempo de ejecución antes de ejecutar el programa.

Un lenguaje con tipado fuerte permite al desarrollador especificar distintas restricciones y comportamientos del programa en las definiciones de tipos de datos, lo que facilita verificar que el software sea correcto y prevenir defectos. Esto resulta especialmente útil en aplicaciones a gran escala.

Algunas de las ventajas de TypeScript:

* Tipado estático, opcionalmente con tipado fuerte
* Inferencia de tipos
* Acceso a las características de ES6 y ES7
* Compatibilidad multiplataforma y entre navegadores
* Compatibilidad de herramientas con IntelliSense

### TypeScript y JavaScript

TypeScript se escribe en archivos `.ts` o `.tsx`, mientras que JavaScript se escribe en archivos `.js` o `.jsx`.

Los archivos con la extensión `.tsx` o `.jsx` pueden contener la extensión de sintaxis JSX de JavaScript, que se utiliza en React para desarrollar interfaces de usuario.

En cuanto a la sintaxis, TypeScript es un superconjunto tipado de JavaScript (ECMAScript 2015). Todo código JavaScript es código TypeScript válido, pero lo contrario no siempre es cierto.

Por ejemplo, considera una función en un archivo JavaScript con la extensión `.js`, como la siguiente:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

La función puede convertirse y utilizarse en TypeScript cambiando la extensión del archivo a `.ts`. Sin embargo, si la misma función se anota con tipos de TypeScript, no puede ejecutarse en ningún entorno de ejecución de JavaScript sin compilarla. El siguiente código TypeScript producirá un error de sintaxis si no se compila:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript se diseñó para detectar posibles errores en tiempo de ejecución durante la compilación, ya que permite a los desarrolladores expresar su intención mediante anotaciones de tipo. Además, gracias a la inferencia de tipos, TypeScript también puede detectar determinados problemas aunque no se proporcionen anotaciones de tipo explícitas. Por ejemplo, el siguiente fragmento de código no especifica ningún tipo de TypeScript:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

En este caso, TypeScript detecta un error e informa de lo siguiente:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

El sistema de tipos de TypeScript está influido en gran medida por el comportamiento de JavaScript en tiempo de ejecución. Por ejemplo, el operador de suma (+), que en JavaScript puede realizar tanto una concatenación de cadenas como una suma numérica, se modela del mismo modo en TypeScript:

```typescript
const result = '1' + 1; // Result is of type string
```

El equipo responsable de TypeScript tomó la decisión deliberada de señalar como errores los usos inusuales de JavaScript. Por ejemplo, considera el siguiente código JavaScript válido:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

Sin embargo, TypeScript genera un error:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Este error se produce porque TypeScript aplica estrictamente la compatibilidad de tipos y, en este caso, identifica una operación no válida entre un número y un booleano.

### Generación de código de TypeScript

El compilador de TypeScript tiene dos responsabilidades principales: comprobar si hay errores de tipos y compilar en JavaScript. Estos dos procesos son independientes entre sí. Los tipos no afectan a la ejecución del código en un entorno de ejecución de JavaScript, ya que se eliminan por completo durante la compilación. TypeScript puede generar JavaScript incluso cuando existen errores de tipos.
Este es un ejemplo de código TypeScript con un error de tipos:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Sin embargo, aún puede producir una salida de JavaScript ejecutable:

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

Como los tipos se eliminan después de la compilación, no hay forma de ejecutar este código en JavaScript. Para reconocer tipos en tiempo de ejecución, debemos utilizar otro mecanismo. TypeScript ofrece varias opciones; una de las más habituales es la «unión etiquetada». Por ejemplo:

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

La propiedad "kind" es un valor que puede utilizarse en tiempo de ejecución para distinguir objetos en JavaScript.

También es posible que un valor tenga en tiempo de ejecución un tipo distinto del declarado en la declaración de tipo. Por ejemplo, si el desarrollador ha interpretado incorrectamente el tipo de una API y lo ha anotado de forma errónea.

TypeScript es un superconjunto de JavaScript, por lo que la palabra clave "class" puede utilizarse como tipo y como valor en tiempo de ejecución.

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

En JavaScript, una "class" tiene una propiedad "prototype", y el operador "instanceof" puede utilizarse para comprobar si la propiedad prototype de un constructor aparece en algún punto de la cadena de prototipos de un objeto.

TypeScript no afecta al rendimiento en tiempo de ejecución, ya que todos los tipos se eliminan. Sin embargo, TypeScript sí añade cierta sobrecarga al tiempo de compilación.

### JavaScript moderno ahora (reducción de nivel)

TypeScript puede compilar código para cualquier versión publicada de JavaScript desde ECMAScript 3 (1999). Esto significa que TypeScript puede transpilar código que utiliza las características más recientes de JavaScript a versiones anteriores, un proceso conocido como reducción de nivel. Esto permite utilizar JavaScript moderno y mantener a la vez la máxima compatibilidad con entornos de ejecución antiguos.

Es importante tener en cuenta que, al transpilar a una versión anterior de JavaScript, TypeScript puede generar código que suponga una sobrecarga de rendimiento en comparación con las implementaciones nativas.

Estas son algunas de las características modernas de JavaScript que pueden utilizarse en TypeScript:

* Módulos de ECMAScript en lugar de callbacks "define" al estilo de AMD o sentencias "require" de CommonJS.
* Clases en lugar de prototipos.
* Declaración de variables mediante "let" o "const" en lugar de "var".
* Bucle "for-of" o ".forEach" en lugar del bucle "for" tradicional.
* Funciones flecha en lugar de expresiones de función.
* Asignación mediante desestructuración.
* Nombres abreviados de propiedades o métodos y nombres de propiedades calculados.
* Parámetros de función predeterminados.

Al aprovechar estas características modernas de JavaScript, los desarrolladores pueden escribir código TypeScript más expresivo y conciso.

