---
title: TypeScript 7 แก้ไขการเข้าถึง setter ใน union และ intersection
description: ขณะนี้ตัวตรวจสอบแบบเนทีฟพิจารณาการเข้าถึง setter แยกจากการเข้าถึง getter สำหรับพร็อพเพอร์ตีของ union และ intersection
lastUpdated: 2026-08-24
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**เผยแพร่:** 24 สิงหาคม 2026

Microsoft ได้ merge การแก้ไขตัวตรวจสอบ TypeScript แบบเนทีฟ ซึ่งแยกการเข้าถึงเพื่ออ่านและเขียนออกจากกันสำหรับพร็อพเพอร์ตีที่สังเคราะห์จาก union และ intersection

## สิ่งที่เปลี่ยนแปลง

ก่อนหน้านี้ การเข้าถึง setter อาจถูกละเว้นสำหรับพร็อพเพอร์ตีสังเคราะห์เหล่านี้ เนื่องจากผลของการตรวจสอบใช้การเข้าถึงของ getter ดังนั้น getter แบบ public ที่จับคู่กับ setter แบบ protected จึงอาจยอมให้เขียนค่าที่ไม่ถูกต้องผ่าน union หรือ intersection ได้

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

ขณะนี้ตัวตรวจสอบบันทึกการเข้าถึงเพื่อเขียนแยกต่างหาก การอ่าน `foo` ยังคงใช้ได้ ส่วนการกำหนดค่าให้พร็อพเพอร์ตีนี้จะรายงานข้อผิดพลาดด้านการเข้าถึงอย่างถูกต้อง

## เหตุใดจึงสำคัญ

คลาสสามารถตั้งใจเปิดให้สาธารณะอ่านค่าได้ ขณะเดียวกันก็จำกัดการเขียน การแก้ไขนี้รักษาขอบเขตดังกล่าวไว้เมื่อ TypeScript รวมชนิดออบเจ็กต์เป็น union หรือ intersection แทนที่จะขยายสิทธิ์การเขียนโดยไม่ตั้งใจ

## ความพร้อมใช้งาน

การเปลี่ยนแปลงนี้ถูก merge เข้าสู่ฐานโค้ด TypeScript แบบเนทีฟหลัง TypeScript 7.0 แหล่งข้อมูลไม่ได้ระบุเวอร์ชัน npm แบบเสถียรที่รวมการเปลี่ยนแปลงนี้ ดังนั้นควรตรวจสอบ release notes ของเวอร์ชันที่ติดตั้งก่อนอาศัยพฤติกรรมนี้

## แหล่งข้อมูล

อ่าน pull request ของ TypeScript ที่ merge แล้ว: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932)
