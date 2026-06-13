'use client';

import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAY_NAMES = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];
const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

type Props = {
	selectedDate: string | null;
	onDateSelect: (date: string) => void;
};

function pad(n: number) {
	return String(n).padStart(2, '0');
}
function toDateKey(year: number, month: number, day: number) {
	return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export default function MonthCalendar({ selectedDate, onDateSelect }: Props) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const minDate = new Date(today.getTime() + 24 * 60 * 60_000); // tomorrow
	const maxDate = new Date(
		today.getFullYear(),
		today.getMonth() + 3,
		today.getDate(),
	);

	const [viewYear, setViewYear] = useState(minDate.getFullYear());
	const [viewMonth, setViewMonth] = useState(minDate.getMonth());

	const firstOfMonth = new Date(viewYear, viewMonth, 1);
	const startOffset = firstOfMonth.getDay();
	const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

	const canGoPrev =
		viewYear > minDate.getFullYear() ||
		(viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth());
	const canGoNext =
		viewYear < maxDate.getFullYear() ||
		(viewYear === maxDate.getFullYear() && viewMonth < maxDate.getMonth());

	function prevMonth() {
		if (!canGoPrev) return;
		if (viewMonth === 0) {
			setViewYear((y) => y - 1);
			setViewMonth(11);
		} else setViewMonth((m) => m - 1);
	}
	function nextMonth() {
		if (!canGoNext) return;
		if (viewMonth === 11) {
			setViewYear((y) => y + 1);
			setViewMonth(0);
		} else setViewMonth((m) => m + 1);
	}

	type Cell = {
		day: number;
		key: string;
		label: string;
		disabled: boolean;
		isWeekend: boolean;
	} | null;
	const cells: Cell[] = [];
	for (let i = 0; i < startOffset; i++) cells.push(null);
	for (let d = 1; d <= daysInMonth; d++) {
		const dateObj = new Date(viewYear, viewMonth, d);
		const key = toDateKey(viewYear, viewMonth, d);
		const dow = dateObj.getDay();
		const disabled = dateObj < minDate || dateObj > maxDate;
		const isWeekend = dow === 0 || dow === 6;
		const human = `${WEEKDAY_NAMES[dow]}, ${MONTH_NAMES[viewMonth]} ${d}, ${viewYear}`;
		cells.push({
			day: d,
			key,
			// Screen readers announce a real date, not "2026-06-16" digit-by-digit.
			label: disabled || isWeekend ? `${human}, unavailable` : human,
			isWeekend,
			disabled,
		});
	}

	// Roving-tabindex keyboard navigation: one Tab stop into the grid, then
	// arrow keys / Home / End move focus between selectable days.
	const gridRef = useRef<HTMLDivElement>(null);
	const [focusKey, setFocusKey] = useState<string | null>(null);
	const enabledKeys = cells
		.filter((c): c is NonNullable<Cell> => !!c && !(c.disabled || c.isWeekend))
		.map((c) => c.key);
	const activeKey =
		focusKey && enabledKeys.includes(focusKey)
			? focusKey
			: selectedDate && enabledKeys.includes(selectedDate)
				? selectedDate
				: (enabledKeys[0] ?? null);

	function onGridKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (!enabledKeys.length) return;
		const idx = activeKey ? enabledKeys.indexOf(activeKey) : 0;
		let next = idx;
		switch (e.key) {
			case 'ArrowRight':
			case 'ArrowDown':
				next = Math.min(enabledKeys.length - 1, idx + 1);
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				next = Math.max(0, idx - 1);
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = enabledKeys.length - 1;
				break;
			default:
				return;
		}
		e.preventDefault();
		const nextKey = enabledKeys[next];
		setFocusKey(nextKey);
		gridRef.current
			?.querySelector<HTMLButtonElement>(`[data-key="${nextKey}"]`)
			?.focus();
	}

	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<button
					onClick={prevMonth}
					disabled={!canGoPrev}
					className="text-dp-dark/70 hover:text-dp-dark rounded-lg p-2 text-2xl leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-30"
					aria-label="Previous month"
				>
					‹
				</button>
				<span className="font-primary-font text-dp-dark font-bold">
					{MONTH_NAMES[viewMonth]} {viewYear}
				</span>
				<button
					onClick={nextMonth}
					disabled={!canGoNext}
					className="text-dp-dark/70 hover:text-dp-dark rounded-lg p-2 text-2xl leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-30"
					aria-label="Next month"
				>
					›
				</button>
			</div>

			{/* Decorative: each day button already announces its full weekday. */}
			<div className="mb-2 grid grid-cols-7 text-center" aria-hidden="true">
				{DAY_LABELS.map((d) => (
					<div
						key={d}
						className="text-dp-dark/50 py-1 text-xs font-semibold tracking-wide uppercase"
					>
						{d}
					</div>
				))}
			</div>

			<div
				ref={gridRef}
				role="group"
				aria-label="Choose an appointment date"
				className="grid grid-cols-7 gap-1"
				onKeyDown={onGridKeyDown}
			>
				{cells.map((cell, i) => {
					if (!cell) return <div key={`e-${i}`} />;
					const isSelected = cell.key === selectedDate;
					const isDisabled = cell.disabled || cell.isWeekend;

					return (
						<button
							key={cell.key}
							data-key={cell.key}
							disabled={isDisabled}
							onClick={() => !isDisabled && onDateSelect(cell.key)}
							tabIndex={cell.key === activeKey ? 0 : -1}
							className={twMerge(
								'aspect-square rounded-lg text-sm font-medium transition-colors',
								isDisabled
									? 'text-dp-dark/40 cursor-not-allowed'
									: isSelected
										? 'bg-dp-green text-dp-dark font-bold'
										: 'text-dp-dark hover:bg-dp-green/20 cursor-pointer',
							)}
							aria-label={cell.label}
							aria-current={isSelected ? 'date' : undefined}
						>
							{cell.day}
						</button>
					);
				})}
			</div>
		</div>
	);
}
