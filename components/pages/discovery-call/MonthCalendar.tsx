'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
		disabled: boolean;
		isWeekend: boolean;
	} | null;
	const cells: Cell[] = [];
	for (let i = 0; i < startOffset; i++) cells.push(null);
	for (let d = 1; d <= daysInMonth; d++) {
		const dateObj = new Date(viewYear, viewMonth, d);
		const key = toDateKey(viewYear, viewMonth, d);
		const dow = dateObj.getDay();
		cells.push({
			day: d,
			key,
			isWeekend: dow === 0 || dow === 6,
			disabled: dateObj < minDate || dateObj > maxDate,
		});
	}

	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<button
					onClick={prevMonth}
					disabled={!canGoPrev}
					className="text-dp-dark/50 hover:text-dp-dark rounded-lg p-2 text-2xl leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-30"
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
					className="text-dp-dark/50 hover:text-dp-dark rounded-lg p-2 text-2xl leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-30"
					aria-label="Next month"
				>
					›
				</button>
			</div>

			<div className="mb-2 grid grid-cols-7 text-center">
				{DAY_LABELS.map((d) => (
					<div
						key={d}
						className="text-dp-dark/40 py-1 text-xs font-semibold tracking-wide uppercase"
					>
						{d}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-1">
				{cells.map((cell, i) => {
					if (!cell) return <div key={`e-${i}`} />;
					const isSelected = cell.key === selectedDate;
					const isDisabled = cell.disabled || cell.isWeekend;

					return (
						<button
							key={cell.key}
							disabled={isDisabled}
							onClick={() => !isDisabled && onDateSelect(cell.key)}
							className={twMerge(
								'aspect-square rounded-lg text-sm font-medium transition-colors',
								isDisabled
									? 'text-dp-dark/25 cursor-not-allowed'
									: isSelected
										? 'bg-dp-green text-dp-dark font-bold'
										: 'text-dp-dark hover:bg-dp-green/20 cursor-pointer',
							)}
							aria-label={cell.key}
							aria-pressed={isSelected}
						>
							{cell.day}
						</button>
					);
				})}
			</div>
		</div>
	);
}
