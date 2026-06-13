import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import DigitalPotterLogo from '@/components/DigitalPotterLogo';
import Indicator from './Indicator';
import MobileNav, { type MobileMegaMenu } from './MobileNav';
import MegaMenu, { type MegaMenuColumn, type MegaMenuLink } from './MegaMenu';
import { ButtonLink } from '@/components/ui/Button';
import {
	fetchNavigationOrEmpty,
	fetchStoreSettingsOrNull,
} from '@/helpers/cms/settings';
import { resolveMenuItemHref } from '@/helpers/cms/links';
import type {
	ResolvedMegaMenuColumn,
	ResolvedMenuItem,
	StoreSettingsRecord,
} from '@/helpers/cms/types';

type RenderedNavItem = {
	id: string;
	label: string;
	href: string;
	isHome: boolean;
	megaMenu?: MobileMegaMenu;
};

function toRendered(
	item: ResolvedMenuItem,
	siteStructure: StoreSettingsRecord['siteStructure'] | undefined,
): RenderedNavItem {
	const href = resolveMenuItemHref(item, siteStructure);
	const isHome = href === '/';
	const result: RenderedNavItem = {
		id: item._id,
		label: item.label,
		href,
		isHome,
	};
	if (item.isMegaMenu && item.megaMenuColumns?.length) {
		result.megaMenu = {
			header: { title: item.megaMenuTitle, subtitle: item.megaMenuSubtitle },
			columns: buildMegaColumns(item.megaMenuColumns, siteStructure),
		};
	}
	return result;
}

function buildMegaColumns(
	cols: ResolvedMegaMenuColumn[] | undefined,
	siteStructure: StoreSettingsRecord['siteStructure'] | undefined,
): MegaMenuColumn[] {
	if (!cols) return [];
	return cols.map((col) => ({
		id: col._id,
		title: col.title,
		subtitle: col.subtitle,
		items: col.items.map(
			(it): MegaMenuLink => ({
				id: it._id,
				label: it.label,
				href: resolveMenuItemHref(it, siteStructure),
				description: it.description,
				headline: it.headline,
				icon: it.icon,
			}),
		),
	}));
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

	const rendered = allItems.map((it) => toRendered(it, siteStructure));
	const navItems = rendered.slice(0, -1);
	const ctaItem = rendered.at(-1);
	const ctaHref = ctaItem?.href ?? '/discovery-call';
	const ctaLabel = ctaItem?.label ?? 'Let´s Connect';

	return (
		<header className="dp-container sticky top-0 z-50 flex h-[6.25rem] flex-row items-center justify-between">
			<Link
				href="/"
				aria-label="Digital Potter — home"
				className="bg-dp-yellowish/70 rounded-2xl p-2 backdrop-blur-md"
			>
				<DigitalPotterLogo
					width={262}
					height={34}
					className="w-[140px] md:w-[190px] lg:w-[262px]"
				/>
			</Link>
			<nav aria-label="Primary" className="dp-box-design hidden p-1 lg:block">
				<ul className="flex flex-row gap-1">
					{allItems.slice(0, -1).map((item, idx) => {
						const rendered = navItems[idx];
						if (!rendered) return null;
						if (item.isMegaMenu) {
							return (
								<li
									key={rendered.id}
									className="font-primary-font relative font-semibold uppercase"
								>
									<MegaMenu
										triggerHref={rendered.href}
										triggerLabel={rendered.label}
										header={{
											title: item.megaMenuTitle,
											subtitle: item.megaMenuSubtitle,
										}}
										columns={buildMegaColumns(
											item.megaMenuColumns,
											siteStructure,
										)}
									/>
								</li>
							);
						}
						return (
							<li
								key={rendered.id}
								className="font-primary-font relative font-semibold uppercase"
							>
								<Link
									href={rendered.href}
									className={twMerge(
										'bg-dp-dark-green/0 hover:bg-dp-dark-green block rounded-2xl px-5 py-2.5 transition-all hover:text-white',
									)}
								>
									{rendered.label}
									<Indicator path={rendered.href} isHome={rendered.isHome} />
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<div className="bg-dp-yellowish/95 flex flex-row items-center gap-2 rounded-2xl p-2 md:gap-4 lg:gap-8">
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
