'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonLink } from '@/components/ui/Button';
import { tabs } from './tabbedServices.data';

export default function TabbedServices() {
	const [activeId, setActiveId] = useState(tabs[0].id);
	const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-balance">What we do for you</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Four services, one outcome: a digital product that fits your business
					and grows with it. Pick a service to see how we work.
				</p>
			</div>

			<div className="dp-box-design mx-auto mt-14 flex w-full max-w-5xl rounded-2xl p-1.5">
				<div
					role="tablist"
					aria-label="Digital Potter services"
					className="flex w-full flex-col gap-1 lg:flex-row"
				>
					{tabs.map((tab) => {
						const isActive = tab.id === active.id;
						const Icon = tab.icon;
						return (
							<button
								key={tab.id}
								role="tab"
								type="button"
								aria-selected={isActive}
								aria-controls={`panel-${tab.id}`}
								id={`tab-${tab.id}`}
								onClick={() => setActiveId(tab.id)}
								className={twMerge(
									'font-primary-font flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-all md:text-base',
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
						);
					})}
				</div>
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
						<p className="text-dp-body-soft mt-5 text-base md:text-lg">
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
