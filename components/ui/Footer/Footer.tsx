import { DigitalPotterIcon } from '@/components/icons';
import Image from 'next/image';
import React from 'react';
import FooterNav from './FooterNav';

const Footer = () => {
	return (
		<footer className="dp-container border-t-dp-green rounded-dp-5xl grid grid-cols-6 gap-9 border-t-8 py-12 lg:grid-cols-12 lg:py-20">
			<div className="col-span-6 flex flex-col items-center lg:col-span-3 lg:items-start lg:px-8">
				<DigitalPotterIcon width={119} height={72} />
				<small className="tex-center mt-5 lg:text-left">
					{new Date().getFullYear()} © Digital Potter, LLC
				</small>
			</div>
			<div className="col-start-1 col-end-7 lg:col-start-4 lg:col-end-10">
				<FooterNav />
			</div>
			<div className="col-span-6 lg:col-span-3">Social Media icons</div>
		</footer>
	);
};

export default Footer;
