# Jenerikler



Jenerikler, birden çok türle çalışabilen yeniden kullanılabilir bileşenler ve işlevler oluşturmanıza olanak tanır. Jeneriklerle türleri, işlevleri ve arayüzleri parametreleştirerek bunların farklı türler üzerinde, söz konusu türleri önceden açıkça belirtmeden çalışmasını sağlayabilirsiniz.

Jenerikler, kodu daha esnek ve yeniden kullanılabilir hâle getirmenize olanak tanır.

### Jenerik Tür

Bir jenerik tür tanımlamak için, tür parametrelerini belirtmek üzere açılı ayraçları (`<>`) kullanırsınız. Örneğin:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Jenerik Sınıflar

Jenerikler sınıflara da uygulanabilir; böylece sınıflar, tür parametrelerini kullanarak birden çok türle çalışabilir. Bu, tür güvenliğini korurken farklı veri türleri üzerinde çalışabilen, yeniden kullanılabilir sınıf tanımları oluşturmak için kullanışlıdır.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### Jenerik Kısıtlamalar

Jenerik parametreler, `extends` anahtar sözcüğünün ardından tür parametresinin karşılaması gereken bir tür veya arayüz getirilerek kısıtlanabilir.

Aşağıdaki örnekte `T`'nin geçerli olabilmesi için uygun şekilde türü belirlenmiş bir `length` özelliğine sahip olması gerekir:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

3.4 RC sürümünde sunulan dikkate değer bir jenerik özelliği, jenerik tür bağımsız değişkenlerini yayan yüksek dereceli işlev türü çıkarımıdır:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

Bu işlevsellik, işlevsel programlamada yaygın olan tür güvenli point-free tarzda programlamayı kolaylaştırır.

### Jeneriklerde Bağlamsal Daraltma

Jeneriklerde bağlamsal daraltma, TypeScript'te derleyicinin bir jenerik parametrenin türünü kullanıldığı bağlama göre daraltmasına olanak tanıyan mekanizmadır. Koşullu ifadelerde jenerik türlerle çalışırken kullanışlıdır:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

