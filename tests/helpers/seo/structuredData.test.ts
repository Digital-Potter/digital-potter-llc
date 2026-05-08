/**
 * @jest-environment node
 */
import {
	absoluteUrl,
	articleSchema,
	collectionPageSchema,
	creativeWorkSchema,
	faqPageSchema,
	organizationSchema,
	serviceSchema,
	siteBaseUrl,
	SERVICE_DESCRIPTORS,
	webPageSchema,
	websiteSchema,
} from '@/helpers/seo/structuredData';
import type {
	CmsBlogPost,
	CmsProject,
	StoreSettingsRecord,
	TenantChrome,
} from '@/helpers/cms/types';
import type { SiteUrls } from '@/helpers/cms/urls';

const tenant: TenantChrome = {
	_id: 't1',
	name: 'Digital Potter',
	slug: 'digital-potter',
	settings: {
		storeName: 'Digital Potter',
		storeDescription: 'Custom web and app development.',
		contactEmail: 'hello@digitalpotter.io',
		contactPhone: '+1 555 123 4567',
		address: 'Virginia, USA',
		logoUrl: '/logo.png',
	},
};

const settings: StoreSettingsRecord = {
	socialLinks: {
		facebook: 'https://facebook.com/dp',
		instagram: 'https://instagram.com/dp',
		twitter: '',
	},
};

const urls: SiteUrls = {
	blog: 'blog',
	portfolio: 'portfolio',
	products: 'products',
	productCategories: 'collections',
	courses: 'courses',
	blogIndex: '/blog',
	blogPost: (slug) => `/blog/${slug}`,
	blogCategory: (slug) => `/blog/category/${slug}`,
	blogTag: (tag) => `/blog?tag=${encodeURIComponent(tag)}`,
	portfolioIndex: '/portfolio',
	project: (slug) => `/portfolio/${slug}`,
	productsIndex: '/products',
	product: (slug) => `/products/${slug}`,
	productCategoryIndex: '/collections',
	productCategory: (slug) => `/collections/${slug}`,
	coursesIndex: '/courses',
	course: (slug) => `/courses/${slug}`,
};

describe('siteBaseUrl', () => {
	const original = process.env.NEXT_PUBLIC_SITE_URL;
	afterEach(() => {
		if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
		else process.env.NEXT_PUBLIC_SITE_URL = original;
	});

	it('returns origin from NEXT_PUBLIC_SITE_URL when valid', () => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://digitalpotter.io/somepath';
		expect(siteBaseUrl()).toBe('https://digitalpotter.io');
	});

	it('falls back to localhost when no env var set', () => {
		delete process.env.NEXT_PUBLIC_SITE_URL;
		delete process.env.SITE_URL;
		expect(siteBaseUrl()).toBe('http://localhost:3001');
	});
});

describe('absoluteUrl', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://digitalpotter.io';
	});
	afterEach(() => {
		delete process.env.NEXT_PUBLIC_SITE_URL;
	});

	it('passes absolute http(s) URLs through unchanged', () => {
		expect(absoluteUrl('https://cdn.example.com/logo.png')).toBe(
			'https://cdn.example.com/logo.png',
		);
	});

	it('prefixes relative paths with site origin', () => {
		expect(absoluteUrl('/about')).toBe('https://digitalpotter.io/about');
		expect(absoluteUrl('about')).toBe('https://digitalpotter.io/about');
	});
});

describe('organizationSchema', () => {
	it('emits required fields and filters empty social links', () => {
		const out = organizationSchema(tenant, settings);
		expect(out['@type']).toBe('Organization');
		expect(out.name).toBe('Digital Potter');
		expect(out.email).toBe('hello@digitalpotter.io');
		expect(out.telephone).toBe('+1 555 123 4567');
		expect(out.address).toBe('Virginia, USA');
		expect(out.sameAs).toEqual([
			'https://facebook.com/dp',
			'https://instagram.com/dp',
		]);
	});

	it('omits sameAs when no social links present', () => {
		const out = organizationSchema(tenant, null);
		expect(out.sameAs).toBeUndefined();
	});

	it('omits empty optional fields rather than emitting empty strings', () => {
		const minimal: TenantChrome = {
			...tenant,
			settings: {
				...tenant.settings,
				contactEmail: '',
				contactPhone: '',
				address: '',
				logoUrl: '',
			},
		};
		const out = organizationSchema(minimal, null);
		expect(out.email).toBeUndefined();
		expect(out.telephone).toBeUndefined();
		expect(out.address).toBeUndefined();
		expect(out.logo).toBeUndefined();
	});
});

describe('websiteSchema', () => {
	it('uses site description from settings.seo when provided', () => {
		const out = websiteSchema(tenant, {
			seo: { defaultDescription: 'SEO description' },
		});
		expect(out.description).toBe('SEO description');
	});

	it('falls back to tenant storeDescription', () => {
		const out = websiteSchema(tenant, null);
		expect(out.description).toBe('Custom web and app development.');
	});
});

describe('articleSchema', () => {
	const post: CmsBlogPost = {
		_id: 'p1',
		slug: 'why-we-built-our-own-cms',
		title: 'Why we built our own CMS',
		excerpt: 'A short reason.',
		content: '<p>Long body</p>',
		featuredImage: { url: '/img.jpg' },
		categories: [{ _id: 'c1', name: 'Engineering', slug: 'eng' }],
		tags: ['cms', 'nextjs'],
		author: { _id: 'a1', firstName: 'Norman', lastName: 'Pleitez' },
		publishedAt: '2026-04-22T00:00:00Z',
	};

	beforeEach(() => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://digitalpotter.io';
	});
	afterEach(() => {
		delete process.env.NEXT_PUBLIC_SITE_URL;
	});

	it('builds a BlogPosting with required Google fields', () => {
		const out = articleSchema(post, urls, tenant);
		expect(out['@type']).toBe('BlogPosting');
		expect(out.headline).toBe('Why we built our own CMS');
		expect(out.url).toBe(
			'https://digitalpotter.io/blog/why-we-built-our-own-cms',
		);
		expect(out.image).toBe('https://digitalpotter.io/img.jpg');
		expect(out.datePublished).toBe('2026-04-22T00:00:00Z');
		expect(out.dateModified).toBe('2026-04-22T00:00:00Z');
		expect(out.articleSection).toBe('Engineering');
		expect(out.keywords).toBe('cms, nextjs');
		expect(out.author).toEqual({ '@type': 'Person', name: 'Norman Pleitez' });
		expect(out.description).toBe('A short reason.');
	});

	it('falls back to organization author when no author name', () => {
		const out = articleSchema({ ...post, author: undefined }, urls, tenant);
		expect(out.author).toEqual({
			'@type': 'Organization',
			name: 'Digital Potter',
		});
	});

	it('derives description from content when excerpt missing', () => {
		const out = articleSchema(
			{
				...post,
				excerpt: undefined,
				content: '<p>This is plain prose stripped of HTML.</p>',
			},
			urls,
			tenant,
		);
		expect(out.description).toBe('This is plain prose stripped of HTML.');
	});

	it('omits image / dates / categories / keywords when missing', () => {
		const out = articleSchema(
			{
				_id: 'p2',
				slug: 'minimal',
				title: 'Minimal',
			},
			urls,
			tenant,
		);
		expect(out.image).toBeUndefined();
		expect(out.datePublished).toBeUndefined();
		expect(out.articleSection).toBeUndefined();
		expect(out.keywords).toBeUndefined();
	});
});

describe('creativeWorkSchema', () => {
	const project: CmsProject = {
		_id: 'pr1',
		slug: 'plitz-rebrand',
		title: 'Plitz rebrand',
		subtitle: 'A long-running portfolio piece',
		featuredImage: { url: '/p.jpg' },
		categories: [{ _id: 'c1', name: 'Branding', slug: 'br' }],
		dateRange: { start: '2024-11', end: '2025-03' },
		sections: [],
		publishedAt: '2025-04-01',
	};

	beforeEach(() => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://digitalpotter.io';
	});
	afterEach(() => {
		delete process.env.NEXT_PUBLIC_SITE_URL;
	});

	it('builds a CreativeWork with project metadata', () => {
		const out = creativeWorkSchema(project, urls, tenant);
		expect(out['@type']).toBe('CreativeWork');
		expect(out.name).toBe('Plitz rebrand');
		expect(out.url).toBe('https://digitalpotter.io/portfolio/plitz-rebrand');
		expect(out.dateCreated).toBe('2024-11');
		expect(out.datePublished).toBe('2025-04-01');
		expect(out.genre).toBe('Branding');
		expect(out.keywords).toBe('Branding');
		expect(out.description).toBe('A long-running portfolio piece');
	});
});

describe('serviceSchema', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://digitalpotter.io';
	});
	afterEach(() => {
		delete process.env.NEXT_PUBLIC_SITE_URL;
	});

	it('uses descriptor copy and absolute provider URL', () => {
		const out = serviceSchema({
			descriptor: SERVICE_DESCRIPTORS.web,
			url: '/web-services',
			tenant,
		});
		expect(out['@type']).toBe('Service');
		expect(out.name).toBe('Custom Web Development');
		expect(out.serviceType).toBe('Web Development');
		expect(out.url).toBe('https://digitalpotter.io/web-services');
		expect((out.provider as { url: string }).url).toBe(
			'https://digitalpotter.io',
		);
	});
});

describe('collectionPageSchema', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://digitalpotter.io';
	});
	afterEach(() => {
		delete process.env.NEXT_PUBLIC_SITE_URL;
	});

	it('emits Blog with blogPost array when type=Blog', () => {
		const out = collectionPageSchema({
			type: 'Blog',
			name: 'Blog',
			url: '/blog',
			itemType: 'BlogPosting',
			items: [
				{ name: 'Post one', url: '/blog/one', datePublished: '2026-05-01' },
			],
		});
		expect(out['@type']).toBe('Blog');
		expect((out.blogPost as object[])[0]).toEqual(
			expect.objectContaining({
				'@type': 'BlogPosting',
				url: 'https://digitalpotter.io/blog/one',
				datePublished: '2026-05-01',
			}),
		);
	});

	it('emits CollectionPage with mainEntity ItemList when type=CollectionPage', () => {
		const out = collectionPageSchema({
			name: 'Portfolio',
			url: '/portfolio',
			itemType: 'CreativeWork',
			items: [{ name: 'Project A', url: '/portfolio/a' }],
		});
		expect(out['@type']).toBe('CollectionPage');
		expect((out.mainEntity as { '@type': string })['@type']).toBe('ItemList');
	});
});

describe('webPageSchema', () => {
	it('produces an AboutPage with mainEntity nesting', () => {
		const out = webPageSchema({
			type: 'AboutPage',
			name: 'About Digital Potter',
			url: '/about',
			tenant,
			mainEntity: { '@type': 'Organization', name: 'Digital Potter' },
		});
		expect(out['@type']).toBe('AboutPage');
		expect(out.mainEntity).toEqual({
			'@type': 'Organization',
			name: 'Digital Potter',
		});
	});
});

describe('faqPageSchema', () => {
	it('builds a FAQPage with Question entries', () => {
		const out = faqPageSchema([{ question: 'Q?', answer: 'A.' }]);
		expect(out['@type']).toBe('FAQPage');
		const items = out.mainEntity as Array<{
			'@type': string;
			name: string;
			acceptedAnswer: { text: string };
		}>;
		expect(items[0]).toEqual({
			'@type': 'Question',
			name: 'Q?',
			acceptedAnswer: { '@type': 'Answer', text: 'A.' },
		});
	});
});

describe('JSON round-trip safety', () => {
	it('every builder produces JSON.stringify-safe output', () => {
		const builders = [
			organizationSchema(tenant, settings),
			websiteSchema(tenant, settings),
			articleSchema(
				{
					_id: 'p',
					slug: 's',
					title: 'T',
					publishedAt: '2026-01-01',
				},
				urls,
				tenant,
			),
			creativeWorkSchema(
				{ _id: 'p', slug: 's', title: 'T', sections: [] },
				urls,
				tenant,
			),
			serviceSchema({
				descriptor: SERVICE_DESCRIPTORS.maintenance,
				url: '/x',
				tenant,
			}),
			collectionPageSchema({
				name: 'X',
				url: '/x',
				itemType: 'BlogPosting',
				items: [],
			}),
			webPageSchema({ name: 'X', url: '/x', tenant }),
			faqPageSchema([]),
		];
		for (const b of builders) {
			expect(() => JSON.parse(JSON.stringify(b))).not.toThrow();
		}
	});
});
