import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request } from 'express';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { UserPayload } from 'src/auth/jwt.strategy';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { PrismaService } from 'src/prisma/prisma.service';

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string()
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;


const pageQueryParamSchema =  z.string().optional().default('1').transform(Number).pipe(z.number().min(1))
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

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
        const perPage = 1;
        const question = await this.prisma.question.findMany({
            take: perPage,
            skip: (page - 1) * perPage,
            orderBy: {
                createdAt: 'desc'
            },
        })

        return { question };
    }


    private convertToSlug(title: string): string {
        return title.toLowerCase().normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }
}
