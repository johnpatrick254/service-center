import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUser({ name, type }): Promise<User> {
        return await this.prisma.user.upsert({
            where: {
                name
            },
            update: {},
            create: {
                name,
                type
            }

        })
    }

}
