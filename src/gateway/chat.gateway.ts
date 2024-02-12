import { Logger, OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { UserType } from '@prisma/client';
import { take } from 'rxjs';
import { Server, Socket } from "socket.io"
import { MessagesService } from 'src/messages/messages.service';
import { QueryService } from 'src/query/query.service';
import { UserService } from 'src/user/user.service';
@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class ChatGateway implements OnModuleInit {
  private logger = new Logger("CHAT_GATEWAY");
  constructor(private queryService: QueryService, private messageService: MessagesService, private userService: UserService) { }

  @WebSocketServer()
  private server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(`user connected id: ${socket.id}`)
    })
  }

  @SubscribeMessage('fetch-agent')
  async handleFetchAgentQueries(@MessageBody() payload: {
    take: string, pageNumber: string,
  }) {
    //send latest sb snapshot of queries
    const queries = await this.queryService.fetchQueries(payload.take, payload.pageNumber)
    this.server.emit('agent-queries', JSON.stringify(queries))
  };

  @SubscribeMessage('fetch-client')
  async handleFetchClientQueries(socket: Socket, payload: {
    take: string, pageNumber: string, customerName: string
  }) {
    this.logger.log(`fetch client called`)
    //send latest sb snapshot of queries
    const queries = await this.queryService.fetchQueries(payload.take, payload.pageNumber, payload.customerName)
    this.server.emit('client-queries', JSON.stringify(queries))

    this.logger.log(`fetch client returned`, queries)
  };


  @SubscribeMessage('sendMessage')
  async sendMessage(socket: Socket, payload: {
    userName: string, userType: UserType, content: string, queryId?: string, take: string, pageNumber: string
  }) {
    this.logger.log("sendMessage called")
    //check if user exist

    const fetchedUser = (await this.userService.getUser({name:payload.userName,type:payload.userType})).name
    //find or create query
    let queryId: string
    if (payload.queryId) {
      queryId = payload.queryId
    } else {
      queryId = (await this.queryService.createQuery(fetchedUser)).id;
    };

    //check if query is claimed
    const queryStatus = (await this.queryService.fetchQuery(queryId)).isClaimed;

    //mark it claimed if sender is agent
    if (payload.userType === UserType.AGENT && !queryStatus) {
      await this.queryService.claimQuery(queryId, fetchedUser);
    };

    
    //save message
    await this.messageService.saveMessage(queryId, fetchedUser, payload.content,payload.userType);
      const agentQueries = await this.queryService.fetchQueries(payload.take, payload.pageNumber)
      this.server.emit('sentMessage', JSON.stringify(agentQueries))
  
        const queries = await this.queryService.fetchQueries(payload.take, payload.pageNumber)
        this.server.emit('sentMessageUser', JSON.stringify(queries))
    
  }
}
