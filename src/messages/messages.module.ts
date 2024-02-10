import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [MessagesService, PrismaService],
  exports: [MessagesService]

})
export class MessagesModule { }
