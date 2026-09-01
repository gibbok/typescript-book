---
title: เครื่องมือแบบเนทีฟของ TypeScript 7 กำลังถูกรวมเข้าด้วยกัน
description: ผู้ดูแล TypeScript ชี้แจงว่าจะเลิกใช้ชื่อ tsgo ฐานโค้ดแบบเนทีฟจะกลับไปยัง repository หลักของ TypeScript และส่วนขยาย VS Code แบบเนทีฟจะถูกรวมไว้ในแพ็กเกจ
lastUpdated: 2026-07-27
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-27'
---

**เผยแพร่:** 27 กรกฎาคม 2026

ผู้ดูแล TypeScript ได้ชี้แจงวิธีรวมเครื่องมือ TypeScript 7 แบบเนทีฟหลังการเผยแพร่รุ่นเสถียร

## สิ่งที่เปลี่ยนแปลง

Ryan Cavanaugh ยืนยันว่าแทบจะเลิกใช้ชื่อ `tsgo` แล้ว คาดว่าฐานโค้ดแบบเนทีฟจะถูกย้ายกลับไปยัง repository หลัก `microsoft/TypeScript` เพื่อให้โครงการกลับมามีรายการ issue ที่ค้างอยู่ชุดเดียวกัน

Jake Bailey ยังชี้แจงว่าไม่มีแผนเลิกใช้งานส่วนขยาย VS Code แบบเนทีฟ แต่คาดว่าส่วนขยายนี้จะถูกรวมไว้ในแพ็กเกจในอนาคตอันใกล้ คล้ายกับส่วนขยาย JavaScript debugger

สำหรับนักพัฒนา นี่หมายความว่าชื่อของรุ่น preview และ repository ที่แยกออกมาเป็นส่วนชั่วคราวของการย้ายไปยัง TypeScript 7 ไม่ใช่โครงสร้างโครงการระยะยาวที่ตั้งใจไว้

## แหล่งข้อมูล

อ่านการอภิปรายของผู้ดูแล: [Now that TypeScript 7.0 has been released, what will happen to typescript-go?](https://github.com/microsoft/typescript-go/discussions/4576)
