# TypeScript 7, çalışma alanı sembolü araması için kapsam ekliyor


**Yayımlandı:** 7 Ağustos 2026

Microsoft, TypeScript'in yerel dil hizmetine çalışma alanı sembolü arama kapsamı ekleyen bir değişikliği birleştirdi.

## Neler değişti

Yeni `workspaceSymbols.scope` tercihinin iki değeri vardır. `allOpenProjects` varsayılan değerdir ve tüm açık projelerdeki sembolleri arar. `currentProject`, aramayı sağlanan belgeyi içeren projelerle sınırlar.

Yerel VS Code uzantısı artık `workspace/symbol` isteklerine desteklenen bir TypeScript veya JavaScript belgesi ekliyor. Etkin belgeye öncelik veriyor; aksi durumda açık ve desteklenen bir belgeyi kullanıyor. Dil hizmeti bu belgeyi yalnızca `workspaceSymbols.scope` değeri `currentProject` olduğunda kullanır; aksi durumda tüm açık projelerde aramayı sürdürür.

## Neden önemli

Benzer adlara sahip semboller içeren birden fazla projenin bulunduğu bir çalışma alanında `currentProject`, sonuç kümesini ilgili projeyle sınırlayabilir. Varsayılan değer mevcut davranışı koruduğu için değişikliğin kullanılması isteğe bağlıdır.

## Kullanılabilirlik

Değişiklik, TypeScript 7.0'dan sonra yerel TypeScript kod tabanına birleştirildi. Kaynak, değişikliği içeren kararlı bir npm sürümü belirtmediğinden bu ayara güvenmeden önce yüklü sürümün sürüm notlarını kontrol edin.
