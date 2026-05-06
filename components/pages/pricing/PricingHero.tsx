import { ButtonLink } from '@/components/ui/Button';

type PricingHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

export default function PricingHero({
	primaryCtaHref,
	primaryCtaLabel,
}: PricingHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Simple Pricing
				</p>
				<h1 className="mt-6 text-balance">
					Powerful CMS. Fully hosted. Built to grow with you.
				</h1>
				<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-balance">
					One flat monthly fee. No traffic gates, no per-page charges, no
					surprise upgrades. Add modules only if your business needs them, and
					own the code from day one.
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
