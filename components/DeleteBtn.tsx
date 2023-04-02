import supabase from '@/utils/supabase';
import React from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs';
type Props = {
    id: string
}

export default function DeleteBtn({id}: Props) {
    const deleteMessage = async () => {
        console.log('hey', id);
        
        const dataDeleted = await supabase
        .from('chats')
        .delete()
        .match({ 'id': id });
        console.log(dataDeleted);
        
    }
  return (
    <button onClick={deleteMessage} className='py-2'><BsFillTrash3Fill color='white'/></button>
  )
}