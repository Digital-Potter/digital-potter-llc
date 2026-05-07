import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type VideoContent = {
	/** Admin source of truth — paste any YouTube/Vimeo/embed URL. */
	videoUrl?: string;
	caption?: string;
	/** Legacy parsed fields. */
	embedUrl?: string;
	youtubeId?: string;
	vimeoId?: string;
};

/**
 * Convert any pasted video URL to an iframe-friendly embed URL.
 * Recognizes YouTube (youtu.be / watch?v= / embed/) and Vimeo. Anything
 * else falls through as-is so the iframe still loads (e.g. existing
 * `https://player.vimeo.com/video/123` links).
 */
function toEmbedUrl(raw: string): string {
	try {
		const url = new URL(raw);
		const host = url.hostname.replace(/^www\./, '');

		if (host === 'youtu.be') {
			const id = url.pathname.slice(1);
			return `https://www.youtube.com/embed/${id}`;
		}
		if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
			if (url.pathname.startsWith('/embed/')) return raw;
			const id = url.searchParams.get('v');
			if (id) return `https://www.youtube.com/embed/${id}`;
		}
		if (host === 'vimeo.com') {
			const id = url.pathname.split('/').filter(Boolean)[0];
			if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
		}
	} catch {
		// Not a parseable URL — fall through.
	}
	return raw;
}

export function VideoSection({ section }: { section: CmsSection }) {
	const c = section.content as VideoContent | undefined;

	const src = c?.videoUrl
		? toEmbedUrl(c.videoUrl)
		: c?.embedUrl
			? c.embedUrl
			: c?.youtubeId
				? `https://www.youtube.com/embed/${c.youtubeId}`
				: c?.vimeoId
					? `https://player.vimeo.com/video/${c.vimeoId}`
					: null;
	if (!src) return null;

	return (
		<Section settings={section.settings}>
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
