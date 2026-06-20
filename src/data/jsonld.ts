import { studio, leaveSmart } from './studio';

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: studio.name,
  url: studio.url,
  logo: `${studio.url}/icon-512.png`,
  description: studio.description,
  email: studio.email,
  foundingDate: studio.foundingYear,
  founder: { '@type': 'Person', name: studio.founder },
  sameAs: studio.socials.map((s) => s.href),
};

export const webSiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: studio.name,
  url: studio.url,
  publisher: { '@type': 'Organization', name: studio.name, url: studio.url },
};

export const leaveSmartLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: leaveSmart.name,
  description: leaveSmart.description,
  url: `${studio.url}/leave-smart/`,
  installUrl: leaveSmart.appStoreUrl,
  operatingSystem: 'iOS 15.1 or later',
  applicationCategory: 'ProductivityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: studio.name, url: studio.url },
};

export const breadcrumbLd = (crumbs: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `${studio.url}${c.path}`,
  })),
});
