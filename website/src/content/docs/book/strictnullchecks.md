---
title: strictNullChecks
sidebar:
  order: 18
  label: 18. strictNullChecks
---


`strictNullChecks` is a TypeScript compiler option that enforces strict null checking. When this option is enabled, variables and parameters can only be assigned `null` or `undefined` if they have been explicitly declared to be of that type using the union type `null` | `undefined`. If a variable or parameter is not explicitly declared as nullable, TypeScript will generate an error to prevent potential runtime errors.

