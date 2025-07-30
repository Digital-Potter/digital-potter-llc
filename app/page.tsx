import OutlinedButton from '@/components/ui/OutlinedButton';
import SolidButton from '@/components/ui/SolidButton';
import Image from 'next/image';

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1 className="text-center">Ready for Digital Potter</h1>
				<div className="flex flex-col md:flex-row items-center sm:justify-center sm:items-center w-full gap-4">
					<OutlinedButton label="Button One" href="/" />
					<SolidButton label="Button Two" href="/" />
				</div>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://digitalpotter.io"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Digital Potter, LLC →
				</a>
			</footer>
		</div>
	);
}
