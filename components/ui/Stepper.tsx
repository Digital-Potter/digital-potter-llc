import clsx from 'clsx';

type Step = { label: string };

export function Stepper({
	steps,
	current,
}: {
	steps: Step[];
	current: number;
}) {
	return (
		<ol className="border-ink/10 flex flex-wrap items-center gap-2 rounded-full border bg-white p-2">
			{steps.map((s, i) => {
				const idx = i + 1;
				const isActive = idx === current;
				const isDone = idx < current;
				return (
					<li
						key={s.label}
						className={clsx(
							'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
							isActive && 'bg-ink text-cream',
							isDone && 'bg-brand-green text-ink',
							!isActive && !isDone && 'text-smoke',
						)}
					>
						<span className="text-xs">{idx}.</span>
						<span>{s.label}</span>
					</li>
				);
			})}
		</ol>
	);
}
