---
title: Tipos Primitivos
sidebar:
  order: 10
  label: 10. Tipos Primitivos
---


O TypeScript suporta 7 tipos primitivos. Um tipo de dado primitivo refere-se a um tipo que não é um objeto e não possui nenhum método associado a ele. No TypeScript, todos os tipos primitivos são imutáveis, o que significa que seus valores não podem ser alterados uma vez que são atribuídos.

### string

O tipo primitivo `string` armazena dados textuais, e o valor é sempre delimitado por aspas duplas ou simples.

```typescript
const x: string = 'x';
const y: string = 'y';
```

As strings podem abranger várias linhas se estiverem rodeadas pelo caractere de crase (`):

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

O tipo de dado `boolean` no TypeScript armazena um valor binário, seja `true` ou `false`.

```typescript
const isReady: boolean = true;
```

### number

Um tipo de dado `number` no TypeScript é representado com um valor de ponto flutuante de 64 bits. Um tipo `number` pode representar inteiros e frações.
O TypeScript também suporta hexadecimal, binário e octal, por exemplo:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal começa com 0x
const binary: number = 0b1010; // Binário começa com 0b
const octal: number = 0o633; // Octal começa com 0o
```

### bigInt

Um `bigInt` representa valores numéricos muito grandes (253 – 1) e que não podem ser representados com um `number`.

Um `bigInt` pode ser criado chamando a função integrada `BigInt()` ou adicionando `n` ao final de qualquer literal numérico inteiro:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Notas:

* Valores `bigInt` não podem ser misturados com `number` e não podem ser usados com a função integrada `Math`; eles devem ser coagidos para o mesmo tipo.
* Valores `bigInt` estão disponíveis apenas se a configuração da meta (target) for ES2020 ou superior.

### Symbol

Symbols são identificadores únicos que podem ser usados como chaves de propriedade em objetos para evitar conflitos de nomenclatura.

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null e undefined

Os tipos `null` e `undefined` representam a ausência de valor.

O tipo `undefined` significa que o valor não foi atribuído ou inicializado, ou indica uma ausência não intencional de valor.

O tipo `null` significa que sabemos que o campo não possui um valor, portanto o valor está indisponível; indica uma ausência intencional de valor.

### Array

Um `array` é um tipo de dado que pode armazenar múltiplos valores do mesmo tipo ou não. Ele pode ser definido usando a seguinte sintaxe:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // União
```

O TypeScript suporta arrays somente leitura (readonly) usando a seguinte sintaxe:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Modificador readonly
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Inválido
```

O TypeScript suporta tupla e tupla somente leitura:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

O tipo de dado `any` representa literalmente "qualquer" valor; é o valor padrão quando o TypeScript não consegue inferir o tipo ou quando este não é especificado.

Ao usar `any`, o compilador TypeScript ignora a verificação de tipo, portanto não há segurança de tipo quando o `any` está sendo usado. Geralmente, não use `any` para silenciar o compilador quando ocorre um erro; em vez disso, concentre-se em corrigir o erro, pois ao usar `any` é possível quebrar contratos e perdemos os benefícios do preenchimento automático do TypeScript.

O tipo `any` pode ser útil durante uma migração gradual de JavaScript para TypeScript, pois pode silenciar o compilador.

Para novos projetos, use a configuração do TypeScript `noImplicitAny`, que permite que o TypeScript emita erros onde `any` é usado ou inferido.

O tipo `any` é geralmente uma fonte de erros que podem mascarar problemas reais com seus tipos. Evite usá-lo o máximo possível.

