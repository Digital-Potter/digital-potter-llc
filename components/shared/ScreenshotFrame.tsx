import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type ScreenshotFrameProps = {
	src?: string;
	alt: string;
	caption?: string;
	placeholderLabel?: string;
	tilt?: 'left' | 'right' | 'none';
	className?: string;
	/** Intrinsic source dimensions; used by next/image to compute srcset and aspect. */
	width?: number;
	height?: number;
	/** When true, sets `priority` on the underlying Image (above-the-fold hero use). */
	priority?: boolean;
};

/**
 * Wraps a CMS screenshot in a stylized "browser frame". When `src` is missing,
 * renders a brand-tinted gradient placeholder labeled with `placeholderLabel`.
 *
 * Real screenshots live in /public/cms/. Pass the absolute `src` to swap
 * the placeholder for the real image. The placeholder keeps the page
 * presentable when an image is missing.
 */
export default function ScreenshotFrame({
	src,
	alt,
	caption,
	placeholderLabel,
	tilt = 'none',
	className,
	width = 1600,
	height = 1200,
	priority = false,
}: ScreenshotFrameProps) {
	const tiltClass =
		tilt === 'left' ? '-rotate-1' : tilt === 'right' ? 'rotate-1' : '';

	return (
		<figure className={twMerge('relative', className)}>
			<div
				className={twMerge(
					'dp-box-design relative w-full overflow-hidden rounded-2xl transition-transform',
					tiltClass,
				)}
			>
				{/* Browser chrome */}
				<div className="bg-dp-light-gray/50 flex h-9 items-center gap-2 px-4">
					<span className="bg-dp-dark/30 h-2.5 w-2.5 rounded-full" />
					<span className="bg-dp-dark/20 h-2.5 w-2.5 rounded-full" />
					<span className="bg-dp-dark/15 h-2.5 w-2.5 rounded-full" />
				</div>
				{src ? (
					<Image
						src={src}
						alt={alt}
						width={width}
						height={height}
						sizes="(min-width: 1024px) 64rem, 100vw"
						priority={priority}
						className="block h-auto w-full"
					/>
				) : (
					<div className="from-dp-green/15 via-dp-yellowish to-dp-dark-green/10 relative aspect-[4/3] w-full bg-gradient-to-br">
						<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-8 text-center">
							<svg
								aria-hidden
								className="text-dp-dark-green/40 h-10 w-10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={1.5}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="3" y="3" width="18" height="18" rx="2" />
								<circle cx="9" cy="9" r="2" />
								<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
							</svg>
							<p className="text-dp-body-soft font-primary-font text-xs font-bold tracking-widest uppercase">
								{placeholderLabel ?? 'Screenshot'}
							</p>
							<p className="text-dp-body-soft text-sm">{alt}</p>
						</div>
					</div>
				)}
			</div>
			{caption && (
				<figcaption className="text-dp-body-soft mt-4 text-center text-sm">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
