import Link from 'next/link';
import { siteBaseUrl } from '@/helpers/seo/structuredData';

export type BreadcrumbItem = {
	label: string;
	/** Absolute path on this site (e.g. `/`, `/digital-potter-blog`). Used both as the link target and to build the `item` URL in the JSON-LD. */
	href: string;
};

type BreadcrumbsProps = {
	items: BreadcrumbItem[];
	className?: string;
};

/**
 * Renders a breadcrumb trail and emits Schema.org BreadcrumbList JSON-LD
 * for the same items. Last item is the current page — rendered as plain
 * text without a link, but still included in the structured data with its
 * absolute URL so search engines can index the trail.
 *
 * Intended for use at the top of detail pages (blog post, project, etc.):
 *
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Blog', href: urls.blogIndex },
 *     { label: post.title, href: urls.blogPost(post.slug) },
 *   ]}
 * />
 * ```
 */
export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
	if (!items || items.length === 0) return null;
	const base = siteBaseUrl();

	const json = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.label,
			item: item.href.startsWith('http') ? item.href : `${base}${item.href}`,
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
			/>
			<nav
				aria-label="Breadcrumb"
				className={
					className ??
					'font-primary-font text-xs font-bold tracking-wider uppercase'
				}
			>
				<ol className="text-dp-body-soft flex flex-wrap items-center gap-x-2 gap-y-1">
					{items.map((item, i) => {
						const isLast = i === items.length - 1;
						return (
							<li key={`${item.href}-${i}`} className="flex items-center gap-2">
								{isLast ? (
									<span
										className="text-dp-body-soft inline-block py-2"
										aria-current="page"
									>
										{item.label}
									</span>
								) : (
									<Link
										href={item.href}
										className="text-dp-dark-green hover:text-dp-green inline-block py-2"
									>
										{item.label}
									</Link>
								)}
								{!isLast && (
									<span className="text-dp-body-soft" aria-hidden>
										/
									</span>
								)}
							</li>
						);
					})}
				</ol>
			</nav>
		</>
	);
}
