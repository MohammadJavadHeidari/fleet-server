import { IsString, IsNotEmpty, IsOptional, IsISO8601, IsBoolean, IsNumber, IsLatitude, IsLongitude } from 'class-validator';

export class CreateStationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsLatitude()
  readonly lat: number;

  @IsLongitude()
  readonly lng: number;

  @IsString()
  @IsNotEmpty()
  readonly isActive: boolean;
}
