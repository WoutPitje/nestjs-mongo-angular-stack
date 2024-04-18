import { User } from '../../domain/entities/User';
import { UseCase } from '../../domain/abstractions/UseCase';
import { Injectable, Signal } from '@angular/core';
import { UserStore } from '../../infrastructure/state/UserStore';
import { Result } from '../../domain/abstractions/Result';

@Injectable({
  providedIn: 'root'
})
export class GetMeCommand implements UseCase<null, Signal<Result<User> | undefined>> {

	constructor(private store: UserStore) {}

	execute(): Signal<Result<User> | undefined> {
		return this.store.getUser();
	}
}
