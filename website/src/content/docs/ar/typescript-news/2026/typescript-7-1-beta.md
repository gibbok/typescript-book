---
title: "TypeScript 7.1 Beta يقدّم واجهات API معيارية ودعم ES2026"
description: "يضيف TypeScript 7.1 Beta واجهات API أصلية معيارية ودعم ES2026 واستيراد المصدر ومحوّلات المحتوى وتحسينات الأداء."
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**تاريخ النشر:** 20 أكتوبر 2026

أصدرت Microsoft النسخة التجريبية TypeScript 7.1 Beta مع واجهات API أصلية جديدة للمترجم ودعم ميزات JavaScript. لتجربة النسخة التجريبية:

```shell
npm install -D typescript@beta
```

## ما الذي تغيّر

* أصبح الخياران `--target es2026` و`--lib es2026` مدعومين كخيارات مستقرة، مع تحديث تعريفات المكتبة القياسية.
* تتضمن نقاط الدخول الجديدة للواجهة `typescript/sync` و`typescript/async` و`typescript/fs` و`typescript/ast`. يجب تحرير كائنات `API` و`Program`، مثلًا باستخدام `using`.
* تدعم عمليات استيراد مرحلة المصدر (`import source` و`import.source()`) كائنات مصادر الوحدات، بما في ذلك استخدامات WebAssembly، مع إعدادات `--module` و`esnext` المناسبة.
* تتيح محوّلات المحتوى التعامل مع TypeScript المضمّن في ملفات مثل `.vue` و`.svelte`. يتطلب التشغيل من سطر الأوامر الخيار `--runExternalCode`.
* تُظهر اختبارات الأداء التي نشرتها Microsoft عمليات بناء أسرع واستهلاكًا أقل للذاكرة مقارنةً بـ TypeScript 7.0.

## التوفّر

هذه نسخة تجريبية وليست إصدارًا مستقرًا. تحقّق من توافق الأطر والأدوات قبل الترقية. نوقش دعم سمات الاستيراد في الوحدات المحيطية في خبر منفصل.

## المصدر

اقرأ الإعلان الرسمي: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
