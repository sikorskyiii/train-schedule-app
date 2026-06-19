import { PrismaModule } from "../prisma/prisma.module";
import { TrainsService } from "./trains.service";
import { TrainsController } from "./trains.controller";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule],
    controllers: [TrainsController],
    providers: [TrainsService],
})

export class TrainsModule { }
