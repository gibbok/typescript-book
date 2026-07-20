export type PlusEditionLocale = 'en' | 'zh-cn' | 'it-it' | 'pt-br' | 'sv-se' | 'bg-bg' | 'es-es';

const DEFAULT_LOCALE: PlusEditionLocale = 'en';

const LOCALE_BY_LANG: Readonly<Record<string, PlusEditionLocale>> = {
	en: 'en',
	'en-us': 'en',
	'en-gb': 'en',
	'zh-cn': 'zh-cn',
	'zh-hans': 'zh-cn',
	it: 'it-it',
	'it-it': 'it-it',
	pt: 'pt-br',
	'pt-br': 'pt-br',
	sv: 'sv-se',
	'sv-se': 'sv-se',
	bg: 'bg-bg',
	'bg-bg': 'bg-bg',
	es: 'es-es',
	'es-es': 'es-es',
};

export const PLUS_EDITION_BASE_PATH = '/typescript-book';
export const PLUS_EDITION_PATH = `${PLUS_EDITION_BASE_PATH}/plus-edition/`;

export const PLUS_EDITION_COVERS: Readonly<Record<PlusEditionLocale, string>> = {
	en: `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
	'zh-cn': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_zh_CN.webp`,
	'it-it': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_it_IT.webp`,
	'pt-br': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_pt_BR.webp`,
	'sv-se': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_sv_SE.webp`,
	'bg-bg': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_bg_BG.webp`,
	'es-es': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_es_ES.webp`,
};

export const PLUS_EDITION_COVER = PLUS_EDITION_COVERS.en;

export function getPlusEditionLocale(lang?: string): PlusEditionLocale {
	if (!lang) return DEFAULT_LOCALE;

	const normalized = lang.toLowerCase().replace('_', '-');
	return LOCALE_BY_LANG[normalized] ?? DEFAULT_LOCALE;
}

export function getPlusEditionPath(lang?: string) {
	const locale = getPlusEditionLocale(lang);
	return locale === DEFAULT_LOCALE ? PLUS_EDITION_PATH : `${PLUS_EDITION_BASE_PATH}/${locale}/plus-edition/`;
}

export function getPlusEditionCover(lang?: string) {
	return PLUS_EDITION_COVERS[getPlusEditionLocale(lang)];
}

export const PLUS_EDITION = {
	titles: {
		en: 'The Concise TypeScript Book Plus Edition: React and Real-World Patterns For TypeScript 7',
		it: 'The Concise TypeScript Book Plus Edition (Versione italiana): React e pattern pratici per TypeScript 7 (Italian Edition)',
	},
	editions: {
		en: {
			label: 'English edition',
			kindleAsin: 'B0H8RSXC57',
			paperbackAsin: 'B0H8TTP49G',
		},
		it: {
			label: 'Edizione italiana',
			kindleAsin: 'B0H95PLXHX',
			paperbackAsin: 'B0H96R5HZD',
		},
	},
} as const;

export const PLUS_EDITION_COPY = {
	en: {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React and Real-World Patterns For TypeScript 7',
		pageDescription:
			'The paid, expanded edition of The Concise TypeScript Book, with exclusive React guidance, real-world TypeScript patterns, and updated TypeScript 7 coverage. Available for Kindle and in paperback.',
		coverAlt: 'Cover of The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'New Plus Edition announcement',
			badge: 'New paid edition',
			strong: 'Master TypeScript 7',
			message: 'React + real-world patterns',
			action: 'Explore the Plus Edition',
		},
		home: {
			ariaLabel: 'Learn more about The Concise TypeScript Book Plus Edition',
			eyebrow: 'New paid edition · TypeScript 7',
			title: 'Put TypeScript to work in real projects',
			description:
				'The Plus Edition expands the free, open-source book with the practical material developers ask for most: React with TypeScript and reusable patterns for production code.',
			items: [
				['React with TypeScript:', 'components, props, hooks, events, refs, and scalable component patterns.'],
				['Real-world TypeScript patterns:', 'practical approaches for safer, clearer, maintainable applications.'],
				['TypeScript 7:', 'concise coverage from the foundations through advanced type-system techniques.'],
			],
			action: 'See what’s inside',
			availability: 'Available for Kindle and in paperback',
		},
		sidebar: {
			coverCta: 'Plus Edition cover',
			eyebrow: 'Plus Edition',
			title: 'Go beyond the free book',
			description: 'Exclusive React guidance and practical, real-world patterns, updated for TypeScript 7.',
			formats: 'Kindle and paperback',
			action: 'Explore the book',
			ariaLabel: 'Explore The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'The paid, expanded edition · Updated for TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'A concise, practical guide to TypeScript 7, expanded with exclusive chapters that connect the type system to the work you do every day.',
			primaryAction: 'Choose Kindle or paperback',
			secondaryAction: 'See what’s new',
			availability: 'English and Italian editions · Available worldwide through Amazon',
			introEyebrow: 'From understanding TypeScript to using it well',
			introTitle: 'New content built for real projects',
			introText:
				'The Plus Edition builds on the widely read, open-source The Concise TypeScript Book. It keeps the direct explanations and focused examples, then goes further with two substantial areas available only in this paid edition.',
			featureAriaLabel: 'Exclusive Plus Edition content',
			exclusiveContent: 'Exclusive Content',
			features: [
				{
					title: 'TypeScript with React',
					description:
						'Move confidently from basic component types to patterns that remain clear as a React application grows.',
					items: [
						'Components, props, children, and events',
						'Hooks, refs, and reusable abstractions',
						'Discriminated unions and generic components',
						'Practical patterns for safer component APIs',
					],
				},
				{
					title: 'Real-world patterns',
					description:
						'See how TypeScript’s advanced features combine to solve recurring application-design problems.',
					items: [
						'Expressive, maintainable domain types',
						'Safer boundaries and error handling',
						'Reusable type maps and factory patterns',
						'Techniques you can adapt to production code',
					],
				},
			],
			whyEyebrow: 'Concise by design',
			whyTitle: 'More practical depth, without the fluff',
			whyItems: [
				['Current', 'Updated for TypeScript 7, from essential language concepts to advanced type-system techniques.'],
				['Practical', 'Short explanations and focused examples designed to transfer directly to day-to-day development.'],
				['Useful at every level', 'A structured introduction for newer TypeScript developers and a fast reference for experienced engineers.'],
			],
			audienceEyebrow: 'Who it’s for',
			audienceTitle: 'Developers seeking clarity and practical use',
			audienceText:
				'Choose the Plus Edition if you want one focused resource for learning modern TypeScript, typing React effectively, and applying the language to realistic design problems. Familiarity with JavaScript helps, but deep TypeScript experience is not required.',
			trustEyebrow: 'Trusted by developers',
			trustTitle: 'Based on a popular open-source TypeScript book',
			trustText:
				'The free edition has 10,000+ GitHub stars and is used by many TypeScript developers. The Plus Edition is written by Simone Poggiali, bringing 20 years of international work experience to practical React guidance and real-world TypeScript patterns.',
		},
		amazon: {
			eyebrow: 'Choose your format',
			title: 'Get the Plus Edition on Amazon',
			editionLabel: 'Edition',
			kindle: 'Kindle edition',
			paperback: 'Paperback',
			buyOn: 'Buy on',
			detected: 'We’ll use your browser language and region to open the most relevant edition and Amazon store.',
		},
	},
	'zh-cn': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React 与 TypeScript 7 实战模式',
		pageDescription:
			'The Concise TypeScript Book 的付费扩展版，包含 React 指导、真实项目中的 TypeScript 模式，并更新到 TypeScript 7。提供 Kindle 和平装版。',
		coverAlt: 'The Concise TypeScript Book Plus Edition 封面',
		topBanner: {
			ariaLabel: '新版 Plus Edition 公告',
			badge: '新版付费版',
			strong: '掌握 TypeScript 7',
			message: 'React + 真实项目模式',
			action: '了解 Plus Edition',
		},
		home: {
			ariaLabel: '了解 The Concise TypeScript Book Plus Edition',
			eyebrow: '新版付费版 · TypeScript 7',
			title: '把 TypeScript 用到真实项目中',
			description:
				'Plus Edition 在免费开源书的基础上，加入开发者最常需要的实践内容：React 与 TypeScript，以及可复用的生产代码模式。',
			items: [
				['React 与 TypeScript：', '组件、props、hooks、事件、refs，以及可扩展的组件模式。'],
				['真实项目中的 TypeScript 模式：', '让应用更安全、更清晰、更易维护的实践方法。'],
				['TypeScript 7：', '从基础到高级类型系统技巧的精炼覆盖。'],
			],
			action: '查看新增内容',
			availability: '提供 Kindle 和平装版',
		},
		sidebar: {
			coverCta: 'Plus Edition 封面',
			eyebrow: 'Plus Edition',
			title: '超越免费版内容',
			description: '独家 React 指导和实用的真实项目模式，已更新到 TypeScript 7。',
			formats: 'Kindle 和平装版',
			action: '探索本书',
			ariaLabel: '探索 The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: '付费扩展版 · 已更新到 TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead: '一本精炼、实用的 TypeScript 7 指南，新增独家章节，把类型系统和日常开发工作连接起来。',
			primaryAction: '选择 Kindle 或平装版',
			secondaryAction: '查看新增内容',
			availability: '英文版和意大利文版 · 通过 Amazon 面向全球发售',
			introEyebrow: '从理解 TypeScript 到真正用好它',
			introTitle: '为真实项目编写的新内容',
			introText:
				'Plus Edition 基于广受欢迎的开源书 The Concise TypeScript Book。它保留直接的解释和聚焦的示例，并进一步加入两个只在付费版中提供的重要主题。',
			featureAriaLabel: 'Plus Edition 独家内容',
			exclusiveContent: '独家内容',
			features: [
				{
					title: 'TypeScript 与 React',
					description: '从基础组件类型到随着 React 应用增长仍然清晰的模式，逐步建立信心。',
					items: ['组件、props、children 和事件', 'Hooks、refs 和可复用抽象', '可辨识联合和泛型组件', '更安全组件 API 的实践模式'],
				},
				{
					title: '真实项目模式',
					description: '了解 TypeScript 的高级能力如何组合起来，解决反复出现的应用设计问题。',
					items: ['表达力强、可维护的领域类型', '更安全的边界和错误处理', '可复用的类型映射和工厂模式', '可迁移到生产代码的技巧'],
				},
			],
			whyEyebrow: '坚持精炼',
			whyTitle: '更多实践深度，没有冗余内容',
			whyItems: [
				['及时更新', '更新到 TypeScript 7，覆盖核心语言概念到高级类型系统技巧。'],
				['实用', '简短说明和聚焦示例，便于直接迁移到日常开发。'],
				['适合不同水平', '为新的 TypeScript 开发者提供结构化入门，也可作为有经验工程师的快速参考。'],
			],
			audienceEyebrow: '适合谁',
			audienceTitle: '想要清晰解释和实践用法的开发者',
			audienceText:
				'如果你想用一本聚焦的资源学习现代 TypeScript、有效地为 React 编写类型，并把语言能力应用到真实设计问题中，可以选择 Plus Edition。熟悉 JavaScript 会有帮助，但不需要深入的 TypeScript 经验。',
			trustEyebrow: '受到开发者信任',
			trustTitle: '基于一本受欢迎的开源 TypeScript 书',
			trustText:
				'免费版在 GitHub 上有 10,000+ stars，并被许多 TypeScript 开发者使用。Plus Edition 由 Simone Poggiali 编写，他拥有 20 年国际工作经验，并将这些经验用于实用的 React 指导和真实项目 TypeScript 模式。',
		},
		amazon: {
			eyebrow: '选择格式',
			title: '在 Amazon 获取 Plus Edition',
			editionLabel: '版本',
			kindle: 'Kindle 版',
			paperback: '平装版',
			buyOn: '在以下商店购买',
			detected: '我们会根据你的浏览器语言和地区打开最相关的版本和 Amazon 商店。',
		},
	},
	'it-it': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React e pattern pratici per TypeScript 7',
		pageDescription:
			"L'edizione a pagamento ed estesa di The Concise TypeScript Book, con contenuti esclusivi su React, pattern TypeScript reali e aggiornamento a TypeScript 7. Disponibile per Kindle e in versione cartacea.",
		coverAlt: 'Copertina di The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Annuncio della nuova Plus Edition',
			badge: 'Nuova edizione a pagamento',
			strong: 'Padroneggia TypeScript 7',
			message: 'React + pattern reali',
			action: 'Scopri la Plus Edition',
		},
		home: {
			ariaLabel: 'Scopri The Concise TypeScript Book Plus Edition',
			eyebrow: 'Nuova edizione a pagamento · TypeScript 7',
			title: 'Usa TypeScript in progetti reali',
			description:
				'La Plus Edition espande il libro gratuito e open source con i contenuti pratici più richiesti dagli sviluppatori: React con TypeScript e pattern riutilizzabili per codice di produzione.',
			items: [
				['React con TypeScript:', 'componenti, props, hook, eventi, refs e pattern scalabili per componenti.'],
				['Pattern TypeScript reali:', 'approcci pratici per applicazioni più sicure, chiare e manutenibili.'],
				['TypeScript 7:', 'una copertura concisa dalle basi alle tecniche avanzate del sistema di tipi.'],
			],
			action: "Guarda cosa c'è dentro",
			availability: 'Disponibile per Kindle e in versione cartacea',
		},
		sidebar: {
			coverCta: 'Copertina della Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Vai oltre il libro gratuito',
			description: 'Contenuti esclusivi su React e pattern pratici per progetti reali, aggiornati a TypeScript 7.',
			formats: 'Kindle e versione cartacea',
			action: 'Esplora il libro',
			ariaLabel: 'Esplora The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: "L'edizione a pagamento ed estesa · Aggiornata a TypeScript 7",
			title: PLUS_EDITION.titles.it,
			lead:
				'Una guida concisa e pratica a TypeScript 7, ampliata con capitoli esclusivi che collegano il sistema di tipi al lavoro quotidiano.',
			primaryAction: 'Scegli Kindle o cartaceo',
			secondaryAction: 'Scopri le novità',
			availability: 'Edizioni inglese e italiana · Disponibile in tutto il mondo tramite Amazon',
			introEyebrow: 'Dal capire TypeScript al saperlo usare bene',
			introTitle: 'Nuovi contenuti pensati per progetti reali',
			introText:
				'La Plus Edition si basa sul libro open source The Concise TypeScript Book, già letto da molti sviluppatori. Mantiene spiegazioni dirette ed esempi mirati, aggiungendo due aree sostanziali disponibili solo in questa edizione a pagamento.',
			featureAriaLabel: 'Contenuti esclusivi della Plus Edition',
			exclusiveContent: 'Contenuto esclusivo',
			features: [
				{
					title: 'TypeScript con React',
					description:
						'Passa con sicurezza dai tipi base dei componenti a pattern che restano chiari anche quando una applicazione React cresce.',
					items: [
						'Componenti, props, children ed eventi',
						'Hook, refs e astrazioni riutilizzabili',
						'Unioni discriminate e componenti generici',
						'Pattern pratici per API di componenti più sicure',
					],
				},
				{
					title: 'Pattern reali',
					description:
						'Scopri come le funzionalità avanzate di TypeScript si combinano per risolvere problemi ricorrenti di progettazione applicativa.',
					items: [
						'Tipi di dominio espressivi e manutenibili',
						'Confini più sicuri e gestione degli errori',
						'Mappe di tipi e factory pattern riutilizzabili',
						'Tecniche adattabili al codice di produzione',
					],
				},
			],
			whyEyebrow: 'Conciso per scelta',
			whyTitle: 'Più profondità pratica, senza superfluo',
			whyItems: [
				['Aggiornato', 'Aggiornato a TypeScript 7, dai concetti essenziali del linguaggio alle tecniche avanzate del sistema di tipi.'],
				['Pratico', 'Spiegazioni brevi ed esempi mirati, pensati per essere trasferiti direttamente nello sviluppo quotidiano.'],
				['Utile a ogni livello', 'Una introduzione strutturata per chi inizia con TypeScript e un riferimento rapido per sviluppatori esperti.'],
			],
			audienceEyebrow: 'A chi si rivolge',
			audienceTitle: 'Sviluppatori che cercano chiarezza e uso pratico',
			audienceText:
				'Scegli la Plus Edition se vuoi una risorsa mirata per imparare TypeScript moderno, tipizzare React in modo efficace e applicare il linguaggio a problemi realistici di progettazione. La familiarità con JavaScript aiuta, ma non serve una esperienza profonda con TypeScript.',
			trustEyebrow: 'Scelto dagli sviluppatori',
			trustTitle: 'Basato su un popolare libro TypeScript open source',
			trustText:
				'La versione gratuita ha 10.000+ star su GitHub ed è usata da molti sviluppatori TypeScript. La Plus Edition è scritta da Simone Poggiali, che porta 20 anni di esperienza internazionale in contenuti pratici su React e pattern TypeScript reali.',
		},
		amazon: {
			eyebrow: 'Scegli il formato',
			title: 'Acquista la Plus Edition su Amazon',
			editionLabel: 'Edizione',
			kindle: 'Edizione Kindle',
			paperback: 'Cartaceo',
			buyOn: 'Acquista su',
			detected: "Useremo la lingua e l'area geografica del browser per aprire l'edizione e lo store Amazon più adatti.",
		},
	},
	'pt-br': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React e padrões reais para TypeScript 7',
		pageDescription:
			'A edição paga e expandida de The Concise TypeScript Book, com orientação exclusiva sobre React, padrões reais de TypeScript e atualização para TypeScript 7. Disponível para Kindle e em brochura.',
		coverAlt: 'Capa de The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Anúncio da nova Plus Edition',
			badge: 'Nova edição paga',
			strong: 'Domine TypeScript 7',
			message: 'React + padrões reais',
			action: 'Conheça a Plus Edition',
		},
		home: {
			ariaLabel: 'Saiba mais sobre The Concise TypeScript Book Plus Edition',
			eyebrow: 'Nova edição paga · TypeScript 7',
			title: 'Use TypeScript em projetos reais',
			description:
				'A Plus Edition expande o livro gratuito e open source com o material prático que desenvolvedores mais pedem: React com TypeScript e padrões reutilizáveis para código de produção.',
			items: [
				['React com TypeScript:', 'componentes, props, hooks, eventos, refs e padrões escaláveis para componentes.'],
				['Padrões reais de TypeScript:', 'abordagens práticas para aplicações mais seguras, claras e fáceis de manter.'],
				['TypeScript 7:', 'cobertura concisa dos fundamentos às técnicas avançadas do sistema de tipos.'],
			],
			action: 'Veja o conteúdo',
			availability: 'Disponível para Kindle e em brochura',
		},
		sidebar: {
			coverCta: 'Capa da Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Vá além do livro gratuito',
			description: 'Orientação exclusiva sobre React e padrões práticos do mundo real, atualizados para TypeScript 7.',
			formats: 'Kindle e brochura',
			action: 'Explorar o livro',
			ariaLabel: 'Explorar The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'A edição paga e expandida · Atualizada para TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'Um guia conciso e prático de TypeScript 7, expandido com capítulos exclusivos que conectam o sistema de tipos ao trabalho do dia a dia.',
			primaryAction: 'Escolha Kindle ou brochura',
			secondaryAction: 'Veja as novidades',
			availability: 'Edições em inglês e italiano · Disponível mundialmente pela Amazon',
			introEyebrow: 'De entender TypeScript a usá-lo bem',
			introTitle: 'Novo conteúdo criado para projetos reais',
			introText:
				'A Plus Edition se baseia no livro open source The Concise TypeScript Book. Ela mantém explicações diretas e exemplos focados, e vai além com duas áreas substanciais disponíveis apenas nesta edição paga.',
			featureAriaLabel: 'Conteúdo exclusivo da Plus Edition',
			exclusiveContent: 'Conteúdo exclusivo',
			features: [
				{
					title: 'TypeScript com React',
					description:
						'Avance com confiança dos tipos básicos de componentes para padrões que continuam claros conforme uma aplicação React cresce.',
					items: [
						'Componentes, props, children e eventos',
						'Hooks, refs e abstrações reutilizáveis',
						'Uniões discriminadas e componentes genéricos',
						'Padrões práticos para APIs de componentes mais seguras',
					],
				},
				{
					title: 'Padrões reais',
					description:
						'Veja como os recursos avançados de TypeScript se combinam para resolver problemas recorrentes de design de aplicações.',
					items: [
						'Tipos de domínio expressivos e fáceis de manter',
						'Limites mais seguros e tratamento de erros',
						'Mapas de tipos e factory patterns reutilizáveis',
						'Técnicas adaptáveis ao código de produção',
					],
				},
			],
			whyEyebrow: 'Conciso por design',
			whyTitle: 'Mais profundidade prática, sem enrolação',
			whyItems: [
				['Atual', 'Atualizado para TypeScript 7, dos conceitos essenciais da linguagem às técnicas avançadas do sistema de tipos.'],
				['Prático', 'Explicações curtas e exemplos focados, pensados para uso direto no desenvolvimento diário.'],
				['Útil em todos os níveis', 'Uma introdução estruturada para novos desenvolvedores TypeScript e uma referência rápida para engenheiros experientes.'],
			],
			audienceEyebrow: 'Para quem é',
			audienceTitle: 'Desenvolvedores que buscam clareza e uso prático',
			audienceText:
				'Escolha a Plus Edition se você quer uma única fonte focada para aprender TypeScript moderno, tipar React de forma eficaz e aplicar a linguagem a problemas realistas de design. Conhecimento de JavaScript ajuda, mas experiência profunda em TypeScript não é necessária.',
			trustEyebrow: 'Confiado por desenvolvedores',
			trustTitle: 'Baseado em um livro TypeScript open source popular',
			trustText:
				'A edição gratuita tem mais de 10.000 stars no GitHub e é usada por muitos desenvolvedores TypeScript. A Plus Edition é escrita por Simone Poggiali, trazendo 20 anos de experiência internacional para orientação prática em React e padrões reais de TypeScript.',
		},
		amazon: {
			eyebrow: 'Escolha o formato',
			title: 'Compre a Plus Edition na Amazon',
			editionLabel: 'Edição',
			kindle: 'Edição Kindle',
			paperback: 'Brochura',
			buyOn: 'Comprar em',
			detected: 'Vamos usar o idioma e a região do navegador para abrir a edição e a loja Amazon mais relevantes.',
		},
	},
	'sv-se': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React och praktiska TypeScript 7-mönster',
		pageDescription:
			'Den betalda, utökade utgåvan av The Concise TypeScript Book, med exklusiv React-vägledning, verklighetsnära TypeScript-mönster och uppdatering för TypeScript 7. Finns för Kindle och som pocket.',
		coverAlt: 'Omslag för The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Meddelande om nya Plus Edition',
			badge: 'Ny betald utgåva',
			strong: 'Bemästra TypeScript 7',
			message: 'React + verkliga mönster',
			action: 'Utforska Plus Edition',
		},
		home: {
			ariaLabel: 'Läs mer om The Concise TypeScript Book Plus Edition',
			eyebrow: 'Ny betald utgåva · TypeScript 7',
			title: 'Använd TypeScript i riktiga projekt',
			description:
				'Plus Edition bygger ut den fria open source-boken med det praktiska material som utvecklare oftast efterfrågar: React med TypeScript och återanvändbara mönster för produktionskod.',
			items: [
				['React med TypeScript:', 'komponenter, props, hooks, events, refs och skalbara komponentmönster.'],
				['Verklighetsnära TypeScript-mönster:', 'praktiska sätt att bygga säkrare, tydligare och mer underhållbara applikationer.'],
				['TypeScript 7:', 'koncis genomgång från grunderna till avancerade tekniker i typsystemet.'],
			],
			action: 'Se innehållet',
			availability: 'Finns för Kindle och som pocket',
		},
		sidebar: {
			coverCta: 'Omslag för Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Gå längre än den fria boken',
			description: 'Exklusiv React-vägledning och praktiska verklighetsnära mönster, uppdaterade för TypeScript 7.',
			formats: 'Kindle och pocket',
			action: 'Utforska boken',
			ariaLabel: 'Utforska The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'Den betalda, utökade utgåvan · Uppdaterad för TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'En koncis och praktisk guide till TypeScript 7, utökad med exklusiva kapitel som kopplar typsystemet till arbetet du gör varje dag.',
			primaryAction: 'Välj Kindle eller pocket',
			secondaryAction: 'Se vad som är nytt',
			availability: 'Engelsk och italiensk utgåva · Tillgänglig världen över via Amazon',
			introEyebrow: 'Från att förstå TypeScript till att använda det väl',
			introTitle: 'Nytt innehåll byggt för riktiga projekt',
			introText:
				'Plus Edition bygger vidare på den väl lästa open source-boken The Concise TypeScript Book. Den behåller de direkta förklaringarna och fokuserade exemplen, och går sedan djupare inom två större områden som bara finns i den här betalda utgåvan.',
			featureAriaLabel: 'Exklusivt innehåll i Plus Edition',
			exclusiveContent: 'Exklusivt innehåll',
			features: [
				{
					title: 'TypeScript med React',
					description:
						'Gå tryggt från grundläggande komponenttyper till mönster som förblir tydliga när en React-applikation växer.',
					items: [
						'Komponenter, props, children och events',
						'Hooks, refs och återanvändbara abstraktioner',
						'Diskriminerade unioner och generiska komponenter',
						'Praktiska mönster för säkrare komponent-API:er',
					],
				},
				{
					title: 'Verkliga mönster',
					description:
						'Se hur TypeScripts avancerade funktioner kan kombineras för att lösa återkommande problem i applikationsdesign.',
					items: [
						'Uttrycksfulla och underhållbara domäntyper',
						'Säkrare gränser och felhantering',
						'Återanvändbara typkartor och factory patterns',
						'Tekniker du kan anpassa till produktionskod',
					],
				},
			],
			whyEyebrow: 'Koncis med avsikt',
			whyTitle: 'Mer praktiskt djup, utan utfyllnad',
			whyItems: [
				['Aktuell', 'Uppdaterad för TypeScript 7, från centrala språkkoncept till avancerade tekniker i typsystemet.'],
				['Praktisk', 'Korta förklaringar och fokuserade exempel utformade för att kunna användas direkt i vardaglig utveckling.'],
				['Användbar på alla nivåer', 'En strukturerad introduktion för nya TypeScript-utvecklare och en snabb referens för erfarna ingenjörer.'],
			],
			audienceEyebrow: 'Vem den är för',
			audienceTitle: 'Utvecklare som söker klarhet och praktisk användning',
			audienceText:
				'Välj Plus Edition om du vill ha en fokuserad resurs för att lära dig modern TypeScript, typa React effektivt och använda språket på realistiska designproblem. JavaScript-kunskap hjälper, men djup TypeScript-erfarenhet krävs inte.',
			trustEyebrow: 'Betrodd av utvecklare',
			trustTitle: 'Baserad på en populär open source-bok om TypeScript',
			trustText:
				'Den fria utgåvan har över 10 000 GitHub-stjärnor och används av många TypeScript-utvecklare. Plus Edition är skriven av Simone Poggiali, som bidrar med 20 års internationell arbetslivserfarenhet till praktisk React-vägledning och verklighetsnära TypeScript-mönster.',
		},
		amazon: {
			eyebrow: 'Välj format',
			title: 'Köp Plus Edition på Amazon',
			editionLabel: 'Utgåva',
			kindle: 'Kindle-utgåva',
			paperback: 'Pocket',
			buyOn: 'Köp på',
			detected: 'Vi använder webbläsarens språk och region för att öppna den mest relevanta utgåvan och Amazon-butiken.',
		},
	},
	'bg-bg': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React и практически TypeScript 7 модели',
		pageDescription:
			'Платеното разширено издание на The Concise TypeScript Book, с ексклузивни насоки за React, реални TypeScript модели и актуализация за TypeScript 7. Налично за Kindle и като книга с меки корици.',
		coverAlt: 'Корица на The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Съобщение за новата Plus Edition',
			badge: 'Ново платено издание',
			strong: 'Овладей TypeScript 7',
			message: 'React + реални модели',
			action: 'Разгледай Plus Edition',
		},
		home: {
			ariaLabel: 'Научи повече за The Concise TypeScript Book Plus Edition',
			eyebrow: 'Ново платено издание · TypeScript 7',
			title: 'Използвай TypeScript в реални проекти',
			description:
				'Plus Edition разширява безплатната open source книга с практичното съдържание, което разработчиците търсят най-често: React с TypeScript и преизползваеми модели за продукционен код.',
			items: [
				['React с TypeScript:', 'компоненти, props, hooks, събития, refs и мащабируеми модели за компоненти.'],
				['Реални TypeScript модели:', 'практични подходи за по-сигурни, по-ясни и по-лесни за поддръжка приложения.'],
				['TypeScript 7:', 'кратко покритие от основите до напреднали техники в типовата система.'],
			],
			action: 'Виж какво включва',
			availability: 'Налично за Kindle и като книга с меки корици',
		},
		sidebar: {
			coverCta: 'Корица на Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Продължи отвъд безплатната книга',
			description: 'Ексклузивни насоки за React и практични реални модели, актуализирани за TypeScript 7.',
			formats: 'Kindle и меки корици',
			action: 'Разгледай книгата',
			ariaLabel: 'Разгледай The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'Платеното разширено издание · Актуализирано за TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'Кратко и практично ръководство за TypeScript 7, разширено с ексклузивни глави, които свързват типовата система с ежедневната работа.',
			primaryAction: 'Избери Kindle или меки корици',
			secondaryAction: 'Виж новото съдържание',
			availability: 'Английско и италианско издание · Достъпно по целия свят чрез Amazon',
			introEyebrow: 'От разбиране на TypeScript към добро използване',
			introTitle: 'Ново съдържание за реални проекти',
			introText:
				'Plus Edition надгражда широко четената open source книга The Concise TypeScript Book. Тя запазва директните обяснения и фокусираните примери, след което добавя две съществени области, налични само в това платено издание.',
			featureAriaLabel: 'Ексклузивно съдържание на Plus Edition',
			exclusiveContent: 'Ексклузивно съдържание',
			features: [
				{
					title: 'TypeScript с React',
					description:
						'Премини уверено от базови типове за компоненти към модели, които остават ясни, когато React приложението расте.',
					items: [
						'Компоненти, props, children и събития',
						'Hooks, refs и преизползваеми абстракции',
						'Дискриминирани обединения и generic компоненти',
						'Практични модели за по-сигурни компонентни API',
					],
				},
				{
					title: 'Реални модели',
					description:
						'Виж как напредналите възможности на TypeScript се комбинират, за да решават повтарящи се проблеми в дизайна на приложения.',
					items: [
						'Изразителни и лесни за поддръжка домейн типове',
						'По-сигурни граници и обработка на грешки',
						'Преизползваеми type maps и factory patterns',
						'Техники, които можеш да адаптираш към продукционен код',
					],
				},
			],
			whyEyebrow: 'Кратко по замисъл',
			whyTitle: 'Повече практична дълбочина, без излишно съдържание',
			whyItems: [
				['Актуално', 'Актуализирано за TypeScript 7, от основни езикови концепции до напреднали техники в типовата система.'],
				['Практично', 'Кратки обяснения и фокусирани примери, създадени за директно приложение в ежедневната разработка.'],
				['Полезно на всяко ниво', 'Структурирано въведение за нови TypeScript разработчици и бърз справочник за опитни инженери.'],
			],
			audienceEyebrow: 'За кого е',
			audienceTitle: 'Разработчици, които търсят яснота и практична употреба',
			audienceText:
				'Избери Plus Edition, ако искаш един фокусиран ресурс за изучаване на съвременен TypeScript, ефективно типизиране на React и прилагане на езика към реалистични дизайн проблеми. Познаването на JavaScript помага, но не е нужна дълбока TypeScript експертиза.',
			trustEyebrow: 'Доверено от разработчици',
			trustTitle: 'Базирано на популярна open source TypeScript книга',
			trustText:
				'Безплатното издание има над 10 000 GitHub звезди и се използва от много TypeScript разработчици. Plus Edition е написана от Simone Poggiali, който влага 20 години международен професионален опит в практични React насоки и реални TypeScript модели.',
		},
		amazon: {
			eyebrow: 'Избери формат',
			title: 'Вземи Plus Edition от Amazon',
			editionLabel: 'Издание',
			kindle: 'Kindle издание',
			paperback: 'Меки корици',
			buyOn: 'Купи от',
			detected: 'Ще използваме езика и региона на браузъра, за да отворим най-подходящото издание и Amazon магазин.',
		},
	},
	'es-es': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React y patrones prácticos para TypeScript 7',
		pageDescription:
			'La edición ampliada y de pago de The Concise TypeScript Book, con contenido exclusivo sobre React, patrones reales de TypeScript y actualización a TypeScript 7. Disponible para Kindle y en tapa blanda.',
		coverAlt: 'Portada de The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Anuncio de la nueva Plus Edition',
			badge: 'Nueva edición de pago',
			strong: 'Domina TypeScript 7',
			message: 'React + patrones reales',
			action: 'Explora la Plus Edition',
		},
		home: {
			ariaLabel: 'Más información sobre The Concise TypeScript Book Plus Edition',
			eyebrow: 'Nueva edición de pago · TypeScript 7',
			title: 'Lleva TypeScript a proyectos reales',
			description:
				'La Plus Edition amplía el libro gratuito y open source con el material práctico que más piden los desarrolladores: React con TypeScript y patrones reutilizables para código de producción.',
			items: [
				['React con TypeScript:', 'componentes, props, hooks, eventos, refs y patrones escalables para componentes.'],
				['Patrones reales de TypeScript:', 'enfoques prácticos para aplicaciones más seguras, claras y mantenibles.'],
				['TypeScript 7:', 'cobertura concisa desde los fundamentos hasta técnicas avanzadas del sistema de tipos.'],
			],
			action: 'Ver el contenido',
			availability: 'Disponible para Kindle y en tapa blanda',
		},
		sidebar: {
			coverCta: 'Portada de la Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Ve más allá del libro gratuito',
			description: 'Guía exclusiva sobre React y patrones prácticos del mundo real, actualizados para TypeScript 7.',
			formats: 'Kindle y tapa blanda',
			action: 'Explorar el libro',
			ariaLabel: 'Explorar The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'La edición ampliada y de pago · Actualizada para TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'Una guía concisa y práctica de TypeScript 7, ampliada con capítulos exclusivos que conectan el sistema de tipos con el trabajo diario.',
			primaryAction: 'Elige Kindle o tapa blanda',
			secondaryAction: 'Ver novedades',
			availability: 'Ediciones en inglés e italiano · Disponible en todo el mundo a través de Amazon',
			introEyebrow: 'De entender TypeScript a usarlo bien',
			introTitle: 'Nuevo contenido creado para proyectos reales',
			introText:
				'La Plus Edition se basa en el libro open source The Concise TypeScript Book, leído por muchos desarrolladores. Mantiene las explicaciones directas y los ejemplos concretos, y añade dos áreas importantes disponibles solo en esta edición de pago.',
			featureAriaLabel: 'Contenido exclusivo de la Plus Edition',
			exclusiveContent: 'Contenido exclusivo',
			features: [
				{
					title: 'TypeScript con React',
					description:
						'Avanza con confianza desde tipos básicos de componentes hasta patrones que siguen siendo claros cuando una aplicación React crece.',
					items: [
						'Componentes, props, children y eventos',
						'Hooks, refs y abstracciones reutilizables',
						'Uniones discriminadas y componentes genéricos',
						'Patrones prácticos para API de componentes más seguras',
					],
				},
				{
					title: 'Patrones reales',
					description:
						'Mira cómo las funciones avanzadas de TypeScript se combinan para resolver problemas recurrentes de diseño de aplicaciones.',
					items: [
						'Tipos de dominio expresivos y mantenibles',
						'Límites más seguros y gestión de errores',
						'Mapas de tipos y factory patterns reutilizables',
						'Técnicas que puedes adaptar a código de producción',
					],
				},
			],
			whyEyebrow: 'Conciso por diseño',
			whyTitle: 'Más profundidad práctica, sin relleno',
			whyItems: [
				['Actual', 'Actualizado para TypeScript 7, desde conceptos esenciales del lenguaje hasta técnicas avanzadas del sistema de tipos.'],
				['Práctico', 'Explicaciones breves y ejemplos concretos pensados para trasladarse directamente al desarrollo diario.'],
				['Útil en todos los niveles', 'Una introducción estructurada para nuevos desarrolladores TypeScript y una referencia rápida para ingenieros con experiencia.'],
			],
			audienceEyebrow: 'Para quién es',
			audienceTitle: 'Desarrolladores que buscan claridad y uso práctico',
			audienceText:
				'Elige la Plus Edition si quieres un recurso enfocado para aprender TypeScript moderno, tipar React de forma efectiva y aplicar el lenguaje a problemas de diseño realistas. Conocer JavaScript ayuda, pero no se requiere experiencia profunda con TypeScript.',
			trustEyebrow: 'Con la confianza de desarrolladores',
			trustTitle: 'Basado en un libro open source popular sobre TypeScript',
			trustText:
				'La edición gratuita tiene más de 10.000 estrellas en GitHub y la usan muchos desarrolladores TypeScript. La Plus Edition está escrita por Simone Poggiali, que aporta 20 años de experiencia internacional a una guía práctica de React y patrones reales de TypeScript.',
		},
		amazon: {
			eyebrow: 'Elige el formato',
			title: 'Consigue la Plus Edition en Amazon',
			editionLabel: 'Edición',
			kindle: 'Edición Kindle',
			paperback: 'Tapa blanda',
			buyOn: 'Comprar en',
			detected: 'Usaremos el idioma y la región del navegador para abrir la edición y la tienda de Amazon más relevantes.',
		},
	},
} as const;

export function getPlusEditionCopy(lang?: string) {
	return PLUS_EDITION_COPY[getPlusEditionLocale(lang)];
}

/** Amazon domains keyed by browser region. Unlisted regions use Amazon.com. */
export const AMAZON_DOMAINS_BY_REGION: Readonly<Record<string, string>> = {
	AE: 'amazon.ae',
	AT: 'amazon.de',
	AU: 'amazon.com.au',
	BE: 'amazon.com.be',
	BR: 'amazon.com.br',
	CA: 'amazon.ca',
	CH: 'amazon.de',
	CZ: 'amazon.de',
	DE: 'amazon.de',
	DK: 'amazon.de',
	ES: 'amazon.es',
	FI: 'amazon.de',
	FR: 'amazon.fr',
	GB: 'amazon.co.uk',
	IE: 'amazon.ie',
	IN: 'amazon.in',
	IT: 'amazon.it',
	JP: 'amazon.co.jp',
	MX: 'amazon.com.mx',
	NL: 'amazon.nl',
	NO: 'amazon.se',
	NZ: 'amazon.com.au',
	PL: 'amazon.pl',
	PT: 'amazon.es',
	SA: 'amazon.sa',
	SE: 'amazon.se',
	SG: 'amazon.sg',
	TR: 'amazon.com.tr',
	US: 'amazon.com',
};
