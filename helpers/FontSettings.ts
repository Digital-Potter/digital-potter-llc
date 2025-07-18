import { Figtree, Golos_Text } from 'next/font/google';

export const secondaryFont = Golos_Text({
	variable: '--primary-font',
	display: 'swap',
	subsets: ['cyrillic', 'latin'],
});

export const primaryFont = Figtree({
	variable: '--secondary-font',
	display: 'swap',
	subsets: ['latin'],
});
