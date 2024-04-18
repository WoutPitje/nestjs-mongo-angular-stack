import { Injectable } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MeCommand } from './me.command';
import { Result } from '../../../../domain/abstractions/result';
import { User } from '../../../../domain/aggregates/user/user';
import { JwtService } from '@nestjs/jwt';
import { tokenInvalidError } from '../../../errors/token.invalid.error';
import { UserRepository } from '../../../../infrastructure/repository/user/user.repository';
import { UserId } from '../../../../domain/aggregates/user/userId';

@CommandHandler(MeCommand)
@Injectable()
export class MeCommandHandler implements ICommandHandler<MeCommand> {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository, // Assuming you have a UserRepository
  ) {}

  async execute(command: MeCommand): Promise<Result<User>> {
    const decoded = this.jwtService.decode(command.token);

    if (!decoded || !decoded.id) {
      return Result.Failure<User>(tokenInvalidError);
    }

    const userIdResult = UserId.create(decoded.id);
    if (userIdResult.isFailure) {
      return Result.Failure<User>(tokenInvalidError);
    }

    const userResult = await this.userRepository.findById(userIdResult.value!);

    if (userResult.isFailure) {
      return Result.Failure<User>(userResult.getErrors());
    }

    return Result.Success(userResult.value!);
  }
}
