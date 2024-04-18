// place files you want to import through the `$lib` alias in this folder.
export const appURL = import.meta.env.MODE ===
	'development' ?
		'http://app.appname.localhost' :
		'https://app.appname.pitdigital.nl';
