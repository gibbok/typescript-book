---
title: API แบบเนทีฟของ TypeScript 7 เพิ่ม getter สำหรับโหนดย่อยและ token ของ AST
description: API แบบเนทีฟของ TypeScript เพิ่มเมธอด Node สำหรับไล่ดูโหนดย่อยและ token ช่วยลดช่องว่างกับ JavaScript API สำหรับเครื่องมือที่ทำงานกับ syntax tree
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**เผยแพร่:** 3 กันยายน 2026

API แบบเนทีฟของ TypeScript มีตัวช่วย `Node` เพิ่มอีกห้ารายการสำหรับไล่ดูโหนดย่อยและ token ได้แก่ `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` และ `getLastToken()`

## สิ่งที่เปลี่ยนแปลง

PR #63893 เพิ่ม getter สำหรับโหนดย่อยและ token ที่เหลือซึ่งมีอยู่แล้วใน TypeScript API ที่ทำงานบน JavaScript การเปลี่ยนแปลงนี้เติมส่วนโหนดย่อย/token ของ API แบบเนทีฟสำหรับ `Node` หลังจากที่ getter สำหรับตำแหน่งและข้อความถูกเพิ่มไปก่อนแล้ว

## เหตุผลที่สำคัญ

เมธอดเหล่านี้มีประโยชน์ต่อผู้ใช้ API ที่ต้องไล่ดู syntax tree รวมถึงเครื่องมือที่ต้องตรวจทั้ง token และโหนดย่อย ตอนนี้ API แบบเนทีฟสามารถใช้ตัวช่วยการไล่ดู `Node` แบบเดียวกันในกรณีเหล่านี้ได้

## แหล่งที่มา

อ่าน [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) และ [issue สำหรับติดตาม](https://github.com/microsoft/TypeScript/issues/63892)
