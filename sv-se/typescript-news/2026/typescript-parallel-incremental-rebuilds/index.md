# TypeScript snabbar upp inkrementella byggen med parallella kontroller


En sammanslagen kompilatorändring gör att signaturer för filer som påverkas av ändringar i ofta importerade moduler kontrolleras parallellt. Tidigare gjordes detta sekventiellt.

## Vad har ändrats

I författarens test minskade byggtiden efter en ren kommentarändring från **3,4 till 1,5 sekunder** på Linux med 32 kärnor. I ett n8n-paket minskade ett liknande fall från **5,4 till 4,5 sekunder**. Resultaten gäller dessa arbetslaster.

## Prestanda och begränsningar

Arbetet begränsas av `GOMAXPROCS`; vinsten beror på tillgängliga kontrollprocesser och beroenden. `isolatedModules` påverkas inte eftersom refererande filer inte gås igenom.

## Källa

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
