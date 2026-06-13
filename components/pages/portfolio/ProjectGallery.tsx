'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import RightArrow from '@/components/icons/RightArrow';
import CloseEx from '@/components/icons/CloseEx';

type GalleryImage = { url: string; alt?: string };

type ProjectGalleryProps = {
	images: GalleryImage[];
	title?: string;
};

const PER_PAGE = 3;

function chunk<T>(arr: T[], size: number): T[][] {
	const out: T[][] = [];
	for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
	return out;
}

/**
 * Gallery cell that handles mixed aspect ratios: the image is shown WHOLE
 * (object-contain) on top of a blurred, dimmed copy of itself, so portrait
 * phone shots and wide desktop shots share uniform cells without cropping.
 */
function GalleryCell({
	img,
	onOpen,
	sizes,
}: {
	img: GalleryImage;
	onOpen: () => void;
	sizes: string;
}) {
	return (
		<button
			type="button"
			onClick={onOpen}
			aria-label={`View image full size${img.alt ? `: ${img.alt}` : ''}`}
			className="dp-box-design group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl"
		>
			{/* Blurred backdrop fills the cell so contained images never look boxed */}
			<Image
				src={img.url}
				alt=""
				aria-hidden
				fill
				sizes={sizes}
				className="scale-110 object-cover opacity-40 blur-xl"
			/>
			<Image
				src={img.url}
				alt={img.alt ?? ''}
				fill
				sizes={sizes}
				className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
			/>
			<span className="bg-dp-dark/0 group-hover:bg-dp-dark/10 absolute inset-0 transition-colors" />
		</button>
	);
}

function Lightbox({
	images,
	index,
	onClose,
	onNavigate,
}: {
	images: GalleryImage[];
	index: number;
	onClose: () => void;
	onNavigate: (next: number) => void;
}) {
	const count = images.length;
	const img = images[index];

	const goPrev = useCallback(
		() => onNavigate((index - 1 + count) % count),
		[index, count, onNavigate],
	);
	const goNext = useCallback(
		() => onNavigate((index + 1) % count),
		[index, count, onNavigate],
	);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowLeft' && count > 1) goPrev();
			if (e.key === 'ArrowRight' && count > 1) goNext();
		};
		window.addEventListener('keydown', onKey);
		// Lock page scroll while the lightbox is open.
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			window.removeEventListener('keydown', onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [onClose, goPrev, goNext, count]);

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label={img.alt || 'Image preview'}
			className="bg-dp-dark/70 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
			onClick={onClose}
		>
			{/* The image itself — no box, no chrome, just the expanded picture */}
			<div
				className="relative h-[88vh] w-[92vw]"
				onClick={(e) => e.stopPropagation()}
			>
				<Image
					src={img.url}
					alt={img.alt ?? ''}
					fill
					sizes="92vw"
					quality={90}
					className="cursor-zoom-out object-contain drop-shadow-2xl"
					onClick={onClose}
				/>
			</div>

			<button
				type="button"
				onClick={onClose}
				aria-label="Close image preview"
				className="text-dp-yellowish/90 absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/30 transition-colors hover:bg-black/50"
			>
				<CloseEx className="h-5 w-5 fill-current" />
			</button>

			{count > 1 && (
				<>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							goPrev();
						}}
						aria-label="Previous image"
						className="text-dp-yellowish/90 absolute left-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/30 transition-colors hover:bg-black/50"
					>
						<RightArrow className="h-4 w-4 rotate-180 fill-current" />
					</button>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							goNext();
						}}
						aria-label="Next image"
						className="text-dp-yellowish/90 absolute right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/30 transition-colors hover:bg-black/50"
					>
						<RightArrow className="h-4 w-4 fill-current" />
					</button>
					<p className="text-dp-yellowish/80 absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/30 px-4 py-1 text-sm">
						{index + 1} / {count}
					</p>
				</>
			)}
		</div>
	);
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
	const [page, setPage] = useState(0);
	const [lightbox, setLightbox] = useState<number | null>(null);
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
										<li key={`${img.url}-${i}`}>
											<GalleryCell
												img={img}
												sizes="(min-width: 768px) 33vw, 100vw"
												onOpen={() => setLightbox(p * PER_PAGE + i)}
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
						<li key={`${img.url}-${i}`}>
							<GalleryCell
								img={img}
								sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
								onOpen={() => setLightbox(i)}
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

			{lightbox !== null && (
				<Lightbox
					images={images}
					index={lightbox}
					onClose={() => setLightbox(null)}
					onNavigate={setLightbox}
				/>
			)}
		</section>
	);
}
