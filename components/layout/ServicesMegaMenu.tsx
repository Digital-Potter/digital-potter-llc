'use client';

import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import {
	COL1_BY_LABEL,
	COL1_BY_SLUG,
	COL2_BY_LABEL,
	COL2_BY_SLUG,
	SERVICES_FEATURED,
	SERVICES_MEGAMENU_HEADER,
	SERVICES_MENU,
	type MegaIcon,
} from './megaMenuConfig';
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

export type MegaColumnItem = {
	/** Stable key — the CMS menu item's _id. Used as React key so duplicate hrefs don't collide. */
	id: string;
	label: string;
	href: string;
	slug: string;
	/** CMS-authored description; falls back to slug→label hardcoded copy. */
	description?: string;
	/** CMS-authored headline (col2 cards); falls back to slug→label hardcoded copy. */
	headline?: string;
	/** CMS-authored icon name; falls back to slug→label hardcoded icon. */
	icon?: string;
};

export type MegaHeader = {
	title?: string;
	subtitle?: string;
};

type ServicesMegaMenuProps = {
	triggerHref: string;
	triggerLabel: string;
	/** CMS-authored items for the icon column. When empty, the hardcoded SERVICES_MENU is used. */
	col1?: MegaColumnItem[];
	/** CMS-authored items for the featured-card column. When empty, the hardcoded SERVICES_FEATURED is used. */
	col2?: MegaColumnItem[];
	/** CMS-authored title/subtitle for the mega-menu header. Each field falls back to the hardcoded default if empty. */
	header?: MegaHeader;
};

type ResolvedCol1 = {
	id: string;
	label: string;
	href: string;
	description: string;
	icon: MegaIcon;
};

type ResolvedCol2 = {
	id: string;
	label: string;
	href: string;
	headline: string;
	body: string;
};

/**
 * Resolve hardcoded fallback copy for a column-1 item by trying its linked
 * page slug first, then its lowercased label. Returns undefined when neither
 * lookup matches.
 */
function col1Fallback(slug: string, label: string) {
	return COL1_BY_SLUG[slug] ?? COL1_BY_LABEL[label.toLowerCase()] ?? undefined;
}

function col2Fallback(slug: string, label: string) {
	return COL2_BY_SLUG[slug] ?? COL2_BY_LABEL[label.toLowerCase()] ?? undefined;
}

function resolveCol1(col1: MegaColumnItem[] | undefined): ResolvedCol1[] {
	if (!col1 || col1.length === 0) {
		return SERVICES_MENU.map((m, i) => ({
			id: `static-${i}`,
			label: m.label,
			href: m.href,
			description: m.description,
			icon: m.icon,
		}));
	}
	return col1.map((item, i) => {
		const fb = col1Fallback(item.slug, item.label);
		return {
			id: item.id || `${item.href}-${i}`,
			label: item.label,
			href: item.href,
			description: item.description?.trim() || fb?.description || '',
			icon: ((item.icon as MegaIcon | undefined) ??
				fb?.icon ??
				'code') as MegaIcon,
		};
	});
}

function resolveCol2(col2: MegaColumnItem[] | undefined): ResolvedCol2[] {
	if (!col2 || col2.length === 0) {
		return SERVICES_FEATURED.map((c, i) => ({
			id: `static-${i}`,
			label: c.label,
			href: c.href,
			headline: c.headline,
			body: c.body,
		}));
	}
	return col2.map((item, i) => {
		const fb = col2Fallback(item.slug, item.label);
		return {
			id: item.id || `${item.href}-${i}`,
			label: item.label,
			href: item.href,
			headline: item.headline?.trim() || fb?.headline || item.label,
			body: item.description?.trim() || fb?.body || '',
		};
	});
}

export default function ServicesMegaMenu({
	triggerHref,
	triggerLabel,
	col1,
	col2,
	header,
}: ServicesMegaMenuProps) {
	const [open, setOpen] = useState(false);
	const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const cancelClose = () => {
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
			closeTimerRef.current = null;
		}
	};

	const scheduleClose = () => {
		cancelClose();
		closeTimerRef.current = setTimeout(() => setOpen(false), 120);
	};

	const handleClick = () => {
		cancelClose();
		setOpen(false);
		if (
			typeof document !== 'undefined' &&
			document.activeElement instanceof HTMLElement
		) {
			document.activeElement.blur();
		}
	};

	const resolvedCol1 = resolveCol1(col1);
	const resolvedCol2 = resolveCol2(col2);
	const eyebrow = header?.title?.trim() || SERVICES_MEGAMENU_HEADER.eyebrow;
	const subtitle =
		header?.subtitle?.trim() || SERVICES_MEGAMENU_HEADER.subtitle;

	return (
		<div
			className="relative"
			onMouseEnter={() => {
				cancelClose();
				setOpen(true);
			}}
			onMouseLeave={scheduleClose}
			onFocus={() => {
				cancelClose();
				setOpen(true);
			}}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
			}}
		>
			<Link
				href={triggerHref}
				onClick={handleClick}
				className="bg-dp-dark-green/0 hover:bg-dp-dark-green flex items-center gap-1.5 rounded-2xl px-5 py-2.5 transition-all hover:text-white"
				aria-haspopup="true"
				aria-expanded={open}
			>
				{triggerLabel}
				<svg
					aria-hidden
					className={twMerge(
						'h-3 w-3 transition-transform',
						open ? 'rotate-180' : '',
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
				<Indicator path={triggerHref} isHome={false} />
			</Link>

			<div
				role="menu"
				aria-hidden={!open}
				className={twMerge(
					'absolute top-full left-1/2 mt-3 w-[44rem] -translate-x-1/2 backdrop-blur-3xl transition-all duration-150',
					open
						? 'visible translate-y-0 opacity-100'
						: 'pointer-events-none invisible translate-y-1 opacity-0',
				)}
			>
				<div className="bg-dp-yellowish/95 border-dp-dark/10 rounded-3xl border-2 p-6 normal-case shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] backdrop-blur-3xl">
					<div className="px-2 pb-3">
						<p className="font-primary-font text-dp-dark-green text-xs font-bold tracking-widest uppercase">
							{eyebrow}
						</p>
						<p className="text-dp-body/80 font-secondary-font mt-2 text-sm tracking-normal normal-case">
							{subtitle}
						</p>
					</div>

					<div className="grid gap-2 md:grid-cols-5">
						<ul className="md:col-span-3">
							{resolvedCol1.map((item) => (
								<li key={item.id}>
									<Link
										href={item.href}
										onClick={handleClick}
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
												{iconPaths[item.icon] ?? iconPaths.code}
											</svg>
										</span>
										<span className="min-w-0">
											<span className="font-primary-font text-dp-dark block text-base font-bold tracking-normal normal-case">
												{item.label}
											</span>
											{item.description && (
												<span className="text-dp-body/70 font-secondary-font block text-sm tracking-normal normal-case">
													{item.description}
												</span>
											)}
										</span>
									</Link>
								</li>
							))}
						</ul>

						<ul className="border-dp-dark/10 mt-2 space-y-2 border-t pt-3 md:col-span-2 md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pl-3">
							{resolvedCol2.map((card) => (
								<li key={card.id}>
									<Link
										href={card.href}
										onClick={handleClick}
										className="hover:bg-dp-dark-green/5 block rounded-2xl p-3 transition-colors"
									>
										<span className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
											{card.label}
										</span>
										<span className="font-primary-font text-dp-dark mt-1 block text-base font-bold tracking-normal normal-case">
											{card.headline}
										</span>
										{card.body && (
											<span className="text-dp-body/70 font-secondary-font mt-2 block text-sm tracking-normal normal-case">
												{card.body}
											</span>
										)}
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
