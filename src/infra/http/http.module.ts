import { Module } from "@nestjs/common";
import { AccountController } from "./controller/account/account.controller";
import { AuthenticateController } from "../auth/controller/authenticate.controller";
import { QuestionController } from "./controller/question/question.controller";
import { PrismaService } from "../database/prisma/prisma.service";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [AccountController, AuthenticateController, QuestionController],
})

export class HttpModule {

}