# TypeScript 7 mejora el uso de memoria de Ir a la implementación


**Publicado:** 30 de julio de 2026

Microsoft ha integrado una corrección de escalabilidad de memoria para Ir a la implementación en el servicio de lenguaje nativo de TypeScript.

## Qué ha cambiado

El servicio de lenguaje utiliza una lista de trabajo con recorrido en anchura para buscar implementaciones. Cuando un miembro de una interfaz tenía muchas implementaciones, las búsquedas repetidas en todo el programa podían devolver de nuevo las mismas referencias. Por tanto, las referencias conservadas, el trabajo en cola y los grupos de resultados podían crecer de forma cuadrática y agotar la memoria en proyectos grandes y con tipos complejos.

La corrección elimina los nodos de referencia duplicados antes de añadirlos a la cola de trabajo y evita conservar definiciones de símbolos duplicadas. Una prueba de regresión comprueba que duplicar el número de implementaciones produce un crecimiento aproximadamente lineal, en lugar de cuadrático.

## Por qué es importante

Ir a la implementación ahora puede procesar este patrón sin conservar repetidamente las mismas referencias internas. La respuesta final del editor ya estaba desduplicada, por lo que el cambio se centra en la memoria y el trabajo ocultos necesarios para producirla.

## Disponibilidad

El cambio se integró en el código nativo de TypeScript después del lanzamiento de TypeScript 7.0. La fuente no identifica una versión estable de npm que contenga la corrección, por lo que se deben consultar las notas de la versión instalada antes de depender de ella.

## Fuente

Lee el cambio oficial: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
