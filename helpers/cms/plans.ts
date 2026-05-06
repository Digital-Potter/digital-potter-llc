import { apiGet } from './client';
import type { CmsSubscriptionPlan, StorefrontList } from './types';

export const fetchSubscriptionPlans = () =>
	apiGet<StorefrontList<CmsSubscriptionPlan>>(
		'/api/storefront/subscription-plans',
	).then((r) => r.items);

export type PartitionedPlans = {
	hosting: CmsSubscriptionPlan[];
	modules: CmsSubscriptionPlan[];
	enterprise: CmsSubscriptionPlan[];
};

export function partitionPlans(plans: CmsSubscriptionPlan[]): PartitionedPlans {
	const hosting: CmsSubscriptionPlan[] = [];
	const modules: CmsSubscriptionPlan[] = [];
	const enterprise: CmsSubscriptionPlan[] = [];
	for (const p of plans) {
		if (p.slug.startsWith('hosting-')) hosting.push(p);
		else if (p.slug.startsWith('module-')) modules.push(p);
		else if (p.slug.startsWith('enterprise')) enterprise.push(p);
	}
	return { hosting, modules, enterprise };
}
