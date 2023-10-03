import Form from '@/app/components/form'
import Image from "next/image";

export default function Admin() {

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