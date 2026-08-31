---
title: Üç Eğik Çizgi Yönergeleri
sidebar:
  order: 60
  label: 60. Üç Eğik Çizgi Yönergeleri
---


Üç eğik çizgi yönergeleri, bir dosyanın nasıl işleneceği hakkında derleyiciye talimatlar veren özel yorumlardır. Bu yönergeler art arda üç eğik çizgiyle (`///`) başlar, genellikle bir TypeScript dosyasının en üstüne yerleştirilir ve çalışma zamanı davranışını etkilemez.

Üç eğik çizgi yönergeleri; harici bağımlılıklara başvurmak, modül yükleme davranışını belirtmek, belirli derleyici özelliklerini etkinleştirmek veya devre dışı bırakmak ve daha fazlası için kullanılır. Birkaç örnek:

Bir bildirim dosyasına başvurma:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Modül biçimini belirtme:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Derleyici seçeneklerini etkinleştirme; aşağıdaki örnekte katı mod:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

