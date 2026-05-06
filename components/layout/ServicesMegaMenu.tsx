import type { ReactNode } from 'react';
import Link from 'next/link';
import { SERVICES_MENU, SERVICES_FEATURED } from './megaMenuConfig';
import Indicator from './Indicator';

const iconPaths: Record<string, ReactNode> = {
	code: (
		<>
			<rect x="2" y="5" width="20" height="14" rx="2" />
			<path d="m9 10-2 2 2 2" />
			<path d="m15 10 2 2-2 2" />
		</>
	),
	mobile: (
		<>
			<rect x="6" y="3" width="12" height="18" rx="2.5" />
			<path d="M11 18h2" />
		</>
	),
	wrench: (
		<>
			<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
		</>
	),
	server: (
		<>
			<rect x="2" y="2" width="20" height="8" rx="2" />
			<rect x="2" y="14" width="20" height="8" rx="2" />
			<path d="M6 6h.01" />
			<path d="M6 18h.01" />
		</>
	),
};

type ServicesMegaMenuProps = {
	triggerHref: string;
	triggerLabel: string;
};

export default function ServicesMegaMenu({
	triggerHref,
	triggerLabel,
}: ServicesMegaMenuProps) {
	return (
		<div className="group/mm relative">
			<Link
				href={triggerHref}
				className="bg-dp-dark-green/0 hover:bg-dp-dark-green flex items-center gap-1.5 rounded-2xl px-5 py-2.5 transition-all hover:text-white"
				aria-haspopup="true"
			>
				{triggerLabel}
				<svg
					aria-hidden
					className="h-3 w-3 transition-transform group-focus-within/mm:rotate-180 group-hover/mm:rotate-180"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2.5}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
				<Indicator path={triggerHref} isHome={false} />
			</Link>

			{/* Bridge area to keep hover alive between trigger and panel */}
			<div
				aria-hidden
				className="pointer-events-none absolute top-full left-1/2 h-3 w-px -translate-x-1/2"
			/>

			<div
				role="menu"
				className="invisible absolute top-full left-1/2 mt-3 w-[44rem] -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-150 group-focus-within/mm:visible group-focus-within/mm:translate-y-0 group-focus-within/mm:opacity-100 group-hover/mm:visible group-hover/mm:translate-y-0 group-hover/mm:opacity-100"
			>
				<div className="bg-dp-yellowish/95 border-dp-dark/10 rounded-3xl border-2 p-6 normal-case shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] backdrop-blur-md">
					<div className="px-2 pb-3">
						<p className="font-primary-font text-dp-dark-green text-xs font-bold tracking-widest uppercase">
							Our Services
						</p>
						<p className="text-dp-body/80 font-secondary-font mt-2 text-sm tracking-normal normal-case">
							Custom websites, apps, and a CMS your team owns.
						</p>
					</div>

					<div className="grid gap-2 md:grid-cols-3">
						<ul className="md:col-span-2">
							{SERVICES_MENU.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="hover:bg-dp-dark-green/5 group/link flex gap-3 rounded-2xl p-3 transition-colors"
									>
										<span className="bg-dp-dark-green/10 text-dp-dark-green group-hover/link:bg-dp-dark-green group-hover/link:text-dp-yellowish inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors">
											<svg
												aria-hidden
												className="h-5 w-5"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												{iconPaths[item.icon]}
											</svg>
										</span>
										<span className="min-w-0">
											<span className="font-primary-font text-dp-dark block text-base font-bold tracking-normal normal-case">
												{item.label}
											</span>
											<span className="text-dp-body/70 font-secondary-font block text-sm tracking-normal normal-case">
												{item.description}
											</span>
										</span>
									</Link>
								</li>
							))}
						</ul>

						<ul className="border-dp-dark/10 mt-2 space-y-2 border-t pt-3 md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pl-3">
							{SERVICES_FEATURED.map((card) => (
								<li key={card.href}>
									<Link
										href={card.href}
										className="hover:bg-dp-dark-green/5 block rounded-2xl p-3 transition-colors"
									>
										<span className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
											{card.label}
										</span>
										<span className="font-primary-font text-dp-dark mt-1 block text-base font-bold tracking-normal normal-case">
											{card.headline}
										</span>
										<span className="text-dp-body/70 font-secondary-font mt-2 block text-sm tracking-normal normal-case">
											{card.body}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
