import { User } from '../../domain/entities/User';
import { UseCase } from '../../domain/abstractions/UseCase';
import { Injectable, Signal } from '@angular/core';
import { UserStore } from '../../infrastructure/state/UserStore';
import { Result } from '../../domain/abstractions/Result';
import { CompanyStore } from '../../infrastructure/state/CompanyStore';
import { CompanyAPI } from '../../infrastructure/api/CompanyAPI';
import { Company } from '../../domain/entities/Company';

@Injectable({
  providedIn: 'root'
})
export class GetCurrentCompanyCommand implements UseCase<null ,Signal<Result<Company> | undefined>>{

	constructor(private store: CompanyStore) {}

	execute() {
		return this.store.getCompany();
	}
}
