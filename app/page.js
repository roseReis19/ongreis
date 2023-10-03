import Image from "next/image";
import WelcomeCard from "./components/welcomeCard";
import ResponsiveMenu from "./components/menu";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session =  await getServerSession();
  if(session !== null) {
      redirect("/platform")
   }
    return (
      <>
        <ResponsiveMenu />
      <div
        style={{
          zIndex: -1,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Image
          src="/team.jpg"
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
        />


      </div>
      
      <WelcomeCard />
      </>
    )
}
  