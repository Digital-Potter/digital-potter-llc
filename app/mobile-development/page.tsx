import type { Metadata } from 'next';
import { MobileDevelopmentTemplate } from '@/components/pageTemplates/MobileDevelopmentTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';

const FALLBACK = {
	title: 'Mobile App Development — React Native + Expo',
	description:
		'Cross-platform mobile apps from Digital Potter LLC. Built with React Native and Expo for native-quality iOS and Android performance. Customer-facing apps, internal tools, events, and membership apps.',
};

export function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({ slug: 'mobile-development', fallback: FALLBACK });
}

export default function MobileDevelopmentPage() {
	return <MobileDevelopmentTemplate />;
}
