import Image from 'next/image';
import { Section } from './Section';
import type { CmsSection, MediaRef } from '@/helpers/cms/types';

type Testimonial = {
	quote: string;
	author?: string;
	role?: string;
	rating?: number;
	image?: MediaRef | string;
	source?: string;
};

type TestimonialsContent = {
	testimonials?: Testimonial[];
	/** Legacy field name. */
	items?: Testimonial[];
};

function imageRef(image: Testimonial['image']): MediaRef | null {
	if (!image) return null;
	if (typeof image === 'string') return { url: image };
	return image;
}

function Stars({ count }: { count: number }) {
	const filled = Math.max(0, Math.min(5, Math.round(count)));
	return (
		<div className="flex gap-0.5" aria-label={`${filled} out of 5 stars`}>
			{Array.from({ length: 5 }).map((_, i) => (
				<svg
					key={i}
					aria-hidden
					viewBox="0 0 20 20"
					className={
						i < filled ? 'fill-dp-green h-4 w-4' : 'fill-dp-body/15 h-4 w-4'
					}
				>
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
				</svg>
			))}
		</div>
	);
}

export function TestimonialsSection({ section }: { section: CmsSection }) {
	const c = section.content as TestimonialsContent | undefined;
	const items = c?.testimonials ?? c?.items ?? [];
	if (items.length === 0) return null;

	return (
		<Section settings={section.settings}>
			{section.title && (
				<div className="mx-auto mb-12 max-w-4xl text-center">
					<h2 className="text-balance">{section.title}</h2>
				</div>
			)}
			<ul className="grid gap-6 md:grid-cols-2">
				{items.map((t, i) => {
					const avatar = imageRef(t.image);
					return (
						<li
							key={i}
							className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8 md:p-10"
						>
							<svg
								aria-hidden
								className="text-dp-green h-8 w-8"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M9.5 6h-1A4.5 4.5 0 0 0 4 10.5V18h6v-7H6.5A2.5 2.5 0 0 1 9 8.5V6Zm10.5 0h-1a4.5 4.5 0 0 0-4.5 4.5V18h6v-7h-3.5a2.5 2.5 0 0 1 2.5-2.5V6Z" />
							</svg>
							{typeof t.rating === 'number' && (
								<div className="mt-4">
									<Stars count={t.rating} />
								</div>
							)}
							<p className="text-dp-dark mt-4 text-lg leading-snug font-medium md:text-xl md:leading-tight">
								&ldquo;{t.quote}&rdquo;
							</p>
							{(t.author || t.role || avatar) && (
								<div className="mt-6 flex items-center gap-3">
									{avatar?.url && (
										<div className="relative h-10 w-10 overflow-hidden rounded-full">
											<Image
												src={avatar.url}
												alt={avatar.alt ?? t.author ?? ''}
												fill
												sizes="40px"
												className="object-cover"
											/>
										</div>
									)}
									<div className="text-dp-body/70 text-sm">
										{t.author && (
											<div className="text-dp-dark font-bold">{t.author}</div>
										)}
										{t.role && <div className="text-xs">{t.role}</div>}
									</div>
								</div>
							)}
						</li>
					);
				})}
			</ul>
		</Section>
	);
}
