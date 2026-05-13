import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { MAINTENANCE_TIERS } from '@/lib/pricing';

type RetainerTiersProps = {
	ctaHref: string;
};

export default function RetainerTiers({ ctaHref }: RetainerTiersProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Three retainer tiers
				</p>
				<h2 className="mt-6 text-balance">
					Pick the level of attention your business needs.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Each tier includes monthly hours of dev or design work plus everything
					below it. Cancel any time with 30 days notice.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
				{MAINTENANCE_TIERS.map((tier) => (
					<li key={tier.id}>
						<article
							className={twMerge(
								'flex h-full flex-col rounded-3xl border-2 p-8 md:p-10',
								tier.highlight
									? 'border-dp-green bg-dp-green/10 shadow-md'
									: 'border-dp-dark/10 bg-white/50',
							)}
						>
							{tier.highlight ? (
								<span className="bg-dp-dark-green text-dp-yellowish self-start rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
									Most popular
								</span>
							) : null}
							<p className="font-primary-font text-dp-dark mt-4 text-xs font-bold tracking-widest uppercase">
								{tier.label}
							</p>
							<p className="text-dp-body-soft mt-2 text-sm">{tier.tagline}</p>
							<div className="mt-6">
								<p className="font-primary-font text-dp-dark-green text-4xl font-bold md:text-5xl">
									${tier.price.toLocaleString()}
									<span className="text-dp-body-soft ml-1 text-base font-medium">
										/mo
									</span>
								</p>
								<p className="text-dp-body-soft mt-2 text-sm">{tier.hours}</p>
							</div>
							<p className="text-dp-body/85 mt-6 text-base">{tier.bestFor}</p>
							<ul className="mt-6 space-y-3">
								{tier.bullets.map((b) => (
									<li
										key={b}
										className="text-dp-body/85 flex items-start gap-3 text-sm md:text-base"
									>
										<svg
											aria-hidden
											className="fill-dp-green mt-1 h-4 w-4 shrink-0"
											viewBox="0 0 20 20"
										>
											<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
										</svg>
										<span>{b}</span>
									</li>
								))}
							</ul>
							<Link
								href={ctaHref}
								className={twMerge(
									'font-primary-font rounded-dp-20 mt-auto inline-flex items-center justify-center border-2 px-6 py-3 text-sm font-bold uppercase shadow-2xl transition-all',
									tier.highlight
										? 'bg-dp-green text-dp-dark border-dp-green hover:bg-dp-dark hover:text-dp-green hover:border-dp-dark'
										: 'border-dp-dark text-dp-dark hover:bg-dp-dark hover:text-dp-green',
									'mt-8',
								)}
							>
								Talk to us about {tier.label}
							</Link>
						</article>
					</li>
				))}
			</ul>
		</section>
	);
}
