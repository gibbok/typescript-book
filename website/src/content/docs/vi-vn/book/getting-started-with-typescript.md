---
title: Bắt đầu với TypeScript
sidebar:
  order: 9
  label: 9. Bắt đầu với TypeScript
---


### Cài đặt

Visual Studio Code hỗ trợ rất tốt ngôn ngữ TypeScript nhưng không bao gồm trình biên dịch TypeScript. Để cài đặt trình biên dịch TypeScript, bạn có thể sử dụng trình quản lý gói như npm hoặc yarn:

```shell
npm install typescript --save-dev
```

hoặc

```shell
yarn add typescript --dev
```

Hãy bảo đảm lockfile đã tạo được commit để mọi thành viên trong nhóm đều sử dụng cùng một phiên bản TypeScript.

Để chạy trình biên dịch TypeScript, bạn có thể sử dụng các lệnh sau:

```shell
npx tsc
```

hoặc

```shell
yarn tsc
```

Nên cài đặt TypeScript theo từng dự án thay vì cài đặt toàn cục vì cách này tạo ra quy trình build dễ dự đoán hơn. Tuy nhiên, với nhu cầu sử dụng một lần, bạn có thể dùng lệnh sau:

```shell
npx tsc
```

hoặc cài đặt toàn cục:

```shell
npm install -g typescript
```

Nếu đang sử dụng Microsoft Visual Studio, bạn có thể lấy TypeScript dưới dạng một package trong NuGet cho các dự án MSBuild. Trong NuGet Package Manager Console, chạy lệnh sau:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Trong quá trình cài đặt TypeScript, hai tệp thực thi được cài đặt: "tsc" là trình biên dịch TypeScript và "tsserver" là máy chủ TypeScript độc lập. Máy chủ độc lập chứa trình biên dịch và các dịch vụ ngôn ngữ mà editor và IDE có thể sử dụng để cung cấp khả năng hoàn thành mã thông minh.

Ngoài ra, có một số trình chuyển dịch tương thích với TypeScript như Babel (thông qua plugin) hoặc swc. Các trình chuyển dịch này có thể được dùng để chuyển đổi mã TypeScript sang các ngôn ngữ hoặc phiên bản đích khác.

TypeScript 7.0 đã được viết lại bằng Go như một triển khai native của trình biên dịch và dịch vụ ngôn ngữ. Nó sử dụng đa luồng với bộ nhớ dùng chung cùng các tối ưu hóa khác để tăng tốc quá trình build đầy đủ và các tính năng của editor, giúp rút ngắn thời gian phản hồi trong quá trình phát triển.

Một số tính năng hiệu năng của TypeScript 7.0 có thể được tinh chỉnh. Việc kiểm tra kiểu có thể chạy trên các worker song song bằng `--checkers`; nhiều worker hơn có thể tăng tốc các dự án lớn nhưng sẽ dùng nhiều bộ nhớ hơn. Chế độ `--watch` được xây dựng lại cải thiện khả năng theo dõi tệp trên nhiều nền tảng. TypeScript 7.0 chưa bao gồm compiler API (tính đến tháng 7 năm 2026), vì vậy các công cụ vẫn cần API TypeScript 6.0 có thể chạy song song với TypeScript 7.0 bằng cách sử dụng `@typescript/typescript6` hoặc npm alias.

### Cấu hình

Có thể cấu hình TypeScript bằng các tùy chọn CLI của tsc hoặc bằng một tệp cấu hình chuyên dụng có tên tsconfig.json được đặt ở thư mục gốc của dự án.

Để tạo tệp tsconfig.json được điền sẵn các thiết lập được khuyến nghị, bạn có thể dùng lệnh sau:

```shell
tsc --init
```

Khi thực thi lệnh `tsc` cục bộ, TypeScript sẽ biên dịch mã bằng cấu hình được chỉ định trong tệp tsconfig.json gần nhất.

Dưới đây là một số ví dụ về lệnh CLI chạy với thiết lập mặc định:

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### Tệp cấu hình TypeScript

Tệp tsconfig.json được dùng để cấu hình TypeScript Compiler (tsc). Thông thường, nó được thêm vào thư mục gốc của dự án cùng với tệp `package.json`.

Ghi chú:

* tsconfig.json chấp nhận comment dù có định dạng JSON.
* Nên sử dụng tệp cấu hình này thay cho các tùy chọn dòng lệnh.

Tại các liên kết sau, bạn có thể tìm thấy tài liệu đầy đủ và schema của nó:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

Sau đây là danh sách các cấu hình phổ biến và hữu ích:

#### target

Thuộc tính "target" được dùng để chỉ định phiên bản ECMAScript mà mã TypeScript của bạn sẽ được emit/biên dịch sang. Với các trình duyệt hiện đại, ES6 là một lựa chọn phù hợp. Lưu ý: hỗ trợ ES5 đã bị deprecated trong TypeScript 6.0 và không còn được hỗ trợ trong TypeScript 7.0.

#### lib

Thuộc tính "lib" được dùng để chỉ định các tệp thư viện cần đưa vào tại thời điểm biên dịch. TypeScript tự động bao gồm các API cho những tính năng được chỉ định trong thuộc tính "target", nhưng có thể bỏ hoặc chọn các thư viện cụ thể theo nhu cầu. Ví dụ, nếu đang làm việc với dự án máy chủ, bạn có thể loại trừ thư viện "DOM", vốn chỉ hữu ích trong môi trường trình duyệt.

#### strict

Tùy chọn "strict" cải thiện độ an toàn kiểu bằng cách bật các kiểm tra chặt chẽ hơn. Tùy chọn này được bật mặc định kể từ TypeScript 6.0; nếu không, bạn nên đặt tường minh thành true trong tsconfig.json. Việc bật "strict" cho phép TypeScript:

* Emit mã bằng "use strict" cho từng tệp nguồn.
* Xem xét "null" và "undefined" trong quá trình kiểm tra kiểu.
* Vô hiệu hóa việc sử dụng kiểu "any" khi không có chú thích kiểu.
* Báo lỗi khi sử dụng biểu thức "this" mà nếu không sẽ ngầm mang kiểu "any".

#### module

Thuộc tính "module" đặt hệ thống module được hỗ trợ cho chương trình đã biên dịch. Tại thời gian chạy, một module loader được dùng để định vị và thực thi các dependency dựa trên hệ thống module đã chỉ định.

Các module loader phổ biến nhất trong JavaScript là Node.js CommonJS cho ứng dụng phía máy chủ và RequireJS cho module AMD trong ứng dụng web chạy trên trình duyệt. TypeScript có thể emit mã cho nhiều hệ thống module khác nhau, bao gồm UMD, System, ESNext, ES2015/ES6 và ES2020. Hệ thống module nên được chọn dựa trên môi trường đích và cơ chế tải module có sẵn trong môi trường đó.

Lưu ý: hỗ trợ các hệ thống module cũ hơn (AMD, UMD, SystemJS) đã bị deprecated trong TypeScript 6.0 và không còn được hỗ trợ trong TypeScript 7.0.

#### moduleResolution

Thuộc tính "moduleResolution" chỉ định chiến lược phân giải module. Sử dụng "nodenext" hoặc "bundler" cho mã TypeScript hiện đại. Chiến lược "classic" chỉ được dùng cho các phiên bản TypeScript cũ (trước 1.6).

#### esModuleInterop

Thuộc tính "esModuleInterop" cho phép default import từ các module CommonJS không export bằng thuộc tính "default"; thuộc tính này cung cấp một shim để bảo đảm khả năng tương thích trong JavaScript được emit. Sau khi bật tùy chọn này, chúng ta có thể dùng `import MyLibrary from "my-library"` thay cho `import * as MyLibrary from "my-library"`.

"esModuleInterop" ban đầu là tùy chọn opt-in để tránh breaking change, nhưng từ lâu đã là mặc định được khuyến nghị. Việc vô hiệu hóa nó có thể gây ra các vấn đề tinh vi tại thời gian chạy khi dùng CommonJS với ESM. Lưu ý: kể từ TypeScript 6.0, hành vi interop an toàn hơn này luôn được bật.

Trong TypeScript 6.0, một số tùy chọn cấu hình và dạng cú pháp cũ đã bị deprecated hoặc chuyển qua hành vi cũ. Trong TypeScript 7.0, chúng trở thành lỗi nghiêm trọng hoặc hành vi no-op.

Các mục deprecated đã trở thành lỗi nghiêm trọng với hành vi no-op gồm:

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* vô hiệu hóa `esModuleInterop` hoặc `allowSyntheticDefaultImports`
* vô hiệu hóa `alwaysStrict`
* từ khóa `module` trong khai báo namespace
* `asserts` trên import
* `/// <reference no-default-lib />` trong `skipDefaultLibCheck`
* đường dẫn tệp CLI với `tsconfig.json` cục bộ trừ khi sử dụng `--ignoreConfig`

#### jsx

Thuộc tính "jsx" chỉ áp dụng cho các tệp .tsx được dùng trong ReactJS và kiểm soát cách các cấu trúc JSX được biên dịch thành JavaScript. Một tùy chọn phổ biến là "preserve", sẽ biên dịch thành tệp .jsx nhưng giữ nguyên JSX để có thể chuyển tiếp sang các công cụ khác như Babel cho các bước biến đổi tiếp theo.

#### skipLibCheck

Thuộc tính "skipLibCheck" ngăn TypeScript kiểm tra kiểu toàn bộ các package bên thứ ba đã import. Thuộc tính này giúp giảm thời gian biên dịch của dự án. TypeScript vẫn kiểm tra mã của bạn dựa trên các định nghĩa kiểu do các package này cung cấp.

#### files

Thuộc tính "files" cho trình biên dịch biết danh sách các tệp luôn phải được đưa vào chương trình.

#### include

<!-- markdownlint-disable MD049 -->
Thuộc tính "include" cho trình biên dịch biết danh sách các tệp mà chúng ta muốn đưa vào. Thuộc tính này cho phép các pattern giống glob, chẳng hạn như "\*_" cho mọi thư mục con, "_" cho mọi tên tệp và "?" cho các ký tự tùy chọn.
<!-- markdownlint-enable MD049 -->

#### exclude

Thuộc tính "exclude" cho trình biên dịch biết danh sách các tệp không nên được đưa vào quá trình biên dịch. Danh sách này có thể bao gồm các tệp như "node_modules" hoặc các tệp kiểm thử.
Lưu ý: tsconfig.json cho phép comment.

### importHelpers

TypeScript sử dụng mã helper khi sinh mã cho một số tính năng JavaScript nâng cao hoặc được down-level. Theo mặc định, các helper này được lặp lại trong các tệp sử dụng chúng. Tùy chọn `importHelpers` thay vào đó import các helper từ module `tslib`, giúp đầu ra JavaScript hiệu quả hơn.

### Lời khuyên khi chuyển sang TypeScript

Với các dự án lớn, nên áp dụng quá trình chuyển đổi dần dần, trong đó mã TypeScript và JavaScript ban đầu cùng tồn tại. Chỉ các dự án nhỏ mới có thể chuyển sang TypeScript trong một lần.

Bước đầu tiên của quá trình chuyển đổi này là đưa TypeScript vào chuỗi build. Có thể thực hiện bằng tùy chọn trình biên dịch "allowJs", cho phép các tệp .ts và .tsx cùng tồn tại với các tệp JavaScript hiện có. Vì TypeScript sẽ fallback sang kiểu "any" cho một biến khi không thể suy luận kiểu từ các tệp JavaScript, nên ở giai đoạn đầu của quá trình chuyển đổi, nên vô hiệu hóa "noImplicitAny" trong các tùy chọn trình biên dịch.

Bước thứ hai là bảo đảm các bài kiểm thử JavaScript hoạt động cùng các tệp TypeScript để bạn có thể chạy kiểm thử khi chuyển đổi từng module. Nếu đang dùng Jest, hãy cân nhắc sử dụng `ts-jest`, cho phép kiểm thử các dự án TypeScript bằng Jest.

Bước thứ ba là thêm các khai báo kiểu cho thư viện bên thứ ba vào dự án. Các khai báo này có thể được đóng gói cùng thư viện hoặc có trên DefinitelyTyped. Bạn có thể tìm chúng tại [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) và cài đặt bằng:

```shell
npm install --save-dev @types/package-name
```

hoặc

```shell
yarn add --dev @types/package-name
```

Bước thứ tư là chuyển đổi từng module theo cách tiếp cận từ dưới lên, dựa trên Dependency Graph và bắt đầu từ các node lá. Ý tưởng là bắt đầu chuyển đổi những Module không phụ thuộc vào Module khác. Để trực quan hóa các dependency graph, bạn có thể dùng công cụ "madge".

Các module phù hợp cho những bước chuyển đổi ban đầu này là các hàm tiện ích và mã liên quan đến API bên ngoài hoặc specification. Có thể tự động tạo các định nghĩa kiểu TypeScript từ hợp đồng Swagger, GraphQL hoặc JSON schema để đưa vào dự án.

Khi không có specification hoặc schema chính thức, bạn có thể tạo kiểu từ dữ liệu thô, chẳng hạn JSON do máy chủ trả về. Tuy nhiên, nên tạo kiểu từ specification thay vì từ dữ liệu để tránh bỏ sót các trường hợp biên.

Trong quá trình chuyển đổi, không nên refactor mã và chỉ tập trung vào việc thêm kiểu cho các module.

Bước thứ năm là bật "noImplicitAny", điều này sẽ bắt buộc mọi kiểu phải được biết và định nghĩa, mang lại trải nghiệm TypeScript tốt hơn cho dự án.

Trong quá trình chuyển đổi, bạn có thể dùng directive `@ts-check`, cho phép TypeScript kiểm tra kiểu trong tệp JavaScript. Directive này cung cấp một phiên bản kiểm tra kiểu lỏng hơn và ban đầu có thể dùng để xác định vấn đề trong các tệp JavaScript. Khi `@ts-check` được thêm vào tệp, TypeScript sẽ cố gắng suy ra các định nghĩa bằng comment theo phong cách JSDoc. Tuy nhiên, chỉ nên cân nhắc dùng chú thích JSDoc ở giai đoạn rất sớm của quá trình chuyển đổi.

Hãy cân nhắc giữ giá trị mặc định của `noEmitOnError` trong tsconfig.json là false. Điều này cho phép bạn xuất mã nguồn JavaScript ngay cả khi có lỗi được báo cáo.

