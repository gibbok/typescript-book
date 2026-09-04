---
title: TypeScript 7, dosya değişikliklerinden sonra yapılandırma tanılamalarını yeniliyor
description: Yerel dil hizmeti artık izlenen yapılandırma dosyaları değiştikten sonra tsconfig.json ve jsconfig.json hatalarını yeniden yayımlıyor.
lastUpdated: 2026-07-30
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Yayımlandı:** 30 Temmuz 2026

Microsoft, izlenen bir `tsconfig.json` veya `jsconfig.json` dosyası değiştikten sonra TypeScript'in yerel dil hizmetindeki yapılandırma dosyası tanılamalarını yenileyen bir düzeltmeyi birleştirdi.

## Neler değişti

Yapılandırma dosyası tanılamaları, bir dil hizmeti anlık görüntüsü güncellemesi sırasında yayımlanır. Önceden, izlenen bir yapılandırma dosyasındaki değişiklik tanılamaların yenilenmesini zamanlıyor ancak anlık görüntü güncellemesini zamanlamıyordu. Bu nedenle yeni yapılandırma hataları, düzenleyici anlık görüntüyü güncelleyen başka bir istekte bulunana kadar güncelliğini yitirmiş olarak kalabiliyordu.

Dil hizmeti artık izlenen yapılandırma dosyalarındaki değişiklikleri algılıyor ve debounce edilmiş bir anlık görüntü güncellemesi zamanlıyor. Böylece gönderilen tanılamalar, düzenleyiciden gelecek bir takip isteğine gerek kalmadan yeniden yayımlanıyor.

## Neden önemli

Bir düzenleyici veya harici araç, izlenen bir `tsconfig.json` ya da `jsconfig.json` dosyasını değiştirdiğinde yerel dil hizmeti, güncellenmiş yapılandırma hatalarını yalnızca dosya izleyici olayına dayanarak bildirebilir. Bir regresyon testi, geçersiz bir `target` değeriyle bu davranışı doğruluyor.

## Kullanılabilirlik

Değişiklik, TypeScript 7.0 sürümünden sonra yerel TypeScript kod tabanına birleştirildi. Kaynak, değişikliği içeren kararlı bir npm sürümü belirtmediğinden düzeltmeye güvenmeden önce yüklü sürümün sürüm notlarını kontrol edin.

## Kaynak

Resmî değişikliği okuyun: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
