import { IsString, IsNotEmpty, IsOptional, IsISO8601, IsBoolean, IsNumber } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly nationalId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly comment: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;

  @IsString()
  @IsNotEmpty()
  readonly carBrand: string;

  @IsString()
  @IsNotEmpty()
  readonly carColor: string;

  @IsNumber()
  @IsNotEmpty()
  readonly carProductionDate: number;

  @IsNumber()
  @IsNotEmpty()
  readonly licensePlateTwoDigit: number;

  @IsString()
  @IsNotEmpty()
  readonly licensePlateLetter: string;

  @IsNumber()
  @IsNotEmpty()
  readonly licensePlateThreeDigit: number;

  @IsNumber()
  @IsNotEmpty()
  readonly licensePlateProvince: number;
}
