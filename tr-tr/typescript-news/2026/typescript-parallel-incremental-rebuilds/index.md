# TypeScript paralel denetimlerle artımlı derlemeleri hızlandırıyor


Derleyiciye eklenen değişiklik, çok sayıda dosyanın içe aktardığı modüllerdeki düzenlemelerden etkilenen dosyaların imza denetimini paralelleştiriyor. Bu aşama önceden sıralı çalışıyordu.

## Neler değişti

Geliştiricinin testinde, yalnızca yorum değişikliğinden sonraki derleme 32 çekirdekli Linux'ta **3,4 saniyeden 1,5 saniyeye** düştü. Bir n8n paketinde benzer süre **5,4 saniyeden 4,5 saniyeye** indi. Bunlar iş yüküne özgü sonuçlardır.

## Performans ve sınırlar

İşlem `GOMAXPROCS` ile sınırlandırılır; kazanç, kullanılabilir denetleyicilere ve bağımlılıklara bağlıdır. Başvuran dosyaları dolaşmayan `isolatedModules` için fayda sağlamaz.

## Kaynak

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
