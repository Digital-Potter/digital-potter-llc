import { Section } from './Section';
import type { CmsSection, MediaRef } from '@/helpers/cms/types';

type ImageContent = {
	image?: MediaRef | string;
	caption?: string;
};

function imageRef(image: ImageContent['image']): MediaRef | null {
	if (!image) return null;
	if (typeof image === 'string') return { url: image };
	return image;
}

export function ImageSection({ section }: { section: CmsSection }) {
	const c = section.content as ImageContent | undefined;
	const image = imageRef(c?.image);
	if (!image?.url) return null;
	return (
		<Section settings={section.settings}>
			<figure className="mx-auto max-w-5xl">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={image.url}
					alt={image.alt ?? section.title ?? ''}
					className="dp-box-design w-full rounded-3xl"
				/>
				{c?.caption && (
					<figcaption className="text-dp-body/60 mt-4 text-center text-sm">
						{c.caption}
					</figcaption>
				)}
			</figure>
		</Section>
	);
}
