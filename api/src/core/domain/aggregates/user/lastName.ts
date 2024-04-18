import { Result } from '../../abstractions/result';
import { ValueObject } from '../../abstractions/valueObject';

export class LastName extends ValueObject<string>{
	private key = "Email";
	static create(lastName: string): Result<LastName> {
		return Result.Success(new LastName(lastName));
	}
}
