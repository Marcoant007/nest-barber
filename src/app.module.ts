import { Module } from '@nestjs/common';
import { PrismaService } from './shared/infra/database/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'env';
import { AuthModule } from './modules/auth/auth.module';
import { AuthenticateController } from './modules/auth/controller/authenticate.controller';
import { AccountController } from './modules/account/controller/account.controller';
import { QuestionController } from './modules/question/controller/question.controller';

@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true,
  }),
    AuthModule,

  ],

  controllers: [AccountController, AuthenticateController, QuestionController],
  providers: [PrismaService],
})
export class AppModule { }
