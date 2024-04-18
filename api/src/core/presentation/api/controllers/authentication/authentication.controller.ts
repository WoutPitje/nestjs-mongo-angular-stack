import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginCommand } from '../../../../application/commands/authentication/login/login.command';
import { LoginCommandResponse } from '../../../../application/commands/authentication/login/login.response';
import { MeCommand } from '../../../../application/commands/authentication/me/me.command';
import { Result } from '../../../../domain/abstractions/result';
import { UserDto } from '../../../../application/dtos/user.dto';
import { User } from '../../../../domain/aggregates/user/user';
import { LoginRequest } from './requests/login.request';
import { LoginResponse } from './requests/login.response';

@Controller('authentication')
export class AuthenticationController {
  constructor(private commandBus: CommandBus) {}

  @Post('login')
  @ApiBody({ type: LoginRequest })
  async post(@Body() body: LoginRequest) {
    const command = new LoginCommand(body.email, body.password);

    const result: Result<LoginCommandResponse> =
      await this.commandBus.execute(command);

    if (result.isFailure) {
      return result;
    }

    return LoginResponse.fromModel(result.value!.user, result.value!.token);
  }

  @Get('me')
  @ApiBearerAuth('JWT')
  async getMe(@Headers('Authorization') token: string) {
    const command = new MeCommand(token.split(' ')[1]);

    const result: Result<User> = await this.commandBus.execute(command);

    if (result.isFailure) {
      return result;
    }
    return UserDto.fromModel(result.value!);;
  }
}
