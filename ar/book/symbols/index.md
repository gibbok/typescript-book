# الرموز



الرموز هي نوع بيانات بدائي يمثل قيمة غير قابلة للتغيير ومضمونة التفرد عالميًا طوال مدة تشغيل البرنامج.

يمكن استخدام الرموز كمفاتيح لخصائص الكائنات، وهي توفّر طريقة لإنشاء خصائص غير قابلة للتعداد.

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

أصبح استخدام الرموز كمفاتيح مسموحًا الآن في WeakMap وWeakSet.

