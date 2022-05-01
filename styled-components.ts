// styled-components.ts
import * as styledComponents from 'styled-components/native';

import { ThemeType } from './components/styles/theme';

const {
	default: styled,
	css,
	ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<ThemeType>;

export { css, ThemeProvider };
export default styled;
