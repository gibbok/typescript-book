---
title: واجهة TypeScript 7 الأصلية تضيف دوال getter لعُقد AST الفرعية والرموز
description: تضيف واجهة TypeScript الأصلية أساليب Node لاجتياز العُقد الفرعية والرموز، مما يقلل الفجوة مع واجهة JavaScript لأدوات شجرة البنية.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**تاريخ النشر:** 3 سبتمبر 2026

توفّر واجهة TypeScript الأصلية الآن خمس دوال مساعدة على `Node` لاجتياز العُقد الفرعية والرموز: `getChildren()` و`getChildCount()` و`getChildAt()` و`getFirstToken()` و`getLastToken()`.

## ما الذي تغيّر

يضيف PR #63893 دوال getter المتبقية للعُقد الفرعية والرموز الموجودة مسبقًا في واجهة TypeScript المبنية على JavaScript. ويستكمل هذا التغيير هذا الجزء من واجهة `Node` الأصلية بعد إضافة دوال getter للموضع والنص سابقًا.

## لماذا يهم ذلك

تفيد هذه الأساليب مستخدمي الواجهة الذين يجتازون شجرة البنية، بما في ذلك الأدوات التي تحتاج إلى فحص الرموز والعُقد الفرعية معًا. ويمكن للواجهة الأصلية الآن استخدام دوال الاجتياز المساعدة نفسها على `Node` في هذه الحالات.

## المصدر

راجع [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) و[issue التتبع](https://github.com/microsoft/TypeScript/issues/63892).
