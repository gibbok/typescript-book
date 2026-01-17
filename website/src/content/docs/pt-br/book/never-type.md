---
title: Tipo Never
sidebar:
  order: 47
  label: 47. Tipo Never
---


O tipo `never` representa valores que nunca ocorrem. Ele é usado para denotar funções ou expressões que nunca retornam ou lançam um erro.

Por exemplo, um loop infinito:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // faz algo
    }
};
```

Lançando um erro:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

O tipo `never` é útil para garantir a segurança de tipos e capturar potenciais erros em seu código. Ele ajuda o TypeScript a analisar e inferir tipos mais precisos quando usado em combinação com outros tipos e instruções de fluxo de controle, por exemplo:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // move para cima
            break;
        case 'down':
            // move para baixo
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

