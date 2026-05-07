import { Section } from './Section';
import SectionButtons from './SectionButtons';
import type { BlockButton, CmsSection } from '@/helpers/cms/types';

type TextContent = {
	body?: string;
	eyebrow?: string;
	buttons?: BlockButton[];
};

export function TextSection({ section }: { section: CmsSection }) {
	const c = section.content as TextContent | undefined;
	const eyebrow = c?.eyebrow ?? section.label;

	return (
		<Section layout="narrow">
			{eyebrow && (
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					{eyebrow}
				</p>
			)}
			{section.title && <h2 className="mt-4 text-balance">{section.title}</h2>}
			{section.subtitle && (
				<p className="text-dp-body/85 mt-4 text-lg md:text-xl">
					{section.subtitle}
				</p>
			)}
			{c?.body && (
				<div className="text-dp-body/85 mt-6 space-y-5 text-base whitespace-pre-wrap md:text-lg">
					{c.body}
				</div>
			)}
			<SectionButtons
				buttons={c?.buttons}
				className="mt-8 flex flex-wrap gap-4"
			/>
		</Section>
	);
}
