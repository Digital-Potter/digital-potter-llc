import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

export function ImageSection({ section }: { section: CmsSection }) {
	const c = section.content as
		| { image?: { url: string; alt?: string } }
		| undefined;
	if (!c?.image?.url) return null;
	return (
		<Section>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={c.image.url}
				alt={c.image.alt ?? ''}
				className="mx-auto rounded-2xl"
			/>
		</Section>
	);
}
