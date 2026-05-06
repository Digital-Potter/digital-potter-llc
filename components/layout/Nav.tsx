import Link from 'next/link';
import { Container } from './Container';

const links = [
	{ href: '/', label: 'HOME' },
	{ href: '/services', label: 'SERVICES' },
	{ href: '/case-studies', label: 'CASE STUDIES' },
	{ href: '/pricing', label: 'PRICING' },
	{ href: '/blog', label: 'BLOG' },
];

export function Nav() {
	return (
		<header className="bg-cream/90 sticky top-0 z-50 backdrop-blur">
			<Container>
				<nav className="flex items-center justify-between py-4">
					<Link href="/" className="text-xl font-bold tracking-tight">
						digital<span className="font-extrabold">Potter</span>(&nbsp;)
					</Link>
					<ul className="hidden gap-8 text-sm font-semibold tracking-wider md:flex">
						{links.map((l) => (
							<li key={l.href}>
								<Link href={l.href} className="hover:text-brand-green">
									{l.label}
								</Link>
							</li>
						))}
					</ul>
					<Link
						href="/contact"
						className="bg-brand-green text-ink hover:bg-deep-green hover:text-cream rounded-full px-5 py-2 text-sm font-bold"
					>
						LET&apos;S CONNECT
					</Link>
				</nav>
			</Container>
		</header>
	);
}
