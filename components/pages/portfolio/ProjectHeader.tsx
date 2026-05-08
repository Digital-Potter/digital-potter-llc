import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { CmsProject, ProjectDateRange } from '@/helpers/cms/types';
import type { SiteUrls } from '@/helpers/cms/urls';

type ProjectHeaderProps = {
	project: CmsProject;
	urls: SiteUrls;
};

function formatMonthYear(iso?: string) {
	if (!iso) return null;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return null;
	return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

/**
 * Formats the project's date range from the CMS dateRange field.
 * Examples:
 *   { start: 2024-11, end: 2025-12 }              → "Nov 2024 — Dec 2025"
 *   { start: 2024-11, ongoing: true }             → "Nov 2024 — Ongoing"
 *   { start: 2024-11 }                            → "Nov 2024"
 *   { end: 2025-12 }                              → "Launched Dec 2025"
 *   {}                                            → null
 */
function formatDateRange(range?: ProjectDateRange): string | null {
	if (!range) return null;
	const startLabel = formatMonthYear(range.start);
	const endLabel = formatMonthYear(range.end);

	if (startLabel && range.ongoing) return `${startLabel} — Ongoing`;
	if (startLabel && endLabel) return `${startLabel} — ${endLabel}`;
	if (startLabel) return startLabel;
	if (endLabel) return `Launched ${endLabel}`;
	return null;
}

export default function ProjectHeader({ project, urls }: ProjectHeaderProps) {
	const dateLabel = formatDateRange(project.dateRange);
	const description = project.subtitle ?? project.excerpt;

	return (
		<section className="dp-container py-12 md:py-16">
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Portfolio', href: urls.portfolioIndex },
					{ label: project.title, href: urls.project(project.slug) },
				]}
			/>

			<div className="mx-auto mt-10 max-w-4xl text-center">
				{project.categories && project.categories.length > 0 && (
					<ul className="flex flex-wrap items-center justify-center gap-2">
						{project.categories.map((c) => (
							<li
								key={c._id}
								className="bg-dp-dark-green/10 text-dp-dark-green rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase"
							>
								{c.name}
							</li>
						))}
					</ul>
				)}

				<h1 className="mt-6 text-balance">{project.title}</h1>

				{description && (
					<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-balance">
						{description}
					</p>
				)}

				{(dateLabel || project.locationText) && (
					<p className="text-dp-body/70 mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
						{dateLabel && (
							<span className="inline-flex items-center gap-1.5">
								<svg
									aria-hidden
									className="h-3.5 w-3.5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect x="3" y="4" width="18" height="18" rx="2" />
									<path d="M16 2v4M8 2v4M3 10h18" />
								</svg>
								{dateLabel}
							</span>
						)}
						{dateLabel && project.locationText && (
							<span className="text-dp-body/40">·</span>
						)}
						{project.locationText && (
							<span className="inline-flex items-center gap-1.5">
								<svg
									aria-hidden
									className="h-3.5 w-3.5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
								{project.locationText}
							</span>
						)}
					</p>
				)}
			</div>

			{project.featuredImage?.url && (
				<div className="mx-auto mt-12 max-w-5xl">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={project.featuredImage.url}
						alt={project.featuredImage.alt ?? project.title}
						className="dp-box-design w-full rounded-3xl"
					/>
				</div>
			)}
		</section>
	);
}
