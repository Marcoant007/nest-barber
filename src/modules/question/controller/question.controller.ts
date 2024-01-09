import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UserPayload } from '@/modules/auth/strategy/jwt.strategy';
import { CurrentUser } from '@/shared/decorators/current-user-decorator';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';
import { CreateQuestionBodySchema, createQuestionBodySchema } from '@/shared/validators/create-question-validator';
import { PageQueryParamSchema, pageQueryParamSchema } from '@/shared/validators/page-questions-validator';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionController {
    constructor(private prisma: PrismaService) {
    }

    @Post()
    async createQuestions(
        @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema,
        @CurrentUser() user: UserPayload) {

        const { title, content } = body;
        const userId = user.sub;
        const slug = this.convertToSlug(title);

        await this.prisma.question.create({
            data: {
                authorId: userId,
                title,
                content,
                slug: slug
            }
        })
    }

    @Get()
    async fetchRecentQuestions (@Query('page', queryValidationPipe) page: PageQueryParamSchema){
        const perPage = 20;
        const questions = await this.prisma.question.findMany({
            take: perPage,
            skip: (page - 1) * perPage,
            orderBy: {
                createdAt: 'desc'
            },
        })

        return { questions };
    }


    private convertToSlug(title: string): string {
        return title.toLowerCase().normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }
}
