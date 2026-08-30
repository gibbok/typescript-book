# Nazwany typ krotki (z etykietami)



Typy krotek mogą zawierać opcjonalne etykiety lub nazwy dla każdego elementu. Etykiety te służą zwiększeniu czytelności i wspomaganiu narzędzi, ale nie wpływają na operacje, które można wykonywać na krotkach.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

