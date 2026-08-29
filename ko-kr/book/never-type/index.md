# Never 타입



`never` 타입은 절대 발생하지 않는 값을 나타냅니다. 절대 반환하지 않거나 오류를 던지는 함수 또는 표현식을 나타내는 데 사용됩니다.

예를 들어 무한 루프는 다음과 같습니다.

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

오류 던지기:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

`never` 타입은 타입 안전성을 보장하고 코드의 잠재적인 오류를 포착하는 데 유용합니다. 다른 타입 및 제어 흐름 문과 함께 사용하면 TypeScript가 더 정밀한 타입을 분석하고 추론하는 데 도움이 됩니다. 예를 들면 다음과 같습니다.

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // move up
            break;
        case 'down':
            // move down
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

