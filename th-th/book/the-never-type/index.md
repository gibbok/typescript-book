# ชนิด never



เมื่อตัวแปรถูกจำกัดให้เป็นชนิดที่ไม่สามารถมีค่าใด ๆ ได้ คอมไพเลอร์ TypeScript จะอนุมานว่าตัวแปรนั้นต้องเป็นชนิด `never` เนื่องจากชนิด never ใช้แทนค่าที่ไม่มีทางถูกสร้างขึ้นได้

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val has type never here because it can never be anything other than a string or a number
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

