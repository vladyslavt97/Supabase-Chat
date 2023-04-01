"use client"
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
type Message = {
  id: string;
  created_at: string;
  title: string;
};

export default function Chat({serverMessages}: {serverMessages: Message[]}) {
const [chat, setChat] = useState(serverMessages.reverse());
  useEffect(()=>{
    const channel = supabase.channel('realtime chats').on('postgres_changes',
      {
        event: "INSERT", schema: "public", table: "chats"
      }, (payload) => {
        console.log({payload});
        // setChat([...chat, payload.new as Message])
        setChat([payload.new as Message, ...chat])
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
    <div className="flex flex-col-reverse items-center gap-2 p-2 h-[90vh]">
      {chat.map(el => (
        <div key={el.id} className="rounded-xl bg-blue-600 px-1 py-1 max-w-[40%] text-center shadow flex flex-row justify-end flex-wrap m-1">
          <h1 className="w-96 text-xs text-blue-300 ">{el.title}</h1>
          <h5 className="text text-white">{dataFormating(el.created_at)}</h5>
        </div>
      ))}
    </div>
);

}