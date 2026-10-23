# Compilador nativo do TypeScript reduz uso de memória com otimizações no verificador de tipos


**Publicado:** 14 de outubro de 2026

A Microsoft incorporou várias otimizações de memória ao compilador nativo do TypeScript. Elas reduzem a memória retida pelas estruturas internas do verificador de tipos sem alterar a sintaxe do TypeScript.

## O que mudou

* Os blocos de arenas tipadas agora visam cerca de 512 bytes, em vez de conter 256 objetos fixos. No benchmark do VS Code apresentado na mudança, o heap retido caiu 8.54% e a varredura do coletor de lixo caiu 10.44%, enquanto os eventos de alocação aumentaram 13.91%.
* Assinaturas opcionais, informações de índice e caches do construtor de nós saem dos registros `StructuredType`, reduzindo seu tamanho de 144 para 88 bytes.
* Nós de tipo resolvidos e assinaturas usam armazenamentos paginados de vínculos de nós quando há IDs estáveis, com fallback para um mapa nos demais casos.

## Disponibilidade

As mudanças foram integradas em 14 de outubro de 2026. Os pull requests não identificam uma versão estável do npm que as contenha. Os resultados do benchmark se referem à mudança e à carga de trabalho medidas.

## Fonte

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
