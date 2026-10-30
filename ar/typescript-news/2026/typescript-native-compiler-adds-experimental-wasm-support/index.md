# مترجم TypeScript الأصلي يضيف دعماً تجريبياً لـ WebAssembly


**تاريخ النشر:** 2026-10-29

دمجت Microsoft في 29 أكتوبر 2026 دعماً تجريبياً لـ `wasip1/wasm` في مترجم TypeScript الأصلي. يتيح التغيير تشغيل المترجم في بيئات WASI ويوفر وسيلة اتصال لواجهة JavaScript API يمكن استخدامها في المتصفح.

## ما الذي تغيّر

* يمكن تشغيل ملف `tsc.wasm` نفسه كأمر WASI لسطر الأوامر أو خادم اللغة، أو كـ reactor لاستدعاءات JavaScript API المتزامنة وغير المتزامنة.
* تحتوي حزمة الملفات الجديدة `@typescript/typescript-wasip1-wasm` على مترجم WebAssembly وملفات المكتبات. يوفر المضيف `typescript/wasm` الدالتين `instantiateWasm` و`instantiateWasmSync`؛ ويجب أن تستخدم الحزمتان الإصدار نفسه تماماً.
* أضيفت نقطة دخول إلى امتداد VS Code for Web تشغّل `tsc.wasm --lsp`. يشمل التغيير اختبارات API في Node.js واختبارات أولية في متصفح Chromium.

## التوفّر

هذا تغيير تجريبي مدمج، وليس إعلاناً عن إصدار WebAssembly مستقر. قد يتغير الملف التنفيذي وبنية الحزمة والمضيف `typescript/wasm` دون إشعار مسبق.

## المصدر

[قراءة طلب السحب المدمج في TypeScript](https://github.com/microsoft/TypeScript/pull/64174).
