import { UseCase } from '../../domain/abstractions/UseCase';
import { Injectable, inject } from '@angular/core';
import { UserStore } from '../../infrastructure/state/UserStore';
import { TokenStorage } from '../../infrastructure/localStorage/TokenStorage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutCommand implements UseCase<null, Promise<void>> {

	constructor(private userStore: UserStore, private tokenStorage:TokenStorage, private router: Router) {}

	async execute(): Promise<void> {
		this.userStore.removeToken();
		this.userStore.removeUser();
		this.tokenStorage.removeToken();

		this.router.navigate(['login']);
	}
}
