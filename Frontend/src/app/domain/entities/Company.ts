export class Company {
	id: string;
	name: string;
	settings: CompanySettings;

	private constructor(id: string, name: string, settings: CompanySettings) {
		this.id = id;
		this.name = name;
		this.settings = settings;
	}

	public static create(id: string, name: string, settings: CompanySettings) {
		return new Company(id, name, settings);
	}
}

export class CompanySettings {
	theme: string;

	private constructor(theme: string) {
		this.theme = theme;
	}

	public static create(theme: string) {
		return new CompanySettings(theme);
	}
}
