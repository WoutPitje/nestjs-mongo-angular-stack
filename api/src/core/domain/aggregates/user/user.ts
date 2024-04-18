import { Email } from './email';
import { AggregateRoot } from '../../abstractions/aggregateRoot';
import { UserId } from './userId';
import { FirstName } from './firstName';
import { Preposition } from './preposition';
import { LastName } from './lastName';
import { PasswordHash } from './passwordHash';

export class User extends AggregateRoot {
  public readonly id: UserId;
  public readonly email: Email;
  public readonly firstName: FirstName;
  public readonly preposition?: Preposition;
  public readonly lastName: LastName;
  public readonly passwordHash: PasswordHash;

  private constructor(
    id: UserId,
    email: Email,
    firstName: FirstName,
    lastname: LastName,
    passwordHash: PasswordHash,
    preposition?: Preposition,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.preposition = preposition;
    this.lastName = lastname;
    this.passwordHash = passwordHash;
  }

  public static create(
    email: Email,
    firstName: FirstName,
    lastname: LastName,
    passwordHash: PasswordHash,
    preposition?: Preposition,
  ) {
    const user = new User(
      UserId.create().value!,
      email,
      firstName,
      lastname,
      passwordHash,
      preposition,
    );
    user.created();
    user.updated();
    return user;
  }
}
