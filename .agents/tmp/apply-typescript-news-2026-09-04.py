#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path

SLUG = "typescript-7-native-api-adds-ast-traversal-getters"
DATE = "2026-09-03"
SOURCE_PR = "https://github.com/microsoft/TypeScript/pull/63893"
SOURCE_ISSUE = "https://github.com/microsoft/TypeScript/issues/63892"

LOCALES = {
    "root": {
        "title": "TypeScript 7 native API adds AST child and token getters",
        "description": "The native TypeScript API adds Node child and token traversal methods, closing a gap with the JavaScript API for syntax-tree tooling.",
        "published": "**Published:** September 3, 2026",
        "lead": "The native TypeScript API now exposes five `Node` helpers for traversing child nodes and tokens: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()`, and `getLastToken()`.",
        "what_heading": "What changed",
        "what": "PR #63893 adds the remaining child and token getters that already exist on the JavaScript-based TypeScript API. The change completes the child/token part of the native `Node` API after position and text getters had already been added.",
        "why_heading": "Why it matters",
        "why": "These methods are useful to API consumers that walk the syntax tree, including tools that need to inspect tokens as well as child nodes. The native API can now use the same `Node` traversal helpers for these cases.",
        "source_heading": "Source",
        "source": "Read [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") and the [tracking issue](" + SOURCE_ISSUE + ").",
        "index_published": "**Published:** September 3, 2026",
        "index_summary": "The native TypeScript API adds five `Node` helpers for traversing child nodes and tokens, improving parity with the JavaScript API.",
    },
    "zh-cn": {
        "title": "TypeScript 7 原生 API 新增 AST 子节点和 token 获取方法",
        "description": "TypeScript 原生 API 为 Node 新增子节点和 token 遍历方法，缩小与 JavaScript API 在语法树工具方面的差距。",
        "published": "**发布日期：** 2026 年 9 月 3 日",
        "lead": "TypeScript 原生 API 现在为 `Node` 提供五个用于遍历子节点和 token 的辅助方法：`getChildren()`、`getChildCount()`、`getChildAt()`、`getFirstToken()` 和 `getLastToken()`。",
        "what_heading": "主要变化",
        "what": "PR #63893 新增了 JavaScript 版 TypeScript API 中已经存在的其余子节点和 token 获取方法。在位置和文本获取方法已经加入之后，这次改动补齐了原生 `Node` API 的子节点和 token 相关能力。",
        "why_heading": "为什么重要",
        "why": "这些方法适用于遍历语法树的 API 使用者，包括需要同时检查 token 和子节点的工具。原生 API 现在也能在这些场景中使用相同的 `Node` 遍历辅助方法。",
        "source_heading": "来源",
        "source": "请参阅 [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") 和[跟踪 issue](" + SOURCE_ISSUE + ")。",
        "index_published": "**发布日期：** 2026 年 9 月 3 日",
        "index_summary": "TypeScript 原生 API 为 `Node` 新增五个子节点和 token 遍历辅助方法，进一步缩小与 JavaScript API 的差距。",
    },
    "it-it": {
        "title": "L'API nativa di TypeScript 7 aggiunge getter per figli e token dell'AST",
        "description": "L'API nativa di TypeScript aggiunge metodi di Node per attraversare figli e token, riducendo una differenza rispetto all'API JavaScript per gli strumenti che analizzano l'albero sintattico.",
        "published": "**Pubblicato:** 3 settembre 2026",
        "lead": "L'API nativa di TypeScript ora espone cinque metodi di supporto di `Node` per attraversare nodi figli e token: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` e `getLastToken()`.",
        "what_heading": "Cosa è cambiato",
        "what": "La PR #63893 aggiunge i getter rimanenti per figli e token già presenti nell'API TypeScript basata su JavaScript. La modifica completa la parte relativa a figli e token dell'API nativa di `Node`, dopo l'aggiunta precedente dei getter per posizione e testo.",
        "why_heading": "Perché è importante",
        "why": "Questi metodi sono utili per chi usa l'API per attraversare l'albero sintattico, compresi gli strumenti che devono ispezionare sia i token sia i nodi figli. L'API nativa può ora usare gli stessi helper di attraversamento di `Node` in questi casi.",
        "source_heading": "Fonte",
        "source": "Leggi [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") e la [issue di tracciamento](" + SOURCE_ISSUE + ").",
        "index_published": "**Pubblicato:** 3 settembre 2026",
        "index_summary": "L'API nativa di TypeScript aggiunge cinque helper di `Node` per attraversare nodi figli e token, migliorando la parità con l'API JavaScript.",
    },
    "pt-br": {
        "title": "API nativa do TypeScript 7 adiciona getters de filhos e tokens da AST",
        "description": "A API nativa do TypeScript adiciona métodos de Node para percorrer filhos e tokens, reduzindo uma diferença em relação à API JavaScript para ferramentas de árvore sintática.",
        "published": "**Publicado:** 3 de setembro de 2026",
        "lead": "A API nativa do TypeScript agora expõe cinco auxiliares de `Node` para percorrer nós filhos e tokens: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` e `getLastToken()`.",
        "what_heading": "O que mudou",
        "what": "A PR #63893 adiciona os getters restantes de filhos e tokens que já existem na API do TypeScript baseada em JavaScript. A mudança completa a parte de filhos e tokens da API nativa de `Node`, depois que os getters de posição e texto já haviam sido adicionados.",
        "why_heading": "Por que isso importa",
        "why": "Esses métodos são úteis para consumidores da API que percorrem a árvore sintática, incluindo ferramentas que precisam inspecionar tokens e nós filhos. A API nativa agora pode usar os mesmos auxiliares de travessia de `Node` nesses casos.",
        "source_heading": "Fonte",
        "source": "Leia [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") e a [issue de acompanhamento](" + SOURCE_ISSUE + ").",
        "index_published": "**Publicado:** 3 de setembro de 2026",
        "index_summary": "A API nativa do TypeScript adiciona cinco auxiliares de `Node` para percorrer nós filhos e tokens, melhorando a paridade com a API JavaScript.",
    },
    "sv-se": {
        "title": "TypeScript 7:s inbyggda API får getters för AST-barn och token",
        "description": "TypeScripts inbyggda API lägger till Node-metoder för att traversera barn och token, vilket minskar en skillnad mot JavaScript-API:t för syntaxträdsverktyg.",
        "published": "**Publicerad:** 3 september 2026",
        "lead": "TypeScripts inbyggda API exponerar nu fem `Node`-hjälpmetoder för att traversera barnnoder och token: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` och `getLastToken()`.",
        "what_heading": "Vad har ändrats",
        "what": "PR #63893 lägger till de återstående getters för barn och token som redan finns i det JavaScript-baserade TypeScript-API:t. Ändringen kompletterar barn- och token-delen av det inbyggda `Node`-API:t efter att getters för position och text redan hade lagts till.",
        "why_heading": "Varför det är viktigt",
        "why": "Metoderna är användbara för API-konsumenter som traverserar syntaxträdet, inklusive verktyg som behöver inspektera både token och barnnoder. Det inbyggda API:t kan nu använda samma `Node`-hjälpmetoder för traversering i dessa fall.",
        "source_heading": "Källa",
        "source": "Läs [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") och [spårningsärendet](" + SOURCE_ISSUE + ").",
        "index_published": "**Publicerad:** 3 september 2026",
        "index_summary": "TypeScripts inbyggda API lägger till fem `Node`-hjälpmetoder för att traversera barnnoder och token, vilket förbättrar pariteten med JavaScript-API:t.",
    },
    "bg-bg": {
        "title": "Нативният API на TypeScript 7 добавя getter-и за AST дъщерни възли и token-и",
        "description": "Нативният API на TypeScript добавя Node методи за обхождане на дъщерни възли и token-и, намалявайки разликата спрямо JavaScript API за инструменти, работещи със синтактичното дърво.",
        "published": "**Публикувано:** 3 септември 2026 г.",
        "lead": "Нативният API на TypeScript вече предоставя пет помощни метода на `Node` за обхождане на дъщерни възли и token-и: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` и `getLastToken()`.",
        "what_heading": "Какво се промени",
        "what": "PR #63893 добавя останалите getter-и за дъщерни възли и token-и, които вече съществуват в базирания на JavaScript TypeScript API. Промяната завършва тази част от нативния `Node` API, след като getter-ите за позиция и текст вече бяха добавени.",
        "why_heading": "Защо е важно",
        "why": "Тези методи са полезни за потребители на API, които обхождат синтактичното дърво, включително инструменти, които трябва да проверяват както token-и, така и дъщерни възли. Нативният API вече може да използва същите помощни методи на `Node` за тези случаи.",
        "source_heading": "Източник",
        "source": "Прочетете [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") и [проследяващия issue](" + SOURCE_ISSUE + ").",
        "index_published": "**Публикувано:** 3 септември 2026 г.",
        "index_summary": "Нативният API на TypeScript добавя пет помощни метода на `Node` за обхождане на дъщерни възли и token-и и подобрява съответствието с JavaScript API.",
    },
    "es-es": {
        "title": "La API nativa de TypeScript 7 añade getters de hijos y tokens del AST",
        "description": "La API nativa de TypeScript añade métodos de Node para recorrer hijos y tokens, reduciendo una diferencia con la API de JavaScript para herramientas que trabajan con el árbol de sintaxis.",
        "published": "**Publicado:** 3 de septiembre de 2026",
        "lead": "La API nativa de TypeScript ahora expone cinco métodos auxiliares de `Node` para recorrer nodos hijos y tokens: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` y `getLastToken()`.",
        "what_heading": "Qué cambió",
        "what": "La PR #63893 añade los getters restantes de hijos y tokens que ya existen en la API de TypeScript basada en JavaScript. El cambio completa la parte de hijos y tokens de la API nativa de `Node`, después de que ya se hubieran añadido los getters de posición y texto.",
        "why_heading": "Por qué importa",
        "why": "Estos métodos son útiles para consumidores de la API que recorren el árbol de sintaxis, incluidas herramientas que necesitan inspeccionar tanto tokens como nodos hijos. La API nativa ahora puede usar los mismos auxiliares de recorrido de `Node` en estos casos.",
        "source_heading": "Fuente",
        "source": "Lee [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") y la [incidencia de seguimiento](" + SOURCE_ISSUE + ").",
        "index_published": "**Publicado:** 3 de septiembre de 2026",
        "index_summary": "La API nativa de TypeScript añade cinco auxiliares de `Node` para recorrer nodos hijos y tokens, mejorando la paridad con la API de JavaScript.",
    },
    "ja-jp": {
        "title": "TypeScript 7 のネイティブ API に AST の子ノードとトークン取得メソッドが追加",
        "description": "TypeScript のネイティブ API に Node の子ノードとトークンを走査するメソッドが追加され、構文木ツール向けの JavaScript API との差が縮まりました。",
        "published": "**公開日:** 2026年9月3日",
        "lead": "TypeScript のネイティブ API で、子ノードとトークンを走査するための 5 つの `Node` ヘルパー、`getChildren()`、`getChildCount()`、`getChildAt()`、`getFirstToken()`、`getLastToken()` が利用できるようになりました。",
        "what_heading": "変更内容",
        "what": "PR #63893 では、JavaScript ベースの TypeScript API にすでに存在する残りの子ノード／トークン getter が追加されました。位置とテキストの getter が先に追加されていたため、今回の変更でネイティブ `Node` API の子ノード／トークン関連機能が補完されます。",
        "why_heading": "重要な理由",
        "why": "これらのメソッドは、構文木を走査する API 利用者、特にトークンと子ノードの両方を調べる必要があるツールに役立ちます。ネイティブ API でも、こうした用途で同じ `Node` 走査ヘルパーを使えるようになりました。",
        "source_heading": "ソース",
        "source": "[PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") と[追跡 issue](" + SOURCE_ISSUE + ")を参照してください。",
        "index_published": "**公開日:** 2026年9月3日",
        "index_summary": "TypeScript のネイティブ API に、子ノードとトークンを走査する 5 つの `Node` ヘルパーが追加され、JavaScript API との機能差が縮まりました。",
    },
    "fr-fr": {
        "title": "L'API native de TypeScript 7 ajoute des getters pour les enfants et les tokens de l'AST",
        "description": "L'API native de TypeScript ajoute des méthodes Node pour parcourir les enfants et les tokens, réduisant un écart avec l'API JavaScript pour les outils d'arbre syntaxique.",
        "published": "**Publié le :** 3 septembre 2026",
        "lead": "L'API native de TypeScript expose désormais cinq méthodes utilitaires de `Node` pour parcourir les nœuds enfants et les tokens : `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` et `getLastToken()`.",
        "what_heading": "Ce qui change",
        "what": "La PR #63893 ajoute les getters restants pour les enfants et les tokens qui existent déjà dans l'API TypeScript basée sur JavaScript. La modification complète cette partie de l'API native de `Node`, après l'ajout préalable des getters de position et de texte.",
        "why_heading": "Pourquoi c'est important",
        "why": "Ces méthodes sont utiles aux consommateurs de l'API qui parcourent l'arbre syntaxique, notamment aux outils qui doivent inspecter à la fois les tokens et les nœuds enfants. L'API native peut désormais utiliser les mêmes utilitaires de parcours de `Node` dans ces cas.",
        "source_heading": "Source",
        "source": "Consultez [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") et l'[issue de suivi](" + SOURCE_ISSUE + ").",
        "index_published": "**Publié le :** 3 septembre 2026",
        "index_summary": "L'API native de TypeScript ajoute cinq utilitaires de `Node` pour parcourir les nœuds enfants et les tokens, améliorant la parité avec l'API JavaScript.",
    },
    "ko-kr": {
        "title": "TypeScript 7 네이티브 API에 AST 자식 및 토큰 getter 추가",
        "description": "TypeScript 네이티브 API에 Node 자식과 토큰을 순회하는 메서드가 추가되어 구문 트리 도구를 위한 JavaScript API와의 차이가 줄었습니다.",
        "published": "**게시일:** 2026년 9월 3일",
        "lead": "TypeScript 네이티브 API는 이제 자식 노드와 토큰을 순회하기 위한 다섯 가지 `Node` 도우미인 `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()`, `getLastToken()`을 제공합니다.",
        "what_heading": "변경 사항",
        "what": "PR #63893은 JavaScript 기반 TypeScript API에 이미 존재하는 나머지 자식 및 토큰 getter를 추가합니다. 위치와 텍스트 getter가 이미 추가된 뒤, 이번 변경으로 네이티브 `Node` API의 자식/토큰 관련 기능이 보완됩니다.",
        "why_heading": "중요한 이유",
        "why": "이 메서드들은 구문 트리를 순회하는 API 소비자, 특히 토큰과 자식 노드를 모두 검사해야 하는 도구에 유용합니다. 이제 네이티브 API에서도 이러한 경우 동일한 `Node` 순회 도우미를 사용할 수 있습니다.",
        "source_heading": "출처",
        "source": "[PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") 및 [추적 이슈](" + SOURCE_ISSUE + ")를 확인하세요.",
        "index_published": "**게시일:** 2026년 9월 3일",
        "index_summary": "TypeScript 네이티브 API에 자식 노드와 토큰을 순회하는 다섯 가지 `Node` 도우미가 추가되어 JavaScript API와의 기능 차이가 줄었습니다.",
    },
    "id-id": {
        "title": "API native TypeScript 7 menambahkan getter anak AST dan token",
        "description": "API native TypeScript menambahkan metode Node untuk menelusuri anak dan token, mengurangi kesenjangan dengan API JavaScript untuk tooling pohon sintaks.",
        "published": "**3 September 2026**",
        "lead": "API native TypeScript kini menyediakan lima helper `Node` untuk menelusuri node anak dan token: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()`, dan `getLastToken()`.",
        "what_heading": "Apa yang berubah",
        "what": "PR #63893 menambahkan getter anak dan token yang tersisa dan sudah tersedia di API TypeScript berbasis JavaScript. Perubahan ini melengkapi bagian anak/token pada API native `Node` setelah getter posisi dan teks sebelumnya ditambahkan.",
        "why_heading": "Mengapa ini penting",
        "why": "Metode-metode ini berguna bagi pengguna API yang menelusuri pohon sintaks, termasuk tooling yang perlu memeriksa token sekaligus node anak. API native kini dapat menggunakan helper penelusuran `Node` yang sama untuk kasus tersebut.",
        "source_heading": "Sumber",
        "source": "Baca [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") dan [issue pelacakan](" + SOURCE_ISSUE + ").",
        "index_published": "**3 September 2026**",
        "index_summary": "API native TypeScript menambahkan lima helper `Node` untuk menelusuri node anak dan token, meningkatkan kesetaraan dengan API JavaScript.",
    },
    "de-de": {
        "title": "Die native API von TypeScript 7 erhält AST-Kind- und Token-Getter",
        "description": "Die native TypeScript-API ergänzt Node-Methoden zum Durchlaufen von Kindknoten und Tokens und schließt damit eine Lücke zur JavaScript-API für Syntaxbaum-Werkzeuge.",
        "published": "**Veröffentlicht:** 3. September 2026",
        "lead": "Die native TypeScript-API stellt jetzt fünf `Node`-Hilfsmethoden zum Durchlaufen von Kindknoten und Tokens bereit: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` und `getLastToken()`.",
        "what_heading": "Was sich geändert hat",
        "what": "PR #63893 fügt die verbleibenden Getter für Kindknoten und Tokens hinzu, die in der JavaScript-basierten TypeScript-API bereits vorhanden sind. Damit wird dieser Teil der nativen `Node`-API ergänzt, nachdem Positions- und Text-Getter bereits hinzugefügt worden waren.",
        "why_heading": "Warum das wichtig ist",
        "why": "Diese Methoden sind für API-Nutzer hilfreich, die den Syntaxbaum durchlaufen, einschließlich Werkzeugen, die sowohl Tokens als auch Kindknoten untersuchen müssen. Die native API kann dafür nun dieselben `Node`-Hilfsmethoden verwenden.",
        "source_heading": "Quelle",
        "source": "Siehe [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") und das [Tracking-Issue](" + SOURCE_ISSUE + ").",
        "index_published": "**Veröffentlicht:** 3. September 2026",
        "index_summary": "Die native TypeScript-API ergänzt fünf `Node`-Hilfsmethoden zum Durchlaufen von Kindknoten und Tokens und verbessert die Parität mit der JavaScript-API.",
    },
    "pl-pl": {
        "title": "Natywne API TypeScript 7 dodaje gettery dzieci AST i tokenów",
        "description": "Natywne API TypeScript dodaje metody Node do przechodzenia po dzieciach i tokenach, zmniejszając różnicę względem API JavaScript dla narzędzi pracujących z drzewem składni.",
        "published": "**Opublikowano:** 3 września 2026 r.",
        "lead": "Natywne API TypeScript udostępnia teraz pięć metod pomocniczych `Node` do przechodzenia po węzłach potomnych i tokenach: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` i `getLastToken()`.",
        "what_heading": "Co się zmieniło",
        "what": "PR #63893 dodaje pozostałe gettery dzieci i tokenów, które już istnieją w API TypeScript opartym na JavaScripcie. Zmiana uzupełnia tę część natywnego API `Node` po wcześniejszym dodaniu getterów pozycji i tekstu.",
        "why_heading": "Dlaczego to ważne",
        "why": "Metody te są przydatne dla użytkowników API przechodzących po drzewie składni, w tym dla narzędzi, które muszą analizować zarówno tokeny, jak i węzły potomne. Natywne API może teraz używać w tych przypadkach tych samych metod pomocniczych `Node`.",
        "source_heading": "Źródło",
        "source": "Zobacz [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") oraz [issue śledzące](" + SOURCE_ISSUE + ").",
        "index_published": "**Opublikowano:** 3 września 2026 r.",
        "index_summary": "Natywne API TypeScript dodaje pięć metod pomocniczych `Node` do przechodzenia po węzłach potomnych i tokenach, poprawiając zgodność z API JavaScript.",
    },
    "tr-tr": {
        "title": "TypeScript 7 yerel API'si AST alt düğüm ve token getter'ları ekliyor",
        "description": "TypeScript'in yerel API'si, alt düğümleri ve token'ları dolaşmak için Node metotları ekleyerek sözdizimi ağacı araçlarında JavaScript API'siyle arasındaki farkı azaltıyor.",
        "published": "**Yayımlandı:** 3 Eylül 2026",
        "lead": "TypeScript'in yerel API'si artık alt düğümleri ve token'ları dolaşmak için beş `Node` yardımcısı sunuyor: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` ve `getLastToken()`.",
        "what_heading": "Neler değişti",
        "what": "PR #63893, JavaScript tabanlı TypeScript API'sinde zaten bulunan kalan alt düğüm ve token getter'larını ekliyor. Konum ve metin getter'ları daha önce eklendiği için bu değişiklik, yerel `Node` API'sinin alt düğüm/token bölümünü tamamlıyor.",
        "why_heading": "Neden önemli",
        "why": "Bu metotlar, sözdizimi ağacını dolaşan API kullanıcıları için, özellikle hem token'ları hem de alt düğümleri incelemesi gereken araçlar için yararlıdır. Yerel API artık bu durumlarda aynı `Node` dolaşım yardımcılarını kullanabilir.",
        "source_heading": "Kaynak",
        "source": "[PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") ve [takip issue'sunu](" + SOURCE_ISSUE + ") inceleyin.",
        "index_published": "**Yayımlandı:** 3 Eylül 2026",
        "index_summary": "TypeScript'in yerel API'si alt düğümleri ve token'ları dolaşmak için beş `Node` yardımcısı ekleyerek JavaScript API'siyle uyumluluğu artırıyor.",
    },
    "vi-vn": {
        "title": "API native của TypeScript 7 thêm getter cho nút con và token của AST",
        "description": "API native của TypeScript thêm các phương thức Node để duyệt nút con và token, thu hẹp khác biệt với API JavaScript cho công cụ cây cú pháp.",
        "published": "**Đã xuất bản:** 3 tháng 9, 2026",
        "lead": "API native của TypeScript hiện cung cấp năm helper `Node` để duyệt các nút con và token: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` và `getLastToken()`.",
        "what_heading": "Điều gì thay đổi",
        "what": "PR #63893 bổ sung các getter cho nút con và token còn thiếu nhưng đã có trong API TypeScript dựa trên JavaScript. Thay đổi này hoàn thiện phần nút con/token của API native `Node` sau khi các getter vị trí và văn bản đã được thêm trước đó.",
        "why_heading": "Vì sao điều này quan trọng",
        "why": "Các phương thức này hữu ích cho người dùng API cần duyệt cây cú pháp, bao gồm các công cụ phải kiểm tra cả token lẫn nút con. API native giờ có thể dùng cùng các helper duyệt `Node` cho những trường hợp này.",
        "source_heading": "Nguồn",
        "source": "Xem [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") và [issue theo dõi](" + SOURCE_ISSUE + ").",
        "index_published": "**Đã xuất bản:** 3 tháng 9, 2026",
        "index_summary": "API native của TypeScript thêm năm helper `Node` để duyệt nút con và token, cải thiện mức độ tương đồng với API JavaScript.",
    },
    "th-th": {
        "title": "API แบบเนทีฟของ TypeScript 7 เพิ่ม getter สำหรับโหนดย่อยและ token ของ AST",
        "description": "API แบบเนทีฟของ TypeScript เพิ่มเมธอด Node สำหรับไล่ดูโหนดย่อยและ token ช่วยลดช่องว่างกับ JavaScript API สำหรับเครื่องมือที่ทำงานกับ syntax tree",
        "published": "**เผยแพร่:** 3 กันยายน 2026",
        "lead": "API แบบเนทีฟของ TypeScript มีตัวช่วย `Node` เพิ่มอีกห้ารายการสำหรับไล่ดูโหนดย่อยและ token ได้แก่ `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` และ `getLastToken()`",
        "what_heading": "สิ่งที่เปลี่ยนแปลง",
        "what": "PR #63893 เพิ่ม getter สำหรับโหนดย่อยและ token ที่เหลือซึ่งมีอยู่แล้วใน TypeScript API ที่ทำงานบน JavaScript การเปลี่ยนแปลงนี้เติมส่วนโหนดย่อย/token ของ API แบบเนทีฟสำหรับ `Node` หลังจากที่ getter สำหรับตำแหน่งและข้อความถูกเพิ่มไปก่อนแล้ว",
        "why_heading": "เหตุผลที่สำคัญ",
        "why": "เมธอดเหล่านี้มีประโยชน์ต่อผู้ใช้ API ที่ต้องไล่ดู syntax tree รวมถึงเครื่องมือที่ต้องตรวจทั้ง token และโหนดย่อย ตอนนี้ API แบบเนทีฟสามารถใช้ตัวช่วยการไล่ดู `Node` แบบเดียวกันในกรณีเหล่านี้ได้",
        "source_heading": "แหล่งที่มา",
        "source": "อ่าน [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") และ [issue สำหรับติดตาม](" + SOURCE_ISSUE + ")",
        "index_published": "**เผยแพร่:** 3 กันยายน 2026",
        "index_summary": "API แบบเนทีฟของ TypeScript เพิ่มตัวช่วย `Node` ห้ารายการสำหรับไล่ดูโหนดย่อยและ token ทำให้สอดคล้องกับ JavaScript API มากขึ้น",
    },
    "ru-ru": {
        "title": "Нативный API TypeScript 7 получил геттеры дочерних узлов и токенов AST",
        "description": "Нативный API TypeScript добавляет методы Node для обхода дочерних узлов и токенов, сокращая разрыв с JavaScript API для инструментов работы с синтаксическим деревом.",
        "published": "**Опубликовано:** 3 сентября 2026 г.",
        "lead": "Нативный API TypeScript теперь предоставляет пять вспомогательных методов `Node` для обхода дочерних узлов и токенов: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` и `getLastToken()`.",
        "what_heading": "Что изменилось",
        "what": "PR #63893 добавляет оставшиеся геттеры дочерних узлов и токенов, которые уже есть в API TypeScript на базе JavaScript. Это дополняет соответствующую часть нативного API `Node` после ранее добавленных геттеров позиции и текста.",
        "why_heading": "Почему это важно",
        "why": "Эти методы полезны потребителям API, которые обходят синтаксическое дерево, включая инструменты, которым нужно анализировать и токены, и дочерние узлы. Нативный API теперь может использовать те же вспомогательные методы обхода `Node` для таких задач.",
        "source_heading": "Источник",
        "source": "См. [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") и [issue для отслеживания](" + SOURCE_ISSUE + ").",
        "index_published": "**Опубликовано:** 3 сентября 2026 г.",
        "index_summary": "Нативный API TypeScript добавляет пять вспомогательных методов `Node` для обхода дочерних узлов и токенов, улучшая соответствие JavaScript API.",
    },
    "ar": {
        "title": "واجهة TypeScript 7 الأصلية تضيف دوال getter لعُقد AST الفرعية والرموز",
        "description": "تضيف واجهة TypeScript الأصلية أساليب Node لاجتياز العُقد الفرعية والرموز، مما يقلل الفجوة مع واجهة JavaScript لأدوات شجرة البنية.",
        "published": "**تاريخ النشر:** 3 سبتمبر 2026",
        "lead": "توفّر واجهة TypeScript الأصلية الآن خمس دوال مساعدة على `Node` لاجتياز العُقد الفرعية والرموز: `getChildren()` و`getChildCount()` و`getChildAt()` و`getFirstToken()` و`getLastToken()`.",
        "what_heading": "ما الذي تغيّر",
        "what": "يضيف PR #63893 دوال getter المتبقية للعُقد الفرعية والرموز الموجودة مسبقًا في واجهة TypeScript المبنية على JavaScript. ويستكمل هذا التغيير هذا الجزء من واجهة `Node` الأصلية بعد إضافة دوال getter للموضع والنص سابقًا.",
        "why_heading": "لماذا يهم ذلك",
        "why": "تفيد هذه الأساليب مستخدمي الواجهة الذين يجتازون شجرة البنية، بما في ذلك الأدوات التي تحتاج إلى فحص الرموز والعُقد الفرعية معًا. ويمكن للواجهة الأصلية الآن استخدام دوال الاجتياز المساعدة نفسها على `Node` في هذه الحالات.",
        "source_heading": "المصدر",
        "source": "راجع [PR #63893: API: add getChildren and token getters to Node](" + SOURCE_PR + ") و[issue التتبع](" + SOURCE_ISSUE + ").",
        "index_published": "**تاريخ النشر:** 3 سبتمبر 2026",
        "index_summary": "تضيف واجهة TypeScript الأصلية خمس دوال مساعدة على `Node` لاجتياز العُقد الفرعية والرموز، مما يحسن التوافق مع واجهة JavaScript.",
    },
}

def article_text(data: dict[str, str]) -> str:
    return f"""---
title: {data['title']}
description: {data['description']}
lastUpdated: {DATE}
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '{DATE}'
---

{data['published']}

{data['lead']}

## {data['what_heading']}

{data['what']}

## {data['why_heading']}

{data['why']}

## {data['source_heading']}

{data['source']}
"""

def news_dir(root: Path, locale: str) -> Path:
    docs = root / "website/src/content/docs"
    return docs / "typescript-news" if locale == "root" else docs / locale / "typescript-news"

def apply(root: Path) -> None:
    expected = set(LOCALES)
    config = (root / "website/src/config/locales.ts").read_text(encoding="utf-8")
    configured = {"root"} | set(re.findall(r"(?m)^  '([^']+)': \{$", config))
    if configured != expected:
        raise SystemExit(f"Locale dictionary mismatch: configured={sorted(configured)}, script={sorted(expected)}")

    for locale, data in LOCALES.items():
        directory = news_dir(root, locale)
        if not directory.is_dir():
            raise SystemExit(f"Missing news directory: {directory}")

        article_path = directory / "2026" / f"{SLUG}.md"
        if article_path.exists():
            raise SystemExit(f"Article already exists: {article_path}")

        for path in sorted(directory.glob("2026/*.md")):
            content = path.read_text(encoding="utf-8")
            updated, count = re.subn(
                r"(?m)(^sidebar:\s*\n\s+order:\s+)(\d+)\s*$",
                lambda m: f"{m.group(1)}{int(m.group(2)) + 1}",
                content,
                count=1,
            )
            if count != 1:
                raise SystemExit(f"Could not update sidebar.order in {path}")
            path.write_text(updated, encoding="utf-8")

        article_path.write_text(article_text(data), encoding="utf-8")

        index_path = directory / "index.md"
        index = index_path.read_text(encoding="utf-8")
        marker = "\n### ["
        pos = index.find(marker)
        if pos == -1:
            raise SystemExit(f"Could not find first article entry in {index_path}")
        entry = (
            f"\n### [{data['title']}](./2026/{SLUG}/)\n\n"
            f"{data['index_published']}\n\n"
            f"{data['index_summary']}\n"
        )
        index_path.write_text(index[:pos] + entry + index[pos:], encoding="utf-8")

def verify_dist(root: Path) -> None:
    dist = root / "website/dist"
    if not dist.is_dir():
        raise SystemExit(f"Missing build output: {dist}")
    sitemap_text = "\n".join(
        path.read_text(encoding="utf-8", errors="ignore")
        for path in dist.rglob("sitemap*.xml")
    )
    for locale, data in LOCALES.items():
        parts = [] if locale == "root" else [locale]
        path = dist.joinpath(*parts, "typescript-news", "2026", SLUG, "index.html")
        if not path.is_file():
            raise SystemExit(f"Missing generated route: {path}")
        html = path.read_text(encoding="utf-8", errors="ignore")
        if "article:published_time" not in html or DATE not in html:
            raise SystemExit(f"Missing publication metadata in {path}")
        if data["description"] not in html:
            raise SystemExit(f"Missing description in {path}")
        route = "/".join(parts + ["typescript-news", "2026", SLUG])
        if route not in sitemap_text:
            raise SystemExit(f"Missing sitemap route: {route}")
    print(f"Verified generated article routes and metadata across {len(LOCALES)} languages.")

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", type=Path, default=Path(__file__).resolve().parents[2])
    parser.add_argument("--verify-dist", action="store_true")
    args = parser.parse_args()
    root = args.repo_root.resolve()
    if args.verify_dist:
        verify_dist(root)
    else:
        apply(root)
        print(f"Prepared {SLUG} across {len(LOCALES)} languages.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
