'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import RightArrow from '@/components/icons/RightArrow';

type Testimonial = {
	quote: string;
	name: string;
	company: string;
	source: string;
};

// Real client testimonials migrated from digitalpotter.io.
// Customer wording is preserved; only the legacy company-name references
// (Plitz Corp / Plitz Corporation / Plitz Web Company) were updated to
// Digital Potter LLC per the rebrand.
const testimonials: Testimonial[] = [
	{
		quote:
			"Professional website and design. Norman knows what he is doing, what he says is true, he just don't take a template and added my info, he created my website as I wanted, and now my website is hosted with him and runs fast and smooth. Just recently started online reputation and I got 5 good reviews in the first week.",
		name: 'Louis Samaritano',
		company: 'Verity Electric Inc.',
		source: 'Alignable',
	},
	{
		quote:
			"The improved site, lauded internally and externally, is much easier for customers to use. Digital Potter LLC's responsiveness and understanding of digital technologies are hallmarks of their work. They also bring creative ideas of their own to the table at a reasonable value.",
		name: 'Laurie Blumstein',
		company: 'L&L Hair Products',
		source: 'Clutch',
	},
	{
		quote:
			'Outstanding professional service. Digital Potter LLC is kind and patient and delivers a beautiful website. Highly recommend.',
		name: 'Suzanne Chimera',
		company: 'Hair We Share',
		source: 'Facebook',
	},
	{
		quote:
			'Digital Potter LLC did a great job from initial contact to tutoring for running my web site. Norman very patient and creative. Great job!',
		name: 'Stephen Fellerman',
		company: 'Fellerman Glass',
		source: 'Bark',
	},
];

export default function SocialProof() {
	const [active, setActive] = useState(0);
	const current = testimonials[active];

	const goPrev = () =>
		setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
	const goNext = () => setActive((i) => (i + 1) % testimonials.length);

	return (
		<section className="dp-container py-16 md:py-24">
			<p className="text-dp-body/60 text-center text-xs font-bold tracking-widest uppercase">
				What our clients say
			</p>

			<figure className="mx-auto mt-6 max-w-4xl text-center">
				<svg
					aria-hidden
					className="text-dp-green mx-auto h-10 w-10"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M9.5 6h-1A4.5 4.5 0 0 0 4 10.5V18h6v-7H6.5A2.5 2.5 0 0 1 9 8.5V6Zm10.5 0h-1a4.5 4.5 0 0 0-4.5 4.5V18h6v-7h-3.5a2.5 2.5 0 0 1 2.5-2.5V6Z" />
				</svg>

				<blockquote className="mt-6 min-h-[12rem] md:min-h-[10rem]">
					<p className="text-dp-dark text-xl leading-snug font-medium text-balance md:text-2xl md:leading-normal">
						&ldquo;{current.quote}&rdquo;
					</p>
				</blockquote>

				<figcaption className="text-dp-body/70 mt-6 text-sm">
					<span className="text-dp-dark font-bold">{current.name}</span>
					{' · '}
					{current.company}
					<span className="text-dp-body/50 mx-2">|</span>
					<span className="text-xs">Source: {current.source}</span>
				</figcaption>
			</figure>

			<div className="mt-10 flex items-center justify-center gap-6">
				<button
					type="button"
					onClick={goPrev}
					aria-label="Previous testimonial"
					className="text-dp-dark hover:bg-dp-dark hover:text-dp-green border-dp-dark/30 hover:border-dp-dark inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors"
				>
					<RightArrow className="h-3 w-3 rotate-180 fill-current" />
				</button>

				<ul className="flex items-center gap-2">
					{testimonials.map((t, i) => (
						<li key={t.name}>
							<button
								type="button"
								onClick={() => setActive(i)}
								aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
								aria-current={i === active}
								className={twMerge(
									'block h-2.5 rounded-full transition-all',
									i === active
										? 'bg-dp-dark-green w-8'
										: 'bg-dp-dark/20 hover:bg-dp-dark/40 w-2.5',
								)}
							/>
						</li>
					))}
				</ul>

				<button
					type="button"
					onClick={goNext}
					aria-label="Next testimonial"
					className="text-dp-dark hover:bg-dp-dark hover:text-dp-green border-dp-dark/30 hover:border-dp-dark inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors"
				>
					<RightArrow className="h-3 w-3 fill-current" />
				</button>
			</div>
		</section>
	);
}
