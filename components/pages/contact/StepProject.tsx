'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { ChipGroup, FieldShell, RadioGroup } from './fields';
import {
	domainOptions,
	functionalityOptions,
	projectTypeOptions,
	replacingSiteOptions,
	type QuoteFormData,
} from '@/lib/quoteSchema';

export default function StepProject() {
	const {
		control,
		formState: { errors },
	} = useFormContext<QuoteFormData>();

	return (
		<div className="space-y-8">
			<FieldShell
				id="projectType"
				label="What type of project do you need?"
				error={errors.projectType?.message}
			>
				<Controller
					control={control}
					name="projectType"
					render={({ field }) => (
						<RadioGroup
							name="projectType"
							options={projectTypeOptions}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</FieldShell>

			<FieldShell
				id="functionalities"
				label="Which functionalities matter most? (pick any)"
				error={errors.functionalities?.message}
			>
				<Controller
					control={control}
					name="functionalities"
					render={({ field }) => (
						<ChipGroup
							name="functionalities"
							options={functionalityOptions}
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
		</div>
	);
}
