# استكشاف نظام الأنواع



### خدمة لغة TypeScript

تقدم خدمة لغة TypeScript، المعروفة أيضًا باسم tsserver، ميزات متعددة مثل الإبلاغ عن الأخطاء، والتشخيصات، والتصريف عند الحفظ، وإعادة التسمية، والانتقال إلى التعريف، وقوائم الإكمال، والمساعدة الخاصة بالتواقيع، وغيرها. وتستخدمها أساسًا بيئات التطوير المتكاملة (IDEs) لتوفير دعم IntelliSense. وهي تتكامل بسلاسة مع Visual Studio Code وتستخدمها أدوات مثل Conquer of Completion (Coc).

يمكن للمطوّرين الاستفادة من واجهة API مخصصة وإنشاء إضافاتهم الخاصة والمخصصة لخدمة اللغة لتحسين تجربة تحرير TypeScript. وقد يكون ذلك مفيدًا على نحو خاص لتنفيذ ميزات تدقيق خاصة أو لتمكين الإكمال التلقائي للغة قوالب مخصصة.

<!-- markdownlint-disable MD044 -->
من الأمثلة الواقعية على الإضافات المخصصة "typescript-styled-plugin"، التي توفر الإبلاغ عن أخطاء بناء الجملة ودعم IntelliSense لخصائص CSS في المكونات المنسّقة.
<!-- markdownlint-enable MD044 -->

لمزيد من المعلومات وأدلة البدء السريع، يمكنك الرجوع إلى ويكي TypeScript الرسمية على GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### التنميط البنيوي

تعتمد TypeScript على نظام أنواع بنيوي. وهذا يعني أن توافق الأنواع وتكافؤها يتحددان من خلال البنية أو التعريف الفعلي للنوع، وليس اسمه أو موضع إعلانه، كما في أنظمة الأنواع الاسمية مثل C# أو C.

صُمم نظام الأنواع البنيوي في TypeScript استنادًا إلى طريقة عمل نظام التنميط الديناميكي القائم على التوافق البنيوي في JavaScript أثناء وقت التشغيل.

المثال التالي هو شيفرة TypeScript صالحة. وكما تلاحظ، يحتوي "X" و"Y" على العضو نفسه "a"، رغم اختلاف اسمي التصريح عنهما. تتحدد الأنواع من خلال بنيتها، وفي هذه الحالة، بما أن البنيتين متماثلتان، فهما متوافقتان وصالحتان.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // صحيح
```

### قواعد المقارنة الأساسية في TypeScript

عملية المقارنة في TypeScript تعاودية وتُنفذ على الأنواع المتداخلة في أي مستوى.

يكون النوع "X" متوافقًا مع "Y" إذا كان "Y" يحتوي على الأقل على أعضاء "X" نفسها.

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // صحيح، لأنه يحتوي على الأقل على الأعضاء نفسها الموجودة في X
const r: X = y;
```

تُقارن معاملات الدوال حسب أنواعها، وليس حسب أسمائها:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // صحيح
x = y; // صحيح
```

يجب أن تكون أنواع إرجاع الدوال متماثلة:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // غير صحيح
x = y; // غير صحيح
```

يجب أن يكون نوع إرجاع الدالة المصدر نوعًا فرعيًا من نوع إرجاع الدالة الهدف:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // صحيح
y = x; // غير صحيح، العضو b مفقود
```

يُسمح بتجاهل معاملات الدوال، إذ إنها ممارسة شائعة في JavaScript، مثل استخدام "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

وبالتالي، تكون تصريحات الأنواع التالية صالحة تمامًا:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // المعامل b مفقود
y = x; // صحيح
```

تكون أي معاملات اختيارية إضافية في النوع المصدر صالحة:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // صحيح
x = y; //صحيح
```

تُعد أي معاملات اختيارية في النوع الهدف لا تقابلها معاملات في النوع المصدر صالحة، ولا تمثل خطأ:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // صحيح
x = y; // صحيح
```

يُعامل معامل البقية كسلسلة لا نهائية من المعاملات الاختيارية:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //صحيح
```

تكون الدوال ذات الأحمال الزائدة صالحة إذا كان توقيع الحمل الزائد متوافقًا مع توقيع تنفيذها:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // صحيح
x('a', 1); // صحيح

function y(a: string): void; // غير صحيح، غير متوافق مع توقيع التنفيذ
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

تنجح مقارنة معاملات الدوال إذا كان من الممكن إسناد المعاملات المصدر والهدف إلى الأنواع الفائقة أو الأنواع الفرعية (التباين الثنائي).

```typescript
// نوع أعلى
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// نوع فرعي
class Y extends X {}
// نوع فرعي
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// التغاير ثنائي الاتجاه يقبل الأنواع الأعلى
console.log(getA(new X('x'))); // صحيح
console.log(getA(new Y('Y'))); // صحيح
console.log(getA(new Z('z'))); // صحيح
```

يمكن مقارنة التعدادات بالأرقام والعكس صحيح ويكون ذلك صالحًا، لكن مقارنة قيم تعداد من أنواع تعداد مختلفة غير صالحة.

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
const xa: number = X.A; // صحيح
const ya: Y = 0; // صحيح
X.A === Y.A; // غير صحيح
```

تخضع مثيلات الصنف لفحص توافق أعضائها الخاصة والمحمية:

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

let x: X = new Y('y'); // غير صحيح
```

لا يأخذ فحص المقارنة في الحسبان اختلاف التسلسل الهرمي للوراثة، على سبيل المثال:

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
x === y; // صحيح
x === z; // صحيح حتى لو كان z من تسلسل وراثة مختلف
```

تُقارن الأنواع العامة باستخدام بنيتها استنادًا إلى النوع الناتج بعد تطبيق معامل النوع العام، ولا يُقارن إلا الناتج النهائي بوصفه نوعًا غير عام.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // غير صحيح لأن وسيط النوع يُستخدم في البنية النهائية
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // صحيح لأن وسيط النوع لا يُستخدم في البنية النهائية
```

عندما لا يُحدَّد وسيط النوع للأنواع العامة، تُعامل جميع الوسائط غير المحددة على أنها من النوع "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // صحيح
```

تذكّر:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // صحيح، يمكن إسناد كل شيء إلى نفسه

let c: any;
c = 1; // صحيح، يمكن إسناد جميع الأنواع إلى any

let d: unknown;
d = 1; // صحيح، يمكن إسناد جميع الأنواع إلى unknown

let e: unknown;
let e1: unknown = e; // صحيح، لا يمكن إسناد unknown إلا إلى نفسه وإلى any
let e2: any = e; // صحيح
let e3: number = e; // غير صحيح

let f: never;
f = 1; // غير صحيح، لا يمكن إسناد أي شيء إلى never

let g: void;
let g1: any;
g = 1; // غير صحيح، لا يمكن الإسناد من void أو إليه باستثناء any
g = g1; // صحيح
```

يرجى ملاحظة أنه عند تفعيل "strictNullChecks"، يُعامل "null" و"undefined" على نحو مماثل لـ "void"؛ وإلا فيُعاملان على نحو مماثل لـ "never".

### الأنواع بوصفها مجموعات

في TypeScript، النوع هو مجموعة من القيم الممكنة. ويُشار إلى هذه المجموعة أيضًا باسم مجال النوع. ويمكن النظر إلى كل قيمة من نوع ما على أنها عنصر في مجموعة. ويحدد النوع القيود التي يجب أن يستوفيها كل عنصر في المجموعة حتى يُعد عضوًا فيها.
تتمثل المهمة الأساسية لـ TypeScript في فحص ما إذا كانت إحدى المجموعات مجموعة جزئية من أخرى والتحقق من ذلك.

تدعم TypeScript أنواعًا مختلفة من المجموعات:

| مصطلح المجموعة | TypeScript                      | ملاحظات                                                                                                                  |
| --------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| المجموعة الخالية | never                           | لا يحتوي "never" على أي شيء باستثناء نفسه                                                                              |
| مجموعة أحادية العنصر | undefined / null / literal type |                                                                                                                          |
| مجموعة منتهية   | boolean / union                 |                                                                                                                          |
| مجموعة غير منتهية | string / number / object        |                                                                                                                          |
| المجموعة الشاملة | any / unknown                   | كل عنصر عضو في "any" وكل مجموعة مجموعة جزئية منه / يُعد "unknown" النظير الآمن من حيث الأنواع لـ "any"                 |

فيما يلي بعض الأمثلة:

| TypeScript            | مصطلح المجموعة               | مثال                                                                            |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (المجموعة الخالية)         | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                              |
| Literal type          | مجموعة أحادية العنصر         | type X = 'X';                                                                   |
|                       |                              | type Y = 7;                                                                     |
|                       |                              |
| Value assignable to T | القيمة ∈ T (عضو في)          | type XY = 'X' \| 'Y';                                                           |
|                       |                              | const x: XY = 'X';                                                              |
|                       |                              |
| T1 assignable to T2   | T1 ⊆ T2 (مجموعة جزئية من)    | type XY = 'X' \| 'Y';                                                           |
|                       |                              | const x: XY = 'X';                                                              |
|                       |                              | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                              |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (مجموعة جزئية من)    | type X = 'X' extends string ? true : false;                                     |
|                       |                              |
| T1 \| T2              | T1 ∪ T2 (اتحاد)              | type XY = 'X' \| 'Y';                                                           |
|                       |                              | type JK = 1 \| 2;                                                               |
|                       |                              |
| T1 & T2               | T1 ∩ T2 (تقاطع)              | type X = \{ a: string \}                                                        |
|                       |                              | type Y = \{ b: string \}                                                        |
|                       |                              | type XY = X & Y                                                                 |
|                       |                              | const x: XY = \{ a: 'a', b: 'b' \}                                              |
|                       |                              |
| unknown               | المجموعة الشاملة             | const x: unknown = 1                                                            |

ينشئ الاتحاد، (T1 | T2)، مجموعة أوسع (كلاهما):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // صحيح
```

ينشئ التقاطع، (T1 & T2)، مجموعة أضيق (المشترك فقط):

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
const r: XY = { a: 'a' }; // غير صحيح
const j: XY = { a: 'a', b: 'b' }; // صحيح
```

يمكن اعتبار الكلمة المفتاحية `extends` بمعنى "مجموعة جزئية من" في هذا السياق. فهي تضع قيدًا لنوع ما. وعندما تُستخدم `extends` مع نوع عام، فإنها تقيّد معامل النوع العام بنوع أكثر تحديدًا.

يرجى ملاحظة أن `extends` هنا لا علاقة لها بوراثة الأصناف بمعنى البرمجة كائنية التوجه.

تتعامل TypeScript مع الأنواع البنيوية، وليس لديها تسلسل هرمي اسمي صارم. وفي الواقع، كما في المثال أدناه، يمكن أن يتداخل نوعان من دون أن يكون أي منهما نوعًا فرعيًا للآخر، لأن TypeScript تأخذ بنية الكائنات أو شكلها في الحسبان.

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

const r: Z1 = z; // صحيح
```

### إسناد نوع: تصريحات الأنواع وتوكيدات الأنواع

يمكن إسناد نوع بطرق مختلفة في TypeScript:

#### تصريح النوع

في المثال التالي، نستخدم `x: X` (أي: `Type`) للتصريح بنوع المتغير x.

```typescript
type X = {
    a: string;
};

// تصريح نوع
const x: X = {
    a: 'a',
};
```

إذا لم يكن المتغير بالتنسيق المحدد، فستبلغ TypeScript عن خطأ. على سبيل المثال:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // خطأ: لا يمكن للكائن الحرفي تحديد سوى الخصائص المعروفة
};
```

#### توكيد النوع

يمكن إضافة توكيد باستخدام الكلمة المفتاحية `as`. يخبر هذا المصرّف بأن لدى المطوّر معلومات أكثر عن النوع، ويمنع ظهور أي أخطاء قد تحدث.

على سبيل المثال:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

في المثال أعلاه، يُؤكَّد أن الكائن x من النوع X باستخدام الكلمة المفتاحية as. ويُعلم ذلك مصرّف TypeScript بأن الكائن يتوافق مع النوع المحدد، رغم احتوائه على الخاصية الإضافية b غير الموجودة في تعريف النوع.

تكون توكيدات الأنواع مفيدة في الحالات التي يلزم فيها تحديد نوع أكثر تخصيصًا، ولا سيما عند العمل مع DOM. على سبيل المثال:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

هنا، يُستخدم توكيد النوع as HTMLInputElement لإخبار TypeScript بأن نتيجة getElementById ينبغي أن تُعامل على أنها HTMLInputElement.
يمكن أيضًا استخدام توكيدات الأنواع لإعادة تعيين المفاتيح، كما هو موضح في المثال أدناه باستخدام القوالب النصية:

```typescript
type J<Type> = {
    [
        Property in keyof Type as `prefix_${string & Property}`
    ]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

في هذا المثال، يستخدم النوع `J<Type>` نوعًا معيّنًا مع قالب نصي لإعادة تعيين مفاتيح Type. وينشئ خصائص جديدة يُضاف إليها "prefix_" في بداية كل مفتاح منها، وتكون قيمها المقابلة دوال تُرجع قيم الخصائص الأصلية.

تجدر الإشارة إلى أن TypeScript لن تنفذ فحص الخصائص الزائدة عند استخدام توكيد النوع. لذلك، يُفضّل عمومًا استخدام تصريح النوع عندما تكون بنية الكائن معروفة مسبقًا.

#### التصريحات المحيطية

التصريحات المحيطية هي ملفات تصف أنواع شيفرة JavaScript، ويكون تنسيق اسم الملف الخاص بها `.d.ts`. وعادةً ما تُستورد وتُستخدم لإضافة تعليقات توضيحية إلى مكتبات JavaScript الموجودة أو لإضافة أنواع إلى ملفات JS الموجودة في مشروعك.

يمكن العثور على أنواع العديد من المكتبات الشائعة في:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

ويمكن تثبيتها باستخدام:

```shell
npm install --save-dev @types/library-name
```

بالنسبة إلى التصريحات المحيطية التي عرّفتها، يمكنك الاستيراد باستخدام مرجع "الشرطات الثلاث":

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

يمكنك استخدام التصريحات المحيطية حتى داخل ملفات JavaScript باستخدام `// @ts-check`.

تتيح الكلمة المفتاحية `declare` تعريف الأنواع لشيفرة JavaScript موجودة من دون استيرادها، وتعمل بوصفها عنصرًا نائبًا للأنواع الواردة من ملف آخر أو المتاحة عموميًا.

### فحص الخصائص وفحص الخصائص الزائدة

تعتمد TypeScript على نظام أنواع بنيوي، لكن فحص الخصائص الزائدة هو إحدى ميزاتها التي تتيح لها التحقق مما إذا كان الكائن يحتوي على الخصائص المحددة في النوع بدقة.

يُجرى فحص الخصائص الزائدة عند إسناد الكائنات الحرفية إلى متغيرات، أو عند تمريرها بوصفها وسائط إلى دالة، مثلًا.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // صحيح بفضل نظام الأنواع البنيوي
const w: X = { a: 'a', b: 'b' }; // غير صحيح بسبب فحص الخصائص الزائدة
```

### الأنواع الضعيفة

يُعد النوع ضعيفًا عندما لا يحتوي إلا على مجموعة من الخصائص الاختيارية بالكامل:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

تعد TypeScript إسناد أي شيء إلى نوع ضعيف خطأً عندما لا يوجد أي تداخل؛ فعلى سبيل المثال، يؤدي ما يلي إلى ظهور خطأ:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // غير صحيح
```

رغم أن ذلك غير موصى به، يمكن عند الحاجة تجاوز هذا الفحص باستخدام توكيد النوع:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // صحيح
```

أو بإضافة `unknown` إلى توقيع الفهرس في النوع الضعيف:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // صحيح
```

### الفحص الصارم للكائنات الحرفية (الحداثة)

الفحص الصارم للكائنات الحرفية، الذي يُشار إليه أحيانًا باسم "الحداثة"، هو ميزة في TypeScript تساعد على اكتشاف الخصائص الزائدة أو المكتوبة إملائيًا بصورة خاطئة، التي قد تمر دون ملاحظة في فحوص الأنواع البنيوية المعتادة.

عند إنشاء كائن حرفي، يعدّه مصرّف TypeScript "حديثًا". وإذا أُسند الكائن الحرفي إلى متغير أو مُرِّر بوصفه معاملًا، فستطرح TypeScript خطأً إذا حدد الكائن الحرفي خصائص غير موجودة في النوع الهدف.

لكن "الحداثة" تختفي عند توسيع كائن حرفي أو استخدام توكيد النوع.

فيما يلي بعض الأمثلة للتوضيح:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // فحص الحداثة: إسناد غير صحيح
var y: Y;
y = { a: 'a', bx: 'bx' }; // فحص الحداثة: إسناد غير صحيح

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // توسيع النوع: لا أخطاء، الأنواع متوافقة بنيويًا

fn({ a: 'a', bx: 'b' }); // فحص الحداثة: وسيط غير صحيح

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // توسيع النوع: لا يوجد فحص للحداثة
```

### استدلال الأنواع

يمكن لـ TypeScript استدلال الأنواع عند عدم توفير تعليق توضيحي في أثناء:

* تهيئة المتغير.
* تهيئة العضو.
* تعيين القيم الافتراضية للمعاملات.
* نوع إرجاع الدالة.

على سبيل المثال:

```typescript
let x = 'x'; // النوع المستنتج هو string
```

يحلل مصرّف TypeScript القيمة أو التعبير، ويحدد نوعه استنادًا إلى المعلومات المتاحة.

### استدلالات أكثر تقدمًا

عند استخدام عدة تعبيرات في استدلال الأنواع، تبحث TypeScript عن "أفضل الأنواع المشتركة". على سبيل المثال:

```typescript
let x = [1, 'x', 1, null]; // النوع المستنتج هو: (string | number | null)[]
```

إذا لم يتمكن المصرّف من العثور على أفضل الأنواع المشتركة، فإنه يعيد نوع اتحاد. على سبيل المثال:

```typescript
let x = [new RegExp('x'), new Date()]; // النوع المستنتج هو: (RegExp | Date)[]
```

تستخدم TypeScript "التنميط السياقي" استنادًا إلى موضع المتغير لاستدلال الأنواع. في المثال التالي، يعرف المصرّف أن `e` من النوع `MouseEvent` بسبب نوع الحدث `click` المعرّف في الملف lib.d.ts، الذي يحتوي على تصريحات محيطية لمختلف بُنى JavaScript الشائعة وDOM:

```typescript
window.addEventListener('click', function (e) {}); // النوع المستنتج للمتغير e هو MouseEvent
```

### توسيع النوع

توسيع الأنواع هو العملية التي تُسند فيها TypeScript نوعًا إلى متغير جرت تهيئته من دون تعليق توضيحي للنوع. ويسمح بالانتقال من الأنواع الضيقة إلى الأوسع، لا العكس.
في المثال التالي:

<!-- skip -->
```typescript
let x = 'x'; // يستنتج TypeScript النوع string، وهو نوع واسع
let y: 'y' | 'x' = 'y'; // نوع y هو اتحاد أنواع حرفية
y = x; // غير صحيح: لا يمكن إسناد النوع 'string' إلى النوع '"x" | "y"'.
```

تُسند TypeScript النوع `string` إلى `x` استنادًا إلى القيمة الوحيدة المقدمة أثناء التهيئة (`x`)، وهذا مثال على التوسيع.

توفر TypeScript طرقًا للتحكم في عملية التوسيع، مثل استخدام "const".

### Const

يؤدي استخدام الكلمة المفتاحية `const` عند التصريح عن متغير إلى استدلال نوع أضيق في TypeScript.

على سبيل المثال:

```typescript
const x = 'x'; // يستنتج TypeScript أن نوع x هو 'x'، وهو نوع أضيق
let y: 'y' | 'x' = 'y';
y = x; // صحيح: النوع المستنتج للمتغير x هو 'x'
```

باستخدام `const` للتصريح عن المتغير x، يُضيّق نوعه إلى القيمة الحرفية المحددة 'x'. وبما أن نوع x قد ضُيّق، فيمكن إسناده إلى المتغير y من دون أي خطأ.
والسبب في إمكان استدلال النوع هو أن متغيرات `const` لا يمكن إعادة الإسناد إليها، ولذلك يمكن تضييق نوعها إلى نوع حرفي محدد؛ وفي هذه الحالة، النوع الحرفي 'x'.

#### معدِّل Const على معاملات الأنواع

اعتبارًا من الإصدار 5.0 من TypeScript، يمكن تحديد السمة `const` على معامل نوع عام. ويسمح ذلك باستدلال أدق نوع ممكن. لنرَ مثالًا من دون استخدام `const`:

```typescript
function identity<T>(value: T) {
    // لا يوجد const هنا
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // النوع المستنتج هو: { a: string; b: string; }
```

كما ترى، يُستدل على أن الخاصيتين `a` و`b` من النوع `string`.

والآن، لنرَ الفرق مع إصدار `const`:

```typescript
function identity<const T>(value: T) {
    // استخدام المعدّل const مع معاملات النوع
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // النوع المستنتج هو: { a: "a"; b: "b"; }
```

يمكننا الآن ملاحظة أن الخاصيتين `a` و`b` تُستنتجان بوصفهما قيمتين نصيتين حرفيتين بدلًا من مجرد نوعي `string`.

#### توكيد Const

تتيح لك هذه الميزة إعلان متغير بنوع حرفي أكثر دقة استنادًا إلى قيمة تهيئته، ما يشير للمصرّف إلى أن القيمة ينبغي أن تُعامل بوصفها قيمة حرفية غير قابلة للتغيير. وفيما يلي بعض الأمثلة:

على خاصية واحدة:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

على كائن كامل:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

يمكن أن يكون هذا مفيدًا بصورة خاصة عند تعريف نوع tuple:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // صف readonly [1, 2, 3]
```

### التعليق التوضيحي الصريح للنوع

يمكننا أن نكون محددين ونمرر نوعًا. في المثال التالي، الخاصية `x` من النوع `number`:

```typescript
const v = {
    x: 1, // النوع المستنتج: number (توسيع)
};
v.x = 3; // صحيح
```

يمكننا جعل التعليق التوضيحي للنوع أكثر تحديدًا باستخدام اتحاد من الأنواع الحرفية:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // نوع x الآن اتحاد أنواع حرفية: 1 | 2 | 3
};
v.x = 3; // صحيح
v.x = 100; // غير صحيح
```

### تضييق النوع

تضييق الأنواع هو العملية التي يُضيّق فيها نوع عام إلى نوع أكثر تحديدًا في TypeScript. ويحدث ذلك عندما تحلل TypeScript الشيفرة وتحدد أن شروطًا أو عمليات معينة يمكنها تحسين معلومات النوع.

يمكن أن يحدث تضييق الأنواع بطرق مختلفة، منها:

#### الشروط

باستخدام العبارات الشرطية، مثل `if` أو `switch`، يمكن لـ TypeScript تضييق النوع استنادًا إلى نتيجة الشرط. على سبيل المثال:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // النوع هو number، وقد ضُيّق بواسطة الشرط
}
```

#### طرح استثناء أو الإرجاع

يمكن استخدام طرح خطأ أو الإرجاع المبكر من فرع لمساعدة TypeScript على تضييق النوع. على سبيل المثال:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

تشمل الطرق الأخرى لتضييق الأنواع في TypeScript ما يلي:

* المعامل `instanceof`: يُستخدم للتحقق مما إذا كان كائن ما مثيلًا لصنف محدد.
* المعامل `in`: يُستخدم للتحقق مما إذا كانت خاصية موجودة في كائن.
* المعامل `typeof`: يُستخدم للتحقق من نوع قيمة في وقت التشغيل.
* الدوال المضمّنة مثل `Array.isArray()`: تُستخدم للتحقق مما إذا كانت القيمة مصفوفة.

#### الاتحاد المميَّز

يُعد استخدام "الاتحاد المميَّز" نمطًا في TypeScript تُضاف فيه "علامة" صريحة إلى الكائنات للتمييز بين الأنواع المختلفة داخل اتحاد. ويُشار إلى هذا النمط أيضًا باسم "الاتحاد الموسوم". في المثال التالي، تمثل الخاصية "type" هذه "العلامة":

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // النوع هو A
        case 'type_b':
            return input.value + 'extra'; // النوع هو B
    }
};
```

#### حراس الأنواع المعرَّفة من قِبل المستخدم

في الحالات التي لا تتمكن فيها TypeScript من تحديد نوع، يمكن كتابة دالة مساعدة تُعرف باسم "حارس نوع معرَّف من قِبل المستخدم". في المثال التالي، سنستخدم مُسنَد نوع لتضييق النوع بعد تطبيق عملية تصفية معينة:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // النوع هو (string | null)[]، لم يتمكن TypeScript من استنتاج النوع بشكل صحيح

const isValid = (item: string | null): item is string => item !== null; // حارس نوع مخصص

const r2 = data.filter(isValid); // النوع صحيح الآن وهو string[]، إذ تمكنا من تضييق النوع باستخدام حارس نوع ذي مسند
```

#### التضييق باستخدام Switch-true

تضيف TypeScript 5.3 التضييق باستخدام switch-true، ما يتيح لك استبدال سلاسل if/else الفوضوية بـ switch (true) باستخدام شروط منطقية. ويحسن ذلك قابلية القراءة مع استمرار تضييق الأنواع. وهو يشبه مطابقة الأنماط، لكنه أبسط.

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

