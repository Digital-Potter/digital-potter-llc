'use client';

import type {
	ReactNode,
	InputHTMLAttributes,
	SelectHTMLAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';

type FieldShellProps = {
	id: string;
	label: string;
	error?: string;
	children: ReactNode;
	hint?: string;
};

export function FieldShell({
	id,
	label,
	error,
	children,
	hint,
}: FieldShellProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="font-primary-font text-dp-dark mb-2 block text-sm font-bold tracking-wider uppercase"
			>
				{label}
			</label>
			{children}
			{hint && !error ? (
				<p className="text-dp-body-soft mt-2 text-xs">{hint}</p>
			) : null}
			{error ? (
				<p className="mt-2 text-xs text-red-700" role="alert">
					{error}
				</p>
			) : null}
		</div>
	);
}

type RadioGroupProps = {
	name: string;
	options: readonly string[];
	value?: string;
	onChange: (v: string) => void;
};

export function RadioGroup({
	name,
	options,
	value,
	onChange,
}: RadioGroupProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{options.map((opt) => {
				const checked = value === opt;
				const id = `${name}-${slug(opt)}`;
				return (
					<label
						key={opt}
						htmlFor={id}
						className={twMerge(
							'cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors',
							checked
								? 'bg-dp-dark-green border-dp-dark-green text-white'
								: 'border-dp-dark/20 text-dp-dark hover:border-dp-dark-green/50 bg-white/50',
						)}
					>
						<input
							type="radio"
							id={id}
							name={name}
							value={opt}
							checked={checked}
							onChange={() => onChange(opt)}
							className="sr-only"
						/>
						{opt}
					</label>
				);
			})}
		</div>
	);
}

type ChipGroupProps = {
	name: string;
	options: readonly string[];
	value?: string[];
	onChange: (v: string[]) => void;
};

export function ChipGroup({
	name,
	options,
	value = [],
	onChange,
}: ChipGroupProps) {
	const toggle = (opt: string) => {
		if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
		else onChange([...value, opt]);
	};
	return (
		<div className="flex flex-wrap gap-2">
			{options.map((opt) => {
				const checked = value.includes(opt);
				const id = `${name}-${slug(opt)}`;
				return (
					<label
						key={opt}
						htmlFor={id}
						className={twMerge(
							'cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors',
							checked
								? 'bg-dp-green border-dp-green text-dp-dark'
								: 'border-dp-dark/20 text-dp-dark hover:border-dp-green/50 bg-white/50',
						)}
					>
						<input
							type="checkbox"
							id={id}
							name={name}
							value={opt}
							checked={checked}
							onChange={() => toggle(opt)}
							className="sr-only"
						/>
						{opt}
					</label>
				);
			})}
		</div>
	);
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	innerRef?: React.Ref<HTMLInputElement>;
};

export function TextField({ innerRef, className, ...rest }: TextFieldProps) {
	return (
		<input
			ref={innerRef}
			className={twMerge(
				'border-dp-dark/20 focus:border-dp-dark-green focus:ring-dp-dark-green/20 w-full rounded-xl border-2 bg-white/70 px-4 py-3 text-base transition-colors outline-none focus:ring-4',
				className,
			)}
			{...rest}
		/>
	);
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
	options: readonly string[];
	innerRef?: React.Ref<HTMLSelectElement>;
};

export function SelectField({
	innerRef,
	options,
	className,
	...rest
}: SelectFieldProps) {
	return (
		<select
			ref={innerRef}
			className={twMerge(
				'border-dp-dark/20 focus:border-dp-dark-green focus:ring-dp-dark-green/20 w-full cursor-pointer rounded-xl border-2 bg-white/70 px-4 py-3 text-base transition-colors outline-none focus:ring-4',
				className,
			)}
			{...rest}
		>
			<option value="">Select…</option>
			{options.map((opt) => (
				<option key={opt} value={opt}>
					{opt}
				</option>
			))}
		</select>
	);
}

function slug(s: string) {
	return s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
