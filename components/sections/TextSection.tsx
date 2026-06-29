import Image from 'next/image';
import { Section } from './Section';
import SectionButtons from './SectionButtons';
import type { BlockButton, BlockColumn, CmsSection } from '@/helpers/cms/types';
import { toMediaRef } from '@/helpers/cms/media';
import { renderCmsHtml } from '@/helpers/cms/richText';

type TextContent = {
	columns?: BlockColumn[];
	buttons?: BlockButton[];
	eyebrow?: string;
	/** Legacy single-blob fallback (pre-columns content). */
	body?: string;
};

const colsClass: Record<number, string> = {
	1: 'grid-cols-1',
	2: 'grid-cols-1 md:grid-cols-2',
	3: 'grid-cols-1 md:grid-cols-3',
	4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
	5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
	6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
};

export function TextSection({ section }: { section: CmsSection }) {
	const c = section.content as TextContent | undefined;
	const eyebrow = c?.eyebrow ?? section.label;
	const columns = c?.columns ?? [];
	const hasColumns = columns.length > 0;
	const colCount = Math.min(Math.max(columns.length, 1), 6);

	return (
		<Section
			settings={section.settings}
			layout={hasColumns ? 'contained' : 'narrow'}
		>
			{(eyebrow || section.title || section.subtitle) && (
				<div className="mx-auto mb-10 max-w-4xl">
					{section.title && (
						<h2 className="mt-4 text-balance">{section.title}</h2>
					)}
					{section.subtitle && (
						<p className="text-dp-body/85 mt-4 text-lg md:text-xl">
							{section.subtitle}
						</p>
					)}
				</div>
			)}

			{hasColumns ? (
				<ul className={`grid gap-8 ${colsClass[colCount]}`}>
					{columns.map((col, i) => {
						const img = toMediaRef(col.image);
						return (
							<li key={i} className="flex flex-col gap-4">
								{img?.url &&
									(img.width && img.height ? (
										<Image
											src={img.url}
											alt={img.alt ?? col.title ?? ''}
											width={img.width}
											height={img.height}
											sizes={`(min-width: 1024px) ${Math.round(100 / colCount)}vw, 100vw`}
											className="dp-box-design h-auto w-full rounded-2xl"
										/>
									) : (
										<div className="dp-box-design relative aspect-square overflow-hidden rounded-2xl">
											<Image
												src={img.url}
												alt={img.alt ?? col.title ?? ''}
												fill
												sizes={`(min-width: 1024px) ${Math.round(100 / colCount)}vw, 100vw`}
												className="object-cover"
											/>
										</div>
									))}
								{col.title && (
									<h3 className="font-primary-font text-xl font-bold md:text-2xl">
										{col.title}
									</h3>
								)}
								{col.content && (
									<div
										className="prose prose-base prose-headings:font-primary-font prose-p:text-dp-body/85 prose-strong:text-dp-dark prose-a:text-dp-dark-green hover:prose-a:text-dp-green max-w-none text-sm md:text-base"
										dangerouslySetInnerHTML={{
											__html: renderCmsHtml(col.content),
										}}
									/>
								)}
								{col.listItems && col.listItems.length > 0 && (
									<ul className="flex flex-col gap-4">
										{col.listItems.map((item, idx) => (
											<li key={idx} className="flex items-start gap-3">
												{item.icon && (
													<Image
														src={item.icon}
														alt=""
														width={24}
														height={24}
														className="mt-1 h-6 w-6 shrink-0 object-contain"
													/>
												)}
												<div>
													{item.title && (
														<p className="font-primary-font font-semibold">
															{item.title}
														</p>
													)}
													{item.subtitle && (
														<p className="text-dp-body/85 text-sm">
															{item.subtitle}
														</p>
													)}
												</div>
											</li>
										))}
									</ul>
								)}
							</li>
						);
					})}
				</ul>
			) : c?.body ? (
				<div className="text-dp-body/85 mt-6 space-y-5 text-base whitespace-pre-wrap md:text-lg">
					{c.body}
				</div>
			) : null}

			<SectionButtons
				buttons={c?.buttons}
				className="mt-10 flex flex-wrap items-center justify-center gap-4"
			/>
		</Section>
	);
}
