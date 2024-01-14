import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create account (E2E)', () => {
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

    test('[POST] / accounts', async () => {
        const response = await request(app.getHttpServer()).post('/accounts').send({
            name: 'Marco Teste',
            email: 'marcoteste@gmail.com',
            password: '123456'
        });

        expect(response.statusCode).toBe(201);

        const userOnDatabase = await prisma.user.findUnique({
            where: {
                email: 'marcoteste@gmail.com'
            }
        });

        expect(userOnDatabase).toBeTruthy();
    })
})