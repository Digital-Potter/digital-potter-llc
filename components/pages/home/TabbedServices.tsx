'use client';

import type { ComponentType, SVGProps } from 'react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonLink } from '@/components/ui/Button';

type Tab = {
	id: string;
	label: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	headline: string;
	body: string;
	bullets: string[];
	href: string;
};

const tabs: Tab[] = [
	{
		id: 'design',
		label: 'Planning & UI/UX Design',
		icon: PenIcon,
		headline:
			'Designs built around how your customers actually behave — not what looks good on Pinterest.',
		body: 'We start with research. We map the journeys your real users take, audit how competitors fail them, and design every screen to move people toward the action that matters: contact, purchase, sign-up. The result is a site that looks like it was built for you, because it was.',
		bullets: [
			'User research and journey mapping for your specific audience',
			'Competitor analysis that surfaces unmet needs',
			'Custom visual design systems — no themes, no templates',
			'WCAG-accessible by default, on every device size',
			'Conversion-focused layouts that move visitors through your funnel',
		],
		href: '/services#design',
	},
	{
		id: 'mobile',
		label: 'Mobile Apps Development',
		icon: MobileIcon,
		headline:
			'Native and cross-platform apps that earn permanent home-screen space.',
		body: 'Your customers spend their days on their phones. We build the apps they keep coming back to — fast, polished, and connected to your business systems. From a Stripe-integrated subscription tool to a Bluetooth-enabled retail companion, we ship apps that work on day one and keep working on day 1,000.',
		bullets: [
			'Native iOS (Swift) and Android (Kotlin) for performance-critical apps',
			'Cross-platform (React Native, Expo) when shared code makes sense',
			'App Store and Google Play submission, review, and updates',
			'Push notifications, deep links, and in-app purchases',
			'Backend and API integration with the systems you already run',
		],
		href: '/mobile-development',
	},
	{
		id: 'web',
		label: 'All Size Websites Development',
		icon: CodeIcon,
		headline:
			'From a one-page launch to a multi-region storefront, every site built bespoke.',
		body: 'Whether you need a marketing site to land your first ten customers or a high-traffic e-commerce engine to scale a brand, we build sites that hold up under load and search. Every site is custom Next.js — fast, SEO-ready from the first commit, and entirely yours to keep.',
		bullets: [
			'Marketing sites, landing pages, and product launches',
			'E-commerce with Stripe, inventory, and order management',
			'Multi-language and multi-region support when you grow internationally',
			'Performance budgets enforced — every page under 2-second load time',
			'SEO architecture (schema, sitemaps, OG, canonical) baked in from day one',
		],
		href: '/services#web',
	},
	{
		id: 'ops',
		label: 'SEO, CMS & Maintenance',
		icon: LayersIcon,
		headline:
			"We don't disappear after launch — we keep your site fast, ranked, and current.",
		body: "Most agencies build and bounce. We build and stay. Our headless CMS lets your team update content without engineers, our DevOps team keeps the lights on around the clock, and our SEO work keeps you findable as Google's rules — and AI-search engines — keep changing.",
		bullets: [
			'Our managed CMS — your team owns content, no developer in the loop',
			'99.9% uptime monitoring with on-call response and incident postmortems',
			'Monthly security patches and dependency updates',
			'Technical SEO audits, schema work, and rank monitoring',
			'Daily backups, disaster recovery, and full ownership of your codebase',
		],
		href: '/services#ops',
	},
];

export default function TabbedServices() {
	const [activeId, setActiveId] = useState(tabs[0].id);
	const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-balance">What we do for you</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Four services, one outcome: a digital product that fits your business
					and grows with it. Pick a service to see how we work.
				</p>
			</div>

			<div className="dp-box-design mx-auto mt-14 flex w-full max-w-5xl rounded-2xl p-1.5">
				<ul
					role="tablist"
					aria-label="Digital Potter services"
					className="flex w-full flex-col gap-1 lg:flex-row"
				>
					{tabs.map((tab) => {
						const isActive = tab.id === active.id;
						const Icon = tab.icon;
						return (
							<li key={tab.id} className="flex-1">
								<button
									role="tab"
									aria-selected={isActive}
									aria-controls={`panel-${tab.id}`}
									id={`tab-${tab.id}`}
									onClick={() => setActiveId(tab.id)}
									className={twMerge(
										'font-primary-font flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-all md:text-base',
										isActive
											? 'bg-dp-dark-green text-white shadow-md'
											: 'text-dp-dark hover:bg-dp-light-gray',
									)}
								>
									<Icon
										aria-hidden
										className={twMerge(
											'h-6 w-6 shrink-0 transition-colors',
											isActive ? 'text-white' : 'text-dp-dark-green',
										)}
									/>
									<span className="leading-tight">{tab.label}</span>
								</button>
							</li>
						);
					})}
				</ul>
			</div>

			<div
				role="tabpanel"
				id={`panel-${active.id}`}
				aria-labelledby={`tab-${active.id}`}
				className="border-dp-green/70 mx-auto mt-6 max-w-5xl rounded-3xl border-2 bg-white/30 p-8 md:p-12"
			>
				<div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
					<div>
						<h3 className="text-2xl md:text-3xl">{active.headline}</h3>
						<p className="text-dp-body/80 mt-5 text-base md:text-lg">
							{active.body}
						</p>
						<div className="mt-8">
							<ButtonLink href={active.href} variant="solid">
								Learn more
							</ButtonLink>
						</div>
					</div>
					<ul className="space-y-4">
						{active.bullets.map((b) => (
							<li
								key={b}
								className="text-dp-body/85 flex items-start gap-3 text-base font-bold"
							>
								<CheckIcon />
								<span>{b}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

function CheckIcon() {
	return (
		<svg
			aria-hidden
			className="fill-dp-green mt-1 h-5 w-5 shrink-0"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
		</svg>
	);
}

function PenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="m4 21 5.5-1.5L20 9 15 4 4.5 14.5 3 20l1 1Z" />
			<path d="m13 6 5 5" />
			<path d="m4 21 1-5" />
		</svg>
	);
}

function MobileIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<rect x="6" y="3" width="12" height="18" rx="2.5" />
			<path d="M11 18h2" />
		</svg>
	);
}

function CodeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<rect x="2" y="5" width="20" height="14" rx="2" />
			<path d="m9 10-2 2 2 2" />
			<path d="m15 10 2 2-2 2" />
		</svg>
	);
}

function LayersIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<rect x="3" y="3" width="14" height="14" rx="2" />
			<path d="M7 21h12a2 2 0 0 0 2-2V7" />
		</svg>
	);
}
