---
title: TypeScript 7.0을 사용할 수 있습니다
description: TypeScript 7.0에는 네이티브 Go 기반 컴파일러와 언어 서비스가 도입되어 빌드와 편집기의 성능이 크게 향상되었습니다.
lastUpdated: 2026-07-08
sidebar:
    order: 8
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**게시일:** 2026년 7월 8일

Microsoft는 프로젝트의 새로운 네이티브 Go 코드베이스를 기반으로 구축한 첫 번째 안정 버전인 TypeScript 7.0을 출시했습니다.

## 변경 사항

TypeScript 7은 네이티브 코드, 공유 메모리 멀티스레딩, 추가 최적화를 사용합니다. TypeScript 팀에 따르면 공개된 벤치마크의 전체 빌드는 TypeScript 6보다 7.7배에서 11.9배 빨랐습니다.

이 릴리스에서는 언어 서비스도 Language Server Protocol로 전환됩니다. 지원되는 편집기는 더 빠른 프로젝트 로딩, 진단, 자동 완성, 탐색을 위해 동일한 네이티브 기반을 사용할 수 있습니다.

npm에서 안정화 릴리스를 설치하세요.

```shell
npm install --save-dev typescript
```

## 호환성

TypeScript 7.0은 안정적인 프로그래밍 API를 제공하지 않습니다. 현재 Astro, Vue, MDX, Svelte 및 일부 Angular 워크플로를 포함하여 TypeScript를 내장하는 도구는 새 API가 제공될 때까지 여전히 TypeScript 6이 필요할 수 있습니다.

TypeScript 팀은 TypeScript 7.1에서 새 API를 도입할 예정입니다. 프로젝트는 업그레이드하기 전에 프레임워크와 도구의 지원 여부를 확인해야 합니다.

## 출처

공식 발표를 확인하세요: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
