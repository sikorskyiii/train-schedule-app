import { Injectable, ConflictException, UnauthorizedException, ForbiddenException } from "@nestjs/common";
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

        return { access_token: this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }) }
    }

    async registerAdmin(email: string, password: string, secret: string) {
        if (secret !== process.env.ADMIN_SECRET) {
            throw new ForbiddenException("Invalid admin secret");
        }

        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) throw new ConflictException("Email already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: { email, password: hashedPassword, role: "ADMIN" }
        });

        return { access_token: this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }) }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException("Invalid email");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Invalid password.");

        return { access_token: this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }) }
    }
}
