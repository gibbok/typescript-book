# 할당



할당을 통한 TypeScript 좁히기는 변수에 할당된 값을 바탕으로 변수의 타입을 좁히는 방법입니다. 변수에 값이 할당되면 TypeScript는 할당된 값을 바탕으로 타입을 추론하고 추론된 타입과 일치하도록 변수의 타입을 좁힙니다.

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

