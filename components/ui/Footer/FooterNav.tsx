import React from 'react';
import { PageProps } from '@/types/pages';
import { getAllPages } from '@/helpers/api-connections/pagesData';
import Link from 'next/link';

const FooterNav = async () => {
	const menuData: PageProps[] = await getAllPages();
	return (
		<nav>
			<ul>
				{menuData.map((page: PageProps) => {
					if (page.isLive && page.label !== 'Home') {
						if (page.link.includes('about')) {
							return (
								<li key={page._id}>
									<Link href={page.link}>About Digital Potter</Link>
								</li>
							);
						}
					}
				})}
			</ul>
		</nav>
	);
};

export default FooterNav;
