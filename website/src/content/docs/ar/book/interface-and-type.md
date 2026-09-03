---
title: الواجهة والنوع
sidebar:
  order: 49
  label: 49. الواجهة والنوع
---


### الصياغة الشائعة

في TypeScript، تحدد الواجهات بنية الكائنات، مع تعيين أسماء الخصائص أو الأساليب التي يجب أن يحتوي عليها الكائن وأنواعها. والصياغة الشائعة لتعريف واجهة في TypeScript هي كما يلي:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

وبالمثل لتعريف نوع:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` أو `type TypeName`: يحدد اسم الواجهة.
`property1`: `Type1`: يحدد خصائص الواجهة مع الأنواع المقابلة لها. يمكن تعريف خصائص متعددة، تفصل بين كل منها فاصلة منقوطة.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: يحدد أساليب الواجهة. تُعرّف الأساليب بأسمائها، تليها قائمة معاملات بين قوسين ثم نوع الإرجاع. يمكن تعريف أساليب متعددة، تفصل بين كل منها فاصلة منقوطة.

مثال على واجهة:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

مثال على نوع:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

في TypeScript، تُستخدم الأنواع لتحديد شكل البيانات وفرض التحقق من الأنواع. توجد عدة صيغ شائعة لتعريف الأنواع في TypeScript، تبعًا لحالة الاستخدام المحددة. فيما يلي بعض الأمثلة:

### الأنواع الأساسية

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### الكائنات والواجهات

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### أنواع الاتحاد والتقاطع

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

