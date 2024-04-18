import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Result } from '../../../../domain/abstractions/result';
import { Email } from '../../../../domain/aggregates/user/email';
import { UserRepository } from '../../../../infrastructure/repository/user/user.repository';
import { authenticationIncorrectError } from '../../../errors/authentication.incorrect.error';
import { LoginCommand } from './login.command';
import { LoginCommandResponse } from './login.response';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async execute(command: LoginCommand) {
    const emailResult = Email.create(command.email);
    if (emailResult.isFailure)
      return Result.Failure<LoginCommandResponse>(emailResult.getError()!);

    const userResult = await this.repository.findOneByEmail(emailResult.value!);

    if (userResult.isFailure) {
      return Result.Failure<LoginCommandResponse>(userResult.getErrors());
    }

    const user = userResult.value!;
    const passwordIsCorrect = await bcrypt.compare(
      command.password,
      user.passwordHash.value,
    );
    if (!passwordIsCorrect) {
      return Result.Failure<LoginCommandResponse>(authenticationIncorrectError);
    }

    const token = this.jwtService.sign({ id: user.id.value });

    return Result.Success<LoginCommandResponse>({
      user: user,
      token: token,
    });
  }
}
