import { User } from '../../domain/entities/User';
import { UseCase } from '../../domain/abstractions/UseCase';
import { Injectable, Signal } from '@angular/core';
import { UserStore } from '../../infrastructure/state/UserStore';
import { Result } from '../../domain/abstractions/Result';
import { AuthenticationAPI } from '../../infrastructure/api/AuthenticationAPI';
import { TokenStorage } from '../../infrastructure/localStorage/TokenStorage';

@Injectable({
  providedIn: 'root'
})
export class LoginCommand implements UseCase<LoginDto, Promise<void>> {

	constructor(private api:AuthenticationAPI, private store: UserStore, private tokenStorage:TokenStorage) {}

	async execute(loginDto: LoginDto): Promise<void> {
		this.store.startLoading();
		let response = await this.api.login(loginDto);

		if(response.isFailure) {
			this.store.setToken(Result.Failure(response.getErrors()));
			this.store.setUser(Result.Failure(response.getErrors()));
			this.store.stopLoading();
			return;
		}

		this.store.setToken(Result.Success(response.value!.token));
		this.tokenStorage.setToken(response.value!.token);
		this.store.setUser(Result.Success(response.value!.user));
		this.store.stopLoading();

	}
}

export interface LoginDto {
	email: string;
	password: string;
}
