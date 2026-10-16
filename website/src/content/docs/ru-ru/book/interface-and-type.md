---
title: Интерфейс и тип
sidebar:
  order: 49
  label: 49. Интерфейс и тип
---


### Общий синтаксис

В TypeScript интерфейсы определяют структуру объектов, задавая имена и типы свойств или методов, которые должен иметь объект. Общий синтаксис определения интерфейса в TypeScript выглядит следующим образом:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Аналогично для определения типа:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` или `type TypeName`: определяет имя интерфейса.
`property1`: `Type1`: задаёт свойства интерфейса вместе с соответствующими типами. Можно определить несколько свойств, разделяя их точкой с запятой.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: задаёт методы интерфейса. Метод определяется его именем, за которым следует список параметров в круглых скобках и тип возвращаемого значения. Можно определить несколько методов, разделяя их точкой с запятой.

Пример интерфейса:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Пример типа:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

В TypeScript типы используются для определения структуры данных и обеспечения проверки типов. Существует несколько распространённых вариантов синтаксиса для определения типов в TypeScript в зависимости от конкретного сценария использования. Ниже приведены некоторые примеры:

### Базовые типы

```typescript
let myNumber: number = 123; // тип number
let myBoolean: boolean = true; // тип boolean
let myArray: string[] = ['a', 'b']; // массив строк
let myTuple: [string, number] = ['a', 123]; // кортеж
```

### Объекты и интерфейсы

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Типы объединения и пересечения

```typescript
type MyType = string | number; // Тип объединения
let myUnion: MyType = 'hello'; // Может быть строкой
myUnion = 123; // Или числом

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Тип пересечения
let myCombined: CombinedType = { name: 'John', age: 25 }; // Объект со свойствами name и age
```

