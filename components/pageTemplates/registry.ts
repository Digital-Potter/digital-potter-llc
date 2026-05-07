import type { ComponentType } from 'react';
import type { CmsPage } from '@/helpers/cms/types';

import { AboutTemplate } from './AboutTemplate';
import { BlogTemplate } from './BlogTemplate';
import { CmsMarketingTemplate } from './CmsMarketingTemplate';
import { ContactTemplate } from './ContactTemplate';
import { DefaultTemplate } from './DefaultTemplate';
import { HomepageTemplate } from './HomepageTemplate';
import { MaintenanceTemplate } from './MaintenanceTemplate';
import { MobileDevelopmentTemplate } from './MobileDevelopmentTemplate';
import { PortfolioTemplate } from './PortfolioTemplate';
import { PricingTemplate } from './PricingTemplate';
import { SelfHostedTemplate } from './SelfHostedTemplate';
import { ServicesTemplate } from './ServicesTemplate';
import { WebServicesTemplate } from './WebServicesTemplate';

/**
 * All page templates accept a `page` prop so the dynamic catch-all can
 * forward the CMS Page (used by DefaultTemplate to surface title/subtitle).
 * Templates that ignore the page just render their static body.
 */
export type TemplateProps = { page: CmsPage | null };
export type TemplateComponent = ComponentType<TemplateProps>;

/**
 * Maps `page.template` values authored in the CMS to a React component on
 * the marketing site. Add a new entry here when introducing a new template.
 *
 * Naming aliases: short names (`about`, `mobile`, `contact`) point at the
 * same component as the long-form names so editors can use whichever they
 * prefer.
 */
export const templateRegistry: Record<string, TemplateComponent> = {
	homepage: HomepageTemplate,
	services: ServicesTemplate,
	pricing: PricingTemplate,
	about: AboutTemplate,
	'about-digital-potter': AboutTemplate,
	'mobile-development': MobileDevelopmentTemplate,
	mobile: MobileDevelopmentTemplate,
	'web-services': WebServicesTemplate,
	'web-development': WebServicesTemplate,
	web: WebServicesTemplate,
	maintenance: MaintenanceTemplate,
	'self-hosted': SelfHostedTemplate,
	selfhosted: SelfHostedTemplate,
	contact: ContactTemplate,
	'contact-digital-potter': ContactTemplate,
	cms: CmsMarketingTemplate,
	portfolio: PortfolioTemplate,
	projects: PortfolioTemplate,
	'projects-listing': PortfolioTemplate,
	blog: BlogTemplate,
	'blog-listing': BlogTemplate,
	default: DefaultTemplate,
};

/**
 * Resolve a template name to a component, falling back to DefaultTemplate
 * when the name is missing or unknown. Always returns a renderable component.
 */
export function resolveTemplate(
	name: string | undefined | null,
): TemplateComponent {
	if (!name) return DefaultTemplate;
	const key = name.toLowerCase().trim();
	return templateRegistry[key] ?? DefaultTemplate;
}
