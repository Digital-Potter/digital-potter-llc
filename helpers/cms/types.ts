export type StorefrontList<T> = {
	success: true;
	total: number;
	page: number;
	pages: number;
	count: number;
	items: T[];
};

export type StorefrontItem<T> = {
	success: true;
	item: T;
};

export type SeoMeta = {
	metaTitle?: string;
	metaDescription?: string;
	ogImage?: string;
	canonicalUrl?: string;
	noIndex?: boolean;
};

export type BlockButton = {
	label: string;
	url: string;
	style?: 'primary' | 'secondary';
	openInNewTab?: boolean;
};

export type CmsSection = {
	_type: string;
	_id?: string;
	label?: string;
	title?: string;
	subtitle?: string;
	order?: number;
	settings?: Record<string, unknown>;
	content?: Record<string, unknown>;
};

export type CmsPage = {
	_id: string;
	slug: string;
	title: string;
	status: 'draft' | 'published' | 'archived';
	sections: CmsSection[];
	seo?: SeoMeta;
};

export type CmsProject = {
	_id: string;
	slug: string;
	title: string;
	excerpt?: string;
	category?: string;
	featured?: boolean;
	featuredImage?: { url: string; alt?: string };
	sections: CmsSection[];
	seo?: SeoMeta;
	publishedAt?: string;
};

export type CmsBlogCategory = {
	_id: string;
	name: string;
	slug: string;
	status?: string;
};

export type CmsBlogAuthor = {
	_id: string;
	firstName?: string;
	lastName?: string;
	email?: string;
};

export type CmsBlogPost = {
	_id: string;
	slug: string;
	title: string;
	subtitle?: string;
	excerpt?: string;
	content?: string; // rich HTML — present on detail responses, omitted from list responses
	featuredImage?: { url: string; alt?: string };
	categories?: CmsBlogCategory[];
	tags?: string[];
	author?: CmsBlogAuthor;
	status?: 'draft' | 'published' | 'archived';
	seo?: SeoMeta;
	publishedAt?: string;
};

export type CmsBlogPostDetailResponse = {
	success: true;
	post: CmsBlogPost;
	related: CmsBlogPost[];
};

export type CmsSubscriptionPlan = {
	_id: string;
	slug: string;
	title: string;
	excerpt?: string;
	description?: string;
	features: { label: string; description?: string }[];
	price?: number;
	currency?: string;
	billing?: { interval: string; intervalCount: number };
};

// ---- Site settings (from /api/storefront/store-settings) ----

export interface TenantChrome {
	_id: string;
	name: string;
	slug: string;
	domain?: string;
	settings: {
		storeName: string;
		storeDescription: string;
		contactEmail: string;
		contactPhone: string;
		address: string;
		logoUrl: string;
	};
}

export interface StoreSettingsRecord {
	socialLinks?: Partial<
		Record<'facebook' | 'instagram' | 'twitter' | 'youtube' | 'tiktok', string>
	>;
	policies?: Partial<
		Record<
			'refundPolicy' | 'privacyPolicy' | 'termsOfService' | 'shippingPolicy',
			string
		>
	>;
	siteStructure?: {
		homepageSlug?: string | null;
		blogSlug?: string | null;
		productsSlug?: string | null;
		productCategoriesSlug?: string | null;
		coursesSlug?: string | null;
	};
	seo?: {
		defaultTitle?: string;
		titleTemplate?: string;
		defaultDescription?: string;
		defaultOgImage?: string;
		faviconUrl?: string;
		appleTouchIconUrl?: string;
		robots?: { allowIndexing?: boolean; extraDirectives?: string };
	};
}

export interface StoreSettingsResponse {
	success: true;
	tenant: TenantChrome;
	settings: StoreSettingsRecord | null;
}

// ---- Navigation (from /api/storefront/navigation) ----

export type NavigationLocation = 'header' | 'footer' | 'sidebar' | 'mobile';

export type MenuItemType =
	| 'page'
	| 'blog_post'
	| 'blog_category'
	| 'product'
	| 'product_category'
	| 'course'
	| 'custom';

export interface ResolvedMenuItem {
	_id: string;
	label: string;
	type: MenuItemType;
	url?: string;
	openInNewTab: boolean;
	order: number;
	cssClass?: string;
	icon?: string;
	reference?: string;
	resolved?: { slug: string; title: string };
	children: ResolvedMenuItem[];
}

export interface NavigationMenu {
	_id: string;
	name: string;
	slug: string;
	location: NavigationLocation;
	items: ResolvedMenuItem[];
}

export interface NavigationResponse {
	success: true;
	count: number;
	menus: NavigationMenu[];
}
