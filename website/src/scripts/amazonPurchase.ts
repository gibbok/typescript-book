interface EditionConfig {
	label: string;
	kindleAsin: string;
	paperbackAsin: string;
	kindleDomain?: string;
	paperbackDomain?: string;
}
type EditionKey = 'en' | 'it' | 'pt' | 'es';
export interface AmazonPurchaseConfig {
	domains: Record<string, string>;
	editions: Record<EditionKey, EditionConfig>;
	titles: Record<EditionKey, string>;
}

interface PurchaseSelection {
	domain: string;
	editionKey: EditionKey;
	kindleUrl: string;
	paperbackUrl: string;
}

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_REGION = 'US';

function getEditionKey(language: string): EditionKey {
	return language === 'it' || language === 'pt' || language === 'es' ? language : 'en';
}

export function getAmazonFormatLinks(edition: EditionConfig, domain: string) {
	return {
		kindleUrl: `https://www.${edition.kindleDomain || domain}/dp/${edition.kindleAsin}`,
		paperbackUrl: `https://www.${edition.paperbackDomain || domain}/dp/${edition.paperbackAsin}`,
	};
}

export function resolveAmazonPurchase(localeString: string, config: AmazonPurchaseConfig): PurchaseSelection {
	let locale: Intl.Locale;

	try {
		locale = new Intl.Locale(localeString).maximize();
	} catch {
		locale = new Intl.Locale(DEFAULT_LOCALE);
	}

	const region = locale.region || DEFAULT_REGION;
	const domain = config.domains[region] || config.domains[DEFAULT_REGION];
	const editionKey = getEditionKey(locale.language.toLowerCase());
	const edition = config.editions[editionKey];

	return {
		domain,
		editionKey,
		...getAmazonFormatLinks(edition, domain),
	};
}

function updatePurchaseOptions(
	root: HTMLElement,
	config: AmazonPurchaseConfig,
	domain: string,
	editionKey: EditionKey,
) {
	const edition = config.editions[editionKey];
	const kindleLink = root.querySelector<HTMLAnchorElement>('[data-format-link="kindle"]');
	const paperbackLink = root.querySelector<HTMLAnchorElement>('[data-format-link="paperback"]');
	const title = root.querySelector<HTMLElement>('[data-edition-title]');
	const message = root.querySelector<HTMLElement>('[data-detection-message]');

	if (!kindleLink || !paperbackLink || !title || !message) return;

	title.textContent = config.titles[editionKey];
	const links = getAmazonFormatLinks(edition, domain);
	kindleLink.href = links.kindleUrl;
	paperbackLink.href = links.paperbackUrl;
	const stores = [kindleLink, paperbackLink].map((link) => {
		const store = new URL(link.href).hostname.replace(/^www\./, '');
		const storeName = link.querySelector<HTMLElement>('[data-store-name]');
		if (storeName) storeName.textContent = store.replace('amazon.', 'Amazon.');
		return store;
	});
	message.textContent = `${edition.label} · ${[...new Set(stores)].join(' / ')}`;
}

export function initializeAmazonPurchaseOptions(root: HTMLElement) {
	const rawConfig = root.dataset.config;
	const select = root.querySelector<HTMLSelectElement>('[data-edition-select]');
	if (!rawConfig || !select) return;

	const config = JSON.parse(rawConfig) as AmazonPurchaseConfig;
	const browserLocale = navigator.languages?.[0] || navigator.language || DEFAULT_LOCALE;
	const selection = resolveAmazonPurchase(browserLocale, config);

	select.value = selection.editionKey;
	select.addEventListener('change', () => {
		updatePurchaseOptions(root, config, selection.domain, getEditionKey(select.value));
	});
	updatePurchaseOptions(root, config, selection.domain, selection.editionKey);
}
