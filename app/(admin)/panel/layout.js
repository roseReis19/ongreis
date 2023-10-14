import MenuPanel from "@/app/components/menuPanel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";


export default async function Layout({ children }) {
 const session =  await getServerSession(authOptions);
 if(session !== null && session.user.company !== 'admin'){
    redirect("/platform")
 }
  return (
      <MenuPanel>
        {children}
      </MenuPanel>
  );
}
