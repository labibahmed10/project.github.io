import { Button } from "@/components/ui/button";
import userStore from "@/store/authStore";
import { SVGProps } from "react";
import { Link } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

export default function NavbarComponent() {
  const { email, logOut } = userStore();
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-slate-200">
      <Link to="/" className="mr-6 flex items-center">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Final Project</span>
      </Link>
      <div className="ml-auto">
        {email ? (
          <Button onClick={logOut} className="bg-red-600">
            Log out
          </Button>
        ) : (
          <Link to="/sign-in" className="">
            <Button variant="outline">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
