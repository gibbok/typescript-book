---
title: TypeScript 시작하기
sidebar:
  order: 9
  label: 9. TypeScript 시작하기
---


### 설치

Visual Studio Code는 TypeScript 언어를 훌륭하게 지원하지만 TypeScript 컴파일러는 포함하지 않습니다. TypeScript 컴파일러를 설치하려면 npm 또는 yarn 같은 패키지 관리자를 사용할 수 있습니다.

```shell
npm install typescript --save-dev
```

또는

```shell
yarn add typescript --dev
```

모든 팀원이 같은 TypeScript 버전을 사용하도록 생성된 lockfile을 커밋해야 합니다.

TypeScript 컴파일러를 실행하려면 다음 명령을 사용할 수 있습니다.

```shell
npx tsc
```

또는

```shell
yarn tsc
```

빌드 프로세스를 더 예측 가능하게 만들 수 있으므로 TypeScript는 전역이 아닌 프로젝트별로 설치하는 것이 좋습니다. 하지만 일회성으로 사용할 때는 다음 명령을 실행할 수 있습니다.

```shell
npx tsc
```

또는 전역으로 설치할 수 있습니다.

```shell
npm install -g typescript
```

Microsoft Visual Studio를 사용하는 경우 MSBuild 프로젝트를 위해 NuGet에서 TypeScript를 패키지로 가져올 수 있습니다. NuGet Package Manager Console에서 다음 명령을 실행합니다.

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

TypeScript를 설치하면 두 개의 실행 파일이 설치됩니다. TypeScript 컴파일러인 "tsc"와 TypeScript 독립 실행형 서버인 "tsserver"입니다. 이 독립 실행형 서버에는 편집기와 IDE가 지능형 코드 완성을 제공하는 데 사용할 수 있는 컴파일러와 언어 서비스가 포함되어 있습니다.

또한 Babel(플러그인을 통해 사용)이나 swc와 같이 TypeScript와 호환되는 여러 트랜스파일러가 있습니다. 이러한 트랜스파일러를 사용하면 TypeScript 코드를 다른 대상 언어나 버전으로 변환할 수 있습니다.

TypeScript 7.0은 컴파일러와 언어 서비스의 네이티브 구현으로 Go로 다시 작성되었습니다. 공유 메모리 멀티스레딩과 기타 최적화를 사용하여 전체 빌드와 편집기 기능을 더 빠르게 만들고 개발 중 피드백 시간을 줄입니다.

일부 TypeScript 7.0 성능 기능은 조정할 수 있습니다. 타입 검사는 `--checkers`를 사용하여 병렬 워커에서 실행할 수 있습니다. 워커 수가 많으면 대규모 프로젝트의 속도가 빨라질 수 있지만 메모리를 더 많이 사용합니다. 다시 구축된 `--watch` 모드는 크로스 플랫폼 파일 감시를 개선합니다. TypeScript 7.0에는 아직 컴파일러 API가 포함되어 있지 않으므로(2026년 7월 기준), 여전히 TypeScript 6.0 API가 필요한 도구는 `@typescript/typescript6` 또는 npm 별칭을 사용하여 TypeScript 7.0과 함께 실행할 수 있습니다.

### 구성

TypeScript는 tsc CLI 옵션을 사용하거나 프로젝트 루트에 tsconfig.json이라는 전용 구성 파일을 배치하여 구성할 수 있습니다.

권장 설정이 미리 채워진 tsconfig.json 파일을 생성하려면 다음 명령을 사용할 수 있습니다.

```shell
tsc --init
```

로컬에서 `tsc` 명령을 실행하면 TypeScript는 가장 가까운 tsconfig.json 파일에 지정된 구성을 사용하여 코드를 컴파일합니다.

다음은 기본 설정으로 실행되는 CLI 명령의 몇 가지 예입니다.

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### TypeScript 구성 파일

tsconfig.json 파일은 TypeScript 컴파일러(tsc)를 구성하는 데 사용됩니다. 일반적으로 `package.json` 파일과 함께 프로젝트 루트에 추가합니다.

참고:

* tsconfig.json은 JSON 형식이지만 주석을 허용합니다.
* 명령줄 옵션 대신 이 구성 파일을 사용하는 것이 좋습니다.

다음 링크에서 전체 문서와 해당 스키마를 확인할 수 있습니다.

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

다음은 일반적이고 유용한 구성 목록입니다.

#### target

"target" 프로퍼티는 TypeScript 코드를 어떤 ECMAScript 버전으로 내보내거나 컴파일할지를 지정하는 데 사용됩니다. 최신 브라우저에는 ES6가 좋은 선택입니다. 참고: ES5 지원은 TypeScript 6.0에서 더 이상 사용되지 않는 기능으로 지정되었으며 TypeScript 7.0에서는 더 이상 지원되지 않습니다.

#### lib

"lib" 프로퍼티는 컴파일할 때 포함할 라이브러리 파일을 지정하는 데 사용됩니다. TypeScript는 "target" 프로퍼티에 지정된 기능의 API를 자동으로 포함하지만, 특정 요구 사항에 따라 특정 라이브러리를 생략하거나 선택할 수 있습니다. 예를 들어 서버 프로젝트에서 작업하는 경우 브라우저 환경에서만 유용한 "DOM" 라이브러리를 제외할 수 있습니다.

#### strict

"strict" 옵션은 더 강력한 검사를 활성화하여 타입 안전성을 높입니다. TypeScript 6.0부터 기본적으로 활성화됩니다. 그 이전 버전에서는 tsconfig.json에서 명시적으로 true로 설정해야 합니다. "strict"를 활성화하면 TypeScript는 다음을 수행합니다.

* 각 소스 파일에 "use strict"를 사용하여 코드를 내보냅니다.
* 타입 검사 과정에서 "null"과 "undefined"를 고려합니다.
* 타입 어노테이션이 없을 때 "any" 타입 사용을 비활성화합니다.
* 그렇지 않으면 "any" 타입을 의미하게 되는 "this" 표현식을 사용할 때 오류가 발생합니다.

#### module

"module" 프로퍼티는 컴파일된 프로그램에서 지원할 모듈 시스템을 설정합니다. 런타임에는 지정된 모듈 시스템에 따라 모듈 로더가 의존성을 찾고 실행하는 데 사용됩니다.

JavaScript에서 가장 일반적으로 사용하는 모듈 로더는 서버 측 애플리케이션을 위한 Node.js CommonJS와 브라우저 기반 웹 애플리케이션의 AMD 모듈을 위한 RequireJS입니다. TypeScript는 UMD, System, ESNext, ES2015/ES6 및 ES2020을 포함한 다양한 모듈 시스템용 코드를 내보낼 수 있습니다. 모듈 시스템은 대상 환경과 해당 환경에서 사용할 수 있는 모듈 로딩 메커니즘에 따라 선택해야 합니다.

참고: 이전 모듈 시스템(AMD, UMD, SystemJS)에 대한 지원은 TypeScript 6.0에서 더 이상 사용되지 않는 기능으로 지정되었으며 TypeScript 7.0에서는 더 이상 지원되지 않습니다.

#### moduleResolution

"moduleResolution" 프로퍼티는 모듈 해석 전략을 지정합니다. 최신 TypeScript 코드에는 "nodenext" 또는 "bundler"를 사용하세요. "classic" 전략은 이전 TypeScript 버전(1.6 이전)에서만 사용됩니다.

#### esModuleInterop

"esModuleInterop" 프로퍼티는 "default" 프로퍼티를 사용하여 내보내지 않은 CommonJS 모듈에서 기본 가져오기를 허용합니다. 이 프로퍼티는 내보낸 JavaScript에서 호환성을 보장하는 shim을 제공합니다. 이 옵션을 활성화하면 `import MyLibrary from "my-library"`를 `import * as MyLibrary from "my-library"` 대신 사용할 수 있습니다.

"esModuleInterop"은 호환성을 깨는 변경을 피하기 위해 원래 선택적으로 활성화했지만, 오랫동안 권장 기본값이었습니다. 이를 비활성화하면 ESM과 CommonJS를 함께 사용할 때 미묘한 런타임 문제가 발생할 수 있습니다. 참고: TypeScript 6.0부터 이 더 안전한 상호 운용 동작은 항상 활성화됩니다.

TypeScript 6.0에서는 일부 오래된 구성 옵션과 구문 형식이 더 이상 사용되지 않는 기능으로 지정되거나 이전 동작을 거쳐 전환되었습니다. TypeScript 7.0에서는 하드 오류가 발생하거나 아무 동작도 하지 않습니다.

아무 동작도 하지 않으며 하드 오류로 전환된 더 이상 사용되지 않는 기능은 다음과 같습니다.

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* `esModuleInterop` 또는 `allowSyntheticDefaultImports` 비활성화
* `alwaysStrict` 비활성화
* 네임스페이스 선언의 `module` 키워드
* import의 `asserts`
* `/// <reference no-default-lib />`를 `skipDefaultLibCheck` 아래에서 사용
* `--ignoreConfig`를 사용하지 않는 경우 로컬 `tsconfig.json`이 있는 CLI 파일 경로

#### jsx

"jsx" 프로퍼티는 ReactJS에서 사용하는 .tsx 파일에만 적용되며 JSX 구문이 JavaScript로 컴파일되는 방식을 제어합니다. 일반적으로 사용하는 옵션은 "preserve"로, JSX를 변경하지 않고 유지한 .jsx 파일로 컴파일하여 Babel과 같은 다른 도구에서 추가 변환을 수행할 수 있게 합니다.

#### skipLibCheck

"skipLibCheck" 프로퍼티를 사용하면 TypeScript가 가져온 타사 패키지 전체의 타입 검사를 수행하지 않습니다. 이 프로퍼티는 프로젝트의 컴파일 시간을 줄여 줍니다. TypeScript는 이러한 패키지가 제공하는 타입 정의에 대해서는 여전히 여러분의 코드를 검사합니다.

#### files

"files" 프로퍼티는 프로그램에 항상 포함해야 하는 파일 목록을 컴파일러에 지정합니다.

#### include

<!-- markdownlint-disable MD049 -->
"include" 프로퍼티는 포함하려는 파일 목록을 컴파일러에 지정합니다. 이 프로퍼티에서는 모든 하위 디렉터리를 나타내는 "\*_", 모든 파일 이름을 나타내는 "_", 선택적 문자를 나타내는 "?"와 같은 glob 형식의 패턴을 사용할 수 있습니다.
<!-- markdownlint-enable MD049 -->

#### exclude

"exclude" 프로퍼티는 컴파일에 포함하지 않아야 하는 파일 목록을 컴파일러에 지정합니다. 여기에는 "node_modules" 또는 테스트 파일과 같은 파일이 포함될 수 있습니다.
참고: tsconfig.json에서는 주석을 사용할 수 있습니다.

### importHelpers

TypeScript는 특정 고급 JavaScript 기능이나 이전 버전으로 다운레벨된 JavaScript 기능을 위한 코드를 생성할 때 헬퍼 코드를 사용합니다. 기본적으로 이러한 헬퍼는 이를 사용하는 파일마다 중복됩니다. `importHelpers` 옵션을 사용하면 이러한 헬퍼를 대신 `tslib` 모듈에서 가져와 JavaScript 출력을 더 효율적으로 만듭니다.

### TypeScript 마이그레이션 조언

대규모 프로젝트에서는 처음에 TypeScript와 JavaScript 코드가 공존하는 점진적 전환 방식을 채택하는 것이 좋습니다. 소규모 프로젝트만 한 번에 TypeScript로 마이그레이션할 수 있습니다.

이 전환의 첫 번째 단계는 빌드 체인 프로세스에 TypeScript를 도입하는 것입니다. 기존 JavaScript 파일과 .ts 및 .tsx 파일이 공존할 수 있도록 하는 "allowJs" 컴파일러 옵션을 사용하면 됩니다. TypeScript가 JavaScript 파일에서 변수의 타입을 추론할 수 없을 때 "any" 타입으로 대체하므로, 마이그레이션 초기에는 컴파일러 옵션에서 "noImplicitAny"를 비활성화하는 것이 좋습니다.

두 번째 단계는 각 모듈을 변환하는 동안 테스트를 실행할 수 있도록 JavaScript 테스트가 TypeScript 파일과 함께 작동하는지 확인하는 것입니다. Jest를 사용한다면 Jest로 TypeScript 프로젝트를 테스트할 수 있게 해 주는 `ts-jest` 사용을 고려하세요.

세 번째 단계는 프로젝트에 타사 라이브러리의 타입 선언을 포함하는 것입니다. 이러한 선언은 라이브러리에 번들로 포함되어 있거나 DefinitelyTyped에서 찾을 수 있습니다. [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search)에서 검색하고 다음 명령으로 설치할 수 있습니다.

```shell
npm install --save-dev @types/package-name
```

또는

```shell
yarn add --dev @types/package-name
```

네 번째 단계는 의존성 그래프의 리프부터 시작하여 상향식 접근 방식으로 모듈을 하나씩 마이그레이션하는 것입니다. 다른 모듈에 의존하지 않는 모듈부터 변환하는 것이 핵심입니다. 의존성 그래프를 시각화하려면 "madge" 도구를 사용할 수 있습니다.

이러한 초기 변환에 적합한 모듈은 유틸리티 함수와 외부 API 또는 명세와 관련된 코드입니다. 프로젝트에 포함할 TypeScript 타입 정의를 Swagger 계약, GraphQL 또는 JSON 스키마에서 자동으로 생성할 수 있습니다.

명세나 공식 스키마가 없다면 서버가 반환한 JSON과 같은 원시 데이터에서 타입을 생성할 수 있습니다. 그러나 누락되는 예외 사례를 방지하려면 데이터보다 명세에서 타입을 생성하는 것이 좋습니다.

마이그레이션 중에는 코드 리팩터링을 삼가고 모듈에 타입을 추가하는 데만 집중하세요.

다섯 번째 단계는 모든 타입을 알고 정의하도록 강제하여 프로젝트에서 더 나은 TypeScript 경험을 제공하는 "noImplicitAny"를 활성화하는 것입니다.

마이그레이션 중에는 JavaScript 파일에서 TypeScript 타입 검사를 활성화하는 `@ts-check` 지시어를 사용할 수 있습니다. 이 지시어는 느슨한 형태의 타입 검사를 제공하며 처음에는 JavaScript 파일의 문제를 식별하는 데 사용할 수 있습니다. 파일에 `@ts-check`가 포함되면 TypeScript는 JSDoc 스타일 주석을 사용하여 정의를 추론하려고 합니다. 다만 JSDoc 어노테이션은 마이그레이션의 아주 초기 단계에서만 사용하는 것을 고려하세요.

tsconfig.json에서 `noEmitOnError`의 기본값을 false로 유지하는 것을 고려하세요. 그러면 오류가 보고되더라도 JavaScript 소스 코드를 출력할 수 있습니다.

