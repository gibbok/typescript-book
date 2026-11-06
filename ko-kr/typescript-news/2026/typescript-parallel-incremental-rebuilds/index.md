# TypeScript, 병렬 검사로 증분 빌드 속도 개선


컴파일러에 병합된 변경으로 여러 파일에서 가져오는 모듈을 수정할 때 영향을 받는 파일의 시그니처를 병렬로 검사합니다. 이전에는 순차적으로 처리했습니다.

## 변경 사항

작성자의 벤치마크에서 32코어 Linux 환경에서 주석만 수정한 후 재빌드 시간이 **3.4초에서 1.5초**로 줄었습니다. n8n 패키지의 비슷한 사례에서는 **5.4초에서 4.5초**로 줄었습니다. 특정 작업 부하의 결과이며 일반적인 보장은 아닙니다.

## 성능 및 제한

작업은 `GOMAXPROCS`로 제한되며 효과는 사용 가능한 검사기와 의존성에 따라 다릅니다. 참조 파일을 탐색하지 않는 `isolatedModules`에는 이점이 없습니다.

## 출처

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
