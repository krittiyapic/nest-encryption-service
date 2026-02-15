import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { ApiRes, DecryptDto, EncryptDto } from './app.dto';
import { App } from 'supertest/types';

interface ResEncrypt {
  body: ApiRes<DecryptDto>;
}

interface ResDecrypt {
  body: ApiRes<EncryptDto>;
}

describe('Encrypt / Decrypt Service', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Case: Encrypt Success', async () => {
    const encRes: ResEncrypt = await request(app.getHttpServer() as App)
      .post('/get-encrypt-data')
      .send({ payload: 'Test Encryption' });

    expect(encRes.body.successful).toBe(true);
    expect(encRes.body.error_code).toBe('');
    expect(encRes.body.data).not.toBeNull();
  });

  it('Case: Encrypt Failed', async () => {
    const encRes: ResEncrypt = await request(app.getHttpServer() as App)
      .post('/get-encrypt-data')
      .send({ payload: null });

    expect(encRes.body.successful).toBe(false);
    expect(encRes.body.error_code).toBe('ENCRYPT_FAILED');
    expect(encRes.body.data).toBeNull();
  });

  it('Case: Encrypt + Decrypt Success Flow', async () => {
    const payload = 'Krittiya Pichai';

    const encRes: ResEncrypt = await request(app.getHttpServer() as App)
      .post('/get-encrypt-data')
      .send({ payload });

    const decRes: ResDecrypt = await request(app.getHttpServer() as App)
      .post('/get-decrypt-data')
      .send(encRes.body.data ?? {});

    expect(decRes.body.data?.payload).toBe(payload);
  });
});
