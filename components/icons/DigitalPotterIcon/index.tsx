import * as React from 'react';
import { SVGProps } from 'react';

interface DigitalPotterIconProps extends SVGProps<SVGSVGElement> {
	testId?: string;
}

const DigitalPotterIcon = (props: DigitalPotterIconProps) => {
	const { testId = 'DigitalPotterIcon', ...rest } = props;
	return (
		<svg
			data-testid={testId}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 119 71"
			{...rest}
		>
			<path
				fill="#00d85c"
				d="M48.47 16.214v39.363h-6.421l-.45-3.83c-2.14 3.322-5.576 4.449-8.955 4.449-8.166 0-14.3-5.407-14.3-14.531 0-9.574 6.026-14.53 14.136-14.53 2.928 0 7.49 1.577 9.124 4.449v-15.37ZM25.207 41.67a7.972 7.972 0 1 0 15.938 0 7.923 7.923 0 0 0-8.054-8.109c-4.393 0-7.885 3.1-7.885 8.109"
				data-name="Path 34"
			/>
			<path
				fill="#331f1f"
				d="M80.707 47.389H65.165V63.56H54.8V8.607c8.636 0 17.272-.079 25.907-.079 26.85 0 26.928 38.861 0 38.861m-15.544-9.5h15.544c13.268 0 13.189-19.47 0-19.47H65.165Z"
				data-name="Path 35"
			/>
			<path
				fill="#331f1f"
				d="M23.238 6.587C14.367 13.813 9.892 24.411 9.892 35.813c0 12.2 4.475 21.839 13.346 28.985l-5.182 7.146C5.809 63.67-.002 49.379-.002 35.81c0-13.409 6.2-27.379 18.449-35.81Z"
				data-name="Path 36"
			/>
			<path
				fill="#331f1f"
				d="M100.579 0c12.247 8.43 18.449 22.4 18.449 35.81 0 13.569-5.81 27.861-18.057 36.131l-5.025-7.306c8.871-7.146 13.189-16.62 13.189-28.824 0-11.4-4.475-22-13.346-29.226Z"
				data-name="Path 37"
			/>
		</svg>
	);
};

export default DigitalPotterIcon;
