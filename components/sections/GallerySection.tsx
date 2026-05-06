import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type GalleryContent = {
	images?: { url: string; alt?: string }[];
};

export function GallerySection({ section }: { section: CmsSection }) {
	const c = section.content as GalleryContent | undefined;
	const images = c?.images ?? [];
	if (images.length === 0) return null;
	return (
		<Section layout="wide">
			{section.title && (
				<div className="mx-auto mb-10 max-w-4xl text-center">
					<h2 className="text-balance">{section.title}</h2>
				</div>
			)}
			<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{images.map((img, i) => (
					<li
						key={i}
						className="dp-box-design relative aspect-[4/3] overflow-hidden rounded-2xl"
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={img.url}
							alt={img.alt ?? ''}
							className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
						/>
					</li>
				))}
			</ul>
		</Section>
	);
}
