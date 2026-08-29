# 완전성 검사



완전성 검사는 판별 유니온에서 가능한 모든 경우가 `switch` 문이나 `if` 문에서 처리되도록 보장하는 TypeScript 기능입니다.

```typescript
type Direction = 'up' | 'down';

const move = (direction: Direction) => {
    switch (direction) {
        case 'up':
            console.log('Moving up');
            break;
        case 'down':
            console.log('Moving down');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // This line will never be executed
    }
};
```

`never` 타입은 default 절이 모든 경우를 처리하도록 보장하며, switch 문에서 처리하지 않은 새 값이 Direction 타입에 추가되면 TypeScript가 오류를 발생시키도록 하는 데 사용됩니다.

