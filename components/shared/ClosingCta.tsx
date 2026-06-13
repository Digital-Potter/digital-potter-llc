import { ButtonLink } from '@/components/ui/Button';

type ClosingCtaProps = {
	eyebrow?: string;
	heading?: string;
	body?: string;
	primaryHref?: string;
	primaryLabel?: string;
	secondaryHref?: string;
	secondaryLabel?: string;
};

/**
 * The site-wide closing CTA. Message hierarchy is fixed on purpose:
 * the discovery call is always the primary action; pages supply a
 * contextual secondary action and page-specific heading/body.
 */
export default function ClosingCta({
	eyebrow,
	heading = 'Ready to craft your digital masterpiece?',
	body = "Tell us about your business on a free 45-minute discovery call. You'll leave with a clear plan and an honest price — whether or not you hire us. No templates, no Frankenstein stack, no pressure.",
	primaryHref = '/discovery-call',
	primaryLabel = 'Book a Free Discovery Call',
	secondaryHref,
	secondaryLabel,
}: ClosingCtaProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="dp-box-design relative mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center md:px-16 md:py-20">
				{eyebrow && (
					<p className="text-dp-dark-green font-primary-font mb-4 text-xs font-bold tracking-widest uppercase">
						{eyebrow}
					</p>
				)}
				<h2 className="text-balance">{heading}</h2>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					{body}
				</p>
				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<ButtonLink href={primaryHref} variant="solid">
						{primaryLabel}
					</ButtonLink>
					{secondaryHref && secondaryLabel && (
						<ButtonLink href={secondaryHref} variant="outlined">
							{secondaryLabel}
						</ButtonLink>
					)}
				</div>
			</div>
		</section>
	);
}
