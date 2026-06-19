import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards } from "@nestjs/common";
import { TrainsService } from "./trains.service";
import { CreateTrainDto } from "./dto/create-train.dto";
import { UpdateTrainDto } from "./dto/update-train.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('trains')
export class TrainsController {
    constructor(private readonly trainsService: TrainsService) { }

    @Get()
    findAll() {
        return this.trainsService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createTrainDto: CreateTrainDto) {
        return this.trainsService.create(createTrainDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
        return this.trainsService.update(+id, updateTrainDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.trainsService.remove(+id);
    }
}