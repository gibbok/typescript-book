---
title: واجهة TypeScript الأصلية تضيف واجهات API يحتاجها typescript-eslint
description: تضيف واجهة TypeScript الأصلية واجهات API للفاحص والأنواع يحتاجها typescript-eslint، ما يقلل فجوات التوافق بين الأدوات.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**تاريخ النشر:** 14 سبتمبر 2026

توفّر واجهة TypeScript الأصلية الآن واجهات API إضافية للفاحص والأنواع يحتاجها `typescript-eslint`، ما يقلل فجوات التوافق للأدوات التي تعتمد على واجهة TypeScript البرمجية.

## ما الذي تغير

يضيف التغيير واجهات مثل `getAwaitedType` و`getContextualTypeForArgumentAtIndex` و`getIndexInfoOfType` و`getIndexTypeOfType` و`getTypeOfPropertyOfType` و`getExportSymbolOfSymbol`. وتحصل أنواع الواجهات والفئات أيضًا على `getThisType()`، كما يتم تصدير `IndexKind` لاستعلامات أنواع الفهارس.

تم تحديث واجهتي API الأصلية المتزامنة وغير المتزامنة.

## لماذا يهم ذلك

أُنشئ طلب السحب في TypeScript خصيصًا لإضافة واجهات API حدّد `typescript-eslint` أنها مفقودة. وبذلك تحصل عمليات التكامل على مزيد من معلومات الفاحص والأنواع التي كانت تتوقعها من واجهة TypeScript المعروفة.

## المصدر

اقرأ طلب السحب الرسمي في TypeScript: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
