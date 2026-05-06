'use client';

import { useState } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import {
	FRONTEND_ONETIME,
	HOSTING_MONTHLY,
	MODULES,
	calculateMonthly,
	type ModuleId,
} from '@/lib/pricing';

type BuildYourPlanProps = {
	ctaHref: string;
	ctaLabel: string;
};

export default function BuildYourPlan({
	ctaHref,
	ctaLabel,
}: BuildYourPlanProps) {
	const [selected, setSelected] = useState<ModuleId[]>([]);

	const toggle = (id: ModuleId) => {
		setSelected((cur) =>
			cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
		);
	};

	const monthly = calculateMonthly(selected);
	const selectedModules = MODULES.filter((m) => selected.includes(m.id));

	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Build your plan
				</p>
				<h2 className="mt-6 text-balance">
					Pick the modules your business actually needs.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Combine any modules with the base plan. Most clients pick one, some
					pick two — your bill updates as you click.
				</p>
			</div>

			<div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-10">
				{/* Modules grid */}
				<div className="lg:col-span-2">
					<div className="border-dp-dark-green/30 bg-dp-dark-green/5 rounded-3xl border p-6 md:p-8">
						<div className="flex items-baseline justify-between gap-4">
							<div>
								<p className="font-primary-font text-dp-dark text-sm font-bold tracking-wider uppercase">
									Base — included for everyone
								</p>
								<p className="text-dp-body/80 mt-2 text-base md:text-lg">
									Hosting + CMS access, daily backups, SSL, CDN, security
									patches, unlimited pages.
								</p>
							</div>
							<p className="font-primary-font text-dp-dark-green shrink-0 text-2xl font-bold md:text-3xl">
								${HOSTING_MONTHLY}/mo
							</p>
						</div>
					</div>

					<p className="font-primary-font text-dp-dark mt-10 text-sm font-bold tracking-wider uppercase">
						Add modules
					</p>
					<ul className="mt-4 grid gap-4 sm:grid-cols-2">
						{MODULES.map((m) => {
							const isOn = selected.includes(m.id);
							return (
								<li key={m.id}>
									<button
										type="button"
										aria-pressed={isOn}
										onClick={() => toggle(m.id)}
										className={twMerge(
											'group flex w-full flex-col rounded-3xl border-2 p-6 text-left transition-all',
											isOn
												? 'border-dp-green bg-dp-green/10 shadow-md'
												: 'border-dp-dark/15 hover:border-dp-green/50 bg-white/50',
										)}
									>
										<div className="flex items-start justify-between gap-3">
											<div>
												<p className="font-primary-font text-dp-dark text-base font-bold md:text-lg">
													{m.label}
												</p>
												<p className="text-dp-body/70 mt-1 text-sm">
													{m.tagline}
												</p>
											</div>
											<span
												className={twMerge(
													'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
													isOn
														? 'bg-dp-green border-dp-green'
														: 'border-dp-dark/30 group-hover:border-dp-green',
												)}
												aria-hidden
											>
												{isOn ? (
													<svg
														className="fill-dp-dark h-3.5 w-3.5"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
													</svg>
												) : null}
											</span>
										</div>
										<ul className="mt-4 space-y-2">
											{m.bullets.map((b) => (
												<li
													key={b}
													className="text-dp-body/75 flex items-start gap-2 text-sm"
												>
													<span
														aria-hidden
														className="bg-dp-dark-green mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
													/>
													<span>{b}</span>
												</li>
											))}
										</ul>
										<p className="text-dp-dark-green mt-5 text-base font-bold">
											+${m.price}/mo
										</p>
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				{/* Total card (sticky on lg+) */}
				<aside className="lg:sticky lg:top-28 lg:self-start">
					<div className="border-dp-green/40 rounded-3xl border-2 bg-white/60 p-6 md:p-8">
						<p className="font-primary-font text-dp-dark text-sm font-bold tracking-wider uppercase">
							Your build
						</p>

						<dl className="mt-6 space-y-3 text-sm">
							<div className="flex items-center justify-between">
								<dt className="text-dp-body/80">Hosting + CMS</dt>
								<dd className="text-dp-dark font-bold">
									${HOSTING_MONTHLY}/mo
								</dd>
							</div>
							{selectedModules.length === 0 ? (
								<div className="text-dp-body/50 text-sm italic">
									No modules selected — base plan only
								</div>
							) : (
								selectedModules.map((m) => (
									<div key={m.id} className="flex items-center justify-between">
										<dt className="text-dp-body/80">{m.label}</dt>
										<dd className="text-dp-dark font-bold">+${m.price}/mo</dd>
									</div>
								))
							)}
						</dl>

						<div className="border-dp-dark/15 mt-6 border-t pt-6">
							<p className="text-dp-body/70 text-xs font-bold tracking-wider uppercase">
								Monthly total
							</p>
							<p className="font-primary-font text-dp-dark-green mt-1 text-4xl font-bold md:text-5xl">
								${monthly}
								<span className="text-dp-body/60 ml-1 text-base font-medium">
									/mo
								</span>
							</p>
							<p className="text-dp-body/70 mt-3 text-sm">
								Plus a one-time custom frontend build from{' '}
								<span className="text-dp-dark font-bold">
									${FRONTEND_ONETIME.toLocaleString()}
								</span>
								.
							</p>
						</div>

						<Link
							href={ctaHref}
							className="font-primary-font bg-dp-green text-dp-dark hover:bg-dp-dark hover:text-dp-green border-dp-green hover:border-dp-dark rounded-dp-20 mt-6 inline-flex w-full items-center justify-center border-2 px-6 py-3 text-sm font-bold uppercase shadow-2xl transition-all"
						>
							{ctaLabel}
						</Link>
						<p className="text-dp-body/60 mt-3 text-center text-xs">
							We&apos;ll confirm the final scope and price in your proposal.
						</p>
					</div>
				</aside>
			</div>
		</section>
	);
}
