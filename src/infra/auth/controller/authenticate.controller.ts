import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/infra/pipes/zod-validation.pipe";
import { AuthenticateBodySchema, authenticateBodySchema } from "@/shared/validators/authenticate-validator";
import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";

@Controller('/sessions')
export class AuthenticateController {

    constructor(private jwt: JwtService, private prisma: PrismaService) { }

    @Post()
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async handle(@Body() body: AuthenticateBodySchema) {
        const { email, password } = body;

        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            throw new UnauthorizedException('User credentials do not match');
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('User credentials do not match');
        }

        const accessToken = this.jwt.sign({ sub: user.id });
        return {
            accessToken
        };
    }

}