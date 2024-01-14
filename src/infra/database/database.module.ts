import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-questions-comments-repository";
import { PrismaQuestionRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";


@Module({
    providers: [
        PrismaService,
        PrismaQuestionAttachmentsRepository,
        PrismaQuestionCommentsRepository,
        PrismaQuestionRepository,
        PrismaAnswerAttachmentsRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswersRepository
    ],
    exports: [
        PrismaService,
        PrismaQuestionAttachmentsRepository,
        PrismaQuestionCommentsRepository,
        PrismaQuestionRepository,
        PrismaAnswerAttachmentsRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswersRepository
    ]
})


export class DatabaseModule {

}