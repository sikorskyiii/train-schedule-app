
import { AuthService } from "./auth.service";
import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('auth/register')
    async register(@Body() { email, password }: RegisterDTO) {
        return this.authService.register(email, password);
    }

    @Post('auth/login')
    @HttpCode(200)
    async login(@Body() { email, password }: LoginDTO) {
        return this.authService.login(email, password);
    }
}