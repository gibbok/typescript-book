---
title: TypeScript 7.1 добавя import attributes към ambient модули
description: TypeScript 7.1 може да съпоставя pattern ambient module декларации според import attributes.
lastUpdated: 2026-09-01
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-01'
---

**Публикувано:** 1 септември 2026 г.

Нативният компилатор на TypeScript вече поддържа типове за import attributes в pattern ambient module декларации. Така декларациите могат да разграничават import-и с атрибути като `type: 'css'` или `type: 'text'`.

## Какво се промени

Когато import съдържа атрибути, TypeScript може да го разреши към съответстващ pattern ambient модул. Съпоставянето използва assignability, а ако има повече от една подходяща декларация, TypeScript избира тази с най-специфичния тип атрибути.

Засега типовете на атрибутите в тези декларации са ограничени до обикновени свойства със стойности от string literal тип. Декларации с един и същ pattern и идентични типове атрибути могат да се обединяват; различните типове остават отделни.

## Съвместимост

Промяната е обединена за milestone TypeScript 7.1.0 Beta. Тя не добавя вградено CSS или text import деклариране в стандартната библиотека, затова проектите и инструментите все още трябва да дефинират нужните ambient модули.

## Източник

Прочетете обединения TypeScript pull request: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
