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

/**
 * Populated Media reference. Storefront endpoints populate Media refs
 * with these basic fields (see thedavid-api MEDIA_POPULATE_BASIC).
 */
export type MediaRef = {
	_id?: string;
	url: string;
	alt?: string;
	title?: string;
	filename?: string;
	type?: string;
	width?: number;
	height?: number;
};

export type SeoMeta = {
	metaTitle?: string;
	metaDescription?: string;
	/** Storefront populates this as a Media object, not a URL string. */
	ogImage?: MediaRef;
	canonicalUrl?: string;
	noIndex?: boolean;
	/** JSON-LD authored in the CMS — render inside a <script type="application/ld+json"> tag. */
	structuredData?: string;
};

export type BlockButton = {
	label: string;
	url: string;
	style?: 'primary' | 'secondary';
	openInNewTab?: boolean;
	/** When set, the button links to an existing item; the API resolves it to
	 * the item's current slug and writes it back to `url` before rendering. */
	reference?: { type: string; id: string; label?: string };
};

export type SectionLayout = 'full' | 'contained' | 'narrow';
export type SectionPadding = 'none' | 'small' | 'medium' | 'large';

export type SectionSettings = {
	layout?: SectionLayout;
	paddingTop?: SectionPadding;
	paddingBottom?: SectionPadding;
	anchor?: string;
	columns?: number;
};

/**
 * A column inside a TEXT or FEATURE_GRID section. The admin's ColumnEditor
 * writes `content.columns[]`; image is either a Media object (after picker
 * select) or a string URL on legacy data.
 */
/** A single icon/title/subtitle item in a column's list (Text module). */
export type ColumnListItem = {
	icon?: string;
	title?: string;
	subtitle?: string;
};

export type BlockColumn = {
	title?: string;
	content?: string;
	image?: MediaRef | string;
	listItems?: ColumnListItem[];
};

export type CarouselSlide = {
	title?: string;
	subtitle?: string;
	image?: MediaRef | string;
	overlayOpacity?: number;
	buttonLabel?: string;
	buttonUrl?: string;
};

export type CmsSection = {
	_type: string;
	_id?: string;
	label?: string;
	title?: string;
	subtitle?: string;
	order?: number;
	settings?: SectionSettings;
	content?: Record<string, unknown>;
};

export type CmsPage = {
	_id: string;
	slug: string;
	title: string;
	subtitle?: string;
	excerpt?: string;
	content?: string;
	status: 'draft' | 'published' | 'archived';
	/**
	 * Editor-defined template hint (e.g. "default", "centered", "wide-hero").
	 * Reserved for a future template engine; not yet consumed by any
	 * marketing-site renderer.
	 */
	template?: string;
	featuredImage?: MediaRef;
	sections: CmsSection[];
	seo?: SeoMeta;
	publishedAt?: string;
};

export type CmsProjectCategory = {
	_id: string;
	name: string;
	slug: string;
};

export type ProjectDateRange = {
	start?: string;
	end?: string;
	ongoing?: boolean;
};

export type CmsProject = {
	_id: string;
	slug: string;
	title: string;
	subtitle?: string;
	excerpt?: string;
	content?: string; // rich HTML body (Tiptap output)
	locationText?: string;
	dateRange?: ProjectDateRange;
	categories?: CmsProjectCategory[];
	featured?: { enabled?: boolean; page?: { _id: string; slug?: string } };
	featuredImage?: MediaRef;
	gallery?: MediaRef[];
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
	featuredImage?: MediaRef;
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
	/** Live policies (content present), as title + slug for footer links. */
	policies?: { title: string; slug: string }[];
	storefront?: {
		domain?: string;
	};
	siteStructure?: {
		homepageSlug?: string | null;
		blogSlug?: string | null;
		productsSlug?: string | null;
		productCategoriesSlug?: string | null;
		coursesSlug?: string | null;
		projectsSlug?: string | null;
	};
	seo?: {
		defaultTitle?: string;
		titleTemplate?: string;
		defaultDescription?: string;
		defaultOgImage?: string;
		faviconUrl?: string;
		appleTouchIconUrl?: string;
		generatedIcons?: {
			faviconIcoUrl?: string;
			favicon16Url?: string;
			favicon32Url?: string;
			favicon96Url?: string;
			favicon192Url?: string;
			favicon512Url?: string;
			appleTouchUrl?: string;
		};
		robots?: { allowIndexing?: boolean; extraDirectives?: string };
		sitemap?: {
			enabled?: boolean;
			includePages?: boolean;
			includeBlog?: boolean;
			includeProducts?: boolean;
			includeCategories?: boolean;
			customUrls?: {
				loc: string;
				lastmod?: string;
				priority?: number;
				changefreq?:
					| 'always'
					| 'hourly'
					| 'daily'
					| 'weekly'
					| 'monthly'
					| 'yearly'
					| 'never';
			}[];
		};
	};
	googleAnalytics?: {
		measurementId?: string;
		trackingEnabled?: boolean;
	};
	webmasterTools?: {
		googleSiteVerification?: string;
		bingSiteVerification?: string;
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

/**
 * A NavigationMenu inlined inside a mega-menu trigger item. Storefront
 * resolves these from the IDs in `megaMenuColumns`; their items are already
 * fully enhanced (refs resolved, children populated).
 */
export interface ResolvedMegaMenuColumn {
	_id: string;
	name: string;
	slug: string;
	title?: string;
	subtitle?: string;
	items: ResolvedMenuItem[];
}

export interface ResolvedMenuItem {
	_id: string;
	label: string;
	type: MenuItemType;
	url?: string;
	openInNewTab: boolean;
	order: number;
	cssClass?: string;
	icon?: string;
	/** Short paragraph rendered under the label in mega menus. */
	description?: string;
	/** Optional bold/lead text for card-style mega-menu columns. */
	headline?: string;
	/** When true, the front-end renders this item as a mega-menu trigger. */
	isMegaMenu?: boolean;
	/** Inlined column menus when `isMegaMenu` is true. */
	megaMenuColumns?: ResolvedMegaMenuColumn[];
	megaMenuTitle?: string;
	megaMenuSubtitle?: string;
	reference?: string;
	resolved?: { slug: string; title: string };
	children: ResolvedMenuItem[];
}

export interface NavigationMenu {
	_id: string;
	name: string;
	slug: string;
	location: NavigationLocation;
	/** Optional eyebrow rendered above the menu in front-end UI. */
	title?: string;
	/** Optional paragraph rendered under the title. */
	subtitle?: string;
	items: ResolvedMenuItem[];
}

export interface NavigationResponse {
	success: true;
	count: number;
	menus: NavigationMenu[];
}
