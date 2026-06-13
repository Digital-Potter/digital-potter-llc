import Link from 'next/link';

const paths = [
	{
		question: '“My business needs to get found and win customers online.”',
		answer: 'Start with a custom website',
		href: '/web-services-by-digital-potter',
	},
	{
		question: '“My customers should book, order, or engage from their phone.”',
		answer: 'Start with a mobile app',
		href: '/mobile-development-services',
	},
	{
		question: '“Honestly? I’m not sure what I need yet.”',
		answer: 'That’s literally what the discovery call is for',
		href: '/discovery-call',
	},
];

export default function NotSureChooser() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-balance">Not sure which one fits?</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Pick the sentence that sounds like you.
				</p>
			</div>
			<div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
				{paths.map((p) => (
					<Link
						key={p.href}
						href={p.href}
						className="border-dp-dark/10 hover:border-dp-green group flex flex-col justify-between rounded-3xl border-2 bg-white/50 p-7 transition-colors"
					>
						<p className="text-dp-body text-base font-medium italic">
							{p.question}
						</p>
						<p className="text-dp-dark-green group-hover:text-dp-green font-primary-font mt-5 text-sm font-bold tracking-wide uppercase">
							{p.answer} →
						</p>
					</Link>
				))}
			</div>
		</section>
	);
}
