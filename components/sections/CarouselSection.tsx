'use client';

import { useEffect, useState } from 'react';
import { Section } from './Section';
import { ButtonLink } from '@/components/ui/Button';
import type { CarouselSlide, CmsSection, MediaRef } from '@/helpers/cms/types';

type CarouselContent = {
	slides?: CarouselSlide[];
	carouselAutoPlay?: boolean;
	carouselInterval?: number;
	carouselShowDots?: boolean;
	carouselShowArrows?: boolean;
};

function imageRef(image: CarouselSlide['image']): MediaRef | null {
	if (!image) return null;
	if (typeof image === 'string') return { url: image };
	return image;
}

export function CarouselSection({ section }: { section: CmsSection }) {
	const c = section.content as CarouselContent | undefined;
	const slides = c?.slides ?? [];
	const showDots = c?.carouselShowDots ?? true;
	const showArrows = c?.carouselShowArrows ?? true;
	const autoPlay = c?.carouselAutoPlay ?? false;
	const intervalSeconds = Math.max(1, c?.carouselInterval ?? 5);

	const [active, setActive] = useState(0);

	useEffect(() => {
		if (!autoPlay || slides.length <= 1) return;
		const id = setInterval(() => {
			setActive((i) => (i + 1) % slides.length);
		}, intervalSeconds * 1000);
		return () => clearInterval(id);
	}, [autoPlay, intervalSeconds, slides.length]);

	if (slides.length === 0) return null;

	const go = (i: number) =>
		setActive(((i % slides.length) + slides.length) % slides.length);

	return (
		<Section settings={section.settings}>
			{(section.title || section.subtitle) && (
				<div className="mx-auto mb-10 max-w-4xl text-center">
					{section.title && <h2 className="text-balance">{section.title}</h2>}
					{section.subtitle && (
						<p className="text-dp-body/80 mt-4 text-balance">
							{section.subtitle}
						</p>
					)}
				</div>
			)}

			<div className="relative mx-auto max-w-5xl">
				<div className="dp-box-design relative aspect-[16/9] overflow-hidden rounded-3xl">
					{slides.map((slide, i) => {
						const img = imageRef(slide.image);
						const overlay = (slide.overlayOpacity ?? 40) / 100;
						return (
							<div
								key={i}
								aria-hidden={i !== active}
								className={`absolute inset-0 transition-opacity duration-700 ${
									i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
								}`}
							>
								{img?.url && (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={img.url}
										alt={img.alt ?? slide.title ?? ''}
										className="absolute inset-0 h-full w-full object-cover"
									/>
								)}
								<div
									aria-hidden
									className="bg-dp-dark absolute inset-0"
									style={{ opacity: overlay }}
								/>
								<div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
									{slide.title && (
										<h3 className="font-primary-font max-w-3xl text-2xl font-bold text-balance md:text-4xl">
											{slide.title}
										</h3>
									)}
									{slide.subtitle && (
										<p className="mt-4 max-w-2xl text-base text-balance md:text-lg">
											{slide.subtitle}
										</p>
									)}
									{slide.buttonLabel && slide.buttonUrl && (
										<div className="mt-8">
											<ButtonLink href={slide.buttonUrl}>
												{slide.buttonLabel}
											</ButtonLink>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>

				{showArrows && slides.length > 1 && (
					<>
						<button
							type="button"
							onClick={() => go(active - 1)}
							aria-label="Previous slide"
							className="text-dp-dark absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/80 p-2 transition hover:bg-white"
						>
							<svg
								aria-hidden
								className="h-5 w-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2.5}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
						</button>
						<button
							type="button"
							onClick={() => go(active + 1)}
							aria-label="Next slide"
							className="text-dp-dark absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/80 p-2 transition hover:bg-white"
						>
							<svg
								aria-hidden
								className="h-5 w-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2.5}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="m9 6 6 6-6 6" />
							</svg>
						</button>
					</>
				)}

				{showDots && slides.length > 1 && (
					<div className="mt-4 flex justify-center gap-2">
						{slides.map((_, i) => (
							<button
								key={i}
								type="button"
								onClick={() => go(i)}
								aria-label={`Go to slide ${i + 1}`}
								className={`h-2.5 w-2.5 rounded-full transition ${
									i === active ? 'bg-dp-dark-green' : 'bg-dp-dark/20'
								}`}
							/>
						))}
					</div>
				)}
			</div>
		</Section>
	);
}
