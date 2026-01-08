---
title: Exploring the Type System
sidebar:
  order: 9
  label: 9. Exploring the Type System
---


### The TypeScript Language Service

The TypeScript Language Service, also known as tsserver, offers various features such as error reporting, diagnostics, compile-on-save, renaming, go to definition, completion lists, signature help, and more. It is primarily used by integrated development environments (IDEs) to provide IntelliSense support. It seamlessly integrates with Visual Studio Code and is utilized by tools like Conquer of Completion (Coc).

Developers can leverage a dedicated API and create their own custom language service plugins to enhance the TypeScript editing experience. This can be particularly useful for implementing special linting features or enabling auto-completion for a custom templating language.

<!-- markdownlint-disable MD044 -->
An example of a real-world custom plugin is "typescript-styled-plugin", which provides syntax error reporting and IntelliSense support for CSS properties in styled components.
<!-- markdownlint-enable MD044 -->

For more information and quick start guides, you can refer to the official TypeScript Wiki on GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Structural Typing

TypeScript is based on a structural type system. This means that the compatibility and equivalence of types are determined by the type's actual structure or definition, rather than its name or place of declaration, as in nominative type systems like C# or C.

TypeScript's structural type system was designed based on how JavaScript's dynamic duck typing system works during runtime.

The following example is valid TypeScript code. As you can observe, "X" and "Y" have the same member "a," even though they have different declaration names. The types are determined by their structures, and in this case, since the structures are the same, they are compatible and valid.

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

### TypeScript Fundamental Comparison Rules

The TypeScript comparison process is recursive and executed on types nested at any level.

A type "X" is compatible with "Y" if "Y" has at least the same members as "X".

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Function parameters are compared by types, not by their names:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Function return types must be the same:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

The return type of a source function must be a subtype of the return type of a target function:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

Discarding function parameters is allowed, as it is a common practice in JavaScript, for instance using "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Therefore, the following type declarations are completely valid:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Any additional optional parameters of the source type are valid:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Any optional parameters of the target type without corresponding parameters in the source type are valid and not an error:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

The rest parameter is treated as an infinite series of optional parameters:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Functions with overloads are valid if the overload signature is compatible with its implementation signature:

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

Function parameter comparison succeeds if the source and target parameters are assignable to supertypes or subtypes (bivariance).

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

Enums are comparable and valid with numbers and vice versa, but comparing Enum values from different Enum types is invalid.

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

Instances of a class are subject to a compatibility check for their private and protected members:

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

The comparison check does not take into consideration the different inheritance hierarchy, for instance:

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

Generics are compared using their structures based on the resulting type after applying the generic parameter, only the final result is compared as a non-generic type.

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

When generics do not have their type argument specified, all the unspecified arguments are treated as types with "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Remember:

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
g = 1; // Invalid, void is not assignable to or from anything expect any
g = g1; // Valid
```

Please note that when "strictNullChecks" is enabled, "null" and "undefined" are treated similarly to "void"; otherwise, they are similar to "never".

### Types as Sets

In TypeScript, a type is a set of possible values. This set is also referred to as the domain of the type. Each value of a type can be viewed as an element in a set. A type establishes the constraints that every element in the set must satisfy to be considered a member of that set.
The primary task of TypeScript is to check and verify whether one set is a subset of another.

TypeScript supports various types of sets:

| Set term           | TypeScript                      | Notes                                                                                                              |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Empty set          | never                           | "never" contains anything apart itself                                                                             |
| Single element set | undefined / null / literal type |                                                                                                                    |
| Finite set         | boolean / union                 |                                                                                                                    |
| Infinite set       | string / number / object        |                                                                                                                    |
| Universal set      | any / unknown                   | Every element is a member of "any" and every set is a subset of it / "unknown" is a type-safe counterpart of "any" |

Here few examples:

| TypeScript            | Set term               | Example                                                                         |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (empty set)          | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                        |
| Literal type          | Single element set     | type X = 'X';                                                                   |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| Value assignable to T | Value ∈ T (member of)  | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T1 assignable to T2   | T1 ⊆ T2 (subset of)    | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (subset of)    | type X = 'X' extends string ? true : false;                                     |
|                       |                        |
| T1 \| T2              | T1 ∪ T2 (union)        | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2 (intersection) | type X = \{ a: string \}                                                          |
|                       |                        | type Y = \{ b: string \}                                                          |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | Universal set          | const x: unknown = 1                                                            |

An union, (T1 | T2) creates a wider set (both):

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

An intersection, (T1 & T2) create a narrower set (only shared):

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

The `extends` keyword could be considered as a "subset of" in this context. It sets a constraint for a type. The extends used with a generic, take the generic as an infinite set and it will constrain it to a more specific type.
Please note that `extends` has nothing to do with hierarchy in a OOP sense (there is no this concept in TypeScript).
TypeScript works with sets and does not have a strict hierarchy, infact, as in the example below, two types could overlap without either being a subtype of the other type (TypeScript considers the structure, shape of the objects).

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

### Assign a type: Type Declarations and Type Assertions

A type can be assigned in different ways in TypeScript:

#### Type Declaration

In the following example, we use x: X (": Type") to declare a type for the variable x.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

If the variable is not in the specified format, TypeScript will report an error. For instance:

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

#### Type Assertion

It is possible to add an assertion by using the `as` keyword. This tells the compiler that the developer has more information about a type and silences any errors that may occur.

For example:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

In the above example, the object x is asserted to have the type X using the as keyword. This informs the TypeScript compiler that the object conforms to the specified type, even though it has an additional property b not present in the type definition.

Type assertions are useful in situations where a more specific type needs to be specified, especially when working with the DOM. For instance:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Here, the type assertion as HTMLInputElement is used to tell TypeScript that the result of getElementById should be treated as an HTMLInputElement.
Type assertions can also be used to remap keys, as shown in the example below with template literals:

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

In this example, the type `J<Type>` uses a mapped type with a template literal to remap the keys of Type. It creates new properties with a "prefix_" added to each key, and their corresponding values are functions returning the original property values.

It is worth noting that when using a type assertion, TypeScript will not execute excess property checking. Therefore, it is generally preferable to use a Type Declaration when the structure of the object is known in advance.

#### Ambient Declarations

Ambient declarations are files that describe types for JavaScript code, they have a file name format as `.d.ts.`. They are usually imported and used to annotate existing JavaScript libraries or to add types to existing JS files in your project.

Many common libraries types can be found at:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

and can be installed using:

```shell
npm install --save-dev @types/library-name
```

For your defined Ambient Declarations, you can import using the "triple-slash" reference:

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

You can use Ambient Declarations even within JavaScript files using `// @ts-check`.

The `declare` keyword enables type definitions for existing JavaScript code without importing it, serving as a placeholder for types from another file or globally.

### Property Checking and Excess Property Checking

TypeScript is based on a structural type system but excess property checking is a property of TypeScript which allows it to check whether an object has the exact properties specified in the type.

Excess Property Checking is performed when assigning object literals to variables or when passing them as arguments to the function's excess property, for instance.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Weak Types

A type is considered weak when it contains nothing but a set of all-optional properties:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript considers an error to assign anything to a weak type when there is no overlap, for instance, the following throws an error:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Although not recommended, if needed, it is possible to bypass this check by using type assertion:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Or by adding `unknown` to the index signature to the weak type:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Strict Object Literal Checking (Freshness)

Strict object literal checking, sometimes referred to as "freshness", is a feature in TypeScript that helps catch excess or misspelled properties that would otherwise go unnoticed in normal structural type checks.

When creating an object literal, the TypeScript compiler considers it "fresh." If the object literal is assigned to a variable or passed as a parameter, TypeScript will throw an error if the object literal specifies properties that do not exist in the target type.

However, "freshness" disappears when an object literal is widened or a type assertion is used.

Here are some examples to illustrate:

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

### Type Inference

TypeScript can infer types when no annotation is provided during:

* Variable initialization.
* Member initialization.
* Setting defaults for parameters.
* Function return type.

For example:

```typescript
let x = 'x'; // The type inferred is string
```

The TypeScript compiler analyzes the value or expression and determines its type based on the available information.

### More Advanced Inferences

When multiple expressions are used in type inference, TypeScript looks for the "best common types." For instance:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

If the compiler cannot find the best common types, it returns a union type. For example:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript utilizes "contextual typing" based on the variable's location to infer types. In the following example, the compiler knows that `e` is of type `MouseEvent` because of the `click` event type defined in the lib.d.ts file, which contains ambient declarations for various common JavaScript constructs and the DOM:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Type Widening

Type widening is the process in which TypeScript assigns a type to a variable initialized when no type annotation was provided. It allows narrow to wider types but not vice versa.
In the following example:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript assigns `string` to `x` based on the single value provided during initialization (`x`), this is an example of widening.

TypeScript provides ways to have control of the widening process, for instance using "const".

### Const

Using the `const` keyword when declaring a variable results in a narrower type inference in TypeScript.

For example:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

By using `const` to declare the variable x, its type is narrowed to the specific literal value 'x'. Since the type of x is narrowed, it can be assigned to the variable y without any error.
The reason the type can be inferred is because `const` variables cannot be reassigned, so their type can be narrowed down to a specific literal type, in this case, the literal type 'x'.

#### Const Modifier on Type Parameters

From version 5.0 of TypeScript, it is possible to specify the `const` attribute on a generic type parameter. This allows for inferring the most precise type possible. Let's see an example without using `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type infered is: { a: string; b: string; }
```

As you can see, the properties `a` and `b` are inferred with a type of `string`   .

Now, let's see the difference with the `const` version:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type infered is: { a: "a"; b: "b"; }
```

Now we can see that the properties `a` and `b` are inferred as `const`, so `a` and `b` are treated as string literals rather than just `string` types.

#### Const assertion

This feature allows you to declare a variable with a more precise literal type based on its initialization value, signifying to the compiler that the value should be treated as an immutable literal. Here are a few examples:

On a single property:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

On an entire object:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

This can be particularly useful when defining the type for a tuple:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Explicit Type Annotation

We can be specific and pass a type, in the following example property `x` is of type `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

We can make the type annotation more specific by using a union of literal types:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Type Narrowing

Type Narrowing is the process in TypeScript where a general type is narrowed down to a more specific type. This occurs when TypeScript analyzes the code and determines that certain conditions or operations can refine the type information.

Narrowing types can occur in different ways, including:

#### Conditions

By using conditional statements, such as `if` or `switch`, TypeScript can narrow down the type based on the outcome of the condition. For example:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Throwing or returning

Throwing an error or returning early from a branch can be used to help TypeScript narrow down a type. For example:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Other ways to narrow down types in TypeScript include:

* `instanceof` operator: Used to check if an object is an instance of a specific class.
* `in` operator: Used to check if a property exists in an object.
* `typeof` operator: Used to check the type of a value at runtime.
* Built-in functions like `Array.isArray()`: Used to check if a value is an array.

#### Discriminated Union

Using a "Discriminated Union" is a pattern in TypeScript where an explicit "tag" is added to objects to distinguish between different types within a union. This pattern is also referred to as a "tagged union." In the following example, the "tag" is represented by the property "type":

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

#### User-Defined Type Guards

In cases where TypeScript is unable to determine a type, it is possible to write a helper function known as a "user-defined type guard." In the following example, we will utilize a Type Predicate to narrow down the type after applying certain filtering:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

