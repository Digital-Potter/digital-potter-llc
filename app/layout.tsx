import type { Metadata } from 'next';
import { Golos_Text, Figtree } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';

const golosText = Golos_Text({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--primary-font',
	display: 'swap',
});

const figtree = Figtree({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--secondary-font',
	display: 'swap',
});

/**
 * Resolve the public site URL used as `metadataBase`. Required so Next.js can
 * turn relative OG/Twitter image paths and `alternates.canonical` values into
 * absolute URLs — without it, OG images break in social previews.
 */
function siteBaseUrl(): URL {
	const env = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? null;
	if (env) {
		try {
			return new URL(env);
		} catch {
			// Fall through.
		}
	}
	return new URL('http://localhost:3001');
}

export async function generateMetadata(): Promise<Metadata> {
	const data = await fetchStoreSettingsOrNull();
	const seo = data?.settings?.seo;
	const tenantSettings = data?.tenant?.settings;

	const fallbackTitle = 'Digital Potter — Custom Web & App Development';
	const fallbackDescription =
		'Beautifully crafted web and mobile apps. Designed for clarity, delight, and results.';

	const defaultTitle = seo?.defaultTitle ?? fallbackTitle;
	// `template` only kicks in for child segments that return a string title.
	// `buildPageMetadata` always returns `title: { absolute }`, so the
	// template runs only for routes without explicit metadata (e.g. errors).
	const titleTemplate = seo?.titleTemplate?.includes('%s')
		? seo.titleTemplate
		: `%s · ${tenantSettings?.storeName ?? 'Digital Potter'}`;

	const description =
		seo?.defaultDescription ??
		tenantSettings?.storeDescription ??
		fallbackDescription;
	const storeName = tenantSettings?.storeName ?? 'Digital Potter';

	return {
		metadataBase: siteBaseUrl(),
		title: {
			default: defaultTitle,
			template: titleTemplate,
		},
		description,
		openGraph: {
			title: defaultTitle,
			description,
			siteName: storeName,
			type: 'website',
			images: seo?.defaultOgImage ? [{ url: seo.defaultOgImage }] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title: defaultTitle,
			description,
			images: seo?.defaultOgImage ? [seo.defaultOgImage] : undefined,
		},
		icons: {
			icon: seo?.faviconUrl ?? '/favicon.ico',
			apple: seo?.appleTouchIconUrl,
		},
		robots:
			seo?.robots?.allowIndexing === false
				? { index: false, follow: false }
				: undefined,
	};
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${golosText.variable} ${figtree.variable}`}>
			<body className="min-h-screen antialiased">
				<Nav />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
