'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import {
	deriveCategories,
	PORTFOLIO_PLACEHOLDERS,
	type PortfolioProject,
} from './portfolioData';

type ProjectsGridProps = {
	projects?: PortfolioProject[];
};

export default function ProjectsGrid({
	projects = PORTFOLIO_PLACEHOLDERS,
}: ProjectsGridProps) {
	const categories = useMemo(() => deriveCategories(projects), [projects]);
	const [active, setActive] = useState<string>('all');

	const visible =
		active === 'all' ? projects : projects.filter((p) => p.category === active);

	return (
		<section className="dp-container py-12 md:py-16">
			<ul
				role="tablist"
				aria-label="Filter projects by category"
				className="dp-box-design mx-auto flex max-w-4xl flex-wrap justify-center gap-1 rounded-full p-1.5"
			>
				<li>
					<button
						role="tab"
						type="button"
						aria-selected={active === 'all'}
						onClick={() => setActive('all')}
						className={twMerge(
							'font-primary-font rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors',
							active === 'all'
								? 'bg-dp-dark-green text-white'
								: 'text-dp-dark hover:bg-dp-light-gray',
						)}
					>
						All
					</button>
				</li>
				{categories.map((c) => (
					<li key={c}>
						<button
							role="tab"
							type="button"
							aria-selected={active === c}
							onClick={() => setActive(c)}
							className={twMerge(
								'font-primary-font rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors',
								active === c
									? 'bg-dp-dark-green text-white'
									: 'text-dp-dark hover:bg-dp-light-gray',
							)}
						>
							{c}
						</button>
					</li>
				))}
			</ul>

			<ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{visible.map((p) => (
					<li key={p.id}>
						<ProjectCard project={p} />
					</li>
				))}
			</ul>

			{visible.length === 0 ? (
				<p className="text-dp-body/70 mt-12 text-center text-base">
					Nothing in this category yet.{' '}
					<button
						type="button"
						onClick={() => setActive('all')}
						className="text-dp-dark-green hover:text-dp-green font-bold underline"
					>
						See all work
					</button>
					.
				</p>
			) : null}
		</section>
	);
}

function ProjectCard({ project }: { project: PortfolioProject }) {
	const isLinked = !!project.href;
	const Wrapper = isLinked ? Link : 'div';
	const wrapperProps = isLinked ? { href: project.href ?? '#' } : {};

	return (
		<Wrapper
			{...(wrapperProps as { href: string })}
			className="group block h-full"
		>
			<div className="dp-box-design relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
				{project.featuredImage?.url ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={project.featuredImage.url}
						alt={project.featuredImage.alt ?? project.title}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<>
						<div className="from-dp-green/30 via-dp-yellowish to-dp-dark-green/20 absolute inset-0 bg-gradient-to-br" />
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-dp-body/30 text-xs font-bold tracking-widest uppercase">
								Project cover
							</span>
						</div>
					</>
				)}
				{project.status === 'coming-soon' ? (
					<span className="bg-dp-dark/90 text-dp-yellowish absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
						Coming soon
					</span>
				) : null}
			</div>
			<div className="mt-5 flex items-center gap-3 text-xs">
				<span className="bg-dp-dark-green/10 text-dp-dark-green rounded-full px-3 py-1 font-bold tracking-wider uppercase">
					{project.category}
				</span>
				{project.status === 'live' ? (
					<span className="text-dp-body/60">Live</span>
				) : null}
			</div>
			<h3 className="font-primary-font group-hover:text-dp-dark-green mt-4 text-xl font-bold transition-colors md:text-2xl">
				{project.title}
			</h3>
			<p className="text-dp-body/75 mt-3 text-base">{project.excerpt}</p>
			{isLinked ? (
				<span className="text-dp-dark-green group-hover:text-dp-green mt-4 inline-block text-sm font-bold">
					Read the case study →
				</span>
			) : (
				<span className="text-dp-body/50 mt-4 inline-block text-sm font-bold">
					Case study in progress
				</span>
			)}
		</Wrapper>
	);
}
