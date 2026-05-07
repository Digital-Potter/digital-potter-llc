import clsx from 'clsx';
import type { ReactNode } from 'react';
import type {
	SectionLayout,
	SectionPadding,
	SectionSettings,
} from '@/helpers/cms/types';

const paddingTopClass: Record<SectionPadding, string> = {
	none: 'pt-0',
	small: 'pt-8',
	medium: 'pt-12 md:pt-16',
	large: 'pt-16 md:pt-24',
};

const paddingBottomClass: Record<SectionPadding, string> = {
	none: 'pb-0',
	small: 'pb-8',
	medium: 'pb-12 md:pb-16',
	large: 'pb-16 md:pb-24',
};

type SectionLayoutLegacy = SectionLayout | 'wide';

type SectionProps = {
	children: ReactNode;
	id?: string;
	/** Independent top/bottom padding from CMS settings. */
	paddingTop?: SectionPadding;
	paddingBottom?: SectionPadding;
	layout?: SectionLayoutLegacy;
	/** Optional CMS settings — when present, overrides individual props. */
	settings?: SectionSettings;
};

export function Section({
	children,
	id,
	paddingTop,
	paddingBottom,
	layout,
	settings,
}: SectionProps) {
	const resolvedLayout = (settings?.layout ??
		layout ??
		'contained') as SectionLayoutLegacy;
	const resolvedPaddingTop = settings?.paddingTop ?? paddingTop ?? 'medium';
	const resolvedPaddingBottom =
		settings?.paddingBottom ?? paddingBottom ?? 'medium';
	const resolvedId = id ?? settings?.anchor ?? undefined;

	const inner =
		resolvedLayout === 'narrow' ? (
			<div className="mx-auto max-w-3xl">{children}</div>
		) : resolvedLayout === 'wide' ? (
			children
		) : resolvedLayout === 'full' ? (
			children
		) : (
			<div className="mx-auto max-w-5xl">{children}</div>
		);

	const isFullBleed = resolvedLayout === 'full';

	return (
		<section
			id={resolvedId}
			className={clsx(
				!isFullBleed && 'dp-container',
				paddingTopClass[resolvedPaddingTop],
				paddingBottomClass[resolvedPaddingBottom],
			)}
		>
			{inner}
		</section>
	);
}
