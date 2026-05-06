import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
	title: {
		default: 'Digital Potter — Custom Web & App Development',
		template: '%s · Digital Potter',
	},
	description:
		'Beautifully crafted web and mobile apps. Designed for clarity, delight, and results.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-cream text-ink min-h-screen antialiased">
				<Nav />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
