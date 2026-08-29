# 소거된 구조적 타입



TypeScript에서 객체가 특정 타입과 정확히 일치할 필요는 없습니다. 예를 들어 인터페이스의 요구 사항을 충족하는 객체를 만들면, 객체와 해당 인터페이스 사이에 명시적인 연결이 없더라도 그 인터페이스가 필요한 곳에서 해당 객체를 사용할 수 있습니다.
예제:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

