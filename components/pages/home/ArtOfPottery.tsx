export default function ArtOfPottery() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-balance">The Art of Digital Pottery</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Just as a potter shapes clay into beautiful, functional vessels, we
					shape code into elegant, powerful digital solutions.
				</p>
			</div>
			<div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
				<div>
					<h3 className="text-2xl md:text-3xl">Studio philosophy</h3>
					<p className="text-dp-body/80 mt-4 text-base md:text-lg">
						Every project begins with understanding your business, your
						customers, and the problem you&apos;re really solving. We refuse
						templates. We build each frontend from a blank canvas, sized to your
						story and shaped by hand.
					</p>
				</div>
				<div>
					<h3 className="text-2xl md:text-3xl">Outcome focus</h3>
					<p className="text-dp-body/80 mt-4 text-base md:text-lg">
						Pretty isn&apos;t enough. The sites we ship convert visitors, handle
						traffic, and stay maintainable for years. We measure success the way
						you do — by the business it grows.
					</p>
				</div>
			</div>
		</section>
	);
}
