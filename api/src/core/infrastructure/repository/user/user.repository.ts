import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from '../../../domain/abstractions/result';
import { Email } from '../../../domain/aggregates/user/email';
import { User } from '../../../domain/aggregates/user/user';
import { UserId } from '../../../domain/aggregates/user/userId';
import { databaseError } from '../errors/database.error';
import { userNotFoundError } from '../errors/user.notfound.error';
import {
  IUserDocument,
  userCollectionName,
  userFromModel,
} from './user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(userCollectionName) private userModel: Model<IUserDocument>,
  ) {}

  async findOneByEmail(email: Email): Promise<Result<User>> {
    let userDoc = null;
    try {
      userDoc = await this.userModel.findOne({ email: email.value }).exec();
    } catch (e) {
      return Result.Failure<User>(databaseError);
    }

    if (!userDoc) {
      return Result.Failure<User>(userNotFoundError);
    }

    const user = userFromModel(userDoc);
    return Result.Success<User>(user);
  }

  async findById(id: UserId): Promise<Result<User>> {
    let userDoc = null;
    try {
      userDoc = await this.userModel.findById(id.value).exec();
    } catch (e) {
      return Result.Failure<User>(databaseError);
    }

    if (!userDoc) {
      return Result.Failure<User>(userNotFoundError);
    }

    const user = userFromModel(userDoc);
    return Result.Success<User>(user);
  }
}
