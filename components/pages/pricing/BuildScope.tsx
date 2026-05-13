import { twMerge } from 'tailwind-merge';
import { BUILD_TIERS } from '@/lib/pricing';

function formatRange(low: number, high: number | null): string {
	const lowLabel = `$${low.toLocaleString()}`;
	if (high === null) return `${lowLabel}+`;
	return `${lowLabel} – $${high.toLocaleString()}`;
}

export default function BuildScope() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Build tiers
				</p>
				<h2 className="mt-6 text-balance">
					Three tiers. Your scope decides where you land.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					We sell foundations, not features. Most serious small businesses land
					in Growth. Starter is for tight-scope launches; Premium is for custom
					platforms and apps. Your proposal pins a fixed price after discovery.
				</p>
			</div>

			<div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
				{BUILD_TIERS.map((tier) => {
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
									Most clients
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
								{formatRange(tier.rangeLow, tier.rangeHigh)}
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
				Not sure where your project lands? That&apos;s the point of the
				discovery call — we listen, scope, and send you a proposal with the
				exact line items and a fixed price before any work begins.
			</p>
		</section>
	);
}
