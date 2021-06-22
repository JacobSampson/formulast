import { borderSize, fontSizes } from './constants';

interface IPalette {
	main: string;
	contrastText: string;
}

export type Theme = {
	borderRadius: number | string;
	fontSize: {
		xsmall: number | string;
		small: number | string;
		medium: number | string;
		large: number | string;
		xlarge: number | string;
	};
	screen: {
		xsmall: string;
		small: string;
		medium: string;
		large: string;
	};
	palette: {
		common: {
		  black: string;
		  white: string;
		}
		primary: IPalette;
		secondary: IPalette;
	 };
	shadow: {
		light: string;
	}
}

const baseTheme = {
	borderRadius: `${borderSize}px`,
	fontSize: {
		xsmall: `${fontSizes.xsmall}px`,
		small: `${fontSizes.small}px`,
		medium: `${fontSizes.medium}px`,
		large: `${fontSizes.large}px`,
		xlarge: `${fontSizes.xlarge}px`
	},
	screen: {
		xsmall: '750px',
		small: '900px',
		medium: '1150px',
		large: '1500px'
	},
	shadow: {
		light: '#EAE8EC'
	}
};

export const lightTheme: Theme = {
	...baseTheme,
	palette: {
	  common: {
		black: '#222831',
		white: '#fff'
	  },
	  primary: {
		main: '#463355',
		contrastText: '#fff'
	  },
	  secondary: {
		main: '#62A87C',
		contrastText: '#fff'
	  }
	}
};

export const darkTheme: Theme = {
	...baseTheme,
	palette: {
	  common: {
		black: '#0238506',
		white: '#00000'
	  },
	  primary: {
		main: '#234063',
		contrastText: '#00000'
	  },
	  secondary: {
		main: '#087636',
		contrastText: '#00000'
	  }
	}
};
