import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type TestimonialsContent = {
	items?: { quote: string; author?: string; role?: string; source?: string }[];
};

export function TestimonialsSection({ section }: { section: CmsSection }) {
	const c = section.content as TestimonialsContent | undefined;
	const items = c?.items ?? [];
	if (items.length === 0) return null;

	return (
		<Section layout="wide">
			{section.title && (
				<div className="mx-auto mb-12 max-w-4xl text-center">
					<h2 className="text-balance">{section.title}</h2>
				</div>
			)}
			<ul className="grid gap-6 md:grid-cols-2">
				{items.map((t, i) => (
					<li
						key={i}
						className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8 md:p-10"
					>
						<svg
							aria-hidden
							className="text-dp-green h-8 w-8"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M9.5 6h-1A4.5 4.5 0 0 0 4 10.5V18h6v-7H6.5A2.5 2.5 0 0 1 9 8.5V6Zm10.5 0h-1a4.5 4.5 0 0 0-4.5 4.5V18h6v-7h-3.5a2.5 2.5 0 0 1 2.5-2.5V6Z" />
						</svg>
						<p className="text-dp-dark mt-4 text-lg leading-snug font-medium md:text-xl md:leading-tight">
							&ldquo;{t.quote}&rdquo;
						</p>
						{(t.author || t.role || t.source) && (
							<p className="text-dp-body/70 mt-6 text-sm">
								{t.author && (
									<span className="text-dp-dark font-bold">{t.author}</span>
								)}
								{t.role && <span> · {t.role}</span>}
								{t.source && (
									<span className="text-dp-body/60">
										<span className="text-dp-body/50 mx-2">|</span>
										Source: {t.source}
									</span>
								)}
							</p>
						)}
					</li>
				))}
			</ul>
		</Section>
	);
}
