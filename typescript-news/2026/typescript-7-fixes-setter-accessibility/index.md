# TypeScript 7 fixes setter accessibility in unions and intersections


**Published:** August 24, 2026

Microsoft merged a native TypeScript checker fix that keeps read and write accessibility separate for properties synthesized from unions and intersections.

## What changed

Previously, setter accessibility could be ignored for these synthetic properties because checking effectively used the getter's accessibility. A public getter paired with a protected setter could therefore allow an invalid write through a union or intersection.

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

The checker now records write accessibility separately. Reading `foo` remains valid, while assigning to it correctly reports an accessibility error.

## Why it matters

Classes can intentionally expose public reads while restricting writes. The fix preserves that boundary when TypeScript combines object types into unions or intersections instead of accidentally widening write access.

## Availability

The change was merged into the native TypeScript codebase after TypeScript 7.0. The source does not identify a stable npm version that includes it, so check the release notes for the installed version before relying on the behavior.

## Source

Read the merged TypeScript pull request: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
