---
title: ประกาศ TypeScript 7.0 release candidate
description: TypeScript 7.0 release candidate นำเสนอคอมไพเลอร์แบบเนทีฟ การ build แบบขนาน การเปลี่ยนแปลงด้านความเข้ากันได้ และการรองรับ editor ที่กว้างขึ้น
lastUpdated: 2026-06-18
sidebar:
    order: 9
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**เผยแพร่:** 18 มิถุนายน 2026

Microsoft ได้เผยแพร่ TypeScript 7.0 release candidate เป็นรุ่นตัวอย่างสุดท้ายก่อน TypeScript 7 รุ่นเสถียร

## สิ่งที่เปลี่ยนแปลง

release candidate ย้าย TypeScript ไปยังคอมไพเลอร์และบริการภาษาแบบใหม่ที่พัฒนาด้วย Go ตรรกะการตรวจสอบชนิดถูกพอร์ตมาจาก TypeScript 6 เพื่อรักษา semantics เดิมไว้ พร้อมปรับปรุงประสิทธิภาพด้วยโค้ดแบบเนทีฟและการประมวลผลแบบขนานผ่านหน่วยความจำร่วม

TypeScript 7 เพิ่มการตรวจสอบชนิดแบบขนานและการ build แบบ project-reference ตัวเลือก `--checkers` ควบคุมจำนวน worker ที่ตรวจสอบชนิด ขณะที่ `--builders` ควบคุมจำนวน builder สำหรับ project-reference

ในเวลาที่ประกาศ สามารถติดตั้ง release candidate จาก npm ได้ดังนี้:

```shell
npm install --save-dev typescript@rc
```

## ความเข้ากันได้

release candidate ไม่มี API สำหรับการเขียนโปรแกรมที่เสถียร ทีม TypeScript จัดเตรียมแพ็กเกจความเข้ากันได้ `@typescript/typescript6` เพื่อให้เครื่องมือที่ต้องใช้ API ของ TypeScript 6 สามารถทำงานควบคู่ไปกับคอมไพเลอร์ใหม่ได้

release candidate ยังใช้ค่าเริ่มต้นของ TypeScript 6 และถือว่าตัวเลือกที่ถูก deprecated ใน TypeScript 6 เป็นข้อผิดพลาด ทีมต่าง ๆ ได้รับคำแนะนำให้ย้ายไปยัง TypeScript 6 ก่อนประเมิน TypeScript 7

## แหล่งข้อมูล

อ่านประกาศอย่างเป็นทางการ: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/)
