import { Section } from './Section';
import { Card } from '@/components/ui/Card';
import type { CmsSection } from '@/helpers/cms/types';

export function FeatureGridSection({ section }: { section: CmsSection }) {
	const c = section.content as
		| { features?: { title: string; description?: string }[] }
		| undefined;
	const features = c?.features ?? [];
	if (features.length === 0) return null;
	return (
		<Section>
			{section.title && (
				<h2 className="mb-8 text-center text-3xl font-bold">{section.title}</h2>
			)}
			<div className="grid gap-4 md:grid-cols-4">
				{features.map((f, i) => (
					<Card key={i}>
						<h3 className="font-bold">{f.title}</h3>
						{f.description && (
							<p className="text-smoke mt-1 text-sm">{f.description}</p>
						)}
					</Card>
				))}
			</div>
		</Section>
	);
}
