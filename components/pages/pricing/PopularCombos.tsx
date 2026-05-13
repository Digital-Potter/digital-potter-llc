import {
	HOSTING_MONTHLY,
	MODULES,
	POPULAR_COMBOS,
	calculateMonthly,
} from '@/lib/pricing';

export default function PopularCombos() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Popular combinations
				</p>
				<h2 className="mt-6 text-balance">
					Real client setups, with the actual monthly cost.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					A snapshot of how four different kinds of businesses configure their
					plan. Yours probably falls close to one of these.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-2">
				{POPULAR_COMBOS.map((combo) => {
					const monthly = calculateMonthly(combo.moduleIds);
					const moduleLabels = MODULES.filter((m) =>
						combo.moduleIds.includes(m.id),
					)
						.map((m) => m.label)
						.join(' + ');
					return (
						<li
							key={combo.label}
							className="border-dp-dark/10 hover:border-dp-green/40 rounded-3xl border bg-white/50 p-8 transition-colors md:p-10"
						>
							<p className="font-primary-font text-dp-dark text-base font-bold tracking-wider uppercase">
								{combo.label}
							</p>
							<p className="text-dp-body-soft mt-3 text-base md:text-lg">
								{combo.scenario}
							</p>
							<div className="border-dp-dark/10 mt-6 flex items-end justify-between border-t pt-6">
								<div>
									<p className="text-dp-body-soft text-xs font-bold tracking-wider uppercase">
										Plan
									</p>
									<p className="text-dp-dark mt-1 text-sm">
										Hosting{moduleLabels ? ` + ${moduleLabels}` : ''}
									</p>
								</div>
								<p className="font-primary-font text-dp-dark-green text-2xl font-bold md:text-3xl">
									${monthly}
									<span className="text-dp-body-soft ml-1 text-sm font-medium">
										/mo
									</span>
								</p>
							</div>
						</li>
					);
				})}
			</ul>
			<p className="text-dp-body-soft mt-8 text-center text-sm">
				All plans share the same{' '}
				<span className="text-dp-dark font-bold">
					${HOSTING_MONTHLY}/mo base
				</span>
				. The frontend foundation is a separate one-time investment.
			</p>
		</section>
	);
}
