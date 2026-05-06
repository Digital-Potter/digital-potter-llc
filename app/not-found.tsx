import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
	return (
		<Container className="py-24 text-center">
			<h1 className="text-4xl font-bold">This page wandered off the wheel.</h1>
			<p className="text-smoke mt-3">
				The page you were looking for isn&apos;t here.
			</p>
			<Link
				href="/"
				className="bg-brand-green mt-8 inline-block rounded-full px-6 py-3 font-bold"
			>
				Back home
			</Link>
		</Container>
	);
}
