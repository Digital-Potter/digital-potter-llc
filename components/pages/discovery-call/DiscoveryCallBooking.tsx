'use client';

import { useState, useEffect, useRef } from 'react';
import MonthCalendar from './MonthCalendar';
import TimeSlotPicker from './TimeSlotPicker';
import BookingContactForm from './BookingContactForm';
import BookingConfirmation from './BookingConfirmation';

interface SlotResult {
	startsAt: string;
	endsAt: string;
}

type Phase = 'picking' | 'confirmed';

const FALLBACK_TZ = 'America/New_York';

export default function DiscoveryCallBooking() {
	const [phase, setPhase] = useState<Phase>('picking');
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [selectedSlot, setSelectedSlot] = useState<SlotResult | null>(null);
	const [slots, setSlots] = useState<SlotResult[]>([]);
	const [timezone, setTimezone] = useState<string>(FALLBACK_TZ);
	const [loadingSlots, setLoadingSlots] = useState(false);
	const [confirmedSlot, setConfirmedSlot] = useState<SlotResult | null>(null);

	const timeSlotsRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!selectedDate) return;
		setSelectedSlot(null);
		setSlots([]);
		setLoadingSlots(true);

		fetch(`/api/booking/availability?date=${selectedDate}&durationMinutes=45`)
			.then((r) => r.json())
			.then((data) => {
				setSlots(data.slots ?? []);
				if (data.timezone) setTimezone(data.timezone);
			})
			.catch(() => setSlots([]))
			.finally(() => setLoadingSlots(false));
	}, [selectedDate]);

	// Bring slot picker into view after a date is chosen. `block: 'nearest'`
	// means desktop side-by-side stays put (picker is already in view) while
	// stacked mobile/narrow-laptop layouts scroll it up.
	useEffect(() => {
		if (!selectedDate) return;
		timeSlotsRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});
	}, [selectedDate]);

	// The form mounts only when a slot is picked, so the ref is available
	// inside this effect once React commits the new render.
	useEffect(() => {
		if (!selectedSlot) return;
		formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [selectedSlot]);

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
				timezone,
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
		return <BookingConfirmation slot={confirmedSlot} timezone={timezone} />;
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
				<div ref={timeSlotsRef} className="scroll-mt-28">
					<TimeSlotPicker
						slots={slots}
						loading={loadingSlots}
						selectedSlot={selectedSlot}
						onSlotSelect={setSelectedSlot}
						selectedDate={selectedDate}
						timezone={timezone}
					/>
				</div>
			</div>

			{selectedSlot && (
				<div
					ref={formRef}
					className="border-dp-dark/10 mt-8 scroll-mt-28 border-t pt-8"
				>
					<BookingContactForm
						slot={selectedSlot}
						timezone={timezone}
						onSubmit={handleSubmit}
					/>
				</div>
			)}
		</div>
	);
}
