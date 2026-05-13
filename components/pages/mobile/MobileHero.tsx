import { ButtonLink } from '@/components/ui/Button';

type MobileHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

export default function MobileHero({
	primaryCtaHref,
	primaryCtaLabel,
}: MobileHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Mobile App Development
				</p>
				<h1 className="mt-6 text-balance">
					Native-quality apps shipped in half the time.
				</h1>
				<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-balance">
					We build cross-platform mobile apps with React Native and Expo — one
					codebase that runs on iOS and Android, with native performance, App
					Store-quality UX, and a release cadence that doesn&apos;t burn out
					your team.
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
