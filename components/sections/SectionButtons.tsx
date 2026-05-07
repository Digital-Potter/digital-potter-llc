import { ButtonLink } from '@/components/ui/Button';
import type { BlockButton } from '@/helpers/cms/types';

type SectionButtonsProps = {
	buttons?: BlockButton[];
	className?: string;
};

/**
 * Renders the `content.buttons` array authored in the CMS via
 * ButtonListEditor. Style maps "primary" → solid, "secondary" → outlined.
 * Each button respects its own `openInNewTab` flag.
 *
 * Returns null when there are no buttons, so sections can render this
 * unconditionally.
 */
export default function SectionButtons({
	buttons,
	className,
}: SectionButtonsProps) {
	if (!buttons || buttons.length === 0) return null;
	return (
		<div
			className={
				className ?? 'mt-8 flex flex-wrap items-center justify-center gap-4'
			}
		>
			{buttons.map((btn, i) => (
				<ButtonLink
					key={`${btn.url}-${i}`}
					href={btn.url}
					variant={btn.style === 'secondary' ? 'outlined' : 'solid'}
					openInNewTab={btn.openInNewTab}
				>
					{btn.label}
				</ButtonLink>
			))}
		</div>
	);
}
