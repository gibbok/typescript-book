# Nesne Türleri



TypeScript'te nesne türleri bir nesnenin şeklini açıklar. Nesnenin özelliklerinin adlarını ve türlerini, ayrıca bu özelliklerin zorunlu mu yoksa isteğe bağlı mı olduğunu belirtirler.

TypeScript'te nesne türlerini iki temel yolla tanımlayabilirsiniz:

Bir arayüz, özelliklerinin adlarını, türlerini ve isteğe bağlılık durumunu belirterek bir nesnenin şeklini tanımlar.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Bir arayüze benzer şekilde tür takma adı da bir nesnenin şeklini tanımlar. Ancak mevcut bir türe veya mevcut türlerin birleşimine dayanan yeni ve özel bir tür de oluşturabilir. Buna birleşim türlerinin, kesişim türlerinin ve diğer karmaşık türlerin tanımlanması dahildir.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Bir türü anonim olarak tanımlamak da mümkündür:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

