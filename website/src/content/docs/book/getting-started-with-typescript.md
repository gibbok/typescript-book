---
title: Getting Started With TypeScript
sidebar:
  order: 8
  label: 8. Getting Started With TypeScript
---


### Installation

Visual Studio Code provides excellent support for the TypeScript language but does not include the TypeScript compiler. To install the TypeScript compiler, you can use a package manager like npm or yarn:

```shell
npm install typescript --save-dev
```

or

```shell
yarn add typescript --dev
```

Make sure to commit the generated lockfile to ensure that every team member uses the same version of TypeScript.

To run the TypeScript compiler, you can use the following commands

```shell
npx tsc
```

or

```shell
yarn tsc
```

It is recommended to install TypeScript project-wise rather than globally, as it provides a more predictable build process. However, for one-off occasions, you can use the following command:

```shell
npx tsc
```

or installing it globally:

```shell
npm install -g typescript
```

If you are using Microsoft Visual Studio, you can obtain TypeScript as a package in NuGet for your MSBuild projects. In the NuGet Package Manager Console, run the following command:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

During the TypeScript installation, two executables are installed: "tsc" as the TypeScript compiler and "tsserver" as the TypeScript standalone server. The standalone server contains the compiler and language services that can be utilized by editors and IDEs to provide intelligent code completion.

Additionally, there are several TypeScript-compatible transpilers available, such as Babel (via a plugin) or swc. These transpilers can be used to convert TypeScript code into other target languages or versions.

### Configuration

TypeScript can be configured using the tsc CLI options or by utilizing a dedicated configuration file called tsconfig.json placed in the root of the project.

To generate a tsconfig.json file prepopulated with recommended settings, you can use the following command:

```shell
tsc --init
```

When executing the `tsc` command locally, TypeScript will compile the code using the configuration specified in the nearest tsconfig.json file.

Here are some examples of CLI commands that run with the default settings:

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### TypeScript Configuration File ​​tsconfig.json

A tsconfig.json file is used to configure the TypeScript Compiler (tsc). Usually, it is added to the root of the project, together with the `package.json` file.

Notes:

* tsconfig.json accepts comments even if it is in json format.
* It is advisable to use this configuration file instead of the command-line options.

At the following link you can find the complete documentation and its schema:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[http://json.schemastore.org/tsconfig](http://json.schemastore.org/tsconfig)

The following represents a list of the common and useful configurations:

#### target

The "target" property is used to specify which version of JavaScript ECMAScript version your TypeScript should emit/compile into. For modern browsers ES6 is a good option, for older browsers, ES5 is recommended.

#### lib

The "lib" property is used to specify which library files to include at compilation time. TypeScript automatically includes APIs for features specified in the "target" property, but it is possible to omit or pick specific libraries for particular needs. For instance, if you are working on a server project, you could exclude the "DOM" library, which is useful only in a browser environment.

#### strict

The "strict" property enables stronger guarantees and enhances type safety. It is advisable to always include this property in your project's tsconfig.json file. Enabling the "strict" property allows TypeScript to:

* Emit code using "use strict" for each source file.
* Consider "null" and "undefined" in the type checking process.
* Disable the usage of the "any" type when no type annotations are present.
* Raise an error on the usage of the "this" expression, which would otherwise imply the "any" type.

#### module

The "module" property sets the module system supported for the compiled program. During runtime, a module loader is used to locate and execute dependencies based on the specified module system.

The most common module loaders used in JavaScript are Node.js CommonJS for server-side applications and RequireJS for AMD modules in browser-based web applications. TypeScript can emit code for various module systems, including UMD, System, ESNext, ES2015/ES6, and ES2020.

Note: The module system should be chosen based on the target environment and the module loading mechanism available in that environment.

#### moduleResolution

The "moduleResolution" property specifies the module resolution strategy. Use "node" for modern TypeScript code, the "classic" strategy is used only for old versions of TypeScript (before 1.6).

#### esModuleInterop

The "esModuleInterop" property allows import default from CommonJS modules that did not export using the "default" property, this property provides a shim to ensure compatibility in the emitted JavaScript. After enabling this option we can use `import MyLibrary from "my-library"` instead of `import * as MyLibrary from "my-library"`.

#### jsx

The "jsx" property applies only to .tsx files used in ReactJS and controls how JSX constructs are compiled into JavaScript. A common option is "preserve" which will compile to a .jsx file keeping unchanged the JSX so it can be passed to different tools like Babel for further transformations.

#### skipLibCheck

The "skipLibCheck'' property will prevent TypeScript from type-checking the entire imported third-party packages. This property will reduce the compile time of a project. TypeScript will still check your code against the type definitions provided by these packages.

#### files

The "files" property indicates to the compiler a list of files that must always be included in the program.

#### include

<!-- markdownlint-disable MD049 -->
The "include" property indicates to the compiler a list of files that we would like to include. This property allows glob-like patterns, such as "\*_" for any subdirectory, "_" for any file name, and "?" for optional characters.
<!-- markdownlint-enable MD049 -->

#### exclude

The "exclude" property indicates to the compiler a list of files that should not be included in the compilation. This can include files such as "node_modules" or test files.
Note: tsconfig.json allows comments.

### importHelpers

TypeScript uses helper code when generating code for certain advanced or down-leveled JavaScript features. By default, these helpers are duplicated in files using them. The `importHelpers` option imports these helpers from the `tslib` module instead, making the JavaScript output more efficient.

### Migration to TypeScript Advice

For large projects, it is recommended to adopt a gradual transition where TypeScript and JavaScript code will initially coexist. Only small projects can be migrated to TypeScript in one go.

The first step of this transition is to introduce TypeScript into the build chain process. This can be done by using the "allowJs" compiler option, which permits .ts and .tsx files to coexist with existing JavaScript files. As TypeScript will fall back to a type of "any" for a variable when it cannot infer the type from JavaScript files, it is recommended to disable "noImplicitAny" in your compiler options at the beginning of the migration.

The second step is to ensure that your JavaScript tests work alongside TypeScript files so that you can run tests as you convert each module. If you are using Jest, consider using `ts-jest`, which allows you to test TypeScript projects with Jest.

The third step is to include type declarations for third-party libraries in your project. These declarations can be found either bundled or on DefinitelyTyped. You can search for them using [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) and install them using:

```shell
npm install --save-dev @types/package-name or yarn add --dev @types/package-name.
```

The fourth step is to migrate module by module with a bottom-up approach, following your Dependency Graph starting with the leaves. The idea is to start converting Modules that do not depend on other Modules. To visualize the dependency graphs, you can use the "madge" tool.

Good candidate modules for these initial conversions are utility functions and code related to external APIs or specifications. It is possible to automatically generate TypeScript type definitions from Swagger contracts, GraphQL or JSON schemas to be included in your project.

When there are no specifications or official schemas available, you can generate types from raw data, such as JSON returned by a server. However, it is recommended to generate types from specifications instead of data to avoid missing edge cases.

During the migration, refrain from code refactoring and focus only on adding types to your modules.

The fifth step is to enable "noImplicitAny," which will enforce that all types are known and defined, providing a better TypeScript experience for your project.

During the migration, you can use the `@ts-check` directive, which enables TypeScript type checking in a JavaScript file. This directive provides a loose version of type checking and can be initially used to identify issues in JavaScript files. When `@ts-check` is included in a file, TypeScript will try to deduce definitions using JSDoc-style comments. However, consider using JSDoc annotations only at a very early stage of the migration.

Consider keeping the default value of `noEmitOnError` in your tsconfig.json as false. This will allow you to output JavaScript source code even if errors are reported.

