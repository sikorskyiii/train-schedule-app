import { Injectable, ConflictException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(email: string, password: string) {
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) throw new ConflictException("Email already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: { email, password: hashedPassword }
        });

        return { access_token: this.jwtService.sign({ sub: user.id, email: user.email }) }
    }
}
