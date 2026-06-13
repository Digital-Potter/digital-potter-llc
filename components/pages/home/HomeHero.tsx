import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { getSiteUrls } from '@/helpers/cms/urls';

type HomeHeroProps = {
	primaryCtaHref: string;
	primaryCtaLabel: string;
};

const industries = [
	'Contractors & Trades',
	'Salons & Beauty',
	'Restaurants',
	'E-commerce',
	'Medical & Dental',
	'Law Firms',
	'Real Estate',
	'Artisan Studios',
];

export default async function HomeHero({
	primaryCtaHref,
	primaryCtaLabel,
}: HomeHeroProps) {
	const urls = await getSiteUrls();
	return (
		<section className="dp-container relative pt-16 pb-10 md:pt-24">
			{/* Soft brand glow behind the hero, Termius-style but in our palette */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full overflow-hidden"
			>
				<div className="bg-dp-green/15 absolute top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-[120px]" />
				<div className="bg-dp-dark-green/10 absolute top-72 left-1/4 h-72 w-72 rounded-full blur-[100px]" />
			</div>

			<div className="dp-hero-reveal mx-auto max-w-4xl text-center">
				<h1 className="text-balance">
					Beautifully crafted websites that win customers.
				</h1>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-3xl text-balance">
					We design and build your site by hand — no templates — then hand you
					the keys to <strong className="text-dp-dark">theDavid</strong>, our
					CMS where your team updates pages, takes bookings, and sells without a
					developer in the loop.
				</p>

				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<ButtonLink href="/discovery-call" variant="solid">
						Book a Free Discovery Call
					</ButtonLink>
					<ButtonLink href={primaryCtaHref} variant="outlined">
						{primaryCtaLabel}
					</ButtonLink>
				</div>
				<p className="text-dp-body-soft mt-4 text-sm">
					45 minutes · No obligation · You talk to the person who builds your
					site
				</p>

				{/* Industry chips — the "platform badges" of our hero */}
				<ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
					{industries.map((name) => (
						<li key={name}>
							<Link
								href="#who-we-help"
								className="border-dp-dark/15 text-dp-body hover:border-dp-dark-green hover:text-dp-dark-green inline-block rounded-full border bg-white/60 px-4 py-1.5 text-xs font-bold tracking-wide transition-colors md:text-sm"
							>
								{name}
							</Link>
						</li>
					))}
					<li>
						<Link
							href="#who-we-help"
							className="border-dp-dark-green/40 text-dp-dark-green hover:border-dp-dark-green hover:bg-dp-dark-green inline-block rounded-full border border-dashed bg-transparent px-4 py-1.5 text-xs font-bold tracking-wide transition-colors hover:text-white md:text-sm"
						>
							…and yours — we build for any business
						</Link>
					</li>
				</ul>
			</div>

			<HeroShowcase portfolioHref={urls.portfolioIndex} />
		</section>
	);
}

/**
 * The product showcase: theDavid's real dashboard in a browser frame,
 * with floating outcome cards. This is the "show, don't tell" moment.
 */
function HeroShowcase({ portfolioHref }: { portfolioHref: string }) {
	return (
		// NOTE: intentionally NOT animated. This block contains the hero
		// dashboard image, which is the LCP element — animating it from
		// opacity:0 defers LCP by the animation's delay+duration. It paints
		// immediately; only the copy above uses an entrance reveal.
		<div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
			{/* Floating outcome cards — hidden on small screens */}
			<div
				aria-hidden
				className="dp-float border-dp-dark/10 absolute -top-6 -left-4 z-10 hidden rounded-2xl border bg-white/90 px-5 py-4 shadow-xl backdrop-blur md:block lg:-left-12"
			>
				<p className="font-primary-font text-sm font-bold">
					<span className="bg-dp-green mr-2 inline-block h-2.5 w-2.5 rounded-full" />
					New booking confirmed
				</p>
				<p className="text-dp-body-soft mt-1 text-xs">
					Haircut & color · Friday 2:30 PM
				</p>
			</div>
			<div
				aria-hidden
				className="dp-float-delayed border-dp-dark/10 absolute top-20 -right-4 z-10 hidden rounded-2xl border bg-white/90 px-5 py-4 shadow-xl backdrop-blur md:block lg:-right-12"
			>
				<p className="font-primary-font text-sm font-bold">
					Order #1042 · <span className="text-dp-dark-green">Paid</span>
				</p>
				<p className="text-dp-body-soft mt-1 text-xs">
					2 items · Fulfillment ready
				</p>
			</div>

			{/* Browser frame */}
			<div className="dp-box-design relative overflow-hidden rounded-3xl">
				<div className="border-dp-dark/10 flex h-10 items-center gap-2 border-b bg-white/60 px-5">
					<span className="bg-dp-dark/30 h-2.5 w-2.5 rounded-full" />
					<span className="bg-dp-dark/20 h-2.5 w-2.5 rounded-full" />
					<span className="bg-dp-dark/10 h-2.5 w-2.5 rounded-full" />
					<span className="text-dp-body-soft mx-auto hidden rounded-full bg-white/80 px-4 py-0.5 text-xs sm:block">
						app.digitalpotter.io — theDavid
					</span>
				</div>
				<Image
					src="/cms/digital-potter-cms-home-dashboard.png"
					alt="theDavid CMS dashboard showing storefront visits, monthly sales, orders to fulfill, new customers, and a live activity feed"
					width={2086}
					height={1335}
					priority
					sizes="(max-width: 1024px) 92vw, 1024px"
					className="w-full"
				/>
			</div>

			<p className="text-dp-body-soft mt-6 text-center text-sm">
				theDavid — the dashboard behind every site we ship.{' '}
				<Link
					href={portfolioHref}
					className="text-dp-dark-green hover:text-dp-green font-bold"
				>
					See it powering real businesses →
				</Link>
			</p>
		</div>
	);
}
