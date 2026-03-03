---
title: Explorando o Sistema de Tipos
sidebar:
  order: 9
  label: 9. Explorando o Sistema de Tipos
---


### O Serviço de Linguagem TypeScript

O Serviço de Linguagem TypeScript, também conhecido como tsserver, oferece vários recursos, como relatório de erros, diagnósticos, compile-on-save, renomeação, ir para definição, listas de conclusão, ajuda de assinatura e muito mais. É usado principalmente por ambientes de desenvolvimento integrados (IDEs) para fornecer suporte IntelliSense. Ele se integra perfeitamente com o Visual Studio Code e é utilizado por ferramentas como Conquer of Completion (Coc).

Os desenvolvedores podem aproveitar uma API dedicada e criar seus próprios plugins de serviço de linguagem personalizados para aprimorar a experiência de edição TypeScript. Isso pode ser particularmente útil para implementar recursos especiais de linting ou habilitar conclusão automática para uma linguagem de template personalizada.

<!-- markdownlint-disable MD044 -->
Um exemplo de plugin personalizado do mundo real é o "typescript-styled-plugin", que fornece relatório de erros de sintaxe e suporte IntelliSense para propriedades CSS em styled components.
<!-- markdownlint-enable MD044 -->

Para mais informações e guias de início rápido, você pode consultar o Wiki oficial do TypeScript no GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Tipagem Estrutural

O TypeScript é baseado em um sistema de tipos estrutural. Isso significa que a compatibilidade e equivalência de tipos são determinadas pela estrutura ou definição real do tipo, em vez de seu nome ou local de declaração, como em sistemas de tipos nominativos como C# ou C.

O sistema de tipos estrutural do TypeScript foi projetado com base em como o sistema de duck typing dinâmico do JavaScript funciona durante o runtime.

O seguinte exemplo é código TypeScript válido. Como você pode observar, "X" e "Y" têm o mesmo membro "a", mesmo que tenham nomes de declaração diferentes. Os tipos são determinados por suas estruturas e, neste caso, como as estruturas são as mesmas, eles são compatíveis e válidos.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Válido
```

### Regras Fundamentais de Comparação do TypeScript

O processo de comparação do TypeScript é recursivo e executado em tipos aninhados em qualquer nível.

Um tipo "X" é compatível com "Y" se "Y" tiver pelo menos os mesmos membros que "X".

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Válido, pois tem pelo menos os mesmos membros que X
const r: X = y;
```

Parâmetros de função são comparados por tipos, não por seus nomes:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Válido
x = y; // Válido
```

Os tipos de retorno de função devem ser os mesmos:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Inválido
x = y; // Inválido
```

O tipo de retorno de uma função fonte deve ser um subtipo do tipo de retorno de uma função alvo:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Válido
y = x; // Inválido, membro b está faltando
```

Descartar parâmetros de função é permitido, pois é uma prática comum em JavaScript, por exemplo, usando "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Portanto, as seguintes declarações de tipo são completamente válidas:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Parâmetro b faltando
y = x; // Válido
```

Quaisquer parâmetros opcionais adicionais do tipo fonte são válidos:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Válido
x = y; // Válido
```

Quaisquer parâmetros opcionais do tipo alvo sem parâmetros correspondentes no tipo fonte são válidos e não são um erro:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Válido
x = y; // Válido
```

O parâmetro rest é tratado como uma série infinita de parâmetros opcionais:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; // válido
```

Funções com overloads são válidas se a assinatura de overload for compatível com sua assinatura de implementação:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Válido
x('a', 1); // Válido

function y(a: string): void; // Inválido, não compatível com a assinatura de implementação
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

A comparação de parâmetros de função é bem-sucedida se os parâmetros de origem e destino forem atribuíveis a supertipos ou subtipos (bivariância).

```typescript
// Supertipo
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtipo
class Y extends X {}
// Subtipo
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariância aceita supertipos
console.log(getA(new X('x'))); // Válido
console.log(getA(new Y('Y'))); // Válido
console.log(getA(new Z('z'))); // Válido
```

Enums são comparáveis e válidos com numbers e vice-versa, mas comparar valores Enum de diferentes tipos Enum é inválido.

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Válido
const ya: Y = 0; // Válido
X.A === Y.A; // Inválido
```

Instâncias de uma classe estão sujeitas a uma verificação de compatibilidade para seus membros private e protected:

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Inválido
```

A verificação de comparação não leva em consideração a hierarquia de herança diferente, por exemplo:

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Válido
x === z; // Válido mesmo que z seja de uma hierarquia de herança diferente
```

Generics são comparados usando suas estruturas com base no tipo resultante após aplicar o parâmetro genérico, apenas o resultado final é comparado como um tipo não genérico.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Inválido, pois o argumento de tipo é usado na estrutura final
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Válido, pois o argumento de tipo não é usado na estrutura final
```

Quando generics não têm seu argumento de tipo especificado, todos os argumentos não especificados são tratados como tipos com "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Válido
```

Lembre-se:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Válido, tudo é atribuível a si mesmo

let c: any;
c = 1; // Válido, todos os tipos são atribuíveis a any

let d: unknown;
d = 1; // Válido, todos os tipos são atribuíveis a unknown

let e: unknown;
let e1: unknown = e; // Válido, unknown é atribuível apenas a si mesmo e any
let e2: any = e; // Válido
let e3: number = e; // Inválido

let f: never;
f = 1; // Inválido, nada é atribuível a never

let g: void;
let g1: any;
g = 1; // Inválido, void não é atribuível a ou de nada exceto any
g = g1; // Válido
```

Observe que quando "strictNullChecks" está habilitado, "null" e "undefined" são tratados de forma semelhante a "void"; caso contrário, eles são semelhantes a "never".

### Tipos como Conjuntos

No TypeScript, um tipo é um conjunto de valores possíveis. Este conjunto também é referido como o domínio do tipo. Cada valor de um tipo pode ser visto como um elemento em um conjunto. Um tipo estabelece as restrições que cada elemento no conjunto deve satisfazer para ser considerado um membro desse conjunto.
A tarefa primária do TypeScript é verificar e confirmar se um conjunto é um subconjunto de outro.

O TypeScript suporta vários tipos de conjuntos:

| Termo do conjunto  | TypeScript                      | Notas                                                                                                              |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Conjunto vazio     | never                           | "never" não contém nada além de si mesmo                                                                           |
| Conjunto de elemento único | undefined / null / tipo literal |                                                                                                            |
| Conjunto finito    | boolean / union                 |                                                                                                                    |
| Conjunto infinito  | string / number / object        |                                                                                                                    |
| Conjunto universal | any / unknown                   | Cada elemento é um membro de "any" e cada conjunto é um subconjunto dele / "unknown" é uma contraparte type-safe de "any" |

Aqui estão alguns exemplos:

| TypeScript            | Termo do conjunto      | Exemplo                                                                         |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (conjunto vazio)     | const x: never = 'x'; // Erro: Type 'string' is not assignable to type 'never' |
|                       |                        |
| Tipo literal          | Conjunto de elemento único | type X = 'X';                                                              |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| Valor atribuível a T  | Valor ∈ T (membro de)  | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T1 atribuível a T2    | T1 ⊆ T2 (subconjunto de) | type XY = 'X' \| 'Y';                                                         |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.               |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (subconjunto de) | type X = 'X' extends string ? true : false;                                   |
|                       |                        |
| T1 \| T2              | T1 ∪ T2 (união)        | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2 (intersecção)  | type X = \{ a: string \}                                                        |
|                       |                        | type Y = \{ b: string \}                                                        |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                              |
|                       |                        |
| unknown               | Conjunto universal     | const x: unknown = 1                                                            |

Uma união, (T1 | T2) cria um conjunto mais amplo (ambos):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Válido
```

Uma intersecção, (T1 & T2) cria um conjunto mais restrito (apenas compartilhados):

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Inválido
const j: XY = { a: 'a', b: 'b' }; // Válido
```

A palavra-chave `extends` pode ser considerada como um "subconjunto de" neste contexto. Ela define uma restrição para um tipo. O extends usado com um generic, toma o generic como um conjunto infinito e o restringirá a um tipo mais específico.
Observe que `extends` não tem nada a ver com hierarquia no sentido OOP (não há este conceito no TypeScript).
O TypeScript trabalha com conjuntos e não tem uma hierarquia estrita. Na verdade, como no exemplo abaixo, dois tipos podem se sobrepor sem que nenhum seja um subtipo do outro tipo (o TypeScript considera a estrutura, forma dos objetos).

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Válido
```

### Atribuir um tipo: Declarações de Tipo e Asserções de Tipo

Um tipo pode ser atribuído de diferentes maneiras no TypeScript:

#### Declaração de Tipo

No seguinte exemplo, usamos x: X (": Type") para declarar um tipo para a variável x.

```typescript
type X = {
    a: string;
};

// Declaração de tipo
const x: X = {
    a: 'a',
};
```

Se a variável não estiver no formato especificado, o TypeScript reportará um erro. Por exemplo:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Erro: Object literal may only specify known properties
};
```

#### Asserção de Tipo

É possível adicionar uma asserção usando a palavra-chave `as`. Isso diz ao compilador que o desenvolvedor tem mais informações sobre um tipo e silencia quaisquer erros que possam ocorrer.

Por exemplo:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

No exemplo acima, o objeto x é afirmado como tendo o tipo X usando a palavra-chave as. Isso informa ao compilador TypeScript que o objeto está em conformidade com o tipo especificado, mesmo que tenha uma propriedade adicional b não presente na definição do tipo.

Asserções de tipo são úteis em situações onde um tipo mais específico precisa ser especificado, especialmente ao trabalhar com o DOM. Por exemplo:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Aqui, a asserção de tipo as HTMLInputElement é usada para dizer ao TypeScript que o resultado de getElementById deve ser tratado como um HTMLInputElement.
Asserções de tipo também podem ser usadas para remapear chaves, como mostrado no exemplo abaixo com template literals:

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

Neste exemplo, o tipo `J<Type>` usa um tipo mapeado com um template literal para remapear as chaves de Type. Ele cria novas propriedades com um "prefix_" adicionado a cada chave, e seus valores correspondentes são funções retornando os valores das propriedades originais.

Vale a pena notar que ao usar uma asserção de tipo, o TypeScript não executará verificação de propriedade excessiva. Portanto, geralmente é preferível usar uma Declaração de Tipo quando a estrutura do objeto é conhecida antecipadamente.

#### Declarações Ambientes

Declarações ambientes são arquivos que descrevem tipos para código JavaScript, eles têm um formato de nome de arquivo como `.d.ts.`. Eles são geralmente importados e usados para anotar bibliotecas JavaScript existentes ou para adicionar tipos a arquivos JS existentes em seu projeto.

Muitos tipos de bibliotecas comuns podem ser encontrados em:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

e podem ser instalados usando:

```shell
npm install --save-dev @types/library-name
```

Para suas Declarações Ambientes definidas, você pode importar usando a referência "triple-slash":

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Você pode usar Declarações Ambientes mesmo dentro de arquivos JavaScript usando `// @ts-check`.

A palavra-chave `declare` habilita definições de tipo para código JavaScript existente sem importá-lo, servindo como um placeholder para tipos de outro arquivo ou globalmente.

### Verificação de Propriedade e Verificação de Propriedade Excessiva

O TypeScript é baseado em um sistema de tipos estrutural, mas a verificação de propriedade excessiva é uma propriedade do TypeScript que permite verificar se um objeto tem as propriedades exatas especificadas no tipo.

A Verificação de Propriedade Excessiva é realizada ao atribuir literais de objeto a variáveis ou ao passá-los como argumentos para a propriedade excessiva da função, por exemplo.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Válido por causa da tipagem estrutural
const w: X = { a: 'a', b: 'b' }; // Inválido por causa da verificação de propriedade excessiva
```

### Tipos Fracos

Um tipo é considerado fraco quando contém nada além de um conjunto de todas as propriedades opcionais:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

O TypeScript considera um erro atribuir qualquer coisa a um tipo fraco quando não há sobreposição, por exemplo, o seguinte lança um erro:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Inválido
```

Embora não seja recomendado, se necessário, é possível contornar esta verificação usando asserção de tipo:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Válido
```

Ou adicionando `unknown` à assinatura de índice ao tipo fraco:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Válido
```

### Verificação Estrita de Objeto Literal (Freshness)

A verificação estrita de objeto literal, às vezes referida como "freshness", é um recurso do TypeScript que ajuda a capturar propriedades excessivas ou mal digitadas que, de outra forma, passariam despercebidas em verificações de tipo estrutural normais.

Ao criar um objeto literal, o compilador TypeScript o considera "fresh". Se o objeto literal for atribuído a uma variável ou passado como um parâmetro, o TypeScript lançará um erro se o objeto literal especificar propriedades que não existem no tipo de destino.

No entanto, a "freshness" desaparece quando um objeto literal é ampliado ou uma asserção de tipo é usada.

Aqui estão alguns exemplos para ilustrar:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Verificação de freshness: Atribuição inválida
var y: Y;
y = { a: 'a', bx: 'bx' }; // Verificação de freshness: Atribuição inválida

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Ampliação: Sem erros, estruturalmente compatível com o tipo

fn({ a: 'a', bx: 'b' }); // Verificação de freshness: Argumento inválido

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Ampliação: Sem verificação de Freshness
```

### Inferência de Tipo

O TypeScript pode inferir tipos quando nenhuma anotação é fornecida durante:

* Inicialização de variável.
* Inicialização de membro.
* Configuração de padrões para parâmetros.
* Tipo de retorno de função.

Por exemplo:

```typescript
let x = 'x'; // O tipo inferido é string
```

O compilador TypeScript analisa o valor ou expressão e determina seu tipo com base nas informações disponíveis.

### Inferências Mais Avançadas

Quando múltiplas expressões são usadas na inferência de tipo, o TypeScript procura os "melhores tipos comuns". Por exemplo:

```typescript
let x = [1, 'x', 1, null]; // O tipo inferido é: (string | number | null)[]
```

Se o compilador não conseguir encontrar os melhores tipos comuns, ele retorna um tipo union. Por exemplo:

```typescript
let x = [new RegExp('x'), new Date()]; // Tipo inferido é: (RegExp | Date)[]
```

O TypeScript utiliza "tipagem contextual" com base na localização da variável para inferir tipos. No seguinte exemplo, o compilador sabe que `e` é do tipo `MouseEvent` por causa do tipo de evento `click` definido no arquivo lib.d.ts, que contém declarações ambientes para várias construções JavaScript comuns e o DOM:

```typescript
window.addEventListener('click', function (e) {}); // O tipo inferido de e é MouseEvent
```

### Ampliação de Tipo

Ampliação de tipo é o processo no qual o TypeScript atribui um tipo a uma variável inicializada quando nenhuma anotação de tipo foi fornecida. Permite tipos mais restritos para tipos mais amplos, mas não vice-versa.
No seguinte exemplo:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infere como string, um tipo amplo
let y: 'y' | 'x' = 'y'; // y tipos é uma união de tipos literais
y = x; // Inválido Type 'string' is not assignable to type '"x" | "y"'.
```

O TypeScript atribui `string` a `x` com base no valor único fornecido durante a inicialização (`x`), este é um exemplo de ampliação.

O TypeScript fornece maneiras de ter controle sobre o processo de ampliação, por exemplo, usando "const".

### Const

Usar a palavra-chave `const` ao declarar uma variável resulta em uma inferência de tipo mais restrita no TypeScript.

Por exemplo:

```typescript
const x = 'x'; // TypeScript infere o tipo de x como 'x', um tipo mais restrito
let y: 'y' | 'x' = 'y';
y = x; // Válido: O tipo de x é inferido como 'x'
```

Ao usar `const` para declarar a variável x, seu tipo é restringido ao valor literal específico 'x'. Como o tipo de x é restringido, ele pode ser atribuído à variável y sem qualquer erro.
A razão pela qual o tipo pode ser inferido é porque variáveis `const` não podem ser reatribuídas, então seu tipo pode ser restringido a um tipo literal específico, neste caso, o tipo literal 'x'.

#### Modificador Const em Parâmetros de Tipo

A partir da versão 5.0 do TypeScript, é possível especificar o atributo `const` em um parâmetro de tipo genérico. Isso permite inferir o tipo mais preciso possível. Vamos ver um exemplo sem usar `const`:

```typescript
function identity<T>(value: T) {
    // Sem const aqui
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Tipo inferido é: { a: string; b: string; }
```

Como você pode ver, as propriedades `a` e `b` são inferidas com um tipo de `string`.

Agora, vamos ver a diferença com a versão `const`:

```typescript
function identity<const T>(value: T) {
    // Usando modificador const em parâmetros de tipo
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Tipo inferido é: { a: "a"; b: "b"; }
```

Agora podemos ver que as propriedades `a` e `b` são inferidas como `const`, então `a` e `b` são tratados como string literals em vez de apenas tipos `string`.

#### Asserção const

Este recurso permite que você declare uma variável com um tipo literal mais preciso com base em seu valor de inicialização, indicando ao compilador que o valor deve ser tratado como um literal imutável. Aqui estão alguns exemplos:

Em uma única propriedade:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

Em um objeto inteiro:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Isso pode ser particularmente útil ao definir o tipo para uma tuple:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple de readonly [1, 2, 3]
```

### Anotação de Tipo Explícita

Podemos ser específicos e passar um tipo, no seguinte exemplo a propriedade `x` é do tipo `number`:

```typescript
const v = {
    x: 1, // Tipo inferido: number (ampliação)
};
v.x = 3; // Válido
```

Podemos tornar a anotação de tipo mais específica usando uma união de tipos literais:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x agora é uma união de tipos literais: 1 | 2 | 3
};
v.x = 3; // Válido
v.x = 100; // Inválido
```

### Estreitamento de Tipo

Estreitamento de Tipo é o processo no TypeScript onde um tipo geral é estreitado para um tipo mais específico. Isso ocorre quando o TypeScript analisa o código e determina que certas condições ou operações podem refinar as informações do tipo.

O estreitamento de tipos pode ocorrer de diferentes maneiras, incluindo:

#### Condições

Ao usar instruções condicionais, como `if` ou `switch`, o TypeScript pode estreitar o tipo com base no resultado da condição. Por exemplo:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // O tipo é number, que havia sido estreitado pela condição
}
```

#### Lançar ou retornar

Lançar um erro ou retornar cedo de um branch pode ser usado para ajudar o TypeScript a estreitar um tipo. Por exemplo:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Outras maneiras de estreitar tipos no TypeScript incluem:

* Operador `instanceof`: Usado para verificar se um objeto é uma instância de uma classe específica.
* Operador `in`: Usado para verificar se uma propriedade existe em um objeto.
* Operador `typeof`: Usado para verificar o tipo de um valor em tempo de execução.
* Funções integradas como `Array.isArray()`: Usadas para verificar se um valor é um array.

#### União Discriminada

Usar uma "União Discriminada" é um padrão no TypeScript onde uma "tag" explícita é adicionada aos objetos para distinguir entre diferentes tipos dentro de uma união. Este padrão também é referido como uma "união marcada". No seguinte exemplo, a "tag" é representada pela propriedade "type":

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type é A
        case 'type_b':
            return input.value + 'extra'; // type é B
    }
};
```

#### Type Guards Definidos pelo Usuário

Em casos onde o TypeScript não consegue determinar um tipo, é possível escrever uma função auxiliar conhecida como "type guard definido pelo usuário". No seguinte exemplo, utilizaremos um Type Predicate para estreitar o tipo após aplicar certa filtragem:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // O tipo é (string | null)[], TypeScript não conseguiu inferir o tipo corretamente

const isValid = (item: string | null): item is string => item !== null; // Type guard customizado

const r2 = data.filter(isValid); // O tipo está correto agora string[], ao usar o type guard predicado conseguimos estreitar o tipo
```

