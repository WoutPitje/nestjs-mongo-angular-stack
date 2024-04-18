import { Result } from '../../abstractions/result';
import { ValueObject } from '../../abstractions/valueObject';

export class FirstName extends ValueObject<string> {
  private key = 'FirstName';
  static create(firstname: string): Result<FirstName> {
    return Result.Success(new FirstName(firstname));
  }
}
