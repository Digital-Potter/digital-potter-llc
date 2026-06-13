import Link from 'next/link';

export default function InlinePostCta() {
	return (
		<aside className="dp-container py-8">
			<div className="border-dp-dark-green/20 bg-dp-dark-green/5 mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border px-6 py-5 text-center sm:flex-row sm:text-left">
				<p className="text-dp-dark font-primary-font text-base font-bold">
					Wondering what <em>your</em> project would cost?
					<span className="text-dp-body-soft font-secondary-font block text-sm font-normal">
						Free 45-minute call — you get a number on the call, not after three
						follow-up emails.
					</span>
				</p>
				<Link
					href="/discovery-call"
					className="text-dp-dark-green hover:text-dp-green font-primary-font shrink-0 text-sm font-bold tracking-wider uppercase"
				>
					Book a discovery call →
				</Link>
			</div>
		</aside>
	);
}
