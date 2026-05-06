import Link from 'next/link';
import { Container } from './Container';
import DigitalPotterLogo from '@/components/DigitalPotterLogo';

const sections = [
	{
		title: 'Company',
		links: [
			{ href: '/about', label: 'About Digital Potter' },
			{ href: '/portfolio', label: 'Portfolio' },
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
		<footer className="border-dp-dark/10 bg-dp-yellowish mt-20 border-t py-10 text-sm">
			<Container>
				<div className="grid gap-10 md:grid-cols-4">
					<div>
						<Link href="/" aria-label="Digital Potter — home">
							<DigitalPotterLogo
								width={262}
								height={34}
								className="w-[160px] md:w-[180px]"
							/>
						</Link>
						<p className="text-dp-body/70 mt-4 text-base">
							© {new Date().getFullYear()} Digital Potter LLC.
						</p>
					</div>
					{sections.map((s) => (
						<div key={s.title}>
							<h3 className="font-primary-font mb-3 text-sm font-bold tracking-wider uppercase">
								{s.title}
							</h3>
							<ul className="text-dp-body/70 space-y-2">
								{s.links.map((l) => (
									<li key={l.href}>
										<Link href={l.href} className="hover:text-dp-dark">
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
