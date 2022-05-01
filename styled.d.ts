/* eslint-disable @typescript-eslint/no-empty-interface */
import {} from 'styled-components';
import { ThemeType } from './components/styles/theme'; // Import type from above file
declare module 'styled-components' {
	export interface DefaultTheme extends ThemeType {}
}
