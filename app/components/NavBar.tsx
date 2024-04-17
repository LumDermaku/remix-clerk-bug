import { NavLink  } from "@remix-run/react";
import { SignedIn, SignedOut, UserButton } from '@clerk/remix';

export default function NavBar() {
    return ( 
    <nav>
        <SignedIn>
            <UserButton />
        </SignedIn>
        <SignedOut>
            <NavLink to={`/sign-up`}>
                Sign up
            </NavLink>
            <NavLink to={`/sign-in`}>
                Sign in
            </NavLink>
        </SignedOut>
    </nav>
    )
}