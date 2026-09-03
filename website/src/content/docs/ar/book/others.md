---
title: مواضيع أخرى
sidebar:
  order: 62
  label: 62. مواضيع أخرى
---


### الأخطاء ومعالجة الاستثناءات

تتيح لك TypeScript التقاط الأخطاء ومعالجتها باستخدام آليات JavaScript القياسية لمعالجة الأخطاء:

كتل Try-Catch-Finally:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

يمكنك أيضًا معالجة أنواع مختلفة من الأخطاء:

```typescript
try {
    // Code that might throw different types of errors
} catch (error) {
    if (error instanceof TypeError) {
        // Handle TypeError
    } else if (error instanceof RangeError) {
        // Handle RangeError
    } else {
        // Handle other errors
    }
}
```

أنواع الأخطاء المخصصة:

يمكن تحديد أخطاء أكثر تخصيصًا من خلال توسيع `class` ‏Error:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### أصناف المزج

تتيح لك أصناف المزج دمج سلوك من أصناف متعددة وتركيبه في صنف واحد. وهي توفّر طريقة لإعادة استخدام الوظائف وتوسيعها دون الحاجة إلى سلاسل وراثة عميقة.

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

// Extend MyClass to include the behavior of Identifiable and Selectable
interface MyClass extends Identifiable, Selectable {}

// Function to apply mixins to a class
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

// Apply the mixins to MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### ميزات اللغة غير المتزامنة

لأن TypeScript مجموعة شاملة من JavaScript، فهي تتضمن ميزات JavaScript المضمّنة للغة غير المتزامنة مثل:

الوعود:

الوعود هي طريقة لمعالجة العمليات غير المتزامنة ونتائجها باستخدام توابع مثل `.then()` و`.catch()` لمعالجة حالتي النجاح والخطأ.

لمعرفة المزيد: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

الكلمتان المفتاحيتان Async/await هما طريقة لتوفير صياغة تبدو أكثر تزامنًا عند العمل مع الوعود. تُستخدم الكلمة المفتاحية `async` لتعريف دالة غير متزامنة، وتُستخدم الكلمة المفتاحية `await` داخل دالة غير متزامنة لإيقاف التنفيذ مؤقتًا إلى أن تتم تسوية Promise بالقبول أو الرفض.

لمعرفة المزيد:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

واجهات API التالية مدعومة جيدًا في TypeScript:

واجهة Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### المكرِّرات والمولِّدات

تدعم TypeScript المكرِّرات والمولِّدات دعمًا جيدًا.

المكرِّرات هي كائنات تطبّق بروتوكول التكرار، وتوفّر طريقة للوصول إلى عناصر مجموعة أو تسلسل واحدًا تلو الآخر. وهي بنية تحتوي على مؤشر إلى العنصر التالي في عملية التكرار. ولديها تابع `next()` يعيد القيمة التالية في التسلسل إلى جانب قيمة منطقية تشير إلى ما إذا كان التسلسل قد أصبح `done`.

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

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

المولِّدات هي دوال خاصة تُعرّف باستخدام صياغة `function*` التي تبسّط إنشاء المكرِّرات. وهي تستخدم الكلمة المفتاحية `yield` لتعريف تسلسل القيم، وتوقف التنفيذ وتستأنفه تلقائيًا عند طلب القيم.

تسهّل المولِّدات إنشاء المكرِّرات، وهي مفيدة بوجه خاص عند العمل مع تسلسلات كبيرة أو غير منتهية.

مثال:

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

تدعم TypeScript أيضًا المكرِّرات غير المتزامنة والمولِّدات غير المتزامنة.

لمعرفة المزيد:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### مرجع TsDocs وJSDoc

عند العمل مع قاعدة شيفرة JavaScript، يمكن مساعدة TypeScript على استدلال النوع الصحيح باستخدام تعليقات JSDoc مع شروح توضيحية إضافية لتوفير معلومات النوع.

مثال:

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

تتوفر الوثائق الكاملة على هذا الرابط:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

بدءًا من الإصدار 3.7، يمكن إنشاء تعريفات الأنواع .d.ts من صياغة JSDoc في JavaScript.
يمكن العثور على مزيد من المعلومات هنا:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

الحزم التابعة لمنظمة @types هي اصطلاحات خاصة لتسمية الحزم، تُستخدم لتوفير تعريفات الأنواع لمكتبات JavaScript أو وحداتها الموجودة. على سبيل المثال، سيؤدي استخدام:

```shell
npm install --save-dev @types/lodash
```

إلى تثبيت تعريفات الأنواع الخاصة بـ `lodash` في مشروعك الحالي.

للمساهمة في تعريفات الأنواع الخاصة بحزمة `@types`، يرجى إرسال طلب سحب إلى [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX ‏(JavaScript XML) هو امتداد لصياغة لغة JavaScript يتيح لك كتابة شيفرة شبيهة بـ HTML داخل ملفات JavaScript أو TypeScript. ويُستخدم عادةً في React لتعريف بنية HTML.

توسّع TypeScript إمكانات JSX من خلال توفير فحص الأنواع والتحليل الساكن.

لاستخدام JSX، تحتاج إلى تعيين خيار المصرّف `jsx` في ملف `tsconfig.json`. وفيما يلي خياران شائعان للإعداد:

* "preserve": يُنتج ملفات .jsx مع إبقاء JSX دون تغيير. يطلب هذا الخيار من TypeScript الحفاظ على صياغة JSX كما هي وعدم تحويلها أثناء عملية الترجمة. يمكنك استخدام هذا الخيار إذا كانت لديك أداة منفصلة، مثل Babel، تتولى التحويل.
* "react": يمكّن تحويل JSX المضمّن في TypeScript. سيُستخدم React.createElement.

تتوفر جميع الخيارات هنا:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### وحدات ES6

تدعم TypeScript ‏ES6 ‏(ECMAScript 2015) والعديد من الإصدارات اللاحقة. ويعني ذلك أنه يمكنك استخدام صياغة ES6، مثل الدوال السهمية، وقوالب النصوص الحرفية، والأصناف، والوحدات، والتفكيك، وغير ذلك.

لتمكين ميزات ES6 في مشروعك، يمكنك تحديد الخاصية `target` في tsconfig.json.

مثال على إعداد:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### عامل الأُس في ES7

يحسب عامل الأُس (`**`) القيمة الناتجة من رفع المُعامل الأول إلى قوة المُعامل الثاني. ويعمل بصورة مشابهة لـ `Math.pow()`، لكن مع قدرة إضافية على قبول BigInts كمُعاملات.
تدعم TypeScript هذا العامل بالكامل عند تعيين `target` في ملف tsconfig.json إلى `es2016` أو إصدار أحدث.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### عبارة for-await-of

هذه ميزة JavaScript مدعومة بالكامل في TypeScript، وتتيح لك التكرار عبر الكائنات القابلة للتكرار غير المتزامنة مع الإصدار المستهدف `es2018`.

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### الخاصية الوصفية new.target

يمكنك استخدام الخاصية الوصفية `new.target` في TypeScript، وهي تمكّنك من تحديد ما إذا استُدعيت دالة أو مُنشئ باستخدام العامل new. وتتيح لك اكتشاف ما إذا أُنشئ كائن نتيجة استدعاء مُنشئ.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Logs the constructor function used to create an instance
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### تعبيرات الاستيراد الديناميكي

يمكن تحميل الوحدات شرطيًا أو تحميلها تحميلًا كسولًا عند الطلب باستخدام مقترح ECMAScript للاستيراد الديناميكي، وهو مدعوم في TypeScript.

تكون صياغة تعبيرات الاستيراد الديناميكي في TypeScript كما يلي:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Dynamic import
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

يُشغّل هذا الأمر مصرّف TypeScript مع المعامل `--watch`، مع إمكانية إعادة تصريف ملفات TypeScript تلقائيًا كلما عُدّلت.

```shell
tsc --watch
```

بدءًا من TypeScript الإصدار 4.9، تعتمد مراقبة الملفات أساسًا على أحداث نظام الملفات، وتلجأ تلقائيًا إلى الاستقصاء إذا تعذر إنشاء مراقب قائم على الأحداث.

### عامل التوكيد بعدم انعدام القيمة

عامل التوكيد بعدم انعدام القيمة (اللاحقة !)، الذي يُسمى أيضًا توكيدات الإسناد المحدد، هو ميزة في TypeScript تتيح لك تأكيد أن متغيرًا أو خاصية ليست null أو undefined، حتى إذا أشار تحليل TypeScript الساكن للأنواع إلى احتمال أن تكون كذلك. تتيح هذه الميزة إزالة أي فحص صريح.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### التصريحات ذات القيم الافتراضية

تُستخدم التصريحات ذات القيم الافتراضية عندما يُسنَد إلى متغير أو معامل قيمة افتراضية. ويعني ذلك أنه إذا لم تُقدّم قيمة لذلك المتغير أو المعامل، فستُستخدم القيمة الافتراضية بدلًا منها.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### التسلسل الاختياري

يعمل عامل التسلسل الاختياري `?.` مثل عامل النقطة العادي (`.`) للوصول إلى الخصائص أو التوابع. لكنه يتعامل بسلاسة مع قيم null أو undefined بإنهاء التعبير وإعادة `undefined` بدلًا من طرح خطأ.

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### عامل الدمج المنعدم

يعيد عامل الدمج المنعدم `??` قيمة الطرف الأيمن إذا كان الطرف الأيسر `null` أو `undefined`؛ وإلا فيعيد قيمة الطرف الأيسر.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### أنواع قوالب النصوص الحرفية

تتيح لك أنواع قوالب النصوص الحرفية معالجة قيم السلاسل النصية على مستوى النوع وإنشاء أنواع سلاسل نصية جديدة استنادًا إلى الأنواع الموجودة. وهي مفيدة لإنشاء أنواع أكثر تعبيرًا ودقة من العمليات القائمة على السلاسل النصية.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### التحميل الزائد للدوال

يتيح لك التحميل الزائد للدوال تعريف عدة تواقيع للدالة نفسها، لكل منها أنواع معاملات وأنواع إرجاع مختلفة.
عند استدعاء دالة محمّلة تحميلًا زائدًا، تستخدم TypeScript الوسائط المقدّمة لتحديد توقيع الدالة الصحيح:

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### الأنواع العودية

النوع العودي هو نوع يمكنه الإشارة إلى نفسه. وهذا مفيد لتعريف بُنى بيانات لها بنية هرمية أو عودية (قد يكون تداخلها غير منتهٍ)، مثل القوائم المرتبطة، والأشجار، والرسوم البيانية.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### الأنواع الشرطية العودية

يمكن تعريف علاقات أنواع معقدة باستخدام المنطق والعودية في TypeScript.
لنوضّح الأمر بعبارات بسيطة:

تتيح لك الأنواع الشرطية تعريف أنواع استنادًا إلى شروط منطقية:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

تعني العودية تعريف نوع يشير إلى نفسه داخل تعريفه:

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

تجمع الأنواع الشرطية العودية بين المنطق الشرطي والعودية. وهذا يعني أن تعريف نوع يمكن أن يعتمد على نفسه من خلال منطق شرطي، ما ينشئ علاقات أنواع معقدة ومرنة.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### دعم وحدات ECMAScript في Node

أضاف Node.js دعم وحدات ECMAScript بدءًا من الإصدار 15.3.0، وتدعم TypeScript وحدات ECMAScript في Node.js منذ الإصدار 4.7. يمكن تمكين هذا الدعم باستخدام الخاصية `module` بالقيمة `nodenext` في ملف tsconfig.json. إليك مثالًا:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

يدعم Node.js امتدادين لملفات الوحدات: `.mjs` لوحدات ES و`.cjs` لوحدات CommonJS. وامتدادا الملفات المكافئان في TypeScript هما `.mts` لوحدات ES و`.cts` لوحدات CommonJS. عندما يحوّل مصرّف TypeScript هذه الملفات إلى JavaScript، فإنه ينشئ ملفات `.mjs` و`.cjs`.

إذا كنت تريد استخدام وحدات ES في مشروعك، فيمكنك تعيين الخاصية `type` إلى "module" في ملف package.json. يطلب ذلك من Node.js التعامل مع المشروع على أنه مشروع وحدات ES.

بالإضافة إلى ذلك، تدعم TypeScript أيضًا تصريحات الأنواع في ملفات .d.ts. توفّر ملفات التصريحات هذه معلومات الأنواع للمكتبات أو الوحدات المكتوبة بلغة TypeScript، ما يتيح للمطورين الآخرين استخدامها مع ميزات فحص الأنواع والإكمال التلقائي في TypeScript.

### دوال التوكيد

في TypeScript، دوال التوكيد هي دوال تشير إلى التحقق من شرط محدد استنادًا إلى قيمة الإرجاع الخاصة بها. في أبسط صورها، تفحص دالة التوكيد مُسندًا مقدّمًا وتطرح خطأ عندما تكون نتيجة المُسند false.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

أو يمكن التصريح عنها كتعبير دالة:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

تتشابه دوال التوكيد مع حراس الأنواع. كان تقديم حراس الأنواع في الأصل لإجراء عمليات تحقق وقت التشغيل وضمان نوع قيمة ضمن نطاق محدد.
وبوجه خاص، حارس النوع هو دالة تقيّم مُسند نوع وتعيد قيمة منطقية تشير إلى ما إذا كان المُسند true أو false. وهذا يختلف قليلًا عن دوال التوكيد، إذ يكون القصد فيها طرح خطأ بدلًا من إعادة false عندما لا يتحقق المُسند.

مثال على حارس النوع:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### أنواع الصفوف متغيرة الطول

أنواع الصفوف متغيرة الطول هي ميزة أُضيفت في الإصدار 4.0 من TypeScript، لذا لنبدأ بمراجعة مفهوم الصف:

نوع الصف هو مصفوفة ذات طول محدد، ويكون نوع كل عنصر فيها معروفًا:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

يعني مصطلح "متغير الطول" عدد معاملات غير محدد (قبول عدد متغير من الوسائط).

الصف متغير الطول هو نوع صف يمتلك جميع الخصائص السابقة، لكن شكله الدقيق لم يُحدَّد بعد:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

يمكننا أن نرى في الشيفرة السابقة أن شكل الصف تحدده `T` العامة التي جرى تمريرها.

يمكن للصفوف متغيرة الطول قبول عدة أنواع عامة، مما يجعلها شديدة المرونة:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

مع الصفوف الجديدة متغيرة الطول، يمكننا استخدام ما يلي:

* يمكن الآن أن تكون عوامل النشر في صياغة نوع الصف عامة، ولذلك يمكننا تمثيل العمليات ذات الرتبة الأعلى على الصفوف والمصفوفات حتى عندما لا نعرف الأنواع الفعلية التي نتعامل معها.
* يمكن أن تظهر عناصر الباقي في أي موضع داخل الصف.

مثال:

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### الأنواع المُغلَّفة

تشير الأنواع المُغلَّفة إلى الكائنات المغلِّفة المستخدمة لتمثيل الأنواع الأولية في صورة كائنات. توفر هذه الكائنات المغلِّفة وظائف وأساليب إضافية غير متاحة مباشرةً على القيم الأولية.

عندما تصل إلى أسلوب مثل `charAt` أو `normalize` على قيمة أولية من النوع `string`، تغلفها JavaScript داخل كائن `String`، وتستدعي الأسلوب، ثم تتخلص من الكائن.

توضيح:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

تمثل TypeScript هذا الاختلاف بتوفير أنواع منفصلة للأنواع الأولية وأغلفة الكائنات المقابلة لها:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

لا تكون الأنواع المُغلَّفة مطلوبة عادةً. تجنب استخدامها واستعمل الأنواع الأولية بدلًا منها، مثل `string` بدلًا من `String`.

### التغاير والتغاير العكسي في TypeScript

يصف التغاير والتغاير العكسي كيفية تصرف علاقات الأنواع داخل الأنواع العامة.

في TypeScript:

* المصفوفات **متغايرة**، لكن هذا ليس آمنًا تمامًا من ناحية الأنواع.
* أنواع معاملات الدوال تكون:
  * **متغايرة عكسيًا** عند تفعيل `strictFunctionTypes`
  * **متغايرة في الاتجاهين** بخلاف ذلك

يعني التغاير أن العلاقة تبقى محفوظة: إذا كان النوع A نوعًا فرعيًا من النوع B، فإن `F<A>` يكون أيضًا نوعًا فرعيًا من `F<B>`. في TypeScript، يظهر هذا عادةً في أنواع الإرجاع وفي المصفوفات (مع أن تغاير المصفوفات ليس آمنًا تمامًا من ناحية الأنواع).

يعني التغاير العكسي أن العلاقة تنعكس: إذا كان النوع A نوعًا فرعيًا من النوع B، فإن `F<B>` يكون نوعًا فرعيًا من `F<A>`. في TypeScript، يُفترض أن تكون أنواع معاملات الدوال متغايرة عكسيًا، مما يعني إمكان استخدام دالة تقبل نوعًا أوسع حيث يُتوقع نوع أضيق.

لكن عمليًا، تسمح TypeScript غالبًا بالتغاير في الاتجاهين لمعاملات الدوال (ما لم يكن `strictFunctionTypes` مفعّلًا)، مما يعني إمكان قبول الاتجاهين حتى عندما لا يكون ذلك آمنًا تمامًا من ناحية الأنواع.

مثال: تخيل مساحة لجميع الحيوانات ومساحة منفصلة للكلاب فقط.

* **التغاير**:  
  يمكنك استخدام "مساحة كلاب" حيث يُتوقع وجود "مساحة حيوانات"، لأن جميع الكلاب حيوانات.  
  لكن لا يمكنك استخدام "مساحة حيوانات" حيث يُتوقع وجود "مساحة كلاب"، لأنها قد تحتوي على حيوانات ليست كلابًا.

* **التغاير العكسي** (فكر من منظور الدوال):  
  إذا كان لديك شيء يمكنه التعامل مع **أي حيوان**، فيمكنك استخدامه حيث يُتوقع شيء يتعامل مع **الكلاب فقط**.  
  لكن العكس غير صحيح.

مثال على التغاير:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Arrays are covariant in TypeScript (but not type-safe)
animals = dogs; // allowed
dogs = animals; // error
```

مثال على التغاير العكسي:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Intended contravariance:
feedDog = feedAnimal; // safe

// This depends on compiler settings:
feedAnimal = feedDog; // error only with strictFunctionTypes
```

#### تعليقات التغاير الاختيارية لمعاملات الأنواع

بدءًا من TypeScript 4.7.0، يمكننا استخدام الكلمتين المفتاحيتين `out` و`in` لتحديد تعليقات التغاير.

للتغاير، استخدم الكلمة المفتاحية `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

وللتغاير العكسي، استخدم الكلمة المفتاحية `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### تواقيع الفهرس ذات أنماط السلاسل القالبية

تتيح لنا تواقيع الفهرس ذات أنماط السلاسل القالبية تعريف تواقيع فهرس مرنة باستخدام أنماط السلاسل القالبية. تمكّننا هذه الميزة من إنشاء كائنات يمكن فهرستها باستخدام أنماط محددة من المفاتيح النصية، مما يوفر مزيدًا من التحكم والدقة عند الوصول إلى الخصائص ومعالجتها.

تسمح TypeScript، بدءًا من الإصدار 4.4، بتواقيع الفهرس للرموز وأنماط السلاسل القالبية.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### المعامل satisfies

يتيح لك المعامل `satisfies` التحقق مما إذا كان نوع معين يفي بواجهة أو شرط محدد. بعبارة أخرى، يضمن أن النوع يمتلك جميع الخصائص والأساليب المطلوبة لواجهة معينة. وهو طريقة للتأكد من أن متغيرًا يطابق تعريف نوع.
إليك مثالًا:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// In the following lines, TypeScript won't be able to infer properly
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion using `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Here too, TypeScript won't be able to infer properly
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Using the `satisfies` operator we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### عمليات الاستيراد والتصدير الخاصة بالأنواع فقط

تتيح لك عمليات الاستيراد والتصدير الخاصة بالأنواع فقط استيراد الأنواع أو تصديرها دون استيراد أو تصدير القيم أو الدوال المرتبطة بتلك الأنواع. قد يفيد ذلك في تقليل حجم حزمتك.

لاستخدام عمليات الاستيراد الخاصة بالأنواع فقط، يمكنك استخدام الكلمة المفتاحية `import type`.

تسمح TypeScript باستخدام امتدادات ملفات التعريف والتنفيذ معًا (.ts و.mts و.cts و.tsx) في عمليات الاستيراد الخاصة بالأنواع فقط، بصرف النظر عن إعدادات `allowImportingTsExtensions`.

على سبيل المثال:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

الصيغ التالية مدعومة:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### تصريح using والإدارة الصريحة للموارد

تصريح `using` هو ارتباط غير قابل للتغيير ضمن نطاق كتلة، ويشبه `const`، ويُستخدم لإدارة الموارد القابلة للتخلص منها. عند تهيئته بقيمة، يُسجَّل أسلوب `Symbol.dispose` الخاص بتلك القيمة ثم يُنفَّذ عند الخروج من نطاق الكتلة المحيطة.

يعتمد ذلك على ميزة إدارة الموارد في ECMAScript، وهي مفيدة لتنفيذ مهام التنظيف الأساسية بعد إنشاء الكائن، مثل إغلاق الاتصالات وحذف الملفات وتحرير الذاكرة.

ملاحظات:

* نظرًا إلى إضافتها حديثًا في الإصدار 5.2 من TypeScript، تفتقر معظم بيئات التشغيل إلى الدعم الأصلي. ستحتاج إلى إضافات توافق من أجل: `Symbol.dispose` و`Symbol.asyncDispose` و`DisposableStack` و`AsyncDisposableStack` و`SuppressedError`.
* بالإضافة إلى ذلك، ستحتاج إلى تهيئة tsconfig.json على النحو التالي:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

مثال:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polyfill

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Resource is declared
    console.log(2);
} // Resource is disposed (e.g., `work[Symbol.dispose]()` is evaluated)

console.log(3);
```

ستطبع الشيفرة ما يلي:

```shell
1
2
disposed
3
```

يجب أن يلتزم المورد المؤهل للتخلص منه بواجهة `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

تسجل تصريحات `using` عمليات التخلص من الموارد في مكدس، مما يضمن التخلص منها بترتيب عكسي لترتيب التصريح:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

يُضمن التخلص من الموارد حتى إذا وقع استثناء أو جرى تنفيذ شيفرة لاحقة. قد يؤدي هذا إلى احتمال أن تطرح عملية التخلص استثناءً قد يكبت استثناءً آخر. وللاحتفاظ بمعلومات عن الأخطاء المكبوتة، أُضيف استثناء أصلي جديد هو `SuppressedError`.

#### تصريح await using

يتعامل تصريح `await using` مع مورد قابل للتخلص منه بصورة غير متزامنة. يجب أن تحتوي القيمة على أسلوب `Symbol.asyncDispose`، وستُنتظر نتيجته عند نهاية الكتلة.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

لكي يكون المورد قابلًا للتخلص منه بصورة غير متزامنة، يجب أن يلتزم بواجهة `Disposable` أو `AsyncDisposable`:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polyfill

class DatabaseConnection implements AsyncDisposable {
    // A method that is called when the object is disposed asynchronously
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Create a new connection and dispose it asynchronously when it goes out of scope
    await using connection = new DatabaseConnection(); //  Resource is declared
    console.log('Doing some work...');
} // Resource is disposed (e.g., `await connection[Symbol.asyncDispose]()` is evaluated)

doWork();
```

تطبع الشيفرة ما يلي:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

يُسمح باستخدام تصريحي `using` و`await using` في العبارات: `for` و`for-in` و`for-of` و`for-await-of` و`switch`.

### سمات الاستيراد

تخبر سمات الاستيراد في TypeScript 5.3 (تسميات لعمليات الاستيراد) بيئة التشغيل بكيفية التعامل مع الوحدات (JSON وغيرها). يعزز ذلك الأمان من خلال ضمان وضوح عمليات الاستيراد، ويتوافق مع سياسة أمان المحتوى (CSP) من أجل تحميل الموارد بأمان أكبر. تضمن TypeScript صلاحيتها، لكنها تترك لبيئة التشغيل تفسيرها من أجل التعامل المحدد مع الوحدات.

مثال:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

مع الاستيراد الديناميكي:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### التحقق من صياغة التعبيرات النمطية

بدءًا من TypeScript 5.5.4، تتحقق TypeScript من القيم الحرفية للتعبيرات النمطية بحثًا عن الأخطاء الشائعة في وقت الترجمة (مثل الصياغة غير الصالحة والمراجع الخلفية الخاطئة والميزات غير المدعومة في إصدار JavaScript المستهدف). يساعد ذلك في اكتشاف الأخطاء مبكرًا، لكنه لا يتحقق من سلاسل new RegExp("...").

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

يتيح لك `import defer` تحميل وحدة مع تأخير تنفيذها إلى أن تستخدم شيئًا منها فعليًا. يساعد ذلك على تجنب العمل والآثار الجانبية غير الضرورية.

* يعمل فقط مع: `import defer * as name from "module"`
* لا تُنفَّذ الشيفرة إلا عند الوصول إلى أحد التصديرات
