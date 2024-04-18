import { Result } from '../../abstractions/result';
import { ValueObject } from '../../abstractions/valueObject';

export class CompanyName extends ValueObject<string> {
  private key = 'CompanyName';
  static create(companyName: string): Result<CompanyName> {
    return Result.Success(new CompanyName(companyName));
  }
}
