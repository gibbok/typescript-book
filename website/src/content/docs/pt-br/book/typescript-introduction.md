---
title: Introdução ao TypeScript
sidebar:
  order: 7
  label: 7. Introdução ao TypeScript
---


### O que é TypeScript?

TypeScript é uma linguagem de programação fortemente tipada que se baseia em JavaScript. Foi originalmente projetado por Anders Hejlsberg em 2012 e atualmente é desenvolvido e mantido pela Microsoft como um projeto de código aberto.

TypeScript compila para JavaScript e pode ser executado em qualquer runtime JavaScript (por exemplo, um navegador ou servidor Node.js).

TypeScript suporta múltiplos paradigmas de programação, como funcional, genérico, imperativo e orientado a objetos. TypeScript não é uma linguagem interpretada nem compilada.

### Por que TypeScript?

TypeScript é uma linguagem fortemente tipada que ajuda a prevenir erros comuns de programação e evitar certos tipos de erros em tempo de execução antes que o programa seja executado.

Uma linguagem fortemente tipada permite ao desenvolvedor especificar várias restrições e comportamentos do programa nas definições de tipo de dados, facilitando a capacidade de verificar a correção do software e prevenir defeitos. Isso é especialmente valioso em aplicações de larga escala.

Alguns dos benefícios do TypeScript:

* Tipagem estática, opcionalmente fortemente tipada
* Inferência de Tipo
* Acesso aos recursos do ES6 e ES7
* Compatibilidade Cross-Platform e Cross-browser
* Suporte de ferramentas com IntelliSense

### TypeScript e JavaScript

TypeScript é escrito em arquivos `.ts` ou `.tsx`, enquanto arquivos JavaScript são escritos em `.js` ou `.jsx`.

Arquivos com a extensão `.tsx` ou `.jsx` podem conter JavaScript Syntax Extension JSX, que é usado no React para desenvolvimento de UI.

TypeScript é um superconjunto tipado de JavaScript (ECMAScript 2015) em termos de sintaxe. Todo código JavaScript é código TypeScript válido, mas o inverso nem sempre é verdadeiro.

Por exemplo, considere uma função em um arquivo JavaScript com a extensão `.js`, como a seguinte:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

A função pode ser convertida e usada em TypeScript mudando a extensão do arquivo para `.ts`. No entanto, se a mesma função for anotada com tipos TypeScript, ela não poderá ser executada em nenhum runtime JavaScript sem compilação. O seguinte código TypeScript produzirá um erro de sintaxe se não for compilado:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript foi projetado para detectar possíveis exceções que podem ocorrer em tempo de execução durante o tempo de compilação, fazendo com que o desenvolvedor defina a intenção com anotações de tipo. Além disso, o TypeScript também pode detectar problemas se nenhuma anotação de tipo for fornecida. Por exemplo, o seguinte trecho de código não especifica nenhum tipo TypeScript:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

Neste caso, o TypeScript detecta um erro e relata:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

O sistema de tipos do TypeScript é amplamente influenciado pelo comportamento em tempo de execução do JavaScript. Por exemplo, o operador de adição (+), que em JavaScript pode realizar concatenação de string ou adição numérica, é modelado da mesma forma no TypeScript:

```typescript
const result = '1' + 1; // O resultado é do tipo string
```

A equipe por trás do TypeScript tomou uma decisão deliberada de sinalizar uso incomum de JavaScript como erros. Por exemplo, considere o seguinte código JavaScript válido:

<!-- skip -->
```typescript
const result = 1 + true; // Em JavaScript, o resultado é igual a 2
```

No entanto, o TypeScript lança um erro:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Este erro ocorre porque o TypeScript aplica rigorosamente a compatibilidade de tipos e, neste caso, identifica uma operação inválida entre um number e um boolean.

### Geração de Código TypeScript

O compilador TypeScript tem duas responsabilidades principais: verificar erros de tipo e compilar para JavaScript. Esses dois processos são independentes um do outro. Tipos não afetam a execução do código em um runtime JavaScript, pois são completamente apagados durante a compilação. O TypeScript ainda pode gerar JavaScript mesmo na presença de erros de tipo.
Aqui está um exemplo de código TypeScript com um erro de tipo:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

No entanto, ainda pode produzir saída JavaScript executável:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

Não é possível verificar tipos TypeScript em tempo de execução. Por exemplo:

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // 'Dog' only refers to a type, but is being used as a value here.
        // ...
    }
};
```

Como os tipos são apagados após a compilação, não há como executar este código em JavaScript. Para reconhecer tipos em tempo de execução, precisamos usar outro mecanismo. O TypeScript fornece várias opções, sendo uma comum a "união discriminada". Por exemplo:

```typescript
interface Dog {
    kind: 'dog'; // União discriminada
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // União discriminada
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

A propriedade "kind" é um valor que pode ser usado em tempo de execução para distinguir entre objetos em JavaScript.

Também é possível que um valor em tempo de execução tenha um tipo diferente daquele declarado na declaração de tipo. Por exemplo, se o desenvolvedor interpretou mal um tipo de API e o anotou incorretamente.

TypeScript é um superconjunto de JavaScript, então a palavra-chave "class" pode ser usada como um tipo e valor em tempo de execução.

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(
        public name: string,
        public bark: () => void
    ) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(
        public name: string,
        public meow: () => void
    ) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

Em JavaScript, uma "class" tem uma propriedade "prototype", e o operador "instanceof" pode ser usado para testar se a propriedade prototype de um construtor aparece em qualquer lugar na cadeia de protótipos de um objeto.

TypeScript não tem efeito no desempenho em tempo de execução, pois todos os tipos serão apagados. No entanto, o TypeScript introduz alguma sobrecarga de tempo de compilação.

### JavaScript Moderno Agora (Downleveling)

TypeScript pode compilar código para qualquer versão lançada de JavaScript desde ECMAScript 3 (1999). Isso significa que o TypeScript pode transpilar código dos recursos JavaScript mais recentes para versões mais antigas, um processo conhecido como Downleveling. Isso permite o uso de JavaScript moderno enquanto mantém máxima compatibilidade com ambientes de runtime mais antigos.

É importante notar que durante a transpilação para uma versão mais antiga de JavaScript, o TypeScript pode gerar código que poderia incorrer em uma sobrecarga de desempenho em comparação com implementações nativas.

Aqui estão alguns dos recursos JavaScript modernos que podem ser usados no TypeScript:

* Módulos ECMAScript em vez de callbacks estilo AMD "define" ou instruções CommonJS "require".
* Classes em vez de prototypes.
* Declaração de variáveis usando "let" ou "const" em vez de "var".
* Loop "for-of" ou ".forEach" em vez do loop "for" tradicional.
* Arrow functions em vez de expressões de função.
* Atribuição de desestruturação.
* Nomes de propriedade/método abreviados e nomes de propriedade computados.
* Parâmetros de função padrão.

Ao aproveitar esses recursos JavaScript modernos, os desenvolvedores podem escrever código mais expressivo e conciso no TypeScript.

