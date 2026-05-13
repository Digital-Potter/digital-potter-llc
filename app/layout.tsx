import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Golos_Text, Figtree } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { colors } from '@/lib/tokens';
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

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: colors.darkGreen,
};

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
	const webmaster = data?.settings?.webmasterTools;
	const generated = seo?.generatedIcons;

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
			icon: [
				generated?.favicon32Url
					? { url: generated.favicon32Url, sizes: '32x32', type: 'image/png' }
					: { url: '/icons/favicon.svg', type: 'image/svg+xml' },
				generated?.favicon96Url
					? { url: generated.favicon96Url, sizes: '96x96', type: 'image/png' }
					: {
							url: '/icons/favicon-96x96.png',
							sizes: '96x96',
							type: 'image/png',
						},
			],
			shortcut: generated?.faviconIcoUrl ?? '/icons/favicon.ico',
			apple: {
				url:
					generated?.appleTouchUrl ??
					seo?.appleTouchIconUrl ??
					'/icons/apple-touch-icon.png',
				sizes: '180x180',
			},
		},
		appleWebApp: {
			title: 'Digital Potter',
		},
		robots:
			seo?.robots?.allowIndexing === false
				? { index: false, follow: false }
				: undefined,
		verification: {
			google: webmaster?.googleSiteVerification || undefined,
			other: webmaster?.bingSiteVerification
				? { 'msvalidate.01': webmaster.bingSiteVerification }
				: undefined,
		},
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
	const ga = settings?.googleAnalytics;
	const gaId =
		ga?.trackingEnabled && ga.measurementId ? ga.measurementId : null;

	return (
		<html lang="en" className={`${golosText.variable} ${figtree.variable}`}>
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
				{gaId ? <GoogleAnalytics gaId={gaId} /> : null}
			</body>
		</html>
	);
}
