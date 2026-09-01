# Narrowing



Narrowing trong TypeScript là quá trình tinh chỉnh kiểu của một biến bên trong một khối điều kiện. Điều này hữu ích khi làm việc với union type, nơi một biến có thể có nhiều hơn một kiểu.

TypeScript nhận biết một số cách để thu hẹp kiểu:

### Type guard typeof

Type guard typeof là một type guard cụ thể trong TypeScript kiểm tra kiểu của biến dựa trên kiểu JavaScript tích hợp của nó.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Thu hẹp theo truthiness

Truthiness narrowing trong TypeScript hoạt động bằng cách kiểm tra một biến là truthy hay falsy để thu hẹp kiểu tương ứng.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Thu hẹp theo phép so sánh bằng

Equality narrowing trong TypeScript hoạt động bằng cách kiểm tra một biến có bằng một giá trị cụ thể hay không để thu hẹp kiểu tương ứng.

Nó được sử dụng cùng các câu lệnh `switch` và các toán tử so sánh bằng như `===`, `!==`, `==` và `!=` để thu hẹp kiểu.

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true;
        case 'error':
            return null;
    }
};
```

### Thu hẹp bằng toán tử In

Thu hẹp bằng toán tử `in` trong TypeScript là cách thu hẹp kiểu của một biến dựa trên việc một thuộc tính có tồn tại trong kiểu của biến hay không.

```typescript
type Dog = {
    name: string;
    breed: string;
};

type Cat = {
    name: string;
    likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
    if ('breed' in pet) {
        return 'dog';
    } else {
        return 'cat';
    }
};
```

### Thu hẹp bằng instanceof

Thu hẹp bằng toán tử `instanceof` trong TypeScript là cách thu hẹp kiểu của biến dựa trên hàm constructor của nó, bằng cách kiểm tra xem một đối tượng có phải là instance của một class hoặc interface nhất định hay không.

```typescript
class Square {
    constructor(public width: number) {}
}
class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
}
function area(shape: Square | Rectangle) {
    if (shape instanceof Square) {
        return shape.width * shape.width;
    } else {
        return shape.width * shape.height;
    }
}
const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square)); // 25
console.log(area(rectangle)); // 50
```

