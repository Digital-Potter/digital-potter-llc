import Image from 'next/image';
import { Section } from './Section';
import type { CmsSection, MediaRef } from '@/helpers/cms/types';
import { toMediaRef } from '@/helpers/cms/media';

type ImageContent = {
	image?: MediaRef | string;
	caption?: string;
};

export function ImageSection({ section }: { section: CmsSection }) {
	const c = section.content as ImageContent | undefined;
	const image = toMediaRef(c?.image);
	if (!image?.url) return null;
	const width = image.width ?? 1600;
	const height = image.height ?? 1067;
	return (
		<Section settings={section.settings}>
			<figure className="mx-auto max-w-5xl">
				<Image
					src={image.url}
					alt={image.alt ?? section.title ?? ''}
					width={width}
					height={height}
					sizes="(min-width: 1024px) 64rem, 100vw"
					className="dp-box-design h-auto w-full rounded-3xl"
				/>
				{c?.caption && (
					<figcaption className="text-dp-body-soft mt-4 text-center text-sm">
						{c.caption}
					</figcaption>
				)}
			</figure>
		</Section>
	);
}
