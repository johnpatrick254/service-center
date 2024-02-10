import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { QueryService } from 'src/query/query.service';
import { MessagesService } from 'src/messages/messages.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [ChatGateway, ChatService, QueryService, MessagesService, UserService, PrismaService]
})
export class ChatModule { }
