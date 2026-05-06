type Row = {
	feature: string;
	wordpress: string;
	contentful: string;
	strapi: string;
	dp: string;
	dpEmphasis?: boolean;
};

const rows: Row[] = [
	{
		feature: 'Multi-tenant native',
		wordpress: 'Multisite plugin (clunky)',
		contentful: 'Spaces (extra cost)',
		strapi: 'Manual per project',
		dp: 'Yes, day-one',
		dpEmphasis: true,
	},
	{
		feature: 'Custom frontend',
		wordpress: 'Theme system',
		contentful: 'Headless API',
		strapi: 'Headless API',
		dp: 'Custom Next.js',
		dpEmphasis: true,
	},
	{
		feature: 'Section composer',
		wordpress: 'Gutenberg blocks',
		contentful: 'Manual content models',
		strapi: 'Manual content types',
		dp: '16 pre-designed section types',
		dpEmphasis: true,
	},
	{
		feature: 'Stripe payments',
		wordpress: 'Plugin',
		contentful: 'Not built-in',
		strapi: 'Plugin',
		dp: 'Native, your account',
		dpEmphasis: true,
	},
	{
		feature: 'Email transport',
		wordpress: 'Plugin',
		contentful: 'Not built-in',
		strapi: 'Basic',
		dp: 'Native (Mailgun)',
	},
	{
		feature: 'Hosting model',
		wordpress: 'Self / managed (separate)',
		contentful: 'Vendor SaaS only',
		strapi: 'Self only',
		dp: 'Managed by us, or self-host',
		dpEmphasis: true,
	},
	{
		feature: 'Maintenance included',
		wordpress: 'No (separate plan)',
		contentful: 'Vendor managed',
		strapi: 'No (DIY)',
		dp: 'Yes, with retainer',
		dpEmphasis: true,
	},
	{
		feature: 'Source code yours',
		wordpress: 'Yes (PHP)',
		contentful: 'No (proprietary)',
		strapi: 'Yes (open source)',
		dp: 'Frontend yours, CMS licensed',
	},
];

export default function CmsComparison() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					How theDavid compares
				</p>
				<h2 className="mt-6 text-balance">
					Not WordPress. Not a SaaS. Something better for our use case.
				</h2>
				<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-balance">
					We tried each of these for years before building our own. Here&apos;s
					what we kept, what we threw out, and what we added that nobody else
					ships.
				</p>
			</div>

			<div className="border-dp-dark/10 mt-14 overflow-x-auto rounded-3xl border bg-white/40">
				<table className="w-full min-w-[760px] text-left text-sm md:text-base">
					<thead>
						<tr className="border-dp-dark/10 border-b">
							<th
								scope="col"
								className="font-primary-font text-dp-body/60 px-6 py-5 text-xs font-bold tracking-widest uppercase"
							>
								Feature
							</th>
							<th
								scope="col"
								className="font-primary-font text-dp-body/70 px-6 py-5 text-sm font-bold"
							>
								WordPress
							</th>
							<th
								scope="col"
								className="font-primary-font text-dp-body/70 px-6 py-5 text-sm font-bold"
							>
								Contentful
							</th>
							<th
								scope="col"
								className="font-primary-font text-dp-body/70 px-6 py-5 text-sm font-bold"
							>
								Strapi
							</th>
							<th
								scope="col"
								className="font-primary-font bg-dp-dark-green/10 text-dp-dark-green px-6 py-5 text-sm font-bold"
							>
								theDavid
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr
								key={r.feature}
								className="border-dp-dark/10 border-b last:border-b-0"
							>
								<th
									scope="row"
									className="text-dp-dark px-6 py-5 text-left font-bold"
								>
									{r.feature}
								</th>
								<td className="text-dp-body/75 px-6 py-5">{r.wordpress}</td>
								<td className="text-dp-body/75 px-6 py-5">{r.contentful}</td>
								<td className="text-dp-body/75 px-6 py-5">{r.strapi}</td>
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
		</section>
	);
}
