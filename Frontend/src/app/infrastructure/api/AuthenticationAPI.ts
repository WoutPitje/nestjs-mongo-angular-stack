import { Injectable } from "@angular/core";
import { ApiClient } from "./ApiClient";
import { Result } from "../../domain/abstractions/Result";
import { User } from "../../domain/entities/User";
import { LoginDto } from "../../application/auth/LoginCommand";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationAPI {
  constructor(private apiClient: ApiClient) {}

  async login(body: LoginDto): Promise<Result<LoginResponse>> {
      const result = await this.apiClient.post<any>('api/authentication/login', body);
      if (result.isSuccess) {
        const { data: { token: token, user: userData} } = result.value!;
        const user = User.create(
		      userData.id,
          userData.firstName,
          userData.preposition,
          userData.lastName,
          userData.email,
		      userData.companyId,
        );
        return Result.Success({ token, user });
      } else {
        return result;
      }
  }

  async loginWithToken(token: string): Promise<Result<LoginResponse>> {
      const result = await this.apiClient.get<any>('api/authentication/me', {'Authorization': `Bearer ${token}`});
      if (result.isSuccess) {
        const { data: userData } = result.value!;
        const user = User.create(
		  userData.id,
          userData.firstName,
          userData.preposition,
          userData.lastName,
          userData.email,
		  userData.companyId
        );
        return Result.Success({ token, user });
      } else {
        return result;
      }
  }
}

export interface LoginResponse {
  token: string;
  user: User;
}
