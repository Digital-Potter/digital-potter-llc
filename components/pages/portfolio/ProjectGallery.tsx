'use client';

import { useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import RightArrow from '@/components/icons/RightArrow';

type ProjectGalleryProps = {
	images: { url: string; alt?: string }[];
	title?: string;
};

const PER_PAGE = 3;

function chunk<T>(arr: T[], size: number): T[][] {
	const out: T[][] = [];
	for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
	return out;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
	const [page, setPage] = useState(0);
	if (!images || images.length === 0) return null;

	const pages = chunk(images, PER_PAGE);
	const pageCount = pages.length;
	const showControls = images.length > PER_PAGE;

	const goPrev = () => setPage((p) => (p - 1 + pageCount) % pageCount);
	const goNext = () => setPage((p) => (p + 1) % pageCount);

	return (
		<section className="dp-container py-12 md:py-16">
			{title && (
				<div className="mx-auto mb-10 max-w-4xl text-center">
					<h2 className="text-balance">{title}</h2>
				</div>
			)}

			{showControls ? (
				<div className="overflow-hidden">
					<ul
						className="flex transition-transform duration-500 ease-out"
						style={{
							width: `${pageCount * 100}%`,
							transform: `translateX(-${(page * 100) / pageCount}%)`,
						}}
					>
						{pages.map((pg, p) => (
							<li
								key={p}
								className="shrink-0"
								style={{ width: `${100 / pageCount}%` }}
								aria-hidden={p !== page}
							>
								<ul className="grid grid-cols-3 gap-4">
									{pg.map((img, i) => (
										<li
											key={`${img.url}-${i}`}
											className="dp-box-design relative aspect-[4/3] overflow-hidden rounded-2xl"
										>
											<Image
												src={img.url}
												alt={img.alt ?? ''}
												fill
												sizes="(min-width: 768px) 33vw, 100vw"
												className="object-cover transition-transform duration-500 hover:scale-105"
											/>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			) : (
				<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{images.map((img, i) => (
						<li
							key={`${img.url}-${i}`}
							className="dp-box-design relative aspect-[4/3] overflow-hidden rounded-2xl"
						>
							<Image
								src={img.url}
								alt={img.alt ?? ''}
								fill
								sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
								className="object-cover transition-transform duration-500 hover:scale-105"
							/>
						</li>
					))}
				</ul>
			)}

			{showControls && (
				<div className="mt-10 flex items-center justify-center gap-6">
					<button
						type="button"
						onClick={goPrev}
						aria-label="Previous gallery page"
						className="text-dp-dark hover:bg-dp-dark hover:text-dp-green border-dp-dark/30 hover:border-dp-dark inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors"
					>
						<RightArrow className="h-3 w-3 rotate-180 fill-current" />
					</button>

					<ul className="flex items-center gap-2">
						{pages.map((_, i) => (
							<li key={i}>
								<button
									type="button"
									onClick={() => setPage(i)}
									aria-label={`Show gallery page ${i + 1} of ${pageCount}`}
									aria-current={i === page}
									className={twMerge(
										'block h-2.5 rounded-full transition-all',
										i === page
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
						aria-label="Next gallery page"
						className="text-dp-dark hover:bg-dp-dark hover:text-dp-green border-dp-dark/30 hover:border-dp-dark inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors"
					>
						<RightArrow className="h-3 w-3 fill-current" />
					</button>
				</div>
			)}
		</section>
	);
}
