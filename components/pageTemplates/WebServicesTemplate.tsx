import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	WebHero,
	WhyCustomNextjs,
	WhatWeBuildWeb,
	WebTechStack,
	WebPricingCallouts,
	WebProcess,
} from '@/components/pages/web';
import ClosingCta from '@/components/shared/ClosingCta';
import FeatureBlock from '@/components/shared/FeatureBlock';
import TestimonialQuote from '@/components/shared/TestimonialQuote';
import { getSiteUrls } from '@/helpers/cms/urls';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	SERVICE_DESCRIPTORS,
	serviceSchema,
} from '@/helpers/seo/structuredData';

export async function WebServicesTemplate() {
	const [cta, settings, urls] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
		getSiteUrls(),
	]);
	const tenant = settings?.tenant;
	const ldData = tenant
		? serviceSchema({
				descriptor: SERVICE_DESCRIPTORS.web,
				url: '/web-services-by-digital-potter',
				tenant,
			})
		: null;

	return (
		<>
			<JsonLd data={ldData} />
			<WebHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<WhyCustomNextjs />

			<FeatureBlock
				tag="Included with every build"
				headline="Your site ships with its own command center."
				body="Every Digital Potter website comes with theDavid — the CMS we built so our clients never wait on a developer. Edit pages like a doc, publish in seconds, and watch orders, bookings, and visits from one dashboard."
				bullets={[
					'Edit any page yourself — no code, no deploys, nothing to break',
					'SEO settings, drafts, and instant preview on every page',
					'Bookings, products, and menus switch on when you need them',
				]}
				screenshotSrc="/cms/digital-potter-cms-editor.png"
				screenshotAlt="theDavid page editor with rich-text toolbar and SEO settings"
				reverse
				linkHref="/the-cms-we-built-for-our-own-clients"
				linkLabel="Take the full tour of theDavid"
			/>

			<WhatWeBuildWeb />
			<WebTechStack />

			<TestimonialQuote
				id="verity-electric"
				linkHref={urls.portfolioIndex}
				linkLabel="See the work →"
			/>

			<WebPricingCallouts />
			<WebProcess />

			<ClosingCta
				heading="Your website should start paying for itself."
				body="Custom builds start at $1,900 — designed by hand, owned by you, run by your team. Tell us about your business on a free 45-minute call and leave with a real number."
				secondaryHref="/contact-digital-potter"
				secondaryLabel="Get a written quote"
			/>
		</>
	);
}
