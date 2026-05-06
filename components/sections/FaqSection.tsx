import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type FaqContent = {
	items?: { q: string; a: string }[];
};

export function FaqSection({ section }: { section: CmsSection }) {
	const c = section.content as FaqContent | undefined;
	const items = c?.items ?? [];
	if (items.length === 0) return null;
	return (
		<Section layout="narrow">
			{section.title && (
				<div className="mb-10 text-center">
					<h2 className="text-balance">{section.title}</h2>
				</div>
			)}
			<ul className="space-y-3">
				{items.map((it, i) => (
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
							<div className="text-dp-body/85 px-6 pb-6 text-base leading-relaxed">
								{it.a}
							</div>
						</details>
					</li>
				))}
			</ul>
		</Section>
	);
}
