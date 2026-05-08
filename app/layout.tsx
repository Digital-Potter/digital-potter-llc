import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Golos_Text, Figtree } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import TrackPageVisit from '@/components/analytics/TrackPageVisit';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	organizationSchema,
	siteBaseUrl,
	websiteSchema,
} from '@/helpers/seo/structuredData';

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

export async function generateMetadata(): Promise<Metadata> {
	const data = await fetchStoreSettingsOrNull();

	const seo = data?.settings?.seo;
	const tenantSettings = data?.tenant?.settings;

	const fallbackTitle = 'Digital Potter LLC | Custom Web & App Development';
	const fallbackDescription =
		'Beautifully crafted web and mobile apps. Designed for clarity, delight, and results.';

	const defaultTitle = seo?.defaultTitle ?? fallbackTitle;
	// `template` only kicks in for child segments that return a string title.
	// `buildPageMetadata` always returns `title: { absolute }`, so the
	// template runs only for routes without explicit metadata (e.g. errors).
	const titleTemplate = seo?.titleTemplate?.includes('%s')
		? seo.titleTemplate
		: `%s · ${tenantSettings?.storeName ?? 'Digital Potter | Virginia, USA'}`;

	const description =
		seo?.defaultDescription ??
		tenantSettings?.storeDescription ??
		fallbackDescription;
	const storeName =
		tenantSettings?.storeName ?? 'Digital Potter | Virginia, USA';

	return {
		metadataBase: new URL(siteBaseUrl()),
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

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const data = await fetchStoreSettingsOrNull();
	const tenant = data?.tenant ?? null;
	const settings = data?.settings ?? null;

	return (
		<html lang="en" className={`${golosText.variable} ${figtree.variable}`}>
			<head>
				<link
					rel="icon"
					type="image/png"
					href="/icons/favicon-96x96.png"
					sizes="96x96"
				/>
				<link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
				<link rel="shortcut icon" href="/icons/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/apple-touch-icon.png"
				/>
				<meta name="apple-mobile-web-app-title" content="Digital Potter" />
				<link rel="manifest" href="/icons/site.webmanifest" />
			</head>
			<body className="min-h-screen antialiased">
				{tenant ? (
					<>
						<JsonLd data={organizationSchema(tenant, settings)} />
						<JsonLd data={websiteSchema(tenant, settings)} />
					</>
				) : null}
				<Nav />
				<main>{children}</main>
				<Footer />
				<Suspense fallback={null}>
					<TrackPageVisit />
				</Suspense>
			</body>
		</html>
	);
}
