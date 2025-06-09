import { IsString, IsNotEmpty, IsOptional, IsISO8601, IsBoolean, IsNumber, IsLatitude, IsLongitude } from 'class-validator';

export class CreateStationDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsLatitude()
  readonly latitude: number;

  @IsLongitude()
  readonly longitude: number;

  @IsString()
  @IsNotEmpty()
  readonly isEnable: boolean;
}
