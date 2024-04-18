import { User } from "../../domain/aggregates/user/user";

export class UserDto {
	id: string;
	email: string;
	firstName: string;
	preposition?: string;
	lastName: string;

	static fromModel(user:User) {
		let dto = new UserDto();
		dto.id = user.id.value
		dto.email = user.email.value
		dto.firstName = user.firstName.value
		dto.preposition = user.preposition?.value
		dto.lastName = user.lastName.value

		return dto;
	}
}
