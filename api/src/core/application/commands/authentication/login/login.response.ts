import { User } from "../../../../domain/aggregates/user/user";

export interface LoginCommandResponse {
	user: User;
	token: string;
}
