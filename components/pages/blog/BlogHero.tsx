type BlogHeroProps = {
	totalPosts?: number;
};

export default function BlogHero({ totalPosts }: BlogHeroProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Notes from the studio
				</p>
				<h1 className="mt-6 text-balance">Fresh ideas & expert tips.</h1>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					Field notes on building custom websites and apps, opinions on the
					tools we use every day, and the occasional rant about why the
					template-builder economy is bad for small businesses.
				</p>
				{totalPosts ? (
					<p className="text-dp-body-soft mt-6 text-sm">
						{totalPosts} {totalPosts === 1 ? 'post' : 'posts'} and counting.
					</p>
				) : null}
			</div>
		</section>
	);
}
