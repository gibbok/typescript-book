---
title: 定義済み条件型
sidebar:
  order: 43
  label: 43. 定義済み条件型
---


TypeScript の定義済み条件型は、言語によって提供される組み込みの条件型です。指定された型の特性に基づいて、一般的な型変換を実行するよう設計されています。

`Exclude<UnionType, ExcludedType>`: Type から ExcludedType に代入可能なすべての型を除外します。

`Extract<Type, Union>`: Union から Type に代入可能なすべての型を抽出します。

`NonNullable<Type>`: Type から null と undefined を除外します。

`ReturnType<Type>`: 関数 Type の戻り値の型を抽出します。

`Parameters<Type>`: 関数 Type のパラメーター型を抽出します。

`Required<Type>`: Type のすべてのプロパティを必須にします。

`Partial<Type>`: Type のすべてのプロパティをオプショナルにします。

`Readonly<Type>`: Type のすべてのプロパティを読み取り専用にします。

