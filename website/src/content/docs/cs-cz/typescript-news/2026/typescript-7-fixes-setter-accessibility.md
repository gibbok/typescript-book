---
title: TypeScript 7 opravuje přístupnost setterů v uniích a průnicích
description: Nativní kontrola typů nyní u vlastností unií a průniků respektuje přístupnost setterů odděleně od přístupnosti getterů.
lastUpdated: 2026-08-24
sidebar:
    order: 3
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**Zveřejněno:** 24. srpna 2026

Microsoft sloučil opravu nativní kontroly typů TypeScriptu, která u vlastností syntetizovaných z unií a průniků zachovává oddělenou přístupnost pro čtení a zápis.

## Co se změnilo

Dříve mohla být přístupnost setteru u těchto syntetických vlastností ignorována, protože kontrola ve skutečnosti používala přístupnost getteru. Veřejný getter spojený s chráněným setterem tak mohl umožnit neplatný zápis prostřednictvím unie nebo průniku.

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

Kontrola typů nyní zaznamenává přístupnost pro zápis odděleně. Čtení `foo` zůstává platné, zatímco přiřazení do této vlastnosti správně hlásí chybu přístupnosti.

## Proč je to důležité

Třídy mohou záměrně zpřístupňovat veřejné čtení a zároveň omezovat zápis. Oprava tuto hranici zachovává při kombinování objektových typů do unií nebo průniků, místo aby neúmyslně rozšiřovala přístup pro zápis.

## Dostupnost

Změna byla sloučena do nativního kódu TypeScriptu po TypeScriptu 7.0. Zdroj neuvádí stabilní verzi npm, která ji obsahuje, proto si zkontrolujte poznámky k vydání nainstalované verze, než se na toto chování spolehnete.

## Zdroj

Přečtěte si sloučený pull request TypeScriptu: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
