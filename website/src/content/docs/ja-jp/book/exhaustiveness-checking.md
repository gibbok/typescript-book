---
title: 網羅性チェック
sidebar:
  order: 27
  label: 27. 網羅性チェック
---


網羅性チェックは、判別可能なユニオンで取り得るすべてのケースが `switch` 文または `if` 文で処理されていることを保証する TypeScript の機能です。

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

`never` 型は、default ケースが網羅的であることを保証し、Direction 型に新しい値が追加されたにもかかわらず switch 文で処理されていない場合に、TypeScript がエラーを発生させるために使用されます。

