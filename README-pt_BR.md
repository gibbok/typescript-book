# O Concise TypeScript Book

O Concise TypeScript Book fornece uma visão geral abrangente e sucinta das capacidades do TypeScript. Ele oferece explicações claras cobrindo todos os aspectos encontrados na versão mais recente da linguagem, desde seu poderoso sistema de tipos até recursos avançados. Seja você um iniciante ou um desenvolvedor experiente, este livro é um recurso inestimável para aprimorar sua compreensão e proficiência em TypeScript.

Este livro é completamente Gratuito e de Código Aberto.

Acredito que educação técnica de alta qualidade deve ser acessível a todos, por isso mantenho este livro gratuito e aberto.

Se o livro ajudou você a corrigir um bug, entender um conceito complicado ou avançar em sua carreira, por favor considere apoiar meu trabalho pagando o quanto quiser (preço sugerido: 15 USD) ou patrocinando um café. Seu apoio me ajuda a manter o conteúdo atualizado e expandi-lo com novos exemplos e explicações mais profundas.

[![Buy Me a Coffee](https://img.shields.io/badge/buy_me_a_coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/simonepoggiali)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?business=QW82ZS956XLFY&no_recurring=0&currency_code=EUR)

## Traduções

Este livro foi traduzido para várias versões de idiomas, incluindo:

[Chinês](https://github.com/gibbok/typescript-book/blob/main/README-zh_CN.md)

[Italiano](https://github.com/gibbok/typescript-book/blob/main/README-it_IT.md)

[Português Brasileiro](https://github.com/gibbok/typescript-book/blob/main/README-pt_BR.md)

## Downloads e website

Você também pode baixar a versão Epub:

[https://github.com/gibbok/typescript-book/tree/main/downloads](https://github.com/gibbok/typescript-book/tree/main/downloads)

Uma versão online está disponível em:

[https://gibbok.github.io/typescript-book](https://gibbok.github.io/typescript-book)

## Índice

<!-- markdownlint-disable MD004 -->
- [O Concise TypeScript Book](#o-concise-typescript-book)
  - [Traduções](#traduções)
  - [Downloads e website](#downloads-e-website)
  - [Índice](#índice)
  - [Introdução](#introdução)
  - [Sobre o Autor](#sobre-o-autor)
  - [Introdução ao TypeScript](#introdução-ao-typescript)
    - [O que é TypeScript?](#o-que-é-typescript)
    - [Por que TypeScript?](#por-que-typescript)
    - [TypeScript e JavaScript](#typescript-e-javascript)
    - [Geração de Código TypeScript](#geração-de-código-typescript)
    - [JavaScript Moderno Agora (Downleveling)](#javascript-moderno-agora-downleveling)
  - [Começando com TypeScript](#começando-com-typescript)
    - [Instalação](#instalação)
    - [Configuração](#configuração)
    - [Arquivo de Configuração TypeScript](#arquivo-de-configuração-typescript)
      - [target](#target)
      - [lib](#lib)
      - [strict](#strict)
      - [module](#module)
      - [moduleResolution](#moduleresolution)
      - [esModuleInterop](#esmoduleinterop)
      - [jsx](#jsx)
      - [skipLibCheck](#skiplibcheck)
      - [files](#files)
      - [include](#include)
      - [exclude](#exclude)
    - [importHelpers](#importhelpers)
    - [Conselhos para Migração para TypeScript](#conselhos-para-migração-para-typescript)
  - [Explorando o Sistema de Tipos](#explorando-o-sistema-de-tipos)
    - [O Serviço de Linguagem TypeScript](#o-serviço-de-linguagem-typescript)
    - [Tipagem Estrutural](#tipagem-estrutural)
    - [Regras Fundamentais de Comparação do TypeScript](#regras-fundamentais-de-comparação-do-typescript)
    - [Tipos como Conjuntos](#tipos-como-conjuntos)
    - [Atribuir um tipo: Declarações de Tipo e Asserções de Tipo](#atribuir-um-tipo-declarações-de-tipo-e-asserções-de-tipo)
      - [Declaração de Tipo](#declaração-de-tipo)
      - [Asserção de Tipo](#asserção-de-tipo)
      - [Declarações Ambientes](#declarações-ambientes)
    - [Verificação de Propriedade e Verificação de Propriedade Excessiva](#verificação-de-propriedade-e-verificação-de-propriedade-excessiva)
    - [Tipos Fracos](#tipos-fracos)
    - [Verificação Estrita de Objeto Literal (Freshness)](#verificação-estrita-de-objeto-literal-freshness)
    - [Inferência de Tipo](#inferência-de-tipo)
    - [Inferências Mais Avançadas](#inferências-mais-avançadas)
    - [Ampliação de Tipo](#ampliação-de-tipo)
    - [Const](#const)
      - [Modificador Const em Parâmetros de Tipo](#modificador-const-em-parâmetros-de-tipo)
      - [Asserção const](#asserção-const)
    - [Anotação de Tipo Explícita](#anotação-de-tipo-explícita)
    - [Estreitamento de Tipo](#estreitamento-de-tipo)
      - [Condições](#condições)
      - [Lançar ou retornar](#lançar-ou-retornar)
      - [União Discriminada](#união-discriminada)
      - [Type Guards Definidos pelo Usuário](#type-guards-definidos-pelo-usuário)
  - [Tipos Primitivos](#tipos-primitivos)
    - [string](#string)
    - [boolean](#boolean)
    - [number](#number)
    - [bigInt](#bigint)
    - [Symbol](#symbol)
    - [null e undefined](#null-e-undefined)
    - [Array](#array)
    - [any](#any)
  - [Anotações de Tipo](#anotações-de-tipo)
  - [Propriedades Opcionais](#propriedades-opcionais)
  - [Propriedades Readonly](#propriedades-readonly)
  - [Assinaturas de Índice](#assinaturas-de-índice)
  - [Estendendo Tipos](#estendendo-tipos)
  - [Tipos Literais](#tipos-literais)
  - [Inferência Literal](#inferência-literal)
  - [strictNullChecks](#strictnullchecks)
  - [Enums](#enums)
    - [Enums numéricos](#enums-numéricos)
    - [Enums de string](#enums-de-string)
    - [Enums constantes](#enums-constantes)
    - [Mapeamento reverso](#mapeamento-reverso)
    - [Enums ambiente](#enums-ambiente)
    - [Membros computados e constantes](#membros-computados-e-constantes)
  - [Narrowing](#narrowing)
    - [Type guards typeof](#type-guards-typeof)
    - [Narrowing de veracidade](#narrowing-de-veracidade)
    - [Narrowing de igualdade](#narrowing-de-igualdade)
    - [Narrowing do operador In](#narrowing-do-operador-in)
    - [Narrowing instanceof](#narrowing-instanceof)
  - [Atribuições](#atribuições)
  - [Análise de Fluxo de Controle](#análise-de-fluxo-de-controle)
  - [Predicados de Tipo](#predicados-de-tipo)
  - [Uniões Discriminadas](#uniões-discriminadas)
  - [O Tipo never](#o-tipo-never)
  - [Verificação de exaustividade](#verificação-de-exaustividade)
  - [Tipos de Objeto](#tipos-de-objeto)
  - [Tipo Tuple (Anônimo)](#tipo-tuple-anônimo)
  - [Tipo Tuple Nomeado (Rotulado)](#tipo-tuple-nomeado-rotulado)
  - [Tuple de Comprimento Fixo](#tuple-de-comprimento-fixo)
  - [Tipo Union](#tipo-union)
  - [Tipos de Intersecção](#tipos-de-intersecção)
  - [Indexação de Tipo](#indexação-de-tipo)
  - [Tipo a partir de Valor](#tipo-a-partir-de-valor)
  - [Tipo a partir de Retorno de Função](#tipo-a-partir-de-retorno-de-função)
  - [Tipo a partir de Módulo](#tipo-a-partir-de-módulo)
  - [Tipos Mapeados](#tipos-mapeados)
  - [Modificadores de Tipo Mapeado](#modificadores-de-tipo-mapeado)
  - [Tipos Condicionais](#tipos-condicionais)
  - [Tipos Condicionais Distributivos](#tipos-condicionais-distributivos)
  - [Inferência de Tipo infer em Tipos Condicionais](#inferência-de-tipo-infer-em-tipos-condicionais)
  - [Tipos Condicionais Predefinidos](#tipos-condicionais-predefinidos)
  - [Tipos Union de Template](#tipos-union-de-template)
  - [Tipo Any](#tipo-any)
  - [Tipo Unknown](#tipo-unknown)
  - [Tipo Void](#tipo-void)
  - [Tipo Never](#tipo-never)
  - [Interface e Type](#interface-e-type)
    - [Sintaxe Comum](#sintaxe-comum)
    - [Tipos Básicos](#tipos-básicos)
    - [Objetos e Interfaces](#objetos-e-interfaces)
    - [Tipos Union e Intersection](#tipos-union-e-intersection)
  - [Primitivos de Tipo Integrados](#primitivos-de-tipo-integrados)
  - [Objetos JS Integrados Comuns](#objetos-js-integrados-comuns)
  - [Overloads](#overloads)
  - [Mesclagem e Extensão](#mesclagem-e-extensão)
  - [Diferenças entre Type e Interface](#diferenças-entre-type-e-interface)
  - [Class](#class)
    - [Sintaxe Comum de Class](#sintaxe-comum-de-class)
    - [Constructor](#constructor)
    - [Construtores Private e Protected](#construtores-private-e-protected)
    - [Modificadores de Acesso](#modificadores-de-acesso)
    - [Get e Set](#get-e-set)
    - [Auto-Accessors em Classes](#auto-accessors-em-classes)
    - [this](#this)
    - [Propriedades de Parâmetro](#propriedades-de-parâmetro)
    - [Classes Abstratas](#classes-abstratas)
    - [Com Generics](#com-generics)
    - [Decorators](#decorators)
      - [Class Decorators](#class-decorators)
      - [Property Decorator](#property-decorator)
      - [Method Decorator](#method-decorator)
      - [Decorators de Getter e Setter](#decorators-de-getter-e-setter)
      - [Metadados de Decorator](#metadados-de-decorator)
    - [Herança](#herança)
    - [Statics](#statics)
    - [Inicialização de propriedade](#inicialização-de-propriedade)
    - [Sobrecarga de método](#sobrecarga-de-método)
  - [Generics](#generics)
    - [Tipo Generic](#tipo-generic)
    - [Classes Generic](#classes-generic)
    - [Restrições Generic](#restrições-generic)
    - [Narrowing contextual generic](#narrowing-contextual-generic)
  - [Tipos Estruturais Apagados](#tipos-estruturais-apagados)
  - [Namespacing](#namespacing)
  - [Symbols](#symbols)
  - [Diretivas Triple-Slash](#diretivas-triple-slash)
  - [Manipulação de Tipo](#manipulação-de-tipo)
    - [Criando Tipos a partir de Tipos](#criando-tipos-a-partir-de-tipos)
    - [Tipos de Acesso Indexado](#tipos-de-acesso-indexado)
    - [Tipos Utilitários](#tipos-utilitários)
      - [Awaited\<T\>](#awaitedt)
      - [Partial\<T\>](#partialt)
      - [Required\<T\>](#requiredt)
      - [Readonly\<T\>](#readonlyt)
      - [Record\<K, T\>](#recordk-t)
      - [Pick\<T, K\>](#pickt-k)
      - [Omit\<T, K\>](#omitt-k)
      - [Exclude\<T, U\>](#excludet-u)
      - [Extract\<T, U\>](#extractt-u)
      - [NonNullable\<T\>](#nonnullablet)
      - [Parameters\<T\>](#parameterst)
      - [ConstructorParameters\<T\>](#constructorparameterst)
      - [ReturnType\<T\>](#returntypet)
      - [InstanceType\<T\>](#instancetypet)
      - [ThisParameterType\<T\>](#thisparametertypet)
      - [OmitThisParameter\<T\>](#omitthisparametert)
      - [ThisType\<T\>](#thistypet)
      - [Uppercase\<T\>](#uppercaset)
      - [Lowercase\<T\>](#lowercaset)
      - [Capitalize\<T\>](#capitalizet)
      - [Uncapitalize\<T\>](#uncapitalizet)
      - [NoInfer\<T\>](#noinfert)
  - [Outros](#outros)
    - [Erros e Tratamento de Exceções](#erros-e-tratamento-de-exceções)
    - [Classes mixin](#classes-mixin)
    - [Recursos de Linguagem Assíncrona](#recursos-de-linguagem-assíncrona)
    - [Iteradores e Geradores](#iteradores-e-geradores)
    - [Referência JSDoc do TsDocs](#referência-jsdoc-do-tsdocs)
    - [@types](#types)
    - [JSX](#jsx-1)
    - [Módulos ES6](#módulos-es6)
    - [Operador de Exponenciação ES7](#operador-de-exponenciação-es7)
    - [A Instrução for-await-of](#a-instrução-for-await-of)
    - [Meta-propriedade new target](#meta-propriedade-new-target)
    - [Expressões de Import Dinâmico](#expressões-de-import-dinâmico)
    - ["tsc –watch"](#tsc-watch)
    - [Operador de Asserção Não-nulo](#operador-de-asserção-não-nulo)
    - [Declarações com valor padrão](#declarações-com-valor-padrão)
    - [Encadeamento Opcional](#encadeamento-opcional)
    - [Operador de coalescência nula](#operador-de-coalescência-nula)
    - [Tipos Literais de Template](#tipos-literais-de-template)
    - [Sobrecarga de função](#sobrecarga-de-função)
    - [Tipos Recursivos](#tipos-recursivos)
    - [Tipos Condicionais Recursivos](#tipos-condicionais-recursivos)
    - [Suporte a Módulo ECMAScript no Node](#suporte-a-módulo-ecmascript-no-node)
    - [Funções de Asserção](#funções-de-asserção)
    - [Tipos Tuple Variádicos](#tipos-tuple-variádicos)
    - [Tipos boxed](#tipos-boxed)
    - [Covariância e Contravariância no TypeScript](#covariância-e-contravariância-no-typescript)
      - [Anotações de Variância Opcionais para Parâmetros de Tipo](#anotações-de-variância-opcionais-para-parâmetros-de-tipo)
    - [Assinaturas de Índice de Padrão de String de Template](#assinaturas-de-índice-de-padrão-de-string-de-template)
    - [O Operador satisfies](#o-operador-satisfies)
    - [Importações e Exportações Somente de Tipo](#importações-e-exportações-somente-de-tipo)
    - [Declaração using e Gerenciamento Explícito de Recursos](#declaração-using-e-gerenciamento-explícito-de-recursos)
      - [Declaração await using](#declaração-await-using)
    - [Atributos de Import](#atributos-de-import)
<!-- markdownlint-enable MD004 -->

## Introdução

Bem-vindo ao The Concise TypeScript Book! Este guia equipa você com conhecimento essencial e habilidades práticas para desenvolvimento TypeScript eficaz. Descubra conceitos-chave e técnicas para escrever código limpo e robusto. Seja você um iniciante ou um desenvolvedor experiente, este livro serve como um guia abrangente e uma referência prática para aproveitar o poder do TypeScript em seus projetos.

Este livro cobre o TypeScript 5.2.

## Sobre o Autor

Simone Poggiali é um Staff Engineer experiente com paixão por escrever código de nível profissional desde os anos 90. Ao longo de sua carreira internacional, ele contribuiu para inúmeros projetos para uma ampla gama de clientes, de startups a grandes organizações. Empresas notáveis como HelloFresh, Siemens, O2, Leroy Merlin e Snowplow se beneficiaram de sua expertise e dedicação.

Você pode entrar em contato com Simone Poggiali nas seguintes plataformas:

* LinkedIn: [https://www.linkedin.com/in/simone-poggiali](https://www.linkedin.com/in/simone-poggiali)
* GitHub: [https://github.com/gibbok](https://github.com/gibbok)
* X.com: [https://x.com/gibbok_coding](https://x.com/gibbok_coding)
* Email: gibbok.coding📧gmail.com

## Introdução ao TypeScript

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

## Começando com TypeScript

### Instalação

O Visual Studio Code fornece excelente suporte para a linguagem TypeScript, mas não inclui o compilador TypeScript. Para instalar o compilador TypeScript, você pode usar um gerenciador de pacotes como npm ou yarn:

```shell
npm install typescript --save-dev
```

ou

```shell
yarn add typescript --dev
```

Certifique-se de fazer commit do arquivo lockfile gerado para garantir que todos os membros da equipe usem a mesma versão do TypeScript.

Para executar o compilador TypeScript, você pode usar os seguintes comandos

```shell
npx tsc
```

ou

```shell
yarn tsc
```

É recomendado instalar o TypeScript por projeto em vez de globalmente, pois isso fornece um processo de build mais previsível. No entanto, para ocasiões pontuais, você pode usar o seguinte comando:

```shell
npx tsc
```

ou instalando globalmente:

```shell
npm install -g typescript
```

Se você estiver usando o Microsoft Visual Studio, pode obter o TypeScript como um pacote no NuGet para seus projetos MSBuild. No Console do Gerenciador de Pacotes NuGet, execute o seguinte comando:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Durante a instalação do TypeScript, dois executáveis são instalados: "tsc" como o compilador TypeScript e "tsserver" como o servidor standalone TypeScript. O servidor standalone contém o compilador e os serviços de linguagem que podem ser utilizados por editores e IDEs para fornecer conclusão de código inteligente.

Além disso, existem vários transpiladores compatíveis com TypeScript disponíveis, como Babel (via plugin) ou swc. Esses transpiladores podem ser usados para converter código TypeScript em outras linguagens ou versões de destino.

### Configuração

O TypeScript pode ser configurado usando as opções CLI do tsc ou utilizando um arquivo de configuração dedicado chamado tsconfig.json colocado na raiz do projeto.

Para gerar um arquivo tsconfig.json pré-preenchido com configurações recomendadas, você pode usar o seguinte comando:

```shell
tsc --init
```

Ao executar o comando `tsc` localmente, o TypeScript compilará o código usando a configuração especificada no arquivo tsconfig.json mais próximo.

Aqui estão alguns exemplos de comandos CLI que executam com as configurações padrão:

```shell
tsc main.ts // Compila um arquivo específico (main.ts) para JavaScript
tsc src/*.ts // Compila quaisquer arquivos .ts na pasta 'src' para JavaScript
tsc app.ts util.ts --outfile index.js // Compila dois arquivos TypeScript (app.ts e util.ts) em um único arquivo JavaScript (index.js)
```

### Arquivo de Configuração TypeScript

Um arquivo tsconfig.json é usado para configurar o Compilador TypeScript (tsc). Geralmente, ele é adicionado à raiz do projeto, junto com o arquivo `package.json`.

Notas:

* tsconfig.json aceita comentários mesmo sendo no formato json.
* É aconselhável usar este arquivo de configuração em vez das opções de linha de comando.

No seguinte link você pode encontrar a documentação completa e seu schema:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

A seguir está uma lista das configurações comuns e úteis:

#### target

A propriedade "target" é usada para especificar qual versão do JavaScript ECMAScript seu TypeScript deve emitir/compilar. Para navegadores modernos ES6 é uma boa opção, para navegadores mais antigos, ES5 é recomendado.

#### lib

A propriedade "lib" é usada para especificar quais arquivos de biblioteca incluir no momento da compilação. O TypeScript inclui automaticamente APIs para recursos especificados na propriedade "target", mas é possível omitir ou escolher bibliotecas específicas para necessidades particulares. Por exemplo, se você está trabalhando em um projeto de servidor, você poderia excluir a biblioteca "DOM", que é útil apenas em um ambiente de navegador.

#### strict

A propriedade "strict" habilita garantias mais fortes e melhora a segurança de tipos. É aconselhável sempre incluir esta propriedade no arquivo tsconfig.json do seu projeto. Habilitar a propriedade "strict" permite ao TypeScript:

* Emitir código usando "use strict" para cada arquivo fonte.
* Considerar "null" e "undefined" no processo de verificação de tipo.
* Desabilitar o uso do tipo "any" quando nenhuma anotação de tipo está presente.
* Gerar um erro no uso da expressão "this", que de outra forma implicaria o tipo "any".

#### module

A propriedade "module" define o sistema de módulos suportado para o programa compilado. Durante o runtime, um carregador de módulos é usado para localizar e executar dependências com base no sistema de módulos especificado.

Os carregadores de módulos mais comuns usados em JavaScript são Node.js CommonJS para aplicações server-side e RequireJS para módulos AMD em aplicações web baseadas em navegador. O TypeScript pode emitir código para vários sistemas de módulos, incluindo UMD, System, ESNext, ES2015/ES6 e ES2020.

Nota: O sistema de módulos deve ser escolhido com base no ambiente de destino e no mecanismo de carregamento de módulos disponível nesse ambiente.

#### moduleResolution

A propriedade "moduleResolution" especifica a estratégia de resolução de módulos. Use "node" para código TypeScript moderno, a estratégia "classic" é usada apenas para versões antigas do TypeScript (antes da 1.6).

#### esModuleInterop

A propriedade "esModuleInterop" permite importação padrão de módulos CommonJS que não exportaram usando a propriedade "default", esta propriedade fornece um shim para garantir compatibilidade no JavaScript emitido. Depois de habilitar esta opção, podemos usar `import MyLibrary from "my-library"` em vez de `import * as MyLibrary from "my-library"`.

#### jsx

A propriedade "jsx" se aplica apenas a arquivos .tsx usados no ReactJS e controla como as construções JSX são compiladas em JavaScript. Uma opção comum é "preserve" que compilará para um arquivo .jsx mantendo o JSX inalterado para que possa ser passado para diferentes ferramentas como Babel para transformações adicionais.

#### skipLibCheck

A propriedade "skipLibCheck" impedirá o TypeScript de verificar tipos de pacotes terceiros importados inteiros. Esta propriedade reduzirá o tempo de compilação de um projeto. O TypeScript ainda verificará seu código em relação às definições de tipo fornecidas por esses pacotes.

#### files

A propriedade "files" indica ao compilador uma lista de arquivos que devem sempre ser incluídos no programa.

#### include

<!-- markdownlint-disable MD049 -->
A propriedade "include" indica ao compilador uma lista de arquivos que gostaríamos de incluir. Esta propriedade permite padrões semelhantes a glob, como "\*_" para qualquer subdiretório, "_" para qualquer nome de arquivo e "?" para caracteres opcionais.
<!-- markdownlint-enable MD049 -->

#### exclude

A propriedade "exclude" indica ao compilador uma lista de arquivos que não devem ser incluídos na compilação. Isso pode incluir arquivos como "node_modules" ou arquivos de teste.
Nota: tsconfig.json permite comentários.

### importHelpers

O TypeScript usa código auxiliar ao gerar código para certos recursos JavaScript avançados ou de nível inferior. Por padrão, esses auxiliares são duplicados em arquivos que os usam. A opção `importHelpers` importa esses auxiliares do módulo `tslib`, tornando a saída JavaScript mais eficiente.

### Conselhos para Migração para TypeScript

Para projetos grandes, é recomendado adotar uma transição gradual onde código TypeScript e JavaScript coexistirão inicialmente. Apenas projetos pequenos podem ser migrados para TypeScript de uma só vez.

O primeiro passo desta transição é introduzir o TypeScript no processo da cadeia de build. Isso pode ser feito usando a opção do compilador "allowJs", que permite que arquivos .ts e .tsx coexistam com arquivos JavaScript existentes. Como o TypeScript recorrerá a um tipo "any" para uma variável quando não puder inferir o tipo de arquivos JavaScript, é recomendado desabilitar "noImplicitAny" nas opções do compilador no início da migração.

O segundo passo é garantir que seus testes JavaScript funcionem junto com arquivos TypeScript para que você possa executar testes à medida que converte cada módulo. Se você está usando Jest, considere usar `ts-jest`, que permite testar projetos TypeScript com Jest.

O terceiro passo é incluir declarações de tipo para bibliotecas de terceiros em seu projeto. Essas declarações podem ser encontradas agrupadas ou no DefinitelyTyped. Você pode procurá-las usando [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) e instalá-las usando:

```shell
npm install --save-dev @types/package-name
```

ou

```shell
yarn add --dev @types/package-name.
```

O quarto passo é migrar módulo por módulo com uma abordagem bottom-up, seguindo seu Grafo de Dependências começando pelas folhas. A ideia é começar a converter Módulos que não dependem de outros Módulos. Para visualizar os grafos de dependência, você pode usar a ferramenta "madge".

Bons módulos candidatos para essas conversões iniciais são funções utilitárias e código relacionado a APIs externas ou especificações. É possível gerar automaticamente definições de tipo TypeScript de contratos Swagger, GraphQL ou schemas JSON para serem incluídos em seu projeto.

Quando não há especificações ou schemas oficiais disponíveis, você pode gerar tipos de dados brutos, como JSON retornado por um servidor. No entanto, é recomendado gerar tipos de especificações em vez de dados para evitar perder casos extremos.

Durante a migração, abstenha-se de refatoração de código e concentre-se apenas em adicionar tipos aos seus módulos.

O quinto passo é habilitar "noImplicitAny", que forçará que todos os tipos sejam conhecidos e definidos, fornecendo uma melhor experiência TypeScript para seu projeto.

Durante a migração, você pode usar a diretiva `@ts-check`, que habilita a verificação de tipo TypeScript em um arquivo JavaScript. Esta diretiva fornece uma versão flexível de verificação de tipo e pode ser usada inicialmente para identificar problemas em arquivos JavaScript. Quando `@ts-check` é incluído em um arquivo, o TypeScript tentará deduzir definições usando comentários no estilo JSDoc. No entanto, considere usar anotações JSDoc apenas em um estágio muito inicial da migração.

Considere manter o valor padrão de `noEmitOnError` em seu tsconfig.json como false. Isso permitirá que você gere código-fonte JavaScript mesmo se erros forem relatados.
## Explorando o Sistema de Tipos

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

