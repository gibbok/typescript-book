---
title: Fördefinierade villkorliga typer
sidebar:
  order: 42
  label: 42. Fördefinierade villkorliga typer
---


I TypeScript är fördefinierade villkorliga typer inbyggda villkorliga typer som tillhandahålls av språket. De är utformade för att utföra vanliga typtransformationer baserade på egenskaperna hos en given typ.

`Exclude<UnionType, ExcludedType>`: Denna typ tar bort alla typer från Type som kan tilldelas till ExcludedType.

`Extract<Type, Union>`: Denna typ extraherar alla typer från Union som kan tilldelas till Type.

`NonNullable<Type>`: Denna typ tar bort null och undefined från Type.

`ReturnType<Type>`: Denna typ extraherar returtypen av en funktionstyp Type.

`Parameters<Type>`: Denna typ extraherar parametertyperna av en funktionstyp Type.

`Required<Type>`: Denna typ gör alla egenskaper i Type obligatoriska.

`Partial<Type>`: Denna typ gör alla egenskaper i Type valfria.

`Readonly<Type>`: Denna typ gör alla egenskaper i Type skrivskyddade.

