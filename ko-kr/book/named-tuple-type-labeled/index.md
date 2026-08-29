# 명명된 튜플 타입(레이블 지정)



튜플 타입은 각 요소에 선택적인 레이블이나 이름을 포함할 수 있습니다. 이러한 레이블은 가독성과 도구 지원을 위한 것이며, 튜플로 수행할 수 있는 연산에는 영향을 주지 않습니다.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

