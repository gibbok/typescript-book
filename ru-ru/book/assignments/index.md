# Присваивания



Сужение типов в TypeScript с помощью присваиваний позволяет сузить тип переменной на основе присвоенного ей значения. Когда переменной присваивается значение, TypeScript выводит её тип на основе этого значения и сужает тип переменной в соответствии с выведенным типом.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

