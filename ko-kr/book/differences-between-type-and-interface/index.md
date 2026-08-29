# 타입과 인터페이스의 차이점



선언 병합(보강):

인터페이스는 선언 병합을 지원합니다. 즉, 같은 이름으로 여러 인터페이스를 정의하면 TypeScript가 결합된 프로퍼티와 메서드를 가진 하나의 인터페이스로 병합합니다. 반면 타입은 선언 병합을 지원하지 않습니다. 이는 원래 정의를 수정하거나 누락되었거나 잘못된 타입을 패치하지 않고 추가 기능을 더하거나 기존 타입을 사용자 지정하려 할 때 유용할 수 있습니다.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

다른 타입/인터페이스 확장:

타입과 인터페이스 모두 다른 타입/인터페이스를 확장할 수 있지만 구문은 다릅니다. 인터페이스에서는 `extends` 키워드를 사용하여 다른 인터페이스의 프로퍼티와 메서드를 상속합니다. 그러나 인터페이스는 유니온 타입과 같은 복합 타입을 확장할 수 없습니다.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

타입에서는 & 연산자를 사용하여 여러 타입을 하나의 타입(인터섹션)으로 결합합니다.

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

유니온 타입과 인터섹션 타입:

유니온 타입과 인터섹션 타입을 정의할 때는 타입 별칭이 더 유연합니다. `type` 키워드를 사용하면 `|` 연산자로 유니온 타입을, `&` 연산자로 인터섹션 타입을 쉽게 만들 수 있습니다. 인터페이스도 유니온 타입을 간접적으로 나타낼 수 있지만 인터섹션 타입을 기본적으로 지원하지 않습니다.

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

인터페이스를 사용한 예제:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

