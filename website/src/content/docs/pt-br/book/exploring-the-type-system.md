---
title: Explorando o Sistema de Tipos
sidebar:
  order: 9
  label: 9. Explorando o Sistema de Tipos
---


### O Serviço de Linguagem do TypeScript

O Serviço de Linguagem do TypeScript, também conhecido como tsserver, oferece vários recursos, como relatório de erros, diagnósticos, compilar ao salvar, renomeação, ir para definição, listas de preenchimento, ajuda de assinatura e muito mais. É usado principalmente por ambientes de desenvolvimento integrados (IDEs) para fornecer suporte ao IntelliSense. Ele se integra perfeitamente ao Visual Studio Code e é utilizado por ferramentas como Conquer of Completion (Coc).

Os desenvolvedores podem aproveitar uma API dedicada e criar seus próprios plugins de serviço de linguagem personalizados para aprimorar a experiência de edição do TypeScript. Isso pode ser particularmente útil para implementar recursos especiais de linting ou habilitar o preenchimento automático para uma linguagem de modelagem personalizada.

<!-- markdownlint-disable MD044 -->
Um exemplo de plugin personalizado do mundo real é o "typescript-styled-plugin", que fornece relatórios de erros de sintaxe e suporte IntelliSense para propriedades CSS em componentes estilizados (styled components).
<!-- markdownlint-enable MD044 -->

Para mais informações e guias de início rápido, você pode consultar o Wiki oficial do TypeScript no GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Tipagem Estrutural

O TypeScript é baseado em um sistema de tipos estrutural. Isso significa que a compatibilidade e a equivalência de tipos são determinadas pela estrutura ou definição real do tipo, em vez de seu nome ou local de declaração, como em sistemas de tipos nominativos como C# ou C++.

O sistema de tipos estrutural do TypeScript foi projetado com base em como o sistema de tipagem dinâmica "duck typing" do JavaScript funciona durante o tempo de execução.

O exemplo a seguir é um código TypeScript válido. Como você pode observar, "X" e "Y" têm o mesmo membro "a", embora tenham nomes de declaração diferentes. Os tipos são determinados por suas estruturas e, neste caso, como as estruturas são as mesmas, eles são compatíveis e válidos.

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

Os parâmetros da função são comparados por tipos, não por seus nomes:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Válido
x = y; // Válido
```

Os tipos de retorno da função devem ser os mesmos:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Inválido
x = y; // Inválido
```

O tipo de retorno de uma função de origem deve ser um subtipo do tipo de retorno de uma função de destino:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Válido
y = x; // Inválido, o membro b está faltando
```

Descartar parâmetros de função é permitido, pois é uma prática comum no JavaScript, por exemplo, usando "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Portanto, as seguintes declarações de tipo são completamente válidas:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Falta o parâmetro b
y = x; // Válido
```

Quaisquer parâmetros opcionais adicionais do tipo de origem são válidos:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Válido
x = y; // Válido
```

Quaisquer parâmetros opcionais do tipo de destino sem parâmetros correspondentes no tipo de origem são válidos e não constituem um erro:

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
let x: X = a => undefined; // Válido
```

Funções com sobrecargas são válidas se a assinatura da sobrecarga for compatível com sua assinatura de implementação:

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

A comparação de parâmetros de função é bem-sucedida se os parâmetros de origem e de destino forem atribuíveis a supertipos ou subtipos (bivariância).

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

// A bivariância aceita supertipos
console.log(getA(new X('x'))); // Válido
console.log(getA(new Y('Y'))); // Válido
console.log(getA(new Z('z'))); // Válido
```

Enums são comparáveis e válidos com números e vice-versa, mas comparar valores de Enum de diferentes tipos de Enum é inválido.

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

Instâncias de uma classe estão sujeitas a uma verificação de compatibilidade para seus membros privados e protegidos:

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

A verificação de comparação não leva em consideração as diferentes hierarquias de herança, por exemplo:

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

Genéricos são comparados usando suas estruturas baseadas no tipo resultante após a aplicação do parâmetro genérico; apenas o resultado final é comparado como um tipo não genérico.

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

Quando os genéricos não têm seu argumento de tipo especificado, todos os argumentos não especificados são tratados como tipos com "any":

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
let e1: unknown = e; // Válido, unknown só é atribuível a si mesmo e a any
let e2: any = e; // Válido
let e3: number = e; // Inválido

let f: never;
f = 1; // Inválido, nada é atribuível a never

let g: void;
let g1: any;
g = 1; // Inválido, void não é atribuível a nada, exceto any, nem nada é atribuível a ele
g = g1; // Válido
```

Observe que quando "strictNullChecks" está habilitado, "null" e "undefined" são tratados de forma semelhante a "void"; caso contrário, são semelhantes a "never".

### Tipos como Conjuntos

No TypeScript, um tipo é um conjunto de valores possíveis. Este conjunto também é conhecido como o domínio do tipo. Cada valor de um tipo pode ser visto como um elemento em um conjunto. Um tipo estabelece as restrições que cada elemento no conjunto deve satisfazer para ser considerado um membro desse conjunto.
A principal tarefa do TypeScript é verificar se um conjunto é um subconjunto de outro.

O TypeScript suporta vários tipos de conjuntos:

| Termo do conjunto      | TypeScript                      | Notas                                                                                                                                  |
| ---------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Conjunto vazio         | never                           | "never" não contém nada além de si mesmo                                                                                               |
| Conjunto de elemento único | undefined / null / tipo literal |                                                                                                                                        |
| Conjunto finito        | boolean / união                 |                                                                                                                                        |
| Conjunto infinito      | string / number / objeto        |                                                                                                                                        |
| Conjunto universal     | any / unknown                   | Cada elemento é um membro de "any" e cada conjunto é um subconjunto dele / "unknown" é uma contraparte segura em termos de tipo do "any" |

Aqui estão alguns exemplos:

| TypeScript              | Termo do conjunto          | Exemplo                                                                               |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| never                   | ∅ (conjunto vazio)         | const x: never = 'x'; // Erro: O tipo 'string' não pode ser atribuído ao tipo 'never' |
|                         |                            |
| Tipo literal            | Conjunto de elemento único | type X = 'X';                                                                         |
|                         |                            | type Y = 7;                                                                           |
|                         |                            |
| Valor atribuível a T    | Valor ∈ T (membro de)      | type XY = 'X' \| 'Y';                                                                 |
|                         |                            | const x: XY = 'X';                                                                    |
|                         |                            |
| T1 atribuível a T2      | T1 ⊆ T2 (subconjunto de)   | type XY = 'X' \| 'Y';                                                                 |
|                         |                            | const x: XY = 'X';                                                                    |
|                         |                            | const j: XY = 'J'; // O tipo '"J"' não pode ser atribuído ao tipo 'XY'.               |
|                         |                            |                                                                                       |
| T1 extends T2           | T1 ⊆ T2 (subconjunto de)   | type X = 'X' extends string ? true : false;                                           |
|                         |                            |
| T1 \| T2                | T1 ∪ T2 (união)            | type XY = 'X' \| 'Y';                                                                 |
|                         |                            | type JK = 1 \| 2;                                                                     |
|                         |                            |
| T1 & T2                 | T1 ∩ T2 (interseção)       | type X = \{ a: string \}                                                                |
|                         |                            | type Y = \{ b: string \}                                                                |
|                         |                            | type XY = X & Y                                                                       |
|                         |                            | const x: XY = \{ a: 'a', b: 'b' \}                                                      |
|                         |                            |
| unknown                 | Conjunto universal         | const x: unknown = 1                                                                  |

Uma união, (T1 | T2), cria um conjunto mais amplo (ambos):

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

Uma interseção, (T1 & T2), cria um conjunto mais estreito (apenas o que é compartilhado):

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

A palavra-chave `extends` pode ser considerada como "subconjunto de" neste contexto. Ela define uma restrição para um tipo. O `extends` usado com um genérico trata o genérico como um conjunto infinito e o restringe a um tipo mais específico.
Observe que o `extends` nada tem a ver com hierarquia no sentido de Orientação a Objetos (não existe esse conceito no TypeScript).
O TypeScript trabalha com conjuntos e não possui uma hierarquia estrita; de fato, como no exemplo abaixo, dois tipos podem se sobrepor sem que nenhum seja um subtipo do outro (o TypeScript considera a estrutura, a forma dos objetos).

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

No exemplo a seguir, usamos x: X (": Tipo") para declarar um tipo para a variável x.

```typescript
type X = {
    a: string;
};

// Declaração de tipo
const x: X = {
    a: 'a',
};
```

Se a variável não estiver no formato especificado, o TypeScript relatará um erro. Por exemplo:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Erro: O objeto literal só pode especificar propriedades conhecidas
};
```

#### Asserção de Tipo

É possível adicionar uma asserção usando a palavra-chave `as`. Isso informa ao compilador que o desenvolvedor tem mais informações sobre um tipo e silencia quaisquer erros que possam ocorrer.

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

No exemplo acima, o objeto x é asseverado como tendo o tipo X usando a palavra-chave `as`. Isso informa ao compilador TypeScript que o objeto está em conformidade com o tipo especificado, embora tenha uma propriedade b adicional não presente na definição do tipo.

Asserções de tipo são úteis em situações onde um tipo mais específico precisa ser especificado, especialmente ao trabalhar com o DOM. Por exemplo:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Aqui, a asserção de tipo `as HTMLInputElement` é usada para dizer ao TypeScript que o resultado de `getElementById` deve ser tratado como um `HTMLInputElement`.
Asserções de tipo também podem ser usadas para mapear chaves novamente, conforme mostrado no exemplo abaixo com literais de template:

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

Neste exemplo, o tipo `J<Type>` usa um tipo mapeado com um literal de template para mapear as chaves de `Type`. Ele cria novas propriedades com um "prefix_" adicionado a cada chave, e seus valores correspondentes são funções que retornam os valores originais da propriedade.

Vale a pena notar que, ao usar uma asserção de tipo, o TypeScript não executará a verificação de excesso de propriedades. Portanto, geralmente é preferível usar uma Declaração de Tipo quando a estrutura do objeto for conhecida antecipadamente.

#### Declarações de Ambiente (Ambient Declarations)

Declarações de ambiente são arquivos que descrevem tipos para código JavaScript; eles têm o formato de nome de arquivo `.d.ts`. Geralmente são importados e usados para anotar bibliotecas JavaScript existentes ou para adicionar tipos a arquivos JS existentes em seu projeto.

Muitos tipos de bibliotecas comuns podem ser encontrados em:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

e podem ser instalados usando:

```shell
npm install --save-dev @types/nome-da-biblioteca
```

Para suas Declarações de Ambiente definidas, você pode importar usando a referência de "barra tripla":

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Você pode usar Declarações de Ambiente até mesmo em arquivos JavaScript usando `// @ts-check`.

A palavra-chave `declare` habilita definições de tipo para código JavaScript existente sem importá-lo, servindo como um marcador para tipos de outro arquivo ou globalmente.

### Verificação de Propriedades e Verificação de Excesso de Propriedades

O TypeScript é baseado em um sistema de tipos estrutural, mas a verificação de excesso de propriedades é um recurso do TypeScript que permite verificar se um objeto tem exatamente as propriedades especificadas no tipo.

A Verificação de Excesso de Propriedades é executada ao atribuir objetos literais a variáveis ou ao passá-los como argumentos para funções, por exemplo.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Válido por causa da tipagem estrutural
const w: X = { a: 'a', b: 'b' }; // Inválido por causa da verificação de excesso de propriedades
```

### Tipos Fracos (Weak Types)

Um tipo é considerado fraco quando não contém nada além de um conjunto de todas as propriedades opcionais:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

O TypeScript considera um erro atribuir qualquer coisa a um tipo fraco quando não há sobreposição; por exemplo, o seguinte lança um erro:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Inválido
```

Embora não recomendado, se necessário, é possível ignorar esta verificação usando asserção de tipo:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Válido
```

Ou adicionando `unknown` à assinatura de índice do tipo fraco:

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

A verificação estrita de objeto literal, às vezes chamada de "freshness", é um recurso do TypeScript que ajuda a capturar propriedades em excesso ou com erro de ortografia que, de outra forma, passariam despercebidas em verificações normais de tipo estrutural.

Ao criar um objeto literal, o compilador TypeScript o considera "fresco" (fresh). Se o objeto literal for atribuído a uma variável ou passado como um parâmetro, o TypeScript lançará um erro se o objeto literal especificar propriedades que não existem no tipo de destino.

No entanto, a "freshness" desaparece quando um objeto literal é alargado ou quando uma asserção de tipo é usada.

Aqui estão alguns exemplos para ilustrar:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Verificação de Freshness: Atribuição inválida
var y: Y;
y = { a: 'a', bx: 'bx' }; // Verificação de Freshness: Atribuição inválida

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Alargamento (Widening): Sem erros, estruturalmente compatível em termos de tipo

fn({ a: 'a', bx: 'b' }); // Verificação de Freshness: Argumento inválido

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Alargamento: Sem verificação de Freshness
```

### Inferência de Tipo

O TypeScript pode inferir tipos quando nenhuma anotação é fornecida durante a:

* Inicialização da variável.
* Inicialização de membros.
* Definição de valores padrão para parâmetros.
* Tipo de retorno da função.

Por exemplo:

```typescript
let x = 'x'; // O tipo inferido é string
```

O compilador TypeScript analisa o valor ou expressão e determina seu tipo com base nas informações disponíveis.

### Inferências Mais Avançadas

Quando várias expressões são usadas na inferência de tipo, o TypeScript procura pelos "melhores tipos comuns" (best common types). Por exemplo:

```typescript
let x = [1, 'x', 1, null]; // O tipo inferido é: (string | number | null)[]
```

Se o compilador não conseguir encontrar os melhores tipos comuns, ele retorna um tipo de união. Por exemplo:

```typescript
let x = [new RegExp('x'), new Date()]; // O tipo inferido é: (RegExp | Date)[]
```

O TypeScript utiliza a "tipagem contextual" baseada na localização da variável para inferir tipos. No exemplo a seguir, o compilador sabe que `e` é do tipo `MouseEvent` por causa do tipo de evento `click` definido no arquivo `lib.d.ts`, que contém declarações de ambiente para várias construções JavaScript comuns e o DOM:

```typescript
window.addEventListener('click', function (e) {}); // O tipo inferido de e é MouseEvent
```

### Alargamento de Tipo (Type Widening)

O alargamento de tipo (type widening) é o processo no qual o TypeScript atribui um tipo a uma variável inicializada quando nenhuma anotação de tipo foi fornecida. Ele permite tipos de mais estreitos para mais amplos, mas não o contrário.
No exemplo a seguir:

<!-- skip -->
```typescript
let x = 'x'; // O TypeScript infere como string, um tipo amplo
let y: 'y' | 'x' = 'y'; // o tipo de y é uma união de tipos literais
y = x; // Inválido: O tipo 'string' não pode ser atribuído ao tipo '"x" | "y"'.
```

O TypeScript atribui `string` a `x` com base no valor único fornecido durante a inicialização (`x`); este é um exemplo de alargamento.

O TypeScript fornece maneiras de ter controle sobre o processo de alargamento, por exemplo, usando "const".

### Const

O uso da palavra-chave `const` ao declarar uma variável resulta em uma inferência de tipo mais estreita no TypeScript.

Por exemplo:

```typescript
const x = 'x'; // O TypeScript infere o tipo de x como 'x', um tipo mais estreito
let y: 'y' | 'x' = 'y';
y = x; // Válido: O tipo de x é inferido como 'x'
```

Ao usar `const` para declarar a variável x, seu tipo é estreitado para o valor literal específico 'x'. Como o tipo de x é estreitado, ele pode ser atribuído à variável y sem nenhum erro.
A razão pela qual o tipo pode ser inferido é porque as variáveis `const` não podem ser reatribuídas, portanto seu tipo pode ser estreitado para um tipo literal específico, neste caso, o tipo literal 'x'.

#### Modificador Const em Parâmetros de Tipo

A partir da versão 5.0 do TypeScript, é possível especificar o atributo `const` em um parâmetro de tipo genérico. Isso permite inferir o tipo mais preciso possível. Vejamos um exemplo sem usar `const`:

```typescript
function identity<T>(value: T) {
    // Sem const aqui
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // O tipo inferido é: { a: string; b: string; }
```

Como você pode ver, as propriedades `a` e `b` são inferidas com o tipo `string`.

Agora, vejamos a diferença com a versão `const`:

```typescript
function identity<const T>(value: T) {
    // Usando modificador const em parâmetros de tipo
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // O tipo inferido é: { a: "a"; b: "b"; }
```

Agora podemos ver que as propriedades `a` e `b` são inferidas como `const`, portanto `a` e `b` são tratados como literais de string em vez de apenas tipos `string`.

#### Asserção Const (Const assertion)

Este recurso permite declarar uma variável com um tipo literal mais preciso baseado em seu valor de inicialização, sinalizando ao compilador que o valor deve ser tratado como um literal imutável. Aqui estão alguns exemplos:

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

Isso pode ser particularmente útil ao definir o tipo para uma tupla:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tupla de readonly [1, 2, 3]
```

### Anotação de Tipo Explícita

Podemos ser específicos e passar um tipo; no exemplo a seguir, a propriedade `x` é do tipo `number`:

```typescript
const v = {
    x: 1, // Tipo inferido: number (alargamento)
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

### Estreitamento de Tipo (Type Narrowing)

O Estreitamento de Tipo (Type Narrowing) é o processo no TypeScript onde um tipo geral é estreitado para um tipo mais específico. Isso ocorre quando o TypeScript analisa o código e determina que certas condições ou operações podem refinar a informação do tipo.

O estreitamento de tipos pode ocorrer de diferentes maneiras, incluindo:

#### Condições

Ao usar instruções condicionais, como `if` ou `switch`, o TypeScript pode estreitar o tipo com base no resultado da condição. Por exemplo:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // O tipo é number, que foi estreitado pela condição
}
```

#### Lançando ou retornando

Lançar um erro ou retornar cedo de uma ramificação pode ser usado para ajudar o TypeScript a estreitar um tipo. Por exemplo:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'erro';
}
x += 100;
```

Outras formas de estreitar tipos no TypeScript incluem:

* Operador `instanceof`: Usado para verificar se um objeto é uma instância de uma classe específica.
* Operador `in`: Usado para verificar se uma propriedade existe em um objeto.
* Operador `typeof`: Usado para verificar o tipo de um valor em tempo de execução.
* Funções integradas como `Array.isArray()`: Usadas para verificar se um valor é um array.

#### União Discriminada

O uso de uma "União Discriminada" é um padrão no TypeScript onde uma "tag" explícita é adicionada aos objetos para distinguir entre diferentes tipos dentro de uma união. Este padrão também é conhecido como "união tagueada" (tagged union). No exemplo a seguir, a "tag" é representada pela propriedade "type":

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // o tipo é A
        case 'type_b':
            return input.value + 'extra'; // o tipo é B
    }
};
```

#### Proteções de Tipo Definidas pelo Usuário (User-Defined Type Guards)

Em casos onde o TypeScript não é capaz de determinar um tipo, é possível escrever uma função auxiliar conhecida como "proteção de tipo definida pelo usuário" (user-defined type guard). No exemplo a seguir, utilizaremos um Predicado de Tipo para estreitar o tipo após aplicar certa filtragem:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // O tipo é (string | null)[], o TypeScript não foi capaz de inferir o tipo corretamente

const isValid = (item: string | null): item is string => item !== null; // Protetor de tipo customizado

const r2 = data.filter(isValid); // O tipo está correto agora string[], ao usar o protetor de tipo predicado conseguimos estreitar o tipo
```

#### Redução de tipos com switch-true

O TypeScript 5.3 adiciona a redução de tipos com `switch-true`, permitindo substituir cadeias complexas de `if/else` por `switch (true)` usando condições booleanas. Isso melhora a legibilidade e ainda reduz os tipos. É semelhante ao casamento de padrões, mas mais simples.

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

