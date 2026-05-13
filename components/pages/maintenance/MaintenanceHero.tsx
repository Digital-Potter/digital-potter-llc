import { ButtonLink } from '@/components/ui/Button';

type MaintenanceHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

export default function MaintenanceHero({
	primaryCtaHref,
	primaryCtaLabel,
}: MaintenanceHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Maintenance & Support
				</p>
				<h1 className="mt-6 text-balance">
					We don&apos;t disappear after launch.
				</h1>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					Custom websites and apps need ongoing care — security patches, content
					tweaks, performance work, the occasional new feature. Pick a retainer
					that fits how often you actually ship, or pay hourly when you only
					need help once.
				</p>
				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<ButtonLink href={primaryCtaHref} variant="solid">
						{primaryCtaLabel}
					</ButtonLink>
					<ButtonLink href="/discovery-call" variant="outlined">
						Schedule a Discovery Call
					</ButtonLink>
				</div>
			</div>
		</section>
	);
}
