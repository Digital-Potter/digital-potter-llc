import type { Metadata } from 'next';
import { AboutTemplate } from '@/components/pageTemplates/AboutTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';

const FALLBACK = {
	title: 'About Digital Potter — Custom Web & Mobile Development Studio',
	description:
		'Digital Potter LLC is a small Virginia studio building custom Next.js websites, native mobile apps, and a managed headless CMS. 20+ years of experience, in-house design + dev + DevOps, no templates.',
};

export function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({
		slug: 'about-digital-potter',
		fallback: FALLBACK,
	});
}

export default function AboutDigitalPotter() {
	return <AboutTemplate />;
}
