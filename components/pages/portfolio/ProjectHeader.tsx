import Link from 'next/link';
import type { CmsProject } from '@/helpers/cms/types';

type ProjectHeaderProps = {
	project: CmsProject;
};

function formatDate(iso?: string) {
	if (!iso) return null;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return null;
	return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
	const date = formatDate(project.publishedAt);

	return (
		<section className="dp-container py-12 md:py-16">
			<Link
				href="/portfolio"
				className="text-dp-dark-green hover:text-dp-green font-primary-font inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase"
			>
				<svg
					aria-hidden
					className="h-3 w-3"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2.5}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m15 18-6-6 6-6" />
				</svg>
				Back to portfolio
			</Link>

			<div className="mx-auto mt-10 max-w-4xl text-center">
				{project.category && (
					<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
						{project.category}
					</p>
				)}
				<h1 className="mt-6 text-balance">{project.title}</h1>
				{project.excerpt && (
					<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-balance">
						{project.excerpt}
					</p>
				)}
				{date && (
					<p className="text-dp-body/60 mt-6 text-sm">Launched {date}</p>
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
