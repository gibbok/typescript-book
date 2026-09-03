---
title: نوع Tuple المسمّى (الموسوم)
sidebar:
  order: 30
  label: 30. نوع Tuple المسمّى (الموسوم)
---


يمكن أن تتضمن أنواع Tuple تسميات أو أسماء اختيارية لكل عنصر. هذه التسميات مخصّصة لتحسين قابلية القراءة والمساعدة التي تقدمها الأدوات، ولا تؤثر في العمليات التي يمكنك إجراؤها عليها.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

