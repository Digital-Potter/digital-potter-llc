import { ButtonLink } from '@/components/ui/Button';

type WebHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

export default function WebHero({
	primaryCtaHref,
	primaryCtaLabel,
}: WebHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Web Development
				</p>
				<h1 className="mt-6 text-balance">
					Custom Next.js websites that grow with your business.
				</h1>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					Every site we ship is hand-crafted Next.js — fast, SEO-ready from the
					first commit, owned by you on day one. No templates, no
					template-builder lock-in, no surprise traffic gates.
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
