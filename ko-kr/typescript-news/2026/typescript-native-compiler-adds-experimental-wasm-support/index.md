# TypeScript 네이티브 컴파일러에 실험적 WebAssembly 지원 추가


**게시일:** 2026-10-29

Microsoft는 2026년 10월 29일 TypeScript 네이티브 컴파일러에 실험적인 `wasip1/wasm` 지원을 병합했습니다. 이 변경으로 WASI 호스트에서 컴파일러를 실행하고 브라우저에서도 사용할 수 있는 JavaScript API 전송 방식을 활용할 수 있습니다.

## 변경 사항

* 동일한 `tsc.wasm`을 CLI 또는 언어 서버용 WASI 명령으로 실행하거나, 동기 및 비동기 JavaScript API 호출을 위한 reactor로 사용할 수 있습니다.
* 새 아티팩트 패키지 `@typescript/typescript-wasip1-wasm`에는 WebAssembly 컴파일러와 라이브러리 파일이 포함됩니다. `typescript/wasm` 호스트는 `instantiateWasm`과 `instantiateWasmSync`를 제공하며, 두 패키지는 정확히 같은 버전을 사용해야 합니다.
* VS Code for Web 확장에는 `tsc.wasm --lsp`를 실행하는 진입점이 추가되었습니다. Node.js API 테스트와 Chromium 브라우저 스모크 테스트도 포함됩니다.

## 제공 상태

이는 병합된 실험적 변경 사항이며 안정적인 WebAssembly 릴리스 발표가 아닙니다. 바이너리, 패키지 구조, `typescript/wasm` 호스트는 예고 없이 변경될 수 있습니다.

## 출처

[병합된 TypeScript 풀 리퀘스트 읽기](https://github.com/microsoft/TypeScript/pull/64174).
