import { Link } from "@remix-run/react";
import { ReactNode } from "react";

type ChildrenProps = {
  children: ReactNode;
}

type FormContainerProps = ChildrenProps & {
  title: string;
}
export const FormContainer = ({ title, children }: FormContainerProps) => (
  <div className="backdrop-blur-[36px] p-16 shadow-[0_4px_8px_rgba(0,0,0,0.95)] rounded-lg m-auto relative w-1/4 mb-8">
    <h1 className={"text-2xl"}>{title}</h1>
    {children}
  </div>
);

type PageLayoutProps = ChildrenProps;
export const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="flex flex-col items-center justify-center w-full">
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
