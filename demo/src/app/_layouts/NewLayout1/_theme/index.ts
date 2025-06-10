import { createJumboTheme } from '@jumbo/utilities/helpers';
import { footerTheme } from './footer/default';
import { headerTheme } from './header/default';
import { mainTheme } from './main/default';
import { sidebarTheme } from './sidebar/default';

export const initTheme = createJumboTheme(
  mainTheme,
  headerTheme,
  sidebarTheme,
  footerTheme
);
