# TypeScript 7 añade un ámbito de búsqueda para los símbolos del espacio de trabajo


**Publicado:** 7 de agosto de 2026

Microsoft ha integrado un ámbito de búsqueda de símbolos del espacio de trabajo en el servicio de lenguaje nativo de TypeScript.

## Qué ha cambiado

La nueva preferencia `workspaceSymbols.scope` tiene dos valores. `allOpenProjects` es el valor predeterminado y busca símbolos en todos los proyectos abiertos. `currentProject` limita la búsqueda a los proyectos que contienen el documento proporcionado.

La extensión nativa de VS Code ahora añade un documento TypeScript o JavaScript compatible a las solicitudes `workspace/symbol`. Da prioridad al documento activo y, si no está disponible, usa otro documento compatible abierto. El servicio de lenguaje usa ese documento solo cuando `workspaceSymbols.scope` es `currentProject`; de lo contrario, mantiene la búsqueda en todos los proyectos abiertos.

## Por qué es importante

En un espacio de trabajo que contiene varios proyectos con símbolos de nombres similares, `currentProject` puede limitar los resultados al proyecto pertinente. El valor predeterminado conserva el comportamiento existente, por lo que el cambio es opcional.

## Disponibilidad

El cambio se integró en el código nativo de TypeScript después de TypeScript 7.0. La fuente no identifica una versión estable de npm que lo incluya, así que consulta las notas de la versión instalada antes de depender de la configuración.
