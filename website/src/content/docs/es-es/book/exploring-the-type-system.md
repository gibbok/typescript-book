---
title: Exploración del sistema de tipos
sidebar:
  order: 9
  label: 9. Exploración del sistema de tipos
---


### El servicio del lenguaje de TypeScript

El servicio del lenguaje de TypeScript, también conocido como tsserver, ofrece distintas funciones, como informes de errores, diagnósticos, compilación al guardar, cambio de nombre, navegación a la definición, listas de finalización, ayuda de firmas y muchas más. Lo utilizan principalmente los entornos de desarrollo integrados (IDE) para ofrecer compatibilidad con IntelliSense. Se integra a la perfección con Visual Studio Code y lo emplean herramientas como Conquer of Completion (Coc).

Los desarrolladores pueden aprovechar una API específica y crear sus propios complementos personalizados para el servicio del lenguaje con el fin de mejorar la experiencia de edición de TypeScript. Esto puede ser especialmente útil para implementar funciones específicas de linting o activar la finalización automática para un lenguaje de plantillas personalizado.

<!-- markdownlint-disable MD044 -->
Un ejemplo real de complemento personalizado es "typescript-styled-plugin", que ofrece informes de errores de sintaxis y compatibilidad con IntelliSense para propiedades CSS en componentes con estilo.
<!-- markdownlint-enable MD044 -->

Para obtener más información y consultar guías de inicio rápido, puedes acudir a la wiki oficial de TypeScript en GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Tipado estructural

TypeScript se basa en un sistema de tipos estructural. Esto significa que la compatibilidad y la equivalencia de los tipos se determinan por su estructura o definición real, y no por su nombre o lugar de declaración, como ocurre en sistemas de tipos nominales como C# o C.

El sistema de tipos estructural de TypeScript se diseñó a partir del funcionamiento en tiempo de ejecución del sistema dinámico de tipado pato de JavaScript.

El siguiente ejemplo es código TypeScript válido. Como puedes observar, "X" e "Y" tienen el mismo miembro "a", aunque sus declaraciones tengan nombres distintos. Los tipos vienen determinados por sus estructuras y, en este caso, como las estructuras son iguales, son compatibles y válidos.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### Reglas fundamentales de comparación de TypeScript

El proceso de comparación de TypeScript es recursivo y se ejecuta sobre tipos anidados a cualquier nivel.

Un tipo "X" es compatible con "Y" si "Y" tiene, como mínimo, los mismos miembros que "X".

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Los parámetros de las funciones se comparan por sus tipos, no por sus nombres:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Los tipos de retorno de las funciones deben ser iguales:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

El tipo de retorno de una función de origen debe ser un subtipo del tipo de retorno de una función de destino:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

Se permite descartar parámetros de funciones, ya que es una práctica habitual en JavaScript, por ejemplo al utilizar "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Por tanto, las siguientes declaraciones de tipos son totalmente válidas:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Cualquier parámetro opcional adicional del tipo de origen es válido:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Los parámetros opcionales del tipo de destino que no tengan parámetros correspondientes en el tipo de origen son válidos y no constituyen un error:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

El parámetro rest se trata como una serie infinita de parámetros opcionales:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Las funciones con sobrecargas son válidas si la firma de sobrecarga es compatible con su firma de implementación:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

La comparación de parámetros de funciones tiene éxito si los parámetros de origen y destino pueden asignarse a supertipos o subtipos (bivarianza).

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

Los enums pueden compararse con números y asignarse a ellos, y viceversa, pero no es válido comparar valores de enums de tipos distintos.

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

Las instancias de una clase se someten a una comprobación de compatibilidad de sus miembros privados y protegidos:

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Invalid
```

La comprobación de compatibilidad no tiene en cuenta las distintas jerarquías de herencia. Por ejemplo:

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

Los genéricos se comparan mediante sus estructuras según el tipo resultante tras aplicar el parámetro genérico; únicamente se compara el resultado final como tipo no genérico.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

Cuando no se especifica el argumento de tipo de los genéricos, todos los argumentos sin especificar se tratan como tipos "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Recuerda:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

Ten en cuenta que, cuando "strictNullChecks" está activado, "null" y "undefined" se tratan de forma similar a "void"; de lo contrario, se comportan de forma parecida a "never".

### Los tipos como conjuntos

En TypeScript, un tipo es un conjunto de valores posibles. Este conjunto también se denomina dominio del tipo. Cada valor de un tipo puede considerarse un elemento de un conjunto. Un tipo establece las restricciones que debe satisfacer cada elemento para considerarse miembro del conjunto.
La tarea principal de TypeScript consiste en comprobar y verificar si un conjunto es subconjunto de otro.

TypeScript admite distintos tipos de conjuntos:

| Término de conjuntos | TypeScript                      | Notas                                                                                                              |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Conjunto vacío          | never                           | "never" no contiene nada aparte de sí mismo                                                                         |
| Conjunto de un elemento | undefined / null / tipo literal |                                                                                                                    |
| Conjunto finito         | boolean / unión                 |                                                                                                                    |
| Conjunto infinito       | string / number / object        |                                                                                                                    |
| Conjunto universal      | any / unknown                   | Todo elemento pertenece a "any" y todo conjunto es subconjunto suyo / "unknown" es la alternativa segura de "any" |

Estos son algunos ejemplos:

| TypeScript            | Término de conjuntos   | Ejemplo                                                                         |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (conjunto vacío)     | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                        |
| Tipo literal          | Conjunto de un elemento | type X = 'X';                                                                  |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| Valor asignable a T   | Valor ∈ T (pertenece a) | type XY = 'X' \| 'Y';                                                          |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T1 asignable a T2     | T1 ⊆ T2 (subconjunto de) | type XY = 'X' \| 'Y';                                                         |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (subconjunto de) | type X = 'X' extends string ? true : false;                                    |
|                       |                        |
| T1 \| T2              | T1 ∪ T2 (unión)        | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2 (intersección) | type X = \{ a: string \}                                                        |
|                       |                        | type Y = \{ b: string \}                                                          |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | Conjunto universal     | const x: unknown = 1                                                            |

Una unión, (T1 | T2), crea un conjunto más amplio (ambos):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

Una intersección, (T1 & T2), crea un conjunto más restringido (solo lo compartido):

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

En este contexto, la palabra clave `extends` puede entenderse como «subconjunto de». Establece una restricción para un tipo. Cuando `extends` se utiliza con un genérico, restringe el parámetro de tipo genérico a un tipo más específico.

Ten en cuenta que aquí `extends` no tiene relación con la herencia de clases en el sentido de la programación orientada a objetos.

TypeScript trabaja con tipos estructurales y no posee una jerarquía nominal estricta. De hecho, como muestra el siguiente ejemplo, dos tipos pueden solaparse sin que ninguno sea subtipo del otro, porque TypeScript tiene en cuenta la estructura o forma de los objetos.

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valid
```

### Asignar un tipo: declaraciones y aserciones de tipo

En TypeScript se puede asignar un tipo de distintas formas:

#### Declaración de tipo

En el siguiente ejemplo utilizamos x: X (": Type") para declarar un tipo para la variable x.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

Si la variable no tiene el formato especificado, TypeScript notificará un error. Por ejemplo:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Error: Object literal may only specify known properties
};
```

#### Aserción de tipo

Es posible añadir una aserción mediante la palabra clave `as`. Esto indica al compilador que el desarrollador dispone de más información sobre un tipo y silencia los posibles errores.

Por ejemplo:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

En el ejemplo anterior se afirma mediante la palabra clave as que el objeto x tiene el tipo X. Esto informa al compilador de TypeScript de que el objeto se ajusta al tipo especificado, aunque tenga una propiedad adicional b que no aparece en la definición del tipo.

Las aserciones de tipo resultan útiles cuando es necesario especificar un tipo más concreto, especialmente al trabajar con el DOM. Por ejemplo:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Aquí, la aserción de tipo as HTMLInputElement indica a TypeScript que el resultado de getElementById debe tratarse como un HTMLInputElement.
Las aserciones de tipo también pueden utilizarse para reasignar claves, como muestra el siguiente ejemplo con literales de plantilla:

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

En este ejemplo, el tipo `J<Type>` utiliza un tipo mapeado con un literal de plantilla para reasignar las claves de Type. Crea propiedades nuevas añadiendo "prefix_" a cada clave, cuyos valores correspondientes son funciones que devuelven los valores de las propiedades originales.

Conviene señalar que TypeScript no ejecuta la comprobación de propiedades adicionales cuando se utiliza una aserción de tipo. Por tanto, suele ser preferible utilizar una declaración de tipo cuando se conoce de antemano la estructura del objeto.

#### Declaraciones de ambiente

Las declaraciones de ambiente son archivos que describen tipos para código JavaScript y cuyos nombres tienen el formato `.d.ts`. Normalmente se importan y utilizan para anotar bibliotecas JavaScript existentes o añadir tipos a archivos JS existentes del proyecto.

Los tipos de muchas bibliotecas habituales pueden encontrarse en:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

y pueden instalarse mediante:

```shell
npm install --save-dev @types/library-name
```

Para tus propias declaraciones de ambiente, puedes importar mediante una referencia de «triple barra»:

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Puedes utilizar declaraciones de ambiente incluso dentro de archivos JavaScript mediante `// @ts-check`.

La palabra clave `declare` permite definir tipos para código JavaScript existente sin importarlo y actúa como marcador de posición para tipos procedentes de otro archivo o del ámbito global.

### Comprobación de propiedades y de propiedades adicionales

TypeScript se basa en un sistema de tipos estructural, pero la comprobación de propiedades adicionales permite verificar si un objeto tiene exactamente las propiedades especificadas en el tipo.

La comprobación de propiedades adicionales se realiza, por ejemplo, al asignar literales de objeto a variables o pasarlos como argumentos a funciones.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Tipos débiles

Un tipo se considera débil cuando solo contiene un conjunto de propiedades opcionales:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript considera erróneo asignar cualquier valor a un tipo débil cuando no existe solapamiento. Por ejemplo, lo siguiente genera un error:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Aunque no se recomienda, si es necesario puede omitirse esta comprobación mediante una aserción de tipo:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

O añadiendo `unknown` a la firma de índice del tipo débil:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Comprobación estricta de literales de objeto (frescura)

La comprobación estricta de literales de objeto, a veces denominada «frescura», es una característica de TypeScript que ayuda a detectar propiedades adicionales o mal escritas que pasarían inadvertidas en las comprobaciones normales de tipos estructurales.

Al crear un literal de objeto, el compilador de TypeScript lo considera «fresco». Si se asigna a una variable o se pasa como parámetro, TypeScript generará un error cuando el literal especifique propiedades inexistentes en el tipo de destino.

Sin embargo, la «frescura» desaparece cuando se amplía un literal de objeto o se utiliza una aserción de tipo.

Estos son algunos ejemplos:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### Inferencia de tipos

TypeScript puede inferir tipos cuando no se proporciona ninguna anotación durante:

* La inicialización de variables.
* La inicialización de miembros.
* La asignación de valores predeterminados a parámetros.
* La determinación del tipo de retorno de una función.

Por ejemplo:

```typescript
let x = 'x'; // The type inferred is string
```

El compilador de TypeScript analiza el valor o la expresión y determina su tipo a partir de la información disponible.

### Inferencias más avanzadas

Cuando se utilizan varias expresiones en la inferencia de tipos, TypeScript busca los «mejores tipos comunes». Por ejemplo:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Si el compilador no encuentra los mejores tipos comunes, devuelve un tipo de unión. Por ejemplo:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript utiliza el «tipado contextual», basado en la ubicación de la variable, para inferir tipos. En el siguiente ejemplo, el compilador sabe que `e` es de tipo `MouseEvent` por el tipo del evento `click` definido en el archivo lib.d.ts, que contiene declaraciones de ambiente para varias construcciones habituales de JavaScript y el DOM:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Ampliación de tipos

La ampliación de tipos es el proceso mediante el cual TypeScript asigna un tipo a una variable inicializada sin una anotación de tipo. Permite pasar de tipos restringidos a tipos más amplios, pero no a la inversa.
En el siguiente ejemplo:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript asigna `string` a `x` a partir del único valor proporcionado durante la inicialización (`x`); este es un ejemplo de ampliación.

TypeScript ofrece formas de controlar el proceso de ampliación, por ejemplo mediante "const".

### Const

Utilizar la palabra clave `const` al declarar una variable produce en TypeScript una inferencia de tipo más restringida.

Por ejemplo:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

Al utilizar `const` para declarar la variable x, su tipo se restringe al valor literal concreto 'x'. Como el tipo de x está restringido, puede asignarse a la variable y sin errores.
El tipo puede inferirse así porque las variables `const` no pueden reasignarse, por lo que su tipo puede restringirse a un tipo literal concreto; en este caso, el tipo literal 'x'.

#### Modificador const en parámetros de tipo

Desde TypeScript 5.0 es posible especificar el atributo `const` en un parámetro de tipo genérico. Esto permite inferir el tipo más preciso posible. Veamos un ejemplo sin utilizar `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

Como puedes ver, las propiedades `a` y `b` se infieren con el tipo `string`.

Veamos ahora la diferencia con la versión que utiliza `const`:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

Ahora podemos ver que las propiedades `a` y `b` se infieren como literales de cadena y no simplemente como tipos `string`.

#### Aserción const

Esta característica permite declarar una variable con un tipo literal más preciso según su valor de inicialización, indicando al compilador que debe tratar el valor como un literal inmutable. Estos son algunos ejemplos:

En una sola propiedad:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

En un objeto completo:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Esto puede resultar especialmente útil al definir el tipo de una tupla:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Anotación de tipo explícita

Podemos ser explícitos e indicar un tipo. En el siguiente ejemplo, la propiedad `x` es de tipo `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Podemos hacer que la anotación de tipo sea más específica mediante una unión de tipos literales:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Restricción de tipos

La restricción de tipos es el proceso de TypeScript mediante el cual un tipo general se reduce a otro más específico. Ocurre cuando TypeScript analiza el código y determina que ciertas condiciones u operaciones pueden precisar la información del tipo.

Los tipos pueden restringirse de distintas formas, entre ellas:

#### Condiciones

Mediante sentencias condicionales como `if` o `switch`, TypeScript puede restringir el tipo según el resultado de la condición. Por ejemplo:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Lanzar una excepción o devolver

Lanzar un error o devolver anticipadamente desde una rama puede ayudar a TypeScript a restringir un tipo. Por ejemplo:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Otras formas de restringir tipos en TypeScript son:

* Operador `instanceof`: se utiliza para comprobar si un objeto es instancia de una clase concreta.
* Operador `in`: se utiliza para comprobar si una propiedad existe en un objeto.
* Operador `typeof`: se utiliza para comprobar el tipo de un valor en tiempo de ejecución.
* Funciones integradas como `Array.isArray()`: se utilizan para comprobar si un valor es un array.

#### Unión discriminada

Una «unión discriminada» es un patrón de TypeScript en el que se añade una «etiqueta» explícita a los objetos para distinguir entre distintos tipos de una unión. Este patrón también se denomina «unión etiquetada». En el siguiente ejemplo, la propiedad "type" representa la etiqueta:

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### Guardas de tipo definidas por el usuario

Cuando TypeScript no puede determinar un tipo, es posible escribir una función auxiliar denominada «guarda de tipo definida por el usuario». En el siguiente ejemplo utilizaremos un predicado de tipo para restringir el tipo después de aplicar un filtro:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### Restricción mediante switch-true

TypeScript 5.3 añade la restricción mediante switch-true, que permite sustituir cadenas if/else complejas por switch (true) con condiciones booleanas. Mejora la legibilidad y sigue restringiendo los tipos. Es similar a la coincidencia de patrones, pero más sencilla.

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

