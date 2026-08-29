# never 타입에 대하여



변수의 타입이 어떤 값도 포함할 수 없는 타입으로 좁혀지면 TypeScript 컴파일러는 해당 변수가 `never` 타입이어야 한다고 추론합니다. never 타입은 절대 생성될 수 없는 값을 나타내기 때문입니다.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val has type never here because it can never be anything other than a string or a number
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

