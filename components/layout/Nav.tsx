import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import DigitalPotterLogo from '@/components/DigitalPotterLogo';
import Indicator from './Indicator';
import MobileNav from './MobileNav';
import ServicesMegaMenu from './ServicesMegaMenu';
import { ButtonLink } from '@/components/ui/Button';
import {
	fetchNavigationOrEmpty,
	fetchStoreSettingsOrNull,
} from '@/helpers/cms/settings';
import { resolveMenuItemHref } from '@/helpers/cms/links';
import type {
	ResolvedMenuItem,
	StoreSettingsRecord,
} from '@/helpers/cms/types';

type RenderedNavItem = {
	id: string;
	label: string;
	href: string;
	isHome: boolean;
};

function toRendered(
	item: ResolvedMenuItem,
	siteStructure: StoreSettingsRecord['siteStructure'] | undefined,
): RenderedNavItem {
	const href = resolveMenuItemHref(item, siteStructure);
	const isHome = href === '/';
	return { id: item._id, label: item.label, href, isHome };
}

export async function Nav() {
	const [navData, settingsData] = await Promise.all([
		fetchNavigationOrEmpty('header'),
		fetchStoreSettingsOrNull(),
	]);

	const headerMenu = navData.menus[0];
	const allItems = headerMenu?.items ?? [];
	const siteStructure = settingsData?.settings?.siteStructure;

	const rendered = allItems.map((it) => toRendered(it, siteStructure));
	const navItems = rendered.slice(0, -1);
	const ctaItem = rendered.at(-1);
	const ctaHref = ctaItem?.href ?? '/lets-connect';
	const ctaLabel = ctaItem?.label ?? 'Let´s Connect';

	return (
		<header className="dp-container sticky top-0 z-50 flex h-[6.25rem] flex-row items-center justify-between">
			<Link href="/" aria-label="Digital Potter — home">
				<DigitalPotterLogo
					width={262}
					height={34}
					className="w-[140px] md:w-[190px] lg:w-[262px]"
				/>
			</Link>
			<nav className="dp-box-design hidden p-1 lg:block">
				<ul className="flex flex-row gap-1">
					{navItems.map((item) => {
						const isServices = item.label.toLowerCase() === 'services';
						return (
							<li
								key={item.id}
								className="font-primary-font relative font-semibold uppercase"
							>
								{isServices ? (
									<ServicesMegaMenu
										triggerHref={item.href}
										triggerLabel={item.label}
									/>
								) : (
									<Link
										href={item.href}
										className={twMerge(
											'bg-dp-dark-green/0 hover:bg-dp-dark-green block rounded-2xl px-5 py-2.5 transition-all hover:text-white',
										)}
									>
										{item.label}
										<Indicator path={item.href} isHome={item.isHome} />
									</Link>
								)}
							</li>
						);
					})}
				</ul>
			</nav>
			<div className="flex flex-row items-center gap-2 md:gap-4 lg:gap-8">
				<ButtonLink
					href={ctaHref}
					variant="solid"
					className="order-2 lg:order-1"
				>
					{ctaLabel}
				</ButtonLink>
				<div className="order-1 block lg:hidden">
					<MobileNav
						navItems={navItems}
						ctaHref={ctaHref}
						ctaLabel={ctaLabel}
					/>
				</div>
			</div>
		</header>
	);
}
