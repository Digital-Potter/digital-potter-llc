import { ButtonLink } from '@/components/ui/Button';

type PortfolioHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

export default function PortfolioHero({
	primaryCtaHref,
	primaryCtaLabel,
}: PortfolioHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Selected Work
				</p>
				<h1 className="mt-6 text-balance">
					Real businesses. Real sites. Real results.
				</h1>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					Restaurants, trades, retailers, artists, and platforms. Every one
					started as a blank page and ended as a custom build the client&apos;s
					own team runs — and your project could be the next card on this page.
				</p>
				<div className="mt-10 flex justify-center">
					<ButtonLink href={primaryCtaHref} variant="solid">
						{primaryCtaLabel}
					</ButtonLink>
				</div>
			</div>
		</section>
	);
}
