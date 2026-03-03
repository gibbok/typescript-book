---
title: Verificação de exaustividade
sidebar:
  order: 26
  label: 26. Verificação de exaustividade
---


A verificação de exaustividade (exhaustiveness checking) é um recurso no TypeScript que garante que todos os casos possíveis de uma união discriminada sejam tratados em uma instrução `switch` ou `if`.

```typescript
type Direction = 'up' | 'down';

const move = (direction: Direction) => {
    switch (direction) {
        case 'up':
            console.log('Movendo para cima');
            break;
        case 'down':
            console.log('Movendo para baixo');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // Esta linha nunca será executada
    }
};
```

O tipo `never` é usado para garantir que o caso `default` seja exaustivo e que o TypeScript aponte um erro se um novo valor for adicionado ao tipo `Direction` sem ser tratado na instrução switch.

