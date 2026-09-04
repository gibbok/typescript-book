---
title: تضيف واجهة TypeScript 7 الأصلية أساليب لتوليد المخرجات
description: تضيف واجهة TypeScript الأصلية أساليب لتوليد المخرجات في نظام الملفات والذاكرة للبرامج الكاملة ولمخرجات JavaScript أو التصريحات المحددة.
lastUpdated: 2026-07-24
sidebar:
    order: 7
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**نُشر في:** 24 يوليو 2026

أضافت قاعدة شيفرة TypeScript الأصلية واجهات API برمجية لتوليد المخرجات للأدوات التي تحتاج إلى إنشاء مخرجات JavaScript أو التصريحات.

## ما الذي تغير

توفر واجهة API المدمجة أربعة مسارات لتوليد المخرجات، لكل منها سلوك مختلف للمخرجات والاختيار.

* يولّد `program.emit(emitOnly?: EmitOnly)` مخرجات البرنامج بأكمله في نظام الملفات، بما في ذلك نظام ملفات افتراضي مهيأ، ويحترم خيارات منع التوليد مثل `noEmit` و`noEmitOnError`.
* يولّد `program.emitToString(emitOnly?: EmitOnly)` مخرجات البرنامج بأكمله في صورة نتائج نصية داخل الذاكرة، ويحترم أيضًا خيارات منع التوليد.
* يعيد `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` مخرجات JavaScript داخل الذاكرة للملفات المحددة، ويتجاوز خيارات منع التوليد.
* يوفر `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` مخرجات التصريحات المقابلة للملفات المحددة.

يمنح ذلك مستخدمي واجهة API خيارات منفصلة لتوليد المخرجات المعتاد للبرنامج بأكمله وللمخرجات المستهدفة داخل الذاكرة.

## التوافر

دُمج التغيير في قاعدة شيفرة TypeScript الأصلية في 24 يوليو 2026. لا يحدد المصدر إصدار npm مستقرًا يحتوي على واجهات API هذه، لذا ينبغي للأدوات التحقق من دعم إصدار TypeScript الذي تستخدمه.

## المصدر

اقرأ طلب السحب الرسمي: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
