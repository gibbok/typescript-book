# Type tuple nommé (étiqueté)



Les types tuple peuvent inclure des étiquettes ou des noms facultatifs pour chaque élément. Ces étiquettes améliorent la lisibilité et facilitent l'utilisation des outils, mais n'ont aucune incidence sur les opérations que vous pouvez effectuer avec ces éléments.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

