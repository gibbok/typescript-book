---
title: Verificação de Exaustividade
sidebar:
  order: 26
  label: 26. Verificação de Exaustividade
---


A verificação de exaustividade é um recurso no TypeScript que garante que todos os casos possíveis de uma união discriminada sejam tratados em uma instrução `switch` ou uma instrução `if`.

```typescript
type Direction = 'up' | 'down';

const move = (direction: Direction) => {
    switch (direction) {
        case 'up':
            console.log('Moving up');
            break;
        case 'down':
            console.log('Moving down');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // Esta linha nunca será executada
    }
};
```

O tipo `never` é usado para garantir que o caso padrão seja exaustivo e que o TypeScript levantará um erro se um novo valor for adicionado ao tipo Direction sem ser tratado na instrução switch.

