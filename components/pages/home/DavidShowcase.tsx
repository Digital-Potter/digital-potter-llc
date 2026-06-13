import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ShowcaseRow = {
	headline: string;
	body: string;
	bullets: string[];
	image: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
};

const rows: ShowcaseRow[] = [
	{
		headline: 'See your whole business on one screen.',
		body: 'Sales this month, orders to fulfill, new customers, page visits — theDavid greets you with the numbers that matter, not a wall of settings.',
		bullets: [
			'Live storefront analytics, updated as visitors arrive',
			'Orders, bookings, and customer inquiries in one inbox',
			'An activity log of every change, so nothing is a mystery',
		],
		image: {
			src: '/cms/digital-potter-cms-home-dashboard.png',
			alt: 'theDavid dashboard with sales, orders, customers, and activity feed',
			width: 2086,
			height: 1335,
		},
	},
	{
		headline: 'Update your site like editing a doc.',
		body: 'Write, drop in images, tweak your SEO, hit publish. Changes go live in seconds — no code, no deploys, nothing to break.',
		bullets: [
			'Drag-and-drop sections, reordered in a click',
			'Built-in SEO settings on every single page',
			'Drafts and preview before anything goes public',
		],
		image: {
			src: '/cms/digital-potter-cms-editor.png',
			alt: 'theDavid page editor with rich text toolbar, SEO settings, and section builder',
			width: 1855,
			height: 1350,
		},
	},
	{
		headline: 'Pages, posts, products, menus — one home for all of it.',
		body: 'theDavid grows with your business. Start with pages and a blog. Switch on bookings, online ordering, restaurant menus, courses, or subscriptions the day you need them — no replatforming, ever.',
		bullets: [
			'Every page and post searchable, filterable, and statused',
			'Modules activate per business — you only see what you use',
			'Stripe-native checkout, invoices, and subscriptions built in',
		],
		image: {
			src: '/cms/digital-potter-cms-items-list.png',
			alt: 'theDavid pages list with publish status, search, and filtering',
			width: 1861,
			height: 1351,
		},
	},
];

const modules = [
	'Pages & Blog',
	'Bookings & Events',
	'E-commerce & Orders',
	'Restaurant Menus',
	'Courses',
	'Subscriptions',
	'Media Library',
	'Analytics',
];

export default function DavidShowcase() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Meet theDavid — our CMS, your command center
				</p>
				<h2 className="mt-4 text-balance">
					Every site we build comes with the engine to run it.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					We built theDavid so our clients never wait on a developer again.
					It&apos;s the content and commerce platform behind every Digital
					Potter site — and it speaks your language, not ours.
				</p>
			</div>

			<div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
				{rows.map((row, i) => (
					<ShowcaseFeature key={row.headline} row={row} flipped={i % 2 === 1} />
				))}
			</div>

			{/* Module chips: breadth without another wall of cards */}
			<div className="border-dp-dark-green/20 bg-dp-dark-green/5 mx-auto mt-20 max-w-4xl rounded-3xl border px-8 py-10 text-center md:mt-28">
				<h3 className="text-xl md:text-2xl">
					Switch on only what your business needs.
				</h3>
				<ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
					{modules.map((m) => (
						<li
							key={m}
							className="border-dp-dark-green/30 text-dp-dark font-primary-font rounded-full border bg-white/70 px-4 py-1.5 text-xs font-bold md:text-sm"
						>
							{m}
						</li>
					))}
				</ul>
				<p className="text-dp-body-soft mt-6 text-sm md:text-base">
					A salon gets bookings. A taquería gets menus and specials. A store
					gets products and orders. Same platform, shaped to you.
				</p>
				<p className="mt-5">
					<Link
						href="/the-cms-we-built-for-our-own-clients"
						className="text-dp-dark-green hover:text-dp-green font-primary-font text-sm font-bold tracking-wide uppercase"
					>
						Take the full tour of theDavid →
					</Link>
				</p>
			</div>
		</section>
	);
}

function ShowcaseFeature({
	row,
	flipped,
}: {
	row: ShowcaseRow;
	flipped: boolean;
}) {
	return (
		<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
			<div className={twMerge(flipped && 'lg:order-2')}>
				<h3 className="text-2xl text-balance md:text-3xl">{row.headline}</h3>
				<p className="text-dp-body-soft mt-5 text-base md:text-lg">
					{row.body}
				</p>
				<ul className="mt-7 space-y-3.5">
					{row.bullets.map((b) => (
						<li
							key={b}
							className="text-dp-body/85 flex items-start gap-3 text-base"
						>
							<svg
								aria-hidden
								className="fill-dp-green mt-1 h-5 w-5 shrink-0"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
							</svg>
							<span>{b}</span>
						</li>
					))}
				</ul>
			</div>
			<div className={twMerge('relative', flipped && 'lg:order-1')}>
				<div
					aria-hidden
					className="bg-dp-green/10 absolute -inset-6 -z-10 rounded-[2.5rem] blur-2xl"
				/>
				<div className="dp-box-design overflow-hidden rounded-3xl">
					<Image
						src={row.image.src}
						alt={row.image.alt}
						width={row.image.width}
						height={row.image.height}
						sizes="(max-width: 1024px) 92vw, 640px"
						className="w-full"
					/>
				</div>
			</div>
		</div>
	);
}
