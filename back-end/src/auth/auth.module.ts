import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "./roles.guard";

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: 'process.env.JWT_SECRET',
            signOptions: { expiresIn: '1h' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
})

export class AuthModule { }