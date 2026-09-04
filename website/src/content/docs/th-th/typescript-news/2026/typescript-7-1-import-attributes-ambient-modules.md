---
title: TypeScript 7.1 เพิ่ม import attributes ให้ ambient module
description: TypeScript 7.1 สามารถจับคู่การประกาศ ambient module แบบ pattern ตาม import attributes ได้
lastUpdated: 2026-09-01
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-01'
---

**เผยแพร่:** 1 กันยายน 2026

คอมไพเลอร์ native ของ TypeScript รองรับชนิดของ import attributes ในการประกาศ ambient module แบบ pattern แล้ว จึงสามารถแยก import ด้วย attributes เช่น `type: 'css'` หรือ `type: 'text'` ได้

## สิ่งที่เปลี่ยนแปลง

เมื่อ import มี attributes TypeScript สามารถ resolve ไปยัง ambient module แบบ pattern ที่ตรงกันได้ การจับคู่ใช้ assignability และหากมีหลาย declaration ที่ตรงกัน TypeScript จะเลือก declaration ที่มีชนิด attributes เฉพาะเจาะจงที่สุด

ในขณะนี้ ชนิดของ attributes ใน declaration เหล่านี้จำกัดอยู่ที่ property ปกติซึ่งมีค่าเป็น string literal type declaration ที่มี pattern และชนิด attributes เหมือนกันสามารถ merge กันได้ ส่วนชนิดที่ต่างกันจะยังแยกจากกัน

## ความเข้ากันได้

การเปลี่ยนแปลงนี้ถูก merge สำหรับ milestone TypeScript 7.1.0 Beta และไม่ได้เพิ่ม declaration สำหรับ CSS หรือ text import ไว้ใน standard library โดยอัตโนมัติ ดังนั้นโปรเจกต์และ tooling ยังต้องกำหนด ambient module ที่ต้องใช้เอง

## แหล่งที่มา

อ่าน pull request ของ TypeScript ที่ merge แล้ว: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
