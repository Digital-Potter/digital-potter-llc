import Link from 'next/link';

type ThankYouPanelProps = {
	name?: string;
};

export default function ThankYouPanel({ name }: ThankYouPanelProps) {
	return (
		<div className="dp-box-design relative mx-auto max-w-3xl rounded-3xl px-8 py-16 text-center md:px-16 md:py-20">
			<svg
				aria-hidden
				className="text-dp-dark-green mx-auto h-16 w-16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<path d="m9 12 2 2 4-4" />
			</svg>
			<h2 className="mt-6 text-balance">
				{name ? `Thanks, ${name}.` : 'Thank you.'}
			</h2>
			<p className="text-dp-body/80 mx-auto mt-6 max-w-xl text-balance">
				We&apos;ve got your message. A real human from the studio will reach out
				within one business day with the next step. In the meantime, feel free
				to look around.
			</p>
			<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
				<Link
					href="/"
					className="font-primary-font bg-dp-green text-dp-dark hover:bg-dp-dark hover:text-dp-green border-dp-green hover:border-dp-dark rounded-dp-20 inline-flex items-center border-2 px-6 py-3 text-sm font-bold uppercase shadow-2xl transition-all"
				>
					Back to home
				</Link>
				<Link
					href="/portfolio"
					className="font-primary-font text-dp-dark-green hover:text-dp-green text-sm font-bold tracking-wider uppercase"
				>
					See our work →
				</Link>
			</div>
		</div>
	);
}
