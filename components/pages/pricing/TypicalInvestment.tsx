import { TYPICAL_INVESTMENTS } from '@/lib/pricing';

export default function TypicalInvestment() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Typical investment
				</p>
				<h2 className="mt-6 text-balance">
					What businesses like yours typically invest.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Real ranges from our pipeline so you can size the conversation before
					it starts. Your proposal pins the exact fixed price after discovery.
				</p>
			</div>

			<div className="border-dp-dark/10 mt-14 overflow-x-auto rounded-3xl border bg-white/40">
				<table className="w-full min-w-[560px] text-left text-sm md:text-base">
					<thead>
						<tr className="border-dp-dark/10 border-b">
							<th
								scope="col"
								className="font-primary-font text-dp-body-soft px-6 py-5 text-xs font-bold tracking-widest uppercase"
							>
								Business type
							</th>
							<th
								scope="col"
								className="font-primary-font bg-dp-dark-green/10 text-dp-dark-green px-6 py-5 text-xs font-bold tracking-widest uppercase"
							>
								Typical investment
							</th>
							<th
								scope="col"
								className="font-primary-font text-dp-body-soft px-6 py-5 text-xs font-bold tracking-widest uppercase"
							>
								Tier
							</th>
						</tr>
					</thead>
					<tbody>
						{TYPICAL_INVESTMENTS.map((row) => (
							<tr
								key={row.businessType}
								className="border-dp-dark/10 border-b last:border-b-0"
							>
								<th
									scope="row"
									className="text-dp-dark px-6 py-5 text-left font-bold"
								>
									{row.businessType}
								</th>
								<td className="bg-dp-dark-green/5 text-dp-dark px-6 py-5 font-bold">
									{row.rangeLabel}
								</td>
								<td className="text-dp-body-soft px-6 py-5 text-sm">
									{row.note ?? ''}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<p className="text-dp-body-soft mt-4 text-center text-xs">
				Build investment only. Recurring hosting + CMS billed separately, from
				$50/mo.
			</p>
		</section>
	);
}
