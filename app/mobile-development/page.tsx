import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	MobileHero,
	WhyReactNativeExpo,
	WhatWeBuild,
	TechStack,
	MobileProcess,
	MobilePricingCallouts,
} from '@/components/pages/mobile';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title: 'Mobile App Development — React Native + Expo',
	description:
		'Cross-platform mobile apps from Digital Potter LLC. Built with React Native and Expo for native-quality iOS and Android performance. Customer-facing apps, internal tools, events, and membership apps.',
};

export default async function MobileDevelopmentPage() {
	const cta = await resolveCtaHref();

	return (
		<>
			<MobileHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<WhyReactNativeExpo />
			<WhatWeBuild />
			<TechStack />
			<MobilePricingCallouts />
			<MobileProcess />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
