# TypeScript 7이 유니언과 인터섹션에서 setter 접근성을 수정했습니다


**게시일:** 2026년 8월 24일

Microsoft는 유니언과 인터섹션에서 합성된 속성의 읽기 및 쓰기 접근성을 별도로 유지하는 네이티브 TypeScript 검사기 수정 사항을 병합했습니다.

## 변경 사항

이전에는 검사에서 사실상 getter의 접근성을 사용했기 때문에 이러한 합성 속성에서 setter 접근성이 무시될 수 있었습니다. 따라서 public getter와 protected setter가 함께 있으면 유니언이나 인터섹션을 통해 유효하지 않은 쓰기가 허용될 수 있었습니다.

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

이제 검사기는 쓰기 접근성을 별도로 기록합니다. `foo` 읽기는 계속 유효하지만 값을 할당하면 접근성 오류가 올바르게 보고됩니다.

## 중요한 이유

클래스는 의도적으로 public 읽기를 노출하면서 쓰기를 제한할 수 있습니다. 이 수정은 TypeScript가 객체 타입을 유니언이나 인터섹션으로 결합할 때 쓰기 접근성을 실수로 넓히지 않고 해당 경계를 유지합니다.

## 제공 시점

이 변경 사항은 TypeScript 7.0 이후 네이티브 TypeScript 코드베이스에 병합되었습니다. 소스에는 이를 포함하는 안정적인 npm 버전이 명시되어 있지 않으므로, 이 동작을 사용하기 전에 설치된 버전의 릴리스 노트를 확인하세요.

## 출처

병합된 TypeScript 풀 리퀘스트를 확인하세요: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
