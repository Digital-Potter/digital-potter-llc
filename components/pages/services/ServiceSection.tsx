import type { ComponentType, SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonLink } from '@/components/ui/Button';

type ServiceSectionProps = {
	id: string;
	tag: string;
	headline: string;
	body: string;
	bullets: string[];
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	reverse?: boolean;
	badge?: string;
	ctaHref: string;
	ctaLabel: string;
};

export default function ServiceSection({
	id,
	tag,
	headline,
	body,
	bullets,
	icon: Icon,
	reverse,
	badge,
	ctaHref,
	ctaLabel,
}: ServiceSectionProps) {
	return (
		<section id={id} className="dp-container py-16 md:py-24">
			<div
				className={twMerge(
					'grid items-start gap-10 lg:grid-cols-2 lg:gap-16',
					reverse ? 'lg:[&>*:first-child]:order-2' : '',
				)}
			>
				<div>
					<div className="flex items-center gap-3">
						<span className="bg-dp-dark-green/10 text-dp-dark-green inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
							<Icon aria-hidden className="h-6 w-6" />
						</span>
						<div>
							<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
								{tag}
							</p>
							{badge ? (
								<span className="bg-dp-green text-dp-dark mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-bold tracking-wider uppercase">
									{badge}
								</span>
							) : null}
						</div>
					</div>
					<h2 className="mt-6 text-balance">{headline}</h2>
					<p className="text-dp-body-soft mt-6 text-base md:text-lg">{body}</p>
					<div className="mt-8">
						<ButtonLink href={ctaHref} variant="solid">
							{ctaLabel}
						</ButtonLink>
					</div>
				</div>

				<div className="border-dp-green/40 rounded-3xl border-2 bg-white/30 p-8 md:p-10">
					<p className="font-primary-font text-dp-dark text-xs font-bold tracking-widest uppercase">
						What&apos;s included
					</p>
					<ul className="mt-6 space-y-4">
						{bullets.map((b) => (
							<li
								key={b}
								className="text-dp-body/85 flex items-start gap-3 text-base font-medium"
							>
								<CheckIcon />
								<span>{b}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

function CheckIcon() {
	return (
		<svg
			aria-hidden
			className="fill-dp-green mt-1 h-5 w-5 shrink-0"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
		</svg>
	);
}
