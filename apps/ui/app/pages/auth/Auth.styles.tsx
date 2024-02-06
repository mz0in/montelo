import { Link } from "@remix-run/react";
import { ReactNode } from "react";

type ChildrenProps = {
  children: ReactNode;
}


export const FormContainer = ({ children }: ChildrenProps) => (
  <div className="backdrop-blur-[36px] p-16 shadow-[0_4px_8px_rgba(0,0,0,0.9)] rounded-lg m-auto relative w-1/4">
    {children}
  </div>
);

type PageLayoutProps = ChildrenProps & {
  title: string;
}
export const PageLayout = ({ title, children }: PageLayoutProps) => (
  <div className="flex flex-col items-center justify-center w-full">
    <h1 className="text-4xl mb-8">{title}</h1>
    {children}
  </div>
);

type AuthSubmitBtnProps = ChildrenProps & {
  to: string;
}
export const AuthLink = ({ to, children }: AuthSubmitBtnProps) => (
  <Link prefetch={"intent"} to={to} className={"hover:underline"}>
    {children}
  </Link>
);
