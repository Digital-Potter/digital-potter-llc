import { Section } from './Section';
import SectionButtons from './SectionButtons';
import type { BlockButton, CmsSection } from '@/helpers/cms/types';

type HeroContent = {
	image?: { url: string; alt?: string };
	description?: string;
	eyebrow?: string;
	buttons?: BlockButton[];
};

export function HeroSection({ section }: { section: CmsSection }) {
	const c = section.content as HeroContent | undefined;
	const eyebrow = c?.eyebrow ?? section.label;

	return (
		<Section paddingY="large" layout="wide">
			<div className="mx-auto max-w-4xl text-center">
				{eyebrow && (
					<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
						{eyebrow}
					</p>
				)}
				{section.title && (
					<h1 className="mt-6 text-balance">{section.title}</h1>
				)}
				{section.subtitle && (
					<p className="text-dp-dark-green mt-4 text-lg font-semibold md:text-xl">
						{section.subtitle}
					</p>
				)}
				{c?.description && (
					<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-balance">
						{c.description}
					</p>
				)}
				<SectionButtons
					buttons={c?.buttons}
					className="mt-10 flex flex-wrap items-center justify-center gap-4"
				/>
			</div>
			{c?.image?.url && (
				<div className="mx-auto mt-12 max-w-5xl">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={c.image.url}
						alt={c.image.alt ?? section.title ?? ''}
						className="dp-box-design w-full rounded-3xl"
					/>
				</div>
			)}
		</Section>
	);
}
