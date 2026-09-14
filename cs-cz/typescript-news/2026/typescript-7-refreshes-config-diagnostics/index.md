# TypeScript 7 obnovuje diagnostiku konfigurace po změnách souborů


**Zveřejněno:** 30. července 2026

Microsoft sloučil opravu, která obnovuje diagnostiku konfiguračních souborů v nativní jazykové službě TypeScriptu po změně sledovaného souboru `tsconfig.json` nebo `jsconfig.json`.

## Co se změnilo

Diagnostika konfiguračních souborů se zveřejňuje během aktualizace snapshotu jazykové služby. Dříve změna sledovaného konfiguračního souboru naplánovala obnovení diagnostiky, ale nenaplánovala aktualizaci snapshotu. Diagnostika nových chyb konfigurace tak mohla zůstat neaktuální, dokud editor nevyslal další požadavek, který snapshot aktualizoval.

Jazyková služba nyní rozpoznává změny sledovaných konfiguračních souborů a plánuje aktualizaci snapshotu s odkladem pomocí debounce. Tím znovu zveřejní odesílanou diagnostiku bez závislosti na následném požadavku editoru.

## Proč je to důležité

Když editor nebo externí nástroj změní sledovaný soubor `tsconfig.json` nebo `jsconfig.json`, nativní jazyková služba dokáže ohlásit aktualizované chyby konfigurace pouze na základě události sledování souborů. Regresní test toto chování ověřuje pomocí neplatné hodnoty `target`.

## Dostupnost

Změna byla sloučena do nativního kódu TypeScriptu po vydání TypeScriptu 7.0. Zdroj neuvádí stabilní verzi npm, která ji obsahuje, proto si zkontrolujte poznámky k vydání nainstalované verze, než se na tuto opravu spolehnete.

## Zdroj

Přečtěte si oficiální změnu: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
