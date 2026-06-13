import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import ScreenshotFrame from './ScreenshotFrame';

type FeatureBlockProps = {
	tag: string;
	headline: string;
	body: string;
	bullets: string[];
	screenshotSrc?: string;
	screenshotAlt: string;
	screenshotPlaceholder?: string;
	reverse?: boolean;
	linkHref?: string;
	linkLabel?: string;
};

export default function FeatureBlock({
	tag,
	headline,
	body,
	bullets,
	screenshotSrc,
	screenshotAlt,
	screenshotPlaceholder,
	reverse,
	linkHref,
	linkLabel,
}: FeatureBlockProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div
				className={twMerge(
					'grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
					reverse ? 'lg:[&>*:first-child]:order-2' : '',
				)}
			>
				<div>
					<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
						{tag}
					</p>
					<h2 className="mt-6 text-balance">{headline}</h2>
					<p className="text-dp-body-soft mt-6 text-base md:text-lg">{body}</p>
					<ul className="mt-8 space-y-3">
						{bullets.map((b) => (
							<li
								key={b}
								className="text-dp-body/85 flex items-start gap-3 text-base"
							>
								<svg
									aria-hidden
									className="fill-dp-green mt-1 h-5 w-5 shrink-0"
									viewBox="0 0 20 20"
								>
									<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
								</svg>
								<span>{b}</span>
							</li>
						))}
					</ul>
					{linkHref && linkLabel && (
						<p className="mt-7">
							<Link
								href={linkHref}
								className="text-dp-dark-green hover:text-dp-green font-primary-font text-sm font-bold tracking-wide uppercase"
							>
								{linkLabel} →
							</Link>
						</p>
					)}
				</div>

				<div className="relative">
					<div
						aria-hidden
						className="from-dp-green/15 to-dp-dark-green/10 absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br blur-xl"
					/>
					<ScreenshotFrame
						src={screenshotSrc}
						alt={screenshotAlt}
						placeholderLabel={screenshotPlaceholder}
						tilt={reverse ? 'left' : 'right'}
					/>
				</div>
			</div>
		</section>
	);
}
