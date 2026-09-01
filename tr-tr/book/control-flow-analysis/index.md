# Kontrol Akışı Analizi



TypeScript'te Kontrol Akışı Analizi, değişkenlerin türlerini çıkarmak için kod akışını statik olarak analiz etmenin ve analiz sonuçlarına göre derleyicinin bu değişkenlerin türlerini gerektiği gibi daraltmasına olanak tanımanın bir yoludur.

TypeScript 4.4'ten önce kod akışı analizi yalnızca bir if ifadesi içindeki koda uygulanıyordu; ancak TypeScript 4.4'ten itibaren const değişkenleri üzerinden dolaylı olarak başvurulan koşullu ifadelere ve ayırt edici özellik erişimlerine de uygulanabilir.

Örneğin:

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

Daraltmanın gerçekleşmediği bazı örnekler:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

Notlar: Koşullu ifadelerde en fazla beş dolaylılık düzeyi analiz edilir.

