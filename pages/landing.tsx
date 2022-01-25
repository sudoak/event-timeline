import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"

interface Iproviders {
    providers: typeof getProviders;
}

const Landing: React.FC<{providers: Iproviders}> = ( { providers } ) => {
    const { data, status} = useSession();
    
    console.log(data);
    console.log(status);
    console.log(providers);
    if (status === "authenticated") {
        return (
            <div className="container bg-slate-400">
              <h1 className="text-center">Hello Landing Timeline</h1>
              <button className="btn btn-secondary" onClick={() => signOut()}>Logout</button>;
            </div>
          )
    }
    return <div className="">
        { Object.values(providers).map((provider:any) => {
            <button className="btn btn-primary bg-[#18D860] text-white p-5"
                onClick={() => signIn(provider.id, { callback: "/landing" })}>
                {provider.name}
            </button>
        })}
        <button className="btn btn-primary" onClick={() => signIn()}>SignIn</button>
    </div>
}

export default Landing


export async function getServerSideProps(){
    const providers = await getProviders() 
    return {
      props: {
        providers,
      },
    };
}