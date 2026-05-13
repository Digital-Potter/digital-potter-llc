import { ButtonLink } from '@/components/ui/Button';

type FinalCtaProps = {
	href: string;
	label: string;
};

export default function FinalCta({ href, label }: FinalCtaProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="dp-box-design relative mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center md:px-16 md:py-20">
				<h2 className="text-balance">
					Ready to craft your digital masterpiece?
				</h2>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					Tell us about your business and the problem you&apos;re solving.
					We&apos;ll come back with a tailored proposal — no templates, no
					Frankenstein stack, just a plan built for you.
				</p>
				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<ButtonLink href={href} variant="solid">
						{label}
					</ButtonLink>
					<ButtonLink href="/discovery-call" variant="outlined">
						Schedule a Discovery Call
					</ButtonLink>
				</div>
			</div>
		</section>
	);
}
