---
title: TypeScript 7 네이티브 API에 emit 메서드가 추가되었습니다
description: 네이티브 TypeScript API에 전체 프로그램과 선택한 JavaScript 또는 선언 출력을 위한 파일 시스템 및 인메모리 emit 메서드가 추가되었습니다.
lastUpdated: 2026-07-24
sidebar:
    order: 7
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**게시일:** 2026년 7월 24일

네이티브 TypeScript 코드베이스에 JavaScript 또는 선언 출력을 생성해야 하는 도구를 위한 프로그래밍 방식의 emit API가 추가되었습니다.

## 변경 사항

병합된 API는 출력 및 선택 동작이 서로 다른 네 가지 emit 경로를 제공합니다.

* `program.emit(emitOnly?: EmitOnly)`은 구성된 가상 파일 시스템을 포함한 파일 시스템에 전체 프로그램을 emit하며, `noEmit` 및 `noEmitOnError`와 같은 emit 차단 옵션을 준수합니다.
* `program.emitToString(emitOnly?: EmitOnly)`은 전체 프로그램을 인메모리 문자열 결과로 emit하며 emit 차단 옵션도 준수합니다.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])`은 선택한 파일의 인메모리 JavaScript 출력을 반환하며 emit 차단 옵션을 우회합니다.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])`은 이에 대응하는 선택 파일의 선언 출력을 제공합니다.

이를 통해 API 사용자는 일반적인 전체 프로그램 emit과 대상이 지정된 인메모리 출력 중에서 별도로 선택할 수 있습니다.

## 제공 시점

이 변경 사항은 2026년 7월 24일에 네이티브 TypeScript 코드베이스에 병합되었습니다. 소스에는 이러한 API를 포함하는 안정적인 npm 버전이 명시되어 있지 않으므로, 도구는 사용하는 TypeScript 버전의 지원 여부를 확인해야 합니다.

## 출처

공식 풀 리퀘스트를 확인하세요: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
