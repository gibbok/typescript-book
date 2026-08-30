# Vordefinierte bedingte Typen



Vordefinierte bedingte Typen sind in TypeScript integrierte bedingte Typen, die von der Sprache bereitgestellt werden. Sie sind dafür vorgesehen, gängige Typtransformationen anhand der Eigenschaften eines bestimmten Typs durchzuführen.

`Exclude<UnionType, ExcludedType>`: Dieser Typ entfernt alle Typen aus Type, die ExcludedType zugewiesen werden können.

`Extract<Type, Union>`: Dieser Typ extrahiert alle Typen aus Union, die Type zugewiesen werden können.

`NonNullable<Type>`: Dieser Typ entfernt null und undefined aus Type.

`ReturnType<Type>`: Dieser Typ extrahiert den Rückgabetyp einer Funktion Type.

`Parameters<Type>`: Dieser Typ extrahiert die Parametertypen einer Funktion Type.

`Required<Type>`: Dieser Typ macht alle Eigenschaften in Type erforderlich.

`Partial<Type>`: Dieser Typ macht alle Eigenschaften in Type optional.

`Readonly<Type>`: Dieser Typ macht alle Eigenschaften in Type schreibgeschützt.

