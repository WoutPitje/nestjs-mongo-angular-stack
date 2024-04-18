import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { User } from "../../domain/entities/User";
import { Error, Result } from "../../domain/abstractions/Result";
import { Writable } from "stream";

@Injectable({
  providedIn: 'root'
})
export class UserStore {
	readonly user: WritableSignal<Result<User> | undefined> = signal(undefined);

	readonly token: WritableSignal<Result<string>> = signal(Result.Failure<string>(new Error('Token.NotSet', 'Token  is not set')));

	readonly loading: WritableSignal<boolean> = signal(false);

	startLoading() {
		this.loading.set(true);
	}

	stopLoading() {
		this.loading.set(false);
	}

	getUser(): Signal<Result<User> | undefined> {
		return this.user;
	}

	setUser(user: Result<User>): Signal<Result<User> | undefined> {
		this.user.set(user);
		return this.getUser();
	}

	removeUser() {
		this.user.set(undefined);
	}

	getToken(): Signal<Result<string>> {
		return this.token;
	}

	setToken(token: Result<string>): Signal<Result<string>> {
		this.token.set(token);
		return this.getToken();
	}

	removeToken() {
		this.token.set(Result.Failure<string>(new Error('Token.NotSet', 'Token  is not set')));
	}
}
