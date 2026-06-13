import Link from 'next/link';

type AboutHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

export default function AboutHero({
	primaryCtaHref,
	primaryCtaLabel,
}: AboutHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					About Digital Potter
				</p>
				<h1 className="mt-6 text-balance">
					Twenty years of shaping the web, one business at a time.
				</h1>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					Custom web and mobile applications shaped to your business — built by
					a small studio in Virginia, trusted by clients across the country,
					with no account managers between you and the person doing the work.
				</p>
				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<Link
						href={primaryCtaHref}
						className="font-primary-font bg-dp-green text-dp-dark hover:bg-dp-dark hover:text-dp-green border-dp-green hover:border-dp-dark rounded-dp-20 inline-flex items-center border-2 px-6 py-3 text-sm font-bold uppercase shadow-2xl transition-all"
					>
						{primaryCtaLabel}
					</Link>
					<Link
						href="#our-story"
						className="text-dp-dark-green hover:text-dp-green font-primary-font text-sm font-bold tracking-wider uppercase"
					>
						Read our story →
					</Link>
				</div>
			</div>
		</section>
	);
}
