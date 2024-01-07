import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {

    @Post()
    async handle(){
        return "OK";
    }
}
