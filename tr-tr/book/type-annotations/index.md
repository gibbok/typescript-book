# Tür Ek Açıklamaları



`var`, `let` ve `const` kullanılarak bildirilen değişkenlere isteğe bağlı olarak bir tür eklemek mümkündür:

```typescript
const x: number = 1;
```

TypeScript, özellikle basit türler için tür çıkarımını iyi yaptığından bu bildirimler çoğu durumda gerekli değildir.

Fonksiyonlarda parametrelere tür ek açıklamaları eklemek mümkündür:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

Aşağıda anonim bir fonksiyonun (lambda fonksiyonu olarak da adlandırılır) kullanıldığı bir örnek yer almaktadır:

```typescript
const sum = (a: number, b: number) => a + b;
```

Bir parametre için varsayılan değer bulunduğunda bu ek açıklamalardan kaçınılabilir:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Fonksiyonlara dönüş türü ek açıklamaları eklenebilir:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

Bu, özellikle daha karmaşık fonksiyonlar için faydalıdır; çünkü uygulamadan önce dönüş türünü yazmak fonksiyon üzerinde düşünmenize yardımcı olabilir.

Genel olarak, tür imzalarına ek açıklama eklemeyi değerlendirin, ancak fonksiyon gövdesindeki yerel değişkenlere eklemeyin ve nesne sabitlerine her zaman tür ekleyin.

