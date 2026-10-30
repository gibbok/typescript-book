---
title: "คอมไพเลอร์ TypeScript แบบเนทีฟเพิ่มการรองรับ WebAssembly แบบทดลอง"
description: "การเปลี่ยนแปลง TypeScript ที่รวมแล้วเพิ่ม WASI WebAssembly แบบทดลองสำหรับ CLI, language server และ JavaScript API ในเบราว์เซอร์"
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**เผยแพร่:** 2026-10-29

เมื่อวันที่ 29 ตุลาคม 2026 Microsoft ได้รวมการรองรับ `wasip1/wasm` แบบทดลองเข้ากับคอมไพเลอร์ TypeScript แบบเนทีฟ การเปลี่ยนแปลงนี้ทำให้คอมไพเลอร์ทำงานบนโฮสต์ WASI ได้ และเพิ่มช่องทางเชื่อมต่อ JavaScript API ที่ใช้งานในเบราว์เซอร์ได้

## สิ่งที่เปลี่ยนแปลง

* `tsc.wasm` ไฟล์เดียวกันสามารถทำงานเป็นคำสั่ง WASI สำหรับ CLI หรือ language server หรือทำงานเป็น reactor สำหรับการเรียก JavaScript API แบบซิงโครนัสและอะซิงโครนัส
* แพ็กเกจอาร์ติแฟกต์ใหม่ `@typescript/typescript-wasip1-wasm` มีคอมไพเลอร์ WebAssembly และไฟล์ไลบรารี ส่วนโฮสต์ `typescript/wasm` มี `instantiateWasm` และ `instantiateWasmSync` โดยทั้งสองแพ็กเกจต้องใช้เวอร์ชันที่ตรงกันทุกประการ
* ส่วนขยาย VS Code for Web เพิ่มจุดเริ่มต้นที่เรียก `tsc.wasm --lsp` การเปลี่ยนแปลงนี้มีการทดสอบ API บน Node.js และการทดสอบเบื้องต้นในเบราว์เซอร์ Chromium

## สถานะการใช้งาน

นี่เป็นการเปลี่ยนแปลงแบบทดลองที่รวมแล้ว ไม่ใช่การประกาศ WebAssembly รุ่นเสถียร ไบนารี โครงสร้างแพ็กเกจ และโฮสต์ `typescript/wasm` อาจเปลี่ยนได้โดยไม่แจ้งล่วงหน้า

## แหล่งข้อมูล

[อ่าน pull request ของ TypeScript ที่รวมแล้ว](https://github.com/microsoft/TypeScript/pull/64174).
