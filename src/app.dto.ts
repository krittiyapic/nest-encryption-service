/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class EncryptDto {
  @ApiProperty({ minLength: 0, maxLength: 2000 })
  @IsString()
  @Length(0, 2000)
  payload: string;
}

export class DecryptDto {
  @ApiProperty()
  @IsString()
  data1: string;

  @ApiProperty()
  @IsString()
  data2: string;
}

export interface ApiRes<T> {
  successful: boolean;
  error_code: string;
  data: T | null;
}
