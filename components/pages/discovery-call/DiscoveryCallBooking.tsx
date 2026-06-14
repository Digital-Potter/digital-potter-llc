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
const DISCOVERY_CALL_DURATION_MINUTES = 45;

export default function DiscoveryCallBooking() {
	const [phase, setPhase] = useState<Phase>('picking');
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [selectedSlot, setSelectedSlot] = useState<SlotResult | null>(null);
	const [slots, setSlots] = useState<SlotResult[]>([]);
	const [timezone, setTimezone] = useState<string>(FALLBACK_TZ);
	const [loadingSlots, setLoadingSlots] = useState(false);
	const [slotsError, setSlotsError] = useState(false);
	const [confirmedSlot, setConfirmedSlot] = useState<SlotResult | null>(null);

	const timeSlotsRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!selectedDate) return;
		setSelectedSlot(null);
		setSlots([]);
		setSlotsError(false);
		setLoadingSlots(true);

		// Sequence guard: if the user switches dates quickly, ignore a slower
		// earlier response so stale slots from the previous date can't overwrite
		// the current one (which would let them book the wrong day).
		let cancelled = false;
		fetch(
			`/api/booking/availability?date=${selectedDate}&durationMinutes=${DISCOVERY_CALL_DURATION_MINUTES}`,
		)
			.then((r) => {
				if (!r.ok) throw new Error(`availability ${r.status}`);
				return r.json();
			})
			.then((data) => {
				if (cancelled) return;
				setSlots(data.slots ?? []);
				if (data.timezone) setTimezone(data.timezone);
			})
			.catch(() => {
				// Distinguish a real failure from genuine no-availability.
				if (!cancelled) setSlotsError(true);
			})
			.finally(() => {
				if (!cancelled) setLoadingSlots(false);
			});

		return () => {
			cancelled = true;
		};
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
		consentSMS: boolean;
		honeypot_url: string;
	}) {
		if (!selectedSlot) return;

		const res = await fetch('/api/booking', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				type: 'appointment',
				startsAt: selectedSlot.startsAt,
				durationMinutes: DISCOVERY_CALL_DURATION_MINUTES,
				timezone,
				service: { name: 'Discovery Call' },
				guest: { name: guest.name, email: guest.email, phone: guest.phone },
				customerNotes: guest.notes || undefined,
				consentSMS: guest.consentSMS,
				honeypot_url: guest.honeypot_url,
			}),
		});

		if (!res.ok) {
			// Both the local route and the CMS return errors under `error`.
			const data = (await res.json().catch(() => ({}))) as {
				error?: string;
				message?: string;
			};
			throw new Error(
				data.error ?? data.message ?? 'Booking failed. Please try again.',
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
						error={slotsError}
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
