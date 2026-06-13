import { apiGet } from './client';

/** A single legal policy resolved by slug, served from store settings. */
export interface CmsPolicy {
	title: string;
	slug: string;
	content: string;
}

type PolicyDetailResponse = {
	success: true;
	policy: CmsPolicy;
};

export const fetchPolicy = (slug: string) =>
	apiGet<PolicyDetailResponse>(`/api/storefront/policies/${slug}`).then(
		(r) => r.policy,
	);

export async function fetchPolicyBySlugOrNull(
	slug: string,
): Promise<CmsPolicy | null> {
	try {
		return await fetchPolicy(slug);
	} catch (err) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(`[cms] fetchPolicy(${slug}) failed:`, err);
		}
		return null;
	}
}
