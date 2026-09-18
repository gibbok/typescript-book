---
title: API แบบเนทีฟของ TypeScript เพิ่ม API ที่ typescript-eslint ต้องการ
description: API แบบเนทีฟของ TypeScript เพิ่ม API สำหรับตัวตรวจสอบและชนิดข้อมูลที่ typescript-eslint ต้องการ ลดช่องว่างด้านความเข้ากันได้ของเครื่องมือ
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**เผยแพร่:** 14 กันยายน 2026

API แบบเนทีฟของ TypeScript เปิดให้ใช้ API สำหรับตัวตรวจสอบและชนิดข้อมูลเพิ่มเติมที่ `typescript-eslint` ต้องการ ช่วยลดช่องว่างด้านความเข้ากันได้สำหรับเครื่องมือที่พึ่งพา API เชิงโปรแกรมของ TypeScript

## สิ่งที่เปลี่ยนแปลง

การเปลี่ยนแปลงนี้เพิ่ม API เช่น `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` และ `getExportSymbolOfSymbol` ชนิด interface และ class ยังได้ `getThisType()` และมีการ export `IndexKind` สำหรับการค้นหาชนิด index

ทั้ง API แบบซิงโครนัสและอะซิงโครนัสได้รับการอัปเดต

## เหตุใดจึงสำคัญ

Pull request ของ TypeScript นี้สร้างขึ้นโดยเฉพาะเพื่อเพิ่ม API ที่ `typescript-eslint` ระบุว่ายังขาดอยู่ ทำให้เครื่องมือที่ผสานรวมเข้าถึงข้อมูลจากตัวตรวจสอบและระบบชนิดได้มากขึ้นตามที่เคยคาดหวังจาก API ของ TypeScript

## แหล่งที่มา

อ่าน pull request อย่างเป็นทางการของ TypeScript: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264)
