import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './gateway/chat.module';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { QueryModule } from './query/query.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [ChatModule, DatabaseModule, UserModule, QueryModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
