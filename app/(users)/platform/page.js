import PlatformCuestionarios from "@/app/components/cuestionarios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route"

async function getData() {
  const res = await fetch('http://localhost:3000/api/cuestionario', { next: { cache: 'no-store' } })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

async function getDataResults(id) {
  const res = await fetch(`http://localhost:3000/api/results/${id}`,  { next: { cache: 'no-store' } })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
 

export default async function Platform() {
  const session = await getServerSession(authOptions)
  const data = await getData()
  const { results } = await getDataResults(session.user.id)
 // console.log(data)
  //console.log(results)

  return (
    <PlatformCuestionarios data={data} results={results}/>
  );
}
