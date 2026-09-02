# TypeScript 7.0 พร้อมใช้งานแล้ว


**เผยแพร่:** 8 กรกฎาคม 2026

Microsoft ได้เผยแพร่ TypeScript 7.0 ซึ่งเป็นรุ่นเสถียรรุ่นแรกที่สร้างขึ้นบนฐานโค้ด Go แบบเนทีฟใหม่ของโครงการ

## สิ่งที่เปลี่ยนแปลง

TypeScript 7 ใช้โค้ดแบบเนทีฟ การประมวลผลแบบหลายเธรดด้วยหน่วยความจำร่วม และการเพิ่มประสิทธิภาพอื่น ๆ ตามข้อมูลจากทีม TypeScript การ build แบบเต็มใน benchmark ที่เผยแพร่นั้นเร็วกว่า TypeScript 6 ระหว่าง 7.7 ถึง 11.9 เท่า

รุ่นนี้ยังย้ายบริการภาษาไปใช้ Language Server Protocol โดย editor ที่รองรับสามารถใช้พื้นฐานแบบเนทีฟเดียวกันเพื่อให้การโหลดโปรเจกต์ diagnostics, completions และการนำทางทำงานได้เร็วขึ้น

ติดตั้งรุ่นเสถียรจาก npm:

```shell
npm install --save-dev typescript
```

## ความเข้ากันได้

TypeScript 7.0 ไม่มี API สำหรับการเขียนโปรแกรมที่เสถียร เครื่องมือที่ฝัง TypeScript รวมถึง Astro, Vue, MDX, Svelte เวอร์ชันปัจจุบัน และ workflow ของ Angular บางส่วน อาจยังต้องใช้ TypeScript 6 จนกว่า API ใหม่จะพร้อมใช้งาน

ทีม TypeScript คาดว่าจะเปิดตัว API ใหม่ใน TypeScript 7.1 โปรเจกต์ควรตรวจสอบการรองรับของ framework และเครื่องมือก่อนอัปเกรด

## แหล่งข้อมูล

อ่านประกาศอย่างเป็นทางการ: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
