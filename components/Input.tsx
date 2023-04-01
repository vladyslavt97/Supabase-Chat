"use client"
import supabase from "@/utils/supabase";
import { FormEvent, useState } from "react";

type Props = {}

export default function Input({}: Props) {
    const [title, setTitle] = useState('');
    const insertTitle = async (e: FormEvent) => {
        e.preventDefault(); 
        const {data, error} = await supabase.from('chats').insert({title: title})
        console.log(data);
        console.log(error);
        
        setTitle('')
    }

  return (
    <form className="fixed bottom-0 left-0 flex flex-row" onSubmit={insertTitle}>
        <input type="text" className="h-16 bg-white w-[80vw]" placeholder='message' onChange={e=>setTitle(e.target.value)} value={title}/>
        <button className="bg-gray-300 text-center w-[20vw]">send</button>
    </form>
  )
}