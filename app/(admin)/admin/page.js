import Form from '@/app/components/form'
import { getServerSession } from 'next-auth';
import Image from "next/image";
import { redirect } from 'next/navigation';
import { authOptions } from "../../api/auth/[...nextauth]/route"

export default async function Admin() {

  const session =  await getServerSession(authOptions);
  console.log(session.user.company)
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