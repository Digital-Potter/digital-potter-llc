'use client';

import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import mobileNavStyles from './nav.module.css';
import type { MegaMenuColumn } from './MegaMenu';

export type MobileMegaMenu = {
	header?: { title?: string; subtitle?: string };
	columns: MegaMenuColumn[];
};

export type MobileNavItem = {
	id: string;
	label: string;
	href: string;
	/** When present the row renders an expandable accordion with these columns. */
	megaMenu?: MobileMegaMenu;
};

interface MobileNavProps {
	navItems: MobileNavItem[];
	ctaHref?: string;
	ctaLabel?: string;
}

export default function MobileNav({
	navItems,
	ctaHref,
	ctaLabel,
}: MobileNavProps) {
	const [open, setOpen] = useState(false);
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const openerRef = useRef<HTMLButtonElement>(null);
	const closerRef = useRef<HTMLButtonElement>(null);

	const openMenu = () => setOpen(true);
	// No preventDefault: this also fires from nav links, where blocking the
	// event would cancel navigation. Buttons pass no event.
	const closeMenu = () => {
		setOpen(false);
		setExpandedId(null);
	};

	const toggleExpand = (id: string) => {
		setExpandedId((current) => (current === id ? null : id));
	};

	// When open: trap nothing fancy, but move focus to the close button, allow
	// Escape to dismiss, lock body scroll, and return focus to the opener on close.
	useEffect(() => {
		if (!open) return;
		const opener = openerRef.current; // persistent hamburger button
		closerRef.current?.focus();
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeMenu();
		};
		document.addEventListener('keydown', onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prevOverflow;
			opener?.focus();
		};
	}, [open]);

	return (
		<Fragment>
			<div className={mobileNavStyles.openerContainer}>
				<button
					ref={openerRef}
					className={mobileNavStyles.opener}
					onClick={openMenu}
					aria-label="Open menu"
					aria-expanded={open}
					aria-controls="mobile-nav-panel"
				>
					<div className={mobileNavStyles.openerLineOne} />
					<div className={mobileNavStyles.openerLineTwo} />
					<div className={mobileNavStyles.openerLineThree} />
				</button>
			</div>

			<div
				id="mobile-nav-panel"
				role="dialog"
				aria-modal="true"
				aria-label="Site menu"
				className={twMerge(
					`${mobileNavStyles.mobileNavContainer}`,
					open ? mobileNavStyles.mobileOpen : mobileNavStyles.mobileClose,
				)}
			>
				<nav aria-label="Mobile">
					{/* Inside <nav> so the X slides in/out with the panel itself,
					    rather than sitting on the (full-viewport) container. */}
					<button
						ref={closerRef}
						className={mobileNavStyles.closer}
						onClick={closeMenu}
						aria-label="Close menu"
					>
						<div className={mobileNavStyles.closeLineOne} />
						<div className={mobileNavStyles.closeLineTwo} />
					</button>

					<ul className={mobileNavStyles.mobileNavList}>
						{navItems.map((navItem) => {
							const hasMega =
								!!navItem.megaMenu && navItem.megaMenu.columns.length > 0;
							const isOpen = expandedId === navItem.id;
							const panelId = `mobile-mega-${navItem.id}`;

							return (
								<li key={navItem.id} className={mobileNavStyles.navMobileItem}>
									{hasMega ? (
										<div className="w-full">
											<button
												type="button"
												onClick={() => toggleExpand(navItem.id)}
												aria-expanded={isOpen}
												aria-controls={panelId}
												className="font-primary-font hover:text-dp-dark-green hover:bg-dp-body/5 flex w-full items-center gap-2 rounded-xl py-2 text-base font-bold uppercase transition-all"
											>
												<span className="w-10 shrink-0" aria-hidden />
												<span className="flex-1 text-center">
													{navItem.label}
												</span>
												<span
													className={twMerge(
														'text-dp-dark inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
														isOpen && 'bg-dp-dark-green/10 text-dp-dark-green',
													)}
													aria-hidden
												>
													<svg
														className={twMerge(
															'h-4 w-4 transition-transform duration-200',
															isOpen && 'rotate-180',
														)}
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth={2.5}
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path d="m6 9 6 6 6-6" />
													</svg>
												</span>
											</button>

											<div
												id={panelId}
												hidden={!isOpen}
												className="border-dp-dark/10 mt-2 space-y-4 border-l-2 pt-2 pl-4 text-left normal-case"
											>
												<Link
													href={navItem.href}
													onClick={closeMenu}
													className="font-primary-font text-dp-dark-green border-dp-dark-green/40 hover:bg-dp-dark-green hover:border-dp-dark-green inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-sm font-bold tracking-wider uppercase transition-colors hover:text-white"
												>
													Go to {navItem.label}
													<svg
														aria-hidden
														className="h-3 w-3"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth={2.5}
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path d="M5 12h14M13 5l7 7-7 7" />
													</svg>
												</Link>

												{navItem.megaMenu!.columns.map((col) => (
													<div key={col.id}>
														{col.title && (
															<p className="font-primary-font text-dp-dark-green mb-2 text-xs font-bold tracking-widest uppercase">
																{col.title}
															</p>
														)}
														<ul className="space-y-1.5">
															{col.items.map((sub) => (
																<li key={sub.id}>
																	<Link
																		href={sub.href}
																		onClick={closeMenu}
																		className="hover:bg-dp-dark-green/5 group/sub block rounded-lg px-2 py-3 transition-colors"
																	>
																		<span className="font-primary-font text-dp-dark block text-sm font-bold tracking-normal normal-case">
																			{sub.headline ?? sub.label}
																		</span>
																		{sub.description && (
																			<span className="text-dp-body-soft font-secondary-font block text-xs tracking-normal normal-case">
																				{sub.description}
																			</span>
																		)}
																	</Link>
																</li>
															))}
														</ul>
													</div>
												))}
											</div>
										</div>
									) : (
										<Link
											href={navItem.href}
											onClick={closeMenu}
											className="font-primary-font bg-dp-body/0 hover:text-dp-dark-green hover:bg-dp-body/5 w-full rounded-xl py-2 text-base font-bold uppercase transition-all duration-300 group-hover:transition-all"
										>
											{navItem.label}
										</Link>
									)}
								</li>
							);
						})}
						{ctaHref && ctaLabel && (
							<li className={mobileNavStyles.navMobileItem}>
								<Link
									href={ctaHref}
									onClick={closeMenu}
									className="font-primary-font bg-dp-green text-dp-dark hover:bg-dp-dark hover:text-dp-green border-dp-green hover:border-dp-dark rounded-dp-20 mt-4 inline-block w-full border-2 px-6 py-3 text-center text-base font-bold uppercase shadow-2xl transition-all"
								>
									{ctaLabel}
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</Fragment>
	);
}
