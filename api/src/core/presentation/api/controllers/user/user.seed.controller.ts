import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../../domain/aggregates/user/user';
import * as bcrypt from 'bcrypt';
import {
  IUserDocument,
  userToModel,
  userCollectionName,
} from '../../../../infrastructure/repository/user/user.schema';
import { Email } from '../../../../domain/aggregates/user/email';
import { LastName } from '../../../../domain/aggregates/user/lastName';
import { PasswordHash } from '../../../../domain/aggregates/user/passwordHash';
import { Preposition } from '../../../../domain/aggregates/user/preposition';
import { FirstName } from '../../../../domain/aggregates/user/firstName';

@Controller('users/seed')
export class UserSeedController {
  constructor(
    @InjectModel(userCollectionName) private userModel: Model<IUserDocument>,
  ) {}

  @Get()
  async seed(): Promise<{ message: string; data?: User[]; error?: string }> {
    const usersData = [
      {
        email: 'wout@pitdigital.nl',
        firstName: 'Wout',
        lastName: 'Pittens',
        password: 'password', // Plain-text here, but will be hashed below
      },
      {
        email: 'anoukvanbeynum@gmail.com',
        firstName: 'Anouk',
        lastName: 'Beynum',
        preposition: 'van',
        password: 'password', // Plain-text here, but will be hashed below
      },
    ];

    const createdUsers: User[] = [];

    for (const userData of usersData) {
      const hash = await bcrypt.hash(userData.password, 10); // Properly hash the password

      const existingUser = await this.userModel
        .findOne({ email: userData.email })
        .exec();
      if (existingUser) {
        continue;
      }

      // Using domain aggregate methods to ensure invariants
      const user = User.create(
        Email.create(userData.email).value!,
        FirstName.create(userData.firstName).value!,
        LastName.create(userData.lastName).value!,
        PasswordHash.create(hash).value!,
        userData.preposition
          ? Preposition.create(userData.preposition).value!
          : undefined,
      );

      const userModel = new this.userModel(userToModel(user));

      await userModel.save();
      createdUsers.push(user);
    }

    if (createdUsers.length > 0) {
      return { message: 'Users seeded', data: createdUsers };
    } else {
      return { message: 'No new users were added' };
    }
  }
}
