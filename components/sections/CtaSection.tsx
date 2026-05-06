import { Section } from './Section';
import { ButtonLink } from '@/components/ui/Button';
import type { CmsSection } from '@/helpers/cms/types';

export function CtaSection({ section }: { section: CmsSection }) {
	const c = section.content as
		| { description?: string; href?: string; label?: string }
		| undefined;
	return (
		<Section layout="narrow" paddingY="large">
			<div className="bg-cream rounded-2xl p-10 text-center">
				{section.title && (
					<h2 className="text-3xl font-bold">{section.title}</h2>
				)}
				{c?.description && <p className="text-smoke mt-2">{c.description}</p>}
				{c?.href && (
					<ButtonLink href={c.href} className="mt-6">
						{c.label ?? 'Get in touch'}
					</ButtonLink>
				)}
			</div>
		</Section>
	);
}
