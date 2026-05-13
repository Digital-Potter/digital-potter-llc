import { Section } from './Section';
import { ButtonLink } from '@/components/ui/Button';
import SectionButtons from './SectionButtons';
import type { BlockButton, CmsSection } from '@/helpers/cms/types';

type CtaContent = {
	description?: string;
	buttons?: BlockButton[];
	// Legacy single-button shape — kept for backward compatibility.
	href?: string;
	label?: string;
	openInNewTab?: boolean;
};

export function CtaSection({ section }: { section: CmsSection }) {
	const c = section.content as CtaContent | undefined;
	const hasButtonsArray = c?.buttons && c.buttons.length > 0;
	const hasLegacyHref = !hasButtonsArray && !!c?.href;

	return (
		<Section settings={section.settings}>
			<div className="dp-box-design relative mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center md:px-16 md:py-20">
				{section.title && <h2 className="text-balance">{section.title}</h2>}
				{section.subtitle && (
					<p className="text-dp-body/85 mx-auto mt-4 max-w-2xl text-lg text-balance">
						{section.subtitle}
					</p>
				)}
				{c?.description && (
					<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
						{c.description}
					</p>
				)}
				{hasButtonsArray ? (
					<SectionButtons
						buttons={c?.buttons}
						className="mt-10 flex flex-wrap items-center justify-center gap-4"
					/>
				) : hasLegacyHref ? (
					<div className="mt-10 flex justify-center">
						<ButtonLink href={c?.href ?? '#'} openInNewTab={c?.openInNewTab}>
							{c?.label ?? 'Get in touch'}
						</ButtonLink>
					</div>
				) : null}
			</div>
		</Section>
	);
}
