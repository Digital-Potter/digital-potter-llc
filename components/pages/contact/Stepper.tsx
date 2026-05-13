'use client';

import { twMerge } from 'tailwind-merge';

type StepperProps = {
	current: 1 | 2 | 3;
	onJump?: (step: 1 | 2 | 3) => void;
	maxReached: 1 | 2 | 3;
};

const steps: { n: 1 | 2 | 3; label: string }[] = [
	{ n: 1, label: 'Type of project needed' },
	{ n: 2, label: 'Budget and timelines' },
	{ n: 3, label: 'Personal & business info' },
];

export default function Stepper({ current, onJump, maxReached }: StepperProps) {
	return (
		<ol
			aria-label={`Quote request progress, step ${current} of ${steps.length}`}
			className="flex flex-col gap-2 md:flex-row md:gap-3"
		>
			{steps.map((s) => {
				const isActive = s.n === current;
				const isReached = s.n <= maxReached;
				const canJump = isReached && !!onJump && s.n !== current;
				return (
					<li key={s.n} className="flex-1">
						<button
							type="button"
							disabled={!canJump}
							onClick={() => canJump && onJump?.(s.n)}
							aria-current={isActive ? 'step' : undefined}
							aria-label={`Step ${s.n} of ${steps.length}: ${s.label}${
								isActive ? ' (current)' : ''
							}`}
							className={twMerge(
								'font-primary-font flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition-colors',
								isActive
									? 'bg-dp-dark border-dp-dark text-dp-green'
									: isReached
										? 'border-dp-dark-green/40 bg-dp-dark-green/5 text-dp-dark hover:bg-dp-dark-green/10'
										: 'border-dp-dark/15 text-dp-body-soft bg-white/40',
								canJump ? 'cursor-pointer' : '',
							)}
						>
							<span
								aria-hidden
								className={twMerge(
									'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs',
									isActive
										? 'bg-dp-green text-dp-dark'
										: isReached
											? 'bg-dp-dark-green text-white'
											: 'bg-dp-dark/15 text-dp-body-soft',
								)}
							>
								{s.n}
							</span>
							<span>{s.label}</span>
						</button>
					</li>
				);
			})}
		</ol>
	);
}
