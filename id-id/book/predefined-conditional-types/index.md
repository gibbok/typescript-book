# Tipe Kondisional yang Telah Didefinisikan



Dalam TypeScript, tipe kondisional yang telah didefinisikan adalah tipe kondisional bawaan yang disediakan oleh bahasa tersebut. Tipe-tipe ini dirancang untuk melakukan transformasi tipe yang umum berdasarkan karakteristik tipe tertentu.

`Exclude<UnionType, ExcludedType>`: Tipe ini menghapus semua tipe dari Type yang dapat ditetapkan ke ExcludedType.

`Extract<Type, Union>`: Tipe ini mengekstrak semua tipe dari Union yang dapat ditetapkan ke Type.

`NonNullable<Type>`: Tipe ini menghapus null dan undefined dari Type.

`ReturnType<Type>`: Tipe ini mengekstrak tipe kembalian dari Type yang berupa fungsi.

`Parameters<Type>`: Tipe ini mengekstrak tipe parameter dari Type yang berupa fungsi.

`Required<Type>`: Tipe ini membuat semua properti dalam Type menjadi wajib.

`Partial<Type>`: Tipe ini membuat semua properti dalam Type menjadi opsional.

`Readonly<Type>`: Tipe ini membuat semua properti dalam Type menjadi hanya-baca.

