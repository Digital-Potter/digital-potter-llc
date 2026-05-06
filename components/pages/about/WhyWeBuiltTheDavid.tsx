import Link from 'next/link';

const principles = [
	{
		title: 'Your frontend is yours.',
		body: 'When the engagement ends, you keep the code. Take it to another agency, hire your own developer, or migrate to a different headless CMS — the code is portable by design. No lock-in, no ransom for your own website.',
	},
	{
		title: 'Editorial autonomy without engineering bottlenecks.',
		body: 'Your marketing team, content owner, or operations lead can ship same-day without filing a ticket. We stay in the loop for the heavy lifts and stay out of the way for everything else.',
	},
];

export default function WhyWeBuiltTheDavid() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl">
				<div className="text-center">
					<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
						The Platform Behind Every Site We Build
					</p>
					<h2 className="mt-6 text-balance">
						Why we built our own CMS instead of using someone else&apos;s.
					</h2>
				</div>

				<div className="text-dp-body/85 mt-10 space-y-5 text-base md:text-lg">
					<p>
						Most agencies hand you a website and a phone number. When you need
						to change a paragraph, you wait. When you need a new product page,
						you pay for it. When the agency goes away — and they do —
						you&apos;re stuck with code you can&apos;t maintain.
					</p>
					<p className="text-dp-dark text-xl font-bold md:text-2xl">
						We refused that model.
					</p>
					<p>
						theDavid is the CMS we built for our own clients: a managed,
						multi-tenant headless CMS that lets your team edit content like a
						Google Doc, while we deliver the polish of a fully custom Next.js
						frontend. It powers every Digital Potter site — including the one
						you&apos;re reading right now.
					</p>
				</div>

				<ul className="mt-12 grid gap-6 md:grid-cols-2">
					{principles.map((p, i) => (
						<li
							key={p.title}
							className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8"
						>
							<span className="bg-dp-dark-green text-dp-green font-primary-font inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold">
								{`0${i + 1}`}
							</span>
							<h3 className="font-primary-font mt-4 text-lg font-bold md:text-xl">
								{p.title}
							</h3>
							<p className="text-dp-body/80 mt-3 text-base">{p.body}</p>
						</li>
					))}
				</ul>

				<p className="text-dp-body/70 mt-10 text-center text-sm">
					Curious how it works under the hood?{' '}
					<Link
						href="/services#ops"
						className="text-dp-dark-green hover:text-dp-green font-bold"
					>
						See the SEO, CMS &amp; Maintenance service →
					</Link>
				</p>
			</div>
		</section>
	);
}
