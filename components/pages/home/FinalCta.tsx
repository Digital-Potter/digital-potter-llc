import ClosingCta from '@/components/shared/ClosingCta';

type FinalCtaProps = {
	href: string;
	label: string;
};

export default function FinalCta({ href, label }: FinalCtaProps) {
	return <ClosingCta secondaryHref={href} secondaryLabel={label} />;
}
