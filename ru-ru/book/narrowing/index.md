# Сужение типов



Сужение типов в TypeScript — это процесс уточнения типа переменной внутри условного блока. Это полезно при работе с типами-объединениями, где переменная может иметь более одного типа.

TypeScript распознаёт несколько способов сужения типа:

### Защитники типа typeof

Защитник типа typeof — это особый защитник типа в TypeScript, который проверяет тип переменной на основе её встроенного типа JavaScript.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Сужение по истинности

Сужение по истинности в TypeScript проверяет, является ли значение переменной истинным или ложным в логическом контексте, и соответствующим образом сужает её тип.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Сужение по равенству

Сужение по равенству в TypeScript проверяет, равна ли переменная определённому значению, и соответствующим образом сужает её тип.

Оно используется совместно с инструкциями `switch` и операторами равенства, такими как `===`, `!==`, `==` и `!=`, для сужения типов.

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true;
        case 'error':
            return null;
    }
};
```

### Сужение с помощью оператора in

Сужение с помощью оператора `in` в TypeScript позволяет сузить тип переменной на основе наличия свойства в её типе.

```typescript
type Dog = {
    name: string;
    breed: string;
};

type Cat = {
    name: string;
    likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
    if ('breed' in pet) {
        return 'dog';
    } else {
        return 'cat';
    }
};
```

### Сужение с помощью instanceof

Сужение с помощью оператора `instanceof` в TypeScript позволяет сузить тип переменной на основе функции-конструктора, проверяя, является ли объект экземпляром определённого класса или интерфейса.

```typescript
class Square {
    constructor(public width: number) {}
}
class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
}
function area(shape: Square | Rectangle) {
    if (shape instanceof Square) {
        return shape.width * shape.width;
    } else {
        return shape.width * shape.height;
    }
}
const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square)); // 25
console.log(area(rectangle)); // 50
```

