---
title: Kiểm tra tính đầy đủ
sidebar:
  order: 27
  label: 27. Kiểm tra tính đầy đủ
---


Exhaustiveness checking là một tính năng trong TypeScript bảo đảm tất cả trường hợp có thể có của một discriminated union đều được xử lý trong câu lệnh `switch` hoặc câu lệnh `if`.

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

Kiểu `never` được dùng để bảo đảm trường hợp default là đầy đủ và TypeScript sẽ báo lỗi nếu một giá trị mới được thêm vào kiểu Direction mà không được xử lý trong câu lệnh switch.

