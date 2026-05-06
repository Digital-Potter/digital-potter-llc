// Placeholder content — replace with real testimonials and client logos when available.
const testimonial = {
	quote:
		'Before Digital Potter, our content team waited a week for engineering to update one paragraph. Now they ship same-day. The site is faster, more stable, and our contact form actually converts.',
	name: 'Placeholder Name',
	title: 'Marketing Director',
	company: 'Placeholder Company',
};

const logos = ['Logo 1', 'Logo 2', 'Logo 3', 'Logo 4', 'Logo 5', 'Logo 6'];

export default function SocialProof() {
	return (
		<section className="dp-container py-16 md:py-24">
			<figure className="mx-auto max-w-4xl text-center">
				<svg
					aria-hidden
					className="text-dp-green mx-auto h-10 w-10"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M9.5 6h-1A4.5 4.5 0 0 0 4 10.5V18h6v-7H6.5A2.5 2.5 0 0 1 9 8.5V6Zm10.5 0h-1a4.5 4.5 0 0 0-4.5 4.5V18h6v-7h-3.5a2.5 2.5 0 0 1 2.5-2.5V6Z" />
				</svg>
				<blockquote className="mt-6">
					<p className="text-dp-dark text-2xl leading-snug font-medium text-balance md:text-3xl md:leading-tight">
						&ldquo;{testimonial.quote}&rdquo;
					</p>
				</blockquote>
				<figcaption className="text-dp-body/70 mt-8 text-sm">
					<span className="text-dp-dark font-bold">{testimonial.name}</span>
					{' · '}
					{testimonial.title}, {testimonial.company}
				</figcaption>
			</figure>

			<p className="text-dp-body/60 mt-16 text-center text-xs font-bold tracking-widest uppercase">
				Trusted by businesses that ship
			</p>
			<ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
				{logos.map((label) => (
					<li
						key={label}
						className="border-dp-dark/10 text-dp-body/40 flex h-16 items-center justify-center rounded-xl border bg-white/40 text-sm"
					>
						{label}
					</li>
				))}
			</ul>
		</section>
	);
}
