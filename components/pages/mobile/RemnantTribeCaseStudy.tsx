import Link from 'next/link';

type RemnantTribeCaseStudyProps = {
	projectHref: string;
};

export default function RemnantTribeCaseStudy({
	projectHref,
}: RemnantTribeCaseStudyProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="border-dp-dark-green/20 bg-dp-dark-green/5 mx-auto max-w-5xl rounded-3xl border px-8 py-12 md:px-14">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Case study · iOS + Android + Admin dashboard
				</p>
				<h2 className="mt-4 text-3xl text-balance md:text-4xl">
					Remnant Tribe: one codebase, two stores, and a dashboard to run it
					all.
				</h2>
				<p className="text-dp-body-soft mt-5 max-w-3xl text-base md:text-lg">
					A community mobile app shipped to the App Store and Google Play from a
					single React Native codebase — backed by a custom admin dashboard
					where the team manages content without touching code.
				</p>
				<ul className="mt-7 grid gap-3 sm:grid-cols-3">
					{[
						'One codebase, native feel on both platforms',
						'Custom admin dashboard for the whole operation',
						'Over-the-air updates — fixes ship same-day',
					].map((b) => (
						<li
							key={b}
							className="text-dp-body/85 flex items-start gap-3 text-sm font-medium md:text-base"
						>
							<svg
								aria-hidden
								className="fill-dp-green mt-0.5 h-5 w-5 shrink-0"
								viewBox="0 0 20 20"
							>
								<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
							</svg>
							<span>{b}</span>
						</li>
					))}
				</ul>
				<p className="mt-8">
					<Link
						href={projectHref}
						className="text-dp-dark-green hover:text-dp-green font-primary-font text-sm font-bold tracking-wide uppercase"
					>
						Read the full case study →
					</Link>
				</p>
			</div>
		</section>
	);
}
