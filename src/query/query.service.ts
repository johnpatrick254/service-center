import { Injectable } from '@nestjs/common';
import { Query } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QueryService {
    constructor(private prisma: PrismaService) { }


    async createQuery(customerName: string): Promise<Query> {
        return this.prisma.query.create({
            data: {
                customerName
            }
        })
    };

    async fetchQuery(id: string): Promise<Query> {
        return await this.prisma.query.findUnique({
            where: { id },
            include: {
                messages: true
            }
        })
    };
    async fetchQueries(take: string, pageNumber: string, customerName?: string): Promise<Query[]> {

        const skip = (+pageNumber - 1) * +take;
        let config: any = {
            include: {
                messages: true
            },
            skip,
            take: +take
        }
        if (customerName) {
            config = {
                where: {
                    customerName: {
                        equals: customerName
                    }
                },
                include: {
                    messages: true
                },
                skip,
                take: +take
            }
        }
        return await this.prisma.query.findMany(config)
    };

    async claimQuery(id: string, agentName: string): Promise<Query> {
        return await this.prisma.query.update({
            where: { id },
            data: {
                isClaimed: true,
                claimedBy: agentName
            }
        })
    };


}
