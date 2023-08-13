import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/';
import { Types, disconnect } from 'mongoose';

import {
	REVIEWS_VALIDATION_ERROR_RATING_TOO_GREAT,
	REVIEWS_VALIDATION_ERROR_RATING_TOO_LESS,
} from '../src/review/review.constants';
import { mainConfig } from '../src/main.config';
import { loginDto } from './login-test.dto';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'Тест',
	title: 'Заголовок',
	description: 'Описание тестовое',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let userId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		mainConfig(app);
		await app.init();
		app.useLogger(new Logger());

		// const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDto);
		// token = body.access_token;
	});

	//  Register User
	it('/auth/register (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/auth/register')
			.send(loginDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				userId = body._id;
				expect(userId).toBeDefined();
			});
	});

	// Login User
	it('/auth/login (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				token = body.access_token;
				expect(token).toBeDefined();
			});
	});

	// Reviews
	it('/review/create (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review/create (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({
				...testDto,
				rating: 0,
			})
			.expect(400, {
				message: [REVIEWS_VALIDATION_ERROR_RATING_TOO_LESS],
				error: 'Bad Request',
				statusCode: 400,
			});
	});

	it('/review/create (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({
				...testDto,
				rating: 6,
			})
			.expect(400, {
				message: [REVIEWS_VALIDATION_ERROR_RATING_TOO_GREAT],
				error: 'Bad Request',
				statusCode: 400,
			});
	});

	it('/review/byProduct/:productId (GET) - success', () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBeGreaterThan(0);
			});
	});

	it('/review/byProduct/:productId (GET) - fail', () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	// DELETE
	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.expect(401, {
				statusCode: 401,
				message: 'Unauthorized',
			});
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);
	});

	it('/user/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete(`/user/${userId}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);
	});

	afterAll(() => {
		disconnect();
	});
});
