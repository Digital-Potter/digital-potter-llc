import OutlinedButton from '@/components/ui/OutlinedButton';
import SolidButton from '@/components/ui/SolidButton';

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
			<main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
				<h1 className="text-center">Ready for Digital Potter</h1>
				<div className="flex w-full flex-col items-center gap-4 sm:items-center sm:justify-center md:flex-row">
					<OutlinedButton label="Button One" href="/" />
					<SolidButton label="Button Two" href="/" />
				</div>
			</main>
		</div>
	);
}
