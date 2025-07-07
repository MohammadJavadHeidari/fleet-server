import { IsString, IsNotEmpty } from 'class-validator';

export class SaveDriverLocationDto {
    @IsString()
    @IsNotEmpty()
    lat: string;

    @IsString()
    @IsNotEmpty()
    lng: string;
}
