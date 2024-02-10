import { User2Icon } from 'lucide-react'
import React from 'react'

export default function ChatMessage({ sender, content, currentUser }: { sender: string, content: string, currentUser: string }) {
    return (
        <div className={`chat-message  w-fit ${sender === currentUser ? 'self-end' : 'self-start'}`}>
            <div className="flex flex-col items-start gap-1">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                        <span className={`px-4 py-2 rounded-lg inline-block ${sender === currentUser ? 'rounded-bl-none bg-gray-300 text-gray-600' : 'rounded-br-none bg-blue-600 text-white'}`}>
                            {content}
                        </span>
                    </div>
                </div>
                <div>
                    { sender !== currentUser && <p className='text-xs'>{sender}</p>}
                </div>
            </div>
        </div>

    )
}
