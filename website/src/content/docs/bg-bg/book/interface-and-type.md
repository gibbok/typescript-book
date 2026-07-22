---
title: Interface и Type
sidebar:
  order: 49
  label: 49. Interface и Type
---


### Общ синтаксис

В TypeScript, interface дефинират структурата на обекти, като задават имената и типовете на свойствата или методите, които даден обект трябва да има. Общият синтаксис за дефиниране на interface в TypeScript е следният:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

По подобен начин се дефинира и type:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` или `type TypeName`: Дефинира името на interface.
`property1: Type1`: Определя свойствата на interface заедно със съответните им типове. Могат да бъдат дефинирани множество свойства, разделени със точка и запетая.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Определя методите на interface. Методите се дефинират чрез име, последвано от списък с параметри в скоби и тип на върнатата стойност. Могат да бъдат дефинирани множество методи, разделени със точка и запетая.

Пример за interface:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Пример за type:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

В TypeScript, типовете се използват за дефиниране на структурата на данни и за прилагане на проверка на типовете (type checking). Съществуват различни често използвани синтаксиси за дефиниране на типове в TypeScript, в зависимост от конкретния случай на употреба. Ето някои примери:

### Основни типове

```typescript
let myNumber: number = 123; // number тип
let myBoolean: boolean = true; // boolean тип
let myArray: string[] = ['a', 'b']; // масив от string
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Обекти и Interfaces

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Union и Intersection типове

```typescript
type MyType = string | number; // Union тип
let myUnion: MyType = 'hello'; // Може да бъде string
myUnion = 123; // Или number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection тип
let myCombined: CombinedType = { name: 'John', age: 25 }; // Обект със свойства name и age
```

