import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty, Matches } from "class-validator"

export class RegisterDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: 'Password must contain at least one uppercase letter, one number and one special character',
    })
    password: string;
}