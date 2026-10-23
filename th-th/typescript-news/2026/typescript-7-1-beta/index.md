# TypeScript 7.1 Beta เพิ่ม API แบบแยกโมดูลและรองรับ ES2026


**เผยแพร่:** 20 ตุลาคม 2026

Microsoft เปิดตัว TypeScript 7.1 Beta พร้อม API คอมไพเลอร์แบบเนทีฟใหม่และการรองรับคุณสมบัติ JavaScript ทดลองใช้รุ่นเบต้าได้ด้วยคำสั่ง:

```shell
npm install -D typescript@beta
```

## สิ่งที่เปลี่ยนแปลง

* `--target es2026` และ `--lib es2026` รองรับเป็นตัวเลือกที่เสถียรแล้ว พร้อมคำประกาศชนิดของไลบรารีมาตรฐานที่อัปเดต
* จุดเข้าใช้งาน API ใหม่ ได้แก่ `typescript/sync`, `typescript/async`, `typescript/fs` และ `typescript/ast` โดยต้องคืนทรัพยากรของออบเจ็กต์ `API` และ `Program` เช่น ใช้ `using`
* การนำเข้าในเฟสต้นฉบับ (`import source` และ `import.source()`) รองรับออบเจ็กต์ต้นฉบับโมดูล รวมถึง WebAssembly เมื่อกำหนด `--module` และ `esnext` อย่างเหมาะสม
* Content mapper ทำให้ TypeScript เข้าถึงโค้ดที่ฝังอยู่ในไฟล์ เช่น `.vue` และ `.svelte` การเรียกผ่านบรรทัดคำสั่งต้องใช้ `--runExternalCode`
* ผลทดสอบที่ Microsoft เผยแพร่ระบุว่าการบิลด์เร็วขึ้นและใช้หน่วยความจำน้อยกว่า TypeScript 7.0

## สถานะการใช้งาน

นี่คือรุ่นเบต้า ไม่ใช่รุ่นเสถียร ควรตรวจสอบความเข้ากันได้ของเฟรมเวิร์กและเครื่องมือก่อนอัปเกรด การรองรับ import attribute ใน ambient module มีบทความแยกต่างหากแล้ว

## แหล่งข้อมูล

อ่านประกาศอย่างเป็นทางการ: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
