# TypeScript yerel derleyicisi tür denetleyici optimizasyonlarıyla bellek kullanımını azaltıyor


**Yayımlandı:** 14 Ekim 2026

Microsoft, TypeScript'in yerel derleyicisine çeşitli bellek optimizasyonları ekledi. Bu değişiklikler TypeScript sözdizimini değiştirmeden tür denetleyicisinin iç veri yapılarının tuttuğu belleği azaltıyor.

## Neler değişti

* Türlü arena parçaları artık sabit 256 nesne yerine yaklaşık 512 baytı hedefliyor. Değişikliğin VS Code kıyaslamasında tutulan heap belleği %8.54, çöp toplayıcının taraması %10.44 azaldı; ayırma olayları ise %13.91 arttı.
* İsteğe bağlı imzalar, indeks bilgileri ve düğüm oluşturucu önbellekleri `StructuredType` kayıtlarının dışına taşınarak kayıt boyutu 144 bayttan 88 bayta indirildi.
* Kararlı düğüm kimlikleri mevcut olduğunda çözümlenen tür düğümleri ve imzalar sayfalı düğüm bağlantı depolarını, diğer kimlikler için yedek olarak bir map kullanıyor.

## Kullanılabilirlik

Değişiklikler 14 Ekim 2026'da birleştirildi. Kaynak pull request'ler bunları içeren kararlı bir npm sürümü belirtmiyor. Kıyaslama sonuçları yalnızca ölçülen değişiklik ve iş yükü için geçerlidir.

## Kaynak

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
