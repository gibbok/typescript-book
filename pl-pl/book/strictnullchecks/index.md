# strictNullChecks



`strictNullChecks` to opcja kompilatora TypeScript wymuszająca ścisłe sprawdzanie wartości null. Gdy ta opcja jest włączona, do zmiennych i parametrów można przypisać `null` lub `undefined` tylko wtedy, gdy zostały jawnie zadeklarowane jako należące do tego typu przy użyciu typu unii `null` | `undefined`. Jeśli zmienna lub parametr nie zostały jawnie zadeklarowane jako dopuszczające null, TypeScript wygeneruje błąd, aby zapobiec potencjalnym błędom w czasie wykonywania.

