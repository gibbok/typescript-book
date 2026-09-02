export type PlusEditionLocale = 'en' | 'zh-cn' | 'it-it' | 'pt-br' | 'sv-se' | 'bg-bg' | 'es-es' | 'ja-jp' | 'fr-fr' | 'ko-kr' | 'id-id' | 'de-de' | 'pl-pl' | 'tr-tr' | 'vi-vn' | 'th-th' | 'ru-ru';

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
	ja: 'ja-jp',
	'ja-jp': 'ja-jp',
	fr: 'fr-fr',
	'fr-fr': 'fr-fr',
	ko: 'ko-kr',
	'ko-kr': 'ko-kr',
	id: 'id-id',
	'id-id': 'id-id',
	de: 'de-de',
	'de-de': 'de-de',
	pl: 'pl-pl',
	'pl-pl': 'pl-pl',
	tr: 'tr-tr',
	'tr-tr': 'tr-tr',
	vi: 'vi-vn',
	'vi-vn': 'vi-vn',
	th: 'th-th',
	'th-th': 'th-th',
	ru: 'ru-ru',
	'ru-ru': 'ru-ru',
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
	'ja-jp': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_ja_JP.webp`,
	'fr-fr': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
	'ko-kr': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
	'id-id': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
	'de-de': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
	'pl-pl': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
	'tr-tr': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
	'vi-vn': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
	'th-th': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
	'ru-ru': `${PLUS_EDITION_BASE_PATH}/images/plus-edition-cover_en.webp`,
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
	'ru-ru': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React и практические паттерны для TypeScript 7',
		pageDescription:
			'Платное расширенное издание The Concise TypeScript Book с эксклюзивным руководством по React, практическими паттернами TypeScript и обновлённым материалом о TypeScript 7. Доступно для Kindle и в мягкой обложке.',
		coverAlt: 'Обложка The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Анонс нового издания Plus Edition',
			badge: 'Новое платное издание',
			strong: 'Освойте TypeScript 7',
			message: 'React + практические паттерны',
			action: 'Подробнее о Plus Edition',
		},
		home: {
			ariaLabel: 'Узнать больше о The Concise TypeScript Book Plus Edition',
			eyebrow: 'Новое платное издание · TypeScript 7',
			title: 'Применяйте TypeScript в реальных проектах',
			description:
				'Plus Edition дополняет бесплатную книгу с открытым исходным кодом наиболее востребованными практическими материалами: React с TypeScript и переиспользуемыми паттернами для продакшен-кода.',
			items: [
				['React с TypeScript:', 'компоненты, пропсы, хуки, события, рефы и масштабируемые паттерны компонентов.'],
				['Практические паттерны TypeScript:', 'практические подходы к созданию более безопасных, понятных и удобных в сопровождении приложений.'],
				['TypeScript 7:', 'краткое изложение от основ до продвинутых приёмов работы с системой типов.'],
			],
			action: 'Посмотреть содержание',
			availability: 'Доступно для Kindle и в мягкой обложке',
		},
		sidebar: {
			coverCta: 'Обложка Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Не ограничивайтесь бесплатной книгой',
			description: 'Эксклюзивное руководство по React и практические паттерны из реальных проектов, обновлённые для TypeScript 7.',
			formats: 'Kindle и мягкая обложка',
			action: 'Подробнее о книге',
			ariaLabel: 'Подробнее о The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'Платное расширенное издание · Обновлено для TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'Краткое практическое руководство по TypeScript 7, дополненное эксклюзивными главами, которые связывают систему типов с вашей повседневной работой.',
			primaryAction: 'Выбрать версию для Kindle или в мягкой обложке',
			secondaryAction: 'Посмотреть, что нового',
			availability: 'Издания на английском и итальянском языках · Доступны по всему миру через Amazon',
			introEyebrow: 'От понимания TypeScript к уверенному применению',
			introTitle: 'Новые материалы для реальных проектов',
			introText:
				'Plus Edition основано на широко читаемой книге The Concise TypeScript Book с открытым исходным кодом. Оно сохраняет прямые объяснения и сфокусированные примеры, а затем подробнее рассматривает две важные области, доступные только в этом платном издании.',
			featureAriaLabel: 'Эксклюзивные материалы Plus Edition',
			exclusiveContent: 'Эксклюзивные материалы',
			features: [
				{
					title: 'TypeScript в React',
					description:
						'Уверенно переходите от базовой типизации компонентов к паттернам, которые остаются понятными по мере роста React-приложения.',
					items: [
						'Компоненты, пропсы, дочерние элементы и события',
						'Хуки, рефы и переиспользуемые абстракции',
						'Дискриминированные объединения и обобщённые компоненты',
						'Практические паттерны для более безопасных компонентных API',
					],
				},
				{
					title: 'Практические паттерны',
					description:
						'Узнайте, как продвинутые возможности TypeScript сочетаются для решения повторяющихся задач проектирования приложений.',
					items: [
						'Выразительные и удобные в сопровождении типы предметной области',
						'Более безопасные границы и обработка ошибок',
						'Переиспользуемые отображения типов и паттерны фабрик',
						'Приёмы, которые можно адаптировать для продакшен-кода',
					],
				},
			],
			whyEyebrow: 'Краткость по замыслу',
			whyTitle: 'Больше практической глубины без лишнего',
			whyItems: [
				['Актуально', 'Обновлено для TypeScript 7: от основных концепций языка до продвинутых приёмов работы с системой типов.'],
				['Практично', 'Краткие объяснения и целенаправленные примеры, предназначенные для непосредственного применения в повседневной разработке.'],
				['Полезно на любом уровне', 'Структурированное введение для начинающих разработчиков TypeScript и удобный справочник для опытных инженеров.'],
			],
			audienceEyebrow: 'Для кого эта книга',
			audienceTitle: 'Для разработчиков, которым важны ясность и практическое применение',
			audienceText:
				'Выбирайте Plus Edition, если вам нужен единый специализированный ресурс для изучения современного TypeScript, эффективной типизации в React и применения языка к реальным задачам проектирования. Знание JavaScript будет полезно, но глубокий опыт работы с TypeScript не требуется.',
			trustEyebrow: 'Доверие разработчиков',
			trustTitle: 'На основе популярной книги о TypeScript с открытым исходным кодом',
			trustText:
				'У бесплатного издания более 10 000 звёзд на GitHub, и им пользуются многие разработчики TypeScript. Автор Plus Edition — Simone Poggiali, который воплотил 20-летний опыт международной работы в практическом руководстве по React и паттернах TypeScript для реальных проектов.',
		},
		amazon: {
			eyebrow: 'Выберите формат',
			title: 'Купить Plus Edition на Amazon',
			editionLabel: 'Издание',
			kindle: 'Издание для Kindle',
			paperback: 'Мягкая обложка',
			buyOn: 'Купить на',
			detected: 'Мы используем язык и регион вашего браузера, чтобы открыть наиболее подходящие издание и магазин Amazon.',
		},
	},
	'fr-fr': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React et patterns concrets pour TypeScript 7',
		pageDescription:
			'L’édition payante et enrichie de The Concise TypeScript Book, avec un guide exclusif consacré à React, des patterns TypeScript concrets et un contenu mis à jour pour TypeScript 7. Disponible sur Kindle et en broché.',
		coverAlt: 'Couverture de The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Annonce de la nouvelle Plus Edition',
			badge: 'Nouvelle édition payante',
			strong: 'Maîtrisez TypeScript 7',
			message: 'React + patterns concrets',
			action: 'Découvrir la Plus Edition',
		},
		home: {
			ariaLabel: 'En savoir plus sur The Concise TypeScript Book Plus Edition',
			eyebrow: 'Nouvelle édition payante · TypeScript 7',
			title: 'Mettez TypeScript au service de projets concrets',
			description:
				'La Plus Edition enrichit le livre gratuit et open source avec le contenu pratique le plus demandé par les développeurs : React avec TypeScript et des patterns réutilisables pour le code de production.',
			items: [
				['React avec TypeScript :', 'composants, props, hooks, événements, refs et patterns de composants évolutifs.'],
				['Patterns TypeScript concrets :', 'approches pratiques pour des applications plus sûres, plus claires et faciles à maintenir.'],
				['TypeScript 7 :', 'présentation concise, des fondamentaux aux techniques avancées du système de types.'],
			],
			action: 'Voir ce qu’elle contient',
			availability: 'Disponible sur Kindle et en broché',
		},
		sidebar: {
			coverCta: 'Couverture de la Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Allez au-delà du livre gratuit',
			description: 'Guide exclusif consacré à React et aux patterns pratiques issus de projets réels, mis à jour pour TypeScript 7.',
			formats: 'Kindle et broché',
			action: 'Découvrir le livre',
			ariaLabel: 'Découvrir The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'L’édition payante et enrichie · Mise à jour pour TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'Un guide concis et pratique de TypeScript 7, enrichi de chapitres exclusifs qui relient le système de types à votre travail quotidien.',
			primaryAction: 'Choisir Kindle ou broché',
			secondaryAction: 'Voir les nouveautés',
			availability: 'Éditions anglaise et italienne · Disponibles dans le monde entier sur Amazon',
			introEyebrow: 'De la compréhension de TypeScript à sa bonne utilisation',
			introTitle: 'Du nouveau contenu conçu pour des projets concrets',
			introText:
				'La Plus Edition s’appuie sur The Concise TypeScript Book, un livre open source largement lu. Elle conserve ses explications directes et ses exemples ciblés, puis approfondit deux domaines importants disponibles uniquement dans cette édition payante.',
			featureAriaLabel: 'Contenu exclusif de la Plus Edition',
			exclusiveContent: 'Contenu exclusif',
			features: [
				{
					title: 'TypeScript avec React',
					description:
						'Passez en toute confiance des types de composants élémentaires à des patterns qui restent clairs à mesure qu’une application React grandit.',
					items: [
						'Composants, props, children et événements',
						'Hooks, refs et abstractions réutilisables',
						'Unions discriminées et composants génériques',
						'Patterns pratiques pour des API de composants plus sûres',
					],
				},
				{
					title: 'Patterns concrets',
					description:
						'Découvrez comment les fonctionnalités avancées de TypeScript se combinent pour résoudre des problèmes récurrents de conception d’applications.',
					items: [
						'Types de domaine expressifs et faciles à maintenir',
						'Frontières plus sûres et gestion des erreurs',
						'Mappages de types et patterns de fabrique réutilisables',
						'Techniques adaptables au code de production',
					],
				},
			],
			whyEyebrow: 'Concis par conception',
			whyTitle: 'Plus de profondeur pratique, sans superflu',
			whyItems: [
				['À jour', 'Mis à jour pour TypeScript 7, des concepts essentiels du langage aux techniques avancées du système de types.'],
				['Pratique', 'Des explications courtes et des exemples ciblés conçus pour être directement transposés au développement quotidien.'],
				['Utile à tous les niveaux', 'Une introduction structurée pour les développeurs qui découvrent TypeScript et une référence rapide pour les ingénieurs expérimentés.'],
			],
			audienceEyebrow: 'À qui s’adresse ce livre',
			audienceTitle: 'Aux développeurs en quête de clarté et d’applications pratiques',
			audienceText:
				'Choisissez la Plus Edition si vous recherchez une ressource ciblée pour apprendre le TypeScript moderne, typer efficacement React et appliquer le langage à des problèmes de conception réalistes. La connaissance de JavaScript est utile, mais une expérience approfondie de TypeScript n’est pas nécessaire.',
			trustEyebrow: 'La confiance des développeurs',
			trustTitle: 'Basé sur un livre TypeScript open source populaire',
			trustText:
				'L’édition gratuite compte plus de 10 000 étoiles sur GitHub et est utilisée par de nombreux développeurs TypeScript. La Plus Edition est écrite par Simone Poggiali, qui met ses 20 ans d’expérience professionnelle internationale au service de conseils pratiques sur React et de patterns TypeScript concrets.',
		},
		amazon: {
			eyebrow: 'Choisissez votre format',
			title: 'Achetez la Plus Edition sur Amazon',
			editionLabel: 'Édition',
			kindle: 'Édition Kindle',
			paperback: 'Broché',
			buyOn: 'Acheter sur',
			detected: 'Nous utiliserons la langue et la région de votre navigateur pour ouvrir l’édition et la boutique Amazon les mieux adaptées.',
		},
	},
	'ja-jp': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — TypeScript 7 向け React と実践的なパターン',
		pageDescription:
			'The Concise TypeScript Book の有料拡張版です。本書限定の React ガイド、実際の開発で役立つ TypeScript パターン、TypeScript 7 に対応した最新内容を収録しています。Kindle 版とペーパーバック版があります。',
		coverAlt: 'The Concise TypeScript Book Plus Edition の表紙',
		topBanner: {
			ariaLabel: '新しい Plus Edition のお知らせ',
			badge: '新しい有料版',
			strong: 'TypeScript 7 をマスター',
			message: 'React + 実践的なパターン',
			action: 'Plus Edition の詳細を見る',
		},
		home: {
			ariaLabel: 'The Concise TypeScript Book Plus Edition の詳細を見る',
			eyebrow: '新しい有料版 · TypeScript 7',
			title: '実際のプロジェクトで TypeScript を活用する',
			description:
				'Plus Edition は、無料のオープンソース書籍に、開発者から特に求められている実践的な内容を追加しています。React と TypeScript、本番コードで再利用できるパターンを学べます。',
			items: [
				['React と TypeScript：', 'コンポーネント、props、hooks、イベント、refs、スケーラブルなコンポーネントパターン。'],
				['実践的な TypeScript パターン：', 'より安全で明確、かつ保守しやすいアプリケーションを実現する実践的なアプローチ。'],
				['TypeScript 7：', '基礎から高度な型システムのテクニックまでを簡潔に解説。'],
			],
			action: '収録内容を見る',
			availability: 'Kindle 版とペーパーバック版を提供',
		},
		sidebar: {
			coverCta: 'Plus Edition の表紙',
			eyebrow: 'Plus Edition',
			title: '無料版のその先へ',
			description: '本書限定の React ガイドと実際の開発で役立つパターンを収録し、TypeScript 7 に対応しています。',
			formats: 'Kindle 版とペーパーバック版',
			action: '本の詳細を見る',
			ariaLabel: 'The Concise TypeScript Book Plus Edition の詳細を見る',
		},
		landing: {
			heroEyebrow: '有料拡張版 · TypeScript 7 に対応',
			title: PLUS_EDITION.titles.en,
			lead:
				'TypeScript 7 を簡潔かつ実践的に学べるガイドです。型システムと日々の開発を結び付ける本書限定の章を追加しています。',
			primaryAction: 'Kindle またはペーパーバックを選ぶ',
			secondaryAction: '新しい内容を見る',
			availability: '英語版とイタリア語版 · Amazon を通じて世界中で購入可能',
			introEyebrow: 'TypeScript の理解から効果的な活用へ',
			introTitle: '実際のプロジェクト向けの新しい内容',
			introText:
				'Plus Edition は、広く読まれているオープンソースの The Concise TypeScript Book を基にしています。端的な説明と焦点を絞った例はそのままに、この有料版だけで読める二つの充実した分野を追加しています。',
			featureAriaLabel: 'Plus Edition の限定コンテンツ',
			exclusiveContent: '限定コンテンツ',
			features: [
				{
					title: 'React と TypeScript',
					description:
						'基本的なコンポーネントの型から、React アプリケーションが成長しても明確さを保てるパターンまで、着実に学べます。',
					items: [
						'コンポーネント、props、children、イベント',
						'Hooks、refs、再利用可能な抽象化',
						'判別可能なユニオン型とジェネリックコンポーネント',
						'より安全なコンポーネント API のための実践パターン',
					],
				},
				{
					title: '実践的なパターン',
					description:
						'TypeScript の高度な機能を組み合わせ、繰り返し発生するアプリケーション設計の問題を解決する方法を学びます。',
					items: [
						'表現力が高く保守しやすいドメイン型',
						'より安全な境界とエラー処理',
						'再利用可能な型マップとファクトリーパターン',
						'本番コードに応用できるテクニック',
					],
				},
			],
			whyEyebrow: '簡潔さを重視した設計',
			whyTitle: '余計な説明を省き、実践的な内容をさらに深く',
			whyItems: [
				['最新', '基本的な言語概念から高度な型システムのテクニックまで、TypeScript 7 に対応。'],
				['実践的', '日々の開発に直接活用できるように設計された、短い説明と焦点を絞った例。'],
				['あらゆるレベルで有用', 'TypeScript を始めたばかりの開発者向けの体系的な入門書であり、経験豊富なエンジニア向けの素早いリファレンスでもあります。'],
			],
			audienceEyebrow: '対象読者',
			audienceTitle: '明確さと実践的な活用方法を求める開発者',
			audienceText:
				'モダンな TypeScript を学び、React に効果的に型を付け、現実的な設計上の問題に言語を適用するための、焦点を絞った一冊を求める方には Plus Edition が適しています。JavaScript の知識は役立ちますが、TypeScript の深い経験は必要ありません。',
			trustEyebrow: '開発者からの信頼',
			trustTitle: '人気のオープンソースの TypeScript 書籍を基に構成',
			trustText:
				'無料版は GitHub で 10,000 以上のスターを獲得し、多くの TypeScript 開発者に利用されています。Plus Edition は Simone Poggiali が執筆し、20 年にわたる国際的な実務経験を、実践的な React ガイドと実際の開発で役立つ TypeScript パターンに反映しています。',
		},
		amazon: {
			eyebrow: '形式を選択',
			title: 'Amazon で Plus Edition を購入',
			editionLabel: '版',
			kindle: 'Kindle 版',
			paperback: 'ペーパーバック',
			buyOn: '購入先',
			detected: 'ブラウザーの言語と地域に基づいて、最も適切な版と Amazon ストアを開きます。',
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
			trustTitle: 'Dal popolare libro TypeScript open source',
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
						'Padrões para APIs de componentes seguras',
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
			audienceTitle: 'Para quem busca clareza prática',
			audienceText:
				'Escolha a Plus Edition se você quer uma única fonte focada para aprender TypeScript moderno, tipar React de forma eficaz e aplicar a linguagem a problemas realistas de design. Conhecimento de JavaScript ajuda, mas experiência profunda em TypeScript não é necessária.',
			trustEyebrow: 'Confiado por desenvolvedores',
			trustTitle: 'Baseado no livro TypeScript open source',
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
			audienceTitle: 'För utvecklare som vill ha klarhet och praktik',
			audienceText:
				'Välj Plus Edition om du vill ha en fokuserad resurs för att lära dig modern TypeScript, typa React effektivt och använda språket på realistiska designproblem. JavaScript-kunskap hjälper, men djup TypeScript-erfarenhet krävs inte.',
			trustEyebrow: 'Betrodd av utvecklare',
			trustTitle: 'Bygger på en populär open source-bok',
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
			action: 'Виж книгата',
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
						'Практични модели за по-сигурни компонентни API в реални приложения',
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
			audienceTitle: 'За търсещи яснота и практика',
			audienceText:
				'Избери Plus Edition, ако искаш един фокусиран ресурс за изучаване на съвременен TypeScript, ефективно типизиране на React и прилагане на езика към реалистични дизайн проблеми. Познаването на JavaScript помага, но не е нужна дълбока TypeScript експертиза.',
			trustEyebrow: 'Доверено от разработчици',
			trustTitle: 'Базирано на популярна TypeScript книга',
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
						'Patrones para API de componentes más seguras',
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
			audienceTitle: 'Desarrolladores que buscan claridad práctica',
			audienceText:
				'Elige la Plus Edition si quieres un recurso enfocado para aprender TypeScript moderno, tipar React de forma efectiva y aplicar el lenguaje a problemas de diseño realistas. Conocer JavaScript ayuda, pero no se requiere experiencia profunda con TypeScript.',
			trustEyebrow: 'Con la confianza de desarrolladores',
			trustTitle: 'Basado en un libro open source de TypeScript',
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
	'ko-kr': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — TypeScript 7을 위한 React와 실전 패턴',
		pageDescription:
			'The Concise TypeScript Book의 유료 확장판으로, 독점 React 가이드, 실전 TypeScript 패턴, TypeScript 7에 맞게 업데이트된 내용을 담았습니다. Kindle과 종이책으로 제공됩니다.',
		coverAlt: 'The Concise TypeScript Book Plus Edition 표지',
		topBanner: {
			ariaLabel: '새로운 Plus Edition 안내',
			badge: '새로운 유료 에디션',
			strong: 'TypeScript 7 마스터하기',
			message: 'React + 실전 패턴',
			action: 'Plus Edition 살펴보기',
		},
		home: {
			ariaLabel: 'The Concise TypeScript Book Plus Edition 자세히 알아보기',
			eyebrow: '새로운 유료 에디션 · TypeScript 7',
			title: '실제 프로젝트에서 TypeScript 활용하기',
			description:
				'Plus Edition은 무료 오픈 소스 책에 개발자들이 가장 많이 요청하는 실용적인 내용인 React와 TypeScript, 프로덕션 코드를 위한 재사용 가능한 패턴을 추가합니다.',
			items: [
				['React와 TypeScript:', '컴포넌트, props, hooks, 이벤트, refs, 확장 가능한 컴포넌트 패턴.'],
				['실전 TypeScript 패턴:', '더 안전하고 명확하며 유지보수하기 쉬운 애플리케이션을 위한 실용적인 접근 방식.'],
				['TypeScript 7:', '기초부터 고급 타입 시스템 기법까지 간결하게 다룹니다.'],
			],
			action: '수록 내용 보기',
			availability: 'Kindle과 종이책으로 제공',
		},
		sidebar: {
			coverCta: 'Plus Edition 표지',
			eyebrow: 'Plus Edition',
			title: '무료 책 그 이상을 만나보세요',
			description: 'TypeScript 7에 맞게 업데이트된 독점 React 가이드와 실용적인 실전 패턴을 제공합니다.',
			formats: 'Kindle과 종이책',
			action: '책 살펴보기',
			ariaLabel: 'The Concise TypeScript Book Plus Edition 살펴보기',
		},
		landing: {
			heroEyebrow: '유료 확장판 · TypeScript 7에 맞게 업데이트',
			title: PLUS_EDITION.titles.en,
			lead:
				'타입 시스템을 일상적인 개발 작업과 연결하는 독점 챕터로 확장된 간결하고 실용적인 TypeScript 7 안내서입니다.',
			primaryAction: 'Kindle 또는 종이책 선택하기',
			secondaryAction: '새로운 내용 보기',
			availability: '영어판과 이탈리아어판 · Amazon을 통해 전 세계에서 구매 가능',
			introEyebrow: 'TypeScript를 이해하는 데서 제대로 활용하는 데까지',
			introTitle: '실제 프로젝트를 위해 만든 새로운 콘텐츠',
			introText:
				'Plus Edition은 널리 읽히는 오픈 소스 책 The Concise TypeScript Book을 기반으로 합니다. 직접적인 설명과 핵심에 집중한 예제를 유지하면서 이 유료 에디션에서만 제공되는 두 가지 중요한 영역을 더 깊이 다룹니다.',
			featureAriaLabel: 'Plus Edition 독점 콘텐츠',
			exclusiveContent: '독점 콘텐츠',
			features: [
				{
					title: 'React와 TypeScript',
					description:
						'React 애플리케이션이 성장해도 명확성을 유지하는 패턴까지 기본 컴포넌트 타입부터 자신 있게 배워 나가세요.',
					items: [
						'컴포넌트, props, children, 이벤트',
						'Hooks, refs, 재사용 가능한 추상화',
						'판별 유니온과 제네릭 컴포넌트',
						'더 안전한 컴포넌트 API를 위한 실용적인 패턴',
					],
				},
				{
					title: '실전 패턴',
					description:
						'TypeScript의 고급 기능을 결합하여 반복되는 애플리케이션 설계 문제를 해결하는 방법을 알아보세요.',
					items: [
						'표현력이 뛰어나고 유지보수하기 쉬운 도메인 타입',
						'더 안전한 경계와 오류 처리',
						'재사용 가능한 타입 맵과 팩토리 패턴',
						'프로덕션 코드에 적용할 수 있는 기법',
					],
				},
			],
			whyEyebrow: '간결함을 고려한 설계',
			whyTitle: '군더더기 없이 더 깊이 있는 실전 내용',
			whyItems: [
				['최신 내용', '필수 언어 개념부터 고급 타입 시스템 기법까지 TypeScript 7에 맞게 업데이트되었습니다.'],
				['실용적', '일상적인 개발에 바로 적용하도록 설계된 짧은 설명과 핵심에 집중한 예제입니다.'],
				['모든 수준에 유용', 'TypeScript를 처음 접하는 개발자를 위한 체계적인 입문서이자 숙련된 엔지니어를 위한 빠른 참고서입니다.'],
			],
			audienceEyebrow: '추천 대상',
			audienceTitle: '명확한 설명과 실용적인 활용법을 원하는 개발자',
			audienceText:
				'현대적인 TypeScript를 배우고, React에 효과적으로 타입을 적용하며, 현실적인 설계 문제에 언어를 활용하기 위한 한 권의 집중된 자료를 원한다면 Plus Edition을 선택하세요. JavaScript에 익숙하면 도움이 되지만 깊이 있는 TypeScript 경험은 필요하지 않습니다.',
			trustEyebrow: '개발자들이 신뢰하는 책',
			trustTitle: '인기 있는 오픈 소스 TypeScript 책을 기반으로 제작',
			trustText:
				'무료 에디션은 GitHub에서 10,000개 이상의 별을 받았으며 많은 TypeScript 개발자가 사용합니다. Plus Edition은 Simone Poggiali가 집필했으며, 20년간 쌓은 국제적인 실무 경험을 실용적인 React 가이드와 실전 TypeScript 패턴에 담았습니다.',
		},
		amazon: {
			eyebrow: '형식 선택',
			title: 'Amazon에서 Plus Edition 구매하기',
			editionLabel: '에디션',
			kindle: 'Kindle 에디션',
			paperback: '종이책',
			buyOn: '구매처',
			detected: '브라우저 언어와 지역을 사용하여 가장 적합한 에디션과 Amazon 스토어를 엽니다.',
		},
	},
	'id-id': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React dan Pola Dunia Nyata untuk TypeScript 7',
		pageDescription:
			'Edisi berbayar dan diperluas dari The Concise TypeScript Book, dengan panduan React eksklusif, pola TypeScript dunia nyata, dan pembaruan untuk TypeScript 7. Tersedia untuk Kindle dan dalam bentuk buku cetak.',
		coverAlt: 'Sampul The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Pengumuman Plus Edition baru',
			badge: 'Edisi berbayar baru',
			strong: 'Kuasai TypeScript 7',
			message: 'React + pola dunia nyata',
			action: 'Jelajahi Plus Edition',
		},
		home: {
			ariaLabel: 'Pelajari lebih lanjut tentang The Concise TypeScript Book Plus Edition',
			eyebrow: 'Edisi berbayar baru · TypeScript 7',
			title: 'Terapkan TypeScript dalam proyek nyata',
			description:
				'Plus Edition memperluas buku gratis dan sumber terbuka ini dengan materi praktis yang paling banyak diminta pengembang: React dengan TypeScript dan pola yang dapat digunakan kembali untuk kode produksi.',
			items: [
				['React dengan TypeScript:', 'komponen, props, hooks, event, refs, dan pola komponen yang dapat diskalakan.'],
				['Pola TypeScript dunia nyata:', 'pendekatan praktis untuk aplikasi yang lebih aman, lebih jelas, dan mudah dipelihara.'],
				['TypeScript 7:', 'pembahasan ringkas dari dasar hingga teknik sistem tipe tingkat lanjut.'],
			],
			action: 'Lihat isinya',
			availability: 'Tersedia untuk Kindle dan dalam bentuk buku cetak',
		},
		sidebar: {
			coverCta: 'Sampul Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Melangkah lebih jauh dari buku gratis',
			description: 'Panduan React eksklusif dan pola praktis dunia nyata, diperbarui untuk TypeScript 7.',
			formats: 'Kindle dan buku cetak',
			action: 'Jelajahi buku',
			ariaLabel: 'Jelajahi The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'Edisi berbayar dan diperluas · Diperbarui untuk TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'Panduan TypeScript 7 yang ringkas dan praktis, diperluas dengan bab eksklusif yang menghubungkan sistem tipe dengan pekerjaan Anda sehari-hari.',
			primaryAction: 'Pilih Kindle atau buku cetak',
			secondaryAction: 'Lihat yang baru',
			availability: 'Edisi bahasa Inggris dan Italia · Tersedia di seluruh dunia melalui Amazon',
			introEyebrow: 'Dari memahami TypeScript hingga menggunakannya dengan baik',
			introTitle: 'Konten baru yang dibuat untuk proyek nyata',
			introText:
				'Plus Edition dikembangkan dari The Concise TypeScript Book, buku sumber terbuka yang banyak dibaca. Edisi ini mempertahankan penjelasan langsung dan contoh yang terfokus, lalu membahas lebih jauh dua bidang penting yang hanya tersedia dalam edisi berbayar ini.',
			featureAriaLabel: 'Konten eksklusif Plus Edition',
			exclusiveContent: 'Konten Eksklusif',
			features: [
				{
					title: 'TypeScript dengan React',
					description:
						'Beralihlah dengan percaya diri dari tipe komponen dasar ke pola yang tetap jelas seiring berkembangnya aplikasi React.',
					items: [
						'Komponen, props, children, dan event',
						'Hooks, refs, dan abstraksi yang dapat digunakan kembali',
						'Discriminated union dan komponen generik',
						'Pola praktis untuk API komponen yang lebih aman',
					],
				},
				{
					title: 'Pola dunia nyata',
					description:
						'Lihat bagaimana fitur lanjutan TypeScript dipadukan untuk menyelesaikan masalah desain aplikasi yang berulang.',
					items: [
						'Tipe domain yang ekspresif dan mudah dipelihara',
						'Batas yang lebih aman dan penanganan kesalahan',
						'Peta tipe dan pola factory yang dapat digunakan kembali',
						'Teknik yang dapat Anda adaptasi untuk kode produksi',
					],
				},
			],
			whyEyebrow: 'Ringkas secara sengaja',
			whyTitle: 'Lebih mendalam secara praktis, tanpa basa-basi',
			whyItems: [
				['Terkini', 'Diperbarui untuk TypeScript 7, dari konsep bahasa yang penting hingga teknik sistem tipe tingkat lanjut.'],
				['Praktis', 'Penjelasan singkat dan contoh terfokus yang dirancang agar dapat langsung diterapkan dalam pengembangan sehari-hari.'],
				['Berguna untuk semua tingkat', 'Pengantar terstruktur bagi pengembang TypeScript baru dan referensi cepat bagi engineer berpengalaman.'],
			],
			audienceEyebrow: 'Untuk siapa buku ini',
			audienceTitle: 'Pengembang yang mencari kejelasan dan penerapan praktis',
			audienceText:
				'Pilih Plus Edition jika Anda menginginkan satu sumber terfokus untuk mempelajari TypeScript modern, memberi tipe pada React secara efektif, dan menerapkan bahasa ini pada masalah desain yang realistis. Pemahaman tentang JavaScript akan membantu, tetapi pengalaman TypeScript yang mendalam tidak diperlukan.',
			trustEyebrow: 'Dipercaya oleh pengembang',
			trustTitle: 'Dikembangkan dari buku TypeScript sumber terbuka yang populer',
			trustText:
				'Edisi gratis ini memiliki lebih dari 10.000 bintang di GitHub dan digunakan oleh banyak pengembang TypeScript. Plus Edition ditulis oleh Simone Poggiali, yang membawa 20 tahun pengalaman kerja internasional ke dalam panduan React praktis dan pola TypeScript dunia nyata.',
		},
		amazon: {
			eyebrow: 'Pilih format Anda',
			title: 'Dapatkan Plus Edition di Amazon',
			editionLabel: 'Edisi',
			kindle: 'Edisi Kindle',
			paperback: 'Buku cetak',
			buyOn: 'Beli di',
			detected: 'Kami akan menggunakan bahasa dan wilayah browser Anda untuk membuka edisi dan toko Amazon yang paling sesuai.',
		},
	},
	'de-de': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React und praxisnahe Muster für TypeScript 7',
		pageDescription:
			'Die kostenpflichtige, erweiterte Ausgabe von The Concise TypeScript Book mit exklusiven React-Inhalten, praxisnahen TypeScript-Mustern und aktualisierten Inhalten zu TypeScript 7. Erhältlich für Kindle und als Taschenbuch.',
		coverAlt: 'Cover von The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Ankündigung der neuen Plus Edition',
			badge: 'Neue kostenpflichtige Ausgabe',
			strong: 'TypeScript 7 meistern',
			message: 'React + praxisnahe Muster',
			action: 'Plus Edition entdecken',
		},
		home: {
			ariaLabel: 'Mehr über The Concise TypeScript Book Plus Edition erfahren',
			eyebrow: 'Neue kostenpflichtige Ausgabe · TypeScript 7',
			title: 'TypeScript in echten Projekten einsetzen',
			description:
				'Die Plus Edition erweitert das kostenlose Open-Source-Buch um die praktischen Inhalte, nach denen Entwickler am häufigsten fragen: React mit TypeScript und wiederverwendbare Muster für produktiven Code.',
			items: [
				['React mit TypeScript:', 'Komponenten, Props, Hooks, Events, Refs und skalierbare Komponentenmuster.'],
				['Praxisnahe TypeScript-Muster:', 'praktische Ansätze für sicherere, klarere und wartbare Anwendungen.'],
				['TypeScript 7:', 'prägnante Inhalte von den Grundlagen bis zu fortgeschrittenen Techniken des Typsystems.'],
			],
			action: 'Inhalte ansehen',
			availability: 'Erhältlich für Kindle und als Taschenbuch',
		},
		sidebar: {
			coverCta: 'Cover der Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Über das kostenlose Buch hinausgehen',
			description: 'Exklusive React-Inhalte und praktische, praxisnahe Muster, aktualisiert für TypeScript 7.',
			formats: 'Kindle und Taschenbuch',
			action: 'Buch entdecken',
			ariaLabel: 'The Concise TypeScript Book Plus Edition entdecken',
		},
		landing: {
			heroEyebrow: 'Die kostenpflichtige, erweiterte Ausgabe · Aktualisiert für TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'Ein prägnanter, praxisorientierter Leitfaden zu TypeScript 7, erweitert um exklusive Kapitel, die das Typsystem mit Ihrer täglichen Arbeit verbinden.',
			primaryAction: 'Kindle oder Taschenbuch wählen',
			secondaryAction: 'Neuerungen ansehen',
			availability: 'Englische und italienische Ausgabe · Weltweit über Amazon erhältlich',
			introEyebrow: 'TypeScript verstehen und richtig einsetzen',
			introTitle: 'Neue Inhalte für echte Projekte',
			introText:
				'Die Plus Edition baut auf dem viel gelesenen Open-Source-Buch The Concise TypeScript Book auf. Sie behält die direkten Erklärungen und fokussierten Beispiele bei und vertieft anschließend zwei umfangreiche Bereiche, die nur in dieser kostenpflichtigen Ausgabe verfügbar sind.',
			featureAriaLabel: 'Exklusive Inhalte der Plus Edition',
			exclusiveContent: 'Exklusive Inhalte',
			features: [
				{
					title: 'TypeScript mit React',
					description:
						'Gehen Sie sicher von grundlegenden Komponententypen zu Mustern über, die auch bei wachsenden React-Anwendungen klar bleiben.',
					items: [
						'Komponenten, Props, Children und Events',
						'Hooks, Refs und wiederverwendbare Abstraktionen',
						'Diskriminierte Unions und generische Komponenten',
						'Praktische Muster für sicherere Komponenten-APIs',
					],
				},
				{
					title: 'Praxisnahe Muster',
					description:
						'Erfahren Sie, wie sich fortgeschrittene TypeScript-Funktionen kombinieren lassen, um wiederkehrende Probleme beim Anwendungsdesign zu lösen.',
					items: [
						'Ausdrucksstarke, wartbare Domänentypen',
						'Sicherere Schnittstellen und Fehlerbehandlung',
						'Wiederverwendbare Typzuordnungen und Factory-Muster',
						'Techniken, die Sie an produktiven Code anpassen können',
					],
				},
			],
			whyEyebrow: 'Bewusst prägnant',
			whyTitle: 'Mehr praktische Tiefe, ohne unnötigen Ballast',
			whyItems: [
				['Aktuell', 'Aktualisiert für TypeScript 7, von grundlegenden Sprachkonzepten bis zu fortgeschrittenen Techniken des Typsystems.'],
				['Praxisorientiert', 'Kurze Erklärungen und fokussierte Beispiele, die sich direkt auf die tägliche Entwicklung übertragen lassen.'],
				['Für jedes Niveau hilfreich', 'Ein strukturierter Einstieg für neue TypeScript-Entwickler und ein schnelles Nachschlagewerk für erfahrene Entwickler.'],
			],
			audienceEyebrow: 'Für wen das Buch gedacht ist',
			audienceTitle: 'Entwickler, die Klarheit und praktische Anwendung suchen',
			audienceText:
				'Wählen Sie die Plus Edition, wenn Sie eine fokussierte Ressource suchen, um modernes TypeScript zu lernen, React effektiv zu typisieren und die Sprache auf realistische Designprobleme anzuwenden. JavaScript-Kenntnisse sind hilfreich, umfassende TypeScript-Erfahrung ist jedoch nicht erforderlich.',
			trustEyebrow: 'Von Entwicklern geschätzt',
			trustTitle: 'Basierend auf einem beliebten Open-Source-Buch zu TypeScript',
			trustText:
				'Die kostenlose Ausgabe hat mehr als 10.000 GitHub-Sterne und wird von vielen TypeScript-Entwicklern verwendet. Die Plus Edition wurde von Simone Poggiali verfasst und verbindet 20 Jahre internationale Berufserfahrung mit praktischen React-Inhalten und praxisnahen TypeScript-Mustern.',
		},
		amazon: {
			eyebrow: 'Format auswählen',
			title: 'Plus Edition bei Amazon kaufen',
			editionLabel: 'Ausgabe',
			kindle: 'Kindle-Ausgabe',
			paperback: 'Taschenbuch',
			buyOn: 'Kaufen bei',
			detected: 'Wir verwenden die Sprache und Region Ihres Browsers, um die passendste Ausgabe und den passenden Amazon-Shop zu öffnen.',
		},
	},
	'pl-pl': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React i praktyczne wzorce dla TypeScript 7',
		pageDescription:
			'Płatne, rozszerzone wydanie The Concise TypeScript Book z ekskluzywnymi materiałami o Reakcie, praktycznymi wzorcami TypeScript i treścią zaktualizowaną dla TypeScript 7. Dostępne na Kindle i w miękkiej oprawie.',
		coverAlt: 'Okładka The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Ogłoszenie nowego wydania Plus Edition',
			badge: 'Nowe płatne wydanie',
			strong: 'Opanuj TypeScript 7',
			message: 'React + praktyczne wzorce',
			action: 'Poznaj Plus Edition',
		},
		home: {
			ariaLabel: 'Dowiedz się więcej o The Concise TypeScript Book Plus Edition',
			eyebrow: 'Nowe płatne wydanie · TypeScript 7',
			title: 'Wykorzystaj TypeScript w rzeczywistych projektach',
			description:
				'Plus Edition rozszerza bezpłatną książkę open source o praktyczne materiały, których programiści potrzebują najbardziej: TypeScript z Reactem oraz wzorce do wielokrotnego użytku w kodzie produkcyjnym.',
			items: [
				['TypeScript z Reactem:', 'komponenty, props, hooki, zdarzenia, referencje i skalowalne wzorce komponentów.'],
				['Praktyczne wzorce TypeScript:', 'praktyczne podejścia do tworzenia bezpieczniejszych, czytelniejszych i łatwiejszych w utrzymaniu aplikacji.'],
				['TypeScript 7:', 'zwięzłe omówienie od podstaw po zaawansowane techniki systemu typów.'],
			],
			action: 'Zobacz zawartość',
			availability: 'Dostępne na Kindle i w miękkiej oprawie',
		},
		sidebar: {
			coverCta: 'Okładka Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Wyjdź poza bezpłatną książkę',
			description: 'Ekskluzywne materiały o Reakcie i praktyczne wzorce z rzeczywistych projektów, zaktualizowane dla TypeScript 7.',
			formats: 'Kindle i miękka oprawa',
			action: 'Poznaj książkę',
			ariaLabel: 'Poznaj The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'Płatne, rozszerzone wydanie · Zaktualizowane dla TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'Zwięzły, praktyczny przewodnik po TypeScript 7, rozszerzony o ekskluzywne rozdziały łączące system typów z codzienną pracą.',
			primaryAction: 'Wybierz Kindle lub miękką oprawę',
			secondaryAction: 'Zobacz nowości',
			availability: 'Wydania angielskie i włoskie · Dostępne na całym świecie na Amazonie',
			introEyebrow: 'Od zrozumienia TypeScript do sprawnego korzystania z niego',
			introTitle: 'Nowe treści stworzone dla rzeczywistych projektów',
			introText:
				'Plus Edition bazuje na popularnej książce open source The Concise TypeScript Book. Zachowuje bezpośrednie wyjaśnienia i konkretne przykłady, a następnie rozwija dwa obszerne obszary dostępne wyłącznie w tym płatnym wydaniu.',
			featureAriaLabel: 'Ekskluzywna zawartość Plus Edition',
			exclusiveContent: 'Ekskluzywna zawartość',
			features: [
				{
					title: 'TypeScript z Reactem',
					description:
						'Płynnie przejdź od podstawowych typów komponentów do wzorców, które pozostają czytelne wraz z rozwojem aplikacji Reacta.',
					items: [
						'Komponenty, props, children i zdarzenia',
						'Hooki, referencje i abstrakcje wielokrotnego użytku',
						'Unie dyskryminowane i komponenty generyczne',
						'Praktyczne wzorce bezpieczniejszych interfejsów API komponentów',
					],
				},
				{
					title: 'Praktyczne wzorce',
					description:
						'Zobacz, jak zaawansowane funkcje TypeScript łączą się w rozwiązania powtarzających się problemów projektowania aplikacji.',
					items: [
						'Wyraziste i łatwe w utrzymaniu typy domenowe',
						'Bezpieczniejsze granice i obsługa błędów',
						'Mapy typów i wzorce fabrykujące wielokrotnego użytku',
						'Techniki, które można dostosować do kodu produkcyjnego',
					],
				},
			],
			whyEyebrow: 'Zwięzłość z założenia',
			whyTitle: 'Więcej praktycznej wiedzy, bez zbędnych treści',
			whyItems: [
				['Aktualna', 'Zaktualizowana dla TypeScript 7 — od podstawowych pojęć języka po zaawansowane techniki systemu typów.'],
				['Praktyczna', 'Krótkie wyjaśnienia i konkretne przykłady stworzone z myślą o bezpośrednim zastosowaniu w codziennej pracy.'],
				['Przydatna na każdym poziomie', 'Uporządkowane wprowadzenie dla nowych programistów TypeScript i szybkie kompendium dla doświadczonych inżynierów.'],
			],
			audienceEyebrow: 'Dla kogo jest ta książka',
			audienceTitle: 'Dla programistów szukających jasnych wyjaśnień i praktycznych zastosowań',
			audienceText:
				'Wybierz Plus Edition, jeśli potrzebujesz jednego konkretnego źródła do nauki współczesnego TypeScript, skutecznego typowania Reacta i stosowania języka w realistycznych problemach projektowych. Znajomość JavaScript jest pomocna, ale zaawansowane doświadczenie z TypeScript nie jest wymagane.',
			trustEyebrow: 'Ceniona przez programistów',
			trustTitle: 'Oparta na popularnej książce open source o TypeScript',
			trustText:
				'Bezpłatne wydanie ma ponad 10 000 gwiazdek na GitHubie i jest używane przez wielu programistów TypeScript. Autorem Plus Edition jest Simone Poggiali, który wykorzystał 20 lat międzynarodowego doświadczenia zawodowego, aby przygotować praktyczne materiały o Reakcie i rzeczywistych wzorcach TypeScript.',
		},
		amazon: {
			eyebrow: 'Wybierz format',
			title: 'Kup Plus Edition na Amazonie',
			editionLabel: 'Wydanie',
			kindle: 'Wydanie Kindle',
			paperback: 'Miękka oprawa',
			buyOn: 'Kup na',
			detected: 'Użyjemy języka i regionu przeglądarki, aby otworzyć najlepiej dopasowane wydanie i sklep Amazon.',
		},
	},
	'vi-vn': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React và các mẫu thực tế cho TypeScript 7',
		pageDescription:
			'Phiên bản trả phí mở rộng của The Concise TypeScript Book, với hướng dẫn React độc quyền, các mẫu TypeScript thực tế và nội dung TypeScript 7 được cập nhật. Có trên Kindle và bản bìa mềm.',
		coverAlt: 'Bìa The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'Thông báo về Plus Edition mới',
			badge: 'Phiên bản trả phí mới',
			strong: 'Làm chủ TypeScript 7',
			message: 'React + các mẫu thực tế',
			action: 'Khám phá Plus Edition',
		},
		home: {
			ariaLabel: 'Tìm hiểu thêm về The Concise TypeScript Book Plus Edition',
			eyebrow: 'Phiên bản trả phí mới · TypeScript 7',
			title: 'Đưa TypeScript vào các dự án thực tế',
			description:
				'Plus Edition mở rộng cuốn sách miễn phí và mã nguồn mở với những nội dung thực tế mà lập trình viên cần nhất: React với TypeScript và các mẫu có thể tái sử dụng cho mã production.',
			items: [
				['React với TypeScript:', 'component, props, hooks, events, refs và các mẫu component có khả năng mở rộng.'],
				['Các mẫu TypeScript thực tế:', 'những cách tiếp cận thực tế để xây dựng ứng dụng an toàn hơn, rõ ràng hơn và dễ bảo trì hơn.'],
				['TypeScript 7:', 'nội dung súc tích từ nền tảng đến các kỹ thuật hệ thống kiểu nâng cao.'],
			],
			action: 'Xem nội dung bên trong',
			availability: 'Có trên Kindle và bản bìa mềm',
		},
		sidebar: {
			coverCta: 'Bìa Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'Đi xa hơn cuốn sách miễn phí',
			description: 'Hướng dẫn React độc quyền và các mẫu thực tế, được cập nhật cho TypeScript 7.',
			formats: 'Kindle và bìa mềm',
			action: 'Khám phá cuốn sách',
			ariaLabel: 'Khám phá The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'Phiên bản trả phí mở rộng · Được cập nhật cho TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'Một hướng dẫn TypeScript 7 súc tích và thực tế, được mở rộng với các chương độc quyền kết nối hệ thống kiểu với công việc phát triển hằng ngày.',
			primaryAction: 'Chọn Kindle hoặc bìa mềm',
			secondaryAction: 'Xem nội dung mới',
			availability: 'Phiên bản tiếng Anh và tiếng Ý · Có trên Amazon trên toàn thế giới',
			introEyebrow: 'Từ hiểu TypeScript đến sử dụng hiệu quả',
			introTitle: 'Nội dung mới dành cho các dự án thực tế',
			introText:
				'Plus Edition được xây dựng dựa trên The Concise TypeScript Book, cuốn sách mã nguồn mở được nhiều người đọc. Sách giữ nguyên cách giải thích trực tiếp và các ví dụ tập trung, sau đó đi sâu hơn vào hai lĩnh vực quan trọng chỉ có trong phiên bản trả phí này.',
			featureAriaLabel: 'Nội dung độc quyền của Plus Edition',
			exclusiveContent: 'Nội dung độc quyền',
			features: [
				{
					title: 'TypeScript với React',
					description:
						'Tiến từ các kiểu component cơ bản đến những mẫu vẫn rõ ràng khi ứng dụng React phát triển.',
					items: [
						'Component, props, children và events',
						'Hooks, refs và các abstraction có thể tái sử dụng',
						'Discriminated union và generic component',
						'Các mẫu thực tế cho component API an toàn hơn',
					],
				},
				{
					title: 'Các mẫu thực tế',
					description:
						'Xem cách các tính năng nâng cao của TypeScript kết hợp để giải quyết những vấn đề thiết kế ứng dụng thường xuyên lặp lại.',
					items: [
						'Domain type biểu đạt rõ ràng và dễ bảo trì',
						'Boundary an toàn hơn và xử lý lỗi',
						'Type map và factory pattern có thể tái sử dụng',
						'Các kỹ thuật có thể áp dụng vào mã production',
					],
				},
			],
			whyEyebrow: 'Súc tích theo thiết kế',
			whyTitle: 'Chiều sâu thực tế hơn, không có nội dung dư thừa',
			whyItems: [
				['Cập nhật', 'Được cập nhật cho TypeScript 7, từ các khái niệm ngôn ngữ thiết yếu đến kỹ thuật hệ thống kiểu nâng cao.'],
				['Thực tế', 'Giải thích ngắn gọn và ví dụ tập trung, được thiết kế để áp dụng trực tiếp vào công việc phát triển hằng ngày.'],
				['Hữu ích ở mọi trình độ', 'Phần giới thiệu có cấu trúc cho lập trình viên mới học TypeScript và tài liệu tham khảo nhanh cho kỹ sư giàu kinh nghiệm.'],
			],
			audienceEyebrow: 'Dành cho ai',
			audienceTitle: 'Lập trình viên cần sự rõ ràng và ứng dụng thực tế',
			audienceText:
				'Hãy chọn Plus Edition nếu bạn muốn một tài liệu tập trung để học TypeScript hiện đại, định kiểu React hiệu quả và áp dụng ngôn ngữ vào các vấn đề thiết kế thực tế. Kiến thức JavaScript sẽ hữu ích, nhưng không yêu cầu kinh nghiệm TypeScript chuyên sâu.',
			trustEyebrow: 'Được lập trình viên tin dùng',
			trustTitle: 'Dựa trên một cuốn sách TypeScript mã nguồn mở phổ biến',
			trustText:
				'Phiên bản miễn phí có hơn 10.000 sao trên GitHub và được nhiều lập trình viên TypeScript sử dụng. Plus Edition do Simone Poggiali viết, mang 20 năm kinh nghiệm làm việc quốc tế vào hướng dẫn React thực tế và các mẫu TypeScript dùng trong dự án thực tế.',
		},
		amazon: {
			eyebrow: 'Chọn định dạng',
			title: 'Mua Plus Edition trên Amazon',
			editionLabel: 'Phiên bản',
			kindle: 'Phiên bản Kindle',
			paperback: 'Bìa mềm',
			buyOn: 'Mua trên',
			detected: 'Chúng tôi sẽ dùng ngôn ngữ và khu vực của trình duyệt để mở phiên bản và cửa hàng Amazon phù hợp nhất.',
		},
	},
	'th-th': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React และรูปแบบการใช้งานจริงสำหรับ TypeScript 7',
		pageDescription:
			'The Concise TypeScript Book ฉบับขยายแบบมีค่าใช้จ่าย พร้อมคู่มือ React เฉพาะฉบับ รูปแบบ TypeScript สำหรับการใช้งานจริง และเนื้อหาที่อัปเดตสำหรับ TypeScript 7 มีทั้งฉบับ Kindle และปกอ่อน',
		coverAlt: 'ปก The Concise TypeScript Book Plus Edition',
		topBanner: {
			ariaLabel: 'ประกาศเปิดตัว Plus Edition ใหม่',
			badge: 'ฉบับใหม่แบบมีค่าใช้จ่าย',
			strong: 'เชี่ยวชาญ TypeScript 7',
			message: 'React + รูปแบบสำหรับการใช้งานจริง',
			action: 'สำรวจ Plus Edition',
		},
		home: {
			ariaLabel: 'เรียนรู้เพิ่มเติมเกี่ยวกับ The Concise TypeScript Book Plus Edition',
			eyebrow: 'ฉบับใหม่แบบมีค่าใช้จ่าย · TypeScript 7',
			title: 'นำ TypeScript ไปใช้ในโปรเจกต์จริง',
			description:
				'Plus Edition ต่อยอดจากหนังสือโอเพนซอร์สที่เปิดให้อ่านฟรีด้วยเนื้อหาเชิงปฏิบัติที่นักพัฒนาต้องการมากที่สุด ได้แก่ React กับ TypeScript และรูปแบบที่นำกลับมาใช้ซ้ำได้สำหรับโค้ดที่ใช้งานจริง',
			items: [
				['React กับ TypeScript:', 'คอมโพเนนต์, props, hooks, events, refs และรูปแบบคอมโพเนนต์ที่รองรับการขยายตัว'],
				['รูปแบบ TypeScript สำหรับการใช้งานจริง:', 'แนวทางเชิงปฏิบัติสำหรับแอปพลิเคชันที่ปลอดภัย ชัดเจน และดูแลรักษาง่ายขึ้น'],
				['TypeScript 7:', 'เนื้อหากระชับตั้งแต่พื้นฐานไปจนถึงเทคนิคขั้นสูงของระบบชนิดข้อมูล'],
			],
			action: 'ดูเนื้อหาภายใน',
			availability: 'มีทั้งฉบับ Kindle และปกอ่อน',
		},
		sidebar: {
			coverCta: 'ปก Plus Edition',
			eyebrow: 'Plus Edition',
			title: 'ก้าวไปไกลกว่าหนังสือฉบับฟรี',
			description: 'คู่มือ React เฉพาะฉบับและรูปแบบเชิงปฏิบัติสำหรับการใช้งานจริง อัปเดตสำหรับ TypeScript 7',
			formats: 'Kindle และปกอ่อน',
			action: 'สำรวจหนังสือ',
			ariaLabel: 'สำรวจ The Concise TypeScript Book Plus Edition',
		},
		landing: {
			heroEyebrow: 'ฉบับขยายแบบมีค่าใช้จ่าย · อัปเดตสำหรับ TypeScript 7',
			title: PLUS_EDITION.titles.en,
			lead:
				'คู่มือ TypeScript 7 ที่กระชับและนำไปใช้ได้จริง เพิ่มเติมด้วยบทเฉพาะฉบับที่เชื่อมโยงระบบชนิดข้อมูลเข้ากับงานที่คุณทำทุกวัน',
			primaryAction: 'เลือก Kindle หรือปกอ่อน',
			secondaryAction: 'ดูว่ามีอะไรใหม่',
			availability: 'ฉบับภาษาอังกฤษและภาษาอิตาลี · วางจำหน่ายทั่วโลกผ่าน Amazon',
			introEyebrow: 'จากการเข้าใจ TypeScript สู่การใช้งานอย่างมีประสิทธิภาพ',
			introTitle: 'เนื้อหาใหม่ที่สร้างขึ้นสำหรับโปรเจกต์จริง',
			introText:
				'Plus Edition ต่อยอดจาก The Concise TypeScript Book หนังสือโอเพนซอร์สที่มีผู้อ่านอย่างแพร่หลาย โดยยังคงคำอธิบายที่ตรงประเด็นและตัวอย่างที่มุ่งเน้น แล้วเพิ่มเนื้อหาสำคัญสองส่วนที่มีเฉพาะในฉบับแบบมีค่าใช้จ่ายนี้',
			featureAriaLabel: 'เนื้อหาเฉพาะของ Plus Edition',
			exclusiveContent: 'เนื้อหาเฉพาะฉบับ',
			features: [
				{
					title: 'TypeScript กับ React',
					description:
						'พัฒนาจากชนิดข้อมูลพื้นฐานของคอมโพเนนต์ไปสู่รูปแบบที่ยังคงชัดเจนเมื่อแอปพลิเคชัน React เติบโตขึ้นได้อย่างมั่นใจ',
					items: [
						'คอมโพเนนต์, props, children และ events',
						'Hooks, refs และ abstraction ที่นำกลับมาใช้ซ้ำได้',
						'Discriminated unions และคอมโพเนนต์แบบ generic',
						'รูปแบบเชิงปฏิบัติสำหรับ API ของคอมโพเนนต์ที่ปลอดภัยขึ้น',
					],
				},
				{
					title: 'รูปแบบสำหรับการใช้งานจริง',
					description:
						'ดูว่าคุณสมบัติขั้นสูงของ TypeScript ทำงานร่วมกันเพื่อแก้ปัญหาการออกแบบแอปพลิเคชันที่เกิดขึ้นซ้ำ ๆ ได้อย่างไร',
					items: [
						'ชนิดข้อมูลของโดเมนที่สื่อความหมายและดูแลรักษาง่าย',
						'ขอบเขตที่ปลอดภัยขึ้นและการจัดการข้อผิดพลาด',
						'Type maps และ factory patterns ที่นำกลับมาใช้ซ้ำได้',
						'เทคนิคที่คุณสามารถปรับใช้กับโค้ด production',
					],
				},
			],
			whyEyebrow: 'ออกแบบมาให้กระชับ',
			whyTitle: 'เจาะลึกการใช้งานจริงมากขึ้นโดยไม่มีเนื้อหาฟุ่มเฟือย',
			whyItems: [
				['เป็นปัจจุบัน', 'อัปเดตสำหรับ TypeScript 7 ตั้งแต่แนวคิดพื้นฐานของภาษาไปจนถึงเทคนิคขั้นสูงของระบบชนิดข้อมูล'],
				['นำไปใช้ได้จริง', 'คำอธิบายสั้น ๆ และตัวอย่างที่มุ่งเน้น ออกแบบมาให้นำไปใช้กับงานพัฒนาในแต่ละวันได้โดยตรง'],
				['มีประโยชน์สำหรับทุกระดับ', 'บทนำที่เป็นระบบสำหรับนักพัฒนา TypeScript มือใหม่ และแหล่งอ้างอิงฉบับย่อสำหรับวิศวกรที่มีประสบการณ์'],
			],
			audienceEyebrow: 'เหมาะสำหรับใคร',
			audienceTitle: 'นักพัฒนาที่ต้องการความชัดเจนและการใช้งานจริง',
			audienceText:
				'เลือก Plus Edition หากคุณต้องการแหล่งข้อมูลที่มุ่งเน้นเพียงแห่งเดียวสำหรับเรียนรู้ TypeScript สมัยใหม่ กำหนดชนิดข้อมูลให้ React อย่างมีประสิทธิภาพ และนำภาษาไปใช้กับปัญหาการออกแบบที่สมจริง ความคุ้นเคยกับ JavaScript จะช่วยให้เรียนรู้ได้ง่ายขึ้น แต่ไม่จำเป็นต้องมีประสบการณ์ TypeScript เชิงลึก',
			trustEyebrow: 'ได้รับความไว้วางใจจากนักพัฒนา',
			trustTitle: 'ต่อยอดจากหนังสือ TypeScript โอเพนซอร์สยอดนิยม',
			trustText:
				'ฉบับฟรีมีดาวบน GitHub มากกว่า 10,000 ดวงและมีนักพัฒนา TypeScript จำนวนมากใช้งาน Plus Edition เขียนโดย Simone Poggiali โดยนำประสบการณ์การทำงานระดับนานาชาติ 20 ปีมาถ่ายทอดเป็นคู่มือ React เชิงปฏิบัติและรูปแบบ TypeScript สำหรับการใช้งานจริง',
		},
		amazon: {
			eyebrow: 'เลือกรูปแบบที่ต้องการ',
			title: 'ซื้อ Plus Edition บน Amazon',
			editionLabel: 'ฉบับ',
			kindle: 'ฉบับ Kindle',
			paperback: 'ปกอ่อน',
			buyOn: 'ซื้อบน',
			detected: 'เราจะใช้ภาษาและภูมิภาคของเบราว์เซอร์เพื่อเปิดฉบับและร้าน Amazon ที่เหมาะสมที่สุด',
		},
	},

	'tr-tr': {
		pageTitle: 'The Concise TypeScript Book Plus Edition — React ve TypeScript 7 için gerçek dünya kalıpları',
		pageDescription:
			'The Concise TypeScript Book\'un yalnızca bu sürüme özel React rehberliği, gerçek dünya TypeScript kalıpları ve TypeScript 7 için güncellenmiş içerik sunan ücretli ve genişletilmiş sürümü. Kindle ve ciltsiz olarak sunulur.',
		coverAlt: 'The Concise TypeScript Book Plus Edition kapağı',
		topBanner: {
			ariaLabel: 'Yeni Plus Edition duyurusu',
			badge: 'Yeni ücretli sürüm',
			strong: 'TypeScript 7\'de uzmanlaşın',
			message: 'React + gerçek dünya kalıpları',
			action: 'Plus Edition\'ı keşfedin',
		},
		home: {
			ariaLabel: 'The Concise TypeScript Book Plus Edition hakkında daha fazla bilgi edinin',
			eyebrow: 'Yeni ücretli sürüm · TypeScript 7',
			title: 'TypeScript\'i gerçek projelerde kullanın',
			description:
				'Plus Edition, ücretsiz ve açık kaynaklı kitabı geliştiricilerin en çok istediği pratik içerikle genişletir: React ile TypeScript ve üretim kodu için yeniden kullanılabilir kalıplar.',
			items: [
				['React ile TypeScript:', 'bileşenler, props, hook\'lar, olaylar, ref\'ler ve ölçeklenebilir bileşen kalıpları.'],
				['Gerçek dünya TypeScript kalıpları:', 'daha güvenli, daha anlaşılır ve bakımı kolay uygulamalar için pratik yaklaşımlar.'],
				['TypeScript 7:', 'temellerden ileri düzey tür sistemi tekniklerine kadar özlü anlatım.'],
			],
			action: 'Neler içerdiğini görün',
			availability: 'Kindle ve ciltsiz olarak sunulur',
		},
		sidebar: {
			coverCta: 'Plus Edition kapağı',
			eyebrow: 'Plus Edition',
			title: 'Ücretsiz kitabın ötesine geçin',
			description: 'TypeScript 7 için güncellenmiş, yalnızca bu sürüme özel React rehberliği ve pratik gerçek dünya kalıpları.',
			formats: 'Kindle ve ciltsiz',
			action: 'Kitabı keşfedin',
			ariaLabel: 'The Concise TypeScript Book Plus Edition\'ı keşfedin',
		},
		landing: {
			heroEyebrow: 'Ücretli ve genişletilmiş sürüm · TypeScript 7 için güncellendi',
			title: PLUS_EDITION.titles.en,
			lead:
				'Tür sistemini her gün yaptığınız işlerle buluşturan, yalnızca bu sürüme özel bölümlerle genişletilmiş, TypeScript 7 için özlü ve pratik bir rehber.',
			primaryAction: 'Kindle veya ciltsiz sürümü seçin',
			secondaryAction: 'Yenilikleri görün',
			availability: 'İngilizce ve İtalyanca sürümler · Amazon üzerinden dünya çapında sunulur',
			introEyebrow: 'TypeScript\'i anlamaktan doğru kullanmaya',
			introTitle: 'Gerçek projeler için hazırlanmış yeni içerik',
			introText:
				'Plus Edition, geniş bir okuyucu kitlesine ulaşan açık kaynaklı The Concise TypeScript Book\'u temel alır. Doğrudan anlatımını ve odaklı örneklerini korur, ardından yalnızca bu ücretli sürümde sunulan iki kapsamlı alanla daha ileri gider.',
			featureAriaLabel: 'Plus Edition\'a özel içerik',
			exclusiveContent: 'Özel içerik',
			features: [
				{
					title: 'React ile TypeScript',
					description:
						'Temel bileşen türlerinden, bir React uygulaması büyüdükçe anlaşılır kalmaya devam eden kalıplara güvenle ilerleyin.',
					items: [
						'Bileşenler, props, children ve olaylar',
						'Hook\'lar, ref\'ler ve yeniden kullanılabilir soyutlamalar',
						'Ayırt edici birleşimler ve jenerik bileşenler',
						'Daha güvenli bileşen API\'leri için pratik kalıplar',
					],
				},
				{
					title: 'Gerçek dünya kalıpları',
					description:
						'TypeScript\'in gelişmiş özelliklerinin, yinelenen uygulama tasarımı sorunlarını çözmek için nasıl bir araya geldiğini görün.',
					items: [
						'Anlamlı ve bakımı kolay etki alanı türleri',
						'Daha güvenli sınırlar ve hata yönetimi',
						'Yeniden kullanılabilir tür eşlemeleri ve fabrika kalıpları',
						'Üretim koduna uyarlayabileceğiniz teknikler',
					],
				},
			],
			whyEyebrow: 'Tasarım gereği özlü',
			whyTitle: 'Gereksiz ayrıntılar olmadan daha fazla pratik derinlik',
			whyItems: [
				['Güncel', 'Temel dil kavramlarından ileri düzey tür sistemi tekniklerine kadar TypeScript 7 için güncellendi.'],
				['Pratik', 'Günlük geliştirme çalışmalarına doğrudan aktarılmak üzere tasarlanmış kısa açıklamalar ve odaklı örnekler.'],
				['Her düzeyde yararlı', 'TypeScript\'e yeni başlayan geliştiriciler için yapılandırılmış bir giriş ve deneyimli mühendisler için hızlı bir başvuru kaynağı.'],
			],
			audienceEyebrow: 'Kimler için',
			audienceTitle: 'Açıklık ve pratik kullanım arayan geliştiriciler',
			audienceText:
				'Modern TypeScript öğrenmek, React\'i etkili bir şekilde türlendirmek ve dili gerçekçi tasarım sorunlarına uygulamak için tek ve odaklı bir kaynak istiyorsanız Plus Edition\'ı seçin. JavaScript bilgisi yardımcı olur ancak derin TypeScript deneyimi gerekli değildir.',
			trustEyebrow: 'Geliştiricilerin güvendiği',
			trustTitle: 'Popüler bir açık kaynaklı TypeScript kitabını temel alır',
			trustText:
				'Ücretsiz sürüm GitHub\'da 10.000\'den fazla yıldıza sahiptir ve birçok TypeScript geliştiricisi tarafından kullanılır. Plus Edition, Simone Poggiali tarafından yazılmıştır ve 20 yıllık uluslararası iş deneyimini pratik React rehberliği ile gerçek dünya TypeScript kalıplarıyla buluşturur.',
		},
		amazon: {
			eyebrow: 'Biçiminizi seçin',
			title: 'Plus Edition\'ı Amazon\'dan edinin',
			editionLabel: 'Sürüm',
			kindle: 'Kindle sürümü',
			paperback: 'Ciltsiz',
			buyOn: 'Satın alın:',
			detected: 'En uygun sürümü ve Amazon mağazasını açmak için tarayıcınızın dilini ve bölgesini kullanacağız.',
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
