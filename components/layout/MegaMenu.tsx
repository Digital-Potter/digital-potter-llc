'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { SERVICES_MEGAMENU_HEADER } from './megaMenuConfig';
import Indicator from './Indicator';

export type MegaMenuLink = {
	id: string;
	label: string;
	href: string;
	description?: string;
	headline?: string;
	icon?: string;
};

export type MegaMenuColumn = {
	id: string;
	title?: string;
	subtitle?: string;
	items: MegaMenuLink[];
};

type MegaMenuProps = {
	triggerHref: string;
	triggerLabel: string;
	header?: { title?: string; subtitle?: string };
	columns?: MegaMenuColumn[];
};

const colsClass: Record<number, string> = {
	1: 'md:grid-cols-1',
	2: 'md:grid-cols-2',
	3: 'md:grid-cols-3',
	4: 'md:grid-cols-4',
};

export default function MegaMenu({
	triggerHref,
	triggerLabel,
	header,
	columns,
}: MegaMenuProps) {
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

	// No columns from CMS → render the trigger as a regular link, no dropdown.
	if (!columns || columns.length === 0) {
		return (
			<Link
				href={triggerHref}
				className="bg-dp-dark-green/0 hover:bg-dp-dark-green relative block rounded-2xl px-5 py-2.5 transition-all hover:text-white"
			>
				{triggerLabel}
				<Indicator path={triggerHref} isHome={false} />
			</Link>
		);
	}

	const eyebrow = header?.title?.trim() || SERVICES_MEGAMENU_HEADER.eyebrow;
	const subtitle =
		header?.subtitle?.trim() || SERVICES_MEGAMENU_HEADER.subtitle;
	const colCount = Math.min(Math.max(columns.length, 1), 4);

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

					<div className={`grid gap-4 ${colsClass[colCount] ?? colsClass[2]}`}>
						{columns.map((col, ci) => (
							<div
								key={col.id}
								className={
									ci === 0
										? ''
										: 'border-dp-dark/10 border-t pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4'
								}
							>
								{(col.title || col.subtitle) && (
									<div className="px-2 pb-3">
										{col.title && (
											<p className="font-primary-font text-dp-dark-green text-xs font-bold tracking-widest uppercase">
												{col.title}
											</p>
										)}
										{col.subtitle && (
											<p className="text-dp-body/70 font-secondary-font mt-1 text-xs tracking-normal normal-case">
												{col.subtitle}
											</p>
										)}
									</div>
								)}
								<ul>
									{col.items.map((item) => (
										<li key={item.id}>
											<Link
												href={item.href}
												onClick={handleClick}
												className="hover:bg-dp-dark-green/5 group/link flex flex-col gap-1 rounded-2xl p-3 transition-colors"
											>
												{item.headline && (
													<span className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
														{item.label}
													</span>
												)}
												<span className="font-primary-font text-dp-dark block text-base font-bold tracking-normal normal-case">
													{item.headline ?? item.label}
												</span>
												{item.description && (
													<span className="text-dp-body/70 font-secondary-font block text-sm tracking-normal normal-case">
														{item.description}
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
			</div>
		</div>
	);
}
