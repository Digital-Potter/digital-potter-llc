import { ButtonLink } from '@/components/ui/Button';
import ScreenshotFrame from './ScreenshotFrame';

type CmsHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

export default function CmsHero({
	primaryCtaHref,
	primaryCtaLabel,
}: CmsHeroProps) {
	return (
		<section className="dp-container relative overflow-hidden py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					theDavid · The Digital Potter CMS
				</p>
				<h1 className="mt-6 text-balance">
					The CMS we built for our own clients.
				</h1>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					Multi-tenant. Headless. Built around editorial control. theDavid
					powers every Digital Potter site — your marketing team writes,
					designers ship, engineers stay focused on shipping features.
				</p>
				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<ButtonLink href={primaryCtaHref} variant="solid">
						{primaryCtaLabel}
					</ButtonLink>
					<ButtonLink href="/digital-potter-pricing" variant="outlined">
						See pricing
					</ButtonLink>
				</div>
			</div>

			<div className="relative mx-auto mt-16 max-w-6xl">
				<div
					aria-hidden
					className="from-dp-green/20 to-dp-dark-green/10 absolute -inset-x-12 -top-8 -bottom-8 -z-10 rounded-[3rem] bg-gradient-to-br blur-2xl"
				/>
				<ScreenshotFrame
					src="/cms/featured-ss-cms-thedavid-by-digital-potter.png"
					alt="theDavid dashboard with KPIs, store visits, and activity feed"
					placeholderLabel="Dashboard"
					width={1565}
					height={1005}
					priority
				/>
			</div>
		</section>
	);
}
