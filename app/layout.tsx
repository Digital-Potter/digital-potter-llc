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
	resolveSiteOrigin,
	websiteSchema,
} from '@/helpers/seo/structuredData';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: colors.darkGreen,
};

const golosText = Golos_Text({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--primary-font',
	display: 'swap',
	preload: true,
	adjustFontFallback: true,
});

const figtree = Figtree({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--secondary-font',
	display: 'swap',
	preload: true,
	adjustFontFallback: true,
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
		metadataBase: new URL(
			resolveSiteOrigin(data?.settings?.storefront?.domain),
		),
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
		// Safari-friendly favicon chain — see clients/MIGRATION_PLAYBOOK.md
		// "Recurring gotchas → Favicons & Safari". This site additionally
		// serves /favicon.ico via a route handler at
		// `app/favicon.ico/route.ts` that redirects to whichever favicon
		// the CMS has configured (or /icons/favicon.ico as fallback).
		// We don't emit a `shortcut` here — that route is the canonical
		// source for /favicon.ico and adding a tag would double-up.
		// We also skip the SVG favicon link: Safari's SVG-favicon
		// support is inconsistent across versions, especially on heavy
		// SVGs (the brand SVG is multi-MB). PNG keeps every browser
		// happy. apple-touch-icon + PNG variants live at public/ root
		// so Safari's default GET /apple-touch-icon.png finds them.
		icons: {
			icon: [
				generated?.favicon32Url
					? { url: generated.favicon32Url, sizes: '32x32', type: 'image/png' }
					: seo?.faviconUrl
						? { url: seo.faviconUrl, type: 'image/png' }
						: {
								url: '/favicon-96x96.png',
								sizes: '96x96',
								type: 'image/png',
							},
				...(generated?.favicon96Url
					? [
							{
								url: generated.favicon96Url,
								sizes: '96x96',
								type: 'image/png',
							},
						]
					: []),
			],
			apple: {
				url:
					generated?.appleTouchUrl ??
					seo?.appleTouchIconUrl ??
					'/apple-touch-icon.png',
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

	const cmsOrigin = (() => {
		const v = process.env.NEXT_PUBLIC_CMS;
		if (!v) return null;
		try {
			return new URL(v).origin;
		} catch {
			return null;
		}
	})();

	return (
		<html lang="en" className={`${golosText.variable} ${figtree.variable}`}>
			<head>
				{cmsOrigin ? (
					<link rel="preconnect" href={cmsOrigin} crossOrigin="anonymous" />
				) : null}
				<link
					rel="preconnect"
					href="https://cf.digitalpotter.io"
					crossOrigin="anonymous"
				/>
			</head>
			<body className="min-h-screen antialiased">
				<a
					href="#main"
					className="bg-dp-dark-green sr-only z-50 rounded-md px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
				>
					Skip to main content
				</a>
				{tenant ? (
					<>
						<JsonLd data={organizationSchema(tenant, settings)} />
						<JsonLd data={websiteSchema(tenant, settings)} />
					</>
				) : null}
				<Nav />
				<main id="main">{children}</main>
				<Footer />
				<Suspense fallback={null}>
					<TrackPageVisit />
				</Suspense>
				{gaId ? <GoogleAnalytics gaId={gaId} /> : null}
			</body>
		</html>
	);
}
