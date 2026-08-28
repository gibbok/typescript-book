# TypeScript 7 corrige l'accessibilité des setters dans les unions et intersections


**Publié le :** 24 août 2026

Microsoft a intégré un correctif au vérificateur natif de TypeScript afin de conserver séparément l'accessibilité en lecture et en écriture pour les propriétés synthétisées à partir d'unions et d'intersections.

## Ce qui a changé

Auparavant, l'accessibilité du setter pouvait être ignorée pour ces propriétés synthétiques, car la vérification utilisait en pratique l'accessibilité du getter. Un getter public associé à un setter protégé pouvait donc autoriser une écriture non valide à travers une union ou une intersection.

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

Le vérificateur enregistre désormais séparément l'accessibilité en écriture. La lecture de `foo` reste valide, tandis qu'une affectation signale correctement une erreur d'accessibilité.

## Pourquoi c'est important

Les classes peuvent volontairement exposer des lectures publiques tout en restreignant les écritures. Le correctif préserve cette limite lorsque TypeScript combine des types d'objets dans des unions ou des intersections, au lieu d'élargir accidentellement l'accès en écriture.

## Disponibilité

La modification a été intégrée à la base de code native de TypeScript après TypeScript 7.0. La source n'indique pas de version npm stable qui l'inclut ; consultez donc les notes de version de la version installée avant de vous fier à ce comportement.

## Source

Consultez la pull request TypeScript intégrée : [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
