'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { FieldShell, RadioGroup } from './fields';
import {
	expectedTrafficOptions,
	hostingBudgetOptions,
	hostingModelOptions,
	maintenanceOptions,
	paymentPreferenceOptions,
	stripeOptions,
	targetLaunchOptions,
	type QuoteFormData,
} from '@/lib/quoteSchema';

export default function StepBudget() {
	const {
		control,
		formState: { errors },
	} = useFormContext<QuoteFormData>();

	return (
		<div className="space-y-8">
			<FieldShell
				id="hostingBudget"
				label="Monthly budget — CMS hosting & management"
				error={errors.hostingBudget?.message}
			>
				<Controller
					control={control}
					name="hostingBudget"
					render={({ field }) => (
						<RadioGroup
							name="hostingBudget"
							options={hostingBudgetOptions}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</FieldShell>

			<FieldShell
				id="paymentPreference"
				label="Frontend build payment preference"
				error={errors.paymentPreference?.message}
			>
				<Controller
					control={control}
					name="paymentPreference"
					render={({ field }) => (
						<RadioGroup
							name="paymentPreference"
							options={paymentPreferenceOptions}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</FieldShell>

			<FieldShell
				id="maintenance"
				label="Frontend maintenance after launch"
				error={errors.maintenance?.message}
			>
				<Controller
					control={control}
					name="maintenance"
					render={({ field }) => (
						<RadioGroup
							name="maintenance"
							options={maintenanceOptions}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</FieldShell>

			<FieldShell
				id="hostingModel"
				label="CMS hosting model"
				error={errors.hostingModel?.message}
			>
				<Controller
					control={control}
					name="hostingModel"
					render={({ field }) => (
						<RadioGroup
							name="hostingModel"
							options={hostingModelOptions}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</FieldShell>

			<FieldShell
				id="expectedTraffic"
				label="Expected monthly visitors"
				error={errors.expectedTraffic?.message}
			>
				<Controller
					control={control}
					name="expectedTraffic"
					render={({ field }) => (
						<RadioGroup
							name="expectedTraffic"
							options={expectedTrafficOptions}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</FieldShell>

			<FieldShell
				id="needsStripe"
				label="Stripe payments needed?"
				error={errors.needsStripe?.message}
			>
				<Controller
					control={control}
					name="needsStripe"
					render={({ field }) => (
						<RadioGroup
							name="needsStripe"
							options={stripeOptions}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</FieldShell>

			<FieldShell
				id="targetLaunch"
				label="Target launch"
				error={errors.targetLaunch?.message}
			>
				<Controller
					control={control}
					name="targetLaunch"
					render={({ field }) => (
						<RadioGroup
							name="targetLaunch"
							options={targetLaunchOptions}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</FieldShell>
		</div>
	);
}
