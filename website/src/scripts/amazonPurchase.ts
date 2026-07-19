interface EditionConfig {
	label: string;
	kindleAsin: string;
	paperbackAsin: string;
}
export interface AmazonPurchaseConfig {
	domains: Record<string, string>;
	editions: Record<'en' | 'it', EditionConfig>;
	titles: Record<'en' | 'it', string>;
}

interface PurchaseSelection {
	domain: string;
	editionKey: 'en' | 'it';
	kindleUrl: string;
	paperbackUrl: string;
}

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_REGION = 'US';

export function resolveAmazonPurchase(localeString: string, config: AmazonPurchaseConfig): PurchaseSelection {
	let locale: Intl.Locale;

	try {
		locale = new Intl.Locale(localeString).maximize();
	} catch {
		locale = new Intl.Locale(DEFAULT_LOCALE);
	}

	const region = locale.region || DEFAULT_REGION;
	const domain = config.domains[region] || config.domains[DEFAULT_REGION];
	const editionKey = locale.language.toLowerCase() === 'it' ? 'it' : 'en';
	const edition = config.editions[editionKey];

	return {
		domain,
		editionKey,
		kindleUrl: `https://www.${domain}/dp/${edition.kindleAsin}`,
		paperbackUrl: `https://www.${domain}/dp/${edition.paperbackAsin}`,
	};
}

function updatePurchaseOptions(
	root: HTMLElement,
	config: AmazonPurchaseConfig,
	domain: string,
	editionKey: 'en' | 'it',
) {
	const edition = config.editions[editionKey];
	const kindleLink = root.querySelector<HTMLAnchorElement>('[data-format-link="kindle"]');
	const paperbackLink = root.querySelector<HTMLAnchorElement>('[data-format-link="paperback"]');
	const title = root.querySelector<HTMLElement>('[data-edition-title]');
	const message = root.querySelector<HTMLElement>('[data-detection-message]');

	if (!kindleLink || !paperbackLink || !title || !message) return;

	title.textContent = config.titles[editionKey];
	kindleLink.href = `https://www.${domain}/dp/${edition.kindleAsin}`;
	paperbackLink.href = `https://www.${domain}/dp/${edition.paperbackAsin}`;
	root.querySelectorAll<HTMLElement>('[data-store-name]').forEach((element) => {
		element.textContent = domain.replace('amazon.', 'Amazon.');
	});
	message.textContent = `${edition.label} · ${domain}`;
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
		updatePurchaseOptions(root, config, selection.domain, select.value === 'it' ? 'it' : 'en');
	});
	updatePurchaseOptions(root, config, selection.domain, selection.editionKey);
}
