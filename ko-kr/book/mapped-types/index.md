# 매핑된 타입



TypeScript의 매핑된 타입을 사용하면 매핑 함수를 통해 각 프로퍼티를 변환하여 기존 타입을 기반으로 새 타입을 만들 수 있습니다. 기존 타입을 매핑하면 같은 정보를 다른 형식으로 나타내는 새 타입을 만들 수 있습니다. 매핑된 타입을 만들려면 `keyof` 연산자를 사용하여 기존 타입의 프로퍼티에 접근한 다음 이를 변경해 새 타입을 생성합니다.
다음 예제에서는:

```typescript
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
};
type MyType = {
    foo: string;
    bar: number;
};
type MyNewType = MyMappedType<MyType>;
const x: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3],
};
```

T의 프로퍼티를 순회하며 각 프로퍼티를 원래 타입의 배열로 만드는 MyMappedType을 정의합니다. 이를 사용해 MyType과 같은 정보를 나타내되 각 프로퍼티가 배열인 MyNewType을 만듭니다.

