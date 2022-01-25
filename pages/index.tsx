import type { NextPage } from 'next'
import Link from "next/link"
import { signIn  } from "next-auth/react"

const Home: NextPage = () => {
  return (
    <div className="container bg-slate-400">
      <h1 className="text-center">Hello Event Timeline</h1>
      <button className="btn btn-primary" onClick={() => signIn()}>Sign In</button>
      <Link href="/landing">Landing Page</Link>
    </div>
  )
}

export default Home
