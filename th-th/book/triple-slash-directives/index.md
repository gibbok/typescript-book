# ไดเรกทีฟ Triple-Slash



ไดเรกทีฟ triple-slash เป็นคอมเมนต์พิเศษที่ให้คำสั่งแก่คอมไพเลอร์เกี่ยวกับวิธีประมวลผลไฟล์ ไดเรกทีฟเหล่านี้ขึ้นต้นด้วยเครื่องหมายทับสามตัวติดกัน (`///`) และโดยทั่วไปวางไว้ที่ส่วนบนของไฟล์ TypeScript โดยไม่มีผลต่อพฤติกรรมขณะรันไทม์

ไดเรกทีฟ triple-slash ใช้สำหรับอ้างอิง dependency ภายนอก ระบุพฤติกรรมการโหลดโมดูล เปิดหรือปิดฟีเจอร์บางอย่างของคอมไพเลอร์ และอื่น ๆ ตัวอย่างบางส่วนมีดังนี้:

การอ้างอิงไฟล์ declaration:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

การระบุรูปแบบโมดูล:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

การเปิดใช้ตัวเลือกของคอมไพเลอร์ โดยตัวอย่างต่อไปนี้เป็นโหมด strict:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

