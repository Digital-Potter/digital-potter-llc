'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { FieldShell, RadioGroup } from './fields';
import {
	expectedTrafficOptions,
	hostingBudgetOptions,
	hostingModelOptions,
	maintenanceOptions,
	mobileBudgetOptions,
	paymentPreferenceOptions,
	paymentsNeededOptions,
	targetLaunchOptions,
	websiteBudgetOptions,
	type QuoteFormData,
} from '@/lib/quoteSchema';

export default function StepBudget() {
	const {
		control,
		formState: { errors },
	} = useFormContext<QuoteFormData>();
	const needType = useWatch({ control, name: 'needType' });
	const needsWeb =
		needType === 'Website only' || needType === 'Website AND mobile app';
	const needsApp =
		needType === 'Mobile app only' || needType === 'Website AND mobile app';

	return (
		<div className="space-y-8">
			{needsWeb && (
				<>
					<FieldShell
						id="websiteBudget"
						label="Website build — one-time investment range"
						error={errors.websiteBudget?.message}
						hint="Custom builds start at $1,900. Your proposal pins an exact number before you commit."
					>
						<Controller
							control={control}
							name="websiteBudget"
							render={({ field }) => (
								<RadioGroup
									name="websiteBudget"
									options={websiteBudgetOptions}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</FieldShell>

					<FieldShell
						id="hostingBudget"
						label="Monthly budget — hosting, CMS & care"
						error={errors.hostingBudget?.message}
						hint="Hosting + theDavid CMS is $24.99/mo flat. Modules and maintenance retainers stack on top."
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
				</>
			)}

			{needsApp && (
				<FieldShell
					id="mobileBudget"
					label="Mobile app — initial investment range"
					error={errors.mobileBudget?.message}
					hint="Custom mobile apps start at $12,500. Pick the range that lines up with how you're thinking about it."
				>
					<Controller
						control={control}
						name="mobileBudget"
						render={({ field }) => (
							<RadioGroup
								name="mobileBudget"
								options={mobileBudgetOptions}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</FieldShell>
			)}

			<FieldShell
				id="paymentPreference"
				label="Build payment preference"
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
				label="Maintenance & support after launch"
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

			{needsWeb && (
				<>
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
				</>
			)}

			<FieldShell
				id="paymentsNeeded"
				label="Will you need payment processing?"
				error={errors.paymentsNeeded?.message}
				hint="Stripe powers checkout for both website ecommerce and in-app purchases. Connects to your own Stripe account."
			>
				<Controller
					control={control}
					name="paymentsNeeded"
					render={({ field }) => (
						<RadioGroup
							name="paymentsNeeded"
							options={paymentsNeededOptions}
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
