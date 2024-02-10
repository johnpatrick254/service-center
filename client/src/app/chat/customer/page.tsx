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
    const [currentMessage, setCurrentMessages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const searchParams = useSearchParams()
    const user = searchParams.get('user');
    const socket = io(SOCKET_SERVER_URL);
    const pendingMessages = messages.filter((message: { isClaimed: any; }) => !message.isClaimed).length
    const inProgress = messages.filter(message => message.isClaimed).length
    useEffect(() => {

        const fetchClientQueries = () => {
            socket.emit('fetch-client', { take: 5, pageNumber, customerName: user });
        };

        socket.on('fetch-client', (data) => {
            const parsedQueries = JSON.parse(data) as [];
            console.log('queries', parsedQueries)
            setMessages(parsedQueries.reverse());
        });
        socket.on('sentMessage', (data) => {
            const parsedQueries = JSON.parse(data) as [];
            console.log(parsedQueries)
            setMessages(parsedQueries.reverse());
        });

        fetchClientQueries(); // Fetch initial data when component mounts

        return () => {
            socket.disconnect();
        };
    }, [pageNumber, user]);
    return <>
        <Header user={user} />
        <div className="flex h-[90vh] max-w-[98vw] mt-11 flex-row gap-x-5 bg-background-strong">
            <div className='w-[20%] py-4 px-2 h-full flex flex-col gap-4 bg-background rounded-sm' >
                <h1 className='mx-auto text-tertiary'>Chats</h1>
                <div className='w-full hover:cursor-pointer p-2 border border-strong shadow-sm rounded-md flex justify-between align-middle' >
                    <h2 className='text-tertiary'>{"Pending"}</h2>
                    <p className='p-3 h-2 w-2 flex justify-center text-xs bg-tertiary items-center align-middle rounded-full'>{pendingMessages}</p>

                </div>
                <div className='w-full hover:cursor-pointer p-2 flex border border-strong shadow-sm rounded-md justify-between align-middle' >
                    <h2 className='text-tertiary'>{"In Progress"}</h2>
                    <p className='p-3 h-2 w-2 flex justify-center text-xs bg-tertiary items-center align-middle rounded-full'>{inProgress}</p>
                </div>
            </div>
            <div className='w-[25%] py-4 px-2 h-full flex flex-col gap-3 bg-background rounded-sm' >
                <h1 className='mx-auto text-tertiary'>Pending Chats</h1>
                {
                    messages.map(message => {
                        return <Chat
                            messages={message.messages}
                            setCurrentMessages={setCurrentMessages}
                            dateCreated={message.dateCreated} />
                    })
                }

            </div>
            <div className='p-4 w-full h-full flex flex-col gap-1 bg-background rounded-sm' >
                <ChatHeader username={user} type='customer' />
                <ChatList currentUser={user} messages={currentMessage} />
                {/* <ChatInput
                socket={socket}
                data={ {userName:user, userType:'CUSTOMER',queryId:currentMessage.id}}
                /> */}
            </div>
        </div>
    </>;
};

export default page;