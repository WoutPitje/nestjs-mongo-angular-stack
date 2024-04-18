import * as mongoose from 'mongoose';
import { Email } from '../../../domain/aggregates/user/email';
import { FirstName } from '../../../domain/aggregates/user/firstName';
import { Preposition } from '../../../domain/aggregates/user/preposition';
import { LastName } from '../../../domain/aggregates/user/lastName';
import { PasswordHash } from '../../../domain/aggregates/user/passwordHash';
import { UserId } from '../../../domain/aggregates/user/userId';
import { User } from '../../../domain/aggregates/user/user';

interface IUserDocument extends mongoose.Document {
  _id: string;
  email: string;
  firstName: string;
  preposition?: string;
  lastName: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  preposition: { type: String, default: null },
  lastName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const userFromModel = (document: IUserDocument): User => {
  const user = User.create(
    Email.create(document.email).value!,
    FirstName.create(document.firstName).value!,
    LastName.create(document.lastName).value!,
    PasswordHash.create(document.passwordHash).value!,
    document.preposition
      ? Preposition.create(document.preposition).value!
      : undefined,
  );

  Reflect.set(user, 'createdAt', document.createdAt);
  Reflect.set(user, 'updatedAt', document.updatedAt);
  Reflect.set(user, 'id', UserId.create(document._id).value!);

  return user;
};

const userToModel = (user: User) => {
  return {
    _id: user.id.value,
    email: user.email.value,
    firstName: user.firstName.value,
    preposition: user.preposition?.value,
    lastName: user.lastName.value,
    passwordHash: user.passwordHash.value,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const UserDocument = mongoose.model<IUserDocument>('User', UserSchema);

const userCollectionName = 'users';

export {
  UserDocument,
  UserSchema,
  IUserDocument,
  userCollectionName,
  userFromModel,
  userToModel,
};
