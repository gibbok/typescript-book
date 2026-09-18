# TypeScript 네이티브 API에 typescript-eslint가 필요한 API 추가


**게시일:** 2026년 9월 14일

TypeScript 네이티브 API가 이제 `typescript-eslint`에 필요한 추가 검사기 및 타입 API를 제공하여 TypeScript 프로그래밍 API에 의존하는 도구의 호환성 차이를 줄입니다.

## 변경 사항

`getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType`, `getExportSymbolOfSymbol` 등의 API가 추가됩니다. 인터페이스 및 클래스 타입에는 `getThisType()`도 추가되고, 인덱스 타입 조회를 위해 `IndexKind`가 내보내집니다.

동기 및 비동기 네이티브 API 표면이 모두 업데이트되었습니다.

## 중요한 이유

이 TypeScript pull request는 `typescript-eslint`가 누락되었다고 식별한 API를 추가하기 위해 만들어졌습니다. 통합 도구는 기존 TypeScript API에서 기대하던 검사기 및 타입 정보를 더 많이 사용할 수 있습니다.

## 출처

공식 TypeScript pull request를 확인하세요: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
