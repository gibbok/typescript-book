# Triple-Slash-Direktiven



Triple-Slash-Direktiven sind spezielle Kommentare, die dem Compiler Anweisungen dazu geben, wie eine Datei verarbeitet werden soll. Diese Direktiven beginnen mit drei aufeinanderfolgenden Schrägstrichen (`///`), stehen üblicherweise am Anfang einer TypeScript-Datei und haben keine Auswirkungen auf das Laufzeitverhalten.

Triple-Slash-Direktiven werden verwendet, um auf externe Abhängigkeiten zu verweisen, das Verhalten beim Laden von Modulen festzulegen, bestimmte Compilerfunktionen zu aktivieren oder zu deaktivieren und vieles mehr. Einige Beispiele:

Verweisen auf eine Deklarationsdatei:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Angeben des Modulformats:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Aktivieren von Compileroptionen, im folgenden Beispiel der Strict-Modus:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

