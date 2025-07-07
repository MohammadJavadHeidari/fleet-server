import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RequestOtpDto {
  @IsPhoneNumber('IR')
  phoneNumber: string;
}
