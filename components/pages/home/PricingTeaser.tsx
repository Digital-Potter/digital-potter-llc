import { ButtonLink } from '@/components/ui/Button';
import { FRONTEND_ONETIME, HOSTING_MONTHLY } from '@/lib/pricing';

const monthly = `$${HOSTING_MONTHLY}`;
const oneTime = `$${FRONTEND_ONETIME.toLocaleString()}`;

const promises = [
	'You own the code',
	'No per-page fees',
	'No traffic gates',
	'No lock-in',
];

export default function PricingTeaser() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="border-dp-dark-green/20 bg-dp-dark-green/5 mx-auto max-w-4xl rounded-3xl border px-8 py-12 text-center md:px-14">
				<h2 className="text-3xl md:text-4xl">
					Transparent pricing. No surprises.
				</h2>
				<p className="text-dp-dark font-primary-font mt-6 text-xl font-bold md:text-2xl">
					Custom site from <span className="text-dp-dark-green">{oneTime}</span>{' '}
					+ <span className="text-dp-dark-green">{monthly}/month</span> for
					hosting & theDavid
				</p>
				<p className="text-dp-body-soft mx-auto mt-3 max-w-2xl text-base md:text-lg">
					The base price is the foundation. Custom features are quoted in your
					proposal — in writing, before you commit.
				</p>
				<ul className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
					{promises.map((p) => (
						<li
							key={p}
							className="text-dp-body/85 flex items-center gap-2 text-sm font-bold md:text-base"
						>
							<span
								aria-hidden
								className="bg-dp-green inline-block h-2 w-2 rounded-full"
							/>
							{p}
						</li>
					))}
				</ul>
				<div className="mt-9">
					<ButtonLink href="/digital-potter-pricing" variant="solid">
						See Pricing & Plans
					</ButtonLink>
				</div>
			</div>
		</section>
	);
}
