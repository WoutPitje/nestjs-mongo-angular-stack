import { User } from '../../domain/entities/User';
import { UseCase } from '../../domain/abstractions/UseCase';
import { Injectable, Signal } from '@angular/core';
import { UserStore } from '../../infrastructure/state/UserStore';
import { Result } from '../../domain/abstractions/Result';
import { CompanyStore } from '../../infrastructure/state/CompanyStore';
import { CompanyAPI } from '../../infrastructure/api/CompanyAPI';
import { Company } from '../../domain/entities/Company';
import { ThemeStorage } from '../../infrastructure/localStorage/ThemeStorage';

@Injectable({
  providedIn: 'root'
})
export class FetchCurrentCompanyCommand implements UseCase<void, void>{

	constructor(private store: CompanyStore, private api: CompanyAPI, private userStore: UserStore, private themeStorage: ThemeStorage) {}

	async execute() {
		let userResult = this.userStore.user();

		if(!userResult) {
			return;
		}
		let companyResult = await this.api.getCompany(this.userStore.user()!.value!.companyId);

		let theme = companyResult?.value ? companyResult?.value?.settings.theme : "";

		if(theme) {
			this.themeStorage.setTheme(theme);
			this.store.setTheme(theme);
		}

		this.themeStorage.setDefaultTheme();
		this.store.setCompany(companyResult);
	}
}
