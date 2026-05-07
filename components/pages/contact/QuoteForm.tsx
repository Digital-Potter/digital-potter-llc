'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import {
	getStepFields,
	quoteSchema,
	type QuoteFormData,
} from '@/lib/quoteSchema';
import StepProject from './StepProject';
import StepBudget from './StepBudget';
import StepBusiness from './StepBusiness';
import Stepper from './Stepper';
import ThankYouPanel from './ThankYouPanel';

type StepNumber = 1 | 2 | 3;

export default function QuoteForm() {
	const [step, setStep] = useState<StepNumber>(1);
	const [maxReached, setMaxReached] = useState<StepNumber>(1);
	const [submitState, setSubmitState] = useState<{
		state: 'idle' | 'submitting' | 'success' | 'error';
		message?: string;
		name?: string;
	}>({ state: 'idle' });

	const methods = useForm<QuoteFormData>({
		resolver: zodResolver(quoteSchema),
		mode: 'onTouched',
		defaultValues: {
			websiteFeatures: [],
			mobileFeatures: [],
			website: '',
		},
	});

	const goNext = async () => {
		const needType = methods.getValues('needType');
		const fields = getStepFields(step, needType);
		const ok = await methods.trigger(fields);
		if (!ok) return;
		const next = (step + 1) as StepNumber;
		setStep(next);
		if (next > maxReached) setMaxReached(next);
	};

	const goBack = () => {
		if (step > 1) setStep((step - 1) as StepNumber);
	};

	const onSubmit = methods.handleSubmit(async (data) => {
		setSubmitState({ state: 'submitting' });
		try {
			const res = await fetch('/api/quote', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				const text = await res.text();
				throw new Error(text || `HTTP ${res.status}`);
			}
			setSubmitState({ state: 'success', name: data.yourName });
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Submission failed.';
			setSubmitState({ state: 'error', message });
		}
	});

	if (submitState.state === 'success') {
		return <ThankYouPanel name={submitState.name} />;
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} noValidate>
				<Stepper
					current={step}
					maxReached={maxReached}
					onJump={(s) => setStep(s)}
				/>

				<div className="border-dp-green/40 mt-8 rounded-3xl border-2 bg-white/30 p-6 md:p-10">
					{step === 1 && <StepProject />}
					{step === 2 && <StepBudget />}
					{step === 3 && <StepBusiness />}
				</div>

				{submitState.state === 'error' ? (
					<p className="mt-6 text-sm text-red-700" role="alert">
						{submitState.message ??
							'Something went wrong. Please try again or email us directly.'}
					</p>
				) : null}

				<div className="mt-8 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						{step > 1 ? (
							<Button
								type="button"
								variant="outlined"
								onClick={goBack}
								disabled={submitState.state === 'submitting'}
							>
								Back
							</Button>
						) : null}
					</div>
					<div>
						{step < 3 ? (
							<Button type="button" variant="solid" onClick={goNext}>
								Next
							</Button>
						) : (
							<Button
								type="submit"
								variant="solid"
								disabled={submitState.state === 'submitting'}
							>
								{submitState.state === 'submitting'
									? 'Sending…'
									: 'Send my request'}
							</Button>
						)}
					</div>
				</div>
			</form>
		</FormProvider>
	);
}
