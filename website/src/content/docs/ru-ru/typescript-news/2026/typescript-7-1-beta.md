---
title: "TypeScript 7.1 Beta добавляет модульные API и поддержку ES2026"
description: "TypeScript 7.1 Beta включает модульные нативные API, ES2026, импорты исходников, content mapper и оптимизации."
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**Опубликовано:** 20 октября 2026 года

Microsoft выпустила TypeScript 7.1 Beta с новыми нативными API компилятора и поддержкой возможностей JavaScript. Чтобы попробовать бета-версию:

```shell
npm install -D typescript@beta
```

## Что изменилось

* `--target es2026` и `--lib es2026` теперь поддерживаются как стабильные параметры с обновлёнными объявлениями стандартной библиотеки.
* Новые точки входа API включают `typescript/sync`, `typescript/async`, `typescript/fs` и `typescript/ast`. Объекты `API` и `Program` необходимо освобождать, например с помощью `using`.
* Импорты исходной фазы (`import source` и `import.source()`) поддерживают объекты исходников модулей, в том числе для WebAssembly, при подходящих настройках `--module` и `esnext`.
* Content mapper позволяет работать с TypeScript, встроенным в файлы вроде `.vue` и `.svelte`. Для запуска из командной строки требуется `--runExternalCode`.
* По опубликованным Microsoft тестам сборка стала быстрее, а потребление памяти — ниже по сравнению с TypeScript 7.0.

## Доступность

Это бета-версия, а не стабильный релиз. Перед обновлением проверьте совместимость фреймворков и инструментов. Атрибуты импорта в ambient-модулях уже рассматривались в отдельной новости.

## Источник

Читайте официальное объявление: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
