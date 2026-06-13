import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	AboutHero,
	OurStory,
	WhyChooseCustom,
	CoreValues,
	WhyWeBuiltTheDavid,
} from '@/components/pages/about';
import MeetTheFounder from '@/components/pages/about/MeetTheFounder';
import ClosingCta from '@/components/shared/ClosingCta';
import TestimonialQuote from '@/components/shared/TestimonialQuote';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	organizationSchema,
	webPageSchema,
} from '@/helpers/seo/structuredData';

export async function AboutTemplate() {
	const [cta, settings] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
	]);
	const tenant = settings?.tenant;
	const aboutSchema = tenant
		? webPageSchema({
				type: 'AboutPage',
				name: `About ${tenant.settings.storeName}`,
				description: tenant.settings.storeDescription,
				url: '/about',
				image: tenant.settings.logoUrl,
				tenant,
				mainEntity: organizationSchema(tenant, settings?.settings ?? null),
			})
		: null;

	return (
		<>
			<JsonLd data={aboutSchema} />
			<AboutHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<MeetTheFounder />
			<OurStory />
			<WhyWeBuiltTheDavid />
			<TestimonialQuote id="hair-we-share" />
			<WhyChooseCustom />
			<CoreValues />
			<ClosingCta
				heading="Come meet the person who'd actually build it."
				body="A free 45-minute discovery call — no account managers, no sales script. Just your business, what it needs online, and an honest number."
				secondaryHref="/contact-digital-potter"
				secondaryLabel="Send us a message instead"
			/>
		</>
	);
}
