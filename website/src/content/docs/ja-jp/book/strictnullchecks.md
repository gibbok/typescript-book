---
title: strictNullChecks
sidebar:
  order: 19
  label: 19. strictNullChecks
---


`strictNullChecks` は、厳密な null チェックを強制する TypeScript のコンパイラオプションです。このオプションを有効にすると、変数とパラメーターには、ユニオン型 `null` | `undefined` を使用して明示的にその型として宣言されている場合にのみ、`null` または `undefined` を代入できます。変数またはパラメーターが null 許容として明示的に宣言されていない場合、潜在的なランタイムエラーを防ぐために TypeScript がエラーを生成します。

