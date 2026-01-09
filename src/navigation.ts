import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['cs', 'en', 'tr', 'ar', 'de', 'fr'],
  defaultLocale: 'cs'
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
