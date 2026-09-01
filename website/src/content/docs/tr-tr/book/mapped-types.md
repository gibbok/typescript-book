---
title: Eşlenmiş Türler
sidebar:
  order: 38
  label: 38. Eşlenmiş Türler
---


TypeScript'teki Eşlenmiş Türler, her özelliği bir eşleme fonksiyonu kullanarak dönüştürüp mevcut bir türü temel alan yeni türler oluşturmanıza olanak tanır. Mevcut türleri eşleyerek aynı bilgiyi farklı bir biçimde temsil eden yeni türler oluşturabilirsiniz. Eşlenmiş bir tür oluşturmak için `keyof` operatörünü kullanarak mevcut bir türün özelliklerine erişir ve ardından yeni bir tür üretmek üzere bunları değiştirirsiniz.
Aşağıdaki örnekte:

```typescript
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
};
type MyType = {
    foo: string;
    bar: number;
};
type MyNewType = MyMappedType<MyType>;
const x: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3],
};
```

MyMappedType'ı, T'nin özellikleri üzerinde eşleme yaparak her özelliğin özgün türünün bir dizisi olduğu yeni bir tür oluşturacak şekilde tanımlarız. Bunu kullanarak MyType ile aynı bilgiyi, ancak her özelliği bir dizi olacak biçimde temsil eden MyNewType'ı oluştururuz.

