import { ButtonLink } from '@/components/ui/Button';

export default function Home() {
	return (
		<section className="dp-container py-24 text-center">
			<h1 className="text-balance">Ready for Digital Potter</h1>
			<p className="mx-auto mt-6 max-w-2xl text-balance">
				Beautifully crafted web and mobile apps. Designed for clarity, delight,
				and results.
			</p>
			<div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<ButtonLink href="/services" variant="solid">
					Let&apos;s connect
				</ButtonLink>
				<ButtonLink href="/portfolio" variant="outlined">
					See our work
				</ButtonLink>
			</div>
		</section>
	);
}
