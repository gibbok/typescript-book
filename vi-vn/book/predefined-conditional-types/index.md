# Conditional Type được định nghĩa sẵn



Trong TypeScript, Predefined Conditional Type là các conditional type tích hợp do ngôn ngữ cung cấp. Chúng được thiết kế để thực hiện các phép biến đổi kiểu phổ biến dựa trên đặc điểm của một kiểu nhất định.

`Exclude<UnionType, ExcludedType>`: Kiểu này loại bỏ khỏi Type tất cả các kiểu có thể gán cho ExcludedType.

`Extract<Type, Union>`: Kiểu này trích xuất từ Union tất cả các kiểu có thể gán cho Type.

`NonNullable<Type>`: Kiểu này loại bỏ null và undefined khỏi Type.

`ReturnType<Type>`: Kiểu này trích xuất kiểu trả về của một hàm Type.

`Parameters<Type>`: Kiểu này trích xuất các kiểu tham số của một hàm Type.

`Required<Type>`: Kiểu này biến tất cả thuộc tính trong Type thành bắt buộc.

`Partial<Type>`: Kiểu này biến tất cả thuộc tính trong Type thành tùy chọn.

`Readonly<Type>`: Kiểu này biến tất cả thuộc tính trong Type thành readonly.

