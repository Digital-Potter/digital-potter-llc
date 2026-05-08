import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	AboutHero,
	OurStory,
	WhyChooseCustom,
	CoreValues,
	WhyWeBuiltTheDavid,
} from '@/components/pages/about';
import { FinalCta } from '@/components/pages/home';
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
			<OurStory />
			<WhyChooseCustom />
			<CoreValues />
			<WhyWeBuiltTheDavid />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
