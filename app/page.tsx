import Chat from '@/components/Chat'
import Input from '@/components/Input'
import supabase from '@/utils/supabase'

export const revalidate = 0;

export default async function Home() {
  const {data} = await supabase.from('chats').select().order('created_at', { ascending: false })
    const serverMessages: any = data?.map((item: any) => ({
        id: item.id,
        created_at: item.created_at,
        title: item.title,
    }))
  return (
    <main>
      <Chat serverMessages={serverMessages ?? []}/>
      <Input/>
    </main>
  )
}
