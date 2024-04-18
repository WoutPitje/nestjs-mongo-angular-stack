import { Result } from '../../abstractions/result';
import { ValueObject } from '../../abstractions/valueObject';
import { invalidEmailError } from './errors/invalid.email.error';

export class Email extends ValueObject<string>{
	private key = "email";
	static create(email: string): Result<Email> {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) return Result.Failure<Email>(invalidEmailError);
		
		return Result.Success(new Email(email));
	}
}
