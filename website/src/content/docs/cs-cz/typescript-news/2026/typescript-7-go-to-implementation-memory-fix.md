---
title: TypeScript 7 zlepšuje využití paměti funkce Go to Implementation
description: Oprava nativní jazykové služby zabraňuje kvadratickému růstu spotřeby paměti při hledání implementací ve velkých projektech s hluboce vnořenými typy.
lastUpdated: 2026-07-30
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Zveřejněno:** 30. července 2026

Microsoft sloučil opravu škálování spotřeby paměti funkce Go to Implementation v nativní jazykové službě TypeScriptu.

## Co se změnilo

Jazyková služba při hledání implementací používá pracovní seznam zpracovávaný prohledáváním do šířky. U členu rozhraní s mnoha implementacemi mohlo opakované prohledávání celého programu znovu vracet stejné reference. Uchovávané reference, práce ve frontě a skupiny výsledků proto mohly růst kvadraticky a vyčerpat paměť ve velkých projektech s hluboce vnořenými typy.

Oprava odstraňuje duplicitní uzly referencí před jejich přidáním do pracovní fronty a zabraňuje uchovávání duplicitních definic symbolů. Regresní test kontroluje, že zdvojnásobení počtu implementací vede k přibližně lineárnímu růstu namísto kvadratického.

## Proč je to důležité

Funkce Go to Implementation nyní dokáže tento vzor zpracovat bez opakovaného uchovávání stejných interních referencí. Duplicity již byly z výsledné odpovědi editoru odstraňovány, takže změna se zaměřuje na skrytou spotřebu paměti a práci potřebnou k vytvoření této odpovědi.

## Dostupnost

Změna byla sloučena do nativního kódu TypeScriptu po vydání TypeScriptu 7.0. Zdroj neuvádí stabilní verzi npm obsahující tuto opravu, proto by si uživatelé měli zkontrolovat poznámky k vydání své nainstalované verze, než se na ni spolehnou.

## Zdroj

Přečtěte si oficiální změnu: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
