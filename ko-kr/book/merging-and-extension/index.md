# 병합과 확장



병합과 확장은 타입 및 인터페이스 작업과 관련된 서로 다른 두 개념을 가리킵니다.

병합을 사용하면 이름이 같은 여러 선언을 하나의 정의로 결합할 수 있습니다. 예를 들어 같은 이름의 인터페이스를 여러 번 정의하는 경우입니다.

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

확장은 기존 타입 또는 인터페이스를 확장하거나 상속하여 새 타입을 만드는 기능을 가리킵니다. 원래 정의를 수정하지 않고 기존 타입에 프로퍼티나 메서드를 추가하는 메커니즘입니다. 예제:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

