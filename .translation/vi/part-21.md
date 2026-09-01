### Covariance và Contravariance trong TypeScript

Covariance và contravariance mô tả cách các quan hệ kiểu hoạt động trong generic type.

Trong TypeScript:

* Array là **covariant**, nhưng điều này không hoàn toàn an toàn kiểu.
* Kiểu tham số hàm là:
  * **contravariant** khi `strictFunctionTypes` được bật
  * **bivariant** trong trường hợp khác

Covariance có nghĩa quan hệ được giữ nguyên: nếu kiểu A là kiểu con của kiểu B thì `F<A>` cũng là kiểu con của `F<B>`. Trong TypeScript, điều này thường xuất hiện trong kiểu trả về và trong array (mặc dù covariance của array không hoàn toàn an toàn kiểu).

Contravariance có nghĩa quan hệ bị đảo ngược: nếu kiểu A là kiểu con của kiểu B thì `F<B>` là kiểu con của `F<A>`. Trong TypeScript, kiểu tham số hàm được thiết kế để contravariant, nghĩa là một hàm chấp nhận kiểu rộng hơn có thể được dùng ở nơi mong đợi kiểu hẹp hơn.

Tuy nhiên, trên thực tế, TypeScript thường cho phép bivariance đối với tham số hàm (trừ khi `strictFunctionTypes` được bật), nghĩa là cả hai hướng có thể được chấp nhận ngay cả khi không hoàn toàn an toàn kiểu.

Ví dụ: Hãy tưởng tượng một không gian cho tất cả động vật và một không gian riêng chỉ cho chó.

* **Covariance**:  
  Bạn có thể dùng một “không gian cho chó” ở nơi mong đợi một “không gian cho động vật”, vì mọi con chó đều là động vật.  
  Nhưng bạn không thể dùng một “không gian cho động vật” ở nơi mong đợi một “không gian cho chó”, vì nó có thể chứa động vật không phải chó.

* **Contravariance** (hãy nghĩ theo hàm):  
  Nếu bạn có thứ gì đó có thể xử lý **bất kỳ động vật nào**, bạn có thể dùng nó ở nơi mong đợi thứ chỉ xử lý **chó**.  
  Nhưng không thể làm ngược lại.

Ví dụ covariance:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Arrays are covariant in TypeScript (but not type-safe)
animals = dogs; // allowed
dogs = animals; // error
```

Ví dụ contravariance:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Intended contravariance:
feedDog = feedAnimal; // safe

// This depends on compiler settings:
feedAnimal = feedDog; // error only with strictFunctionTypes
```

#### Variance Annotation tùy chọn cho tham số kiểu

Kể từ TypeScript 4.7.0, chúng ta có thể sử dụng các từ khóa `out` và `in` để chỉ định variance annotation.

Với covariance, dùng từ khóa `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

Và với Contravariant, dùng từ khóa `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Template String Pattern Index Signature

Template string pattern index signature cho phép chúng ta định nghĩa index signature linh hoạt bằng template string pattern. Tính năng này cho phép tạo đối tượng có thể được index bằng các pattern cụ thể của string key, mang lại nhiều kiểm soát và tính cụ thể hơn khi truy cập và thao tác thuộc tính.

Từ phiên bản 4.4, TypeScript cho phép index signature cho symbol và template string pattern.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### Toán tử satisfies

Toán tử `satisfies` cho phép bạn kiểm tra một kiểu đã cho có thỏa mãn một interface hoặc điều kiện cụ thể hay không. Nói cách khác, nó bảo đảm một kiểu có tất cả thuộc tính và phương thức bắt buộc của một interface cụ thể. Đây là cách để bảo đảm một biến phù hợp với định nghĩa của một kiểu.
Dưới đây là một ví dụ:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// In the following lines, TypeScript won't be able to infer properly
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion using `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Here too, TypeScript won't be able to infer properly
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Using the `satisfies` operator we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### Import và Export chỉ dành cho Type

Type-Only Import và Export cho phép bạn import hoặc export type mà không import hoặc export các giá trị hay hàm gắn với các type đó. Điều này có thể hữu ích để giảm kích thước bundle.

Để sử dụng type-only import, bạn có thể dùng từ khóa `import type`.

TypeScript cho phép sử dụng cả phần mở rộng tệp khai báo và triển khai (.ts, .mts, .cts và .tsx) trong type-only import, bất kể thiết lập `allowImportingTsExtensions`.

Ví dụ:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Các dạng sau được hỗ trợ:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```
