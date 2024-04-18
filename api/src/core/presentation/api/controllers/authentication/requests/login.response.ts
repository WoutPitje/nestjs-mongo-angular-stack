import { UserDto } from "../../../../../application/dtos/user.dto";
import { User } from "../../../../../domain/aggregates/user/user";

export class LoginResponse {
	user: UserDto
	token: string

	static fromModel(user:User, token:string) {
		let loginResponse = new LoginResponse();
		loginResponse.user = UserDto.fromModel(user);
		loginResponse.token = token;

		return loginResponse;
	}
}
