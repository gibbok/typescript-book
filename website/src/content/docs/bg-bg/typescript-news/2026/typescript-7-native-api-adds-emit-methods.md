---
title: Нативният API на TypeScript 7 добавя emit методи
description: Нативният API на TypeScript добавя emit методи за файлова система и памет за цели програми и избрани JavaScript или декларационни изходи.
lastUpdated: 2026-07-24
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**Публикувано:** 24 юли 2026 г.

Нативната кодова база на TypeScript добави програмни emit API за инструменти, които трябва да генерират JavaScript или декларационен изход.

## Какво се промени

Обединеният API предоставя четири начина за emit с различно поведение за изхода и избора на файлове.

* `program.emit(emitOnly?: EmitOnly)` извежда цялата програма във файловата система, включително конфигурирана виртуална файлова система, и спазва опции, които блокират emit, като `noEmit` и `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` извежда цялата програма като низови резултати в паметта и също спазва опциите, които блокират emit.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` връща JavaScript изход в паметта за избрани файлове и заобикаля опциите, които блокират emit.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` предоставя съответния декларационен изход за избраните файлове.

Това дава на потребителите на API отделен избор между нормален emit на цялата програма и целеви изход в паметта.

## Наличност

Промяната е обединена в нативната кодова база на TypeScript на 24 юли 2026 г. Източникът не посочва стабилна npm версия, която съдържа тези API, затова инструментите трябва да проверят поддръжката във версията на TypeScript, която използват.

## Източник

Прочетете официалната pull request: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
