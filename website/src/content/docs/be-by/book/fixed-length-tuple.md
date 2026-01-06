---
title: Fixed Length Tuple
sidebar:
  order: 30
  label: 30. Fixed Length Tuple
---


A Fixed Length Tuple is a specific type of tuple that enforces a fixed number of elements of specific types, and disallows any modifications to the length of the tuple once it is defined.

Fixed Length Tuples are useful when you need to represent a collection of values with a specific number of elements and specific types, and you want to ensure that the length and types of the tuple cannot be changed inadvertently.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

