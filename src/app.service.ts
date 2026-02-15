import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { DecryptDto } from './app.dto';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  private get publicKey(): string {
    return this.configService.get<string>('PUBLIC_KEY')!;
  }

  private get privateKey(): string {
    return this.configService.get<string>('PRIVATE_KEY')!;
  }

  encryptPayload(payload: string) {
    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    const encryptedPayload = Buffer.concat([
      cipher.update(payload, 'utf8'),
      cipher.final(),
    ]);

    const encryptedAesKey = crypto.privateEncrypt(
      this.privateKey,
      Buffer.concat([aesKey, iv]),
    );

    return {
      aesKeyEncrypted: encryptedAesKey.toString('base64'),
      payloadEncrypted: encryptedPayload.toString('base64'),
    };
  }

  decryptPayload(body: DecryptDto) {
    const { data1, data2 } = body;
    const keyBuffer = crypto.publicDecrypt(
      this.publicKey,
      Buffer.from(data1, 'base64'),
    );

    const aesKey = keyBuffer.subarray(0, 32);
    const iv = keyBuffer.subarray(32);

    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(data2, 'base64')),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}
