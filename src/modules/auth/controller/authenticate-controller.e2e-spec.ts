import { AppModule } from "@/app.module";
import { PrismaService } from "@/shared/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import { hash } from "bcryptjs";
import request from 'supertest';

describe('Create sessions (E2E)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => { //createTesting module roda a aplicação apenas para tests
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication();
        prisma = moduleRef.get(PrismaService);
        await app.init();
    });

    test('[POST] / sessions', async () => {
        await prisma.user.create({
            data: {
                name: 'Marco Teste',
                email: 'marcoteste@gmail.com',
                password: await hash('123456', 8)
            }
        });

        const response = await request(app.getHttpServer()).post('/sessions').send({
            email: 'marcoteste@gmail.com',
            password: '123456'
        });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            accessToken: expect.any(String)
        });
    })
})