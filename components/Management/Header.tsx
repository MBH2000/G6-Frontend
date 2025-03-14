"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import Image from 'next/image'
import logo from '@/public/Logo.svg'
import { Button1 } from "../ui/upg-btn";
import { DoubleArrowUpIcon ,HamburgerMenuIcon} from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Search from "@/components/editor/Search-tools"
import dynamic from "next/dynamic";
import {GearIcon , Share2Icon} from "@radix-ui/react-icons";
import { useState, useCallback, useEffect } from 'react';

const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);
  
    const updateTarget = useCallback((e: MediaQueryListEvent) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);
  
    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", updateTarget);
  
      if (media.matches) {
        setTargetReached(true);
      }
  
      return () => media.removeEventListener("change", updateTarget);
    }, []);
  
    return targetReached;
  };
export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname()
  const router = useRouter();
  const loading = status === "loading";
  const username=session?.user?.name || '';
  const isBreakpoint = useMediaQuery(768)
  const handleupgrade = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pricing`
    //redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/pricing`)
  };
  return (
    <header 
    style={ pathname==='/editor'||pathname==='/account'? {display:'none'}:{display:'flex'}}
    >
        { isBreakpoint ?
            <>
              <div className="auth-options flex justify-end" style={{width:'25%'}}>
                <Link className="" href={"/editor"}>
                  <Button1 
                  className="upg-btn ml-2 mr-2"
                  style={{
                    backgroundColor:'#545CEB',
                  }}>
                    Start writing
                  </Button1>
                </Link>      
                {session ? (
                  <>
                    <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{username[0]}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link className="header-link" href={"/profile"}>
                            User Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link className="header-link" href={"/api/auth/signout"}>
                            Sign Out
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link className="header-link" href={"/pricing"}>
                            Pricing
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link className="header-link"  href={"/"}>
                            About
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link className="header-link" href={"/blog"}>
                            Blog
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <Button1 variant='outline' onClick={handleupgrade} className="upg-btn ml-2 mr-2"
                        style={{ 
                        backgroundColor:'#545CEB',
                        }}>
                          <DoubleArrowUpIcon/>
                          <span className="ml-4">Upgrade</span>
                        </Button1>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                  </>

                ) : (
                  
                  <div>
                    <DropdownMenu>
                    <DropdownMenuTrigger>
                      <HamburgerMenuIcon/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link className="header-link" href={"/pricing"}>
                          Pricing
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className="header-link"  href={"/"}>
                          About
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className="header-link" href={"/blog"}>
                          Blog
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className="header-link" href={"/authentication/signup"}>
                          Sign up
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}       
              </div>

                <nav className="flex flex-row items-center  "
                style={{
                  width:'75%'
                }}
                >
                <div className='flex justify-start' style={{width:'33%'}}>
                  <Link className="header-link" href={"/"}>
                    <Image src={logo} alt="ChatG6 Logo" width={100} height={50} />
                  </Link>
                </div>
                </nav>

            </>
            : 
          <>
            <div className="auth-options flex justify-end" style={{width:'25%'}}>
              {session ? (
                <>
                  <Link className="" href={"/editor"}>
                    <Button1 
                    className="upg-btn ml-2 mr-2"
                    style={{
                      backgroundColor:'#545CEB',
                    }}>
                      Start writing
                    </Button1>
                    </Link>      
                  <Button1  onClick={handleupgrade} variant='outline' className="upg-btn ml-2 mr-2"
                  style={{ 
                  backgroundColor:'#545CEB',
                  }}>
                    <DoubleArrowUpIcon/>
                    <span className="ml-4">Upgrade</span>
                  </Button1>
                  <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{username[0]}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link className="header-link" href={"/profile"}>
                          User Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className="header-link" href={"/api/auth/signout"}>
                          Sign Out
                        </Link>
                      </DropdownMenuItem>
                  </DropdownMenuContent>
                  </DropdownMenu>
                </>

              ) : (
                <div>
                  <Link className="header-link" href={"/api/auth/signin"}>
                    Sign in
                  </Link>
                  <Link className="header-link" href={"/authentication/signup"}>
                    Sign up
                  </Link>
                  <Link className="" href={"/editor"}>
                    <Button1 
                    className="upg-btn ml-2 mr-2"
                    style={{
                      backgroundColor:'#545CEB',
                    }}>
                      Start writing
                    </Button1>
                  </Link>
                </div>
              )}
            </div>
            <nav className="flex flex-row items-center  "
            style={{
              width:'75%'
            }}
            >
              <div className='flex justify-start' style={{width:'33%'}}>
                <Link className="header-link" href={"/"}>
                <Image src={logo} alt="ChatG6 Logo" width={100} height={50} />
                </Link>
              </div>
          
              <div className="gap-5" style={{width:'67%'}}>
                <Link className="header-link" href={"/pricing"}>
                  Pricing
                </Link>
                <Link className="header-link"  href={"/"}>
                  About
                </Link>
                <Link className="header-link" href={"/blog"}>
                  Blog
                </Link>
              </div>
          
            </nav>
          </>
        }
      
    </header>
  );
}
