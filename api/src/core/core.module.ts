import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationController } from './presentation/api/controllers/authentication/authentication.controller';
import { UserController } from './presentation/api/controllers/user/user.controller';
import { UserSeedController } from './presentation/api/controllers/user/user.seed.controller';
import { LoginCommandHandler } from './application/commands/authentication/login/login.handler';
import { UserRepository } from './infrastructure/repository/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MeCommandHandler } from './application/commands/authentication/me/me.handler';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserSchema,
  userCollectionName,
} from './infrastructure/repository/user/user.schema';

const commandHandlers: any[] = [LoginCommandHandler, MeCommandHandler];
const queryHandlers: never[] = [];
const eventHandlers: never[] = [];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: userCollectionName, schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [UserController, UserSeedController, AuthenticationController],
  providers: [
    UserRepository,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
  ],
})
export class CoreModule {}
