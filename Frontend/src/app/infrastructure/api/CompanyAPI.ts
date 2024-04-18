import { Injectable } from "@angular/core";
import { ApiClient } from "./ApiClient";
import { Result } from "../../domain/abstractions/Result";
import { User } from "../../domain/entities/User";
import { Company, CompanySettings } from "../../domain/entities/Company";

@Injectable({
  providedIn: 'root'
})
export class CompanyAPI {
  constructor(private apiClient: ApiClient) {}

  async getCompany(id: string): Promise<Result<Company>> {
      const result = await this.apiClient.get<any>('api/company/' + id);
      if (result.isSuccess) {
        const { data: companyData } = result.value!;
        const company = Company.create(
			    companyData.id,
          companyData.name,
          CompanySettings.create(
            companyData.settings.theme
          )
        );
        return Result.Success(company);
      } else {
        return result;
      }
  }
}

export interface LoginResponse {
  token: string;
  user: User;
}
