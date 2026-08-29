# 심볼



심볼은 프로그램이 실행되는 동안 전역적으로 고유함이 보장되는 불변 값을 나타내는 원시 데이터 타입입니다.

심볼은 객체 프로퍼티의 키로 사용할 수 있으며 열거할 수 없는 프로퍼티를 만드는 방법을 제공합니다.

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

이제 WeakMap과 WeakSet에서 심볼을 키로 사용할 수 있습니다.

