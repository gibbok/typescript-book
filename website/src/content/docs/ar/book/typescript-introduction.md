---
title: مقدمة إلى TypeScript
sidebar:
  order: 8
  label: 8. مقدمة إلى TypeScript
---


### ما TypeScript؟

TypeScript لغة برمجة ذات تنميط قوي مبنية على JavaScript. صمّمها Anders Hejlsberg في الأصل عام 2012، وتتولى Microsoft حاليًا تطويرها وصيانتها بوصفها مشروعًا مفتوح المصدر.

تُصرَّف TypeScript إلى JavaScript ويمكن تنفيذها في أي بيئة تشغيل JavaScript (مثل المتصفح أو Node.js على خادم).

تدعم أنماط برمجة متعددة، مثل البرمجة الوظيفية، والعامة، والأمرية، وكائنية التوجّه، وهي لغة مصرّفة (محوّلة) تُحوّل إلى JavaScript قبل التنفيذ.

### لماذا TypeScript؟

TypeScript لغة ذات تنميط قوي تساعد على منع أخطاء البرمجة الشائعة وتجنّب أنواع معيّنة من أخطاء وقت التشغيل قبل تنفيذ البرنامج.

تتيح اللغة ذات التنميط القوي للمطوّر تحديد قيود وسلوكيات مختلفة للبرنامج في تعريفات أنواع البيانات، ما يسهّل التحقق من صحة البرمجيات ومنع العيوب. وتبرز قيمة ذلك بوجه خاص في التطبيقات واسعة النطاق.

من فوائد TypeScript:

* التنميط الساكن، مع تنميط قوي اختياري
* استدلال النوع
* الوصول إلى ميزات ES6 وES7
* التوافق عبر المنصات والمتصفحات
* دعم الأدوات باستخدام IntelliSense

### TypeScript وJavaScript

تُكتب TypeScript في ملفات `.ts` أو `.tsx`، بينما تُكتب ملفات JavaScript في ملفات `.js` أو `.jsx`.

يمكن للملفات ذات الامتداد `.tsx` أو `.jsx` أن تحتوي على امتداد بنية JavaScript المسمّى JSX، والمستخدم في React لتطوير واجهات المستخدم.

تُعد TypeScript، من حيث البنية، مجموعة شاملة من JavaScript ‏(ECMAScript 2015) مع إضافة الأنواع. كل شيفرة JavaScript هي شيفرة TypeScript صالحة، لكن العكس ليس صحيحًا دائمًا.

على سبيل المثال، لنتناول دالة في ملف JavaScript بالامتداد `.js`، مثل الآتي:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

يمكن تحويل الدالة واستخدامها في TypeScript بتغيير امتداد الملف إلى `.ts`. لكن إذا أُضيفت تعليقات توضيحية لأنواع TypeScript إلى الدالة نفسها، فلن يمكن تنفيذها في أي بيئة تشغيل JavaScript من دون تصريف. ستنتج شيفرة TypeScript التالية خطأً في البنية إذا لم تُصرَّف:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

صُممت TypeScript لاكتشاف أخطاء وقت التشغيل المحتملة في وقت التصريف، وذلك عبر السماح للمطوّرين بالتعبير عن مقاصدهم باستخدام التعليقات التوضيحية للأنواع. وإضافةً إلى ذلك، تستطيع TypeScript اكتشاف بعض المشكلات حتى عند عدم تقديم تعليقات توضيحية صريحة للأنواع، بفضل استدلال النوع. على سبيل المثال، لا تحدد مقتطفة الشيفرة التالية أي أنواع TypeScript:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

في هذه الحالة، تكتشف TypeScript خطأً وتبلغ عنه:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

يتأثر نظام الأنواع في TypeScript إلى حد كبير بسلوك JavaScript في وقت التشغيل. فمثلًا، تجري نمذجة معامل الجمع (+)، الذي يمكنه في JavaScript إجراء ربط النصوص أو الجمع العددي، بالطريقة نفسها في TypeScript:

```typescript
const result = '1' + 1; // Result is of type string
```

اتخذ الفريق المسؤول عن TypeScript قرارًا متعمّدًا باعتبار الاستخدامات غير المعتادة في JavaScript أخطاءً. على سبيل المثال، لنتناول شيفرة JavaScript الصالحة التالية:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

لكن TypeScript تُصدر خطأً:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

يحدث هذا الخطأ لأن TypeScript تفرض توافق الأنواع بصرامة، وتتعرّف في هذه الحالة على عملية غير صالحة بين عدد وقيمة منطقية.

### توليد الشيفرة في TypeScript

يتحمل مصرّف TypeScript مسؤوليتين رئيسيتين: التحقق من أخطاء الأنواع والتصريف إلى JavaScript. وهاتان العمليتان مستقلتان إحداهما عن الأخرى. لا تؤثر الأنواع في تنفيذ الشيفرة داخل بيئة تشغيل JavaScript، لأنها تُمحى بالكامل أثناء التصريف. ولا يزال بإمكان TypeScript إخراج شيفرة JavaScript حتى في وجود أخطاء في الأنواع.
فيما يلي مثال على شيفرة TypeScript تحتوي على خطأ في النوع:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

ومع ذلك، لا يزال بإمكانها إنتاج مخرجات JavaScript قابلة للتنفيذ:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

لا يمكن التحقق من أنواع TypeScript في وقت التشغيل. على سبيل المثال:

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

نظرًا إلى أن الأنواع تُمحى بعد التصريف، فلا توجد طريقة لتشغيل هذه الشيفرة في JavaScript. وللتعرّف على الأنواع في وقت التشغيل، نحتاج إلى استخدام آلية أخرى. توفّر TypeScript عدة خيارات، ومن الخيارات الشائعة «الاتحاد الموسوم». على سبيل المثال:

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

الخاصية "kind" هي قيمة يمكن استخدامها في وقت التشغيل للتمييز بين الكائنات في JavaScript.

ومن الممكن أيضًا أن يكون لقيمة في وقت التشغيل نوع مختلف عن النوع المصرّح به في تصريح النوع. يحدث ذلك مثلًا إذا أساء المطوّر تفسير نوع واجهة API وأضاف إليه تعليقًا توضيحيًا غير صحيح.

TypeScript مجموعة شاملة من JavaScript، لذا يمكن استخدام الكلمة المفتاحية "class" بوصفها نوعًا وقيمةً في وقت التشغيل.

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

في JavaScript، يمتلك "class" خاصية "prototype"، ويمكن استخدام المعامل "instanceof" لاختبار ما إذا كانت خاصية prototype لمنشئ ما تظهر في أي موضع ضمن سلسلة prototype لكائن.

ليس لـ TypeScript أي تأثير في أداء وقت التشغيل، إذ ستُمحى جميع الأنواع. لكن TypeScript تضيف بعض الحمل الزائد إلى وقت البناء.

### JavaScript الحديثة الآن (التحويل إلى إصدار أقدم)

يمكن لـ TypeScript تصريف الشيفرة إلى أي إصدار منشور من JavaScript منذ ECMAScript 3 ‏(1999). وهذا يعني أن TypeScript تستطيع تحويل الشيفرة التي تستخدم أحدث ميزات JavaScript إلى إصدارات أقدم، وهي عملية تُعرف باسم Downleveling. ويتيح ذلك استخدام JavaScript الحديثة مع الحفاظ على أقصى قدر من التوافق مع بيئات التشغيل القديمة.

من المهم ملاحظة أنه أثناء التحويل إلى إصدار أقدم من JavaScript، قد تولّد TypeScript شيفرة يمكن أن تفرض حملًا إضافيًا على الأداء مقارنةً بالتنفيذات الأصلية.

فيما يلي بعض ميزات JavaScript الحديثة التي يمكن استخدامها في TypeScript:

* وحدات ECMAScript بدلًا من استدعاءات رد النداء "define" بأسلوب AMD أو عبارات "require" في CommonJS.
* الأصناف بدلًا من prototypes.
* التصريح عن المتغيّرات باستخدام "let" أو "const" بدلًا من "var".
* حلقة "for-of" أو ".forEach" بدلًا من حلقة "for" التقليدية.
* الدوال السهمية بدلًا من تعبيرات الدوال.
* إسناد التفكيك.
* الأسماء المختصرة للخصائص/الأساليب وأسماء الخصائص المحسوبة.
* المعاملات الافتراضية للدوال.

من خلال الاستفادة من ميزات JavaScript الحديثة هذه، يمكن للمطوّرين كتابة شيفرة أكثر تعبيرًا وإيجازًا في TypeScript.

