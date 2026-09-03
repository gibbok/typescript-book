# التعدادات



في TypeScript، يمثّل `enum` مجموعة من القيم الثابتة المسماة.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

يمكن تعريف التعدادات بطرائق مختلفة:

### التعدادات العددية

في TypeScript، التعداد العددي هو تعداد تُسنَد فيه قيمة عددية إلى كل ثابت، بدءًا من 0 افتراضيًا.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

يمكن تحديد قيم مخصّصة بإسنادها صراحةً:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### التعدادات النصية

في TypeScript، التعداد النصي هو تعداد تُسنَد فيه قيمة نصية إلى كل ثابت.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

ملاحظة: يسمح TypeScript باستخدام تعدادات غير متجانسة يمكن أن تتعايش فيها الأعضاء النصية والعددية.

### التعدادات الثابتة

التعداد الثابت في TypeScript هو نوع خاص من التعدادات تكون فيه جميع القيم معروفة في وقت التصريف وتُضمَّن مباشرةً في كل موضع يُستخدم فيه التعداد، ما ينتج شيفرة أكثر كفاءة.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

سيُصرَّف إلى:

```typescript
console.log('EN' /* Language.English */);
```

ملاحظات:

تحتوي التعدادات الثابتة على قيم مضمنة في الشيفرة، ما يؤدي إلى محو التعداد، ويمكن أن يكون ذلك أكثر كفاءة في المكتبات المستقلة، لكنه غير مرغوب فيه بوجه عام. كذلك لا يمكن أن تحتوي التعدادات الثابتة على أعضاء محسوبة.

### الربط العكسي

يشير الربط العكسي في تعدادات TypeScript إلى القدرة على استرداد اسم عضو التعداد من قيمته. توجد لأعضاء التعداد افتراضيًا روابط أمامية من الاسم إلى القيمة، ولكن يمكن إنشاء روابط عكسية بتحديد قيم كل عضو صراحةً. تفيد الروابط العكسية عندما تحتاج إلى البحث عن عضو تعداد باستخدام قيمته، أو عندما تحتاج إلى التكرار على جميع أعضاء التعداد. لاحظ أن أعضاء التعداد العددية وحدها هي التي تولّد روابط عكسية، بينما لا يُولَّد أي رابط عكسي لأعضاء التعداد النصية.

التعداد الآتي:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

يُصرَّف إلى:

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

لذلك، يعمل ربط القيم بالمفاتيح مع أعضاء التعداد العددية، ولكن ليس مع أعضاء التعداد النصية:

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### التعدادات المحيطية

التعداد المحيط في TypeScript هو نوع من التعدادات يُعرَّف في ملف تصريح (*.d.ts) من دون تنفيذ مرتبط به. ويتيح لك تعريف مجموعة من الثوابت المسماة التي يمكن استخدامها بطريقة آمنة من ناحية الأنواع عبر ملفات مختلفة من دون الحاجة إلى استيراد تفاصيل التنفيذ في كل ملف.

### الأعضاء المحسوبة والثابتة

في TypeScript، العضو المحسوب هو عضو في تعداد تُحسب قيمته في وقت التشغيل، بينما العضو الثابت هو عضو تُحدَّد قيمته في وقت التصريف ولا يمكن تغييرها في أثناء وقت التشغيل. يُسمح بالأعضاء المحسوبة في التعدادات العادية، بينما يُسمح بالأعضاء الثابتة في كل من التعدادات العادية والثابتة.

```typescript
// Constant members
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Computed members
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // random number generated at run time
```

يُعبَّر عن التعدادات باتحادات تتألف من أنواع أعضائها. ويمكن تحديد قيم كل عضو من خلال تعبيرات ثابتة أو غير ثابتة، مع إسناد أنواع حرفية إلى الأعضاء التي تمتلك قيمًا ثابتة. للتوضيح، تأمل تصريح النوع E وأنواعه الفرعية E.A وE.B وE.C. في هذه الحالة، يمثّل E الاتحاد E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

