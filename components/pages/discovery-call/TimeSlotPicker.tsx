'use client';

import { twMerge } from 'tailwind-merge';

interface SlotResult {
	startsAt: string;
	endsAt: string;
}

type Props = {
	slots: SlotResult[];
	loading: boolean;
	selectedSlot: SlotResult | null;
	onSlotSelect: (slot: SlotResult) => void;
	selectedDate: string | null;
	timezone: string;
};

function formatSlot(iso: string, timezone: string): string {
	return new Date(iso).toLocaleTimeString('en-US', {
		timeZone: timezone,
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

export default function TimeSlotPicker({
	slots,
	loading,
	selectedSlot,
	onSlotSelect,
	selectedDate,
	timezone,
}: Props) {
	if (!selectedDate) {
		return (
			<div className="text-dp-dark/50 flex h-40 items-center justify-center text-sm">
				← Select a date
			</div>
		);
	}

	if (loading) {
		return (
			<div className="flex flex-col gap-2">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="bg-dp-dark/10 h-10 animate-pulse rounded-full"
					/>
				))}
			</div>
		);
	}

	if (slots.length === 0) {
		return (
			<div className="text-dp-dark/50 flex h-40 items-center justify-center text-center text-sm">
				No availability on this date.
				<br />
				Try another day.
			</div>
		);
	}

	const abbr = tzAbbreviation(slots[0].startsAt, timezone);

	return (
		<div>
			<p className="font-primary-font text-dp-dark mb-3 text-xs font-bold tracking-wider uppercase">
				Available Times{' '}
				<span className="text-dp-dark/40 font-normal normal-case">
					({abbr})
				</span>
			</p>
			<div className="flex flex-col gap-2">
				{slots.map((slot) => {
					const isSelected = selectedSlot?.startsAt === slot.startsAt;
					return (
						<button
							key={slot.startsAt}
							onClick={() => onSlotSelect(slot)}
							className={twMerge(
								'cursor-pointer rounded-full border-2 px-4 py-2 text-center text-sm font-medium transition-colors',
								isSelected
									? 'bg-dp-dark-green border-dp-dark-green text-white'
									: 'border-dp-dark/20 text-dp-dark hover:border-dp-dark-green/50 bg-white/50',
							)}
						>
							{formatSlot(slot.startsAt, timezone)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
