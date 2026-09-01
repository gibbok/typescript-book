# TypeScript 7 yerel API'si emit metotları ekliyor


**Yayımlandı:** 24 Temmuz 2026

Yerel TypeScript kod tabanı, JavaScript veya bildirim çıktısı oluşturması gereken araçlar için programatik emit API'leri ekledi.

## Neler değişti

Birleştirilen API, farklı çıktı ve seçim davranışlarına sahip dört emit yolu sağlar.

* `program.emit(emitOnly?: EmitOnly)` yapılandırılmış bir sanal dosya sistemi dâhil olmak üzere programın tamamını dosya sistemine emit eder ve `noEmit` ile `noEmitOnError` gibi emit işlemini engelleyen seçeneklere uyar.
* `program.emitToString(emitOnly?: EmitOnly)` programın tamamını bellek içi dize sonuçlarına emit eder ve emit işlemini engelleyen seçeneklere yine uyar.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` seçilen dosyalar için bellek içi JavaScript çıktısı döndürür ve emit işlemini engelleyen seçenekleri atlar.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` seçilen dosyalar için karşılık gelen bildirim çıktısını sağlar.

Bu, API kullanıcılarına programın tamamını normal biçimde emit etme ile hedefli bellek içi çıktı alma arasında ayrı seçenekler sunar.

## Kullanılabilirlik

Değişiklik, 24 Temmuz 2026'da yerel TypeScript kod tabanına birleştirildi. Kaynak, bu API'leri içeren kararlı bir npm sürümü belirtmediğinden araçlar kullandıkları TypeScript sürümündeki desteği doğrulamalıdır.

## Kaynak

Resmî pull request'i okuyun: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
