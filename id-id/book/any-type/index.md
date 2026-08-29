# Tipe Any



Tipe `any` adalah tipe khusus (supertipe universal) yang dapat digunakan untuk merepresentasikan nilai dari tipe apa pun (primitif, objek, array, fungsi, error, simbol). Tipe ini sering digunakan dalam situasi ketika tipe suatu nilai tidak diketahui pada waktu kompilasi, atau saat bekerja dengan nilai dari API atau pustaka eksternal yang tidak memiliki definisi tipe TypeScript.

Dengan menggunakan tipe `any`, Anda memberi tahu compiler TypeScript bahwa nilai harus direpresentasikan tanpa batasan apa pun. Untuk memaksimalkan keamanan tipe dalam kode Anda, pertimbangkan hal-hal berikut:

* Batasi penggunaan `any` pada kasus tertentu ketika tipenya benar-benar tidak diketahui.
* Jangan mengembalikan tipe `any` dari suatu fungsi karena hal ini melemahkan keamanan tipe dalam kode yang menggunakannya.
* Alih-alih menggunakan `any`, gunakan `@ts-ignore` jika Anda perlu membungkam compiler.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

