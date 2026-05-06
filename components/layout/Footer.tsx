import Link from 'next/link';
import { Container } from './Container';

const sections = [
	{
		title: 'Company',
		links: [
			{ href: '/about', label: 'About Digital Potter' },
			{ href: '/case-studies', label: 'Case Studies' },
			{ href: '/blog', label: 'Blog' },
		],
	},
	{
		title: 'Solutions',
		links: [
			{ href: '/services', label: 'Services' },
			{ href: '/pricing', label: 'Pricing' },
			{ href: '/self-hosted', label: 'Self-Hosted' },
		],
	},
	{
		title: 'Get in touch',
		links: [
			{ href: '/contact', label: 'Get a custom proposal' },
			{
				href: 'mailto:hello@digitalpotter.io',
				label: 'hello@digitalpotter.io',
			},
		],
	},
];

export function Footer() {
	return (
		<footer className="border-ink/10 bg-cream mt-20 border-t py-10 text-sm">
			<Container>
				<div className="grid gap-10 md:grid-cols-4">
					<div>
						<Link href="/" className="text-lg font-bold">
							digital<span className="font-extrabold">Potter</span>(&nbsp;)
						</Link>
						<p className="text-smoke mt-3">
							© {new Date().getFullYear()} Digital Potter LLC.
						</p>
						{/* Reserved for future portal — comment out until my.digitalpotter.io is live. */}
						{/* <a href="https://my.digitalpotter.io" className="mt-2 inline-block text-brand-green">Client Login →</a> */}
					</div>
					{sections.map((s) => (
						<div key={s.title}>
							<h3 className="mb-3 font-bold tracking-wider uppercase">
								{s.title}
							</h3>
							<ul className="text-smoke space-y-2">
								{s.links.map((l) => (
									<li key={l.href}>
										<Link href={l.href} className="hover:text-ink">
											{l.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</Container>
		</footer>
	);
}
