import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type FaqEntry = {
	question?: string;
	answer?: string;
	/** Legacy short keys. */
	q?: string;
	a?: string;
};

type FaqContent = {
	faqs?: FaqEntry[];
	items?: FaqEntry[];
};

export function FaqSection({ section }: { section: CmsSection }) {
	const c = section.content as FaqContent | undefined;
	const items = c?.faqs ?? c?.items ?? [];
	const normalized = items
		.map((it) => ({
			q: it.question ?? it.q ?? '',
			a: it.answer ?? it.a ?? '',
		}))
		.filter((it) => it.q);
	if (normalized.length === 0) return null;
	return (
		<Section settings={section.settings} layout="narrow">
			{section.title && (
				<div className="mb-10 text-center">
					<h2 className="text-balance">{section.title}</h2>
				</div>
			)}
			<ul className="space-y-3">
				{normalized.map((it, i) => (
					<li key={i}>
						<details className="group border-dp-dark/10 hover:border-dp-green/40 rounded-2xl border bg-white/50 transition-colors">
							<summary className="font-primary-font text-dp-dark cursor-pointer list-none px-6 py-5 text-base font-bold md:text-lg">
								<span className="flex items-center justify-between gap-4">
									{it.q}
									<span
										aria-hidden
										className="text-dp-dark-green transition-transform group-open:rotate-45"
									>
										<svg
											className="h-5 w-5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
										>
											<path d="M12 5v14M5 12h14" />
										</svg>
									</span>
								</span>
							</summary>
							<div
								className="prose prose-base prose-p:text-dp-body/85 prose-a:text-dp-dark-green hover:prose-a:text-dp-green max-w-none px-6 pb-6"
								dangerouslySetInnerHTML={{ __html: it.a }}
							/>
						</details>
					</li>
				))}
			</ul>
		</Section>
	);
}
