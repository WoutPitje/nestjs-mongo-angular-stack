import { Result } from '../../../abstractions/result';
import { ValueObject } from '../../../abstractions/valueObject';

export class Theme extends ValueObject<string> {
  private key = 'CompanyTheme';
  static create(theme: string): Result<Theme> {
    return Result.Success(new Theme(theme));
  }
}
