import type { SVGProps } from 'react';

export function PenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="m4 21 5.5-1.5L20 9 15 4 4.5 14.5 3 20l1 1Z" />
			<path d="m13 6 5 5" />
			<path d="m4 21 1-5" />
		</svg>
	);
}

export function MobileIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<rect x="6" y="3" width="12" height="18" rx="2.5" />
			<path d="M11 18h2" />
		</svg>
	);
}

export function CodeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<rect x="2" y="5" width="20" height="14" rx="2" />
			<path d="m9 10-2 2 2 2" />
			<path d="m15 10 2 2-2 2" />
		</svg>
	);
}

export function LayersIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<rect x="3" y="3" width="14" height="14" rx="2" />
			<path d="M7 21h12a2 2 0 0 0 2-2V7" />
		</svg>
	);
}

export function WrenchIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
		</svg>
	);
}

export function ServerIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<rect x="2" y="2" width="20" height="8" rx="2" />
			<rect x="2" y="14" width="20" height="8" rx="2" />
			<path d="M6 6h.01" />
			<path d="M6 18h.01" />
		</svg>
	);
}
