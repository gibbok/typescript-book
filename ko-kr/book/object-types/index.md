# 객체 타입



TypeScript에서 객체 타입은 객체의 형태를 설명합니다. 객체 프로퍼티의 이름과 타입뿐만 아니라 해당 프로퍼티가 필수인지 선택 사항인지도 지정합니다.

TypeScript에서는 주로 다음 두 가지 방식으로 객체 타입을 정의할 수 있습니다.

인터페이스는 프로퍼티의 이름, 타입, 선택 여부를 지정하여 객체의 형태를 정의합니다.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

타입 별칭은 인터페이스와 마찬가지로 객체의 형태를 정의합니다. 하지만 기존 타입이나 기존 타입의 조합을 기반으로 새로운 사용자 지정 타입을 만들 수도 있습니다. 여기에는 유니온 타입, 인터섹션 타입 및 기타 복잡한 타입의 정의가 포함됩니다.

```typescript
type Point = {
    x: number;
    y: number;
};
```

타입을 익명으로 정의할 수도 있습니다.

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

