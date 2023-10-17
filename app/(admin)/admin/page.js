import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Form from '@/app/components/form'
import { getServerSession } from 'next-auth';
import Image from "next/image";
import { redirect } from 'next/navigation';

export default async function Admin() {

  const session =  await getServerSession(authOptions);


  if(session !== null && session.user.company !== 'admin'){
    redirect("/platform")
  }

  if(session !== null && session.user.company === 'admin'){
    redirect("/panel")
  }

    return (
      <main >
        <Image
          src="/landscape-admin.jpg"
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
        />
        <Form admin = {true} />
      </main>
    )
}