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
	const siteStructure = settingsData?.settings?.siteStructure;
	const policies = settingsData?.settings?.policies ?? [];

	// Layout: chrome (logo + ©) | N menu columns | CTA
	const colCount = 1 + columns.length + 1;
	const gridClass =
		colCount === 3
			? 'grid gap-10 md:grid-cols-3'
			: colCount === 4
				? 'grid gap-10 md:grid-cols-4'
				: colCount === 5
					? 'grid gap-10 md:grid-cols-5'
					: 'grid gap-10 md:grid-cols-6';

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
						<p className="text-dp-body-soft mt-4 text-base">
							© {new Date().getFullYear()} Digital Potter LLC.
						</p>
					</div>
					{columns.map((menu) => (
						<div key={menu._id}>
							<h3 className="font-primary-font mb-3 text-sm font-bold tracking-wider uppercase">
								{menu.name}
							</h3>
							<ul className="text-dp-body-soft">
								{menu.items.map((item) => {
									const href = resolveMenuItemHref(item, siteStructure);
									return (
										<li key={item._id}>
											<Link
												href={href}
												className="hover:text-dp-dark inline-block py-2"
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
					<div className="flex md:items-start">
						<ButtonLink href={cta.href} variant="solid">
							{cta.label}
						</ButtonLink>
					</div>
				</div>
				{policies.length > 0 && (
					<ul className="border-dp-dark/10 text-dp-body-soft mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t pt-6">
						{policies.map((policy) => (
							<li key={policy.slug}>
								<Link
									href={`/policies/${policy.slug}`}
									className="hover:text-dp-dark inline-block"
								>
									{policy.title}
								</Link>
							</li>
						))}
					</ul>
				)}
			</Container>
		</footer>
	);
}
