import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PlatformCuestionarios from "@/app/components/cuestionarios";
import { getServerSession } from "next-auth";

async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cuestionario`, { next: { cache: 'no-store' } })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

async function getDataResults(id) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/results/${id}`,  { next: { cache: 'no-store' } })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
 

export default async function Platform() {
  const session = await getServerSession(authOptions)
  const data = await getData()
  //console.log(session)
  const { results } = await getDataResults(session.user.id)

  return (
   <PlatformCuestionarios data={data} results={results}/>
  );
}
