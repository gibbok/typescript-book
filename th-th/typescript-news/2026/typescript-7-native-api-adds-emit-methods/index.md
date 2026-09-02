# API แบบเนทีฟของ TypeScript 7 เพิ่มเมธอด emit


**เผยแพร่:** 24 กรกฎาคม 2026

ฐานโค้ด TypeScript แบบเนทีฟได้เพิ่ม API สำหรับสั่ง emit จากโค้ดให้กับเครื่องมือที่ต้องสร้างเอาต์พุต JavaScript หรือ declaration

## สิ่งที่เปลี่ยนแปลง

API ที่ merge แล้วมีวิธี emit สี่แบบ ซึ่งมีพฤติกรรมการเลือกและเอาต์พุตแตกต่างกัน

* `program.emit(emitOnly?: EmitOnly)` emit ทั้งโปรแกรมไปยังระบบไฟล์ รวมถึงระบบไฟล์เสมือนที่กำหนดค่าไว้ และเคารพตัวเลือกที่ปิดกั้นการ emit เช่น `noEmit` และ `noEmitOnError`
* `program.emitToString(emitOnly?: EmitOnly)` emit ทั้งโปรแกรมเป็นผลลัพธ์ string ในหน่วยความจำ และเคารพตัวเลือกที่ปิดกั้นการ emit เช่นกัน
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` ส่งคืนเอาต์พุต JavaScript ในหน่วยความจำสำหรับไฟล์ที่เลือก และข้ามตัวเลือกที่ปิดกั้นการ emit
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` ให้เอาต์พุต declaration ที่สอดคล้องกันสำหรับไฟล์ที่เลือก

สิ่งนี้ทำให้ผู้ใช้ API มีตัวเลือกแยกระหว่างการ emit ทั้งโปรแกรมตามปกติ กับเอาต์พุตแบบเจาะจงเป้าหมายในหน่วยความจำ

## ความพร้อมใช้งาน

การเปลี่ยนแปลงนี้ถูก merge เข้าสู่ฐานโค้ด TypeScript แบบเนทีฟเมื่อวันที่ 24 กรกฎาคม 2026 แหล่งข้อมูลไม่ได้ระบุเวอร์ชัน npm แบบเสถียรที่มี API เหล่านี้ ดังนั้นเครื่องมือควรตรวจสอบการรองรับในเวอร์ชัน TypeScript ที่ใช้งาน

## แหล่งข้อมูล

อ่าน pull request อย่างเป็นทางการ: [API emit](https://github.com/microsoft/typescript-go/pull/4699)
