import { Result } from '../../abstractions/result';
import { ValueObject } from '../../abstractions/valueObject';

export class PasswordHash extends ValueObject<string>{
	private key = "passwordHash";
	static create(passwordHash: string): Result<PasswordHash> {
		return Result.Success(new PasswordHash(passwordHash));
	}
}
