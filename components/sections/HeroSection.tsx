import Image from 'next/image';
import { Section } from './Section';
import SectionButtons from './SectionButtons';
import type {
	BlockButton,
	BlockColumn,
	CmsSection,
	MediaRef,
} from '@/helpers/cms/types';

type HeroContent = {
	image?: MediaRef | string;
	imageAsBackground?: boolean;
	columns?: BlockColumn[];
	buttons?: BlockButton[];
	eyebrow?: string;
	/** Legacy. */
	description?: string;
};

function imageRef(image: HeroContent['image']): MediaRef | null {
	if (!image) return null;
	if (typeof image === 'string') return { url: image };
	return image;
}

const colsClass: Record<number, string> = {
	1: 'grid-cols-1',
	2: 'grid-cols-1 md:grid-cols-2',
	3: 'grid-cols-1 md:grid-cols-3',
	4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
	5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
	6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
};

export function HeroSection({ section }: { section: CmsSection }) {
	const c = section.content as HeroContent | undefined;
	const eyebrow = c?.eyebrow ?? section.label;
	const image = imageRef(c?.image);
	const columns = c?.columns ?? [];
	const colCount = Math.min(Math.max(columns.length, 1), 6);

	return (
		<Section
			settings={section.settings}
			paddingTop="large"
			paddingBottom="large"
		>
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
					<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
						{c.description}
					</p>
				)}
				<SectionButtons
					buttons={c?.buttons}
					className="mt-10 flex flex-wrap items-center justify-center gap-4"
				/>
			</div>
			{image?.url && (
				<div className="mx-auto mt-12 max-w-5xl">
					<Image
						src={image.url}
						alt={image.alt ?? section.title ?? ''}
						width={image.width ?? 1600}
						height={image.height ?? 900}
						sizes="(min-width: 1024px) 64rem, 100vw"
						priority
						className="dp-box-design h-auto w-full rounded-3xl"
					/>
				</div>
			)}
			{columns.length > 0 && (
				<ul className={`mt-16 grid gap-8 ${colsClass[colCount]}`}>
					{columns.map((col, i) => {
						const colImg = imageRef(col.image);
						return (
							<li key={i} className="flex flex-col gap-3 text-center">
								{colImg?.url && (
									<div className="relative mx-auto h-12 w-12 overflow-hidden rounded-xl">
										<Image
											src={colImg.url}
											alt={colImg.alt ?? col.title ?? ''}
											fill
											sizes="48px"
											className="object-cover"
										/>
									</div>
								)}
								{col.title && (
									<h3 className="font-primary-font text-lg font-bold">
										{col.title}
									</h3>
								)}
								{col.content && (
									<div
										className="prose prose-sm prose-p:text-dp-body-soft max-w-none"
										dangerouslySetInnerHTML={{ __html: col.content }}
									/>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</Section>
	);
}
