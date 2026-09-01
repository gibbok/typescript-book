## Discriminated Union

Discriminated Union trong TypeScript là một loại union type sử dụng một thuộc tính chung, được gọi là discriminant, để thu hẹp tập hợp các kiểu có thể có của union.

```typescript
type Square = {
    kind: 'square'; // Discriminant
    size: number;
};

type Circle = {
    kind: 'circle'; // Discriminant
    radius: number;
};

type Shape = Square | Circle;

const area = (shape: Shape) => {
    switch (shape.kind) {
        case 'square':
            return Math.pow(shape.size, 2);
        case 'circle':
            return Math.PI * Math.pow(shape.radius, 2);
    }
};

const square: Square = { kind: 'square', size: 5 };
const circle: Circle = { kind: 'circle', radius: 2 };

console.log(area(square)); // 25
console.log(area(circle)); // 12.566370614359172
```

## Kiểu never

Khi một biến được thu hẹp thành một kiểu không thể chứa bất kỳ giá trị nào, trình biên dịch TypeScript sẽ suy luận rằng biến phải có kiểu `never`. Lý do là kiểu never biểu diễn một giá trị không bao giờ có thể được tạo ra.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val has type never here because it can never be anything other than a string or a number
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

## Kiểm tra tính đầy đủ

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
