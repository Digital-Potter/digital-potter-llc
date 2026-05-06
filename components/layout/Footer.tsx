import Link from 'next/link';
import { Container } from './Container';
import DigitalPotterLogo from '@/components/DigitalPotterLogo';
import { ButtonLink } from '@/components/ui/Button';
import {
	fetchNavigationOrEmpty,
	fetchStoreSettingsOrNull,
} from '@/helpers/cms/settings';
import { resolveMenuItemHref } from '@/helpers/cms/links';
import { resolveCtaHref } from './cta-href';

export async function Footer() {
	const [navData, settingsData, cta] = await Promise.all([
		fetchNavigationOrEmpty('footer'),
		fetchStoreSettingsOrNull(),
		resolveCtaHref(),
	]);

	const columns = [...navData.menus].sort((a, b) =>
		a.slug.localeCompare(b.slug),
	);
	const homepageSlug = settingsData?.settings?.siteStructure?.homepageSlug;
	const colCount = 1 + columns.length;
	const gridClass =
		colCount === 2
			? 'grid gap-10 md:grid-cols-2'
			: colCount === 3
				? 'grid gap-10 md:grid-cols-3'
				: colCount === 4
					? 'grid gap-10 md:grid-cols-4'
					: 'grid gap-10 md:grid-cols-5';

	return (
		<footer className="border-dp-dark/10 bg-dp-yellowish mt-20 border-t py-10 text-sm">
			<Container>
				<div className={gridClass}>
					<div>
						<Link href="/" aria-label="Digital Potter — home">
							<DigitalPotterLogo
								width={262}
								height={34}
								className="w-[160px] md:w-[180px]"
							/>
						</Link>
						<p className="text-dp-body/70 mt-4 text-base">
							© {new Date().getFullYear()} Digital Potter LLC.
						</p>
						<div className="mt-6">
							<ButtonLink href={cta.href} variant="solid">
								{cta.label}
							</ButtonLink>
						</div>
					</div>
					{columns.map((menu) => (
						<div key={menu._id}>
							<h3 className="font-primary-font mb-3 text-sm font-bold tracking-wider uppercase">
								{menu.name}
							</h3>
							<ul className="text-dp-body/70 space-y-2">
								{menu.items.map((item) => {
									const href = resolveMenuItemHref(
										item,
										homepageSlug ? { homepageSlug } : undefined,
									);
									return (
										<li key={item._id}>
											<Link
												href={href}
												className="hover:text-dp-dark"
												target={item.openInNewTab ? '_blank' : undefined}
												rel={
													item.openInNewTab ? 'noopener noreferrer' : undefined
												}
											>
												{item.label}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</div>
			</Container>
		</footer>
	);
}
