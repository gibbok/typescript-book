---
title: Começando com TypeScript
sidebar:
  order: 8
  label: 8. Começando com TypeScript
---


### Instalação

O Visual Studio Code oferece excelente suporte para a linguagem TypeScript, mas não inclui o compilador TypeScript. Para instalar o compilador TypeScript, você pode usar um gerenciador de pacotes como npm ou yarn:

```shell
npm install typescript --save-dev
```

ou

```shell
yarn add typescript --dev
```

Certifique-se de realizar o commit do arquivo de bloqueio (lockfile) gerado para garantir que cada membro da equipe use a mesma versão do TypeScript.

Para executar o compilador TypeScript, você pode usar os seguintes comandos:

```shell
npx tsc
```

ou

```shell
yarn tsc
```

Recomenda-se instalar o TypeScript por projeto em vez de globalmente, pois fornece um processo de construção mais previsível. No entanto, para ocasiões pontuais, você pode usar o seguinte comando:

```shell
npx tsc
```

ou instalá-lo globalmente:

```shell
npm install -g typescript
```

Se você estiver usando o Microsoft Visual Studio, pode obter o TypeScript como um pacote no NuGet para seus projetos MSBuild. No Console do Gerenciador de Pacotes NuGet, execute o seguinte comando:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Durante a instalação do TypeScript, dois executáveis são instalados: "tsc" como o compilador TypeScript e "tsserver" como o servidor autônomo do TypeScript. O servidor autônomo contém o compilador e os serviços de linguagem que podem ser utilizados por editores e IDEs para fornecer completamento inteligente de código.

Além disso, existem vários transpiladores compatíveis com TypeScript disponíveis, como Babel (via um plugin) ou swc. Esses transpiladores podem ser usados para converter código TypeScript em outras linguagens ou versões de destino.

### Configuração

O TypeScript pode ser configurado usando as opções da CLI do tsc ou utilizando um arquivo de configuração dedicado chamado tsconfig.json localizado na raiz do projeto.

Para gerar um arquivo tsconfig.json pré-preenchido com as configurações recomendadas, você pode usar o seguinte comando:

```shell
tsc --init
```

Ao executar o comando `tsc` localmente, o TypeScript compilará o código usando a configuração especificada no arquivo tsconfig.json mais próximo.

Aqui estão alguns exemplos de comandos da CLI que rodam com as configurações padrão:

```shell
tsc main.ts // Compila um arquivo específico (main.ts) para JavaScript
tsc src/*.ts // Compila todos os arquivos .ts na pasta 'src' para JavaScript
tsc app.ts util.ts --outfile index.js // Compila dois arquivos TypeScript (app.ts e util.ts) em um único arquivo JavaScript (index.js)
```

### Arquivo de Configuração do TypeScript

Um arquivo tsconfig.json é usado para configurar o Compilador TypeScript (tsc). Geralmente, ele é adicionado à raiz do projeto, junto com o arquivo `package.json`.

Notas:

* tsconfig.json aceita comentários, mesmo estando no formato json.
* É aconselhável usar este arquivo de configuração em vez das opções de linha de comando.

No link a seguir você encontra a documentação completa e seu esquema:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

A seguir, apresentamos uma lista das configurações comuns e úteis:

#### target

A propriedade "target" é usada para especificar qual versão do JavaScript ECMAScript seu TypeScript deve emitir/compilar. Para navegadores modernos, o ES6 é uma boa opção; para navegadores mais antigos, o ES5 é recomendado. Observação: o suporte a ES5 foi removido no TypeScript 6.0.

#### lib

A propriedade "lib" é usada para especificar quais arquivos de biblioteca incluir no tempo de compilação. O TypeScript inclui automaticamente APIs para recursos especificados na propriedade "target", mas é possível omitir ou escolher bibliotecas específicas para necessidades particulares. Por exemplo, se você estiver trabalhando em um projeto de servidor, pode excluir a biblioteca "DOM", que é útil apenas em um ambiente de navegador.

#### strict

A opção "strict" aprimora a segurança de tipos, permitindo verificações mais rigorosas. Ela está habilitada por padrão a partir do TypeScript 6.0; caso contrário, você deve defini-la explicitamente como true no seu arquivo tsconfig.json. Habilitar "strict" permite que o TypeScript:

* Emitir código usando "use strict" para cada arquivo de origem.
* Considerar "null" e "undefined" no processo de verificação de tipos.
* Desabilitar o uso do tipo "any" quando não houver anotações de tipo.
* Levantar um erro sobre o uso da expressão "this", que de outra forma implicaria o tipo "any".

#### module

A propriedade "module" define o sistema de módulos suportado pelo programa compilado. Durante a execução, um carregador de módulos é usado para localizar e executar as dependências com base no sistema de módulos especificado.

Os carregadores de módulos mais comuns usados ​​em JavaScript são o CommonJS do Node.js para aplicações do lado do servidor e o RequireJS para módulos AMD em aplicações web baseadas em navegador. O TypeScript pode gerar código para vários sistemas de módulos, incluindo UMD, SystemJS, ESNext, ES2015/ES6 e ES2020. O sistema de módulos deve ser escolhido com base no ambiente de destino e no mecanismo de carregamento de módulos disponível nesse ambiente.

Nota: O suporte para sistemas de módulos mais antigos (AMD, UMD, SystemJS) foi removido no TypeScript 6.0.

#### moduleResolution

A propriedade "moduleResolution" especifica a estratégia de resolução de módulos. Use "node" para código TypeScript moderno; a estratégia "classic" é usada apenas para versões antigas do TypeScript (antes da 1.6).

#### esModuleInterop

A propriedade "esModuleInterop" permite a importação padrão de módulos CommonJS que não exportaram usando a propriedade "default"; esta propriedade fornece um shim para garantir a compatibilidade no JavaScript emitido. Após habilitar esta opção, podemos usar `import MyLibrary from "my-library"` em vez de `import * as MyLibrary from "my-library"`.

Originalmente, a opção "esModuleInterop" era opcional para evitar alterações que quebrassem a compatibilidade, mas há muito tempo é o padrão recomendado. Desativá-la pode causar problemas sutis em tempo de execução ao usar CommonJS com ESM. Observação: a partir do TypeScript 6.0, esse comportamento de interoperabilidade mais seguro está sempre ativado.

#### jsx

A propriedade "jsx" aplica-se apenas a arquivos .tsx usados no ReactJS e controla como as construções JSX são compiladas em JavaScript. Uma opção comum é "preserve", que compilará para um arquivo .jsx mantendo o JSX inalterado para que ele possa ser passado para diferentes ferramentas, como o Babel, para transformações posteriores.

#### skipLibCheck

A propriedade "skipLibCheck" evitará que o TypeScript verifique os tipos de todos os pacotes de terceiros importados. Esta propriedade reduzirá o tempo de compilação de um projeto. O TypeScript ainda verificará seu código em relação às definições de tipo fornecidas por esses pacotes.

#### files

A propriedade "files" indica ao compilador uma lista de arquivos que devem sempre ser incluídos no programa.

#### include

<!-- markdownlint-disable MD049 -->
A propriedade "include" indica ao compilador uma lista de arquivos que gostaríamos de incluir. Esta propriedade permite padrões semelhantes a glob, como "\**" para qualquer subdiretório, "*" para qualquer nome de arquivo e "?" para caracteres opcionais.
<!-- markdownlint-enable MD049 -->

#### exclude

A propriedade "exclude" indica ao compilador uma lista de arquivos que não devem ser incluídos na compilação. Isso pode incluir arquivos como "node_modules" ou arquivos de teste.
Nota: tsconfig.json permite comentários.

### importHelpers

O TypeScript usa código auxiliar ao gerar código para certos recursos avançados ou de JavaScript com "down-leveled". Por padrão, esses auxiliares são duplicados nos arquivos que os utilizam. A opção `importHelpers` importa esses auxiliares do módulo `tslib`, tornando a saída do JavaScript mais eficiente.

### Conselhos para Migração para TypeScript

Para projetos grandes, recomenda-se adotar uma transição gradual onde o código TypeScript e JavaScript coexistirão inicialmente. Apenas projetos pequenos podem ser migrados para TypeScript de uma só vez.

O primeiro passo desta transição é introduzir o TypeScript no processo da cadeia de construção. Isso pode ser feito usando a opção de compilador "allowJs", que permite que arquivos .ts e .tsx coexistam com arquivos JavaScript existentes. Como o TypeScript voltará para um tipo "any" para uma variável quando não puder inferir o tipo dos arquivos JavaScript, recomenda-se desabilitar "noImplicitAny" em suas opções de compilador no início da migração.

O segundo passo é garantir que seus testes JavaScript funcionem junto com os arquivos TypeScript, para que você possa executar testes conforme converte cada módulo. Se estiver usando Jest, considere usar o `ts-jest`, que permite testar projetos TypeScript com Jest.

O terceiro passo é incluir declarações de tipo para bibliotecas de terceiros em seu projeto. Essas declarações podem ser encontradas empacotadas ou no DefinitelyTyped. Você pode pesquisar por elas usando [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) e instalá-las usando:

```shell
npm install --save-dev @types/package-name
```

ou

```shell
yarn add --dev @types/package-name
```

O quarto passo é migrar módulo por módulo com uma abordagem de baixo para cima, seguindo seu Gráfico de Dependências começando pelas folhas. A ideia é começar convertendo Módulos que não dependem de outros Módulos. Para visualizar os gráficos de dependência, você pode usar a ferramenta "madge".

Bons módulos candidatos para essas conversões iniciais são funções utilitárias e código relacionado a APIs ou especificações externas. É possível gerar automaticamente definições de tipo TypeScript a partir de contratos Swagger, GraphQL ou esquemas JSON para serem incluídos em seu projeto.

Quando não houver especificações ou esquemas oficiais disponíveis, você pode gerar tipos a partir de dados brutos, como JSON retornado por um servidor. No entanto, recomenda-se gerar tipos a partir de especificações em vez de dados para evitar perder casos extremos.

Durante a migração, evite a refatoração de código e concentre-se apenas em adicionar tipos aos seus módulos.

O quinto passo é habilitar o "noImplicitAny", que forçará que todos os tipos sejam conhecidos e definidos, proporcionando uma melhor experiência de TypeScript para seu projeto.

Durante a migração, você pode usar a diretiva `@ts-check`, que habilita a verificação de tipos do TypeScript em um arquivo JavaScript. Esta diretiva fornece uma versão flexível de verificação de tipos e pode ser usada inicialmente para identificar problemas em arquivos JavaScript. Quando o `@ts-check` é incluído em um arquivo, o TypeScript tentará deduzir definições usando comentários no estilo JSDoc. No entanto, considere usar anotações JSDoc apenas em um estágio muito inicial da migração.

Considere manter o valor padrão de `noEmitOnError` no seu tsconfig.json como false. Isso permitirá gerar o código-fonte JavaScript mesmo se erros forem relatados.

