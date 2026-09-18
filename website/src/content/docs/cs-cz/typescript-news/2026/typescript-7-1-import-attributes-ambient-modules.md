---
title: TypeScript 7.1 přidává atributy importu do ambientních modulů
description: TypeScript 7.1 dokáže přiřazovat deklarace ambientních modulů se vzorem podle atributů importu, což umožňuje typování modulů zohledňující atributy.
lastUpdated: 2026-09-01
sidebar:
    order: 3
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-01'
---

**Zveřejněno:** 1. září 2026

Nativní kompilátor TypeScriptu nyní podporuje typy atributů importu v deklaracích ambientních modulů se vzorem. Deklarace tak mohou rozlišovat importy podle atributů, jako jsou `type: 'css'` nebo `type: 'text'`.

## Co se změnilo

Pokud import obsahuje atributy, TypeScript jej dokáže vyhodnotit vůči odpovídajícímu ambientnímu modulu se vzorem. Při hledání shody se používá přiřaditelnost, a pokud odpovídá více deklarací, TypeScript zvolí deklaraci s nejkonkrétnějším typem atributů.

Typy atributů v těchto deklaracích jsou zatím omezeny na běžné vlastnosti, jejichž hodnotami jsou řetězcové literálové typy. Deklarace se stejným vzorem a totožnými typy atributů se mohou slučovat; deklarace s různými typy atributů zůstávají oddělené.

## Kompatibilita

Změna byla sloučena pro milník TypeScript 7.1.0 Beta. Nepřidává do standardní knihovny vestavěné deklarace importů CSS ani textu, takže projekty a nástroje stále definují ambientní moduly, které potřebují.

## Zdroj

Přečtěte si sloučený pull request TypeScriptu: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
