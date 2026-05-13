import Link from 'next/link';

interface SlotResult {
	startsAt: string;
	endsAt: string;
}

type Props = { slot: SlotResult; timezone: string };

function formatSlot(iso: string, timezone: string): string {
	return new Date(iso).toLocaleString('en-US', {
		timeZone: timezone,
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	});
}

function tzAbbreviation(iso: string, timezone: string): string {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: timezone,
		timeZoneName: 'short',
	}).formatToParts(new Date(iso));
	return parts.find((p) => p.type === 'timeZoneName')?.value ?? timezone;
}

export default function BookingConfirmation({ slot, timezone }: Props) {
	const abbr = tzAbbreviation(slot.startsAt, timezone);
	return (
		<div className="dp-box-design rounded-3xl px-8 py-16 text-center">
			<div className="bg-dp-green mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold">
				✓
			</div>
			<h2 className="text-dp-dark">You&apos;re on the calendar!</h2>
			<p className="text-dp-dark/70 mx-auto mt-4 max-w-md">
				We&apos;ll confirm your call for{' '}
				<strong className="text-dp-dark">
					{formatSlot(slot.startsAt, timezone)} {abbr}
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
