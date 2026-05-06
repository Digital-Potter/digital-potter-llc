import { Section } from './Section';
import { Card } from '@/components/ui/Card';
import type { CmsSection } from '@/helpers/cms/types';

export function TestimonialsSection({ section }: { section: CmsSection }) {
	const c = section.content as
		| { items?: { quote: string; author?: string; role?: string }[] }
		| undefined;
	const items = c?.items ?? [];
	if (items.length === 0) return null;
	return (
		<Section>
			{section.title && (
				<h2 className="mb-8 text-center text-3xl font-bold">{section.title}</h2>
			)}
			<div className="grid gap-4 md:grid-cols-2">
				{items.map((t, i) => (
					<Card key={i}>
						<p className="italic">&ldquo;{t.quote}&rdquo;</p>
						{(t.author || t.role) && (
							<p className="text-smoke mt-3 text-sm">
								{[t.author, t.role].filter(Boolean).join(' · ')}
							</p>
						)}
					</Card>
				))}
			</div>
		</Section>
	);
}
