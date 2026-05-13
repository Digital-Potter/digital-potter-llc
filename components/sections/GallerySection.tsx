import Image from 'next/image';
import { Section } from './Section';
import type { CmsSection, MediaRef } from '@/helpers/cms/types';

type GalleryContent = {
	/** Admin source of truth — array of image URL strings. */
	galleryImages?: string[];
	/** Legacy field name — array of `{url, alt}` objects. */
	images?: MediaRef[];
};

function normalizeImages(c: GalleryContent | undefined): MediaRef[] {
	if (c?.galleryImages?.length) {
		return c.galleryImages.map((url) => ({ url }));
	}
	if (c?.images?.length) {
		return c.images;
	}
	return [];
}

export function GallerySection({ section }: { section: CmsSection }) {
	const c = section.content as GalleryContent | undefined;
	const images = normalizeImages(c);
	if (images.length === 0) return null;
	return (
		<Section settings={section.settings}>
			{section.title && (
				<div className="mx-auto mb-10 max-w-4xl text-center">
					<h2 className="text-balance">{section.title}</h2>
				</div>
			)}
			<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{images.map((img, i) => (
					<li
						key={`${img.url}-${i}`}
						className="dp-box-design relative aspect-[4/3] overflow-hidden rounded-2xl"
					>
						<Image
							src={img.url}
							alt={img.alt ?? ''}
							width={img.width ?? 800}
							height={img.height ?? 600}
							sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							className="object-cover transition-transform duration-500 hover:scale-105"
						/>
					</li>
				))}
			</ul>
		</Section>
	);
}
