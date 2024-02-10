import React from 'react'
import ChatMessage from './ChatMessage'

export default function ChatList({ messages, currentUser }) {
    console.log(messages)
    return (
        <div id="messages" className="flex flex-1 flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {messages?.map((message: { senderName: any; content: any }, index: React.Key | null | undefined) => (
                <ChatMessage
                    key={index}
                    content={message.content}
                    currentUser={currentUser}
                    sender={message.senderName}
                />
            ))}
        </div>
    )
}

