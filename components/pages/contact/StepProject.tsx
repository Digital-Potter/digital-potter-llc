'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ChipGroup, FieldShell, RadioGroup } from './fields';
import {
	appStoreAccountsOptions,
	appTypeOptions,
	domainOptions,
	mobileFeatureOptions,
	needTypeOptions,
	replacingSiteOptions,
	websiteFeatureOptions,
	websiteTypeOptions,
	type QuoteFormData,
} from '@/lib/quoteSchema';

export default function StepProject() {
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
			<FieldShell
				id="needType"
				label="What are you looking to build?"
				error={errors.needType?.message}
				hint="The questions below adapt based on this answer."
			>
				<Controller
					control={control}
					name="needType"
					render={({ field }) => (
						<RadioGroup
							name="needType"
							options={needTypeOptions}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</FieldShell>

			{needsWeb && (
				<>
					<FieldShell
						id="websiteType"
						label="Type of website"
						error={errors.websiteType?.message}
					>
						<Controller
							control={control}
							name="websiteType"
							render={({ field }) => (
								<RadioGroup
									name="websiteType"
									options={websiteTypeOptions}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</FieldShell>

					<FieldShell
						id="websiteFeatures"
						label="Which website features matter most? (pick any)"
						error={errors.websiteFeatures?.message}
					>
						<Controller
							control={control}
							name="websiteFeatures"
							render={({ field }) => (
								<ChipGroup
									name="websiteFeatures"
									options={websiteFeatureOptions}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</FieldShell>

					<FieldShell
						id="replacingSite"
						label="Replacing an existing site?"
						error={errors.replacingSite?.message}
					>
						<Controller
							control={control}
							name="replacingSite"
							render={({ field }) => (
								<RadioGroup
									name="replacingSite"
									options={replacingSiteOptions}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</FieldShell>

					<FieldShell
						id="domain"
						label="Domain status"
						error={errors.domain?.message}
					>
						<Controller
							control={control}
							name="domain"
							render={({ field }) => (
								<RadioGroup
									name="domain"
									options={domainOptions}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</FieldShell>
				</>
			)}

			{needsApp && (
				<>
					<FieldShell
						id="appType"
						label="Type of mobile app"
						error={errors.appType?.message}
					>
						<Controller
							control={control}
							name="appType"
							render={({ field }) => (
								<RadioGroup
									name="appType"
									options={appTypeOptions}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</FieldShell>

					<FieldShell
						id="mobileFeatures"
						label="Which mobile features matter most? (pick any)"
						error={errors.mobileFeatures?.message}
					>
						<Controller
							control={control}
							name="mobileFeatures"
							render={({ field }) => (
								<ChipGroup
									name="mobileFeatures"
									options={mobileFeatureOptions}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</FieldShell>

					<FieldShell
						id="appStoreAccounts"
						label="App Store and Google Play developer accounts"
						error={errors.appStoreAccounts?.message}
						hint="We can help you set them up — apps publish under your business name regardless."
					>
						<Controller
							control={control}
							name="appStoreAccounts"
							render={({ field }) => (
								<RadioGroup
									name="appStoreAccounts"
									options={appStoreAccountsOptions}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</FieldShell>
				</>
			)}
		</div>
	);
}
