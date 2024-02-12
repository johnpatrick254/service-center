import { Injectable } from '@nestjs/common';
import { Message, UserType } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) { }

    async saveMessage(queryId: string, senderName: string, content: string,senderType:UserType): Promise<Message> {
        return await this.prisma.message.create({
            data: {
                queryId,
                content,
                senderName,
                senderType
            }
        })
    }
}
