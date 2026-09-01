# Tür ve Arayüz Arasındaki Farklar



Bildirim birleştirme (genişletme):

Arayüzler bildirim birleştirmeyi destekler; bu, aynı ada sahip birden fazla arayüz tanımlayabileceğiniz ve TypeScript'in bunları birleştirilmiş özellikler ile metotlara sahip tek bir arayüzde birleştireceği anlamına gelir. Öte yandan türler bildirim birleştirmeyi desteklemez. Bu, özgün tanımları değiştirmeden veya eksik ya da hatalı türlere yama uygulamadan ek işlevsellik katmak veya mevcut türleri özelleştirmek istediğinizde yararlı olabilir.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

Diğer türleri/arayüzleri genişletme:

Hem türler hem de arayüzler diğer türleri/arayüzleri genişletebilir, ancak sözdizimleri farklıdır. Arayüzlerde, diğer arayüzlerin özelliklerini ve metotlarını devralmak için `extends` anahtar sözcüğünü kullanırsınız. Ancak bir arayüz, birleşim türü gibi karmaşık bir türü genişletemez.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

Türlerde ise birden fazla türü tek bir türde birleştirmek (kesişim) için & operatörünü kullanırsınız.

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

Birleşim ve Kesişim Türleri:

Birleşim ve Kesişim Türlerini tanımlama konusunda türler daha esnektir. `type` anahtar sözcüğüyle `|` operatörünü kullanarak kolayca birleşim türleri ve `&` operatörünü kullanarak kesişim türleri oluşturabilirsiniz. Arayüzler de birleşim türlerini dolaylı olarak temsil edebilse de kesişim türleri için yerleşik desteğe sahip değildir.

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

Arayüzlerle örnek:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

