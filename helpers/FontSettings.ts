import { Figtree, Golos_Text } from 'next/font/google';

export const primaryFont = Golos_Text({
	variable: '--primary-font',
	display: 'swap',
	subsets: ['cyrillic', 'latin'],
});

export const secondaryFont = Figtree({
	variable: '--secondary-font',
	display: 'swap',
	subsets: ['latin'],
});
