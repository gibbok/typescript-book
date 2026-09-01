# TypeScript 7, Go to Implementation bellek kullanımını iyileştiriyor


**Yayımlandı:** 30 Temmuz 2026

Microsoft, TypeScript'in yerel dil hizmetindeki Go to Implementation özelliği için bellek ölçeklendirme sorununu gideren bir düzeltmeyi birleştirdi.

## Neler değişti

Dil hizmeti, uygulamaları bulmak için genişlik öncelikli bir iş listesi kullanır. Çok sayıda uygulamaya sahip bir arayüz üyesi için program genelinde tekrarlanan aramalar aynı başvuruları yeniden döndürebiliyordu. Bu nedenle tutulan başvurular, sıraya alınan işler ve sonuç grupları ikinci dereceden büyüyebiliyor ve büyük, derinlemesine türlendirilmiş projelerde belleği tüketebiliyordu.

Düzeltme, başvuru düğümlerini iş kuyruğuna eklemeden önce yinelenenleri kaldırıyor ve yinelenen sembol tanımlarını bellekte tutmaktan kaçınıyor. Bir regresyon testi, uygulama sayısını iki katına çıkarmanın ikinci dereceden büyüme yerine yaklaşık olarak doğrusal büyüme oluşturduğunu denetliyor.

## Neden önemli

Go to Implementation artık aynı dahili başvuruları tekrar tekrar bellekte tutmadan bu örüntüyü işleyebilir. Düzenleyicinin son yanıtında yinelenenler zaten kaldırılıyordu; bu nedenle değişiklik, bu yanıtı üretmek için gereken gizli belleği ve işi hedefliyor.

## Kullanılabilirlik

Değişiklik, TypeScript 7.0 sürümünden sonra yerel TypeScript kod tabanına birleştirildi. Kaynak, düzeltmeyi içeren kararlı bir npm sürümü belirtmediğinden kullanıcılar bu düzeltmeye güvenmeden önce yüklü sürümlerinin sürüm notlarını kontrol etmelidir.

## Kaynak

Resmî değişikliği okuyun: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
