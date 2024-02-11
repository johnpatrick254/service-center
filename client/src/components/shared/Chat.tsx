import { User2Icon } from 'lucide-react'
import React from 'react'

export default function Chat({
  messages,
  setCurrentMessages,
  dateCreated
}) {
const date = new Date(dateCreated)
  const handleClick=()=>setCurrentMessages(messages[0]?.queryId)
  return (
    <div className='flex  w-full align-middle items-center border border-strong shadow-sm px-1 py-2 rounded-md justify-start hover:cursor-pointer gap-3' onClick={handleClick}>
        <User2Icon size={"2rem"} className='bg-white rounded-full ' color='black' />
        <div className='w-[60%]'>
        <p className='w-full truncate'>{messages[0].content}</p>

        </div>
        <p>{date.getHours()+ ":" + date.getMinutes()}</p>

    </div>
  )
}
