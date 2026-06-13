const clients = [
	{ name: 'Verity Electric Inc.', source: 'Alignable' },
	{ name: 'L&L Hair Products', source: 'Clutch' },
	{ name: 'Hair We Share', source: 'Facebook' },
	{ name: 'Fellerman Glass', source: 'Bark' },
];

function Stars() {
	return (
		<span
			aria-label="Five star rating"
			className="text-dp-dark-green tracking-tight"
		>
			★★★★★
		</span>
	);
}

export default function TrustBar() {
	return (
		<section className="dp-container py-10 md:py-14">
			<div className="border-dp-dark/10 flex flex-col items-center gap-6 border-y py-8">
				<p className="text-dp-body-soft text-xs font-bold tracking-widest uppercase">
					Rated <Stars /> by the businesses we build for
				</p>
				<ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
					{clients.map((client) => (
						<li key={client.name} className="text-center">
							<span className="font-primary-font text-dp-dark text-base font-bold md:text-lg">
								{client.name}
							</span>
							<span className="text-dp-body-soft block text-xs">
								via {client.source}
							</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
