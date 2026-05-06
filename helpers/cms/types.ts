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

export type CmsBlogPost = {
	_id: string;
	slug: string;
	title: string;
	excerpt?: string;
	featuredImage?: { url: string; alt?: string };
	sections: CmsSection[];
	seo?: SeoMeta;
	publishedAt?: string;
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
