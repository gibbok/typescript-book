# Önceden Tanımlanmış Koşullu Türler



TypeScript'te Önceden Tanımlanmış Koşullu Türler, dil tarafından sağlanan yerleşik koşullu türlerdir. Belirli bir türün özelliklerine göre yaygın tür dönüşümlerini gerçekleştirmek üzere tasarlanmışlardır.

`Exclude<UnionType, ExcludedType>`: Bu tür, Type içindeki ExcludedType'a atanabilen tüm türleri kaldırır.

`Extract<Type, Union>`: Bu tür, Union içinden Type'a atanabilen tüm türleri çıkarır.

`NonNullable<Type>`: Bu tür, Type içinden null ve undefined değerlerini kaldırır.

`ReturnType<Type>`: Bu tür, bir Type fonksiyonunun dönüş türünü çıkarır.

`Parameters<Type>`: Bu tür, bir Type fonksiyonunun parametre türlerini çıkarır.

`Required<Type>`: Bu tür, Type içindeki tüm özellikleri zorunlu hâle getirir.

`Partial<Type>`: Bu tür, Type içindeki tüm özellikleri isteğe bağlı hâle getirir.

`Readonly<Type>`: Bu tür, Type içindeki tüm özellikleri salt okunur hâle getirir.

