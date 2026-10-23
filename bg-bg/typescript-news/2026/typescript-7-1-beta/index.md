# TypeScript 7.1 Beta добавя модулни API и поддръжка на ES2026


**Публикувано:** 20 октомври 2026 г.

Microsoft пусна TypeScript 7.1 Beta с нови нативни API за компилатора и поддръжка на JavaScript функционалности. За да изпробвате бета версията:

```shell
npm install -D typescript@beta
```

## Какво се промени

* `--target es2026` и `--lib es2026` вече се поддържат като стабилни опции с обновени декларации на стандартната библиотека.
* Новите входни точки за API включват `typescript/sync`, `typescript/async`, `typescript/fs` и `typescript/ast`. Обектите `API` и `Program` трябва да се освобождават, например чрез `using`.
* Импортите във фаза source (`import source` и `import.source()`) поддържат обекти за изходния модул, включително за WebAssembly, при подходящи настройки на `--module` и `esnext`.
* Content mapper-ите позволяват обработка на вграден TypeScript във файлове като `.vue` и `.svelte`. Изпълнението от командния ред изисква `--runExternalCode`.
* Според публикуваните от Microsoft тестове компилациите са по-бързи и използват по-малко памет от TypeScript 7.0.

## Наличност

Това е бета версия, а не стабилно издание. Проверете съвместимостта на рамките и инструментите преди обновяване. Поддръжката на import атрибути в ambient модули е разгледана в отделна новина.

## Източник

Прочетете официалното съобщение: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
