import Chat from '@/components/Chat'
import Input from '@/components/Input'
import supabase from '@/utils/supabase'

export const revalidate = 0;

export default async function Home() {
  const {data} = await supabase.from('chats').select()
    const serverMessages: any = data?.map((item: any) => ({
        id: item.id,
        created_at: item.created_at,
        title: item.title,
    }))

  return (
    <main className="bg-black w-full overflow-scroll">
      <div className='flex justify-center items-center'>
        <Chat serverMessages={serverMessages ?? []}/>
      </div>
      <Input/>
    </main>
  )
}
