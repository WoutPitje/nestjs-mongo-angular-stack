import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { User } from "../../domain/entities/User";
import { Error, Result } from "../../domain/abstractions/Result";
import { Writable } from "stream";
import { Company } from "../../domain/entities/Company";

@Injectable({
  providedIn: 'root'
})
export class CompanyStore {


	readonly company: WritableSignal<Result<Company> | undefined> = signal(undefined);
	readonly theme: WritableSignal<string> = signal('light')

	setCompany(company: Result<Company>) {
		this.company.set(company);
		return this.company;
	}

	setTheme(theme: string) {
		this.theme.set(theme);
		return this.theme;
	}


}
