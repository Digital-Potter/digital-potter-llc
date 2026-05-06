import { FRONTEND_ONETIME } from '@/lib/pricing';

const included = [
	'Brand discovery and visual design system',
	'Custom Next.js codebase — yours to keep when you leave',
	'Mobile-responsive layout for every page',
	'Page templates the CMS uses for unlimited future pages',
	'Content migration from your existing site',
	'Basic SEO setup (schema, sitemap, OG tags, canonical URLs)',
	'Contact / quote form connected to your CMS',
	'Launch on our infrastructure with monitoring',
	'One month of post-launch fixes and onboarding support',
];

const customQuote = [
	'Complex third-party integrations (custom APIs, custom auth)',
	'Custom backend logic, calculators, or admin dashboards',
	'Ecommerce or membership setup beyond the module defaults',
	'Multi-language and multi-region content',
	'Mobile app companion (see /mobile-development)',
	'Custom illustrations, animations, or 3D visuals',
	'Migration from a complex legacy CMS or ecommerce platform',
	'Site redesigns of an existing Digital Potter build',
];

export default function BuildScope() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					What the foundation covers
				</p>
				<h2 className="mt-6 text-balance">
					${FRONTEND_ONETIME.toLocaleString()} is the starting point — not the
					ceiling.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					We sell foundations, not features. The base price covers everything a
					typical small business needs to launch. Anything beyond that is quoted
					in your proposal so there are no surprises later.
				</p>
			</div>

			<div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
				<article className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8 md:p-10">
					<div className="flex items-center gap-3">
						<span className="bg-dp-green/20 text-dp-dark-green inline-flex h-10 w-10 items-center justify-center rounded-2xl">
							<svg
								aria-hidden
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
							</svg>
						</span>
						<div>
							<p className="font-primary-font text-dp-dark-green text-xs font-bold tracking-widest uppercase">
								Included in the foundation
							</p>
							<p className="font-primary-font text-dp-dark mt-1 text-xl font-bold">
								Starting at ${FRONTEND_ONETIME.toLocaleString()}
							</p>
						</div>
					</div>
					<ul className="mt-6 space-y-3">
						{included.map((item) => (
							<li
								key={item}
								className="text-dp-body/85 flex items-start gap-3 text-base"
							>
								<svg
									aria-hidden
									className="fill-dp-green mt-1 h-4 w-4 shrink-0"
									viewBox="0 0 20 20"
								>
									<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
								</svg>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</article>

				<article className="border-dp-dark/15 rounded-3xl border-2 bg-white/40 p-8 md:p-10">
					<div className="flex items-center gap-3">
						<span className="bg-dp-dark/10 text-dp-dark inline-flex h-10 w-10 items-center justify-center rounded-2xl">
							<svg
								aria-hidden
								className="h-5 w-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 8v4M12 16h.01" />
								<circle cx="12" cy="12" r="10" />
							</svg>
						</span>
						<div>
							<p className="font-primary-font text-dp-dark text-xs font-bold tracking-widest uppercase">
								Quoted separately in your proposal
							</p>
							<p className="font-primary-font text-dp-dark mt-1 text-xl font-bold">
								Custom — based on scope
							</p>
						</div>
					</div>
					<ul className="mt-6 space-y-3">
						{customQuote.map((item) => (
							<li
								key={item}
								className="text-dp-body/75 flex items-start gap-3 text-base"
							>
								<svg
									aria-hidden
									className="text-dp-dark/40 mt-1 h-4 w-4 shrink-0"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={3}
									strokeLinecap="round"
								>
									<path d="M5 12h14" />
								</svg>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</article>
			</div>

			<p className="text-dp-body/70 mx-auto mt-10 max-w-2xl text-center text-sm">
				Not sure where your project lands? That&apos;s the point of the
				discovery call — we listen, scope, and send you a proposal with the
				exact line items and a fixed price before any work begins.
			</p>
		</section>
	);
}
