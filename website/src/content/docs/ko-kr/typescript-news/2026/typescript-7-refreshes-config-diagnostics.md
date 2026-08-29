---
title: TypeScript 7이 파일 변경 후 구성 진단을 새로 고칩니다
description: 이제 네이티브 언어 서비스는 감시 중인 구성 파일이 변경된 후 tsconfig.json 및 jsconfig.json 오류를 다시 게시합니다.
lastUpdated: 2026-07-30
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**게시일:** 2026년 7월 30일

Microsoft는 추적 중인 `tsconfig.json` 또는 `jsconfig.json` 파일이 변경된 후 TypeScript의 네이티브 언어 서비스에서 구성 파일 진단을 새로 고치는 수정 사항을 병합했습니다.

## 변경 사항

구성 파일 진단은 언어 서비스 스냅샷을 업데이트할 때 게시됩니다. 이전에는 감시 중인 구성 파일이 변경되면 진단 새로 고침은 예약되었지만 스냅샷 업데이트는 예약되지 않았습니다. 따라서 편집기가 스냅샷을 업데이트하는 다른 요청을 할 때까지 새로운 구성 오류가 오래된 상태로 남을 수 있었습니다.

이제 언어 서비스는 추적 중인 구성 파일의 변경을 감지하고 디바운스된 스냅샷 업데이트를 예약합니다. 이를 통해 편집기의 후속 요청에 의존하지 않고 푸시 진단을 다시 게시합니다.

## 중요한 이유

편집기나 외부 도구가 추적 중인 `tsconfig.json` 또는 `jsconfig.json`을 변경하면 네이티브 언어 서비스가 파일 감시 이벤트만으로 업데이트된 구성 오류를 보고할 수 있습니다. 회귀 테스트는 유효하지 않은 `target` 값을 사용하여 이 동작을 검증합니다.

## 제공 시점

이 변경 사항은 TypeScript 7.0 출시 이후 네이티브 TypeScript 코드베이스에 병합되었습니다. 소스에는 이를 포함하는 안정적인 npm 버전이 명시되어 있지 않으므로, 이 수정에 의존하기 전에 설치된 버전의 릴리스 노트를 확인하세요.

## 출처

공식 변경 사항을 확인하세요: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
