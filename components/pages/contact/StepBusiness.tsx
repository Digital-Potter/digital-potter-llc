'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { FieldShell, RadioGroup, SelectField, TextField } from './fields';
import {
	bestContactOptions,
	companySizeOptions,
	type QuoteFormData,
} from '@/lib/quoteSchema';

export default function StepBusiness() {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<QuoteFormData>();

	return (
		<div className="space-y-8">
			<div className="grid gap-8 md:grid-cols-2">
				<FieldShell
					id="businessName"
					label="Business name"
					error={errors.businessName?.message}
				>
					<TextField
						id="businessName"
						placeholder="e.g. Bistro 22"
						{...register('businessName')}
					/>
				</FieldShell>

				<FieldShell
					id="industry"
					label="Industry / business type"
					error={errors.industry?.message}
				>
					<TextField
						id="industry"
						placeholder="e.g. Restaurant, SaaS, Retail"
						{...register('industry')}
					/>
				</FieldShell>

				<FieldShell
					id="location"
					label="City & country"
					error={errors.location?.message}
				>
					<TextField
						id="location"
						placeholder="e.g. Arlington, VA, USA"
						{...register('location')}
					/>
				</FieldShell>

				<FieldShell
					id="companySize"
					label="Approx. company size"
					error={errors.companySize?.message}
				>
					<Controller
						control={control}
						name="companySize"
						render={({ field }) => (
							<SelectField
								id="companySize"
								options={companySizeOptions}
								value={field.value ?? ''}
								onChange={(e) => field.onChange(e.target.value)}
							/>
						)}
					/>
				</FieldShell>
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				<FieldShell
					id="yourName"
					label="Your name"
					error={errors.yourName?.message}
				>
					<TextField
						id="yourName"
						placeholder="First and last"
						autoComplete="name"
						{...register('yourName')}
					/>
				</FieldShell>

				<FieldShell id="email" label="Email" error={errors.email?.message}>
					<TextField
						id="email"
						type="email"
						placeholder="you@business.com"
						autoComplete="email"
						{...register('email')}
					/>
				</FieldShell>

				<FieldShell id="phone" label="Phone" error={errors.phone?.message}>
					<TextField
						id="phone"
						type="tel"
						placeholder="+1 555 123 4567"
						autoComplete="tel"
						{...register('phone')}
					/>
				</FieldShell>

				<FieldShell
					id="bestContact"
					label="Best way to reach you"
					error={errors.bestContact?.message}
				>
					<Controller
						control={control}
						name="bestContact"
						render={({ field }) => (
							<RadioGroup
								name="bestContact"
								options={bestContactOptions}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</FieldShell>
			</div>

			{/* Honeypot — hidden from humans, kept off the tab order. Bots tend to fill it. */}
			<div aria-hidden className="hidden">
				<label htmlFor="website">Your website (leave blank)</label>
				<input
					id="website"
					type="text"
					tabIndex={-1}
					autoComplete="off"
					{...register('website')}
				/>
			</div>
		</div>
	);
}
