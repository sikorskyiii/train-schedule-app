import { CreateTrainDto } from "./dto/create-train.dto";
import { UpdateTrainDto } from "./dto/update-train.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class TrainsService {
    constructor(private readonly prisma: PrismaService) { }
    async findAll() {
        return this.prisma.train.findMany();
    }

    async create(dto: CreateTrainDto) {
        return this.prisma.train.create({
            data: {
                ...dto,
                departureTime: new Date(dto.departureTime),
                arrivalTime: new Date(dto.arrivalTime),
            }
        });
    }

    async update(id: number, dto: UpdateTrainDto) {
        return this.prisma.train.update({
            where: { id },
            data: {
                ...dto,
                ...(dto.departureTime && { departureTime: new Date(dto.departureTime) }),
                ...(dto.arrivalTime && { arrivalTime: new Date(dto.arrivalTime) }),
            }
        });
    }

    async remove(id: number) {
        return this.prisma.train.delete({
            where: { id },
        });
    }
}   