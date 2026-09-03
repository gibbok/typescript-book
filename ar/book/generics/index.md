# الأنواع العامة



تتيح لك الأنواع العامة إنشاء مكوّنات ودوال قابلة لإعادة الاستخدام يمكنها العمل مع أنواع متعددة. وباستخدام الأنواع العامة، يمكنك تحديد معاملات للأنواع والدوال والواجهات، مما يتيح لها العمل على أنواع مختلفة من دون تحديدها صراحةً مسبقًا.

تتيح لك الأنواع العامة جعل الشيفرة أكثر مرونة وقابلية لإعادة الاستخدام.

### النوع العام

لتعريف نوع عام، تستخدم قوسين زاويين (`<>`) لتحديد معاملات النوع، على سبيل المثال:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### الأصناف العامة

يمكن أيضًا تطبيق الأنواع العامة على الأصناف، وبهذه الطريقة يمكنها العمل مع أنواع متعددة باستخدام معاملات النوع. وهذا مفيد لإنشاء تعريفات أصناف قابلة لإعادة الاستخدام، يمكنها التعامل مع أنواع بيانات مختلفة مع الحفاظ على أمان الأنواع.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### قيود الأنواع العامة

يمكن تقييد المعاملات العامة باستخدام الكلمة المفتاحية `extends` متبوعةً بنوع أو واجهة يجب أن يستوفيها معامل النوع.

في المثال التالي، يجب أن تكون لدى `T` خاصية `length` ذات نوع صحيح حتى تكون صالحة:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

إحدى الميزات البارزة للأنواع العامة التي قُدّمت في الإصدار 3.4 RC هي استدلال أنواع الدوال ذات الرتبة الأعلى، الذي ينشر وسائط الأنواع العامة:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

تُسهّل هذه الوظيفة البرمجة بأسلوب pointfree الآمن من ناحية الأنواع، وهو أسلوب شائع في البرمجة الوظيفية.

### التضييق السياقي للأنواع العامة

التضييق السياقي للأنواع العامة هو الآلية التي تتيح لمصرّف TypeScript تضييق نوع معامل عام استنادًا إلى السياق الذي يُستخدم فيه. ويكون مفيدًا عند العمل مع الأنواع العامة في العبارات الشرطية:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

