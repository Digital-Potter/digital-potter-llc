export type Testimonial = {
	id: string;
	quote: string;
	name: string;
	company: string;
	source: string;
	/** Portfolio project slug this client maps to, when one exists. */
	projectSlug?: string;
};

// Real client testimonials migrated from digitalpotter.io.
// Customer wording is preserved; only the legacy company-name references
// (Plitz Corp / Plitz Corporation / Plitz Web Company) were updated to
// Digital Potter LLC per the rebrand.
export const testimonials: Testimonial[] = [
	{
		id: 'verity-electric',
		quote:
			"Professional website and design. Norman knows what he is doing, what he says is true, he just don't take a template and added my info, he created my website as I wanted, and now my website is hosted with him and runs fast and smooth. Just recently started online reputation and I got 5 good reviews in the first week.",
		name: 'Louis Samaritano',
		company: 'Verity Electric Inc.',
		source: 'Alignable',
	},
	{
		id: 'll-hair',
		quote:
			"The improved site, lauded internally and externally, is much easier for customers to use. Digital Potter LLC's responsiveness and understanding of digital technologies are hallmarks of their work. They also bring creative ideas of their own to the table at a reasonable value.",
		name: 'Laurie Blumstein',
		company: 'L&L Hair Products',
		source: 'Clutch',
	},
	{
		id: 'hair-we-share',
		quote:
			'Outstanding professional service. Digital Potter LLC is kind and patient and delivers a beautiful website. Highly recommend.',
		name: 'Suzanne Chimera',
		company: 'Hair We Share',
		source: 'Facebook',
	},
	{
		id: 'fellerman-glass',
		quote:
			'Digital Potter LLC did a great job from initial contact to tutoring for running my web site. Norman very patient and creative. Great job!',
		name: 'Stephen Fellerman',
		company: 'Fellerman Glass',
		source: 'Bark',
	},
];

export function getTestimonial(id: string): Testimonial {
	const t = testimonials.find((x) => x.id === id);
	if (!t) throw new Error(`Unknown testimonial id: ${id}`);
	return t;
}
