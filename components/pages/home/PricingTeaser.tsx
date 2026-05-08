import Link from 'next/link';

// Working pricing baseline. The full table lives in
// docs/PROJECT_CONVENTIONS.md → "Pricing baseline" — update both when
// numbers change.
const monthly = '$50';
const oneTime = '$3,500';

export default function PricingTeaser() {
	return (
		<section className="dp-container py-8 md:py-12">
			<div className="border-dp-dark-green/20 bg-dp-dark-green/5 mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border px-6 py-5 md:flex-row md:gap-8 md:px-8">
				<div className="text-center md:text-left">
					<p className="text-dp-dark font-primary-font text-base font-bold md:text-lg">
						Custom site starting at{' '}
						<span className="text-dp-dark-green">{oneTime}</span> +{' '}
						<span className="text-dp-dark-green">{monthly}/month</span> for
						hosting & CMS
					</p>
					<p className="text-dp-body/70 mt-1 text-sm">
						The base price is the foundation. Custom features are quoted in your
						proposal. You own the code, no per-page fees, no traffic gates, no
						lock-in.
					</p>
				</div>
				<Link
					href="/digital-potter-pricing"
					className="text-dp-dark-green hover:text-dp-green font-primary-font shrink-0 text-sm font-bold tracking-wider uppercase"
				>
					See all plans →
				</Link>
			</div>
		</section>
	);
}
