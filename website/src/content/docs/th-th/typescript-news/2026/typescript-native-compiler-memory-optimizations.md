---
title: คอมไพเลอร์ native ของ TypeScript ลดการใช้หน่วยความจำด้วยการปรับปรุงตัวตรวจสอบชนิด
description: การเปลี่ยนแปลงที่ merge แล้วลดขนาดข้อมูลชนิดแบบมีโครงสร้างและปรับการจัดสรรหน่วยความจำกับแคช
lastUpdated: 2026-10-14
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-14'
---

**เผยแพร่:** 14 ตุลาคม 2026

Microsoft ได้ merge การปรับปรุงหน่วยความจำหลายรายการเข้าในคอมไพเลอร์ native ของ TypeScript โดยลดหน่วยความจำที่โครงสร้างข้อมูลภายในตัวตรวจสอบชนิดเก็บไว้ โดยไม่เปลี่ยนไวยากรณ์ของ TypeScript

## สิ่งที่เปลี่ยนแปลง

* ชังก์ของ typed arena เปลี่ยนมาใช้ขนาดเป้าหมายประมาณ 512 ไบต์ แทนจำนวนคงที่ 256 ออบเจ็กต์ ใน benchmark ของ VS Code สำหรับการเปลี่ยนแปลงนี้ heap ที่คงอยู่ลดลง 8.54% และการสแกนของ garbage collector ลดลง 10.44% แต่จำนวนเหตุการณ์การจัดสรรเพิ่มขึ้น 13.91%
* ย้าย signature แบบเลือกได้ ข้อมูล index และแคชของ node builder ออกจากเรคอร์ด `StructuredType` ทำให้ขนาดลดจาก 144 เป็น 88 ไบต์
* โหนดชนิดที่ resolve แล้วและ signature ใช้ที่เก็บ node-link แบบแบ่งหน้าเมื่อมี node ID ที่เสถียร และใช้ map สำรองสำหรับ ID อื่น

## ความพร้อมใช้งาน

การเปลี่ยนแปลงเหล่านี้ merge เมื่อ 14 ตุลาคม 2026 pull request ต้นทางไม่ได้ระบุเวอร์ชัน npm แบบ stable ที่รวมการเปลี่ยนแปลงนี้ ผล benchmark ใช้ได้เฉพาะกับการเปลี่ยนแปลงและภาระงานที่ทดสอบ

## แหล่งที่มา

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
