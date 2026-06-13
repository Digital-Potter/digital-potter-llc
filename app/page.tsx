import type { Metadata } from 'next';
import { HomepageTemplate } from '@/components/pageTemplates/HomepageTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';

const FALLBACK = {
	title: 'Digital Potter — Custom Web & App Development',
	description:
		'Beautifully crafted web and mobile apps. Designed for clarity, delight, and results.',
};

export async function generateMetadata(): Promise<Metadata> {
	const settings = await fetchStoreSettingsOrNull();
	const homepageSlug = settings?.settings?.siteStructure?.homepageSlug;
	return buildPageMetadata({
		slug: homepageSlug,
		fallback: FALLBACK,
		path: '/',
	});
}

export default function Home() {
	return <HomepageTemplate />;
}
