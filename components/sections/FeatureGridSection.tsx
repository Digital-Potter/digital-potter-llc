import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type FeatureGridContent = {
	features?: { title: string; description?: string }[];
};

export function FeatureGridSection({ section }: { section: CmsSection }) {
	const c = section.content as FeatureGridContent | undefined;
	const features = c?.features ?? [];
	if (features.length === 0) return null;

	const cols =
		features.length >= 4
			? 'sm:grid-cols-2 lg:grid-cols-4'
			: features.length === 3
				? 'sm:grid-cols-3'
				: features.length === 2
					? 'sm:grid-cols-2'
					: 'grid-cols-1';

	return (
		<Section layout="wide">
			{(section.title || section.subtitle) && (
				<div className="mx-auto mb-12 max-w-4xl text-center">
					{section.title && <h2 className="text-balance">{section.title}</h2>}
					{section.subtitle && (
						<p className="text-dp-body/80 mt-4 text-balance">
							{section.subtitle}
						</p>
					)}
				</div>
			)}
			<ul className={`grid gap-6 ${cols}`}>
				{features.map((f, i) => (
					<li
						key={i}
						className="border-dp-dark/10 hover:border-dp-green/40 rounded-2xl border bg-white/50 p-6 transition-colors"
					>
						<span
							aria-hidden
							className="bg-dp-green inline-block h-3 w-3 rounded-full"
						/>
						<h3 className="font-primary-font mt-4 text-lg font-bold md:text-xl">
							{f.title}
						</h3>
						{f.description && (
							<p className="text-dp-body/75 mt-3 text-sm md:text-base">
								{f.description}
							</p>
						)}
					</li>
				))}
			</ul>
		</Section>
	);
}
