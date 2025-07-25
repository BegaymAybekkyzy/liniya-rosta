import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['ru', 'ky'],
    defaultLocale: 'ru',
    localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];
