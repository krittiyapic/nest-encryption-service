import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DecryptDto, EncryptDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/get-encrypt-data')
  encryptService(@Body() body: EncryptDto) {
    try {
      const { aesKeyEncrypted, payloadEncrypted } =
        this.appService.encryptPayload(body.payload);

      return {
        successful: true,
        error_code: '',
        data: {
          data1: aesKeyEncrypted,
          data2: payloadEncrypted,
        },
      };
    } catch (error) {
      console.log('error', error);

      return {
        successful: false,
        error_code: 'ENCRYPT_FAILED',
        data: null,
      };
    }
  }

  @Post('/get-decrypt-data')
  decryptService(@Body() body: DecryptDto) {
    try {
      const decryptedPayload = this.appService.decryptPayload(body);

      return {
        successful: true,
        error_code: '',
        data: { payload: decryptedPayload ?? '' },
      };
    } catch (error) {
      console.log('error', error);
      return {
        successful: false,
        error_code: 'DECRYPT_FAILED',
        data: null,
      };
    }
  }
}
