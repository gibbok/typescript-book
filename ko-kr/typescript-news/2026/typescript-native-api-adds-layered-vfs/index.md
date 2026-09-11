# TypeScript 네이티브 API에 계층형 가상 파일 시스템 추가


**게시일:** 2026년 9월 9일

TypeScript 네이티브 API에서 명시적인 가상 파일 시스템 데이터로 스냅샷을 생성하고 업데이트할 수 있게 되었습니다. 도구는 전체 파일 시스템 입력을 다시 만들지 않고도 파일 추가, 수정, 삭제를 모델링할 수 있습니다.

## 변경 사항

새로운 `createFileSystem`, `createFileSystemWithLib`, `createFileSystemLayer` 헬퍼는 스냅샷 API가 받는 VFS 객체를 생성합니다. `Snapshot.update`는 기존 스냅샷 위에 새로운 캐시 계층을 적용할 수 있습니다.

`full` VFS는 완전히 메모리에 유지되며 호스트 또는 세션 파일 시스템 콜백으로 폴백하지 않습니다. `layer` VFS는 캐시 미스 시 호스트로 폴백하고 `removedPaths`를 사용해 호스트에 존재하는 파일이나 디렉터리를 숨길 수 있습니다. 두 형태 모두 가상 파일 시스템 내부와 호스트 경로를 향하는 심볼릭 링크를 지원합니다.

## 현재 제한

VFS 기반 스냅샷도 계속 실제 스냅샷으로 계산되므로 네이티브 API는 한 번에 하나의 실제 스냅샷만 허용하는 현재 제한을 유지합니다. 따라서 스냅샷 작업은 당분간 직렬로 수행됩니다.

## 출처

병합된 TypeScript pull request를 확인하세요: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
