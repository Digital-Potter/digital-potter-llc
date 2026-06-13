import Link from 'next/link';
import ScreenshotFrame from '@/components/shared/ScreenshotFrame';

export default function PlatformTour() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					The product, not a pitch deck
				</p>
				<h2 className="mt-6 text-balance">
					This is what your team gets the keys to.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					The same theDavid that powers our managed clients — running in your
					cloud, under your keys, with your audit trail.
				</p>
			</div>
			<div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-8">
				<ScreenshotFrame
					src="/cms/digital-potter-cms-site-options.png"
					alt="theDavid Site Options screen with store-wide settings, integrations, and policies"
					caption="Site-level configuration — navigation, SEO defaults, integrations, policies"
					tilt="left"
					width={1857}
					height={1354}
				/>
				<ScreenshotFrame
					src="/cms/digital-potter-cms-home-dashboard.png"
					alt="theDavid operations dashboard with sales, orders, customers, and activity feed"
					caption="The operations dashboard your team signs into every morning"
					tilt="right"
					width={2086}
					height={1335}
				/>
			</div>
			<p className="mt-10 text-center">
				<Link
					href="/the-cms-we-built-for-our-own-clients"
					className="text-dp-dark-green hover:text-dp-green font-primary-font text-sm font-bold tracking-wide uppercase"
				>
					Take the full tour of theDavid →
				</Link>
			</p>
		</section>
	);
}
