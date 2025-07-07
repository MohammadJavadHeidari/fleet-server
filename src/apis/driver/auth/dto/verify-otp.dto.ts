import { IsPhoneNumber, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsPhoneNumber('IR')
  phoneNumber: string;

  @Length(6, 6)
  otp: string;
}