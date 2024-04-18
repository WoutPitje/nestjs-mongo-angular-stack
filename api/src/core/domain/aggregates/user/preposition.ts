import { Result } from '../../abstractions/result';
import { ValueObject } from '../../abstractions/valueObject';

export class Preposition extends ValueObject<string>{
	private key = "Preposition";
	static create(preposition: string): Result<Preposition> {
		return Result.Success(new Preposition(preposition));
	}
}
