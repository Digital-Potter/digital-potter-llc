type ProjectGalleryProps = {
	images: { url: string; alt?: string }[];
	title?: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
	if (!images || images.length === 0) return null;

	return (
		<section className="dp-container py-12 md:py-16">
			{title && (
				<div className="mx-auto mb-10 max-w-4xl text-center">
					<h2 className="text-balance">{title}</h2>
				</div>
			)}
			<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{images.map((img, i) => (
					<li
						key={`${img.url}-${i}`}
						className="dp-box-design relative aspect-[4/3] overflow-hidden rounded-2xl"
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={img.url}
							alt={img.alt ?? ''}
							className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
