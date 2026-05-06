import { partitionPlans } from '@/helpers/cms/plans';

const plan = (slug: string) => ({
	_id: slug,
	slug,
	title: slug,
	features: [],
});

describe('partitionPlans', () => {
	it('partitions by slug prefix', () => {
		const out = partitionPlans([
			plan('hosting-starter'),
			plan('module-restaurant'),
			plan('module-ecommerce'),
			plan('enterprise'),
			plan('hosting-growth'),
		]);
		expect(out.hosting).toHaveLength(2);
		expect(out.modules).toHaveLength(2);
		expect(out.enterprise).toHaveLength(1);
	});

	it('ignores unknown prefixes', () => {
		const out = partitionPlans([plan('misc-foo'), plan('module-x')]);
		expect(out.hosting).toHaveLength(0);
		expect(out.modules).toHaveLength(1);
		expect(out.enterprise).toHaveLength(0);
	});
});
