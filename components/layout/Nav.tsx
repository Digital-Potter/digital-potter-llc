import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import DigitalPotterLogo from '@/components/DigitalPotterLogo';
import Indicator from './Indicator';
import MobileNav from './MobileNav';
import ServicesMegaMenu, {
	type MegaColumnItem,
	type MegaHeader,
} from './ServicesMegaMenu';
import { ButtonLink } from '@/components/ui/Button';
import {
	fetchNavigationOrEmpty,
	fetchStoreSettingsOrNull,
} from '@/helpers/cms/settings';
import { resolveMenuItemHref } from '@/helpers/cms/links';
import type {
	NavigationMenu,
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

/**
 * Convert a CMS NavigationMenu's items into the shape the ServicesMegaMenu
 * expects. Each item carries its CMS-authored description/headline/icon if
 * present; the mega menu falls back to hardcoded copy keyed by label/slug
 * when those fields are empty.
 */
function buildMegaColumn(
	menu: NavigationMenu | undefined,
	siteStructure: StoreSettingsRecord['siteStructure'] | undefined,
): MegaColumnItem[] {
	if (!menu) return [];
	return menu.items.map((it) => ({
		id: it._id,
		label: it.label,
		href: resolveMenuItemHref(it, siteStructure),
		slug: it.resolved?.slug ?? '',
		description: it.description,
		headline: it.headline,
		icon: it.icon,
	}));
}

function buildMegaHeader(menu: NavigationMenu | undefined): MegaHeader {
	return {
		title: menu?.title,
		subtitle: menu?.subtitle,
	};
}

export async function Nav() {
	const [navData, settingsData] = await Promise.all([
		fetchNavigationOrEmpty('header'),
		fetchStoreSettingsOrNull(),
	]);

	const menusBySlug = new Map(navData.menus.map((m) => [m.slug, m]));
	const headerMenu =
		menusBySlug.get('top-main-menu') ??
		navData.menus.find((m) => m.items.length > 0) ??
		navData.menus[0];
	const allItems = headerMenu?.items ?? [];
	const siteStructure = settingsData?.settings?.siteStructure;

	const col1Menu = menusBySlug.get('services-submenu-col-1');
	const col2Menu = menusBySlug.get('services-submenu-col-2');
	const megaCol1 = buildMegaColumn(col1Menu, siteStructure);
	const megaCol2 = buildMegaColumn(col2Menu, siteStructure);
	const megaHeader = buildMegaHeader(col1Menu);

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
										col1={megaCol1}
										col2={megaCol2}
										header={megaHeader}
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
