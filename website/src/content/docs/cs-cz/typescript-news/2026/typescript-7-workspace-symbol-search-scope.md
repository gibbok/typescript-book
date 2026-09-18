---
title: TypeScript 7 přidává rozsah vyhledávání symbolů v pracovním prostoru
description: Nativní jazyková služba přidává nastavení, které dokáže omezit vyhledávání symbolů v pracovním prostoru na aktuální projekt.
lastUpdated: 2026-08-07
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-07'
---

**Zveřejněno:** 7. srpna 2026

Microsoft sloučil možnost nastavit rozsah vyhledávání symbolů v pracovním prostoru pro nativní jazykovou službu TypeScriptu.

## Co se změnilo

Nová předvolba `workspaceSymbols.scope` má dvě hodnoty. Výchozí hodnota `allOpenProjects` vyhledává symboly ve všech otevřených projektech. Hodnota `currentProject` omezuje vyhledávání na projekty, které obsahují předaný dokument.

Nativní rozšíření pro VS Code nyní přidává do požadavků `workspace/symbol` podporovaný dokument TypeScriptu nebo JavaScriptu. Upřednostňuje aktivní dokument a jinak použije některý otevřený podporovaný dokument. Jazyková služba tento dokument používá pouze tehdy, když má `workspaceSymbols.scope` hodnotu `currentProject`; jinak zachovává vyhledávání ve všech otevřených projektech.

## Proč je to důležité

V pracovním prostoru obsahujícím více projektů s podobně pojmenovanými symboly dokáže `currentProject` omezit sadu výsledků na příslušný projekt. Výchozí hodnota zachovává stávající chování, takže změnu je nutné výslovně zapnout.

## Dostupnost

Změna byla sloučena do nativního kódu TypeScriptu po TypeScriptu 7.0. Zdroj neuvádí stabilní verzi npm, která ji obsahuje, proto si zkontrolujte poznámky k vydání nainstalované verze, než se na toto nastavení spolehnete.
