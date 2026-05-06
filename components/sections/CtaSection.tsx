import { Section } from './Section';
import { ButtonLink } from '@/components/ui/Button';
import type { CmsSection } from '@/helpers/cms/types';

type CtaContent = {
	description?: string;
	href?: string;
	label?: string;
};

export function CtaSection({ section }: { section: CmsSection }) {
	const c = section.content as CtaContent | undefined;
	return (
		<Section layout="wide" paddingY="large">
			<div className="dp-box-design relative mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center md:px-16 md:py-20">
				{section.title && <h2 className="text-balance">{section.title}</h2>}
				{c?.description && (
					<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-balance">
						{c.description}
					</p>
				)}
				{c?.href && (
					<div className="mt-10 flex justify-center">
						<ButtonLink href={c.href}>{c.label ?? 'Get in touch'}</ButtonLink>
					</div>
				)}
			</div>
		</Section>
	);
}
