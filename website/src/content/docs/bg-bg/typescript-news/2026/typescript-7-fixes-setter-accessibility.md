---
title: TypeScript 7 коригира достъпа до setter-и в union и intersection типове
description: Нативната проверка на типовете вече спазва отделно достъпа до setter и getter при свойства на union и intersection типове.
lastUpdated: 2026-08-24
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**Публикувано:** 24 август 2026 г.

Microsoft обедини корекция в нативната проверка на TypeScript, която разделя достъпа за четене и запис при свойства, синтезирани от union и intersection типове.

## Какво се промени

Преди това достъпът до setter можеше да бъде пренебрегнат за тези синтетични свойства, защото проверката на практика използваше достъпа на getter. Така публичен getter с protected setter можеше неправилно да позволи запис чрез union или intersection.

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

Проверката вече записва отделно достъпа за писане. Четенето на `foo` остава валидно, а присвояването правилно отчита грешка за достъп.

## Защо е важно

Класовете могат умишлено да предоставят публично четене, като ограничават записите. Корекцията запазва тази граница, когато TypeScript комбинира обектни типове в union или intersection, вместо случайно да разширява достъпа за писане.

## Наличност

Промяната е обединена в нативната кодова база на TypeScript след TypeScript 7.0. Източникът не посочва стабилна npm версия, която я включва, затова проверете бележките за изданието на инсталираната версия, преди да разчитате на това поведение.

## Източник

Прочетете обединената TypeScript pull request: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
