import { ApiBody, ApiProperty } from "@nestjs/swagger";

export  class LoginRequest {
	@ApiProperty({example: "wout@pitdigital.nl"})
	email: string;
	@ApiProperty({example: "password"})
	password: string;
}
