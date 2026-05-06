import Link from 'next/link';

// Working pricing baseline. The full table lives in docs/PROJECT_CONVENTIONS.md
// under "Pricing baseline" — update both when numbers change.
const startingHostingMonthly = '$149';
const startingFrontendOneTime = '$3,500';

export default function PricingTeaser() {
	return (
		<section className="dp-container py-8 md:py-12">
			<div className="border-dp-dark-green/20 bg-dp-dark-green/5 mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border px-6 py-5 md:flex-row md:gap-8 md:px-8">
				<div className="text-center md:text-left">
					<p className="text-dp-dark font-primary-font text-base font-bold md:text-lg">
						Hosting from{' '}
						<span className="text-dp-dark-green">
							{startingHostingMonthly}/month
						</span>{' '}
						· Custom frontend from{' '}
						<span className="text-dp-dark-green">
							{startingFrontendOneTime}
						</span>
					</p>
					<p className="text-dp-body/70 mt-1 text-sm">
						Fully managed CMS hosting + a custom Next.js frontend you own. Final
						scope priced per project.
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
