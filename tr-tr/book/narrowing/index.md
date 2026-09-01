# Daraltma



TypeScript daraltması, koşullu bir blok içinde bir değişkenin türünü daha belirgin hâle getirme işlemidir. Bu, bir değişkenin birden fazla türe sahip olabildiği birleşim türleriyle çalışırken kullanışlıdır.

TypeScript, türü daraltmanın çeşitli yollarını tanır:

### typeof tür korumaları

typeof tür koruması, TypeScript'te bir değişkenin türünü yerleşik JavaScript türüne göre kontrol eden belirli bir tür korumasıdır.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Doğruluk değeriyle daraltma

TypeScript'te doğruluk değeriyle daraltma, bir değişkenin türünü buna göre daraltmak için değişkenin doğru veya yanlış olarak değerlendirilip değerlendirilmediğini kontrol ederek çalışır.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Eşitlikle daraltma

TypeScript'te eşitlikle daraltma, bir değişkenin belirli bir değere eşit olup olmadığını kontrol ederek türünü buna göre daraltır.

Türleri daraltmak için `switch` ifadeleriyle ve `===`, `!==`, `==` ve `!=` gibi eşitlik operatörleriyle birlikte kullanılır.

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

### in Operatörüyle daraltma

TypeScript'te `in` Operatörüyle daraltma, değişkenin türünde bir özelliğin bulunup bulunmadığına göre değişkenin türünü daraltmanın bir yoludur.

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

### instanceof ile daraltma

TypeScript'te `instanceof` operatörüyle daraltma, bir nesnenin belirli bir sınıfın veya arayüzün örneği olup olmadığını kontrol ederek, değişkenin türünü oluşturucu fonksiyonuna göre daraltmanın bir yoludur.

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

