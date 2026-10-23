# TypeScript 네이티브 컴파일러, 타입 검사기 최적화로 메모리 사용량 감소


**게시일:** 2026년 10월 14일

Microsoft는 TypeScript 네이티브 컴파일러에 여러 메모리 최적화를 병합했습니다. TypeScript 문법은 변경하지 않으면서 타입 검사기 내부 자료구조가 유지하는 메모리를 줄입니다.

## 변경 사항

* 타입이 지정된 아레나 청크는 고정된 256개 객체 대신 약 512바이트를 목표로 합니다. 해당 변경의 VS Code 벤치마크에서 유지 힙 메모리는 8.54%, 가비지 컬렉터 스캔량은 10.44% 감소했지만 할당 이벤트는 13.91% 증가했습니다.
* 선택적 시그니처, 인덱스 정보, 노드 빌더 캐시를 `StructuredType` 레코드 밖으로 옮겨 크기를 144바이트에서 88바이트로 줄였습니다.
* 안정적인 노드 ID가 있으면 해결된 타입 노드와 시그니처에 페이지형 노드 링크 저장소를 사용하고, 다른 ID에는 맵으로 대체합니다.

## 사용 가능 여부

변경 사항은 2026년 10월 14일에 병합되었습니다. 원본 풀 리퀘스트는 이를 포함하는 안정적인 npm 버전을 명시하지 않습니다. 벤치마크 결과는 측정된 변경 사항과 작업 부하에 한정됩니다.

## 출처

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
