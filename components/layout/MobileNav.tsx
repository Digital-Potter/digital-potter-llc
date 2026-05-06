'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';
import { Fragment, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import mobileNavStyles from './nav.module.css';

export type MobileNavItem = {
	id: string;
	label: string;
	href: string;
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
	const navRef = useRef<HTMLDivElement>(null);

	const onOpen = (e: MouseEvent) => {
		e.preventDefault();
		if (navRef) {
			navRef.current?.classList.add(`${mobileNavStyles.mobileOpen}`);
			navRef.current?.classList.remove(`${mobileNavStyles.mobileClose}`);
		}
	};

	const onClose = (e: MouseEvent) => {
		e.preventDefault();
		if (navRef) {
			navRef.current?.classList.add(`${mobileNavStyles.mobileClose}`);
			navRef.current?.classList.remove(`${mobileNavStyles.mobileOpen}`);
		}
	};

	return (
		<Fragment>
			<div className={mobileNavStyles.openerContainer}>
				<button
					className={mobileNavStyles.opener}
					onClick={onOpen}
					aria-label="Open menu"
				>
					<div className={mobileNavStyles.openerLineOne} />
					<div className={mobileNavStyles.openerLineTwo} />
					<div className={mobileNavStyles.openerLineThree} />
				</button>
			</div>

			<div
				ref={navRef}
				className={twMerge(
					`${mobileNavStyles.mobileNavContainer}`,
					`${mobileNavStyles.mobileClose}`,
				)}
			>
				<button
					className={mobileNavStyles.closer}
					onClick={onClose}
					aria-label="Close menu"
				>
					<div className={mobileNavStyles.closeLineOne} />
					<div className={mobileNavStyles.closeLineTwo} />
				</button>

				<nav role="navigation">
					<ul className={mobileNavStyles.mobileNavList}>
						{navItems.map((navItem) => (
							<li key={navItem.id} className={mobileNavStyles.navMobileItem}>
								<Link
									href={navItem.href}
									onMouseUp={onClose}
									className="font-primary-font bg-dp-body/0 hover:text-dp-dark-green hover:bg-dp-body/5 w-full rounded-xl py-2 text-base font-bold uppercase transition-all duration-300 group-hover:transition-all"
								>
									{navItem.label}
								</Link>
							</li>
						))}
						{ctaHref && ctaLabel && (
							<li className={mobileNavStyles.navMobileItem}>
								<Link
									href={ctaHref}
									onMouseUp={onClose}
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
