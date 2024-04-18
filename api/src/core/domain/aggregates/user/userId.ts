import { Result, Error } from '../../abstractions/result';
import { Id } from '../../abstractions/id';

export class UserId extends Id {
  private key = 'UserId';
  public static create(id?: string): Result<UserId> {
    if (!id) {
      return Result.Success(new UserId(Id.generateId()));
    }
    try {
      return Result.Success(new UserId(id));
    } catch {
      return Result.Failure<UserId>(
        new Error('InvalidID', 'Not a valid UserId'),
      );
    }
  }
}
