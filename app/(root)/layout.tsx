import Link from "next/link";
import Image from "next/image";
import React, { ReactNode } from "react";
import {
  isAuthenticated,
  signOut,
  getCurrentUser,
} from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

async function RootLayout({ children }: { children: ReactNode }) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");

  const user = await getCurrentUser();

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between p-4 ">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepPal</h2>
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex flex-col items-end">
              <span className="text-white font-medium">{user.name}</span>
              <span className="text-gray-300 text-sm">{user.email}</span>
            </div>
          )}
          <form
            action={async () => {
              "use server";
              await signOut();
              redirect("/sign-in");
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="text-white border-white hover:cursor-pointer"
            >
              Sign Out
            </Button>
          </form>
        </div>
      </nav>

      {children}
    </div>
  );
}

export default RootLayout;
