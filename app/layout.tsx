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

export async function generateMetadata(): Promise<Metadata> {
	const data = await fetchStoreSettingsOrNull();
	const seo = data?.settings?.seo;
	const tenantSettings = data?.tenant?.settings;

	const fallbackTitle = 'Digital Potter — Custom Web & App Development';
	const fallbackDescription =
		'Beautifully crafted web and mobile apps. Designed for clarity, delight, and results.';

	return {
		title: seo?.defaultTitle
			? {
					default: seo.defaultTitle,
					template:
						seo.titleTemplate ??
						`%s · ${tenantSettings?.storeName ?? 'Digital Potter'}`,
				}
			: {
					default: fallbackTitle,
					template: '%s · Digital Potter',
				},
		description:
			seo?.defaultDescription ??
			tenantSettings?.storeDescription ??
			fallbackDescription,
		openGraph: seo?.defaultOgImage
			? { images: [seo.defaultOgImage] }
			: undefined,
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
