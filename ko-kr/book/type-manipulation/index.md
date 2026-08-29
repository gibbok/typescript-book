# 타입 조작



### 타입에서 타입 생성하기

기존 타입을 조합하거나 조작하거나 변환하여 새로운 타입을 만들 수 있습니다.

인터섹션 타입(`&`):

여러 타입을 하나의 타입으로 결합할 수 있습니다.

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersection of A and B
const obj: C = { foo: 42, bar: 'hello' };
```

유니온 타입(`|`):

여러 타입 중 하나가 될 수 있는 타입을 정의할 수 있습니다.

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

매핑된 타입:

기존 타입의 프로퍼티를 변환하여 새로운 타입을 만들 수 있습니다.

```typescript
type Mutable<T> = {
    readonly [P in keyof T]: T[P];
};
type Person = {
    name: string;
    age: number;
};
type ImmutablePerson = Mutable<Person>; // Properties become read-only
```

조건부 타입:

몇 가지 조건을 기반으로 타입을 만들 수 있습니다.

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### 인덱스 접근 타입

TypeScript에서는 인덱스 `Type[Key]`를 사용하여 다른 타입에 있는 프로퍼티의 타입에 접근하고 이를 조작할 수 있습니다.

```typescript
type Person = {
    name: string;
    age: number;
};

type AgeType = Person['age']; // number
```

```typescript
type MyTuple = [string, number, boolean];
type MyType = MyTuple[2]; // boolean
```

### 유틸리티 타입

타입을 조작하는 데 사용할 수 있는 여러 내장 유틸리티 타입이 있습니다. 다음은 가장 일반적으로 사용되는 타입의 목록입니다.

#### Awaited\<T\>

Promise 타입을 재귀적으로 언래핑하는 타입을 생성합니다.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

T의 모든 프로퍼티를 선택 사항으로 설정한 타입을 생성합니다.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

T의 모든 프로퍼티를 필수로 설정한 타입을 생성합니다.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

T의 모든 프로퍼티를 읽기 전용으로 설정한 타입을 생성합니다.

<!-- skip -->
```typescript
type Person = {
    name: string;
    age: number;
};

type A = Readonly<Person>;

const a: A = { name: 'Simon', age: 17 };
a.name = 'John'; // Invalid
```

#### Record\<K, T\>

타입이 T인 K 프로퍼티 집합을 가진 타입을 생성합니다.

```typescript
type Product = {
    name: string;
    price: number;
};

const products: Record<string, Product> = {
    apple: { name: 'Apple', price: 0.5 },
    banana: { name: 'Banana', price: 0.25 },
};

console.log(products.apple); // { name: 'Apple', price: 0.5 }
```

#### Pick\<T, K\>

T에서 지정된 프로퍼티 K를 선택하여 타입을 생성합니다.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

T에서 지정된 프로퍼티 K를 생략하여 타입을 생성합니다.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

T에서 U 타입의 모든 값을 제외하여 타입을 생성합니다.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

T에서 U 타입의 모든 값을 추출하여 타입을 생성합니다.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

T에서 null과 undefined를 제외하여 타입을 생성합니다.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

함수 타입 T의 매개변수 타입을 추출합니다.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

생성자 함수 타입 T의 매개변수 타입을 추출합니다.

```typescript
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}
type PersonConstructorParams = ConstructorParameters<typeof Person>; // [name: string, age: number]
const params: PersonConstructorParams = ['John', 30];
const person = new Person(...params);
console.log(person); // Person { name: 'John', age: 30 }
```

#### ReturnType\<T\>

함수 타입 T의 반환 타입을 추출합니다.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

클래스 타입 T의 인스턴스 타입을 추출합니다.

```typescript
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}!`);
    }
}

type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person('John');

person.sayHello(); // Hello, my name is John!
```

#### ThisParameterType\<T\>

함수 타입 T에서 'this' 매개변수의 타입을 추출합니다.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

함수 타입 T에서 'this' 매개변수를 제거합니다.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

문맥적 `this` 타입을 나타내는 마커 역할을 합니다.

<!-- skip -->
```typescript
type Logger = {
    log: (error: string) => void;
};

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
    hello: function () {
        this.log('some error'); // Valid as "log" is a part of "this".
        this.update(); // Invalid
    },
};
```

#### Uppercase\<T\>

입력 타입 T의 이름을 대문자로 변환합니다.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

입력 타입 T의 이름을 소문자로 변환합니다.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

입력 타입 T 이름의 첫 글자를 대문자로 변환합니다.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

입력 타입 T 이름의 첫 글자를 소문자로 변환합니다.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer는 제네릭 함수 범위 내에서 타입이 자동으로 추론되는 것을 차단하도록 설계된 유틸리티 타입입니다.

예제:

```typescript
// Automatic inference of types within the scope of a generic function.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Type here is ("a" | "b" | "c")[]
```

NoInfer를 사용한 경우:

<!-- skip -->
```typescript
// Example function that uses NoInfer to prevent type inference
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Error: Type Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```

