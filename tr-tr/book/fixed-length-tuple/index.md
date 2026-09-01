# Sabit Uzunluklu Demet



Sabit Uzunluklu Demet, belirli türlerde sabit sayıda öğeyi zorunlu kılan ve tanımlandıktan sonra demetin uzunluğunda herhangi bir değişikliğe izin vermeyen özel bir demet türüdür.

Sabit Uzunluklu Demetler, belirli sayıda öğe ve belirli türlerden oluşan bir değer koleksiyonunu temsil etmeniz ve demetin uzunluğu ile türlerinin yanlışlıkla değiştirilemeyeceğinden emin olmanız gerektiğinde kullanışlıdır.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

