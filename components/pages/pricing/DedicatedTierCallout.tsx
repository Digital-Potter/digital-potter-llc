import Link from 'next/link';

type DedicatedTierCalloutProps = {
	ctaHref: string;
};

export default function DedicatedTierCallout({
	ctaHref,
}: DedicatedTierCalloutProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="bg-dp-dark text-dp-yellowish/90 mx-auto max-w-5xl rounded-3xl p-10 md:p-16">
				<div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
					<div className="lg:col-span-2">
						<p className="text-dp-green font-primary-font text-xs font-bold tracking-widest uppercase">
							Need something bigger?
						</p>
						<h2 className="text-dp-yellowish mt-6 text-balance">
							Dedicated infrastructure for high-traffic, regulated, or
							self-hosted clients.
						</h2>
						<p className="mt-6 text-base md:text-lg">
							When we know a site will see heavy load, run in a compliance
							environment (HIPAA, SOC 2), or needs to live entirely in your own
							AWS / GCP / Azure account, we move it to a dedicated tier. We
							surface that recommendation during discovery — never as a surprise
							after launch — and it&apos;s priced per project.
						</p>
					</div>
					<div className="flex flex-col items-stretch justify-center gap-4 lg:items-end">
						<Link
							href={ctaHref}
							className="font-primary-font bg-dp-green text-dp-dark hover:bg-dp-yellowish rounded-dp-20 inline-flex items-center justify-center px-6 py-3 text-sm font-bold uppercase shadow-2xl transition-colors"
						>
							Talk about a custom tier
						</Link>
						<Link
							href="/self-hosted-edition"
							className="font-primary-font hover:text-dp-green text-dp-yellowish/80 text-center text-sm font-bold tracking-wider uppercase"
						>
							Self-hosting details →
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
