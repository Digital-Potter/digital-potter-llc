import Image from 'next/image';
import { Section } from './Section';
import SectionButtons from './SectionButtons';
import type { BlockButton, BlockColumn, CmsSection } from '@/helpers/cms/types';
import { toMediaRef } from '@/helpers/cms/media';

type FeatureGridContent = {
	columns?: BlockColumn[];
	buttons?: BlockButton[];
	/** Legacy shape — flat features list with title/description. */
	features?: { title: string; description?: string }[];
};

const colsClass: Record<number, string> = {
	1: 'grid-cols-1',
	2: 'grid-cols-1 md:grid-cols-2',
	3: 'grid-cols-1 md:grid-cols-3',
	4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
	5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
	6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
};

/**
 * Feature grid renders the same `content.columns[]` shape as TEXT but with
 * card chrome (border, hover state, dot accent) instead of a plain list.
 */
export function FeatureGridSection({ section }: { section: CmsSection }) {
	const c = section.content as FeatureGridContent | undefined;
	const columns: BlockColumn[] =
		c?.columns ??
		c?.features?.map((f) => ({
			title: f.title,
			content: f.description,
		})) ??
		[];
	if (columns.length === 0) return null;

	const colCount = Math.min(Math.max(columns.length, 1), 6);

	return (
		<Section settings={section.settings}>
			{(section.title || section.subtitle) && (
				<div className="mx-auto mb-12 max-w-4xl text-center">
					{section.title && <h2 className="text-balance">{section.title}</h2>}
					{section.subtitle && (
						<p className="text-dp-body-soft mt-4 text-balance">
							{section.subtitle}
						</p>
					)}
				</div>
			)}
			<ul className={`grid gap-6 ${colsClass[colCount]}`}>
				{columns.map((col, i) => {
					const img = toMediaRef(col.image);
					return (
						<li
							key={i}
							className="border-dp-dark/10 hover:border-dp-green/40 rounded-2xl border bg-white/50 p-6 transition-colors"
						>
							{img?.url ? (
								<div className="relative mb-4 aspect-square w-12 overflow-hidden rounded-xl">
									<Image
										src={img.url}
										alt={img.alt ?? col.title ?? ''}
										fill
										sizes="48px"
										className="object-cover"
									/>
								</div>
							) : (
								<span
									aria-hidden
									className="bg-dp-green inline-block h-3 w-3 rounded-full"
								/>
							)}
							{col.title && (
								<h3 className="font-primary-font mt-4 text-lg font-bold md:text-xl">
									{col.title}
								</h3>
							)}
							{col.content && (
								<div
									className="prose prose-sm prose-p:text-dp-body-soft prose-strong:text-dp-dark prose-a:text-dp-dark-green mt-3 max-w-none"
									dangerouslySetInnerHTML={{ __html: col.content }}
								/>
							)}
						</li>
					);
				})}
			</ul>
			<SectionButtons
				buttons={c?.buttons}
				className="mt-10 flex flex-wrap items-center justify-center gap-4"
			/>
		</Section>
	);
}
