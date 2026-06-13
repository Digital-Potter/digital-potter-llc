import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
	title: 'Page Not Found · Digital Potter',
	description: 'Could not find requested resource',
	robots: 'noindex, nofollow',
};

const destinations = [
	{ label: 'Services', href: '/digital-potter-services-and-solutions' },
	{ label: 'Pricing', href: '/digital-potter-pricing' },
	{ label: 'Portfolio', href: '/digital-potter-portfolio' },
	{ label: 'Blog', href: '/digital-potter-blog' },
	{ label: 'Contact', href: '/contact-digital-potter' },
];

export default function NotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-10 py-24">
			<div className="max-w-3xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					404
				</p>
				<h1 className="mt-4 text-balance">This page went back on the wheel.</h1>
				<p className="text-dp-body-soft mt-6 text-balance">
					It&apos;s been reshaped, renamed, or never existed. Here&apos;s where
					people usually want to go:
				</p>
				<ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
					{destinations.map((d) => (
						<li key={d.href}>
							<Link
								href={d.href}
								className="border-dp-dark/15 text-dp-body hover:border-dp-dark-green hover:text-dp-dark-green inline-block rounded-full border bg-white/60 px-5 py-2 text-sm font-bold transition-colors"
							>
								{d.label}
							</Link>
						</li>
					))}
				</ul>
				<div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<ButtonLink href="/discovery-call" variant="solid">
						Book a Free Discovery Call
					</ButtonLink>
					<ButtonLink href="/" variant="outlined">
						Go back home
					</ButtonLink>
				</div>
			</div>
		</div>
	);
}
