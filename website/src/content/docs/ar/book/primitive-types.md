---
title: الأنواع الأولية
sidebar:
  order: 11
  label: 11. الأنواع الأولية
---


يدعم TypeScript سبعة أنواع أولية. يشير نوع البيانات الأولي إلى نوع ليس كائنًا ولا ترتبط به أي أساليب. في TypeScript، تكون جميع الأنواع الأولية غير قابلة للتغيير، ما يعني أنه لا يمكن تغيير قيمها بعد إسنادها.

### string

يخزّن النوع البدائي `string` البيانات النصية، وتكون القيمة دائمًا محاطة بعلامتي اقتباس مزدوجتين أو مفردتين.

```typescript
const x: string = 'x';
const y: string = 'y';
```

يمكن أن تمتد السلاسل النصية عبر عدة أسطر إذا أُحيطت بعلامة الفاصلة العليا المائلة (`):

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

يخزّن نوع البيانات `boolean` في TypeScript قيمة ثنائية، إما `true` وإما `false`.

```typescript
const isReady: boolean = true;
```

### number

يُمثَّل نوع البيانات `number` في TypeScript بقيمة فاصلة عائمة ذات 64 بت. ويمكن لنوع `number` تمثيل الأعداد الصحيحة والكسور.
يدعم TypeScript أيضًا النظام السداسي عشري والثنائي والثماني، على سبيل المثال:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

يمثّل `bigint` قيمًا صحيحة يمكن أن تكون أكبر من الحد الأقصى للعدد الصحيح الآمن الذي يدعمه `number`، وهو 2^53 - 1.

يمكن إنشاء `bigint` باستدعاء الدالة المضمّنة `BigInt()` أو بإضافة `n` إلى نهاية أي قيمة عددية صحيحة حرفية:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

ملاحظات:

* لا يمكن مزج قيم `bigint` مع `number`، ولا يمكن استخدامها مع الكائن المضمّن `Math`؛ بل يجب تحويلها قسرًا إلى النوع نفسه.
* لا تتوفر قيم `bigint` إلا إذا كان إعداد الهدف ES2020 أو إصدارًا أحدث.

### Symbol

الرموز هي معرّفات فريدة يمكن استخدامها مفاتيحَ للخصائص في الكائنات لمنع تعارض الأسماء.

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null وundefined

يمثّل النوعان `null` و`undefined` كلاهما انعدام القيمة أو غياب أي قيمة.

يعني النوع `undefined` أن القيمة لم تُسنَد أو تُهيّأ، أو يشير إلى غياب غير مقصود للقيمة.

يعني النوع `null` أننا نعلم أن الحقل لا يحتوي على قيمة، ومن ثم تكون القيمة غير متاحة، وهو يشير إلى غياب مقصود للقيمة.

### Array

المصفوفة `array` هي نوع بيانات يمكنه تخزين عدة قيم من النوع نفسه أو من أنواع مختلفة. ويمكن تعريفها باستخدام الصياغة الآتية:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

يدعم TypeScript المصفوفات المخصّصة للقراءة فقط باستخدام الصياغة الآتية:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

يدعم TypeScript أنواع Tuple وأنواع Tuple المخصّصة للقراءة فقط:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

يمثّل نوع البيانات `any` حرفيًا «أي» قيمة، وهو النوع الافتراضي عندما يتعذر على TypeScript استدلال النوع أو عندما لا يكون محددًا.

عند استخدام `any`، يتخطى مصرّف TypeScript التحقق من الأنواع، ولذلك لا توجد سلامة للأنواع عند استخدام `any`. وبوجه عام، لا تستخدم `any` لإسكات المصرّف عند حدوث خطأ؛ بل ركّز بدلًا من ذلك على إصلاح الخطأ، لأن استخدام `any` يجعل من الممكن خرق العقود وفقدان فوائد الإكمال التلقائي في TypeScript.

قد يكون النوع `any` مفيدًا أثناء الانتقال التدريجي من JavaScript إلى TypeScript، إذ يمكنه إسكات المصرّف.

للمشروعات الجديدة، استخدم إعداد TypeScript `noImplicitAny`، الذي يمكّن TypeScript من إصدار أخطاء في المواضع التي يُستخدم فيها `any` أو يُستدل عليه.

عادةً ما يكون النوع `any` مصدرًا للأخطاء التي يمكنها إخفاء مشكلات حقيقية في أنواعك. تجنّب استخدامه قدر الإمكان.

