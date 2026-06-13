import Link from 'next/link';
import { getTestimonial } from './testimonials.data';

type TestimonialQuoteProps = {
	id: string;
	/** Optional link rendered under the attribution, e.g. to a portfolio project. */
	linkHref?: string;
	linkLabel?: string;
};

/**
 * A single pull-quote section — the proof moment on pages that don't
 * carry the full testimonial carousel.
 */
export default function TestimonialQuote({
	id,
	linkHref,
	linkLabel,
}: TestimonialQuoteProps) {
	const t = getTestimonial(id);
	return (
		<section className="dp-container py-12 md:py-16">
			<figure className="border-dp-green/40 mx-auto max-w-3xl rounded-3xl border-l-4 bg-white/50 px-8 py-10 md:px-12">
				<svg
					aria-hidden
					className="text-dp-green h-8 w-8"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M9.5 6h-1A4.5 4.5 0 0 0 4 10.5V18h6v-7H6.5A2.5 2.5 0 0 1 9 8.5V6Zm10.5 0h-1a4.5 4.5 0 0 0-4.5 4.5V18h6v-7h-3.5a2.5 2.5 0 0 1 2.5-2.5V6Z" />
				</svg>
				<blockquote className="mt-4">
					<p className="text-dp-dark text-lg leading-relaxed font-medium md:text-xl">
						&ldquo;{t.quote}&rdquo;
					</p>
				</blockquote>
				<figcaption className="text-dp-body-soft mt-5 text-sm">
					<span className="text-dp-dark font-bold">{t.name}</span>
					{' · '}
					{t.company}
					<span className="mx-2">|</span>
					<span className="text-xs">Source: {t.source}</span>
					{linkHref && linkLabel && (
						<>
							<span className="mx-2">|</span>
							<Link
								href={linkHref}
								className="text-dp-dark-green hover:text-dp-green text-xs font-bold"
							>
								{linkLabel}
							</Link>
						</>
					)}
				</figcaption>
			</figure>
		</section>
	);
}
