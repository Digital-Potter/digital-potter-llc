import type { Metadata } from 'next';
import DiscoveryCallBooking from '@/components/pages/discovery-call/DiscoveryCallBooking';

export const metadata: Metadata = {
	title: 'Schedule a Discovery Call | Digital Potter',
	description:
		"Book a free 45-minute discovery call with Digital Potter. Tell us about your project and we'll craft a plan built for your business.",
};

export default function DiscoveryCallPage() {
	return (
		<main className="bg-dp-yellowish min-h-screen">
			<div className="dp-container py-16 md:py-24">
				<div className="mx-auto max-w-5xl">
					<div className="mb-10 text-center">
						<h1 className="text-dp-dark text-4xl font-bold md:text-5xl">
							Schedule a Discovery Call
						</h1>
						<p className="text-dp-dark/70 mx-auto mt-4 max-w-xl text-lg">
							45 minutes · Free · Video or phone call
						</p>
					</div>
					<DiscoveryCallBooking />
				</div>
			</div>
		</main>
	);
}
