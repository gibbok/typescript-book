# التحقق من الشمول



التحقق من الشمول ميزة في TypeScript تضمن معالجة جميع الحالات الممكنة لاتحاد مميَّز في عبارة `switch` أو عبارة `if`.

```typescript
type Direction = 'up' | 'down';

const move = (direction: Direction) => {
    switch (direction) {
        case 'up':
            console.log('Moving up');
            break;
        case 'down':
            console.log('Moving down');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // This line will never be executed
    }
};
```

يُستخدم النوع `never` لضمان أن الحالة الافتراضية مستوفية لجميع الاحتمالات، وأن TypeScript سيُصدر خطأ إذا أُضيفت قيمة جديدة إلى النوع Direction من دون معالجتها في عبارة switch.

