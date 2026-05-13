'use client';

import { useState } from 'react';
import { FieldShell, TextField } from '@/components/pages/contact/fields';

interface SlotResult {
	startsAt: string;
	endsAt: string;
}

type Guest = { name: string; email: string; phone: string; notes: string };

type Props = {
	slot: SlotResult;
	timezone: string;
	onSubmit: (guest: Guest) => Promise<void>;
};

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

export default function BookingContactForm({
	slot,
	timezone,
	onSubmit,
}: Props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [notes, setNotes] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

	function validate(): Record<string, string> {
		const errs: Record<string, string> = {};
		if (!name.trim()) errs.name = 'Name is required';
		if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			errs.email = 'Valid email is required';
		if (!phone.trim()) errs.phone = 'Phone number is required';
		return errs;
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		const errs = validate();
		setFieldErrors(errs);
		if (Object.keys(errs).length > 0) return;

		setSubmitting(true);
		try {
			await onSubmit({
				name: name.trim(),
				email: email.trim(),
				phone: phone.trim(),
				notes: notes.trim(),
			});
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Something went wrong. Please try again.',
			);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div>
			<p className="text-dp-dark/70 mb-6 text-sm">
				Booking for{' '}
				<span className="text-dp-dark font-semibold">
					{formatSlot(slot.startsAt, timezone)}{' '}
					{tzAbbreviation(slot.startsAt, timezone)}
				</span>{' '}
				· 45 min
			</p>

			<form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
				<FieldShell id="dc-name" label="Your Name" error={fieldErrors.name}>
					<TextField
						id="dc-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Jane Smith"
						autoComplete="name"
					/>
				</FieldShell>

				<FieldShell id="dc-email" label="Email" error={fieldErrors.email}>
					<TextField
						id="dc-email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="jane@example.com"
						autoComplete="email"
					/>
				</FieldShell>

				<FieldShell id="dc-phone" label="Phone" error={fieldErrors.phone}>
					<TextField
						id="dc-phone"
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="+1 (555) 000-0000"
						autoComplete="tel"
					/>
				</FieldShell>

				<FieldShell
					id="dc-notes"
					label="Anything we should know?"
					hint="Optional"
				>
					<TextField
						id="dc-notes"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						placeholder="Brief description of your project…"
					/>
				</FieldShell>

				{error && (
					<p className="text-sm text-red-700 sm:col-span-2" role="alert">
						{error}
					</p>
				)}

				<div className="sm:col-span-2">
					<button
						type="submit"
						disabled={submitting}
						className="bg-dp-green text-dp-dark hover:bg-dp-dark hover:text-dp-green rounded-dp-20 inline-flex items-center gap-2 px-9 py-4 text-base font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
					>
						{submitting ? 'Booking…' : 'Book My Discovery Call'}
					</button>
				</div>
			</form>
		</div>
	);
}
