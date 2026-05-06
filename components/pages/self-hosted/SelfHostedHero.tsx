import { ButtonLink } from '@/components/ui/Button';

type SelfHostedHeroProps = {
	primaryCtaHref: string;
};

export default function SelfHostedHero({
	primaryCtaHref,
}: SelfHostedHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Self-Hosted Edition
				</p>
				<h1 className="mt-6 text-balance">Run theDavid in your own cloud.</h1>
				<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-balance">
					For organizations with data sovereignty, compliance, or scale needs
					that go beyond a managed plan. Same CMS, your infrastructure, your
					perimeter.
				</p>
				<div className="mt-10 flex justify-center">
					<ButtonLink href={primaryCtaHref} variant="solid">
						Talk to us about self-hosting
					</ButtonLink>
				</div>
			</div>
		</section>
	);
}
