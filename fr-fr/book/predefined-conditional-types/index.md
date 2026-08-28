# Types conditionnels prédéfinis



En TypeScript, les types conditionnels prédéfinis sont des types conditionnels intégrés fournis par le langage. Ils sont conçus pour effectuer des transformations de types courantes en fonction des caractéristiques d'un type donné.

`Exclude<UnionType, ExcludedType>` : ce type supprime de Type tous les types qui sont assignables à ExcludedType.

`Extract<Type, Union>` : ce type extrait de Union tous les types qui sont assignables à Type.

`NonNullable<Type>` : ce type supprime null et undefined de Type.

`ReturnType<Type>` : ce type extrait le type de retour d'une fonction Type.

`Parameters<Type>` : ce type extrait les types des paramètres d'une fonction Type.

`Required<Type>` : ce type rend obligatoires toutes les propriétés de Type.

`Partial<Type>` : ce type rend facultatives toutes les propriétés de Type.

`Readonly<Type>` : ce type rend accessibles en lecture seule toutes les propriétés de Type.

