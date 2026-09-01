# TypeScript 7.0 sürüm adayı duyuruldu


**Yayımlandı:** 18 Haziran 2026

Microsoft, kararlı TypeScript 7 sürümünden önceki son önizleme olarak TypeScript 7.0 sürüm adayını yayımladı.

## Neler değişti

Sürüm adayı, TypeScript'i yeni Go tabanlı derleyicisine ve dil hizmetine taşıdı. Tür denetimi mantığı, mevcut anlam bilimini korurken yerel kod ve paylaşımlı bellek paralelliğiyle performansı artırmak için TypeScript 6'dan taşındı.

TypeScript 7, paralel tür denetimi ve proje başvurusu derlemeleri ekledi. `--checkers` seçeneği tür denetimi çalışanlarının sayısını, `--builders` ise proje başvurusu derleyicilerinin sayısını denetler.

Duyuru sırasında sürüm adayı npm'den şu şekilde kurulabiliyordu:

```shell
npm install --save-dev typescript@rc
```

## Uyumluluk

Sürüm adayı kararlı bir programatik API içermiyordu. TypeScript ekibi, TypeScript 6 API'sini gerektiren araçların yeni derleyiciyle birlikte çalışabilmesi için `@typescript/typescript6` uyumluluk paketini sağladı.

Sürüm adayı ayrıca TypeScript 6 varsayılanlarını benimsedi ve TypeScript 6'da kullanımdan kaldırılan seçenekleri hata olarak değerlendirdi. Ekiplere TypeScript 7'yi değerlendirmeden önce TypeScript 6'ya geçmeleri önerildi.

## Kaynak

Resmî duyuruyu okuyun: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
