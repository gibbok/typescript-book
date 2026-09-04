# TypeScript 7.1 dodaje atrybuty importu do modułów ambient


**Opublikowano:** 1 września 2026 r.

Natywny kompilator TypeScript obsługuje teraz typy atrybutów importu w deklaracjach wzorcowych modułów ambient. Dzięki temu deklaracje mogą rozróżniać importy za pomocą atrybutów takich jak `type: 'css'` lub `type: 'text'`.

## Co się zmieniło

Gdy import zawiera atrybuty, TypeScript może rozwiązać go do pasującego wzorcowego modułu ambient. Dopasowanie wykorzystuje przypisywalność, a jeśli pasuje więcej deklaracji, TypeScript wybiera tę z najbardziej szczegółowym typem atrybutów.

Obecnie typy atrybutów w tych deklaracjach są ograniczone do zwykłych właściwości, których wartości mają typ literału łańcuchowego. Deklaracje z tym samym wzorcem i identycznymi typami atrybutów mogą się łączyć; różne typy pozostają oddzielne.

## Zgodność

Zmiana została scalona dla kamienia milowego TypeScript 7.1.0 Beta. Nie dodaje ona wbudowanych deklaracji importów CSS ani tekstowych do biblioteki standardowej, więc projekty i narzędzia nadal muszą definiować potrzebne moduły ambient.

## Źródło

Przeczytaj scalony pull request TypeScript: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
