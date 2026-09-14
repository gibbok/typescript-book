# Předdefinované podmíněné typy



Předdefinované podmíněné typy v TypeScriptu jsou vestavěné podmíněné typy poskytované jazykem. Jsou navrženy k provádění běžných transformací typů na základě vlastností daného typu.

`Exclude<UnionType, ExcludedType>`: Tento typ odstraní z Type všechny typy, které jsou přiřaditelné k ExcludedType.

`Extract<Type, Union>`: Tento typ extrahuje z Union všechny typy, které jsou přiřaditelné k Type.

`NonNullable<Type>`: Tento typ odstraní z Type null a undefined.

`ReturnType<Type>`: Tento typ extrahuje návratový typ funkce Type.

`Parameters<Type>`: Tento typ extrahuje typy parametrů funkce Type.

`Required<Type>`: Tento typ nastaví všechny vlastnosti v Type jako povinné.

`Partial<Type>`: Tento typ nastaví všechny vlastnosti v Type jako volitelné.

`Readonly<Type>`: Tento typ nastaví všechny vlastnosti v Type jako pouze pro čtení.

