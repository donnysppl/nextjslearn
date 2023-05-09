"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect  } from "react";
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';


export default function Nav() {

  const {data : session} = useSession();

  const [providers, setproviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
   const setUpProvider = async () => {
    const response = await getProviders();
    setproviders(response);
   }
   setUpProvider();
  }, [])
  

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg"
        alt="Logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* desktop menu */}
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href={'/create-prompt'} className="black_btn">Create Post</Link>
              <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button>
              <Link href={'/profile'}>
                <Image src={session?.user && session?.user.image} className="rounded-full"
                width={35} height={35} alt="placeholder"/>
              </Link>
            </div>
          ) : (
            <>
              {
                providers && 
                Object.values(providers).map((item) => (
                  <button type="button" className="black_btn"
                  key={item.name} onClick={() => signIn(item.id)}>
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image src={session?.user.image} className="rounded-full"
                width={35} height={35} alt="placeholder"
                onClick={() => settoggleDropdown((prev) => !prev)} />
                {
                  toggleDropdown && (
                    <div className="dropdown">
                      <Link href="/profile" className="dropdown_link"
                      onClick={() => settoggleDropdown(false)}>
                        My Profile
                      </Link>
                      <Link href="/create-prompt" className="dropdown_link"
                      onClick={() => settoggleDropdown(false)}>
                        Create Prompt
                      </Link>
                      <button type="button"  className="mt-2 w-full black_btn"
                      onClick={() => {
                        settoggleDropdown(false);
                        signOut();
                      }}
                      >Sign Out</button>
                    </div>
                  )
                }
            </div>
          ) : (
            <>
              {
                providers && 
                Object.values(providers).map((item) => (
                  <button type="button" className="black_btn"
                  key={item.name} onClick={() => signIn(item.id)}>
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>
    </nav>
  )
}
