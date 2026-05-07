import { Section } from './Section';
import { ButtonLink } from '@/components/ui/Button';
import type { CmsSection } from '@/helpers/cms/types';

/**
 * Marketing-site contact form sections render a CTA pointing to the real
 * contact page (`/contact-digital-potter`). The full contact flow lives there
 * and is non-trivial to embed in arbitrary CMS sections, so the section
 * doubles as a styled CTA.
 */
export function ContactFormSection({ section }: { section: CmsSection }) {
	return (
		<Section settings={section.settings}>
			<div className="dp-box-design relative mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center md:px-16 md:py-20">
				<h2 className="text-balance">{section.title ?? 'Get in touch'}</h2>
				{section.subtitle && (
					<p className="text-dp-body/85 mx-auto mt-4 max-w-2xl text-lg text-balance">
						{section.subtitle}
					</p>
				)}
				<div className="mt-10 flex justify-center">
					<ButtonLink href="/contact-digital-potter">
						Start a conversation
					</ButtonLink>
				</div>
			</div>
		</Section>
	);
}
