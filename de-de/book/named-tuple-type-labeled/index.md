# Benannter Tupeltyp (beschriftet)



Tupeltypen können optionale Beschriftungen oder Namen für jedes Element enthalten. Diese Beschriftungen dienen der Lesbarkeit und der Unterstützung durch Werkzeuge und wirken sich nicht auf die Operationen aus, die Sie mit ihnen ausführen können.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

