import { ButtonLink } from '@/components/ui/Button';

type HomeHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

export default function HomeHero({
	primaryCtaHref,
	primaryCtaLabel,
}: HomeHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
				<div className="text-center lg:text-left">
					<h1 className="text-balance">
						Beautifully crafted web and mobile apps.
					</h1>
					<p className="text-dp-body/80 mt-6 text-balance">
						Designed for clarity, delight, and results. We hand-craft every
						pixel and every line of code so your site fits your business like it
						was made for it — because it was.
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
						<ButtonLink href={primaryCtaHref} variant="solid">
							{primaryCtaLabel}
						</ButtonLink>
						<ButtonLink href="/portfolio" variant="outlined">
							See our work
						</ButtonLink>
					</div>
				</div>
				<HeroVisualPlaceholder />
			</div>
		</section>
	);
}

function HeroVisualPlaceholder() {
	return (
		<div className="dp-box-design relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
			<div className="bg-dp-light-gray/40 flex h-9 items-center gap-2 px-4">
				<span className="bg-dp-dark/30 h-2.5 w-2.5 rounded-full" />
				<span className="bg-dp-dark/20 h-2.5 w-2.5 rounded-full" />
				<span className="bg-dp-dark/10 h-2.5 w-2.5 rounded-full" />
			</div>
			<div className="flex h-[calc(100%-2.25rem)] flex-col items-center justify-center gap-3 p-8 text-center">
				<div className="bg-dp-dark/10 h-3 w-1/2 rounded-full" />
				<div className="bg-dp-dark/10 h-3 w-2/3 rounded-full" />
				<div className="bg-dp-dark/10 h-3 w-2/5 rounded-full" />
				<div className="bg-dp-green/40 mt-6 h-10 w-32 rounded-full" />
				<p className="text-dp-body/60 mt-4 text-sm tracking-wider uppercase">
					Site preview
				</p>
			</div>
		</div>
	);
}
