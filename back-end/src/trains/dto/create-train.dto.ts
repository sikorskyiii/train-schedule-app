import { IsString, IsNotEmpty } from "class-validator";

export class CreateTrainDto {
    @IsString()
    @IsNotEmpty()
    trainNumber: string;

    @IsString()
    @IsNotEmpty()
    fromStation: string;

    @IsString()
    @IsNotEmpty()
    toStation: string;

    @IsString()
    @IsNotEmpty()
    departureTime: string;

    @IsString()
    @IsNotEmpty()
    arrivalTime: string;
}