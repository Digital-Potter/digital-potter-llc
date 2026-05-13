import { twMerge } from 'tailwind-merge';
import { HOSTING_TIERS } from '@/lib/pricing';

export default function HostingTiers() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Hosting + platform tiers
				</p>
				<h2 className="mt-6 text-balance">
					Start at Essentials. Move up only when the business asks for it.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Every tier covers the platform — what changes is how actively we
					manage it with you. No traffic gates, no plan jumps based on visits.
				</p>
			</div>

			<div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
				{HOSTING_TIERS.map((tier) => {
					const isHighlight = !!tier.highlight;
					return (
						<article
							key={tier.id}
							className={twMerge(
								'relative flex flex-col rounded-3xl border-2 bg-white/40 p-8 md:p-10',
								isHighlight ? 'border-dp-green shadow-lg' : 'border-dp-dark/15',
							)}
						>
							{isHighlight ? (
								<span className="bg-dp-green text-dp-dark font-primary-font absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold tracking-widest uppercase shadow-md">
									Recommended
								</span>
							) : null}
							<p
								className={twMerge(
									'font-primary-font text-xs font-bold tracking-widest uppercase',
									isHighlight ? 'text-dp-dark-green' : 'text-dp-body-soft',
								)}
							>
								{tier.label}
							</p>
							<p className="font-primary-font text-dp-dark mt-4 text-3xl font-bold md:text-4xl">
								${tier.price}
								<span className="text-dp-body-soft ml-1 text-base font-medium">
									/mo
								</span>
							</p>
							<p className="text-dp-body-soft mt-2 text-sm">{tier.tagline}</p>
							<p className="text-dp-body/85 mt-5 text-sm md:text-base">
								{tier.bestFor}
							</p>

							<ul className="mt-6 space-y-3">
								{tier.bullets.map((item) => (
									<li
										key={item}
										className="text-dp-body/85 flex items-start gap-3 text-sm md:text-base"
									>
										<svg
											aria-hidden
											className={twMerge(
												'mt-1 h-4 w-4 shrink-0',
												isHighlight ? 'fill-dp-green' : 'fill-dp-dark-green',
											)}
											viewBox="0 0 20 20"
										>
											<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
										</svg>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</article>
					);
				})}
			</div>

			<p className="text-dp-body-soft mx-auto mt-10 max-w-2xl text-center text-sm">
				Switch tiers any time — your monthly fee adjusts on the next billing
				cycle. Annual prepay gets you 15% off.
			</p>
		</section>
	);
}
