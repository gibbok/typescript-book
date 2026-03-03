---
title: Começando com TypeScript
sidebar:
  order: 8
  label: 8. Começando com TypeScript
---


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

