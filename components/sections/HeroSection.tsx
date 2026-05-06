import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

export function HeroSection({ section }: { section: CmsSection }) {
	const c = section.content as
		| { image?: { url: string; alt?: string }; description?: string }
		| undefined;
	return (
		<Section paddingY="large">
			<div className="text-center">
				{section.title && (
					<h1 className="text-4xl font-bold md:text-5xl">{section.title}</h1>
				)}
				{section.subtitle && (
					<p className="text-brand-green mt-3 text-lg font-semibold">
						{section.subtitle}
					</p>
				)}
				{c?.description && (
					<p className="text-smoke mx-auto mt-5 max-w-2xl">{c.description}</p>
				)}
				{c?.image?.url && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={c.image.url}
						alt={c.image.alt ?? ''}
						className="mx-auto mt-10 rounded-2xl shadow-xl"
					/>
				)}
			</div>
		</Section>
	);
}
