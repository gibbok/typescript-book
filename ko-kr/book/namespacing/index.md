# 네임스페이스 지정



TypeScript에서 네임스페이스는 코드를 논리적 컨테이너로 구성하는 데 사용되며, 이름 충돌을 방지하고 관련 코드를 함께 그룹화할 수 있게 합니다.
`export` 키워드를 사용하면 모듈 외부에서 네임스페이스에 접근할 수 있습니다.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

