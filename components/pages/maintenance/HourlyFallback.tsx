import Link from 'next/link';
import { HOURLY_RATE, HOURLY_MIN_HOURS } from '@/lib/pricing';

type HourlyFallbackProps = {
	ctaHref: string;
};

export default function HourlyFallback({ ctaHref }: HourlyFallbackProps) {
	return (
		<section className="dp-container py-12 md:py-16">
			<div className="border-dp-dark/10 mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 rounded-3xl border bg-white/40 p-8 md:flex-row md:items-center md:p-10">
				<div>
					<p className="font-primary-font text-dp-dark text-xs font-bold tracking-widest uppercase">
						No retainer? No problem.
					</p>
					<p className="font-primary-font text-dp-dark mt-3 text-xl font-bold md:text-2xl">
						Hourly support at{' '}
						<span className="text-dp-dark-green">${HOURLY_RATE}/hr</span>
					</p>
					<p className="text-dp-body/80 mt-3 text-base">
						Pay only when you need help, with a {HOURLY_MIN_HOURS}-hour minimum
						per request. No priority queue — retainer clients are served first.
						If you find yourself calling more than once a quarter, the Care Plan
						saves you money.
					</p>
				</div>
				<Link
					href={ctaHref}
					className="font-primary-font text-dp-dark-green hover:text-dp-green shrink-0 text-sm font-bold tracking-wider uppercase"
				>
					Request hourly help →
				</Link>
			</div>
		</section>
	);
}
