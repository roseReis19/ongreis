
import Form from "@/app/components/form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default  async function Login() {
  const session =  await getServerSession();
  if(session !== null) {
     redirect("/platform")
  }

    return (
      <main >
         <Form login={true} />
      </main>
    )
}
  