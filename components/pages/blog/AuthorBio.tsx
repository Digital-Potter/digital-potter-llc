import Link from 'next/link';

export default function AuthorBio() {
	return (
		<section className="dp-container py-8">
			<div className="border-dp-dark/10 mx-auto flex max-w-3xl items-center gap-5 rounded-2xl border bg-white/50 px-6 py-6">
				<span
					aria-hidden
					className="bg-dp-dark-green font-primary-font flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
				>
					N
				</span>
				<div>
					<p className="font-primary-font text-dp-dark font-bold">
						Written by Norman Pleitez
					</p>
					<p className="text-dp-body-soft mt-1 text-sm">
						Founder of Digital Potter — building custom websites and apps for
						20+ years, and theDavid, the CMS behind every site we ship.{' '}
						<Link
							href="/discovery-call"
							className="text-dp-dark-green hover:text-dp-green font-bold"
						>
							Talk to Norman →
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
