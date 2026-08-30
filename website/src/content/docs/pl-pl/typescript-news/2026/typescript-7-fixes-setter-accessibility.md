---
title: TypeScript 7 poprawia kontrolę dostępności setterów w uniach i przecięciach
description: Natywny mechanizm sprawdzania typów respektuje teraz dostępność setterów niezależnie od dostępności getterów dla właściwości typów unii i przecięcia.
lastUpdated: 2026-08-24
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**Opublikowano:** 24 sierpnia 2026 r.

Microsoft scalił poprawkę natywnego mechanizmu sprawdzania typów TypeScript, która rozdziela dostępność odczytu i zapisu dla właściwości syntetyzowanych z unii i przecięć.

## Co się zmieniło

Wcześniej dostępność settera mogła być ignorowana w przypadku tych syntetycznych właściwości, ponieważ sprawdzanie w praktyce uwzględniało dostępność gettera. Publiczny getter połączony z chronionym setterem mógł zatem pozwolić na nieprawidłowy zapis za pośrednictwem unii lub przecięcia.

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

Mechanizm sprawdzania typów rejestruje teraz dostępność zapisu oddzielnie. Odczyt właściwości `foo` pozostaje prawidłowy, natomiast próba przypisania do niej poprawnie zgłasza błąd dostępności.

## Dlaczego ma to znaczenie

Klasy mogą celowo udostępniać publiczny odczyt, a jednocześnie ograniczać zapis. Poprawka zachowuje tę granicę, gdy TypeScript łączy typy obiektów w unie lub przecięcia, zamiast przypadkowo rozszerzać dostęp do zapisu.

## Dostępność

Zmiana została scalona z natywną bazą kodu TypeScript po wydaniu TypeScript 7.0. W źródle nie wskazano stabilnej wersji pakietu npm, która ją zawiera, dlatego przed skorzystaniem z tego zachowania należy sprawdzić informacje o wydaniu zainstalowanej wersji.

## Źródło

Przeczytaj scalony pull request TypeScript: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
