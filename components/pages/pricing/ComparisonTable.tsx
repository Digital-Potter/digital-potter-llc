type Row = {
	label: string;
	shopify: string | { value: string; emphasis?: boolean };
	wix: string | { value: string; emphasis?: boolean };
	dp: string;
	dpEmphasis?: boolean;
};

const rows: Row[] = [
	{
		label: 'Monthly base',
		shopify: '$39',
		wix: '$17–$39',
		dp: '$24.99 (Essentials)',
	},
	{
		label: 'Build cost',
		shopify: '$0 (template)',
		wix: '$0 (template)',
		dp: 'From $1,900 (custom)',
		dpEmphasis: true,
	},
	{
		label: 'Transaction fees',
		shopify: '2% on every sale (Basic plan)',
		wix: '0% (Stripe fees apply)',
		dp: '0% from us · your Stripe account, your fees',
		dpEmphasis: true,
	},
	{
		label: 'Custom design',
		shopify: 'Theme tweaks only',
		wix: 'Theme tweaks only',
		dp: 'Yes — built for you',
		dpEmphasis: true,
	},
	{
		label: 'You own the code',
		shopify: 'No',
		wix: 'No',
		dp: 'Yes',
		dpEmphasis: true,
	},
	{
		label: 'Per-page fees',
		shopify: 'No',
		wix: 'No',
		dp: 'No',
	},
	{
		label: 'Traffic gates',
		shopify: 'Plan tier dictates',
		wix: 'Plan tier dictates',
		dp: 'No — flat fee',
		dpEmphasis: true,
	},
	{
		label: 'Platform lock-in',
		shopify: 'Yes (proprietary)',
		wix: 'Yes (proprietary)',
		dp: 'No — code is portable',
		dpEmphasis: true,
	},
];

export default function ComparisonTable() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					How we compare
				</p>
				<h2 className="mt-6 text-balance">
					Same monthly spend. Different ceiling.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					At Essentials our recurring fee is in the same neighborhood as a basic
					Shopify or Wix plan — but you get custom design, owned code, no
					transaction fees, and no traffic gates. Template platforms feel cheap
					until you outgrow them.
				</p>
			</div>

			<div className="border-dp-dark/10 mt-14 overflow-x-auto rounded-3xl border bg-white/40">
				<table className="w-full min-w-[640px] text-left text-sm md:text-base">
					<thead>
						<tr className="border-dp-dark/10 border-b">
							<th
								scope="col"
								className="font-primary-font text-dp-body-soft px-6 py-5 text-xs font-bold tracking-widest uppercase"
							>
								Feature
							</th>
							<th
								scope="col"
								className="font-primary-font text-dp-body-soft px-6 py-5 text-sm font-bold"
							>
								Shopify Basic
							</th>
							<th
								scope="col"
								className="font-primary-font text-dp-body-soft px-6 py-5 text-sm font-bold"
							>
								Wix Premium
							</th>
							<th
								scope="col"
								className="font-primary-font bg-dp-dark-green/10 text-dp-dark-green px-6 py-5 text-sm font-bold"
							>
								Digital Potter
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr
								key={r.label}
								className="border-dp-dark/10 border-b last:border-b-0"
							>
								<th
									scope="row"
									className="text-dp-dark px-6 py-5 text-left font-bold"
								>
									{r.label}
								</th>
								<td className="text-dp-body-soft px-6 py-5">
									{typeof r.shopify === 'string' ? r.shopify : r.shopify.value}
								</td>
								<td className="text-dp-body-soft px-6 py-5">
									{typeof r.wix === 'string' ? r.wix : r.wix.value}
								</td>
								<td
									className={
										r.dpEmphasis
											? 'bg-dp-dark-green/5 text-dp-dark px-6 py-5 font-bold'
											: 'bg-dp-dark-green/5 text-dp-dark px-6 py-5'
									}
								>
									{r.dp}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p className="text-dp-body-soft mt-4 text-center text-xs">
				Pricing reflects publicly listed plans as of 2026. Compare based on your
				specific business — we&apos;re happy to discuss tradeoffs in your
				proposal.
			</p>
		</section>
	);
}
