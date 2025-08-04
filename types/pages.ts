export interface PageProps extends NavProps {
	isLive: boolean;
	isMenu: boolean;
	title: string;
	subtitle: string;
	content: string;
	seotitle: string;
	extraboxes: ExtraBoxesProps[];
	featuredimg: string;
	othersizes: {
		tablet: '';
		mobile: '';
	};
	fullname: string;
	photo: string;
	gallery: [];
	updatedAt: string;
	createdAt: string;
}

export interface NavProps {
	_id: string;
	position: number;
	label: string;
	isSubmenu?: boolean;
	isUnder?: string;
	link: string;
}

export interface ExtraBoxesProps {
	_id: string;
	econtent: string;
	eposition: number;
	esubtitle: string;
	eimg?: string;
	etitle: string;
	updatedAt?: string;
	createdAt?: string;
}
