# TypeScript 7.1 Beta, 모듈형 API와 ES2026 지원 추가


**게시일:** 2026년 10월 20일

Microsoft가 새로운 네이티브 컴파일러 API와 JavaScript 기능 지원을 포함한 TypeScript 7.1 Beta를 공개했습니다. 다음 명령으로 베타 버전을 시험할 수 있습니다.

```shell
npm install -D typescript@beta
```

## 주요 변경 사항

* `--target es2026`과 `--lib es2026`이 안정적인 옵션으로 지원되며 표준 라이브러리 선언도 갱신되었습니다.
* 새 API 진입점에는 `typescript/sync`, `typescript/async`, `typescript/fs`, `typescript/ast`가 포함됩니다. `API`와 `Program` 객체는 `using` 등을 통해 반드시 해제해야 합니다.
* 소스 단계 가져오기(`import source`, `import.source()`)는 WebAssembly 등의 모듈 소스 객체를 지원하며 적절한 `--module` 및 `esnext` 설정이 필요합니다.
* 콘텐츠 매퍼는 `.vue`, `.svelte` 등의 파일에 포함된 TypeScript를 처리할 수 있게 합니다. 명령줄 실행에는 `--runExternalCode`가 필요합니다.
* Microsoft가 공개한 벤치마크에서 TypeScript 7.0보다 빌드 속도가 빨라지고 메모리 사용량이 줄었습니다.

## 제공 상태

정식 버전이 아닌 베타 버전입니다. 업그레이드 전에 프레임워크와 도구의 호환성을 확인하세요. 앰비언트 모듈의 import 속성 지원은 별도 기사에서 다뤘습니다.

## 출처

공식 발표 보기: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
