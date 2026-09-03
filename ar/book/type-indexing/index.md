# فهرسة الأنواع



تشير فهرسة الأنواع إلى القدرة على تعريف أنواع يمكن فهرستها بمفتاح غير معروف مسبقًا، باستخدام توقيع فهرسة لتحديد نوع الخصائص غير المصرّح بها صراحةً.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

