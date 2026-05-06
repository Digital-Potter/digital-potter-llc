import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type VideoContent = {
	embedUrl?: string;
	youtubeId?: string;
	vimeoId?: string;
	caption?: string;
};

export function VideoSection({ section }: { section: CmsSection }) {
	const c = section.content as VideoContent | undefined;
	const src = c?.embedUrl
		? c.embedUrl
		: c?.youtubeId
			? `https://www.youtube.com/embed/${c.youtubeId}`
			: c?.vimeoId
				? `https://player.vimeo.com/video/${c.vimeoId}`
				: null;
	if (!src) return null;

	return (
		<Section layout="wide">
			<figure className="mx-auto max-w-5xl">
				<div className="dp-box-design relative aspect-video overflow-hidden rounded-3xl">
					<iframe
						src={src}
						title={section.title ?? 'Video'}
						className="absolute inset-0 h-full w-full"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>
				{c?.caption && (
					<figcaption className="text-dp-body/60 mt-4 text-center text-sm">
						{c.caption}
					</figcaption>
				)}
			</figure>
		</Section>
	);
}
