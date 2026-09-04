---
title: TypeScript 7.0 متاح الآن
description: يقدم TypeScript 7.0 مصرّفًا وخدمة لغة أصليين مبنيين على Go، ويوفر تحسينات كبيرة في أداء عمليات البناء والمحررات.
lastUpdated: 2026-07-08
sidebar:
    order: 8
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**نُشر في:** 8 يوليو 2026

أصدرت Microsoft الإصدار TypeScript 7.0، وهو أول إصدار مستقر مبني على قاعدة شيفرة المشروع الأصلية الجديدة المكتوبة بلغة Go.

## ما الذي تغير

يستخدم TypeScript 7 الشيفرة الأصلية وتعدد الخيوط بالذاكرة المشتركة وتحسينات إضافية. وفقًا لفريق TypeScript، كانت عمليات البناء الكاملة في قياسات الأداء المنشورة أسرع بما يتراوح بين 7.7 و11.9 مرة من TypeScript 6.

ينقل الإصدار أيضًا خدمة اللغة إلى Language Server Protocol. يمكن للمحررات المدعومة استخدام الأساس الأصلي نفسه من أجل تحميل أسرع للمشاريع والتشخيصات والإكمالات والتنقل.

ثبّت الإصدار المستقر من npm:

```shell
npm install --save-dev typescript
```

## التوافق

لا يوفر TypeScript 7.0 واجهة API برمجية مستقرة. قد تظل الأدوات التي تدمج TypeScript، بما في ذلك مسارات العمل الحالية في Astro وVue وMDX وSvelte وبعض مسارات Angular، بحاجة إلى TypeScript 6 حتى تتوفر واجهة API الجديدة.

يتوقع فريق TypeScript تقديم واجهة API الجديدة في TypeScript 7.1. ينبغي للمشاريع التحقق من دعم أطر العمل والأدوات الخاصة بها قبل الترقية.

## المصدر

اقرأ الإعلان الرسمي: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
