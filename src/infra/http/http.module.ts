import { Module } from "@nestjs/common";
import { AccountController } from "./controller/account/account.controller";
import { AuthenticateController } from "../auth/controller/authenticate.controller";
import { QuestionController } from "./controller/question/question.controller";
import { PrismaService } from "../database/prisma/prisma.service";

@Module({
  controllers: [AccountController, AuthenticateController, QuestionController],
  providers: [PrismaService],
})

export class HttpModule {

}