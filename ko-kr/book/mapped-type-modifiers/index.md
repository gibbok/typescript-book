# 매핑된 타입 수정자



TypeScript의 매핑된 타입 수정자를 사용하면 기존 타입 내의 프로퍼티를 변환할 수 있습니다.

* `readonly` 또는 `+readonly`: 매핑된 타입의 프로퍼티를 읽기 전용으로 만듭니다.
* `-readonly`: 매핑된 타입의 프로퍼티를 변경할 수 있게 합니다.
* `?`: 매핑된 타입의 프로퍼티를 선택 사항으로 지정합니다.

예제:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // 모든 프로퍼티를 읽기 전용으로 표시

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // 모든 프로퍼티를 변경 가능으로 표시

type MyPartial<T> = { [P in keyof T]?: T[P] }; // 모든 프로퍼티를 선택적으로 표시
```

