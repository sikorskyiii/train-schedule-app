import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards } from "@nestjs/common";
import { TrainsService } from "./trains.service";
import { CreateTrainDto } from "./dto/create-train.dto";
import { UpdateTrainDto } from "./dto/update-train.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Role } from "@prisma/client";
import { Roles } from "../auth/roles.decorator";

@Controller('trains')
export class TrainsController {
    constructor(private readonly trainsService: TrainsService) { }

    @Get()
    findAll() {
        return this.trainsService.findAll();
    }

    @Post()
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    create(@Body() createTrainDto: CreateTrainDto) {
        return this.trainsService.create(createTrainDto);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    update(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
        return this.trainsService.update(+id, updateTrainDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    remove(@Param('id') id: string) {
        return this.trainsService.remove(+id);
    }
}