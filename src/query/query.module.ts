import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [QueryService,PrismaService],
  exports:[QueryService]
})
export class QueryModule {}
