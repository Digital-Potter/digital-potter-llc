'use client';

import { useState, useEffect } from 'react';
import MonthCalendar from './MonthCalendar';
import TimeSlotPicker from './TimeSlotPicker';
import BookingContactForm from './BookingContactForm';
import BookingConfirmation from './BookingConfirmation';

interface SlotResult {
	startsAt: string;
	endsAt: string;
}

type Phase = 'picking' | 'confirmed';

export default function DiscoveryCallBooking() {
	const [phase, setPhase] = useState<Phase>('picking');
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [selectedSlot, setSelectedSlot] = useState<SlotResult | null>(null);
	const [slots, setSlots] = useState<SlotResult[]>([]);
	const [loadingSlots, setLoadingSlots] = useState(false);
	const [confirmedSlot, setConfirmedSlot] = useState<SlotResult | null>(null);

	useEffect(() => {
		if (!selectedDate) return;
		setSelectedSlot(null);
		setSlots([]);
		setLoadingSlots(true);

		fetch(`/api/booking/availability?date=${selectedDate}&durationMinutes=45`)
			.then((r) => r.json())
			.then((data) => setSlots(data.slots ?? []))
			.catch(() => setSlots([]))
			.finally(() => setLoadingSlots(false));
	}, [selectedDate]);

	async function handleSubmit(guest: {
		name: string;
		email: string;
		phone: string;
		notes: string;
	}) {
		if (!selectedSlot) return;

		const res = await fetch('/api/booking', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				type: 'appointment',
				startsAt: selectedSlot.startsAt,
				durationMinutes: 45,
				timezone: 'America/Chicago',
				service: { name: 'Discovery Call' },
				guest: { name: guest.name, email: guest.email, phone: guest.phone },
				customerNotes: guest.notes || undefined,
			}),
		});

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			throw new Error(
				(data as { message?: string }).message ??
					'Booking failed. Please try again.',
			);
		}

		setConfirmedSlot(selectedSlot);
		setPhase('confirmed');
	}

	if (phase === 'confirmed' && confirmedSlot) {
		return <BookingConfirmation slot={confirmedSlot} />;
	}

	return (
		<div className="dp-box-design rounded-3xl p-6 md:p-10">
			<div className="grid gap-8 lg:grid-cols-[1fr_16rem]">
				<MonthCalendar
					selectedDate={selectedDate}
					onDateSelect={(d) => {
						setSelectedDate(d);
					}}
				/>
				<TimeSlotPicker
					slots={slots}
					loading={loadingSlots}
					selectedSlot={selectedSlot}
					onSlotSelect={setSelectedSlot}
					selectedDate={selectedDate}
				/>
			</div>

			{selectedSlot && (
				<div className="border-dp-dark/10 mt-8 border-t pt-8">
					<BookingContactForm slot={selectedSlot} onSubmit={handleSubmit} />
				</div>
			)}
		</div>
	);
}
