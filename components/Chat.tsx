"use client"
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import DeleteBtn from "./DeleteBtn";

type Message = {
  id: string;
  created_at: string;
  title: string;
};

export default function Chat({serverMessages}: {serverMessages: Message[]}) {
const [chat, setChat] = useState(serverMessages);
  useEffect(()=>{
    const channel = supabase.channel('realtime chats').on('postgres_changes',
      {
        event: "*", schema: "public", table: "chats"
      }, (payload) => {
        console.log({payload});
        // setChat([...chat, payload.new as Message])
        if(payload.eventType === "INSERT"){
        setChat([payload.new as Message, ...chat])
        } else {
          console.log('chat', chat);
          
          const filtered = chat.filter(el => {
            return el.id !== payload.old.id
          })
          console.log('filtered', filtered);
          
          setChat(filtered)
        }
      }).subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
  },[chat, setChat])


const dataFormating = (dateToFormat: any) => {
  const date = new Date(dateToFormat);
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

return (
  <>
    {chat.length === 0 ? <h1 className='text-white flex justify-center w-screen top-10'>No messages yet!</h1>:

    <div className="flex flex-col-reverse overflow-auto items-center gap-2 p-2 pb-5 h-[80vh] w-screen bg-blue-900 border-b-orange-400 border-2">
      {chat.map(el => (
        <div key={el.id} className="rounded-xl bg-blue-600 px-1 py-1 max-w-[40%] text-center shadow flex flex-row justify-end items-center flex-wrap m-1">
          <DeleteBtn id={el.id}/>
          <h1 className="w-96 text-xs text-orange-300 ">{el.title}</h1>
          <h5 className="text text-white">{dataFormating(el.created_at)}</h5>
        </div>
      ))}
    </div>
    }
    </>
);

}