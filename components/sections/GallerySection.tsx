import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

export function GallerySection({ section }: { section: CmsSection }) {
	const c = section.content as
		| { images?: { url: string; alt?: string }[] }
		| undefined;
	const images = c?.images ?? [];
	if (images.length === 0) return null;
	return (
		<Section>
			{section.title && (
				<h2 className="mb-6 text-2xl font-bold">{section.title}</h2>
			)}
			<div className="grid gap-4 md:grid-cols-3">
				{images.map((img, i) => (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						key={i}
						src={img.url}
						alt={img.alt ?? ''}
						className="aspect-video w-full rounded-xl object-cover"
					/>
				))}
			</div>
		</Section>
	);
}
