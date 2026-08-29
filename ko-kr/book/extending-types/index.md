# 타입 확장



`interface`를 확장할 수 있습니다(다른 타입에서 멤버를 복사합니다).

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

여러 타입을 확장하는 것도 가능합니다.

```typescript
interface A {
    a: string;
}
interface B {
    b: string;
}
interface Y extends A, B {
    y: string;
}
```

`extends` 키워드는 인터페이스와 클래스에서만 작동하며, 타입에는 인터섹션을 사용합니다.

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

인터페이스를 사용하여 타입을 확장할 수 있지만 그 반대는 불가능합니다.

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

