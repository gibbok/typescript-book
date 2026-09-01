# Adlandırılmış Demet Türü (Etiketli)



Demet türleri, her öğe için isteğe bağlı etiketler veya adlar içerebilir. Bu etiketler okunabilirlik ve araç desteği içindir ve bunlarla gerçekleştirebileceğiniz işlemleri etkilemez.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

