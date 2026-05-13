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
					Transparent Pricing
				</p>
				<h1 className="mt-6 text-balance">
					Custom-built digital products. Engineered to grow with your business.
				</h1>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					We build serious web platforms for businesses that want ownership,
					performance, and a real engineer in the room. One-time build, flat
					monthly infrastructure, optional modules — every line item visible up
					front, no surprises after launch.
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
