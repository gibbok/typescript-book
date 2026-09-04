# TypeScript 7.1 为环境模块添加导入属性


**发布日期：** 2026 年 9 月 1 日

TypeScript 的原生编译器现在支持在模式环境模块声明上指定导入属性类型。这使声明可以根据 `type: 'css'`、`type: 'text'` 等属性区分不同导入。

## 主要变化

当 import 带有属性时，TypeScript 可以将其解析到匹配的模式环境模块。匹配基于可赋值性；如果多个声明都匹配，TypeScript 会选择属性类型最具体的声明。

目前，这类声明中的属性类型仅允许使用值为字符串字面量类型的普通属性。模式和属性类型完全相同的声明可以合并，而属性类型不同的声明保持独立。

## 兼容性

此更改已合并到 TypeScript 7.1.0 Beta 里程碑。标准库并未因此内置 CSS 或文本导入声明，因此项目和工具仍需定义所需的环境模块。

## 来源

阅读已合并的 TypeScript 拉取请求： [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
