import Link from 'next/link';

interface SlotResult {
	startsAt: string;
	endsAt: string;
}

type Props = { slot: SlotResult };

function formatSlot(iso: string): string {
	return new Date(iso).toLocaleString('en-US', {
		timeZone: 'America/Chicago',
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	});
}

export default function BookingConfirmation({ slot }: Props) {
	return (
		<div className="dp-box-design rounded-3xl px-8 py-16 text-center">
			<div className="bg-dp-green mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold">
				✓
			</div>
			<h2 className="text-dp-dark">You&apos;re on the calendar!</h2>
			<p className="text-dp-dark/70 mx-auto mt-4 max-w-md">
				We&apos;ll confirm your call for{' '}
				<strong className="text-dp-dark">
					{formatSlot(slot.startsAt)} CST
				</strong>{' '}
				within a few hours. Check your inbox for a confirmation email once
				it&apos;s locked in.
			</p>
			<Link
				href="/"
				className="text-dp-dark-green mt-8 inline-block font-semibold underline underline-offset-2"
			>
				← Back to home
			</Link>
		</div>
	);
}
