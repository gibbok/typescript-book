export const PLUS_EDITION_PATH = '/typescript-book/plus-edition/';
export const PLUS_EDITION_COVER = '/typescript-book/images/plus-edition-cover.webp';

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
	IE: 'amazon.co.uk',
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
