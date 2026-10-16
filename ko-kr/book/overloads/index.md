# 오버로드



TypeScript의 함수 오버로드를 사용하면 하나의 함수 이름에 여러 함수 시그니처를 정의할 수 있어, 여러 방식으로 호출할 수 있는 함수를 정의할 수 있습니다. 다음은 예제입니다.

```typescript
// 오버로드
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// 구현
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // 유효함
sayHi(['aa', 'bb']); // 유효함
```

다음은 `class` 안에서 함수 오버로드를 사용하는 또 다른 예제입니다.

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // 오버로드
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // 구현
    sayHi(name: unknown): unknown {
        if (typeof name === 'string') {
            return `${this.message}, ${name}!`;
        } else if (Array.isArray(name)) {
            return name.map(name => `${this.message}, ${name}!`);
        }
        throw new Error('value is invalid');
    }
}
console.log(new Greeter('Hello').sayHi('Simon'));
```

