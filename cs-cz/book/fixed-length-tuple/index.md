# N-tice s pevnou délkou



N-tice s pevnou délkou je konkrétní druh n-tice, který vynucuje pevný počet prvků určitých typů a po definování neumožňuje žádné změny délky n-tice.

N-tice s pevnou délkou jsou užitečné, když potřebujete reprezentovat kolekci hodnot s konkrétním počtem prvků a konkrétními typy a chcete zajistit, aby délku a typy n-tice nebylo možné neúmyslně změnit.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

