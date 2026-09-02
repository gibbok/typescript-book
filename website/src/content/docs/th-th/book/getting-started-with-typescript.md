---
title: เริ่มต้นใช้งาน TypeScript
sidebar:
  order: 9
  label: 9. เริ่มต้นใช้งาน TypeScript
---


### การติดตั้ง

Visual Studio Code รองรับภาษา TypeScript ได้อย่างยอดเยี่ยม แต่ไม่ได้รวมคอมไพเลอร์ TypeScript มาด้วย คุณสามารถติดตั้งคอมไพเลอร์ TypeScript ผ่าน package manager เช่น npm หรือ yarn:

```shell
npm install typescript --save-dev
```

หรือ

```shell
yarn add typescript --dev
```

อย่าลืม commit lockfile ที่สร้างขึ้น เพื่อให้สมาชิกทุกคนในทีมใช้ TypeScript รุ่นเดียวกัน

ใช้คำสั่งต่อไปนี้เพื่อรันคอมไพเลอร์ TypeScript

```shell
npx tsc
```

หรือ

```shell
yarn tsc
```

แนะนำให้ติดตั้ง TypeScript แยกในแต่ละโปรเจกต์แทนการติดตั้งแบบ global เพราะทำให้กระบวนการ build คาดการณ์ได้มากกว่า อย่างไรก็ตาม สำหรับการใช้งานเพียงครั้งเดียว คุณสามารถใช้คำสั่งต่อไปนี้:

```shell
npx tsc
```

หรือติดตั้งแบบ global:

```shell
npm install -g typescript
```

หากใช้ Microsoft Visual Studio คุณสามารถรับ TypeScript เป็นแพ็กเกจ NuGet สำหรับโปรเจกต์ MSBuild ได้ โดยรันคำสั่งต่อไปนี้ใน NuGet Package Manager Console:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

ระหว่างการติดตั้ง TypeScript จะติดตั้ง executable สองรายการ ได้แก่ "tsc" ซึ่งเป็นคอมไพเลอร์ TypeScript และ "tsserver" ซึ่งเป็นเซิร์ฟเวอร์ TypeScript แบบ standalone เซิร์ฟเวอร์ standalone ประกอบด้วยคอมไพเลอร์และบริการภาษาที่ editor และ IDE นำไปใช้เพื่อเติมโค้ดอย่างชาญฉลาดได้

นอกจากนี้ ยังมี transpiler หลายตัวที่เข้ากันได้กับ TypeScript เช่น Babel (ผ่านปลั๊กอิน) หรือ swc ซึ่งใช้แปลงโค้ด TypeScript เป็นภาษาหรือรุ่นเป้าหมายอื่นได้

TypeScript 7.0 ถูกเขียนขึ้นใหม่ด้วย Go ให้เป็นการทำงานแบบ native ของคอมไพเลอร์และบริการภาษา โดยใช้ multithreading แบบ shared-memory และการปรับแต่งอื่น ๆ เพื่อให้ full build และคุณสมบัติใน editor เร็วขึ้น ลดเวลารอผลตอบกลับระหว่างการพัฒนา

คุณสมบัติด้านประสิทธิภาพบางอย่างของ TypeScript 7.0 สามารถปรับแต่งได้ การตรวจสอบชนิดข้อมูลสามารถทำงานใน worker แบบขนานด้วย `--checkers` จำนวน worker ที่มากขึ้นช่วยเร่งโปรเจกต์ขนาดใหญ่แต่ใช้หน่วยความจำมากขึ้น โหมด `--watch` ที่สร้างใหม่ช่วยปรับปรุงการเฝ้าดูไฟล์ข้ามแพลตฟอร์ม TypeScript 7.0 ยังไม่มี compiler API (ณ เดือนกรกฎาคม 2026) ดังนั้นเครื่องมือที่ยังต้องใช้ API ของ TypeScript 6.0 จึงทำงานควบคู่กับ TypeScript 7.0 ได้โดยใช้ `@typescript/typescript6` หรือ alias ของ npm

### การกำหนดค่า

สามารถกำหนดค่า TypeScript ด้วยตัวเลือก CLI ของ tsc หรือใช้ไฟล์กำหนดค่าเฉพาะชื่อ tsconfig.json ซึ่งวางไว้ที่ root ของโปรเจกต์

ใช้คำสั่งต่อไปนี้เพื่อสร้างไฟล์ tsconfig.json ที่ใส่ค่าที่แนะนำไว้ล่วงหน้า:

```shell
tsc --init
```

เมื่อรันคำสั่ง `tsc` ในเครื่อง TypeScript จะคอมไพล์โค้ดโดยใช้การกำหนดค่าจากไฟล์ tsconfig.json ที่อยู่ใกล้ที่สุด

ต่อไปนี้คือตัวอย่างคำสั่ง CLI ที่ทำงานด้วยค่าเริ่มต้น:

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### ไฟล์กำหนดค่า TypeScript

ไฟล์ tsconfig.json ใช้กำหนดค่า TypeScript Compiler (tsc) โดยปกติจะเพิ่มไว้ที่ root ของโปรเจกต์ร่วมกับไฟล์ `package.json`

หมายเหตุ:

* tsconfig.json รองรับ comment แม้จะอยู่ในรูปแบบ json
* แนะนำให้ใช้ไฟล์กำหนดค่านี้แทนตัวเลือก command-line

เอกสารฉบับสมบูรณ์และ schema อยู่ที่ลิงก์ต่อไปนี้:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

ต่อไปนี้คือรายการการกำหนดค่าที่ใช้บ่อยและเป็นประโยชน์:

#### target

พร็อพเพอร์ตี "target" ใช้ระบุรุ่น ECMAScript ที่โค้ด TypeScript ควรถูก emit/compile ไปเป็น สำหรับเบราว์เซอร์สมัยใหม่ ES6 เป็นตัวเลือกที่ดี หมายเหตุ: การรองรับ ES5 ถูกประกาศเลิกใช้ใน TypeScript 6.0 และไม่รองรับอีกต่อไปใน TypeScript 7.0

#### lib

พร็อพเพอร์ตี "lib" ใช้ระบุไฟล์ไลบรารีที่จะรวมไว้ตอนคอมไพล์ TypeScript จะรวม API สำหรับคุณสมบัติที่ระบุในพร็อพเพอร์ตี "target" โดยอัตโนมัติ แต่สามารถละเว้นหรือเลือกไลบรารีเฉพาะตามความต้องการได้ เช่น หากทำงานกับโปรเจกต์เซิร์ฟเวอร์ คุณอาจไม่รวมไลบรารี "DOM" ซึ่งมีประโยชน์เฉพาะในสภาพแวดล้อมเบราว์เซอร์

#### strict

ตัวเลือก "strict" เพิ่มความปลอดภัยด้านชนิดข้อมูลด้วยการเปิดใช้การตรวจสอบที่เข้มงวดยิ่งขึ้น โดยเปิดใช้เป็นค่าเริ่มต้นตั้งแต่ TypeScript 6.0 มิฉะนั้นควรกำหนดเป็น true อย่างชัดเจนใน tsconfig.json การเปิดใช้ "strict" ทำให้ TypeScript:

* Emit โค้ดโดยใช้ "use strict" สำหรับ source file แต่ละไฟล์
* พิจารณา "null" และ "undefined" ในกระบวนการตรวจสอบชนิดข้อมูล
* ปิดการใช้ชนิดข้อมูล "any" เมื่อไม่มีคำอธิบายชนิดข้อมูล
* แจ้งข้อผิดพลาดเมื่อใช้นิพจน์ "this" ซึ่งมิฉะนั้นจะหมายถึงชนิดข้อมูล "any"

#### module

พร็อพเพอร์ตี "module" กำหนดระบบโมดูลที่โปรแกรมหลังคอมไพล์รองรับ ที่ runtime จะใช้ module loader เพื่อค้นหาและรัน dependency ตามระบบโมดูลที่ระบุ

module loader ที่ใช้กันมากที่สุดใน JavaScript ได้แก่ CommonJS ของ Node.js สำหรับแอปพลิเคชันฝั่งเซิร์ฟเวอร์ และ RequireJS สำหรับโมดูล AMD ในเว็บแอปพลิเคชันบนเบราว์เซอร์ TypeScript สามารถ emit โค้ดสำหรับระบบโมดูลหลายแบบ รวมถึง UMD, System, ESNext, ES2015/ES6 และ ES2020 ควรเลือกระบบโมดูลตามสภาพแวดล้อมเป้าหมายและกลไกโหลดโมดูลที่มีในสภาพแวดล้อมนั้น

หมายเหตุ: การรองรับระบบโมดูลรุ่นเก่า (AMD, UMD, SystemJS) ถูกประกาศเลิกใช้ใน TypeScript 6.0 และไม่รองรับอีกต่อไปใน TypeScript 7.0

#### moduleResolution

พร็อพเพอร์ตี "moduleResolution" ระบุกลยุทธ์การ resolve โมดูล ใช้ "nodenext" หรือ "bundler" สำหรับโค้ด TypeScript สมัยใหม่ ส่วนกลยุทธ์ "classic" ใช้เฉพาะกับ TypeScript รุ่นเก่า (ก่อน 1.6)

#### esModuleInterop

พร็อพเพอร์ตี "esModuleInterop" อนุญาต default import จากโมดูล CommonJS ที่ไม่ได้ export ด้วยพร็อพเพอร์ตี "default" โดยพร็อพเพอร์ตีนี้จะมี shim เพื่อรับรองความเข้ากันได้ใน JavaScript ที่ emit ออกมา หลังเปิดใช้ตัวเลือกนี้ เราสามารถใช้ `import MyLibrary from "my-library"` แทน `import * as MyLibrary from "my-library"`

เดิมที "esModuleInterop" เป็นตัวเลือกแบบ opt-in เพื่อหลีกเลี่ยง breaking change แต่ได้รับการแนะนำให้ใช้เป็นค่าเริ่มต้นมานานแล้ว การปิดใช้อาจทำให้เกิดปัญหา runtime ที่สังเกตได้ยากเมื่อใช้ CommonJS ร่วมกับ ESM หมายเหตุ: ตั้งแต่ TypeScript 6.0 เป็นต้นไป พฤติกรรม interop ที่ปลอดภัยกว่านี้จะเปิดใช้อยู่เสมอ

ใน TypeScript 6.0 ตัวเลือกการกำหนดค่าและรูปแบบไวยากรณ์รุ่นเก่าบางรายการถูกประกาศเลิกใช้หรืออยู่ในช่วงเปลี่ยนผ่านจากพฤติกรรมเดิม ส่วนใน TypeScript 7.0 รายการเหล่านี้กลายเป็น hard error หรือไม่มีผลใด ๆ

รายการที่เลิกใช้และกลายเป็น hard error พร้อมพฤติกรรมแบบ no-op ได้แก่:

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* disabling `esModuleInterop` or `allowSyntheticDefaultImports`
* disabling `alwaysStrict`
* `module` keyword in namespace declarations
* `asserts` on imports
* `/// <reference no-default-lib />` under `skipDefaultLibCheck`
* CLI file paths with a local `tsconfig.json` unless `--ignoreConfig` is used

#### jsx

พร็อพเพอร์ตี "jsx" ใช้เฉพาะกับไฟล์ .tsx ใน ReactJS และควบคุมวิธีคอมไพล์โครงสร้าง JSX เป็น JavaScript ตัวเลือกที่พบบ่อยคือ "preserve" ซึ่งจะคอมไพล์เป็นไฟล์ .jsx โดยคง JSX ไว้ไม่เปลี่ยนแปลง เพื่อส่งต่อให้เครื่องมืออื่น เช่น Babel แปลงต่อได้

#### skipLibCheck

พร็อพเพอร์ตี "skipLibCheck" ป้องกันไม่ให้ TypeScript ตรวจสอบชนิดข้อมูลของแพ็กเกจ third-party ที่ import มาทั้งหมด ช่วยลดเวลาคอมไพล์ของโปรเจกต์ โดย TypeScript ยังตรวจสอบโค้ดของคุณเทียบกับคำจำกัดความชนิดข้อมูลที่แพ็กเกจเหล่านี้มีให้

#### files

พร็อพเพอร์ตี "files" ระบุรายการไฟล์ที่คอมไพเลอร์ต้องรวมไว้ในโปรแกรมเสมอ

#### include

<!-- markdownlint-disable MD049 -->
พร็อพเพอร์ตี "include" ระบุรายการไฟล์ที่ต้องการรวมให้คอมไพเลอร์ พร็อพเพอร์ตีนี้รองรับรูปแบบคล้าย glob เช่น "\*_" สำหรับ subdirectory ใด ๆ, "_" สำหรับชื่อไฟล์ใด ๆ และ "?" สำหรับอักขระที่ไม่บังคับ
<!-- markdownlint-enable MD049 -->

#### exclude

พร็อพเพอร์ตี "exclude" ระบุรายการไฟล์ที่คอมไพเลอร์ไม่ควรรวมในการคอมไพล์ ซึ่งอาจเป็นไฟล์อย่าง "node_modules" หรือไฟล์ทดสอบ
หมายเหตุ: tsconfig.json อนุญาตให้มี comment ได้

### importHelpers

TypeScript ใช้โค้ด helper เมื่อสร้างโค้ดสำหรับคุณสมบัติ JavaScript ขั้นสูงหรือที่ถูก down-level บางอย่าง โดยค่าเริ่มต้น helper เหล่านี้จะถูกทำซ้ำในไฟล์ที่ใช้งาน ตัวเลือก `importHelpers` จะ import helper เหล่านี้จากโมดูล `tslib` แทน ทำให้ผลลัพธ์ JavaScript มีประสิทธิภาพยิ่งขึ้น

### คำแนะนำในการย้ายไปใช้ TypeScript

สำหรับโครงการขนาดใหญ่ ขอแนะนำให้ทยอยเปลี่ยนผ่าน โดยในช่วงแรกให้โค้ด TypeScript และ JavaScript ทำงานร่วมกัน มีเพียงโครงการขนาดเล็กเท่านั้นที่สามารถย้ายไปใช้ TypeScript ได้ในครั้งเดียว

ขั้นตอนแรกของการเปลี่ยนผ่านนี้คือการนำ TypeScript เข้าสู่กระบวนการ build chain ซึ่งทำได้โดยใช้ตัวเลือกคอมไพเลอร์ "allowJs" ที่อนุญาตให้ไฟล์ .ts และ .tsx อยู่ร่วมกับไฟล์ JavaScript ที่มีอยู่ได้ เนื่องจาก TypeScript จะใช้ชนิด "any" เป็นค่าเริ่มต้นสำหรับตัวแปรเมื่อไม่สามารถอนุมานชนิดจากไฟล์ JavaScript ได้ จึงขอแนะนำให้ปิดใช้งาน "noImplicitAny" ในตัวเลือกคอมไพเลอร์ของคุณในช่วงเริ่มต้นของการย้าย

ขั้นตอนที่สองคือตรวจสอบให้แน่ใจว่าการทดสอบ JavaScript ของคุณทำงานร่วมกับไฟล์ TypeScript ได้ เพื่อให้สามารถเรียกใช้การทดสอบขณะแปลงแต่ละโมดูล หากคุณใช้ Jest ให้พิจารณาใช้ `ts-jest` ซึ่งช่วยให้คุณทดสอบโครงการ TypeScript ด้วย Jest ได้

ขั้นตอนที่สามคือเพิ่มการประกาศชนิดสำหรับไลบรารีของบุคคลที่สามลงในโครงการ การประกาศเหล่านี้อาจรวมมากับไลบรารีหรือหาได้จาก DefinitelyTyped คุณสามารถค้นหาได้ที่ [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) และติดตั้งโดยใช้คำสั่งต่อไปนี้:

```shell
npm install --save-dev @types/package-name
```

หรือ

```shell
yarn add --dev @types/package-name
```

ขั้นตอนที่สี่คือย้ายทีละโมดูลด้วยแนวทางจากล่างขึ้นบน โดยดำเนินตามกราฟการขึ้นต่อกัน (Dependency Graph) และเริ่มจากโหนดใบ แนวคิดคือเริ่มแปลงโมดูลที่ไม่ได้ขึ้นต่อโมดูลอื่น คุณสามารถใช้เครื่องมือ "madge" เพื่อแสดงกราฟการขึ้นต่อกันเป็นภาพได้

โมดูลที่เหมาะสำหรับการแปลงในระยะแรก ได้แก่ ฟังก์ชันอรรถประโยชน์และโค้ดที่เกี่ยวข้องกับ API ภายนอกหรือข้อกำหนดจำเพาะ คุณสามารถสร้างนิยามชนิด TypeScript จากสัญญา Swagger, สคีมา GraphQL หรือ JSON โดยอัตโนมัติเพื่อนำมาใช้ในโครงการได้

เมื่อไม่มีข้อกำหนดจำเพาะหรือสคีมาที่เป็นทางการ คุณสามารถสร้างชนิดจากข้อมูลดิบ เช่น JSON ที่เซิร์ฟเวอร์ส่งกลับมา อย่างไรก็ตาม ขอแนะนำให้สร้างชนิดจากข้อกำหนดจำเพาะแทนข้อมูล เพื่อหลีกเลี่ยงการตกหล่นกรณีขอบ

ระหว่างการย้าย ให้งดการปรับโครงสร้างโค้ดและมุ่งเน้นเฉพาะการเพิ่มชนิดให้กับโมดูลของคุณ

ขั้นตอนที่ห้าคือเปิดใช้งาน "noImplicitAny" ซึ่งจะบังคับให้ชนิดทั้งหมดเป็นที่ทราบและได้รับการกำหนดไว้ เพื่อมอบประสบการณ์การใช้ TypeScript ที่ดียิ่งขึ้นแก่โครงการของคุณ

ระหว่างการย้าย คุณสามารถใช้ไดเรกทีฟ `@ts-check` ซึ่งเปิดใช้งานการตรวจสอบชนิดของ TypeScript ในไฟล์ JavaScript ไดเรกทีฟนี้ให้การตรวจสอบชนิดแบบไม่เข้มงวด และสามารถใช้ในช่วงแรกเพื่อระบุปัญหาในไฟล์ JavaScript เมื่อไฟล์มี `@ts-check` TypeScript จะพยายามอนุมานนิยามโดยใช้ความคิดเห็นในรูปแบบ JSDoc อย่างไรก็ตาม ควรพิจารณาใช้คำอธิบายประกอบ JSDoc เฉพาะในช่วงเริ่มต้นของการย้ายเท่านั้น

ควรคงค่าเริ่มต้นของ `noEmitOnError` ใน tsconfig.json ไว้เป็น false ซึ่งจะช่วยให้คุณส่งออกซอร์สโค้ด JavaScript ได้แม้ว่าจะมีการรายงานข้อผิดพลาด

