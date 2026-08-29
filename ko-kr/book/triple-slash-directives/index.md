# 트리플 슬래시 지시문



트리플 슬래시 지시문은 컴파일러에 파일 처리 방법을 지시하는 특별한 주석입니다. 이러한 지시문은 연속된 세 개의 슬래시(`///`)로 시작하며 일반적으로 TypeScript 파일의 맨 위에 배치되고 런타임 동작에는 영향을 주지 않습니다.

트리플 슬래시 지시문은 외부 의존성을 참조하고, 모듈 로딩 동작을 지정하며, 특정 컴파일러 기능을 활성화하거나 비활성화하는 등의 용도로 사용됩니다. 몇 가지 예는 다음과 같습니다.

선언 파일 참조:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

모듈 형식 지정:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

컴파일러 옵션 활성화. 다음 예제에서는 엄격 모드를 활성화합니다.

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

