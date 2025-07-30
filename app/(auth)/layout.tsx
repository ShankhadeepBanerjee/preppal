import { isAuthenticated } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import TopLoader from "@/components/TopLoader";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/");
  return (
    <div className="auth-layout">
      <TopLoader />
      {children}
    </div>
  );
};

export default AuthLayout;
