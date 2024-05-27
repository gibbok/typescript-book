---
title: TypeScript 入门
sidebar:
  order: 8
  label: 8. TypeScript 入门
---


### 安装

Visual Studio Code 为 TypeScript 语言提供了出色的支持，但不包含 TypeScript 编译器。要安装 TypeScript 编译器，您可以使用包管理器，例如 npm 或yarn：

```shell
npm install typescript --save-dev
```

或者

```shell
yarn add typescript --dev
```

确保提交生成的锁定文件，以确保每个团队成员使用相同版本的 TypeScript。

要运行TypeScript编译器，可以使用以下命令

```shell
npx tsc
```

或者

```shell
yarn tsc
```

建议按项目安装 TypeScript，而不是全局安装，因为它提供了更可预测的构建过程。但是，对于一次性情况，您可以使用以下命令：

```shell
npx tsc
```

或者安装到全局：

```shell
npm install -g typescript
```

如果您使用的是 Microsoft Visual Studio，则可以在 NuGet 中为 MSBuild 项目获取作为包的 TypeScript。在 NuGet 包管理器控制台中，运行以下命令：

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

在 TypeScript 安装过程中，会安装两个可执行文件："tsc"作为 TypeScript 编译器，"tsserver"作为 TypeScript 独立服务器。独立服务器包含编译器和语言服务，编辑器和 IDE 可以利用它们来提供智能代码补全。

此外，还有几种兼容 TypeScript 的转译器可用，例如 Babel（通过插件）或 swc。这些转译器可用于将 TypeScript 代码转换为其他目标语言或版本。

### 配置

可以使用 tsc CLI 选项或利用位于项目根目录中名为 tsconfig.json 的专用配置文件来配置 TypeScript。

要生成预填充推荐设置的 tsconfig.json 文件，您可以使用以下命令：

```shell
tsc --init
```

在本地执行tsc命令时，TypeScript 将使用最近的 tsconfig.json 文件中指定的配置来编译代码。

以下是使用默认设置运行的 CLI 命令的一些示例：

```shell
tsc main.ts // 将一个特定的文件 (main.ts) 编译成 JavaScript
tsc src/*.ts // 将 'src' 文件夹下任意的 .ts 文件编译成 JavaScript
tsc app.ts util.ts --outfile index.js // 将 2 个 TypeScript 文件 (app.ts 和 util.ts) 编译成 1 个 JavaScript 文件 (index.js)
```

### TypeScript 的配置文件 tsconfig.json

tsconfig.json 文件用于配置 TypeScript 编译器 (tsc)。通常，它与文件一起添加到项目的根目录中package.json。

注意：

* tsconfig.json 即使是 json 格式也接受注释。
* 建议使用此配置文件而不是命令行选项。

在以下链接中，您可以找到完整的文档及其配置示例：

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[http://json.schemastore.org/tsconfig](http://json.schemastore.org/tsconfig)

以下列出了常见且有用的配置：

#### target

"target"属性用于指定 TypeScript 应发出/编译到哪个版本的 JavaScript ECMAScript 版本。对于现代浏览器，ES6是一个不错的选择，对于较旧的浏览器，建议使用ES5。

#### lib

"lib"属性用于指定编译时要包含哪些库文件。TypeScript 自动包含"目标"属性中指定功能的 API，但可以根据特定需求省略或选择特定库。例如，如果您正在开发服务器项目，则可以排除"DOM"库，该库仅在浏览器环境中有用。

#### strict

"strict"属性可以提供更强有力的保证并增强类型安全性。建议始终将此属性包含在项目的 tsconfig.json 文件中。启用"strict"属性允许 TypeScript ：

* 触发每个源文件的代码使用"use strict"。
* 在类型检查过程中考虑"null"和"undefined"
* 当不存在类型注释时禁用"any"类型的使用。
* 在使用"this"表达式时引发错误，否则"this"会被视为任意类型。

#### module

"module"属性设置编译程序支持的模块系统。在运行时，模块加载器用于根据指定的模块系统定位并执行依赖项。
JavaScript 中最常见的模块加载器是用于服务器端应用程序的 Node.js 的CommonJS和用于基于浏览器的 Web 应用程序中的 AMD 模块的 RequireJS。
TypeScript 可以为各种模块系统生成代码，包括 UMD、System、ESNext、ES2015/ES6 和 ES2020。

注意：应根据目标环境和该环境中可用的模块加载机制来选择模块系统。

#### moduleResolution

"moduleResolution"属性指定模块解析策略。对现代TypeScript代码使用"node"，"classic"仅用于旧版本的 TypeScript（1.6 之前）。

#### esModuleInterop

"esModuleInterop"属性允许从未使用"default"属性导出的 CommonJS 模块导入默认值，此属性提供了一个兼容以确保生成的 JavaScript 的兼容性。启用此选项后，我们可以使用 `import MyLibrary from "my-library"` 而不是 `import * as MyLibrary from "my-library"`。

#### jsx

"jsx"属性仅适用于 ReactJS 中使用的 .tsx 文件，并控制 JSX 构造如何编译为 JavaScript。一个常见的选项是"preserve"，它将编译为 .jsx 文件，保持 JSX 不变，以便可以将其传递给 Babel 等不同工具进行进一步转换。

#### skipLibCheck

"skipLibCheck"属性将阻止 TypeScript 对整个导入的第三方包进行类型检查。此属性将减少项目的编译时间。TypeScript 仍会根据这些包提供的类型定义检查您的代码。

#### files

"files"属性向编译器指示必须始终包含在程序中的文件列表。

#### include

<!-- markdownlint-disable MD049 -->
"include"属性向编译器指示我们想要包含的文件列表。此属性允许类似 glob 的模式，例如 "\*_" 表示任何子目录，"_" 表示任何文件名，"?" 表示可选字符。
<!-- markdownlint-enable MD049 -->
#### exclude

"exclude"属性向编译器指示不应包含在编译中的文件列表。这可以包括"node_modules"等文件或测试文件
注意：tsconfig.json 允许注释。

### importHelpers

TypeScript 在为某些高级或低级 JavaScript 功能生成代码时使用帮助程序代码。 默认情况下，这些助手会在使用它们的文件中复制。 `importHelpers` 选项从 `tslib` 模块导入这些帮助器，从而使 JavaScript 输出更加高效。

### 迁移到 TypeScript 的建议

对于大型项目，建议采用逐渐过渡的方式，其中 TypeScript 和 JavaScript 代码最初共存。只有小型项目才能一次性迁移到 TypeScript。

此转变的第一步是将 TypeScript 引入构建链过程。这可以通过使用"allowJs"编译器选项来完成，该选项允许 .ts 和 .tsx 文件与现有 JavaScript 文件共存。由于当 TypeScript 无法从 JavaScript 文件推断类型时，它会回退到变量的"any"类型，因此建议在迁移开始时在编译器选项中禁用"noImplicitAny"。

第二步是确保您的 JavaScript 测试与 TypeScript 文件一起工作，以便您可以在转换每个模块时运行测试。如果您正在使用 Jest，请考虑使用ts-jest，它允许您使用 Jest 测试 TypeScript 项目。

第三步是在项目中包含第三方库的类型声明。 这些声明可以第三方库的类型声明文件或专门的声明包中找到，你能通过 [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) 搜索并安装它们。:

```shell
npm install --save-dev @types/package-name or yarn add --dev @types/package-name.
```

第四步是使用自下而上的方法逐个模块地迁移，遵循从叶开始的依赖关系图。这个想法是开始转换不依赖于其他模块的模块。要可视化依赖关系图，您可以使用该madge工具。

有一些对于转换成 TypeScript 比较友好的模块（外部 API 或规范相关的实用函数和代码），比如Swagger、GraphQL 或 JSONSchema 自动生成 TypeScript 类型定义，并使用在您的项目中。

当没有可用的规范或官方架构时，您可以从原始数据生成类型，例如服务器返回的 JSON。但是，建议从规范而不是数据生成类型，以避免丢失边缘情况。

在迁移过程中，不要进行代码重构，而只专注于向模块添加类型。

第五步是启用"noImplicitAny"，这将强制所有类型都是已知和定义的，从而为您的项目提供更好的 TypeScript 体验。

在迁移过程中，您可以使用该@ts-check指令，该指令在 JavaScript 文件中启用 TypeScript 类型检查。该指令提供了宽松版本的类型检查，最初可用于识别 JavaScript 文件中的问题。当@ts-check包含在文件中时，TypeScript 将尝试使用 JSDoc 风格的注释来推断定义。但是，仅在迁移的早期阶段考虑使用 JSDoc 注释。

考虑在你的tsconfig.json文件中将 `noEmitOnError` 设置为 false，即使报告错误，这也将允许您输出 JavaScript 源代码。

