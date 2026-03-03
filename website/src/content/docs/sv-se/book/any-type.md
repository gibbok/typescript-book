---
title: Any-typen
sidebar:
  order: 44
  label: 44. Any-typen
---


`any`-typen är en speciell typ (universell supertyp) som kan användas för att representera vilken typ av värde som helst (primitiver, objekt, arrayer, funktioner, fel, symboler). Den används ofta i situationer där typen av ett värde inte är känd vid kompilering, eller vid arbete med värden från externa API:er eller bibliotek som inte har TypeScript-typningar.

Genom att använda `any`-typen indikerar du för TypeScript-kompilatorn att värden ska representeras utan några begränsningar. För att maximera typsäkerheten i din kod, överväg följande:

* Begränsa användningen av `any` till specifika fall där typen verkligen är okänd.
* Returnera inte `any`-typer från en funktion, eftersom detta försvagar typsäkerheten i kod som använder den.
* Istället för `any`, använd `@ts-ignore` om du behöver tysta kompilatorn.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

