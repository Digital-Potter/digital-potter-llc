import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

export function FaqSection({ section }: { section: CmsSection }) {
	const c = section.content as
		| { items?: { q: string; a: string }[] }
		| undefined;
	const items = c?.items ?? [];
	if (items.length === 0) return null;
	return (
		<Section layout="narrow">
			{section.title && (
				<h2 className="mb-6 text-2xl font-bold">{section.title}</h2>
			)}
			<div className="space-y-2">
				{items.map((it, i) => (
					<details
						key={i}
						className="border-ink/10 rounded-xl border bg-white p-4"
					>
						<summary className="cursor-pointer font-semibold">{it.q}</summary>
						<p className="text-smoke mt-2">{it.a}</p>
					</details>
				))}
			</div>
		</Section>
	);
}
