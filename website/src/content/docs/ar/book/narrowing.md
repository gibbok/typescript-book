---
title: التضييق
sidebar:
  order: 21
  label: 21. التضييق
---


تضييق الأنواع في TypeScript هو عملية تنقيح نوع متغير داخل كتلة شرطية. ويفيد ذلك عند التعامل مع أنواع الاتحاد، حيث يمكن أن يكون للمتغير أكثر من نوع واحد.

يتعرّف TypeScript على عدة طرائق لتضييق النوع:

### حراس الأنواع باستخدام typeof

حارس النوع typeof هو حارس نوع محدد في TypeScript يتحقق من نوع متغير استنادًا إلى نوع JavaScript المضمّن الخاص به.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### التضييق بحسب الصدقية

يعمل التضييق بحسب الصدقية في TypeScript من خلال التحقق مما إذا كان المتغير صادقًا أم زائفًا لتضييق نوعه وفقًا لذلك.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### التضييق بحسب المساواة

يعمل التضييق بحسب المساواة في TypeScript من خلال التحقق مما إذا كان المتغير يساوي قيمة محددة أم لا، لتضييق نوعه وفقًا لذلك.

يُستخدم بالتزامن مع عبارات `switch` ومعاملات المساواة مثل `===` و`!==` و`==` و`!=` لتضييق الأنواع.

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true;
        case 'error':
            return null;
    }
};
```

### التضييق باستخدام المعامل In

التضييق باستخدام المعامل `in` في TypeScript هو طريقة لتضييق نوع متغير استنادًا إلى وجود خاصية ضمن نوع المتغير.

```typescript
type Dog = {
    name: string;
    breed: string;
};

type Cat = {
    name: string;
    likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
    if ('breed' in pet) {
        return 'dog';
    } else {
        return 'cat';
    }
};
```

### التضييق باستخدام instanceof

التضييق باستخدام المعامل `instanceof` في TypeScript هو طريقة لتضييق نوع متغير استنادًا إلى دالة المُنشئ الخاصة به، عن طريق التحقق مما إذا كان الكائن مثيلًا لفئة أو واجهة معينة.

```typescript
class Square {
    constructor(public width: number) {}
}
class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
}
function area(shape: Square | Rectangle) {
    if (shape instanceof Square) {
        return shape.width * shape.width;
    } else {
        return shape.width * shape.height;
    }
}
const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square)); // 25
console.log(area(rectangle)); // 50
```

