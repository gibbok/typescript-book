# Fonksiyon Dönüşünden Tür



Fonksiyon Dönüşünden Tür, bir fonksiyonun dönüş türünü uygulamasına göre otomatik olarak çıkarma yeteneğini ifade eder. Bu, TypeScript'in fonksiyon tarafından döndürülen değerin türünü açık tür ek açıklamaları olmadan belirlemesine olanak tanır.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

