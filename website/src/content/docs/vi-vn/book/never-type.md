---
title: Kiểu dữ liệu never
sidebar:
  order: 48
  label: 48. Kiểu dữ liệu never
---


Kiểu `never` biểu diễn các giá trị không bao giờ xảy ra. Nó được dùng để biểu thị các hàm hoặc biểu thức không bao giờ trả về hoặc luôn throw lỗi.

Ví dụ, một vòng lặp vô hạn:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Throw một lỗi:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Kiểu `never` hữu ích để bảo đảm an toàn kiểu và phát hiện các lỗi tiềm ẩn trong mã. Nó giúp TypeScript phân tích và suy luận các kiểu chính xác hơn khi được dùng kết hợp với các kiểu khác và câu lệnh luồng điều khiển, ví dụ:

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

