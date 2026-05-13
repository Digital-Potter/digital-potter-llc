import { ButtonLink } from '@/components/ui/Button';

type ServicesHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

export default function ServicesHero({
	primaryCtaHref,
	primaryCtaLabel,
}: ServicesHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Premium Digital Services
				</p>
				<h1 className="mt-6 text-balance">
					No more Frankenstein monsters — just streamlined, beautifully crafted
					solutions.
				</h1>
				<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-balance">
					Three services built to work together. Use one when you need it, all
					three when you&apos;re ready to grow. Every engagement starts with
					questions, not a template.
				</p>
				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<ButtonLink href={primaryCtaHref} variant="solid">
						{primaryCtaLabel}
					</ButtonLink>
					<ButtonLink href="/contact-us" variant="outlined">
						Schedule a Discovery Call
					</ButtonLink>
				</div>
			</div>
		</section>
	);
}
