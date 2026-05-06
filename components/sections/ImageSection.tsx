import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type ImageContent = {
	image?: { url: string; alt?: string };
	caption?: string;
};

export function ImageSection({ section }: { section: CmsSection }) {
	const c = section.content as ImageContent | undefined;
	if (!c?.image?.url) return null;
	return (
		<Section layout="wide">
			<figure className="mx-auto max-w-5xl">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={c.image.url}
					alt={c.image.alt ?? section.title ?? ''}
					className="dp-box-design w-full rounded-3xl"
				/>
				{c.caption && (
					<figcaption className="text-dp-body/60 mt-4 text-center text-sm">
						{c.caption}
					</figcaption>
				)}
			</figure>
		</Section>
	);
}
