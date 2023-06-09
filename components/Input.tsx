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
    <form className="fixed bottom-0 left-0 flex flex-row h-[8vh]" onSubmit={insertTitle}>
        <input type="text" className=" bg-blue-100 w-[80vw] text-blue-900" placeholder='message' onChange={e=>setTitle(e.target.value)} value={title}/>
        <button className="bg-blue-300 text-center w-[20vw] text-blue-900">send</button>
    </form>
  )
}