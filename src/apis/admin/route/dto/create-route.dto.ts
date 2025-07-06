import { IsString, IsNotEmpty, IsOptional, IsISO8601, IsBoolean, IsNumber, IsLatitude, IsLongitude } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
