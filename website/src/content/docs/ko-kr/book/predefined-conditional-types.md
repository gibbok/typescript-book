---
title: 미리 정의된 조건부 타입
sidebar:
  order: 43
  label: 43. 미리 정의된 조건부 타입
---


TypeScript에서 미리 정의된 조건부 타입은 언어에서 제공하는 기본 제공 조건부 타입입니다. 주어진 타입의 특성에 따라 일반적인 타입 변환을 수행하도록 설계되었습니다.

`Exclude<UnionType, ExcludedType>`: Type에서 ExcludedType에 할당할 수 있는 모든 타입을 제거합니다.

`Extract<Type, Union>`: Union에서 Type에 할당할 수 있는 모든 타입을 추출합니다.

`NonNullable<Type>`: Type에서 null과 undefined를 제거합니다.

`ReturnType<Type>`: 함수 Type의 반환 타입을 추출합니다.

`Parameters<Type>`: 함수 Type의 매개변수 타입을 추출합니다.

`Required<Type>`: Type의 모든 프로퍼티를 필수로 만듭니다.

`Partial<Type>`: Type의 모든 프로퍼티를 선택 사항으로 만듭니다.

`Readonly<Type>`: Type의 모든 프로퍼티를 읽기 전용으로 만듭니다.

