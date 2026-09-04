---
title: TypeScript 7.0 릴리스 후보가 발표되었습니다
description: TypeScript 7.0 릴리스 후보는 네이티브 컴파일러, 병렬 빌드, 호환성 변경 사항, 확장된 편집기 지원을 미리 선보였습니다.
lastUpdated: 2026-06-18
sidebar:
    order: 9
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**게시일:** 2026년 6월 18일

Microsoft는 안정적인 TypeScript 7 출시 전 최종 프리뷰로 TypeScript 7.0 릴리스 후보를 출시했습니다.

## 변경 사항

릴리스 후보에서는 TypeScript가 새로운 Go 기반 컴파일러와 언어 서비스로 전환되었습니다. 기존 의미 체계를 유지하면서 네이티브 코드와 공유 메모리 병렬 처리를 통해 성능을 향상하도록 TypeScript 6의 타입 검사 로직을 이식했습니다.

TypeScript 7에는 병렬 타입 검사와 프로젝트 참조 빌드가 추가되었습니다. `--checkers` 옵션은 타입 검사 워커 수를 제어하고, `--builders`는 프로젝트 참조 빌더 수를 제어합니다.

발표 당시에는 npm에서 릴리스 후보를 설치할 수 있었습니다.

```shell
npm install --save-dev typescript@rc
```

## 호환성

릴리스 후보에는 안정적인 프로그래밍 API가 포함되지 않았습니다. TypeScript 팀은 TypeScript 6 API가 필요한 도구를 새 컴파일러와 함께 실행할 수 있도록 `@typescript/typescript6` 호환성 패키지를 제공했습니다.

릴리스 후보는 TypeScript 6의 기본값도 채택했으며 TypeScript 6에서 더 이상 사용되지 않는 옵션을 오류로 처리했습니다. 팀에는 TypeScript 7을 평가하기 전에 먼저 TypeScript 6으로 마이그레이션할 것을 권고했습니다.

## 출처

공식 발표를 확인하세요: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
