type PlusEditionEventName =
	| 'plus_edition_buy_anchor_click'
	| 'plus_edition_amazon_click'
	| 'plus_edition_sidebar_click'
	| 'plus_edition_top_banner_click';

type GtagParams = Record<string, string>;

declare global {
	interface Window {
		gtag?: (command: 'event', eventName: PlusEditionEventName, params: GtagParams) => void;
		plusEditionAnalyticsInitialized?: boolean;
	}
}

const TRACKING_SELECTOR = '[data-plus-edition-event]';

function cleanText(text: string) {
	return text.replace(/\s+/g, ' ').trim();
}

function getLinkText(link: HTMLAnchorElement) {
	return cleanText(link.dataset.plusEditionCtaText || link.getAttribute('aria-label') || link.textContent || '');
}

function getAmazonLinkDetails(link: HTMLAnchorElement) {
	const url = new URL(link.href);
	const asin = url.pathname.match(/\/dp\/([^/?#]+)/)?.[1] || '';
	const root = link.closest<HTMLElement>('[data-amazon-purchase]');
	const select = root?.querySelector<HTMLSelectElement>('[data-edition-select]');

	return {
		amazon_domain: url.hostname.replace(/^www\./, ''),
		asin,
		edition: select?.value === 'it' ? 'it' : 'en',
		format: link.dataset.formatLink || '',
		link_url: url.href,
	};
}

function buildEventParams(link: HTMLAnchorElement, eventName: PlusEditionEventName) {
	const baseParams: GtagParams = {
		cta_id: link.dataset.plusEditionCtaId || '',
		cta_text: getLinkText(link),
		destination: link.getAttribute('href') || link.href,
		page_path: window.location.pathname,
		placement: link.dataset.plusEditionPlacement || '',
	};

	if (eventName !== 'plus_edition_amazon_click') {
		return baseParams;
	}

	return {
		...baseParams,
		...getAmazonLinkDetails(link),
	};
}

function handlePlusEditionAnalyticsClick(event: MouseEvent) {
	const target = event.target;
	if (!(target instanceof Element)) return;

	const link = target.closest<HTMLAnchorElement>(TRACKING_SELECTOR);
	const eventName = link?.dataset.plusEditionEvent as PlusEditionEventName | undefined;
	if (!link || !eventName || !window.gtag) return;

	window.gtag('event', eventName, buildEventParams(link, eventName));
}

export function initializePlusEditionAnalytics() {
	if (window.plusEditionAnalyticsInitialized) return;

	window.plusEditionAnalyticsInitialized = true;
	document.addEventListener('click', handlePlusEditionAnalyticsClick);
}
