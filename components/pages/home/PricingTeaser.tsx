import Link from 'next/link';

// PLACEHOLDER pricing — set the real number when you've finalized it, then drop the comment.
const startingMonthly = '$XXX';

export default function PricingTeaser() {
	return (
		<section className="dp-container py-8 md:py-12">
			<div className="border-dp-dark-green/20 bg-dp-dark-green/5 mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border px-6 py-5 md:flex-row md:gap-8 md:px-8">
				<div className="text-center md:text-left">
					<p className="text-dp-dark font-primary-font text-base font-bold md:text-lg">
						Plans starting at{' '}
						<span className="text-dp-dark-green">{startingMonthly}/month</span>
					</p>
					<p className="text-dp-body/70 mt-1 text-sm">
						Fully managed CMS hosting + a custom Next.js frontend you own.
					</p>
				</div>
				<Link
					href="/pricing"
					className="text-dp-dark-green hover:text-dp-green font-primary-font shrink-0 text-sm font-bold tracking-wider uppercase"
				>
					See all plans →
				</Link>
			</div>
		</section>
	);
}
