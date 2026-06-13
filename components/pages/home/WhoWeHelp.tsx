import type { ReactNode } from 'react';

type Industry = {
	name: string;
	description: string;
	icon: ReactNode;
};

const industries: Industry[] = [
	{
		name: 'General Contractors & Trades',
		description: 'Showcase your projects and capture local service leads',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width={32}
				height={32}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<path d="M4 14L16 4l12 10v14H4V14z" />
				<path d="M12 28V20h8v8" />
				<path d="M10 14h4v4h-4z" />
			</svg>
		),
	},
	{
		name: 'Salons & Beauty Businesses',
		description:
			'Drive bookings and build loyalty with a polished online presence',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width={32}
				height={32}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<circle cx="9" cy="9" r="3" />
				<circle cx="9" cy="23" r="3" />
				<line x1="11.8" y1="11.8" x2="26" y2="26" />
				<line x1="11.8" y1="20.2" x2="22" y2="10" />
			</svg>
		),
	},
	{
		name: 'E-commerce & Product Brands',
		description:
			'Sell more with a fast, conversion-optimized custom storefront',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width={32}
				height={32}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<path d="M6 8h20l-2.5 16H8.5L6 8z" />
				<path d="M11 8V6a5 5 0 0 1 10 0v2" />
				<circle cx="13" cy="15" r="1" fill="currentColor" />
				<circle cx="19" cy="15" r="1" fill="currentColor" />
			</svg>
		),
	},
	{
		name: 'Artisan Studios & Portfolios',
		description: 'Let your craft speak — with a site as refined as your work',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width={32}
				height={32}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<circle cx="16" cy="14" r="8" />
				<circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
				<circle cx="20" cy="11" r="1.5" fill="currentColor" stroke="none" />
				<circle cx="16" cy="18" r="1.5" fill="currentColor" stroke="none" />
				<path d="M22 20c2 2 2 6-4 6s-4-4 4-6" />
			</svg>
		),
	},
	{
		name: 'Medical & Dental Practices',
		description: 'Build patient trust and simplify appointment inquiries',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width={32}
				height={32}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<rect x="4" y="4" width="24" height="24" rx="4" />
				<line x1="16" y1="10" x2="16" y2="22" />
				<line x1="10" y1="16" x2="22" y2="16" />
			</svg>
		),
	},
	{
		name: 'Law Firms & Professional Services',
		description:
			'Establish authority and generate qualified consultation requests',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width={32}
				height={32}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<line x1="16" y1="4" x2="16" y2="28" />
				<line x1="8" y1="28" x2="24" y2="28" />
				<line x1="7" y1="10" x2="25" y2="10" />
				<path d="M7 10L4 16h6l-3-6z" />
				<path d="M25 10l-3 6h6l-3-6z" />
			</svg>
		),
	},
	{
		name: 'Real Estate Agents & Agencies',
		description: 'Stand out in a competitive market with listings that convert',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width={32}
				height={32}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<path d="M16 4C11.582 4 8 7.582 8 12c0 6 8 16 8 16s8-10 8-16c0-4.418-3.582-8-8-8z" />
				<circle cx="16" cy="12" r="3" />
			</svg>
		),
	},
	{
		name: 'Restaurants & Food Businesses',
		description: 'Drive reservations, showcase your menu, and own your brand',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width={32}
				height={32}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<line x1="11" y1="4" x2="11" y2="12" />
				<path d="M8 4v6a3 3 0 0 0 6 0V4" />
				<line x1="11" y1="15" x2="11" y2="28" />
				<line x1="21" y1="4" x2="21" y2="28" />
				<path d="M18 4v10h6V4" />
			</svg>
		),
	},
];

export default function WhoWeHelp() {
	return (
		<section
			id="who-we-help"
			className="dp-container scroll-mt-24 py-16 md:py-24"
		>
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-balance">Built for businesses like yours.</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					From local trades to growing e-commerce brands — we&apos;ve worked
					with businesses like these and know exactly what they need to win
					online.
				</p>
			</div>
			<ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{industries.map((industry) => (
					<li
						key={industry.name}
						className="border-dp-dark/10 rounded-3xl border bg-white/50 p-6 md:p-8"
					>
						<div className="text-dp-green">{industry.icon}</div>
						<h3 className="font-primary-font mt-4 text-lg leading-snug font-bold">
							{industry.name}
						</h3>
						<p className="text-dp-body-soft mt-2 text-sm md:text-base">
							{industry.description}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
