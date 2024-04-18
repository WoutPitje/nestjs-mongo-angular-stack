import { Result, Error } from '../../abstractions/result';
import { Id } from '../../abstractions/id';

export class CompanyId extends Id {
  private key = 'CompanyId';
  public static create(id?: string): Result<CompanyId> {
    if (!id) {
      return Result.Success(new CompanyId(Id.generateId()));
    }
    try {
      return Result.Success(new CompanyId(id));
    } catch {
      return Result.Failure<CompanyId>(
        new Error('InvalidID', 'Not a valid UserId'),
      );
    }
  }
}
