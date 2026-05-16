---
title: Enums
sidebar:
  order: 19
  label: 19. Enums
---


В TypeScript `enum` представлява множество от именувани константни стойности.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Enums могат да бъдат дефинирани по различни начини:

### Числови enums

В TypeScript, Numeric Enum е enum, при който всяка константа получава числова стойност, започвайки от 0 по подразбиране.

```typescript
enum Size {
    Small, // стойността започва от 0
    Medium,
    Large,
}
```

Възможно е да се зададат потребителски стойности чрез изричното им присвояване:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

