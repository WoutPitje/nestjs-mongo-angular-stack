import { AggregateRoot } from "../abstractions/AggregateRoot";

export class User implements AggregateRoot {
	public id: string;
	public firstName: string;
	public preposition: string;
	public lastName: string;
	public email: string;
	public companyId: string;

	private constructor(id: string, firstName: string, preposition: string, lastName: string, email:string, companyId: string) {
		this.firstName = firstName;
		this.preposition = preposition;
		this.lastName = lastName;
		this.email = email;
		this.companyId = companyId;
	}

	public static create(id: string, firstName: string, preposition: string, lastName: string, email:string, companyId: string) {
		return new User(id, firstName, preposition, lastName, email, companyId);
	}
}
