

'use client'

import Header from '@/components/Header';
import Chat from '@/components/shared/Chat';
import { ChatHeader } from '@/components/shared/ChatHeader';
import ChatInput from '@/components/shared/ChatInput';
import ChatList from '@/components/shared/ChatList';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';




const SOCKET_SERVER_URL = 'http://localhost:3000';

const page = () => {
    const [messages, setMessages] = useState<any>([]);
    const [currentMessageId, setCurrentMessageId] = useState('');
    const [currentMiddleBar, setcurrentMiddleBar] = useState('Pending');
    const [pageNumber, setPageNumber] = useState(1);
    const searchParams = useSearchParams()
    const user = searchParams.get('user') ?? "user";
    const socket = io(SOCKET_SERVER_URL);
    const pendingMessages = messages.length ? messages.filter((message: { isClaimed: any; }) => !message.isClaimed) : [];
    const openedChat = messages.length ? messages.filter((message: { messages: { queryId: string; }[]; }) => message.messages[0].queryId == currentMessageId)[0]?.messages : []
    console.log(currentMessageId)
    console.log(messages.length && messages.filter((message: { messages: { queryId: string; }[]; }) => message.messages[0].queryId == currentMessageId))
    const inProgress = messages.length ? messages.filter((message: { isClaimed: any; }) => message.isClaimed) : [];
    useEffect(() => {
       
        const fetchClientQueries = () => {
            socket.emit('fetch-agent', { take: 5, pageNumber });
        };

        socket.on('agent-queries', (data) => {
            const parsedQueries = JSON.parse(data) as [];

            setMessages(parsedQueries);
        });
        socket.on('sentMessage', (data) => {
            const parsedQueries = JSON.parse(data) as [];
            setMessages(parsedQueries);
        });

        fetchClientQueries(); // Fetch initial data when component mounts

        return () => {
            socket.off();
        };
    }, [pageNumber, user]);
    return <>
        <Header user={user} newMessage={setCurrentMessageId} />
        <div className="flex h-[90vh] max-w-[98vw] mt-11 flex-row gap-x-5 bg-background-strong">
            <div className='w-[20%] py-4 px-2 h-full flex flex-col gap-4 bg-background rounded-sm' >
                <h1 className='mx-auto text-tertiary'>Chats</h1>
                <div className='w-full hover:cursor-pointer p-2 border border-strong shadow-sm rounded-md flex justify-between align-middle' onClick={()=>setcurrentMiddleBar('Pending')} >
                    <h2 className='text-tertiary'>{"Pending"}</h2>
                    <p className='p-3 h-2 w-2 flex justify-center text-xs bg-tertiary items-center align-middle rounded-full'>{pendingMessages.length}</p>

                </div>
                <div className='w-full hover:cursor-pointer p-2 flex border border-strong shadow-sm rounded-md justify-between align-middle' onClick={()=>setcurrentMiddleBar('In Progress')} >
                    <h2 className='text-tertiary'>{"In Progress"}</h2>
                    <p className='p-3 h-2 w-2 flex justify-center text-xs bg-tertiary items-center align-middle rounded-full'>{inProgress.length}</p>
                </div>
            </div>
            <div className='w-[25%] py-4 px-2 h-full flex flex-col gap-3 bg-background rounded-sm' >
                <h1 className='mx-auto text-tertiary'>{currentMiddleBar} Chats</h1>
                {
                    currentMiddleBar == "Pending" ?
                    pendingMessages.reverse().map((message: { messages: any; dateCreated: any; }) => {
                            return <Chat
                                messages={message.messages}
                                setCurrentMessages={setCurrentMessageId}
                                dateCreated={message.dateCreated} />
                        })
                        :
                        inProgress.reverse().map((message: { messages: any; dateCreated: any; }) => {
                            return <Chat
                                messages={message.messages}
                                setCurrentMessages={setCurrentMessageId}
                                dateCreated={message.dateCreated} />
                        })
                }

            </div>
            <div className='p-4 w-full h-full flex flex-col gap-1 bg-background rounded-sm' >
               {(openedChat?.length > 0) &&  <ChatHeader username={openedChat[0]?.senderName} type={`${openedChat[0]?.senderType}`} />}
                <ChatList currentUser={user} messages={openedChat} />
                <ChatInput
                    socket={socket}
                    data={{ userName: user, userType: 'AGENT', pageNumber: pageNumber, take: 5, queryId: currentMessageId }}
                />
            </div>
        </div>
    </>;
};

export default page;